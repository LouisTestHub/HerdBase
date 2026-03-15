import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function FeedPage() {
  const [inventory, rations, recentFeeding] = await Promise.all([
    prisma.feedInventory.findMany({
      orderBy: { feedType: 'asc' },
      include: {
        rationComponents: {
          include: {
            ration: { select: { name: true } },
          },
        },
      },
    }),
    prisma.feedRation.findMany({
      where: { isActive: true },
      include: {
        components: {
          include: {
            feedInventory: { select: { name: true, unit: true } },
          },
        },
      },
    }),
    prisma.feedingRecord.findMany({
      take: 20,
      orderBy: { date: 'desc' },
      include: {
        ration: { select: { name: true, cattleType: true } },
      },
    }),
  ]);

  const totalStockValue = inventory.reduce(
    (sum, item) => sum + (item.currentStock * (item.costPerUnit || 0)),
    0
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed Management</h1>
        <p className="text-gray-600">Feed inventory, ration calculator, and cost tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <span className="text-3xl block mb-2">🌾</span>
          <p className="text-3xl font-bold text-gray-900">{inventory.length}</p>
          <p className="text-sm text-gray-600">Feed Types</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">📊</span>
          <p className="text-3xl font-bold text-emerald-700">{rations.length}</p>
          <p className="text-sm text-emerald-600">Active Rations</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <span className="text-3xl block mb-2">💰</span>
          <p className="text-3xl font-bold text-blue-700">£{(totalStockValue / 1000).toFixed(1)}k</p>
          <p className="text-sm text-blue-600">Stock Value</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <span className="text-3xl block mb-2">📅</span>
          <p className="text-3xl font-bold text-amber-700">{recentFeeding.length}</p>
          <p className="text-sm text-amber-600">Recent Feeding Records</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Feed Inventory */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Feed Inventory</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {inventory.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.feedType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {item.currentStock} {item.unit}
                    </p>
                    <p className="text-xs text-gray-500">
                      £{item.costPerUnit}/unit
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <p className="text-xs text-gray-500">DM</p>
                    <p className="text-sm font-medium">{item.dryMatterPercent || '-'}%</p>
                  </div>
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <p className="text-xs text-gray-500">Protein</p>
                    <p className="text-sm font-medium">{item.proteinPercent || '-'}%</p>
                  </div>
                  <div className="bg-gray-50 rounded px-2 py-1">
                    <p className="text-xs text-gray-500">Energy</p>
                    <p className="text-sm font-medium">{item.energyMJPerKg || '-'} MJ/kg</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Rations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Active Feed Rations</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {rations.map((ration) => (
              <div key={ration.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{ration.name}</p>
                    <p className="text-sm text-gray-600">{ration.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ration.cattleType === 'DAIRY'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {ration.cattleType}
                  </span>
                </div>
                <div className="space-y-1">
                  {ration.components.map((comp) => (
                    <div key={comp.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{comp.feedInventory.name}</span>
                      <span className="font-medium text-gray-900">
                        {comp.amountKg}kg ({comp.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Feeding Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Feeding Records</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + New Record
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Cattle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Fed (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost/Head</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentFeeding.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.ration.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        record.ration.cattleType === 'DAIRY'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {record.ration.cattleType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.numberOfCattle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.totalFedKg.toFixed(1)} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.costPerHead ? `£${record.costPerHead.toFixed(2)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          + Add Feed Stock
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🧮 Ration Calculator
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Feed Efficiency Report
        </button>
      </div>
    </div>
  );
}
