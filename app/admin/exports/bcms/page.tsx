'use client';

import Link from 'next/link';
import { useState } from 'react';

interface QueueItem {
  id: string;
  type: string;
  animal: string;
  date: string;
  status: string;
  bcmsRef: string | null;
}

const BIRTH_QUEUE: QueueItem[] = [
  { id: 'b1', type: 'Birth', animal: 'Calf 00150 (ex Bluebell)', date: '2026-03-14', status: 'Pending', bcmsRef: null },
  { id: 'b2', type: 'Birth', animal: 'Calf 00149 (ex Violet)', date: '2026-03-10', status: 'Submitted', bcmsRef: 'BCMS-B-2026-0445' },
];

const DEATH_QUEUE: QueueItem[] = [
  { id: 'd1', type: 'Death', animal: 'UK 123456 00022 (Bracken)', date: '2026-03-08', status: 'Pending', bcmsRef: null },
];

const MOVEMENT_QUEUE: QueueItem[] = [
  { id: 'mv1', type: 'Movement OFF', animal: 'UK 123456 00055 (Thistle)', date: '2026-03-10', status: 'Submitted', bcmsRef: 'BCMS-M-2026-0301' },
  { id: 'mv2', type: 'Movement ON', animal: 'UK 123456 00012 (Storm)', date: '2026-03-05', status: 'Submitted', bcmsRef: 'BCMS-M-2026-0298' },
  { id: 'mv3', type: 'Movement OFF', animal: 'UK 123456 00044 (Bramble)', date: '2026-02-20', status: 'Submitted', bcmsRef: 'BCMS-M-2026-0285' },
];

export default function BCMSReportingPage() {
  const [submitting, setSubmitting] = useState(false);

  const allItems = [...BIRTH_QUEUE, ...DEATH_QUEUE, ...MOVEMENT_QUEUE];
  const pendingCount = allItems.filter((i) => i.status === 'Pending').length;

  const handleSubmitAll = () => {
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/exports" className="text-gray-500 hover:text-gray-700 text-sm">← Back to Exports</Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">BCMS Reporting</h1>
          <p className="text-gray-600 mt-1">Submit birth, death, and movement notifications to BCMS</p>
        </div>
        <button
          onClick={handleSubmitAll}
          disabled={submitting || pendingCount === 0}
          className="bg-emerald-700 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition font-medium text-sm disabled:opacity-50 flex items-center gap-2"
        >
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Submitting...
            </>
          ) : (
            <>📤 Submit All Pending ({pendingCount})</>
          )}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Births</p>
          <p className="text-2xl font-bold text-gray-900">{BIRTH_QUEUE.length}</p>
          <p className="text-xs text-amber-600">{BIRTH_QUEUE.filter((i) => i.status === 'Pending').length} pending</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Deaths</p>
          <p className="text-2xl font-bold text-gray-900">{DEATH_QUEUE.length}</p>
          <p className="text-xs text-amber-600">{DEATH_QUEUE.filter((i) => i.status === 'Pending').length} pending</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Movements</p>
          <p className="text-2xl font-bold text-gray-900">{MOVEMENT_QUEUE.length}</p>
          <p className="text-xs text-emerald-600">All submitted</p>
        </div>
      </div>

      {/* Birth queue */}
      <QueueSection title="Birth Notifications" icon="🐄" items={BIRTH_QUEUE} />

      {/* Death queue */}
      <QueueSection title="Death Notifications" icon="⚫" items={DEATH_QUEUE} />

      {/* Movement queue */}
      <QueueSection title="Movement Notifications" icon="🚛" items={MOVEMENT_QUEUE} />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-1">Mock BCMS API</h3>
        <p className="text-sm text-blue-700">
          This is a simulated BCMS integration. In production, submissions would be sent to the BCMS (British Cattle Movement Service) API. All reference numbers shown are mock identifiers.
        </p>
      </div>
    </div>
  );
}

function QueueSection({ title, icon, items }: { title: string; icon: string; items: QueueItem[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500 ml-auto">{items.length} records</span>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div>
              <p className="font-medium text-gray-900">{item.animal}</p>
              <p className="text-sm text-gray-500">{item.type} • {item.date}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                item.status === 'Submitted' ? 'bg-emerald-100 text-emerald-800' :
                item.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>{item.status}</span>
              {item.bcmsRef && (
                <p className="text-xs text-gray-400 mt-1 font-mono">{item.bcmsRef}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
