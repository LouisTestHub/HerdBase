import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Fetch key metrics
  const [
    totalCattle,
    dairyCattle,
    beefCattle,
    activeAlerts,
    upcomingCalvings,
    recentMovements,
    totalValue,
    monthlyIncome,
    monthlyExpenses,
  ] = await Promise.all([
    prisma.cattle.count({ where: { status: 'ALIVE' } }),
    prisma.cattle.count({ where: { status: 'ALIVE', type: 'DAIRY' } }),
    prisma.cattle.count({ where: { status: 'ALIVE', type: 'BEEF' } }),
    prisma.alert.count({ where: { status: 'ACTIVE' } }),
    prisma.breedingRecord.count({
      where: {
        expectedCalvingDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.movement.count({
      where: {
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.cattle.aggregate({
      where: { status: 'ALIVE', purchasePrice: { not: null } },
      _sum: { purchasePrice: true },
    }),
    prisma.financialRecord.aggregate({
      where: {
        type: 'INCOME',
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { amount: true },
    }),
    prisma.financialRecord.aggregate({
      where: {
        type: 'EXPENSE',
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { amount: true },
    }),
  ]);

  const recentAlerts = await prisma.alert.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      farm: { select: { name: true } },
    },
  });

  const upcomingCalvingsList = await prisma.breedingRecord.findMany({
    where: {
      expectedCalvingDate: {
        gte: new Date(),
        lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    },
    orderBy: { expectedCalvingDate: 'asc' },
    take: 5,
    include: {
      cow: { select: { tagNumber: true, name: true } },
    },
  });

  const stats = [
    { label: 'Total Cattle', value: totalCattle, change: '+3 this month', icon: '🐄', color: 'bg-blue-50 text-blue-700' },
    { label: 'Dairy', value: dairyCattle, change: `${((dairyCattle / totalCattle) * 100).toFixed(0)}% of herd`, icon: '🥛', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Beef', value: beefCattle, change: `${((beefCattle / totalCattle) * 100).toFixed(0)}% of herd`, icon: '🥩', color: 'bg-amber-50 text-amber-700' },
    { label: 'Active Alerts', value: activeAlerts, change: 'Requires attention', icon: '🔔', color: 'bg-red-50 text-red-700' },
  ];

  const metrics = [
    { label: 'Herd Value', value: `£${((totalValue._sum.purchasePrice || 0) / 1000).toFixed(0)}k`, subtext: 'Purchase value', icon: '💰' },
    { label: 'Monthly Income', value: `£${((monthlyIncome._sum.amount || 0) / 1000).toFixed(1)}k`, subtext: 'This month', icon: '📈' },
    { label: 'Monthly Expenses', value: `£${((monthlyExpenses._sum.amount || 0) / 1000).toFixed(1)}k`, subtext: 'This month', icon: '📉' },
    { label: 'Net Margin', value: `£${(((monthlyIncome._sum.amount || 0) - (monthlyExpenses._sum.amount || 0)) / 1000).toFixed(1)}k`, subtext: 'This month', icon: '💵' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Oakfield Farm • Herd Mark: UK29123</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-3xl ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </span>
              <span className="text-sm text-gray-500">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-emerald-100">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">{metric.icon}</span>
              <span className="text-sm text-gray-600">{metric.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
              <Link href="/dashboard/alerts" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentAlerts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-4xl mb-2">✅</p>
                <p>No active alerts</p>
              </div>
            ) : (
              recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                          alert.severity === 'HIGH' || alert.severity === 'CRITICAL'
                            ? 'bg-red-100 text-red-700'
                            : alert.severity === 'MEDIUM'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{alert.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Calvings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Calvings (Next 30 Days)</h2>
              <Link href="/dashboard/calving" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                View calendar →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingCalvingsList.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-4xl mb-2">📅</p>
                <p>No calvings due in the next 30 days</p>
              </div>
            ) : (
              upcomingCalvingsList.map((breeding) => (
                <div key={breeding.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {breeding.cow.name || breeding.cow.tagNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Due: {breeding.expectedCalvingDate?.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-700">
                        {breeding.expectedCalvingDate
                          ? Math.ceil((breeding.expectedCalvingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                          : 0}{' '}
                        days
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Record Weight', href: '/dashboard/weight', icon: '⚖️' },
          { label: 'Log Health Event', href: '/dashboard/health', icon: '💉' },
          { label: 'Record Service', href: '/dashboard/breeding', icon: '💝' },
          { label: 'Submit BCMS', href: '/dashboard/compliance', icon: '📋' },
        ].map((action, idx) => (
          <Link
            key={idx}
            href={action.href}
            className="bg-white border-2 border-gray-200 hover:border-emerald-500 rounded-lg p-4 text-center transition group"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
