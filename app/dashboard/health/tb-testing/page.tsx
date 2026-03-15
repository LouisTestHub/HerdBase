import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Mock TB test data (in production, this would be a separate model)
const getTBTests = async () => {
  const farm = await prisma.farm.findFirst();
  
  return [
    {
      id: '1',
      testDate: new Date('2024-12-15'),
      testType: 'Annual Routine',
      vetName: 'Dr. Sarah Mitchell BVSc',
      cattleTested: 347,
      results: {
        clear: 345,
        inconclusive: 2,
        reactor: 0
      },
      status: 'COMPLETED',
      nextDue: new Date('2025-12-15'),
      bcmsSubmitted: true,
      movementRestrictions: false
    },
    {
      id: '2',
      testDate: new Date('2024-06-10'),
      testType: 'Pre-Movement',
      vetName: 'Dr. James Thompson MRCVS',
      cattleTested: 12,
      results: {
        clear: 12,
        inconclusive: 0,
        reactor: 0
      },
      status: 'COMPLETED',
      bcmsSubmitted: true,
      movementRestrictions: false
    },
    {
      id: '3',
      testDate: new Date('2023-12-10'),
      testType: 'Annual Routine',
      vetName: 'Dr. Sarah Mitchell BVSc',
      cattleTested: 342,
      results: {
        clear: 341,
        inconclusive: 1,
        reactor: 0
      },
      status: 'COMPLETED',
      bcmsSubmitted: true,
      movementRestrictions: false
    }
  ];
};

export default async function TBTestingPage() {
  const tbTests = await getTBTests();
  const latestTest = tbTests[0];
  
  const farm = await prisma.farm.findFirst();
  const totalCattle = await prisma.cattle.count({ where: { status: 'ALIVE' } });

  // Calculate TB status
  const herdStatus = latestTest.results.reactor > 0 ? 'OTF-W' : 
                     latestTest.results.inconclusive > 0 ? 'OTF-S' : 'OTF';
  
  const daysUntilNextTest = latestTest.nextDue 
    ? Math.ceil((latestTest.nextDue.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">TB Testing</h1>
        <p className="text-gray-600">{farm?.name} • Herd Mark: {farm?.herdMark}</p>
      </div>

      {/* Herd TB Status Dashboard */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🏥</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              herdStatus === 'OTF' ? 'bg-green-100 text-green-800' :
              herdStatus === 'OTF-S' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {herdStatus}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {herdStatus === 'OTF' ? 'Clear' : herdStatus === 'OTF-S' ? 'Suspended' : 'Withdrawn'}
          </p>
          <p className="text-sm text-gray-600">Herd TB Status</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📅</span>
          <p className="text-2xl font-bold text-gray-900">
            {daysUntilNextTest} days
          </p>
          <p className="text-sm text-gray-600">Until Next Test Due</p>
          <p className="text-xs text-gray-500 mt-1">
            {latestTest.nextDue?.toLocaleDateString() || 'Not scheduled'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🐄</span>
          <p className="text-2xl font-bold text-gray-900">{totalCattle}</p>
          <p className="text-sm text-gray-600">Animals to Test</p>
          <p className="text-xs text-gray-500 mt-1">
            Last tested: {latestTest.cattleTested}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">✅</span>
          <p className="text-2xl font-bold text-gray-900">
            {((latestTest.results.clear / latestTest.cattleTested) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">Clear Rate</p>
          <p className="text-xs text-gray-500 mt-1">
            {latestTest.results.clear}/{latestTest.cattleTested} clear
          </p>
        </div>
      </div>

      {/* Latest Test Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Latest Test Results</h2>
              <p className="text-sm text-gray-600 mt-1">
                {latestTest.testType} • {latestTest.testDate.toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
                Schedule New Test
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl font-bold text-green-700 mb-2">{latestTest.results.clear}</p>
              <p className="text-sm font-medium text-green-900">Clear</p>
              <p className="text-xs text-green-700 mt-1">No reaction detected</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <p className="text-4xl font-bold text-yellow-700 mb-2">{latestTest.results.inconclusive}</p>
              <p className="text-sm font-medium text-yellow-900">Inconclusive</p>
              <p className="text-xs text-yellow-700 mt-1">Requires retest in 60 days</p>
            </div>

            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-4xl font-bold text-red-700 mb-2">{latestTest.results.reactor}</p>
              <p className="text-sm font-medium text-red-900">Reactor</p>
              <p className="text-xs text-red-700 mt-1">Movement restrictions apply</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Veterinary Surgeon</p>
              <p className="font-medium text-gray-900">{latestTest.vetName}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">BCMS Submission</p>
              <p className="font-medium text-gray-900">
                {latestTest.bcmsSubmitted ? (
                  <span className="text-green-700">✓ Submitted</span>
                ) : (
                  <span className="text-red-700">⚠ Pending</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Movement Restrictions Alert */}
      {latestTest.results.inconclusive > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-lg">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-yellow-900 mb-1">Movement Restrictions in Place</h3>
              <p className="text-sm text-yellow-800">
                {latestTest.results.inconclusive} animal(s) with inconclusive results. 
                Movement restrictions apply until retest completed and clear results received.
              </p>
              <div className="mt-3 space-x-3">
                <button className="text-sm text-yellow-900 font-medium hover:underline">
                  View Affected Animals →
                </button>
                <button className="text-sm text-yellow-900 font-medium hover:underline">
                  Schedule Retest →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Testing History</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {tbTests.map((test) => (
            <div key={test.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{test.testType}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      test.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                      test.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{test.testDate.toLocaleDateString()} • {test.vetName}</p>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div>
                      <span className="text-gray-600">Tested:</span>
                      <span className="font-medium text-gray-900 ml-1">{test.cattleTested}</span>
                    </div>
                    <div>
                      <span className="text-green-600">Clear:</span>
                      <span className="font-medium text-green-700 ml-1">{test.results.clear}</span>
                    </div>
                    {test.results.inconclusive > 0 && (
                      <div>
                        <span className="text-yellow-600">Inconclusive:</span>
                        <span className="font-medium text-yellow-700 ml-1">{test.results.inconclusive}</span>
                      </div>
                    )}
                    {test.results.reactor > 0 && (
                      <div>
                        <span className="text-red-600">Reactor:</span>
                        <span className="font-medium text-red-700 ml-1">{test.results.reactor}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button className="text-emerald-700 hover:text-emerald-800 text-sm font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APHA Reporting */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">📋</span>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">APHA Reporting</h3>
            <p className="text-sm text-blue-800 mb-4">
              All TB test results are automatically reported to the Animal and Plant Health Agency (APHA) 
              via BCMS integration. Maintain accurate records to ensure compliance with movement restrictions.
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">
                View APHA Submissions
              </button>
              <button className="px-4 py-2 bg-white border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 text-sm font-medium">
                Download Compliance Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
