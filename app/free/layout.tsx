import Link from 'next/link';
import { ReactNode } from 'react';

export default function FreeLayout({ children }: { children: ReactNode }) {
  const navigation = [
    { name: 'Calving Book', href: '/free/calving', icon: '🍼' },
    { name: 'Herd Register', href: '/free/herd', icon: '🐄' },
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
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            </div>
            <Link href="/upgrade" className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <nav className="flex-1 px-4 py-6 space-y-1">
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

              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs font-medium text-gray-400 uppercase mb-2">Unlock more</p>
                {[
                  { name: 'Health Records', icon: '🏥' },
                  { name: 'Breeding', icon: '💝' },
                  { name: 'Weight Tracking', icon: '📈' },
                  { name: 'Financials', icon: '💰' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href="/upgrade"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-50 transition"
                  >
                    <span className="mr-3 text-lg opacity-40">{item.icon}</span>
                    <span>{item.name}</span>
                    <svg className="w-4 h-4 ml-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-xs font-medium text-amber-900 mb-1">Free Plan</p>
                <p className="text-xs text-amber-700">Up to 50 animals</p>
                <Link href="/upgrade" className="text-xs text-emerald-700 hover:text-emerald-900 font-medium mt-2 inline-block">
                  Upgrade for more →
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
