import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function MovementsPage() {
  const farm = await prisma.farm.findFirst();
  
  const movements = await prisma.movement.findMany({
    orderBy: { date: 'desc' },
    take: 50,
    include: {
      cattle: { select: { tagNumber: true, name: true, breed: true } },
    },
  });

  const stats = {
    last30Days: movements.filter(m => 
      m.date.getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    ).length,
    pendingBCMS: movements.filter(m => !m.bcmsSubmitted).length,
    onFarm: movements.filter(m => m.movementType === 'ON').length,
    offFarm: movements.filter(m => m.movementType === 'OFF').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Movement Recording</h1>
        <p className="text-gray-600">{farm?.name} • CPH: {farm?.cphNumber}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📊</span>
          <p className="text-2xl font-bold text-gray-900">{stats.last30Days}</p>
          <p className="text-sm text-gray-600">Movements (Last 30 Days)</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">⚠️</span>
            {stats.pendingBCMS > 0 && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pendingBCMS}</p>
          <p className="text-sm text-gray-600">Pending BCMS Submission</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">⬇️</span>
          <p className="text-2xl font-bold text-gray-900">{stats.onFarm}</p>
          <p className="text-sm text-gray-600">On-Farm Movements</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">⬆️</span>
          <p className="text-2xl font-bold text-gray-900">{stats.offFarm}</p>
          <p className="text-sm text-gray-600">Off-Farm Movements</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex space-x-3">
        <button className="px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 font-medium flex items-center">
          <span className="mr-2">➕</span>
          Record Movement
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium flex items-center">
          <span className="mr-2">📤</span>
          Submit to BCMS
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium flex items-center">
          <span className="mr-2">📊</span>
          Export Report
        </button>
      </div>

      {/* BCMS Compliance Alert */}
      {stats.pendingBCMS > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-900 mb-1">BCMS Reporting Required</h3>
              <p className="text-sm text-red-800 mb-3">
                You have {stats.pendingBCMS} movement(s) that must be reported to BCMS within 3 days of occurrence.
                Failure to report may result in cross-compliance penalties.
              </p>
              <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 text-sm font-medium">
                Submit Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movements Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Movement History</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Types</option>
                <option>On-Farm</option>
                <option>Off-Farm</option>
                <option>To Market</option>
                <option>To Abattoir</option>
              </select>
              <input 
                type="text" 
                placeholder="Search tag number..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Haulier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BCMS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    <p className="text-4xl mb-2">📋</p>
                    <p>No movements recorded</p>
                    <button className="mt-4 text-emerald-700 hover:text-emerald-800 font-medium">
                      Record your first movement →
                    </button>
                  </td>
                </tr>
              ) : (
                movements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {movement.date.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {movement.date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {movement.cattle.name || movement.cattle.tagNumber}
                          </div>
                          <div className="text-xs text-gray-500">{movement.cattle.breed}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        movement.movementType === 'ON' ? 'bg-green-100 text-green-800' :
                        movement.movementType === 'OFF' ? 'bg-blue-100 text-blue-800' :
                        movement.movementType === 'INTERNAL' ? 'bg-gray-100 text-gray-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {movement.movementType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{movement.fromLocation || '-'}</div>
                      {movement.fromCph && (
                        <div className="text-xs text-gray-500">CPH: {movement.fromCph}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{movement.toLocation || '-'}</div>
                      {movement.toCph && (
                        <div className="text-xs text-gray-500">CPH: {movement.toCph}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{movement.haulier || '-'}</div>
                      {movement.vehicleReg && (
                        <div className="text-xs text-gray-500">{movement.vehicleReg}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {movement.bcmsSubmitted ? (
                        <div>
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ✓ Submitted
                          </span>
                          {movement.bcmsSubmissionDate && (
                            <div className="text-xs text-gray-500 mt-1">
                              {movement.bcmsSubmissionDate.toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-emerald-700 hover:text-emerald-900 mr-3">Edit</button>
                      <button className="text-gray-700 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BCMS Integration Info */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">🔗</span>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">BCMS Integration</h3>
            <p className="text-sm text-blue-800 mb-4">
              All movements are automatically prepared for BCMS submission. On-farm movements must be reported within 3 days,
              off-farm movements before the animal leaves your holding. Ensure CPH numbers are accurate for compliance.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">On-Farm Movements</p>
                <p className="text-xs text-gray-600">Report within 3 days of occurrence</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">Off-Farm Movements</p>
                <p className="text-xs text-gray-600">Report before animal leaves</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">Deaths & Exports</p>
                <p className="text-xs text-gray-600">Report within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
