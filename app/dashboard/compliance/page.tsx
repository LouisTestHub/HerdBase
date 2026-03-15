import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function CompliancePage() {
  const farm = await prisma.farm.findFirst();
  
  const totalCattle = await prisma.cattle.count({ where: { status: 'ALIVE' } });
  
  const movements = await prisma.movement.findMany({
    where: { bcmsSubmitted: false },
    take: 10,
    orderBy: { date: 'desc' },
  });

  const healthRecords = await prisma.healthRecord.findMany({
    where: {
      withdrawalEnds: { gte: new Date() },
    },
    include: {
      cattle: { select: { tagNumber: true, name: true } },
    },
    orderBy: { withdrawalEnds: 'asc' },
    take: 10,
  });

  // Mock compliance data
  const complianceChecks = {
    bcms: {
      status: movements.length === 0 ? 'COMPLIANT' : 'ACTION_REQUIRED',
      lastUpdate: new Date('2025-03-10'),
      nextDeadline: new Date('2025-04-01'),
      pendingActions: movements.length,
    },
    tbTesting: {
      status: 'COMPLIANT',
      lastTest: new Date('2024-12-15'),
      nextDue: new Date('2025-12-15'),
      herdStatus: 'OTF',
    },
    medicineRecords: {
      status: healthRecords.length > 0 ? 'ACTIVE_WITHDRAWALS' : 'COMPLIANT',
      activeWithdrawals: healthRecords.length,
      nextExpiry: healthRecords[0]?.withdrawalEnds,
    },
    redTractor: {
      status: 'COMPLIANT',
      lastAudit: new Date('2024-09-20'),
      nextAudit: new Date('2025-09-20'),
      certificateExpiry: new Date('2026-09-20'),
    },
    crossCompliance: {
      status: 'COMPLIANT',
      lastCheck: new Date('2024-11-05'),
      nextReview: new Date('2025-05-01'),
    },
    bps: {
      status: 'SUBMITTED',
      claimYear: 2025,
      submissionDate: new Date('2025-02-28'),
      paymentExpected: new Date('2025-12-01'),
    },
    vetVisits: {
      lastVisit: new Date('2025-02-20'),
      nextScheduled: new Date('2025-05-15'),
      annualHealthPlan: 'CURRENT',
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT':
      case 'CURRENT':
      case 'OTF':
        return 'green';
      case 'ACTION_REQUIRED':
      case 'ACTIVE_WITHDRAWALS':
        return 'yellow';
      case 'NON_COMPLIANT':
      case 'OVERDUE':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
        <p className="text-gray-600">{farm?.name} • Single view of all regulatory requirements</p>
      </div>

      {/* Overall Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Overall Compliance Status</h2>
            <p className="text-sm text-gray-600 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            {movements.length > 0 ? (
              <>
                <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                  Action Required
                </span>
              </>
            ) : (
              <>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                  All Compliant
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Farm CPH</p>
            <p className="text-lg font-bold text-gray-900">{farm?.cphNumber || 'Not set'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Herd Mark</p>
            <p className="text-lg font-bold text-gray-900">{farm?.herdMark || 'Not set'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Animals</p>
            <p className="text-lg font-bold text-gray-900">{totalCattle}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Holding SBI</p>
            <p className="text-lg font-bold text-gray-900">{farm?.sbi || 'Not set'}</p>
          </div>
        </div>
      </div>

      {/* Compliance Checks Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* BCMS Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h3 className="text-lg font-bold text-gray-900">BCMS Reporting</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(complianceChecks.bcms.status)}-100 text-${getStatusColor(complianceChecks.bcms.status)}-700`}>
                {complianceChecks.bcms.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="font-medium text-gray-900">{complianceChecks.bcms.lastUpdate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Movements:</span>
                <span className={`font-medium ${complianceChecks.bcms.pendingActions > 0 ? 'text-yellow-700' : 'text-green-700'}`}>
                  {complianceChecks.bcms.pendingActions}
                </span>
              </div>
              {complianceChecks.bcms.pendingActions > 0 && (
                <div className="mt-4">
                  <button className="w-full px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
                    Submit to BCMS →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TB Testing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🧪</span>
                <h3 className="text-lg font-bold text-gray-900">TB Testing</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(complianceChecks.tbTesting.herdStatus)}-100 text-${getStatusColor(complianceChecks.tbTesting.herdStatus)}-700`}>
                {complianceChecks.tbTesting.herdStatus}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Test:</span>
                <span className="font-medium text-gray-900">{complianceChecks.tbTesting.lastTest.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Due:</span>
                <span className="font-medium text-gray-900">{complianceChecks.tbTesting.nextDue.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days Until:</span>
                <span className="font-medium text-gray-900">
                  {Math.ceil((complianceChecks.tbTesting.nextDue.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Medicine Withdrawal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💊</span>
                <h3 className="text-lg font-bold text-gray-900">Medicine Withdrawals</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(complianceChecks.medicineRecords.status)}-100 text-${getStatusColor(complianceChecks.medicineRecords.status)}-700`}>
                {complianceChecks.medicineRecords.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Withdrawals:</span>
                <span className="font-medium text-gray-900">{complianceChecks.medicineRecords.activeWithdrawals}</span>
              </div>
              {complianceChecks.medicineRecords.nextExpiry && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Expiry:</span>
                  <span className="font-medium text-gray-900">
                    {complianceChecks.medicineRecords.nextExpiry.toLocaleDateString()}
                  </span>
                </div>
              )}
              {healthRecords.length > 0 && (
                <div className="mt-4">
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    View Active Withdrawals →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Red Tractor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🚜</span>
                <h3 className="text-lg font-bold text-gray-900">Red Tractor</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(complianceChecks.redTractor.status)}-100 text-${getStatusColor(complianceChecks.redTractor.status)}-700`}>
                {complianceChecks.redTractor.status}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Audit:</span>
                <span className="font-medium text-gray-900">{complianceChecks.redTractor.lastAudit.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Audit:</span>
                <span className="font-medium text-gray-900">{complianceChecks.redTractor.nextAudit.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certificate Valid Until:</span>
                <span className="font-medium text-gray-900">{complianceChecks.redTractor.certificateExpiry.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Compliance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✅</span>
                <h3 className="text-lg font-bold text-gray-900">Cross-Compliance</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(complianceChecks.crossCompliance.status)}-100 text-${getStatusColor(complianceChecks.crossCompliance.status)}-700`}>
                {complianceChecks.crossCompliance.status}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Check:</span>
                <span className="font-medium text-gray-900">{complianceChecks.crossCompliance.lastCheck.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Review:</span>
                <span className="font-medium text-gray-900">{complianceChecks.crossCompliance.nextReview.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BPS/SFI */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💷</span>
                <h3 className="text-lg font-bold text-gray-900">BPS Claim</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(complianceChecks.bps.status)}-100 text-${getStatusColor(complianceChecks.bps.status)}-700`}>
                {complianceChecks.bps.status}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Claim Year:</span>
                <span className="font-medium text-gray-900">{complianceChecks.bps.claimYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-medium text-gray-900">{complianceChecks.bps.submissionDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Expected:</span>
                <span className="font-medium text-gray-900">{complianceChecks.bps.paymentExpected.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vet Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏥</span>
              <h2 className="text-xl font-bold text-gray-900">Veterinary Visits</h2>
            </div>
            <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
              Schedule Visit
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Last Visit</p>
              <p className="text-lg font-medium text-gray-900">{complianceChecks.vetVisits.lastVisit.toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Next Scheduled</p>
              <p className="text-lg font-medium text-gray-900">{complianceChecks.vetVisits.nextScheduled.toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Annual Health Plan</p>
              <p className="text-lg font-medium text-green-700">{complianceChecks.vetVisits.annualHealthPlan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Withdrawal Periods */}
      {healthRecords.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Active Medicine Withdrawal Periods</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {healthRecords.map((record) => {
              const daysRemaining = Math.ceil((record.withdrawalEnds!.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={record.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{record.cattle.name || record.cattle.tagNumber}</p>
                      <p className="text-sm text-gray-600">{record.productName}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${daysRemaining <= 3 ? 'text-red-700' : 'text-yellow-700'}`}>
                        {daysRemaining} days
                      </p>
                      <p className="text-xs text-gray-500">
                        Ends: {record.withdrawalEnds?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
