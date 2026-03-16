'use client';

import Link from 'next/link';
import { useState } from 'react';

const READERS = [
  { name: 'Agrident AWR300', brand: 'Agrident', connected: false, battery: null, lastSeen: null },
  { name: 'Gallagher HR5', brand: 'Gallagher', connected: true, battery: 85, lastSeen: 'Connected now' },
  { name: 'Tru-Test XRS2', brand: 'Tru-Test', connected: false, battery: null, lastSeen: '2 days ago' },
  { name: 'Allflex RS420', brand: 'Allflex', connected: false, battery: null, lastSeen: 'Never' },
];

export default function EIDSettingsPage() {
  const [scanning, setScanning] = useState(false);
  const [selectedReader, setSelectedReader] = useState('Gallagher HR5');

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">← Back</Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">EID Reader Settings</h1>
        <p className="text-gray-600 mt-1">Connect and configure your EID tag reader via Bluetooth</p>
      </div>

      {/* Connection status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bluetooth Connection</h2>
            <p className="text-sm text-gray-500 mt-1">Pair your EID reader to scan tags directly</p>
          </div>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {scanning ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Scanning...
              </>
            ) : (
              '🔍 Scan for Devices'
            )}
          </button>
        </div>

        <div className="space-y-3">
          {READERS.map((reader) => (
            <div
              key={reader.name}
              onClick={() => setSelectedReader(reader.name)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                selectedReader === reader.name
                  ? 'border-emerald-600 bg-emerald-50'
                  : reader.connected
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${reader.connected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <div>
                    <p className="font-medium text-gray-900">{reader.name}</p>
                    <p className="text-sm text-gray-500">{reader.brand}</p>
                  </div>
                </div>
                <div className="text-right">
                  {reader.connected ? (
                    <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Connected</span>
                  ) : (
                    <span className="text-xs text-gray-400">{reader.lastSeen}</span>
                  )}
                  {reader.battery && (
                    <p className="text-xs text-gray-500 mt-1">🔋 {reader.battery}%</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Reader Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto-load animal record on scan</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
              <span className="text-sm text-gray-600">Automatically open the animal&apos;s record when their tag is scanned</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scan sound</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
              <span className="text-sm text-gray-600">Play a confirmation sound on successful scan</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch scan timeout (seconds)</label>
            <input type="number" defaultValue={30} className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            <p className="text-xs text-gray-500 mt-1">Time between scans before ending a batch</p>
          </div>
        </div>
      </div>

      {/* Supported readers */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Supported EID Readers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Agrident AWR300', 'Gallagher HR5', 'Tru-Test XRS2', 'Allflex RS420'].map((r) => (
            <div key={r} className="bg-white rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-900">{r}</p>
              <p className="text-xs text-blue-600">Bluetooth</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
