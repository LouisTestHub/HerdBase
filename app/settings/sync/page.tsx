'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SyncItem {
  id: string;
  table: string;
  action: string;
  timestamp: number;
  status: string;
  retries: number;
}

const MOCK_SYNC_HISTORY: SyncItem[] = [
  { id: '1', table: 'calvings', action: 'create', timestamp: Date.now() - 300000, status: 'synced', retries: 0 },
  { id: '2', table: 'animals', action: 'update', timestamp: Date.now() - 600000, status: 'synced', retries: 0 },
  { id: '3', table: 'health_records', action: 'create', timestamp: Date.now() - 900000, status: 'synced', retries: 1 },
  { id: '4', table: 'weights', action: 'create', timestamp: Date.now() - 1200000, status: 'failed', retries: 3 },
];

export default function SyncSettingsPage() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync] = useState(new Date(Date.now() - 120000));
  const pendingCount = MOCK_SYNC_HISTORY.filter((i) => i.status === 'pending' || i.status === 'failed').length;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              ← Back
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Sync Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Status card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sync Status</h2>
              <p className="text-sm text-gray-500 mt-1">Last synced: {lastSync.toLocaleTimeString('en-GB')}</p>
            </div>
            <div className={`w-3 h-3 rounded-full ${pendingCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-700">{MOCK_SYNC_HISTORY.filter((i) => i.status === 'synced').length}</p>
              <p className="text-xs text-emerald-600">Synced</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
              <p className="text-xs text-amber-600">Pending</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-700">{MOCK_SYNC_HISTORY.filter((i) => i.status === 'failed').length}</p>
              <p className="text-xs text-red-600">Failed</p>
            </div>
          </div>

          <button
            onClick={handleSync}
            disabled={syncing}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {syncing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Syncing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync Now
              </>
            )}
          </button>
        </div>

        {/* Offline storage info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Offline Storage</h2>
          <div className="space-y-3">
            {[
              { name: 'Animals', count: 42 },
              { name: 'Calving Records', count: 15 },
              { name: 'Health Records', count: 28 },
              { name: 'Weight Records', count: 67 },
              { name: 'Treatments', count: 12 },
            ].map((store) => (
              <div key={store.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{store.name}</span>
                <span className="text-sm font-medium text-gray-900">{store.count} records</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sync history */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sync Activity</h2>
          <div className="space-y-3">
            {MOCK_SYNC_HISTORY.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.status === 'synced' ? 'bg-emerald-500' : item.status === 'failed' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <div>
                    <p className="text-sm text-gray-900 capitalize">{item.action} {item.table.replace('_', ' ')}</p>
                    <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString('en-GB')}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.status === 'synced' ? 'bg-emerald-100 text-emerald-700' : item.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conflict resolution info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">Conflict Resolution</h3>
          <p className="text-sm text-blue-700">
            HerdBase uses <strong>last-write-wins</strong> conflict resolution. If the same record is edited on multiple devices while offline, the most recent change will be kept when syncing.
          </p>
        </div>
      </div>
    </div>
  );
}
