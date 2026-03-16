import Link from 'next/link';

const MOCK_TESTS = [
  { id: 'tb1', date: '2025-09-15', vet: 'Mr J. Williams MRCVS', totalTested: 145, negative: 143, inconclusive: 1, reactors: 1, otfStatus: 'OTF', aphaRef: 'APHA-2025-09-1234' },
  { id: 'tb2', date: '2025-03-12', vet: 'Ms S. Jones MRCVS', totalTested: 148, negative: 148, inconclusive: 0, reactors: 0, otfStatus: 'OTF', aphaRef: 'APHA-2025-03-0987' },
  { id: 'tb3', date: '2024-09-10', vet: 'Mr J. Williams MRCVS', totalTested: 140, negative: 140, inconclusive: 0, reactors: 0, otfStatus: 'OTF', aphaRef: 'APHA-2024-09-0765' },
];

const ANIMALS_DUE = [
  { tag: 'UK 123456 00101', name: 'Daisy', lastTested: '2025-09-15', result: 'NEGATIVE' },
  { tag: 'UK 123456 00087', name: 'Buttercup', lastTested: '2025-09-15', result: 'NEGATIVE' },
  { tag: 'UK 123456 00045', name: 'Clover', lastTested: 'Never', result: 'NEW' },
  { tag: 'UK 123456 00112', name: 'Primrose', lastTested: '2025-09-15', result: 'INCONCLUSIVE' },
];

export default function TBTestingDashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TB Testing</h1>
          <p className="text-gray-600 mt-1">Manage tuberculosis testing, OTF status, and reactor tracking</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/tb-testing/settings" className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            ⚙️ Settings
          </Link>
          <Link href="/admin/tb-testing/new" className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition font-medium text-sm">
            + Record New Test
          </Link>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">OTF Status</span>
            <span className="w-3 h-3 bg-emerald-500 rounded-full" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">OTF</p>
          <p className="text-xs text-gray-500 mt-1">Officially TB Free</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="text-sm text-gray-500">Next Test Due</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">15 Mar 2026</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Due this week</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="text-sm text-gray-500">Animals to Test</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">148</p>
          <p className="text-xs text-gray-500 mt-1">All eligible cattle</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="text-sm text-gray-500">Movement Restrictions</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">None</p>
          <p className="text-xs text-gray-500 mt-1">Free to move</p>
        </div>
      </div>

      {/* Reactor alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔴</span>
          <div>
            <h3 className="font-semibold text-red-900">1 Reactor from last test</h3>
            <p className="text-sm text-red-700 mt-1">
              <span className="font-medium">UK 123456 00055</span> (Thistle) — Reactor identified 15 Sep 2025. Awaiting removal confirmation.
            </p>
            <Link href="/admin/tb-testing/tb1" className="text-sm text-red-800 font-medium mt-2 inline-block hover:underline">
              View test details →
            </Link>
          </div>
        </div>
      </div>

      {/* Test History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Test History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Vet</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tested</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Negative</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">IR</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Reactors</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">OTF</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">APHA Ref</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_TESTS.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{t.vet}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{t.totalTested}</td>
                  <td className="px-6 py-3 text-sm text-emerald-700 font-medium">{t.negative}</td>
                  <td className="px-6 py-3 text-sm">{t.inconclusive > 0 ? <span className="text-amber-600 font-medium">{t.inconclusive}</span> : <span className="text-gray-400">0</span>}</td>
                  <td className="px-6 py-3 text-sm">{t.reactors > 0 ? <span className="text-red-600 font-bold">{t.reactors}</span> : <span className="text-gray-400">0</span>}</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">{t.otfStatus}</span></td>
                  <td className="px-6 py-3 text-sm text-gray-500 font-mono text-xs">{t.aphaRef}</td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/tb-testing/${t.id}`} className="text-emerald-700 hover:text-emerald-800 text-sm font-medium">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Animals due for testing */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Animals Due for Testing</h2>
          <span className="text-sm text-gray-500">{ANIMALS_DUE.length} of 148 shown</span>
        </div>
        <div className="divide-y divide-gray-100">
          {ANIMALS_DUE.map((a) => (
            <div key={a.tag} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-gray-900">{a.name} <span className="text-gray-500 text-sm">({a.tag})</span></p>
                <p className="text-sm text-gray-500">Last tested: {a.lastTested}</p>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                a.result === 'NEGATIVE' ? 'bg-emerald-100 text-emerald-800' :
                a.result === 'INCONCLUSIVE' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {a.result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
