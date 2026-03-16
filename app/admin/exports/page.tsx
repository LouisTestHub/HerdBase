'use client';

import Link from 'next/link';
import { useState } from 'react';

const EXPORT_TYPES = [
  { id: 'herd', name: 'Herd Register', icon: '🐄', formats: ['CSV', 'Excel', 'PDF'], description: 'Complete herd register with all animal details' },
  { id: 'calving', name: 'Calving Records', icon: '🍼', formats: ['CSV', 'Excel', 'PDF'], description: 'All calving records with dates, sires, and outcomes' },
  { id: 'health', name: 'Health Records', icon: '🏥', formats: ['CSV', 'Excel', 'PDF'], description: 'Health events, treatments, and medicine records' },
  { id: 'weight', name: 'Weight Records', icon: '⚖️', formats: ['CSV', 'Excel'], description: 'Weight history and growth rates' },
  { id: 'movements', name: 'Movement Records', icon: '🚛', formats: ['CSV', 'Excel', 'PDF'], description: 'On/off farm movements with BCMS references' },
  { id: 'financial', name: 'Financial Records', icon: '💰', formats: ['CSV', 'Excel'], description: 'Income, expenses, and invoices' },
  { id: 'tb', name: 'TB Test Records', icon: '🧪', formats: ['CSV', 'PDF'], description: 'TB test history with per-animal results' },
];

const BREED_TEMPLATES = [
  { breed: 'Limousin', org: 'British Limousin Cattle Society', fields: 'Registration, pedigree, performance' },
  { breed: 'Hereford', org: 'Hereford Cattle Society', fields: 'Herdbook, calving data, weights' },
  { breed: 'Aberdeen Angus', org: 'Aberdeen-Angus Cattle Society', fields: 'Registration, EBVs, calving ease' },
  { breed: 'Charolais', org: 'British Charolais Cattle Society', fields: 'Pedigree, performance, calving' },
];

const RECENT_EXPORTS = [
  { date: '2026-03-14', type: 'Herd Register', format: 'Excel', records: 148, status: 'Completed' },
  { date: '2026-03-10', type: 'Calving Records', format: 'PDF', records: 15, status: 'Completed' },
  { date: '2026-03-05', type: 'TB Test Records', format: 'CSV', records: 145, status: 'Completed' },
  { date: '2026-02-28', type: 'Limousin Template', format: 'Excel', records: 34, status: 'Completed' },
];

export default function ExportsPage() {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = (id: string, format: string) => {
    setExporting(`${id}-${format}`);
    setTimeout(() => setExporting(null), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Exports</h1>
          <p className="text-gray-600 mt-1">Export your data in CSV, Excel, or PDF format</p>
        </div>
        <Link href="/admin/exports/bcms" className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
          📤 BCMS Reporting
        </Link>
      </div>

      {/* Export types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXPORT_TYPES.map((exp) => (
          <div key={exp.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{exp.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.name}</h3>
                  <p className="text-sm text-gray-500">{exp.description}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {exp.formats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleExport(exp.id, fmt)}
                  disabled={exporting === `${exp.id}-${fmt}`}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
                >
                  {exporting === `${exp.id}-${fmt}` ? '⏳' : '📥'} {fmt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Breed association templates */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Breed Association Templates</h2>
          <p className="text-sm text-gray-500 mt-1">Export data formatted for breed society submissions</p>
        </div>
        <div className="divide-y divide-gray-100">
          {BREED_TEMPLATES.map((bt) => (
            <div key={bt.breed} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-gray-900">{bt.breed}</p>
                <p className="text-sm text-gray-500">{bt.org}</p>
                <p className="text-xs text-gray-400 mt-0.5">Fields: {bt.fields}</p>
              </div>
              <button
                onClick={() => handleExport(`breed-${bt.breed}`, 'Excel')}
                className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium"
              >
                📥 Export Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent exports */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Exports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Format</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Records</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_EXPORTS.map((exp, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm text-gray-900">{exp.date}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{exp.type}</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{exp.format}</span></td>
                  <td className="px-6 py-3 text-sm text-gray-600">{exp.records}</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">{exp.status}</span></td>
                  <td className="px-6 py-3"><button className="text-emerald-700 text-sm font-medium hover:underline">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
