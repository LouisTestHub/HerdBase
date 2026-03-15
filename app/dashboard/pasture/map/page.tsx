import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function FarmMapPage() {
  const farm = await prisma.farm.findFirst();
  
  const paddocks = await prisma.paddock.findMany({
    include: {
      cattle: {
        where: { status: 'ALIVE' },
      },
    },
    orderBy: { name: 'asc' },
  });

  // Calculate total stocking
  const totalCattle = paddocks.reduce((sum, p) => sum + p.cattle.length, 0);
  const totalHectares = paddocks.reduce((sum, p) => sum + p.areaHectares, 0);
  const avgCover = paddocks.reduce((sum, p) => sum + (p.currentCover || 0), 0) / paddocks.length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Map</h1>
        <p className="text-gray-600">{farm?.name} • Visual paddock overview with stocking</p>
      </div>

      {/* Farm Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📐</span>
          <p className="text-2xl font-bold text-gray-900">{totalHectares.toFixed(1)} ha</p>
          <p className="text-sm text-gray-600">Total Grazing Area</p>
          <p className="text-xs text-gray-500 mt-1">{paddocks.length} paddocks</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🐄</span>
          <p className="text-2xl font-bold text-gray-900">{totalCattle}</p>
          <p className="text-sm text-gray-600">Animals Grazing</p>
          <p className="text-xs text-gray-500 mt-1">{(totalCattle / totalHectares).toFixed(2)} head/ha</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🌱</span>
          <p className="text-2xl font-bold text-gray-900">{avgCover.toFixed(0)} kg</p>
          <p className="text-sm text-gray-600">Avg Grass Cover</p>
          <p className="text-xs text-gray-500 mt-1">DM per hectare</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">💧</span>
          <p className="text-2xl font-bold text-gray-900">
            {paddocks.filter(p => p.waterSource).length}/{paddocks.length}
          </p>
          <p className="text-sm text-gray-600">Water Available</p>
          <p className="text-xs text-gray-500 mt-1">Paddocks with water</p>
        </div>
      </div>

      {/* Map Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Paddock Layout</h2>
              <p className="text-sm text-gray-600 mt-1">Visual representation of farm paddocks and stocking</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                Satellite View
              </button>
              <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
                Print Map
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Grid Layout (simplified visual representation) */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {paddocks.map((paddock) => {
              const stockingRate = paddock.cattle.length / paddock.areaHectares;
              const coverLevel = paddock.currentCover 
                ? paddock.currentCover > 2000 ? 'high' 
                : paddock.currentCover > 1500 ? 'medium' 
                : 'low'
                : 'unknown';
              
              const coverColor = coverLevel === 'high' ? 'green' : 
                                coverLevel === 'medium' ? 'yellow' : 
                                coverLevel === 'low' ? 'red' : 'gray';

              return (
                <div
                  key={paddock.id}
                  className={`border-2 rounded-lg p-4 transition cursor-pointer hover:shadow-lg ${
                    paddock.cattle.length > 0 
                      ? `bg-${coverColor}-50 border-${coverColor}-500` 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  style={{ minHeight: `${Math.max(120, paddock.areaHectares * 20)}px` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{paddock.name}</h3>
                      <p className="text-xs text-gray-600">{paddock.areaHectares} ha</p>
                    </div>
                    {paddock.waterSource && (
                      <span className="text-blue-500" title="Water source available">💧</span>
                    )}
                  </div>

                  {/* Cattle Icons */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {paddock.cattle.slice(0, 20).map((_, idx) => (
                      <span key={idx} className="text-sm">🐄</span>
                    ))}
                    {paddock.cattle.length > 20 && (
                      <span className="text-xs text-gray-600">+{paddock.cattle.length - 20}</span>
                    )}
                  </div>

                  {/* Info Bar */}
                  <div className="mt-auto pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Animals:</span>
                      <span className="font-medium text-gray-900">{paddock.cattle.length}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Stocking:</span>
                      <span className="font-medium text-gray-900">{stockingRate.toFixed(1)}/ha</span>
                    </div>
                    {paddock.currentCover && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Cover:</span>
                        <span className={`font-medium text-${coverColor}-700`}>
                          {paddock.currentCover} kg
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Map Legend:</p>
            <div className="grid md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-200 border-2 border-green-500 rounded"></div>
                <span className="text-gray-700">High cover ({'>'} 2000 kg/ha)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-500 rounded"></div>
                <span className="text-gray-700">Medium cover (1500-2000)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-200 border-2 border-red-500 rounded"></div>
                <span className="text-gray-700">Low cover ({'<'} 1500 kg/ha)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">💧</span>
                <span className="text-gray-700">Water source available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paddock Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Paddock Details</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paddock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area (ha)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stocking Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grass Cover</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Water</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fencing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Grazed</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paddocks.map((paddock) => {
                const stockingRate = paddock.cattle.length / paddock.areaHectares;
                
                return (
                  <tr key={paddock.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{paddock.name}</div>
                      {paddock.reference && (
                        <div className="text-xs text-gray-500">Ref: {paddock.reference}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{paddock.areaHectares}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{paddock.cattle.length}</div>
                      <div className="text-xs text-gray-500">{stockingRate.toFixed(2)} head/ha</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        stockingRate > 3 ? 'bg-red-100 text-red-700' :
                        stockingRate > 2 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {stockingRate > 3 ? 'High' : stockingRate > 2 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {paddock.currentCover ? (
                        <div>
                          <div className="font-medium text-gray-900">{paddock.currentCover} kg</div>
                          <div className="text-xs text-gray-500">DM/ha</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not measured</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {paddock.waterSource ? (
                        <span className="text-green-700">✓ Yes</span>
                      ) : (
                        <span className="text-red-700">✗ No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${
                        paddock.fencing === 'GOOD' ? 'text-green-700' :
                        paddock.fencing === 'FAIR' ? 'text-yellow-700' :
                        paddock.fencing === 'POOR' ? 'text-red-700' :
                        'text-gray-400'
                      }`}>
                        {paddock.fencing || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {paddock.lastGrazedDate 
                        ? paddock.lastGrazedDate.toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rotation Planning */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">🔄</span>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">Rotation Planning</h3>
            <p className="text-sm text-blue-800 mb-4">
              Visual paddock map helps plan grazing rotation. Monitor grass cover, stocking rates, and rest periods
              to optimize pasture utilization and maintain grass quality.
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">
                Plan Rotation →
              </button>
              <button className="px-4 py-2 bg-white border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 text-sm font-medium">
                Measure Grass Cover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
