import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AlertsPage() {
  const alerts = await prisma.alert.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE');
  const acknowledgedAlerts = alerts.filter((a) => a.status === 'ACKNOWLEDGED');
  const resolvedAlerts = alerts.filter((a) => a.status === 'RESOLVED');

  const criticalAlerts = activeAlerts.filter((a) => a.severity === 'CRITICAL');
  const highAlerts = activeAlerts.filter((a) => a.severity === 'HIGH');

  const alertsByType = alerts.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
        <p className="text-gray-600">Real-time alerts from sensors, health events, and system notifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <span className="text-3xl block mb-2">🚨</span>
          <p className="text-3xl font-bold text-red-700">{activeAlerts.length}</p>
          <p className="text-sm text-red-600">Active Alerts</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <span className="text-3xl block mb-2">⚠️</span>
          <p className="text-3xl font-bold text-purple-700">{criticalAlerts.length}</p>
          <p className="text-sm text-purple-600">Critical</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <span className="text-3xl block mb-2">🔔</span>
          <p className="text-3xl font-bold text-amber-700">{highAlerts.length}</p>
          <p className="text-sm text-amber-600">High Priority</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <span className="text-3xl block mb-2">👁️</span>
          <p className="text-3xl font-bold text-blue-700">{acknowledgedAlerts.length}</p>
          <p className="text-sm text-blue-600">Acknowledged</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">✅</span>
          <p className="text-3xl font-bold text-emerald-700">{resolvedAlerts.length}</p>
          <p className="text-sm text-emerald-600">Resolved</p>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <span className="text-3xl mr-4">🚨</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-2">Critical Alerts Require Immediate Attention</h3>
              <p className="text-red-800 mb-4">
                {criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? 's' : ''} need{criticalAlerts.length === 1 ? 's' : ''} immediate action.
              </p>
              <div className="space-y-2">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="bg-white rounded-lg p-3 border border-red-200">
                    <p className="font-medium text-red-900">{alert.title}</p>
                    <p className="text-sm text-red-700 mt-1">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Types Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Alerts by Type</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4 p-6">
          {Object.entries(alertsByType).map(([type, count]) => (
            <div key={type} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 mt-1">{type.replace(/_/g, ' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">All Alerts</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 hover:bg-gray-50 transition ${
                alert.status === 'ACTIVE' ? 'bg-yellow-50/30' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-red-100 text-red-700'
                          : alert.severity === 'HIGH'
                          ? 'bg-orange-100 text-orange-700'
                          : alert.severity === 'MEDIUM'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded font-medium">
                      {alert.type.replace(/_/g, ' ')}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        alert.status === 'ACTIVE'
                          ? 'bg-red-100 text-red-700'
                          : alert.status === 'ACKNOWLEDGED'
                          ? 'bg-blue-100 text-blue-700'
                          : alert.status === 'RESOLVED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {alert.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {alert.createdAt.toLocaleString()}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{alert.title}</h3>
                  <p className="text-gray-700 mb-3">{alert.message}</p>

                  {/* Action Taken */}
                  {alert.actionTaken && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <p className="text-sm font-medium text-green-900 mb-1">Action Taken:</p>
                      <p className="text-sm text-green-700">{alert.actionTaken}</p>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                    {alert.acknowledgedAt && (
                      <span>Acknowledged: {alert.acknowledgedAt.toLocaleString()}</span>
                    )}
                    {alert.resolvedAt && (
                      <span>Resolved: {alert.resolvedAt.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-6 flex flex-col space-y-2">
                  {alert.status === 'ACTIVE' && (
                    <>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        Acknowledge
                      </button>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium">
                        Resolve
                      </button>
                    </>
                  )}
                  {alert.status === 'ACKNOWLEDGED' && (
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium">
                      Resolve
                    </button>
                  )}
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          Mark All Read
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Alert Report
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          ⚙️ Alert Settings
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📤 Export Alerts
        </button>
      </div>
    </div>
  );
}
