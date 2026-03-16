// IndexedDB wrapper for offline data storage
const DB_NAME = 'herdbase-offline';
const DB_VERSION = 1;

export interface SyncQueueItem {
  id: string;
  table: string;
  action: 'create' | 'update' | 'delete';
  data: Record<string, unknown>;
  timestamp: number;
  retries: number;
  status: 'pending' | 'syncing' | 'failed' | 'synced';
}

const STORES = ['animals', 'calvings', 'health_records', 'weights', 'treatments', 'sync_queue'] as const;
export type StoreName = (typeof STORES)[number];

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const store of STORES) {
        if (!db.objectStoreNames.contains(store)) {
          const s = db.createObjectStore(store, { keyPath: 'id' });
          if (store === 'sync_queue') {
            s.createIndex('status', 'status', { unique: false });
            s.createIndex('timestamp', 'timestamp', { unique: false });
          }
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAll<T = Record<string, unknown>>(store: StoreName): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

export async function getById<T = Record<string, unknown>>(store: StoreName, id: string): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(id);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function put(store: StoreName, data: Record<string, unknown>): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).put(data);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function remove(store: StoreName, id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearStore(store: StoreName): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Sync queue helpers
export async function addToSyncQueue(table: string, action: 'create' | 'update' | 'delete', data: Record<string, unknown>): Promise<void> {
  const item: SyncQueueItem = {
    id: `sync_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    table,
    action,
    data,
    timestamp: Date.now(),
    retries: 0,
    status: 'pending',
  };
  await put('sync_queue', item as unknown as Record<string, unknown>);
}

export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
  const all = await getAll<SyncQueueItem>('sync_queue');
  return all.filter((i) => i.status === 'pending' || i.status === 'failed');
}

export async function markSynced(id: string): Promise<void> {
  const item = await getById<SyncQueueItem>('sync_queue', id);
  if (item) {
    item.status = 'synced';
    await put('sync_queue', item as unknown as Record<string, unknown>);
  }
}

export async function markFailed(id: string): Promise<void> {
  const item = await getById<SyncQueueItem>('sync_queue', id);
  if (item) {
    item.status = 'failed';
    item.retries += 1;
    await put('sync_queue', item as unknown as Record<string, unknown>);
  }
}

// Sync processor with exponential backoff
export async function processSyncQueue(): Promise<{ synced: number; failed: number }> {
  const pending = await getPendingSyncItems();
  let synced = 0;
  let failed = 0;

  for (const item of pending) {
    if (item.retries > 5) continue; // give up after 5 retries

    const delay = Math.min(1000 * Math.pow(2, item.retries), 30000);
    if (item.status === 'failed' && Date.now() - item.timestamp < delay) continue;

    try {
      const response = await fetch(`/api/sync/${item.table}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: item.action, data: item.data }),
      });
      if (response.ok) {
        await markSynced(item.id);
        synced++;
      } else {
        await markFailed(item.id);
        failed++;
      }
    } catch {
      await markFailed(item.id);
      failed++;
    }
  }

  return { synced, failed };
}
