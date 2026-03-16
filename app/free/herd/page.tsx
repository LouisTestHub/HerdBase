'use client';

import Link from 'next/link';
import { useState } from 'react';

const MOCK_ANIMALS = Array.from({ length: 42 }, (_, i) => ({
  id: `a${i + 1}`,
  tagNumber: `UK 123456 ${String(i + 1).padStart(5, '0')}`,
  name: ['Daisy', 'Buttercup', 'Clover', 'Primrose', 'Rosie', 'Bluebell', 'Violet', 'Fern', 'Poppy', 'Holly', 'Ivy', 'Willow', 'Hazel', 'Ruby', 'Pearl', 'Amber', 'Coral', 'Jade', 'Opal', 'Flora'][i % 20] + (i >= 20 ? ` ${Math.floor(i / 20) + 1}` : ''),
  breed: ['Hereford', 'Aberdeen Angus', 'Limousin', 'Charolais', 'Simmental', 'Holstein', 'Jersey'][i % 7],
  sex: ['COW', 'HEIFER', 'BULL', 'STEER'][i % 4] as string,
  dob: `${2020 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
  status: 'ALIVE' as string,
  currentWeight: 450 + (i % 200),
}));

export default function FreeHerdPage() {
  const [search, setSearch] = useState('');
  const animalCount = MOCK_ANIMALS.length;
  const MAX_FREE = 50;
  const remaining = MAX_FREE - animalCount;

  const filtered = MOCK_ANIMALS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tagNumber.includes(search) ||
      a.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Herd Register</h1>
          <p className="text-gray-600 mt-1">{animalCount} of {MAX_FREE} animals (Free plan)</p>
        </div>
        <button className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition font-medium text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Animal
        </button>
      </div>

      {/* Usage bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Animals: {animalCount} / {MAX_FREE}</span>
          <span className="text-sm text-gray-500">{remaining} remaining</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${animalCount / MAX_FREE > 0.8 ? 'bg-amber-500' : 'bg-emerald-600'}`}
            style={{ width: `${Math.min(100, (animalCount / MAX_FREE) * 100)}%` }}
          />
        </div>
        {remaining <= 10 && (
          <p className="text-sm text-amber-600 mt-2">
            ⚠️ Approaching limit — <Link href="/upgrade" className="font-medium text-emerald-700 hover:underline">upgrade to Starter</Link> for up to 200 animals
          </p>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, tag or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sex</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">DOB</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Weight</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-6 py-3 text-sm font-mono text-gray-900">{a.tagNumber}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{a.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{a.breed}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{a.sex}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{new Date(a.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{a.currentWeight} kg</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade prompt */}
      {animalCount >= MAX_FREE * 0.8 && (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold">Need more than {MAX_FREE} animals?</h3>
              <p className="text-emerald-100 mt-1">Upgrade to Starter (£29/mo) for 200 animals, or Professional (£59/mo) for 500</p>
            </div>
            <Link href="/upgrade" className="bg-white text-emerald-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition">
              Upgrade Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
