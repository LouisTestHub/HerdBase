import Link from 'next/link';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
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
                <p className="text-xs text-gray-500">Oakfield Farm</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                TH
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-xs font-medium text-emerald-900 mb-1">Professional Plan</p>
                <p className="text-xs text-emerald-700">450 / 500 head</p>
                <Link href="/dashboard/settings" className="text-xs text-emerald-700 hover:text-emerald-900 font-medium mt-2 inline-block">
                  Manage subscription →
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
