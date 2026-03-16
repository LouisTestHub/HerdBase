'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TBSettingsPage() {
  const [riskArea, setRiskArea] = useState('LRA');
  const [interval, setInterval] = useState('48');
  const [aphaNumber, setAphaNumber] = useState('12/345/6789');
  const [autoReminders, setAutoReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState('30');

  const RISK_INTERVALS: Record<string, string> = {
    HRA: '6',
    EDGE: '12',
    LRA: '48',
  };

  const handleRiskChange = (area: string) => {
    setRiskArea(area);
    setInterval(RISK_INTERVALS[area] || '48');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tb-testing" className="text-gray-500 hover:text-gray-700 text-sm">← Back to TB Testing</Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">TB Testing Settings</h1>
        <p className="text-gray-600 mt-1">Configure testing intervals, APHA details, and reminders</p>
      </div>

      {/* Risk Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Area & Testing Interval</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { value: 'HRA', label: 'High Risk Area', desc: 'Testing every 6 months', color: 'red' },
            { value: 'EDGE', label: 'Edge Area', desc: 'Testing every 12 months', color: 'amber' },
            { value: 'LRA', label: 'Low Risk Area', desc: 'Testing every 4 years', color: 'emerald' },
          ].map((area) => (
            <button
              key={area.value}
              onClick={() => handleRiskChange(area.value)}
              className={`p-4 rounded-xl border-2 text-left transition ${
                riskArea === area.value
                  ? `border-${area.color}-600 bg-${area.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900">{area.label}</p>
              <p className="text-sm text-gray-600 mt-1">{area.desc}</p>
              <p className="text-xs font-mono text-gray-400 mt-1">{area.value}</p>
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Testing Interval (months)</label>
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <p className="text-xs text-gray-500 mt-1">Auto-set based on risk area. Override if needed.</p>
        </div>
      </div>

      {/* APHA Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">APHA Holding Number</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CPH / Holding Number</label>
          <input
            type="text"
            value={aphaNumber}
            onChange={(e) => setAphaNumber(e.target.value)}
            placeholder="12/345/6789"
            className="w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <p className="text-xs text-gray-500 mt-1">Your County Parish Holding number for APHA reporting</p>
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Auto-Reminders</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoReminders}
              onChange={(e) => setAutoReminders(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Enable automatic test reminders</p>
              <p className="text-xs text-gray-500">Get notified when your next TB test is approaching</p>
            </div>
          </label>
          {autoReminders && (
            <div className="ml-7">
              <label className="block text-sm font-medium text-gray-700 mb-1">Remind me this many days before</label>
              <input
                type="number"
                value={reminderDays}
                onChange={(e) => setReminderDays(e.target.value)}
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <Link href="/admin/tb-testing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
          Cancel
        </Link>
        <button className="bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold">
          Save Settings
        </button>
      </div>
    </div>
  );
}
