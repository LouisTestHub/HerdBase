import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function PasturePage() {
  const [paddocks, recentRotations, grassData] = await Promise.all([
    prisma.paddock.findMany({
      orderBy: { name: 'asc' },
      include: {
        cattle: { where: { status: 'ALIVE' } },
        grazingRotations: { orderBy: { moveInDate: 'desc' }, take: 1 },
      },
    }),
    prisma.grazingRotation.findMany({
      take: 20,
      orderBy: { moveInDate: 'desc' },
      include: {
        paddock: { select: { name: true } },
      },
    }),
    prisma.grassGrowthData.findMany({
      take: 50,
      orderBy: { date: 'desc' },
      include: {
        paddock: { select: { name: true } },
      },
    }),
  ]);

  const totalArea = paddocks.reduce((sum, p) => sum + p.areaHectares, 0);
  const avgCover = paddocks.reduce((sum, p) => sum + (p.currentCover || 0), 0) / (paddocks.length || 1);
  const totalCattle = paddocks.reduce((sum, p) => sum + p.cattle.length, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pasture & Grazing Management</h1>
        <p className="text-gray-600">Paddock mapping, grazing rotation, grass growth tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <span className="text-3xl block mb-2">🌱</span>
          <p className="text-3xl font-bold text-gray-900">{paddocks.length}</p>
          <p className="text-sm text-gray-600">Total Paddocks</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">📏</span>
          <p className="text-3xl font-bold text-emerald-700">{totalArea.toFixed(1)} ha</p>
          <p className="text-sm text-emerald-600">Total Grazing Area</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <span className="text-3xl block mb-2">📊</span>
          <p className="text-3xl font-bold text-blue-700">{avgCover.toFixed(0)}</p>
          <p className="text-sm text-blue-600">Avg Cover (kg DM/ha)</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <span className="text-3xl block mb-2">🐄</span>
          <p className="text-3xl font-bold text-amber-700">{totalCattle}</p>
          <p className="text-sm text-amber-600">Cattle at Pasture</p>
        </div>
      </div>

      {/* Paddock Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Paddock Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paddock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area (ha)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cover (kg DM/ha)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stocking Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Cattle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Grazed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Water</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fencing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paddocks.map((paddock) => {
                const stockingRate = paddock.areaHectares > 0 ? paddock.cattle.length / paddock.areaHectares : 0;
                const coverStatus =
                  (paddock.currentCover || 0) > 2400
                    ? 'Excellent'
                    : (paddock.currentCover || 0) > 2000
                    ? 'Good'
                    : (paddock.currentCover || 0) > 1600
                    ? 'Fair'
                    : 'Low';

                return (
                  <tr key={paddock.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{paddock.name}</p>
                      {paddock.reference && <p className="text-xs text-gray-500">{paddock.reference}</p>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {paddock.areaHectares.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{paddock.currentCover || 0}</p>
                        <p className="text-xs text-gray-500">{coverStatus}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {stockingRate.toFixed(2)} LU/ha
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-gray-900">{paddock.cattle.length}</span>
                      <span className="text-sm text-gray-500"> head</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {paddock.lastGrazedDate?.toLocaleDateString() || 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {paddock.waterSource ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          paddock.fencing === 'GOOD'
                            ? 'bg-green-100 text-green-700'
                            : paddock.fencing === 'FAIR'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {paddock.fencing}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {paddock.cattle.length > 0 ? (
                        <span className="text-emerald-600 font-medium text-xs">🐄 In use</span>
                      ) : (
                        <span className="text-gray-400 text-xs">Resting</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Grazing Rotations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Grazing Rotations</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {recentRotations.map((rotation) => (
              <div key={rotation.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{rotation.paddock.name}</p>
                  <span className="text-xs text-gray-500">
                    {rotation.numberOfCattle} head • {rotation.grazingDays || '-'}d
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Move in: {rotation.moveInDate.toLocaleDateString()}
                  {rotation.moveOutDate && ` • Move out: ${rotation.moveOutDate.toLocaleDateString()}`}
                </p>
                {rotation.preCoverKgDM && rotation.postCoverKgDM && (
                  <p className="text-xs text-gray-500 mt-1">
                    Cover: {rotation.preCoverKgDM} → {rotation.postCoverKgDM} kg DM/ha
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grass Growth Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Grass Measurements</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {grassData.slice(0, 10).map((data) => (
              <div key={data.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{data.paddock.name}</p>
                  <span className="text-xs text-gray-500">{data.date.toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Cover</p>
                    <p className="text-sm font-medium text-gray-900">{data.coverKgDM} kg DM/ha</p>
                  </div>
                  {data.height && (
                    <div>
                      <p className="text-xs text-gray-500">Height</p>
                      <p className="text-sm font-medium text-gray-900">{data.height} cm</p>
                    </div>
                  )}
                  {data.growthRate && (
                    <div>
                      <p className="text-xs text-gray-500">Growth Rate</p>
                      <p className="text-sm font-medium text-gray-900">{data.growthRate} kg/ha/d</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Source: {data.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          + Record Grass Cover
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🗺️ Paddock Map
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🔄 Rotation Planner
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Growth Report
        </button>
      </div>
    </div>
  );
}
