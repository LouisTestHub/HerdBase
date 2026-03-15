import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function CalvingAlertsPage() {
  const farm = await prisma.farm.findFirst();
  
  const now = new Date();
  const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  
  const dueCalvings = await prisma.breedingRecord.findMany({
    where: {
      pregnancyConfirmed: true,
      expectedCalvingDate: {
        gte: now,
        lte: in90Days,
      },
    },
    include: {
      cow: {
        include: {
          currentPaddock: true,
        },
      },
    },
    orderBy: { expectedCalvingDate: 'asc' },
  });

  // Categorize by urgency (traffic light system)
  const categorized = dueCalvings.reduce((acc, record) => {
    const daysUntil = record.expectedCalvingDate 
      ? Math.ceil((record.expectedCalvingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 999;
    
    if (daysUntil <= 7) acc.red.push(record);
    else if (daysUntil <= 30) acc.amber.push(record);
    else acc.green.push(record);
    
    return acc;
  }, { red: [] as typeof dueCalvings, amber: [] as typeof dueCalvings, green: [] as typeof dueCalvings });

  // Mock night-watch schedule
  const nightWatch = [
    { date: new Date(), assigned: 'Tom Harper', cowsToWatch: categorized.red.length, status: 'Tonight' },
    { date: new Date(Date.now() + 86400000), assigned: 'Sarah Mitchell', cowsToWatch: categorized.red.length, status: 'Tomorrow' },
    { date: new Date(Date.now() + 2 * 86400000), assigned: 'Tom Harper', cowsToWatch: categorized.red.length + 1, status: 'Scheduled' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calving Alert System</h1>
        <p className="text-gray-600">{farm?.name} • Traffic light monitoring</p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🔴</span>
          <p className="text-2xl font-bold text-red-700">{categorized.red.length}</p>
          <p className="text-sm text-gray-600">Critical (0-7 days)</p>
          <p className="text-xs text-gray-500 mt-1">Requires night watch</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🟡</span>
          <p className="text-2xl font-bold text-yellow-700">{categorized.amber.length}</p>
          <p className="text-sm text-gray-600">Warning (8-30 days)</p>
          <p className="text-xs text-gray-500 mt-1">Monitor closely</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🟢</span>
          <p className="text-2xl font-bold text-green-700">{categorized.green.length}</p>
          <p className="text-sm text-gray-600">Normal (31-90 days)</p>
          <p className="text-xs text-gray-500 mt-1">Routine monitoring</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📊</span>
          <p className="text-2xl font-bold text-gray-900">{dueCalvings.length}</p>
          <p className="text-sm text-gray-600">Total Due</p>
          <p className="text-xs text-gray-500 mt-1">Next 90 days</p>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {categorized.red.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🚨</span>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Night Watch Required</h3>
              <p className="text-sm text-red-800 mb-3">
                {categorized.red.length} cow(s) due within 7 days. Night watch recommended for close monitoring.
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 text-sm font-medium">
                  Assign Night Watch →
                </button>
                <button className="px-4 py-2 bg-white border border-red-700 text-red-700 rounded-lg hover:bg-red-50 text-sm font-medium">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Red Alert - Critical (0-7 days) */}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-red-500 mb-8">
        <div className="p-6 bg-red-50 border-b border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔴</span>
              <h2 className="text-xl font-bold text-red-900">Critical Alert (0-7 Days)</h2>
            </div>
            <span className="px-3 py-1 bg-red-700 text-white text-sm font-bold rounded-full">
              {categorized.red.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {categorized.red.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-4xl mb-2">✅</p>
              <p>No critical alerts</p>
            </div>
          ) : (
            categorized.red.map((breeding) => {
              const daysUntil = breeding.expectedCalvingDate 
                ? Math.ceil((breeding.expectedCalvingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : 0;
              
              return (
                <div key={breeding.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {breeding.cow.name || breeding.cow.tagNumber}
                        </h3>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          {daysUntil} days
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600">Due Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {breeding.expectedCalvingDate?.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Service Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {breeding.serviceDate.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Current Location</p>
                          <p className="text-sm font-medium text-gray-900">
                            {breeding.cow.currentPaddock?.name || 'Not assigned'}
                          </p>
                        </div>
                      </div>

                      {/* Calving Checklist */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">Pre-Calving Checklist:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span>Calving pen prepared</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span>Colostrum supply ready</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span>Calving kit available</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span>Vet on standby</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button className="ml-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                      Record Calving →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Amber Alert - Warning (8-30 days) */}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-yellow-500 mb-8">
        <div className="p-6 bg-yellow-50 border-b border-yellow-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🟡</span>
              <h2 className="text-xl font-bold text-yellow-900">Warning (8-30 Days)</h2>
            </div>
            <span className="px-3 py-1 bg-yellow-700 text-white text-sm font-bold rounded-full">
              {categorized.amber.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {categorized.amber.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-4xl mb-2">✅</p>
              <p>No warning alerts</p>
            </div>
          ) : (
            categorized.amber.map((breeding) => {
              const daysUntil = breeding.expectedCalvingDate 
                ? Math.ceil((breeding.expectedCalvingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : 0;
              
              return (
                <div key={breeding.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">
                          {breeding.cow.name || breeding.cow.tagNumber}
                        </p>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                          {daysUntil} days
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Due: {breeding.expectedCalvingDate?.toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-emerald-700 hover:text-emerald-800 text-sm font-medium">
                      View →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Green - Normal (31-90 days) */}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-green-500 mb-8">
        <div className="p-6 bg-green-50 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🟢</span>
              <h2 className="text-xl font-bold text-green-900">Normal (31-90 Days)</h2>
            </div>
            <span className="px-3 py-1 bg-green-700 text-white text-sm font-bold rounded-full">
              {categorized.green.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          {categorized.green.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-4xl mb-2">📅</p>
              <p>No calvings in this period</p>
            </div>
          ) : (
            categorized.green.map((breeding) => {
              const daysUntil = breeding.expectedCalvingDate 
                ? Math.ceil((breeding.expectedCalvingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : 0;
              
              return (
                <div key={breeding.id} className="p-3 hover:bg-gray-50 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {breeding.cow.name || breeding.cow.tagNumber}
                      </p>
                      <p className="text-xs text-gray-600">
                        {breeding.expectedCalvingDate?.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm text-green-700 font-medium">{daysUntil} days</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Night Watch Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Night Watch Schedule</h2>
            <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
              Assign Watch
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {nightWatch.map((watch, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🌙</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{watch.assigned}</p>
                    <p className="text-sm text-gray-600">
                      {watch.date.toLocaleDateString()} • {watch.cowsToWatch} cows to watch
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  watch.status === 'Tonight' ? 'bg-red-100 text-red-700' :
                  watch.status === 'Tomorrow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {watch.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
