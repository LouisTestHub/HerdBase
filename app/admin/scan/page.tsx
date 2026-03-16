'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ScannedAnimal {
  rfid: string;
  tag: string;
  name: string;
  breed: string;
  sex: string;
  weight: number;
  lastHealth: string;
  tbStatus: string;
  scannedAt: string;
}

const MOCK_SCANS: ScannedAnimal[] = [
  { rfid: '826 0001 2345 6789', tag: 'UK 123456 00101', name: 'Daisy', breed: 'Hereford', sex: 'COW', weight: 580, lastHealth: '2 weeks ago', tbStatus: 'NEGATIVE', scannedAt: '14:32:15' },
  { rfid: '826 0001 2345 6790', tag: 'UK 123456 00087', name: 'Buttercup', breed: 'Aberdeen Angus', sex: 'COW', weight: 520, lastHealth: '1 month ago', tbStatus: 'NEGATIVE', scannedAt: '14:32:28' },
  { rfid: '826 0001 2345 6791', tag: 'UK 123456 00045', name: 'Clover', breed: 'Limousin', sex: 'HEIFER', weight: 420, lastHealth: '3 days ago', tbStatus: 'NEGATIVE', scannedAt: '14:32:45' },
];

export default function EIDScanPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedAnimals, setScannedAnimals] = useState<ScannedAnimal[]>(MOCK_SCANS);
  const [currentScan, setCurrentScan] = useState<ScannedAnimal | null>(MOCK_SCANS[2]);
  const [batchMode, setBatchMode] = useState(false);

  const handleStartScan = () => {
    setScanning(true);
    // Mock scan after 2 seconds
    setTimeout(() => {
      const newScan: ScannedAnimal = {
        rfid: '826 0001 2345 6792',
        tag: 'UK 123456 00112',
        name: 'Primrose',
        breed: 'Charolais',
        sex: 'HEIFER',
        weight: 380,
        lastHealth: '1 week ago',
        tbStatus: 'NEGATIVE',
        scannedAt: new Date().toLocaleTimeString('en-GB'),
      };
      setCurrentScan(newScan);
      setScannedAnimals((prev) => [newScan, ...prev]);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">← Back</Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">EID Quick Scan</h1>
          <p className="text-gray-600 mt-1">Scan tags to instantly load animal records</p>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={batchMode} onChange={(e) => setBatchMode(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded" />
            <span className="text-sm text-gray-700">Batch mode</span>
          </label>
          <Link href="/admin/settings/eid" className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm">
            ⚙️ Settings
          </Link>
        </div>
      </div>

      {/* Large scan display */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        {scanning ? (
          <div className="py-12">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-emerald-400 text-xl font-semibold">Scanning...</p>
            <p className="text-gray-400 text-sm mt-2">Hold tag near reader</p>
          </div>
        ) : currentScan ? (
          <div>
            <p className="text-emerald-400 text-sm font-medium mb-2">RFID: {currentScan.rfid}</p>
            <p className="text-white text-4xl font-bold font-mono mb-2">{currentScan.tag}</p>
            <p className="text-emerald-300 text-2xl font-semibold mb-4">{currentScan.name}</p>
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-gray-300">{currentScan.breed}</span>
              <span className="text-gray-300">{currentScan.sex}</span>
              <span className="text-gray-300">{currentScan.weight} kg</span>
              <span className="text-emerald-400">TB: {currentScan.tbStatus}</span>
            </div>
          </div>
        ) : (
          <div className="py-12">
            <p className="text-gray-400 text-xl">Ready to scan</p>
            <p className="text-gray-500 text-sm mt-2">Press the button or scan a tag to begin</p>
          </div>
        )}
      </div>

      {/* Quick actions for current animal */}
      {currentScan && !scanning && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'View Record', icon: '📋', href: '/dashboard/herd' },
            { label: 'Record Weight', icon: '⚖️', href: '/dashboard/weight' },
            { label: 'Health Event', icon: '🏥', href: '/dashboard/health' },
            { label: 'TB History', icon: '🧪', href: '/admin/tb-testing' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:bg-emerald-50 hover:border-emerald-200 transition"
            >
              <span className="text-2xl">{action.icon}</span>
              <p className="text-sm font-medium text-gray-900 mt-2">{action.label}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Scan button */}
      <div className="text-center">
        <button
          onClick={handleStartScan}
          disabled={scanning}
          className="bg-emerald-700 text-white px-12 py-4 rounded-xl text-lg font-bold hover:bg-emerald-800 transition disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : '📱 Scan Tag'}
        </button>
      </div>

      {/* Batch scan history */}
      {batchMode && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Batch Scan Log ({scannedAnimals.length} scanned)</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">Clear Log</button>
          </div>
          <div className="divide-y divide-gray-100">
            {scannedAnimals.map((a, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 font-mono">{a.scannedAt}</span>
                  <div>
                    <p className="font-medium text-gray-900">{a.name} <span className="text-gray-500 text-sm">({a.tag})</span></p>
                    <p className="text-sm text-gray-500">{a.breed} • {a.sex} • {a.weight} kg</p>
                  </div>
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {a.tbStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
