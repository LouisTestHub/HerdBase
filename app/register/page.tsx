import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-emerald-700 rounded-xl p-3 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Start your free calving book</h1>
            <p className="text-gray-600">No card required — get started in 30 seconds</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
              <input
                type="text"
                placeholder="Tom Harrison"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Farm name</label>
              <input
                type="text"
                placeholder="Oakfield Farm"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="tom@oakfieldfarm.co.uk"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Herd size (approx.)</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                <option>1 – 50 head</option>
                <option>51 – 200 head</option>
                <option>201 – 500 head</option>
                <option>500+ head</option>
              </select>
            </div>

            <Link
              href="/free/calving"
              className="block w-full bg-emerald-700 text-white text-center px-6 py-3.5 rounded-lg hover:bg-emerald-800 transition font-semibold text-lg"
            >
              Create Free Account
            </Link>

            <p className="text-xs text-gray-500 text-center">
              Free forever for up to 50 animals. No credit card needed.
            </p>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-700 hover:text-emerald-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 bg-emerald-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-emerald-900 mb-2">✨ What&apos;s included free:</h3>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Calving book with due date tracking</li>
              <li>• Basic herd register (up to 50 animals)</li>
              <li>• Calving alerts & notifications</li>
              <li>• Works on phone, tablet & desktop</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
