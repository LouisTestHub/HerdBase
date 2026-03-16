'use client';

import Link from 'next/link';
import { useState } from 'react';

const ANIMALS = [
  { tag: 'UK 123456 00101', name: 'Daisy' },
  { tag: 'UK 123456 00087', name: 'Buttercup' },
  { tag: 'UK 123456 00045', name: 'Clover' },
  { tag: 'UK 123456 00112', name: 'Primrose' },
  { tag: 'UK 123456 00076', name: 'Rosie' },
  { tag: 'UK 123456 00033', name: 'Bluebell' },
  { tag: 'UK 123456 00091', name: 'Violet' },
  { tag: 'UK 123456 00058', name: 'Fern' },
];

interface AnimalResult {
  tag: string;
  name: string;
  skin1: string;
  skin2: string;
  result: string;
}

export default function NewTBTestPage() {
  const [bulkMode, setBulkMode] = useState(true);
  const [results, setResults] = useState<AnimalResult[]>(
    ANIMALS.map((a) => ({ tag: a.tag, name: a.name, skin1: '', skin2: '', result: 'NEGATIVE' }))
  );

  const updateResult = (idx: number, field: keyof AnimalResult, value: string) => {
    const updated = [...results];
    updated[idx] = { ...updated[idx], [field]: value };
    // Auto-flag reactors based on skin measurements
    if (field === 'skin1' || field === 'skin2') {
      const s1 = parseFloat(updated[idx].skin1) || 0;
      const s2 = parseFloat(updated[idx].skin2) || 0;
      const diff = s2 - s1;
      if (diff >= 4) updated[idx].result = 'REACTOR';
      else if (diff >= 2) updated[idx].result = 'INCONCLUSIVE';
      else updated[idx].result = 'NEGATIVE';
    }
    setResults(updated);
  };

  const reactorCount = results.filter((r) => r.result === 'REACTOR').length;
  const inconclusiveCount = results.filter((r) => r.result === 'INCONCLUSIVE').length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tb-testing" className="text-gray-500 hover:text-gray-700 text-sm">← Back to TB Testing</Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Record New TB Test</h1>
          <p className="text-gray-600 mt-1">Enter results for all tested animals</p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={bulkMode} onChange={(e) => setBulkMode(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded" />
          <span className="text-sm text-gray-700">Bulk entry mode</span>
        </label>
      </div>

      {/* Test details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
            <input type="date" defaultValue="2026-03-16" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vet Name</label>
            <input type="text" placeholder="Mr J. Williams MRCVS" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">APHA Reference</label>
            <input type="text" placeholder="APHA-2026-03-XXXX" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>
      </div>

      {/* Live summary */}
      {(reactorCount > 0 || inconclusiveCount > 0) && (
        <div className={`rounded-xl p-4 border ${reactorCount > 0 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-4">
            <span className="text-xl">{reactorCount > 0 ? '🔴' : '⚠️'}</span>
            <div>
              {reactorCount > 0 && <p className="font-semibold text-red-900">{reactorCount} reactor(s) auto-flagged</p>}
              {inconclusiveCount > 0 && <p className="font-semibold text-amber-900">{inconclusiveCount} inconclusive result(s)</p>}
              <p className="text-sm text-gray-600 mt-1">OTF status will be automatically updated on save</p>
            </div>
          </div>
        </div>
      )}

      {/* Bulk entry table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Animal Results ({results.length} animals)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Avian (mm)</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Bovine (mm)</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {results.map((r, i) => (
                <tr key={r.tag} className={`${r.result === 'REACTOR' ? 'bg-red-50' : r.result === 'INCONCLUSIVE' ? 'bg-amber-50' : ''}`}>
                  <td className="px-4 py-2 text-sm font-mono text-gray-900">{r.tag}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{r.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      step="0.1"
                      value={r.skin1}
                      onChange={(e) => updateResult(i, 'skin1', e.target.value)}
                      className="w-20 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0.0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      step="0.1"
                      value={r.skin2}
                      onChange={(e) => updateResult(i, 'skin2', e.target.value)}
                      className="w-20 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0.0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.result === 'NEGATIVE' ? 'bg-emerald-100 text-emerald-800' :
                      r.result === 'REACTOR' ? 'bg-red-100 text-red-800' :
                      r.result === 'INCONCLUSIVE' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>{r.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link href="/admin/tb-testing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
          Cancel
        </Link>
        <button className="bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold">
          Save TB Test Results
        </button>
      </div>
    </div>
  );
}
