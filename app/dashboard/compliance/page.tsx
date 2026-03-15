import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function CompliancePage() {
  const [movements, bCMSSubmissions, passports] = await Promise.all([
    prisma.movement.findMany({
      take: 50,
      orderBy: { date: 'desc' },
      include: {
        cattle: { select: { tagNumber: true, name: true, breed: true } },
      },
    }),
    prisma.bCMSSubmission.findMany({
      take: 20,
      orderBy: { submissionDate: 'desc' },
      include: {
        movement: { include: { cattle: { select: { tagNumber: true } } } },
      },
    }),
    prisma.cattlePassport.findMany({
      take: 50,
      orderBy: { issueDate: 'desc' },
      include: {
        cattle: { select: { tagNumber: true, name: true, breed: true } },
      },
    }),
  ]);

  const pendingBcms = movements.filter((m) => !m.bcmsSubmitted).length;
  const successfulSubmissions = bCMSSubmissions.filter((s) => s.status === 'SUCCESS').length;
  const failedSubmissions = bCMSSubmissions.filter((s) => s.status === 'FAILED').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance & BCMS</h1>
        <p className="text-gray-600">BCMS submissions, cattle passports, movement logs, and inspections</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <span className="text-3xl block mb-2">⏳</span>
          <p className="text-3xl font-bold text-amber-700">{pendingBcms}</p>
          <p className="text-sm text-amber-600">Pending BCMS Submission</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">✅</span>
          <p className="text-3xl font-bold text-emerald-700">{successfulSubmissions}</p>
          <p className="text-sm text-emerald-600">Successful Submissions</p>
        </div>
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <span className="text-3xl block mb-2">❌</span>
          <p className="text-3xl font-bold text-red-700">{failedSubmissions}</p>
          <p className="text-sm text-red-600">Failed Submissions</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <span className="text-3xl block mb-2">📜</span>
          <p className="text-3xl font-bold text-blue-700">{passports.length}</p>
          <p className="text-sm text-blue-600">Cattle Passports</p>
        </div>
      </div>

      {/* Pending BCMS Submissions */}
      {pendingBcms > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <span className="text-3xl mr-4">⚠️</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900 mb-2">Action Required</h3>
              <p className="text-amber-800 mb-4">
                You have {pendingBcms} movement{pendingBcms > 1 ? 's' : ''} that need to be submitted to BCMS within 3 days of the movement date.
              </p>
              <button className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition font-medium">
                Submit to BCMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Movements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Movements</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + Record Movement
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movement Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From CPH</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To CPH</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Haulier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BCMS Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BCMS Ref</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {movement.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900">{movement.cattle.name || movement.cattle.tagNumber}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{movement.cattle.breed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        movement.movementType === 'ON'
                          ? 'bg-emerald-100 text-emerald-700'
                          : movement.movementType === 'OFF'
                          ? 'bg-red-100 text-red-700'
                          : movement.movementType === 'BIRTH'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {movement.movementType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    {movement.fromCph || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    {movement.toCph || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{movement.haulier || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movement.bcmsSubmitted ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        ✓ Submitted
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-600">
                    {movement.bcmsReference || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* BCMS Submission History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">BCMS Submission History</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {bCMSSubmissions.map((submission) => (
              <div key={submission.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {submission.movement?.cattle.tagNumber || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">{submission.submissionType}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      submission.status === 'SUCCESS'
                        ? 'bg-green-100 text-green-700'
                        : submission.status === 'FAILED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {submission.submissionDate.toLocaleDateString()} • Ref: {submission.referenceNumber || 'N/A'}
                </p>
                {submission.errorMessage && (
                  <p className="text-xs text-red-600 mt-1">Error: {submission.errorMessage}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cattle Passports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Passports</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {passports.map((passport) => (
              <div key={passport.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {passport.cattle.name || passport.cattle.tagNumber}
                    </p>
                    <p className="text-sm text-gray-600">{passport.cattle.breed}</p>
                  </div>
                  <p className="text-xs font-mono text-gray-500">{passport.passportNumber}</p>
                </div>
                <p className="text-xs text-gray-500">
                  Issued: {passport.issueDate.toLocaleDateString()}
                  {passport.replacementReason && ` • Replacement: ${passport.replacementReason}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          + Record Movement
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📤 Submit to BCMS
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📜 Print Passport
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📋 Inspection Checklist
        </button>
      </div>
    </div>
  );
}
