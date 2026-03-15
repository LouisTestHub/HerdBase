import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AIInsightsPage() {
  const farm = await prisma.farm.findFirst();
  
  // Get breeding records
  const breedingRecords = await prisma.breedingRecord.findMany({
    include: {
      cow: true,
      bull: true,
    },
    orderBy: { serviceDate: 'desc' },
  });

  const now = new Date();
  const last12Months = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  
  const recentBreedings = breedingRecords.filter(b => b.serviceDate >= last12Months);
  const confirmedPregnancies = recentBreedings.filter(b => b.pregnancyConfirmed);
  
  const conceptionRate = recentBreedings.length > 0 
    ? ((confirmedPregnancies.length / recentBreedings.length) * 100).toFixed(1)
    : '0';

  // Upcoming calvings
  const upcomingCalvings = breedingRecords.filter(b => 
    b.expectedCalvingDate && b.expectedCalvingDate >= now
  ).slice(0, 10);

  // Calculate bull performance
  const bullPerformance = breedingRecords.reduce((acc, record) => {
    if (!record.bull) return acc;
    const bullId = record.bull.id;
    if (!acc[bullId]) {
      acc[bullId] = {
        bull: record.bull,
        services: 0,
        confirmed: 0,
      };
    }
    acc[bullId].services++;
    if (record.pregnancyConfirmed) acc[bullId].confirmed++;
    return acc;
  }, {} as Record<string, { bull: any; services: number; confirmed: number }>);

  const bullStats = Object.values(bullPerformance).map(b => ({
    ...b,
    rate: b.services > 0 ? ((b.confirmed / b.services) * 100).toFixed(1) : '0',
  })).sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));

  // Mock heat detection data
  const heatAlerts = [
    { id: '1', tagNumber: 'UK123456', name: 'Bessie', daysInCycle: 21, confidence: 95, lastService: new Date('2024-11-15') },
    { id: '2', tagNumber: 'UK123457', name: 'Daisy', daysInCycle: 19, confidence: 88, lastService: new Date('2024-10-20') },
    { id: '3', tagNumber: 'UK123458', name: 'Clover', daysInCycle: 22, confidence: 91, lastService: null },
  ];

  // Calculate optimal service windows
  const optimalWindows = heatAlerts.map(alert => ({
    ...alert,
    optimalStart: new Date(Date.now() + (21 - alert.daysInCycle) * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000),
    optimalEnd: new Date(Date.now() + (21 - alert.daysInCycle) * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000),
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Breeding Insights</h1>
        <p className="text-gray-600">{farm?.name} • Data-driven breeding decisions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🎯</span>
          <p className="text-2xl font-bold text-gray-900">{conceptionRate}%</p>
          <p className="text-sm text-gray-600">Conception Rate</p>
          <p className="text-xs text-gray-500 mt-1">Last 12 months</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📅</span>
          <p className="text-2xl font-bold text-gray-900">{upcomingCalvings.length}</p>
          <p className="text-sm text-gray-600">Predicted Calvings</p>
          <p className="text-xs text-gray-500 mt-1">Next 90 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🔥</span>
          <p className="text-2xl font-bold text-gray-900">{heatAlerts.length}</p>
          <p className="text-sm text-gray-600">Heat Alerts</p>
          <p className="text-xs text-gray-500 mt-1">Detected this week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">💝</span>
          <p className="text-2xl font-bold text-gray-900">{recentBreedings.length}</p>
          <p className="text-sm text-gray-600">Services</p>
          <p className="text-xs text-gray-500 mt-1">Last 12 months</p>
        </div>
      </div>

      {/* Heat Detection & Optimal Service Times */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Heat Detection & Optimal Service Windows</h2>
              <p className="text-sm text-gray-600 mt-1">AI-powered heat detection based on activity patterns</p>
            </div>
            <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
              Schedule Service
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {optimalWindows.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-4xl mb-2">📊</p>
              <p>No heat alerts detected</p>
              <p className="text-sm mt-1">Activity monitoring will identify optimal service times</p>
            </div>
          ) : (
            optimalWindows.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">
                        {alert.name || alert.tagNumber}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.confidence >= 90 ? 'bg-green-100 text-green-700' :
                        alert.confidence >= 80 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {alert.confidence}% confidence
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-600">Cycle Day</p>
                        <p className="text-sm font-medium text-gray-900">Day {alert.daysInCycle}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Optimal Window</p>
                        <p className="text-sm font-medium text-emerald-700">
                          {alert.optimalStart.toLocaleDateString()} - {alert.optimalEnd.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Last Service</p>
                        <p className="text-sm font-medium text-gray-900">
                          {alert.lastService ? alert.lastService.toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            alert.daysInCycle >= 18 && alert.daysInCycle <= 22 
                              ? 'bg-green-500' 
                              : 'bg-blue-400'
                          }`}
                          style={{ width: `${(alert.daysInCycle / 21) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">21-day cycle</span>
                    </div>
                  </div>

                  <button className="ml-4 px-4 py-2 border border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 text-sm font-medium">
                    Book AI Tech
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Predicted Calving Dates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Predicted Calving Dates</h2>
          <p className="text-sm text-gray-600 mt-1">Based on confirmed pregnancies (283-day gestation)</p>
        </div>

        <div className="divide-y divide-gray-100">
          {upcomingCalvings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-4xl mb-2">📅</p>
              <p>No upcoming calvings predicted</p>
            </div>
          ) : (
            upcomingCalvings.map((breeding) => {
              const daysUntilCalving = breeding.expectedCalvingDate 
                ? Math.ceil((breeding.expectedCalvingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : 0;
              
              const urgency = daysUntilCalving <= 7 ? 'red' : 
                            daysUntilCalving <= 30 ? 'yellow' : 'green';

              return (
                <div key={breeding.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        urgency === 'red' ? 'bg-red-100' :
                        urgency === 'yellow' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        🐄
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {breeding.cow.name || breeding.cow.tagNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          Expected: {breeding.expectedCalvingDate?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        urgency === 'red' ? 'text-red-700' :
                        urgency === 'yellow' ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {daysUntilCalving} days
                      </p>
                      <p className="text-xs text-gray-500">until calving</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bull Performance Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Bull Performance Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">Conception rates by bull (last 12 months)</p>
        </div>

        <div className="p-6">
          {bullStats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-4xl mb-2">🐂</p>
              <p>No bull performance data available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bullStats.map((stat, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {stat.bull.name || stat.bull.tagNumber}
                        </p>
                        <p className="text-sm text-gray-600">{stat.bull.breed}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{stat.rate}%</p>
                        <p className="text-xs text-gray-500">{stat.confirmed}/{stat.services} services</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          parseFloat(stat.rate) >= 70 ? 'bg-green-500' :
                          parseFloat(stat.rate) >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${stat.rate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inbreeding Coefficient Warning */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
        <div className="flex items-start">
          <span className="text-2xl mr-3">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Inbreeding Monitoring</h3>
            <p className="text-sm text-amber-800 mb-3">
              Track dam-sire relationships to maintain genetic diversity. System will alert you when selecting 
              bulls for cows with close lineage relationships (coefficient {'>'} 6.25%).
            </p>
            <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 text-sm font-medium">
              View Lineage Matrix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
