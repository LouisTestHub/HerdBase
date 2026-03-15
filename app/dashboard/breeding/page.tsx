import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function BreedingPage() {
  const [recentServices, pregnantCows, upcomingCalvings, calvingHistory, conceptionStats] = await Promise.all([
    prisma.breedingRecord.findMany({
      take: 30,
      orderBy: { serviceDate: 'desc' },
      include: {
        cow: { select: { tagNumber: true, name: true, breed: true } },
        bull: { select: { tagNumber: true, name: true } },
        recordedBy: { select: { name: true } },
      },
    }),
    prisma.breedingRecord.findMany({
      where: {
        pregnancyConfirmed: true,
        expectedCalvingDate: { gte: new Date() },
      },
      orderBy: { expectedCalvingDate: 'asc' },
      include: {
        cow: { select: { tagNumber: true, name: true } },
      },
    }),
    prisma.breedingRecord.findMany({
      where: {
        expectedCalvingDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { expectedCalvingDate: 'asc' },
      include: {
        cow: { select: { tagNumber: true, name: true } },
      },
    }),
    prisma.calvingRecord.findMany({
      take: 10,
      orderBy: { calvingDate: 'desc' },
      include: {
        cow: { select: { tagNumber: true, name: true } },
      },
    }),
    prisma.breedingRecord.groupBy({
      by: ['pregnancyConfirmed'],
      _count: true,
    }),
  ]);

  const totalServices = recentServices.length;
  const confirmed = conceptionStats.find((s) => s.pregnancyConfirmed === true)?._count || 0;
  const conceptionRate = totalServices > 0 ? ((confirmed / totalServices) * 100).toFixed(1) : '0';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Breeding & Fertility</h1>
        <p className="text-gray-600">Heat detection, insemination records, and fertility analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💝</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalServices}</p>
          <p className="text-sm text-gray-600">Services (Last 30)</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🤰</span>
          </div>
          <p className="text-3xl font-bold text-emerald-700">{pregnantCows.length}</p>
          <p className="text-sm text-emerald-600">Confirmed Pregnant</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-amber-700">{upcomingCalvings.length}</p>
          <p className="text-sm text-amber-600">Due Within 14 Days</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-blue-700">{conceptionRate}%</p>
          <p className="text-sm text-blue-600">Conception Rate</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Calvings (Next 14 Days) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Calving Soon (Next 14 Days)</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {upcomingCalvings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-sm">No calvings due in next 14 days</p>
              </div>
            ) : (
              upcomingCalvings.map((breeding) => {
                const daysUntil = breeding.expectedCalvingDate
                  ? Math.ceil((breeding.expectedCalvingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  : 0;
                return (
                  <div key={breeding.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {breeding.cow.name || breeding.cow.tagNumber}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Expected: {breeding.expectedCalvingDate?.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            daysUntil <= 3
                              ? 'bg-red-100 text-red-700'
                              : daysUntil <= 7
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {daysUntil}d
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Calving History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Calvings</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {calvingHistory.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-3xl mb-2">🍼</p>
                <p className="text-sm">No recent calvings</p>
              </div>
            ) : (
              calvingHistory.map((calving) => (
                <div key={calving.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {calving.cow.name || calving.cow.tagNumber}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {calving.calvingDate.toLocaleDateString()} • {calving.calfSex} •{' '}
                        {calving.calfWeight ? `${calving.calfWeight}kg` : 'No weight'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Birth ease: {calving.birthEase}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          calving.birthEase === 'EASY'
                            ? 'bg-green-100 text-green-700'
                            : calving.birthEase === 'MODERATE'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {calving.birthEase}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Services */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Services</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + Record Service
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cow</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bull / Straw</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pregnancy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Calving</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {service.serviceDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900 text-sm">
                      {service.cow.name || service.cow.tagNumber}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {service.cow.breed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        service.serviceType === 'ARTIFICIAL_INSEMINATION'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {service.serviceType === 'ARTIFICIAL_INSEMINATION' ? 'AI' : 'Natural'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.bull
                      ? service.bull.name || service.bull.tagNumber
                      : service.strawNumber || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {service.aiTechnicianName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.pregnancyConfirmed ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        ✓ Confirmed
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {service.expectedCalvingDate?.toLocaleDateString() || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.cost ? `£${service.cost.toFixed(2)}` : '-'}
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
          + Record Service
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🤰 Pregnancy Check
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Fertility Report
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🐂 Bull Performance
        </button>
      </div>
    </div>
  );
}
