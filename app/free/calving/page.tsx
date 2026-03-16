'use client';

import Link from 'next/link';
import { useState } from 'react';

const MOCK_CALVINGS = [
  { id: '1', cowTag: 'UK 123456 00101', cowName: 'Daisy', dueDate: '2026-03-20', status: 'due_soon', daysUntil: 4, sire: 'Aberdeen Angus AI', lactation: 3 },
  { id: '2', cowTag: 'UK 123456 00087', cowName: 'Buttercup', dueDate: '2026-03-25', status: 'due_soon', daysUntil: 9, sire: 'Limousin Bull', lactation: 2 },
  { id: '3', cowTag: 'UK 123456 00045', cowName: 'Clover', dueDate: '2026-04-02', status: 'upcoming', daysUntil: 17, sire: 'Hereford AI', lactation: 5 },
  { id: '4', cowTag: 'UK 123456 00112', cowName: 'Primrose', dueDate: '2026-04-08', status: 'upcoming', daysUntil: 23, sire: 'Charolais AI', lactation: 1 },
  { id: '5', cowTag: 'UK 123456 00076', cowName: 'Rosie', dueDate: '2026-04-15', status: 'upcoming', daysUntil: 30, sire: 'Simmental Bull', lactation: 4 },
];

const RECENT_CALVINGS = [
  { id: 'r1', cowTag: 'UK 123456 00033', cowName: 'Bluebell', date: '2026-03-14', calfSex: 'Heifer', calfWeight: 38, ease: 'Easy', sire: 'Angus AI' },
  { id: 'r2', cowTag: 'UK 123456 00091', cowName: 'Violet', date: '2026-03-10', calfSex: 'Bull', calfWeight: 42, ease: 'Moderate', sire: 'Limousin AI' },
  { id: 'r3', cowTag: 'UK 123456 00058', cowName: 'Fern', date: '2026-03-08', calfSex: 'Heifer', calfWeight: 35, ease: 'Easy', sire: 'Hereford Bull' },
];

const MONTHS = ['Mar 2026', 'Apr 2026', 'May 2026'];

export default function FreeCalvingPage() {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calving Book</h1>
          <p className="text-gray-600 mt-1">Track due dates, record calvings, and stay on top of your calving season</p>
        </div>
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition font-medium text-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Quick Add Calving
        </button>
      </div>

      {/* Quick-add form */}
      {showQuickAdd && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Record a Calving</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cow Tag</label>
              <input type="text" placeholder="UK 123456 00101" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calving Date</label>
              <input type="date" defaultValue="2026-03-16" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calf Sex</label>
              <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                <option>Bull calf</option>
                <option>Heifer calf</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calf Weight (kg)</label>
              <input type="number" placeholder="40" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Ease</label>
              <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Difficult</option>
                <option>Caesarean</option>
                <option>Stillborn</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition font-medium">
                Save Calving
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-amber-900">2 cows due within 7 days</h3>
            <p className="text-sm text-amber-700 mt-1">
              <span className="font-medium">Daisy (00101)</span> — due 20 Mar &nbsp;•&nbsp;
              <span className="font-medium">Buttercup (00087)</span> — due 25 Mar
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Due This Month', value: '2', icon: '📅', color: 'emerald' },
          { label: 'Due Next Month', value: '3', icon: '🔜', color: 'blue' },
          { label: 'Calved This Season', value: '12', icon: '🍼', color: 'green' },
          { label: 'Live Calves', value: '11', icon: '🐄', color: 'emerald' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Due Dates Calendar View */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Due Dates</h2>
            <div className="flex gap-1">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(i)}
                  className={`px-3 py-1 text-sm rounded-lg transition ${selectedMonth === i ? 'bg-emerald-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {MOCK_CALVINGS.map((c) => (
            <div key={c.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${c.status === 'due_soon' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div>
                  <p className="font-medium text-gray-900">{c.cowName} <span className="text-gray-500 text-sm">({c.cowTag})</span></p>
                  <p className="text-sm text-gray-500">Sire: {c.sire} • Lactation {c.lactation}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{new Date(c.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                <p className={`text-sm ${c.daysUntil <= 7 ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
                  {c.daysUntil} days
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Calvings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Calvings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Cow</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Calf</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Weight</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ease</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_CALVINGS.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm text-gray-900">{new Date(c.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium text-gray-900">{c.cowName}</p>
                    <p className="text-xs text-gray-500">{c.cowTag}</p>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">{c.calfSex}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{c.calfWeight} kg</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.ease === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {c.ease}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">{c.sire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold">Want health records, breeding & weight tracking?</h3>
            <p className="text-emerald-100 mt-1">Upgrade to Starter for just £29/month</p>
          </div>
          <Link href="/upgrade" className="bg-white text-emerald-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition">
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
