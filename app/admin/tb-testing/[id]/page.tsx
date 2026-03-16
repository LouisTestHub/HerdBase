import Link from 'next/link';

const MOCK_RESULTS = [
  { tag: 'UK 123456 00101', name: 'Daisy', result: 'NEGATIVE', skin1: 3.2, skin2: 3.0, followUp: null },
  { tag: 'UK 123456 00087', name: 'Buttercup', result: 'NEGATIVE', skin1: 2.8, skin2: 2.5, followUp: null },
  { tag: 'UK 123456 00055', name: 'Thistle', result: 'REACTOR', skin1: 4.5, skin2: 9.2, followUp: 'Awaiting removal — APHA notified 16 Sep 2025' },
  { tag: 'UK 123456 00112', name: 'Primrose', result: 'INCONCLUSIVE', skin1: 3.8, skin2: 5.1, followUp: 'Retest in 60 days' },
  { tag: 'UK 123456 00045', name: 'Clover', result: 'NEGATIVE', skin1: 2.5, skin2: 2.3, followUp: null },
  { tag: 'UK 123456 00076', name: 'Rosie', result: 'NEGATIVE', skin1: 3.0, skin2: 2.8, followUp: null },
  { tag: 'UK 123456 00033', name: 'Bluebell', result: 'NEGATIVE', skin1: 2.2, skin2: 2.0, followUp: null },
  { tag: 'UK 123456 00091', name: 'Violet', result: 'NEGATIVE', skin1: 3.1, skin2: 2.9, followUp: null },
];

export default function TBTestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In real app, fetch by params.id
  void params;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tb-testing" className="text-gray-500 hover:text-gray-700 text-sm">← Back to TB Testing</Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TB Test — 15 September 2025</h1>
          <p className="text-gray-600 mt-1">APHA Reference: APHA-2025-09-1234</p>
        </div>
        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">OTF Maintained</span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Vet</p>
          <p className="text-sm font-medium text-gray-900 mt-1">Mr J. Williams MRCVS</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Total Tested</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">145</p>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center">
          <p className="text-sm text-emerald-600">Negative</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">143</p>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-center">
          <p className="text-sm text-amber-600">Inconclusive</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">1</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-4 text-center">
          <p className="text-sm text-red-600">Reactors</p>
          <p className="text-2xl font-bold text-red-700 mt-1">1</p>
        </div>
      </div>

      {/* Reactor follow-up */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="font-semibold text-red-900 mb-3">🔴 Reactor Follow-Up</h3>
        <div className="bg-white rounded-lg p-4 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Thistle <span className="text-gray-500 text-sm">(UK 123456 00055)</span></p>
              <p className="text-sm text-gray-600 mt-1">Skin measurements: Avian 4.5mm → Bovine 9.2mm (difference: +4.7mm)</p>
              <p className="text-sm text-red-700 mt-1 font-medium">Awaiting removal — APHA notified 16 Sep 2025</p>
            </div>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">REACTOR</span>
          </div>
        </div>
      </div>

      {/* Per-animal results */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Per-Animal Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Avian (mm)</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Bovine (mm)</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Result</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Follow-Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_RESULTS.map((r) => (
                <tr key={r.tag} className={`hover:bg-gray-50 transition ${r.result === 'REACTOR' ? 'bg-red-50' : r.result === 'INCONCLUSIVE' ? 'bg-amber-50' : ''}`}>
                  <td className="px-6 py-3 text-sm font-mono text-gray-900">{r.tag}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{r.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{r.skin1}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{r.skin2}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.result === 'NEGATIVE' ? 'bg-emerald-100 text-emerald-800' :
                      r.result === 'REACTOR' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>{r.result}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{r.followUp || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
