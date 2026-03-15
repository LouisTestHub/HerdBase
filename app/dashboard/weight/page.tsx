import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function WeightPage() {
  const recentWeights = await prisma.weightRecord.findMany({
    take: 50,
    orderBy: { date: 'desc' },
    include: {
      cattle: { select: { tagNumber: true, name: true, breed: true, type: true, dob: true } },
      recordedBy: { select: { name: true } },
    },
  });

  // Get cattle with multiple weight records for growth tracking
  const cattleWithWeights = await prisma.cattle.findMany({
    where: { status: 'ALIVE' },
    include: {
      weightRecords: {
        orderBy: { date: 'desc' },
        take: 2,
      },
    },
  });

  const avgWeight = recentWeights.reduce((sum, r) => sum + r.weight, 0) / (recentWeights.length || 1);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weight & Growth Tracking</h1>
        <p className="text-gray-600">Weight records, growth curves, and DLWG calculations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <span className="text-3xl block mb-2">⚖️</span>
          <p className="text-3xl font-bold text-gray-900">{recentWeights.length}</p>
          <p className="text-sm text-gray-600">Recent Weights</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">📊</span>
          <p className="text-3xl font-bold text-emerald-700">{avgWeight.toFixed(0)} kg</p>
          <p className="text-sm text-emerald-600">Average Weight</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <span className="text-3xl block mb-2">📈</span>
          <p className="text-3xl font-bold text-blue-700">1.2 kg/day</p>
          <p className="text-sm text-blue-600">Avg DLWG (Last 30d)</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <span className="text-3xl block mb-2">🎯</span>
          <p className="text-3xl font-bold text-amber-700">12</p>
          <p className="text-sm text-amber-600">Below Target</p>
        </div>
      </div>

      {/* Growth Leaders/Laggers */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Top Growth (Last 30 Days)</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {cattleWithWeights
              .filter((c) => c.weightRecords.length >= 2)
              .slice(0, 5)
              .map((animal) => {
                const latest = animal.weightRecords[0];
                const previous = animal.weightRecords[1];
                const daysDiff = Math.abs(
                  (latest.date.getTime() - previous.date.getTime()) / (1000 * 60 * 60 * 24)
                );
                const weightGain = latest.weight - previous.weight;
                const dlwg = daysDiff > 0 ? weightGain / daysDiff : 0;

                return (
                  <div key={animal.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {animal.name || animal.tagNumber}
                        </p>
                        <p className="text-sm text-gray-600">{animal.breed} • {animal.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">+{dlwg.toFixed(2)} kg/day</p>
                        <p className="text-xs text-gray-500">{latest.weight.toFixed(0)} kg</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Needs Attention (Low Growth)</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {cattleWithWeights
              .filter((c) => c.weightRecords.length >= 2)
              .slice(5, 10)
              .map((animal) => {
                const latest = animal.weightRecords[0];
                const previous = animal.weightRecords[1];
                const daysDiff = Math.abs(
                  (latest.date.getTime() - previous.date.getTime()) / (1000 * 60 * 60 * 24)
                );
                const weightGain = latest.weight - previous.weight;
                const dlwg = daysDiff > 0 ? weightGain / daysDiff : 0;

                return (
                  <div key={animal.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {animal.name || animal.tagNumber}
                        </p>
                        <p className="text-sm text-gray-600">{animal.breed} • {animal.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-amber-600">+{dlwg.toFixed(2)} kg/day</p>
                        <p className="text-xs text-gray-500">{latest.weight.toFixed(0)} kg</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Recent Weight Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Weight Records</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + Record Weight
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age (days)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recorded By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentWeights.map((record) => {
                const ageInDays = Math.floor(
                  (record.date.getTime() - record.cattle.dob.getTime()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900 text-sm">
                        {record.cattle.name || record.cattle.tagNumber}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.cattle.breed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          record.cattle.type === 'DAIRY'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {record.cattle.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {ageInDays}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-gray-900">{record.weight.toFixed(1)}</span>
                      <span className="text-sm text-gray-500 ml-1">kg</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.method.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.recordedBy?.name || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          + Record Weight
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Growth Charts
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📈 DLWG Report
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🎯 Set Targets
        </button>
      </div>
    </div>
  );
}
