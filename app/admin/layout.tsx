import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Herd Register', href: '/dashboard/herd', icon: '🐄' },
    { name: 'Health & Medicine', href: '/dashboard/health', icon: '🏥' },
    { name: 'Breeding & Fertility', href: '/dashboard/breeding', icon: '💝' },
    { name: 'Feed Management', href: '/dashboard/feed', icon: '🌾' },
    { name: 'Weight & Growth', href: '/dashboard/weight', icon: '📈' },
    { name: 'Calving Monitor', href: '/dashboard/calving', icon: '🍼' },
    { name: 'Pasture & Grazing', href: '/dashboard/pasture', icon: '🌱' },
    { name: 'Financials', href: '/dashboard/finance', icon: '💰' },
    { name: 'Compliance & BCMS', href: '/dashboard/compliance', icon: '📋' },
    { name: 'Alerts', href: '/dashboard/alerts', icon: '🔔' },
  ];

  const tbNav = [
    { name: 'TB Testing', href: '/admin/tb-testing', icon: '🧪' },
    { name: 'EID Scanner', href: '/admin/scan', icon: '📱' },
  ];

  const marketNav = [
    { name: 'Markets', href: '/admin/markets', icon: '🏪' },
    { name: 'Prepare Lot', href: '/admin/markets/prepare-lot', icon: '📦' },
    { name: 'Price Checker', href: '/admin/markets/price-checker', icon: '💷' },
    { name: 'Movements', href: '/admin/markets/movements', icon: '🚛' },
  ];

  const exportNav = [
    { name: 'Data Exports', href: '/admin/exports', icon: '📥' },
    { name: 'BCMS Reporting', href: '/admin/exports/bcms', icon: '📤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">HerdBase</h1>
                <p className="text-xs text-gray-500">Professional Plan</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/scan" className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-200 transition flex items-center gap-1">
                📱 EID Scan
              </Link>
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                TH
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition">
                  <span className="mr-3 text-lg">{item.icon}</span>{item.name}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs font-medium text-gray-400 uppercase mb-2">TB & Compliance</p>
                {tbNav.map((item) => (
                  <Link key={item.name} href={item.href} className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition">
                    <span className="mr-3 text-lg">{item.icon}</span>{item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs font-medium text-gray-400 uppercase mb-2">Markets</p>
                {marketNav.map((item) => (
                  <Link key={item.name} href={item.href} className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition">
                    <span className="mr-3 text-lg">{item.icon}</span>{item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs font-medium text-gray-400 uppercase mb-2">Exports</p>
                {exportNav.map((item) => (
                  <Link key={item.name} href={item.href} className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition">
                    <span className="mr-3 text-lg">{item.icon}</span>{item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
