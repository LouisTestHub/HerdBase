import Link from 'next/link';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigationGroups = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Alerts', href: '/dashboard/alerts', icon: '🔔' },
      ],
    },
    {
      title: 'Herd',
      items: [
        { name: 'Herd Register', href: '/dashboard/herd', icon: '🐄' },
        { name: 'Animal Profiles', href: '/dashboard/herd', icon: '📋' },
        { name: 'Movements', href: '/dashboard/compliance', icon: '🚚' },
      ],
    },
    {
      title: 'Health',
      items: [
        { name: 'Health Records', href: '/dashboard/health', icon: '🏥' },
        { name: 'Treatments', href: '/dashboard/health', icon: '💉' },
        { name: 'Medications', href: '/dashboard/health', icon: '💊' },
      ],
    },
    {
      title: 'Breeding',
      items: [
        { name: 'Breeding Plans', href: '/dashboard/breeding', icon: '💝' },
        { name: 'AI Records', href: '/dashboard/breeding', icon: '🧬' },
        { name: 'Pregnancy Checks', href: '/dashboard/breeding', icon: '🤰' },
      ],
    },
    {
      title: 'Calving',
      items: [
        { name: 'Calving Monitor', href: '/dashboard/calving', icon: '🍼' },
        { name: 'Due Dates', href: '/dashboard/calving', icon: '📅' },
        { name: 'Calving History', href: '/dashboard/calving', icon: '📖' },
      ],
    },
    {
      title: 'Feed',
      items: [
        { name: 'Feed Plans', href: '/dashboard/feed', icon: '🌾' },
        { name: 'Rations', href: '/dashboard/feed', icon: '🧮' },
        { name: 'Stock Levels', href: '/dashboard/feed', icon: '📦' },
      ],
    },
    {
      title: 'Weight',
      items: [
        { name: 'Weight Records', href: '/dashboard/weight', icon: '⚖️' },
        { name: 'Growth Charts', href: '/dashboard/weight', icon: '📈' },
      ],
    },
    {
      title: 'Pasture',
      items: [
        { name: 'Paddock Map', href: '/dashboard/pasture', icon: '🗺️' },
        { name: 'Grazing Rotation', href: '/dashboard/pasture', icon: '🔄' },
        { name: 'Grass Measurement', href: '/dashboard/pasture', icon: '🌱' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { name: 'Income & Expenses', href: '/dashboard/finance', icon: '💰' },
        { name: 'Reports', href: '/dashboard/finance', icon: '📊' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { name: 'Farm Profile', href: '/settings', icon: '🏠' },
        { name: 'Users', href: '/settings', icon: '👥' },
        { name: 'BCMS Integration', href: '/settings', icon: '🔗' },
        { name: 'Data Export', href: '/settings', icon: '📤' },
      ],
    },
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
            <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              {navigationGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-xs font-medium text-emerald-900 mb-1">Professional Plan</p>
                <p className="text-xs text-emerald-700">350 / 500 head</p>
                <Link href="/settings" className="text-xs text-emerald-700 hover:text-emerald-900 font-medium mt-2 inline-block">
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
