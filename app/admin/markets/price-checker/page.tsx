'use client';

import Link from 'next/link';
import { useState } from 'react';

const PRICE_DATA: Record<string, Record<string, Record<string, number>>> = {
  'Aberdeen Angus': { STEER: { '200-300': 2.65, '300-400': 2.85, '400-500': 3.05, '500+': 3.20 }, HEIFER: { '200-300': 2.50, '300-400': 2.72, '400-500': 2.90, '500+': 3.05 } },
  'Hereford': { STEER: { '200-300': 2.58, '300-400': 2.78, '400-500': 2.95, '500+': 3.10 }, HEIFER: { '200-300': 2.45, '300-400': 2.65, '400-500': 2.82, '500+': 2.98 } },
  'Limousin': { STEER: { '200-300': 2.75, '300-400': 2.95, '400-500': 3.15, '500+': 3.30 }, HEIFER: { '200-300': 2.62, '300-400': 2.82, '400-500': 3.00, '500+': 3.15 } },
  'Charolais': { STEER: { '200-300': 2.72, '300-400': 2.92, '400-500': 3.10, '500+': 3.25 }, HEIFER: { '200-300': 2.60, '300-400': 2.80, '400-500': 2.98, '500+': 3.12 } },
  'Simmental': { STEER: { '200-300': 2.55, '300-400': 2.75, '400-500': 2.92, '500+': 3.08 }, HEIFER: { '200-300': 2.42, '300-400': 2.62, '400-500': 2.78, '500+': 2.95 } },
};

function getWeightBand(weight: number): string {
  if (weight < 300) return '200-300';
  if (weight < 400) return '300-400';
  if (weight < 500) return '400-500';
  return '500+';
}

export default function PriceCheckerPage() {
  const [breed, setBreed] = useState('Aberdeen Angus');
  const [sex, setSex] = useState('STEER');
  const [weight, setWeight] = useState('380');
  const [age, setAge] = useState('18');

  const w = parseInt(weight) || 0;
  const band = getWeightBand(w);
  const pricePerKg = PRICE_DATA[breed]?.[sex]?.[band] || 0;
  const estimatedValue = Math.round(w * pricePerKg);

  // Compare with other breeds
  const comparisons = Object.entries(PRICE_DATA)
    .filter(([b]) => b !== breed)
    .map(([b, data]) => ({
      breed: b,
      pricePerKg: data[sex]?.[band] || 0,
      total: Math.round(w * (data[sex]?.[band] || 0)),
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/markets" className="text-gray-500 hover:text-gray-700 text-sm">← Back to Markets</Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Price Checker</h1>
        <p className="text-gray-600 mt-1">Estimate market value by breed, sex, weight and age</p>
      </div>

      {/* Input form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
            <select value={breed} onChange={(e) => setBreed(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
              {Object.keys(PRICE_DATA).map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
              <option value="STEER">Steer</option>
              <option value="HEIFER">Heifer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (months)</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
        <p className="text-emerald-200 text-sm">Estimated Market Value</p>
        <p className="text-5xl font-bold mt-2">£{estimatedValue.toLocaleString()}</p>
        <p className="text-emerald-200 mt-2">
          {breed} {sex.toLowerCase()} • {weight} kg • £{pricePerKg.toFixed(2)}/kg
        </p>
        <p className="text-emerald-300 text-sm mt-1">Weight band: {band} kg • Age: {age} months</p>
      </div>

      {/* Breed comparison */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Compare with Other Breeds</h2>
          <p className="text-sm text-gray-500">Same weight ({weight} kg) and sex ({sex.toLowerCase()})</p>
        </div>
        <div className="divide-y divide-gray-100">
          {/* Current breed highlight */}
          <div className="p-4 bg-emerald-50 flex items-center justify-between">
            <div>
              <p className="font-medium text-emerald-900">{breed}</p>
              <p className="text-sm text-emerald-700">£{pricePerKg.toFixed(2)}/kg</p>
            </div>
            <p className="text-xl font-bold text-emerald-700">£{estimatedValue.toLocaleString()}</p>
          </div>
          {comparisons.map((c) => (
            <div key={c.breed} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-gray-900">{c.breed}</p>
                <p className="text-sm text-gray-500">£{c.pricePerKg.toFixed(2)}/kg</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">£{c.total.toLocaleString()}</p>
                <p className={`text-sm ${c.total > estimatedValue ? 'text-emerald-600' : c.total < estimatedValue ? 'text-red-600' : 'text-gray-500'}`}>
                  {c.total > estimatedValue ? `+£${(c.total - estimatedValue).toLocaleString()}` : c.total < estimatedValue ? `-£${(estimatedValue - c.total).toLocaleString()}` : 'Same'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Prices are indicative averages from recent UK market data. Actual sale prices may vary based on condition, conformation, market demand, and individual buyer interest.
        </p>
      </div>
    </div>
  );
}
