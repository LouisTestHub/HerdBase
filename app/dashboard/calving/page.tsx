import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function CalvingPage() {
  const [upcomingCalvings, recentCalvings, calvingStats] = await Promise.all([
    prisma.breedingRecord.findMany({
      where: {
        expectedCalvingDate: { gte: new Date() },
        pregnancyConfirmed: true,
      },
      orderBy: { expectedCalvingDate: 'asc' },
      take: 50,
      include: {
        cow: { select: { tagNumber: true, name: true, breed: true, currentPaddock: { select: { name: true } } } },
      },
    }),
    prisma.calvingRecord.findMany({
      take: 30,
      orderBy: { calvingDate: 'desc' },
      include: {
        cow: { select: { tagNumber: true, name: true, breed: true } },
        assistedBy: { select: { name: true } },
      },
    }),
    prisma.calvingRecord.groupBy({
      by: ['birthEase'],
      _count: true,
    }),
  ]);

  const easyCalvings = calvingStats.find((s) => s.birthEase === 'EASY')?._count || 0;
  const totalCalvings = calvingStats.reduce((sum, s) => sum + s._count, 0);
  const easyRate = totalCalvings > 0 ? ((easyCalvings / totalCalvings) * 100).toFixed(1) : '0';

  const next7Days = upcomingCalvings.filter(
    (c) =>
      c.expectedCalvingDate &&
      c.expectedCalvingDate.getTime() <= Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calving Monitor</h1>
        <p className="text-gray-600">Calving calendar, due dates, sensor alerts, and birth records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <span className="text-3xl block mb-2">🚨</span>
          <p className="text-3xl font-bold text-red-700">{next7Days.length}</p>
          <p className="text-sm text-red-600">Due Within 7 Days</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <span className="text-3xl block mb-2">📅</span>
          <p className="text-3xl font-bold text-amber-700">{upcomingCalvings.length}</p>
          <p className="text-sm text-amber-600">Total Upcoming</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">✅</span>
          <p className="text-3xl font-bold text-emerald-700">{easyRate}%</p>
          <p className="text-sm text-emerald-600">Easy Calving Rate</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <span className="text-3xl block mb-2">🍼</span>
          <p className="text-3xl font-bold text-blue-700">{recentCalvings.length}</p>
          <p className="text-sm text-blue-600">Recent Calvings</p>
        </div>
      </div>

      {/* Upcoming Calvings Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Upcoming Calvings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Until</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cow</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingCalvings.map((breeding) => {
                const daysUntil = breeding.expectedCalvingDate
                  ? Math.ceil((breeding.expectedCalvingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  : 0;

                return (
                  <tr key={breeding.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {breeding.expectedCalvingDate?.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          daysUntil <= 3
                            ? 'bg-red-100 text-red-700'
                            : daysUntil <= 7
                            ? 'bg-amber-100 text-amber-700'
                            : daysUntil <= 14
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {daysUntil} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{breeding.cow.name || breeding.cow.tagNumber}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {breeding.cow.breed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {breeding.cow.currentPaddock?.name || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {breeding.serviceDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                        {breeding.serviceType === 'ARTIFICIAL_INSEMINATION' ? 'AI' : 'Natural'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {daysUntil <= 3 ? (
                        <span className="text-red-600 font-medium text-sm">⚠️ Imminent</span>
                      ) : daysUntil <= 7 ? (
                        <span className="text-amber-600 font-medium text-sm">🔔 This Week</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Tracking</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Calvings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Calving Records</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + Record Calving
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cow</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Birth Ease</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calf Sex</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calf Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vigor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assistance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assisted By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCalvings.map((calving) => (
                <tr key={calving.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {calving.calvingDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900">{calving.cow.name || calving.cow.tagNumber}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {calving.cow.breed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        calving.birthEase === 'EASY'
                          ? 'bg-green-100 text-green-700'
                          : calving.birthEase === 'MODERATE'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {calving.birthEase}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {calving.calfSex || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {calving.calfWeight ? `${calving.calfWeight} kg` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {calving.calfVigor || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {calving.assistanceRequired ? (
                      <span className="text-amber-600 font-medium text-xs">✓ Yes</span>
                    ) : (
                      <span className="text-gray-400 text-xs">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {calving.assistedBy?.name || '-'}
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
          + Record Calving
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Calving Report
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📅 Calendar View
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          🔔 Alert Settings
        </button>
      </div>
    </div>
  );
}
