'use client';

import Link from 'next/link';
import { useState } from 'react';

const AVAILABLE_ANIMALS = [
  { id: '1', tag: 'UK 123456 00012', name: 'Storm', breed: 'Limousin', sex: 'STEER', weight: 380, age: '18m', tbStatus: 'Clear' },
  { id: '2', tag: 'UK 123456 00024', name: 'Thunder', breed: 'Limousin', sex: 'STEER', weight: 395, age: '19m', tbStatus: 'Clear' },
  { id: '3', tag: 'UK 123456 00036', name: 'Lightning', breed: 'Charolais', sex: 'STEER', weight: 410, age: '20m', tbStatus: 'Clear' },
  { id: '4', tag: 'UK 123456 00048', name: 'Blaze', breed: 'Aberdeen Angus', sex: 'STEER', weight: 365, age: '17m', tbStatus: 'Clear' },
  { id: '5', tag: 'UK 123456 00060', name: 'Shadow', breed: 'Hereford', sex: 'STEER', weight: 372, age: '18m', tbStatus: 'Clear' },
  { id: '6', tag: 'UK 123456 00072', name: 'Bolt', breed: 'Simmental', sex: 'STEER', weight: 388, age: '19m', tbStatus: 'Clear' },
];

interface ChecklistItem { label: string; checked: boolean; }

export default function PrepareLotPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [marketName, setMarketName] = useState('Hereford Livestock Market');
  const [saleDate, setSaleDate] = useState('2026-03-25');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { label: 'TB test clear (within testing window)', checked: true },
    { label: 'Movement licence applied for', checked: false },
    { label: 'Passports available', checked: true },
    { label: 'Animals tagged and readable', checked: true },
    { label: '6-day standstill observed', checked: false },
    { label: 'Transport arranged', checked: false },
    { label: 'Lot sheet printed', checked: false },
  ]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleCheck = (idx: number) => {
    const updated = [...checklist];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setChecklist(updated);
  };

  const selectedAnimals = AVAILABLE_ANIMALS.filter((a) => selected.has(a.id));
  const estimatedValue = selectedAnimals.reduce((sum, a) => sum + a.weight * 2.85, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/markets" className="text-gray-500 hover:text-gray-700 text-sm">← Back to Markets</Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Prepare Sale Lot</h1>
        <p className="text-gray-600 mt-1">Select animals, complete pre-sale checklist, and generate lot sheet</p>
      </div>

      {/* Lot details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lot Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Market</label>
            <select value={marketName} onChange={(e) => setMarketName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
              <option>Hereford Livestock Market</option>
              <option>Shrewsbury Livestock Auction</option>
              <option>Ludlow Livestock Market</option>
              <option>Welshpool Livestock Market</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sale Date</label>
            <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number</label>
            <input type="text" placeholder="Auto-assigned" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>
      </div>

      {/* Summary */}
      {selected.size > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center">
            <p className="text-sm text-emerald-600">Animals Selected</p>
            <p className="text-2xl font-bold text-emerald-700">{selected.size}</p>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-center">
            <p className="text-sm text-blue-600">Avg Weight</p>
            <p className="text-2xl font-bold text-blue-700">{Math.round(selectedAnimals.reduce((s, a) => s + a.weight, 0) / selected.size)} kg</p>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-center">
            <p className="text-sm text-amber-600">Est. Value</p>
            <p className="text-2xl font-bold text-amber-700">£{Math.round(estimatedValue).toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Animal selection */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Select Animals</h2>
          <span className="text-sm text-gray-500">{selected.size} selected</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 w-8"></th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Sex</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Weight</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">TB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {AVAILABLE_ANIMALS.map((a) => (
                <tr key={a.id} onClick={() => toggle(a.id)} className={`cursor-pointer transition ${selected.has(a.id) ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.has(a.id)} onChange={() => toggle(a.id)} className="w-4 h-4 text-emerald-600 rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-900">{a.tag}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{a.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.breed}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.sex}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{a.weight} kg</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.age}</td>
                  <td className="px-4 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">{a.tbStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pre-sale checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pre-Sale Checklist</h2>
        <div className="space-y-3">
          {checklist.map((item, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(i)} className="w-5 h-5 text-emerald-600 rounded" />
              <span className={`text-sm ${item.checked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{item.label}</span>
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">{checklist.filter((c) => c.checked).length} of {checklist.length} completed</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
          📄 Generate Lot Sheet
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
          📋 Movement Licence
        </button>
        <button className="bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold">
          Save Lot
        </button>
      </div>
    </div>
  );
}
