import Link from 'next/link';

export default function LoginPage() {
  const demoAccounts = [
    {
      name: 'Farm Owner',
      email: 'tom@oakfieldfarm.co.uk',
      password: 'demo1234',
      role: 'FARM_OWNER',
      description: 'Full access to all features',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      name: 'Farm Manager',
      email: 'sarah@oakfieldfarm.co.uk',
      password: 'demo1234',
      role: 'FARM_MANAGER',
      description: 'Operations and herd management',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Stockman',
      email: 'james@oakfieldfarm.co.uk',
      password: 'demo1234',
      role: 'WORKER',
      description: 'Herd records and daily tasks',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Vet',
      email: 'vet@example.com',
      password: 'demo1234',
      role: 'VET',
      description: 'Health records only',
      color: 'bg-red-600 hover:bg-red-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-emerald-700 rounded-xl p-3 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HerdBase</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Demo Mode Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-bold">🚀 Demo Mode - One-Click Login</h3>
            </div>
            <p className="text-sm text-white/90 mb-4">
              Click any role below to instantly access HerdBase with full demo data from Oakfield Farm (350-head mixed operation in Herefordshire)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {demoAccounts.map((account) => (
                <Link
                  key={account.email}
                  href="/dashboard"
                  className={`${account.color} text-white px-4 py-3 rounded-lg transition font-medium text-center text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                >
                  <div className="font-bold mb-1">{account.name}</div>
                  <div className="text-xs opacity-90">{account.description}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Standard Login Form */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 text-center mb-6">Or sign in with your account</p>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  placeholder="tom@oakfieldfarm.co.uk"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                  Forgot password?
                </Link>
              </div>

              <Link
                href="/dashboard"
                className="block w-full bg-emerald-700 text-white text-center px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold"
              >
                Sign In
              </Link>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/" className="text-emerald-700 hover:text-emerald-800 font-medium">
                  Start free trial
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 HerdBase by Data & Digital. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
