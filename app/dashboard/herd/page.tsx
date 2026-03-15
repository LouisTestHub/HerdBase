import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function HerdRegisterPage() {
  const cattle = await prisma.cattle.findMany({
    where: { status: 'ALIVE' },
    include: {
      currentPaddock: { select: { name: true } },
      dam: { select: { tagNumber: true, name: true } },
    },
    orderBy: { tagNumber: 'asc' },
  });

  const stats = {
    total: cattle.length,
    dairy: cattle.filter((c) => c.type === 'DAIRY').length,
    beef: cattle.filter((c) => c.type === 'BEEF').length,
    cows: cattle.filter((c) => c.sex === 'COW').length,
    heifers: cattle.filter((c) => c.sex === 'HEIFER').length,
    bulls: cattle.filter((c) => c.sex === 'BULL').length,
    steers: cattle.filter((c) => c.sex === 'STEER').length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Herd Register</h1>
        <p className="text-gray-600">Complete digital herd register with RFID integration</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-600">Total Head</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <p className="text-2xl font-bold text-emerald-700">{stats.dairy}</p>
          <p className="text-xs text-emerald-600">Dairy</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <p className="text-2xl font-bold text-amber-700">{stats.beef}</p>
          <p className="text-xs text-amber-600">Beef</p>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
          <p className="text-2xl font-bold text-pink-700">{stats.cows}</p>
          <p className="text-xs text-pink-600">Cows</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <p className="text-2xl font-bold text-purple-700">{stats.heifers}</p>
          <p className="text-xs text-purple-600">Heifers</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-2xl font-bold text-blue-700">{stats.bulls}</p>
          <p className="text-xs text-blue-600">Bulls</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold text-gray-700">{stats.steers}</p>
          <p className="text-xs text-gray-600">Steers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Tag number, name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">All Types</option>
              <option value="DAIRY">Dairy</option>
              <option value="BEEF">Beef</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">All</option>
              <option value="COW">Cows</option>
              <option value="HEIFER">Heifers</option>
              <option value="BULL">Bulls</option>
              <option value="STEER">Steers</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">All Breeds</option>
              <option>Holstein</option>
              <option>Hereford</option>
              <option>Angus</option>
              <option>Charolais</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cattle Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tag Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Breed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sex
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RFID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cattle.map((animal) => {
                const ageYears = Math.floor(
                  (Date.now() - animal.dob.getTime()) / (1000 * 60 * 60 * 24 * 365)
                );
                const ageMonths = Math.floor(
                  ((Date.now() - animal.dob.getTime()) % (1000 * 60 * 60 * 24 * 365)) /
                    (1000 * 60 * 60 * 24 * 30)
                );

                return (
                  <tr key={animal.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {animal.tagNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{animal.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          animal.type === 'DAIRY'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {animal.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {animal.breed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{animal.sex}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {ageYears}y {ageMonths}m
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {animal.currentWeight ? `${animal.currentWeight.toFixed(0)} kg` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {animal.currentPaddock?.name || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {animal.rfidTag ? (
                        <span className="text-xs font-mono text-green-600">✓ Linked</span>
                      ) : (
                        <span className="text-xs text-gray-400">No tag</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {cattle.length} cattle • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          + Add New Cattle
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📥 Import from CSV
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📤 Export to Excel
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🏷️ Print Ear Tags
        </button>
      </div>
    </div>
  );
}
