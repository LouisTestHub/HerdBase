'use client';

import Link from 'next/link';
import { useState } from 'react';

const MOCK_MOVEMENTS = [
  { id: 'm1', date: '2026-03-10', type: 'OFF', animal: 'Thistle (UK 123456 00055)', from: 'Oakfield Farm', to: 'Hereford Market', bcms: true, bcmsRef: 'BCMS-2026-0301' },
  { id: 'm2', date: '2026-03-05', type: 'ON', animal: 'Storm (UK 123456 00012)', from: 'Ludlow Market', to: 'Oakfield Farm', bcms: true, bcmsRef: 'BCMS-2026-0298' },
  { id: 'm3', date: '2026-02-28', type: 'BIRTH', animal: 'Calf 00150', from: 'Oakfield Farm', to: 'Oakfield Farm', bcms: false, bcmsRef: null },
  { id: 'm4', date: '2026-02-20', type: 'OFF', animal: 'Bramble (UK 123456 00044)', from: 'Oakfield Farm', to: 'JW Meats Abattoir', bcms: true, bcmsRef: 'BCMS-2026-0285' },
  { id: 'm5', date: '2026-02-15', type: 'INTERNAL', animal: 'Daisy (UK 123456 00101)', from: 'Top Field', to: 'Calving Shed', bcms: false, bcmsRef: null },
];

interface StandstillEntry {
  type: string;
  days: number;
  startDate: string;
  endDate: string;
  remaining: number;
  status: string;
}

const STANDSTILLS: StandstillEntry[] = [
  { type: '6-Day Standstill', days: 6, startDate: '2026-03-10', endDate: '2026-03-16', remaining: 0, status: 'Complete' },
  { type: '13-Day TB Standstill', days: 13, startDate: '2026-03-05', endDate: '2026-03-18', remaining: 2, status: 'Active' },
];

export default function MovementsPage() {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? MOCK_MOVEMENTS : MOCK_MOVEMENTS.filter((m) => m.type === filter);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/markets" className="text-gray-500 hover:text-gray-700 text-sm">← Back to Markets</Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movement Records</h1>
          <p className="text-gray-600 mt-1">Track on/off movements, standstill periods, and BCMS reporting</p>
        </div>
        <button className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition font-medium text-sm">
          + Record Movement
        </button>
      </div>

      {/* Standstill tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STANDSTILLS.map((s) => (
          <div key={s.type} className={`rounded-xl border p-5 ${s.status === 'Active' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{s.type}</h3>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {s.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{s.startDate} → {s.endDate}</p>
            {s.remaining > 0 ? (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-amber-700 font-medium">{s.remaining} days remaining</span>
                  <span className="text-gray-500">{s.days - s.remaining}/{s.days} days</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${((s.days - s.remaining) / s.days) * 100}%` }} />
                </div>
              </div>
            ) : (
              <p className="text-sm text-emerald-700 font-medium mt-2">✓ Standstill complete — free to move</p>
            )}
          </div>
        ))}
      </div>

      {/* BCMS status */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Total Movements (30d)</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_MOVEMENTS.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">BCMS Reported</p>
          <p className="text-2xl font-bold text-emerald-700">{MOCK_MOVEMENTS.filter((m) => m.bcms).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Pending BCMS</p>
          <p className="text-2xl font-bold text-amber-700">{MOCK_MOVEMENTS.filter((m) => !m.bcms).length}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['ALL', 'ON', 'OFF', 'BIRTH', 'DEATH', 'INTERNAL'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${filter === f ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Movement table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Animal</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">From</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">To</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">BCMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm text-gray-900">{new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      m.type === 'ON' ? 'bg-blue-100 text-blue-800' :
                      m.type === 'OFF' ? 'bg-red-100 text-red-800' :
                      m.type === 'BIRTH' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>{m.type}</span>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{m.animal}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{m.from}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{m.to}</td>
                  <td className="px-6 py-3">
                    {m.bcms ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">✓ {m.bcmsRef}</span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
