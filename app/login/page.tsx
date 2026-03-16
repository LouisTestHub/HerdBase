import Link from 'next/link';

const demoAccounts = [
  {
    role: 'Farm Owner',
    emoji: '🐄',
    email: 'tom@oakfieldfarm.co.uk',
    password: 'demo1234',
    access: 'Full access to all features',
    color: 'bg-emerald-700 hover:bg-emerald-800',
  },
  {
    role: 'Farm Manager',
    emoji: '👨‍🌾',
    email: 'sarah@oakfieldfarm.co.uk',
    password: 'demo1234',
    access: 'Operations & herd management',
    color: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    role: 'Stockman',
    emoji: '🔧',
    email: 'james@oakfieldfarm.co.uk',
    password: 'demo1234',
    access: 'Herd records only',
    color: 'bg-amber-700 hover:bg-amber-800',
  },
  {
    role: 'Vet',
    emoji: '🩺',
    email: 'vet@example.com',
    password: 'demo1234',
    access: 'Health records only',
    color: 'bg-purple-700 hover:bg-purple-800',
  },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="inline-block bg-emerald-700 rounded-xl p-3 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HerdBase</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

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
              href="/dashboard?demo=user"
              className="block w-full bg-emerald-700 text-white text-center px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold"
            >
              Sign In
            </Link>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">🚀 Try the Demo — No Sign-Up Required</h2>
              <p className="text-sm text-gray-500 mt-1">Click any role to explore HerdBase instantly</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {demoAccounts.map((account) => (
                <Link
                  key={account.role}
                  href={`/dashboard?demo=${encodeURIComponent(account.email)}`}
                  className={`${account.color} text-white rounded-xl p-4 text-center transition transform hover:scale-105 block`}
                >
                  <div className="text-2xl mb-1">{account.emoji}</div>
                  <div className="font-bold text-sm">{account.role}</div>
                  <div className="text-xs opacity-80 mt-1">{account.access}</div>
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              Demo uses sample data from Oakfield Farm — 350 head dairy/beef operation
            </p>
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-emerald-700 hover:text-emerald-800 font-medium">
                Start your free calving book
              </Link>
            </p>
            <p className="text-xs text-gray-400">No card required — free forever for up to 50 animals</p>
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
