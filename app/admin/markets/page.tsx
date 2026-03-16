import Link from 'next/link';
import { UK_MARKETS, MOCK_PRICES } from '@/lib/uk-markets';

export default function MarketsPage() {
  const nearbyMarkets = UK_MARKETS.slice(0, 8); // Mock "nearby"
  const topPrices = MOCK_PRICES.filter((p) => p.category.includes('Store steers'));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Livestock Markets</h1>
          <p className="text-gray-600 mt-1">Nearby markets, upcoming sales, and price trends</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/markets/price-checker" className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            💷 Price Checker
          </Link>
          <Link href="/admin/markets/prepare-lot" className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition font-medium text-sm">
            + Prepare Sale Lot
          </Link>
        </div>
      </div>

      {/* Price trends */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topPrices.slice(0, 4).map((p) => (
          <div key={`${p.breed}-${p.category}`} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{p.breed}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">£{p.avgPricePerKg.toFixed(2)}<span className="text-sm font-normal text-gray-500">/kg</span></p>
            <div className="flex items-center gap-1 mt-1">
              {p.trend === 'up' && <span className="text-emerald-600 text-sm">↑ Rising</span>}
              {p.trend === 'down' && <span className="text-red-600 text-sm">↓ Falling</span>}
              {p.trend === 'stable' && <span className="text-gray-500 text-sm">→ Stable</span>}
            </div>
            <p className="text-xs text-gray-400 mt-1">{p.category}</p>
          </div>
        ))}
      </div>

      {/* Upcoming sales */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Sale Dates</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { market: 'Hereford Livestock Market', date: '18 Mar 2026', type: 'Store Cattle Sale', entries: 245 },
            { market: 'Shrewsbury Livestock Auction', date: '19 Mar 2026', type: 'Prime Cattle', entries: 180 },
            { market: 'Ludlow Livestock Market', date: '23 Mar 2026', type: 'Store & Breeding', entries: 120 },
            { market: 'Welshpool Livestock Market', date: '23 Mar 2026', type: 'Store Cattle', entries: 200 },
            { market: 'Chelford Livestock', date: '24 Mar 2026', type: 'Dairy Sale', entries: 95 },
          ].map((sale) => (
            <div key={`${sale.market}-${sale.date}`} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-gray-900">{sale.market}</p>
                <p className="text-sm text-gray-500">{sale.type} • {sale.entries} entries expected</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{sale.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby markets */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Nearby Markets ({UK_MARKETS.length} total)</h2>
          <span className="text-sm text-gray-500">Showing closest 8</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Market</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">County</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Market Day</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Specialist Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {nearbyMarkets.map((m) => (
                <tr key={m.name} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{m.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{m.location}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{m.county}</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">{m.marketDay}</span></td>
                  <td className="px-6 py-3 text-sm text-gray-500">{m.specialistSales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent prices table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Market Prices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Avg £/kg</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Avg £/head</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_PRICES.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{p.breed}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{p.category}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">£{p.avgPricePerKg.toFixed(2)}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">£{p.avgHeadPrice.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    {p.trend === 'up' && <span className="text-emerald-600 text-sm font-medium">↑ Up</span>}
                    {p.trend === 'down' && <span className="text-red-600 text-sm font-medium">↓ Down</span>}
                    {p.trend === 'stable' && <span className="text-gray-500 text-sm">→ Stable</span>}
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
