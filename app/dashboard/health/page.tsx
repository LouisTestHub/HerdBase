import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function HealthPage() {
  const [recentRecords, withdrawalPending, upcomingTreatments] = await Promise.all([
    prisma.healthRecord.findMany({
      take: 50,
      orderBy: { date: 'desc' },
      include: {
        cattle: { select: { tagNumber: true, name: true, breed: true } },
        administeredBy: { select: { name: true } },
      },
    }),
    prisma.healthRecord.findMany({
      where: {
        withdrawalEnds: { gte: new Date() },
      },
      orderBy: { withdrawalEnds: 'asc' },
      include: {
        cattle: { select: { tagNumber: true, name: true } },
      },
    }),
    prisma.healthRecord.findMany({
      where: {
        followUpRequired: true,
        followUpDate: { gte: new Date() },
      },
      orderBy: { followUpDate: 'asc' },
      take: 10,
      include: {
        cattle: { select: { tagNumber: true, name: true } },
      },
    }),
  ]);

  const stats = {
    totalRecords: recentRecords.length,
    vaccinations: recentRecords.filter((r) => r.eventType === 'VACCINATION').length,
    treatments: recentRecords.filter((r) => r.eventType === 'TREATMENT').length,
    withdrawalActive: withdrawalPending.length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health & Medicine</h1>
        <p className="text-gray-600">Treatment records, vaccinations, and medicine withdrawal tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💉</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.vaccinations}</p>
          <p className="text-sm text-gray-600">Vaccinations (Last 50)</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💊</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.treatments}</p>
          <p className="text-sm text-gray-600">Treatments (Last 50)</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">⏰</span>
          </div>
          <p className="text-3xl font-bold text-amber-700">{stats.withdrawalActive}</p>
          <p className="text-sm text-amber-600">Active Withdrawals</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-blue-700">{upcomingTreatments.length}</p>
          <p className="text-sm text-blue-600">Follow-ups Due</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Active Withdrawal Periods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Active Withdrawal Periods</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {withdrawalPending.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-3xl mb-2">✅</p>
                <p className="text-sm">No active withdrawals</p>
              </div>
            ) : (
              withdrawalPending.map((record) => {
                const daysRemaining = Math.ceil(
                  ((record.withdrawalEnds?.getTime() || 0) - Date.now()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div key={record.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">
                        {record.cattle.name || record.cattle.tagNumber}
                      </p>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                        {daysRemaining}d left
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{record.productName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Ends: {record.withdrawalEnds?.toLocaleDateString()}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upcoming Follow-ups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Follow-ups</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {upcomingTreatments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-3xl mb-2">📋</p>
                <p className="text-sm">No follow-ups scheduled</p>
              </div>
            ) : (
              upcomingTreatments.map((record) => (
                <div key={record.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {record.cattle.name || record.cattle.tagNumber}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{record.diagnosis || record.treatment}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {record.followUpDate?.toLocaleDateString()}
                      </p>
                    </div>
                    <button className="ml-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Health Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Health Records</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + New Record
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Withdrawal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Administered By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRecords.map((record) => (
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
                        record.eventType === 'VACCINATION'
                          ? 'bg-green-100 text-green-700'
                          : record.eventType === 'TREATMENT'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {record.eventType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.productName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-600">
                    {record.batchNumber || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {record.withdrawalEnds ? (
                      <span className="text-amber-600 font-medium">
                        {record.withdrawalMeatDays}d meat
                        {record.withdrawalMilkDays ? ` / ${record.withdrawalMilkDays}d milk` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.administeredBy?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.cost ? `£${record.cost.toFixed(2)}` : '-'}
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
          + Log Treatment
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          💉 Record Vaccination
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📄 Medicine Stock Report
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📤 Export Records
        </button>
      </div>
    </div>
  );
}
