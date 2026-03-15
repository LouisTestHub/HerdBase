import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AnimalProfilePage({ params }: { params: { id: string } }) {
  const cattle = await prisma.cattle.findUnique({
    where: { id: params.id },
    include: {
      dam: true,
      currentPaddock: true,
      weightRecords: { orderBy: { date: 'desc' }, take: 10 },
      healthRecords: { orderBy: { date: 'desc' }, take: 5 },
      breedingRecordsAsMother: { 
        orderBy: { serviceDate: 'desc' }, 
        take: 5,
        include: { bull: true }
      },
      calvingRecords: { 
        orderBy: { calvingDate: 'desc' }, 
        take: 5 
      },
      movements: { orderBy: { date: 'desc' }, take: 10 },
    },
  });

  if (!cattle) {
    notFound();
  }

  const ageInDays = Math.floor((Date.now() - cattle.dob.getTime()) / (1000 * 60 * 60 * 24));
  const ageYears = Math.floor(ageInDays / 365);
  const ageMonths = Math.floor((ageInDays % 365) / 30);

  // Calculate weight trend
  const weightTrend = cattle.weightRecords.slice(0, 2);
  const weightChange = weightTrend.length === 2 
    ? ((weightTrend[0].weight - weightTrend[1].weight) / weightTrend[1].weight * 100).toFixed(1)
    : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/herd" className="text-sm text-emerald-700 hover:text-emerald-800 mb-2 inline-block">
          ← Back to Herd Register
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {cattle.name || cattle.tagNumber}
            </h1>
            <p className="text-gray-600">Tag: {cattle.tagNumber} {cattle.rfidTag && `• RFID: ${cattle.rfidTag}`}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            cattle.status === 'ALIVE' ? 'bg-green-100 text-green-800' : 
            cattle.status === 'SOLD' ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {cattle.status}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Photo & Basic Info */}
        <div className="space-y-6">
          {/* Photo */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-6xl">🐄</span>
            </div>
            <button className="w-full py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Upload Photo
            </button>
          </div>

          {/* Basic Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Basic Details</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-600">Type</dt>
                <dd className="font-medium text-gray-900">{cattle.type}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Sex</dt>
                <dd className="font-medium text-gray-900">{cattle.sex}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Breed</dt>
                <dd className="font-medium text-gray-900">{cattle.breed}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Date of Birth</dt>
                <dd className="font-medium text-gray-900">{cattle.dob.toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Age</dt>
                <dd className="font-medium text-gray-900">{ageYears}y {ageMonths}m ({ageInDays} days)</dd>
              </div>
              {cattle.registrationNumber && (
                <div>
                  <dt className="text-gray-600">Registration #</dt>
                  <dd className="font-medium text-gray-900">{cattle.registrationNumber}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Lineage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Lineage</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Dam (Mother)</p>
                {cattle.dam ? (
                  <Link 
                    href={`/dashboard/herd/${cattle.dam.id}`}
                    className="font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    {cattle.dam.name || cattle.dam.tagNumber}
                  </Link>
                ) : (
                  <p className="text-gray-500">Unknown</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-1">Sire (Father)</p>
                <p className="text-gray-500">See breeding records</p>
              </div>
            </div>
          </div>

          {/* Current Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Current Location</h3>
            {cattle.currentPaddock ? (
              <div>
                <p className="font-medium text-gray-900">{cattle.currentPaddock.name}</p>
                <p className="text-sm text-gray-600">{cattle.currentPaddock.areaHectares} hectares</p>
                <Link 
                  href="/dashboard/pasture/map"
                  className="text-sm text-emerald-700 hover:text-emerald-800 mt-2 inline-block"
                >
                  View on map →
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No paddock assigned</p>
            )}
          </div>
        </div>

        {/* Middle & Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">⚖️</span>
                {weightChange && (
                  <span className={`text-xs font-medium ${
                    parseFloat(weightChange) > 0 ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {parseFloat(weightChange) > 0 ? '+' : ''}{weightChange}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {cattle.currentWeight ? `${cattle.currentWeight} kg` : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">Current Weight</p>
              {cattle.lastWeightDate && (
                <p className="text-xs text-gray-500 mt-1">
                  Last: {cattle.lastWeightDate.toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <span className="text-2xl block mb-2">💝</span>
              <p className="text-2xl font-bold text-gray-900">{cattle.breedingRecordsAsMother.length}</p>
              <p className="text-sm text-gray-600">Breeding Records</p>
              {cattle.breedingRecordsAsMother[0] && (
                <p className="text-xs text-gray-500 mt-1">
                  Last: {cattle.breedingRecordsAsMother[0].serviceDate.toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <span className="text-2xl block mb-2">🍼</span>
              <p className="text-2xl font-bold text-gray-900">{cattle.calvingRecords.length}</p>
              <p className="text-sm text-gray-600">Calvings</p>
              {cattle.calvingRecords[0] && (
                <p className="text-xs text-gray-500 mt-1">
                  Last: {cattle.calvingRecords[0].calvingDate.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Weight History Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Weight History</h3>
            {cattle.weightRecords.length > 0 ? (
              <div className="space-y-2">
                {/* Simple bar chart visualization */}
                <div className="h-48 flex items-end space-x-2">
                  {cattle.weightRecords.slice(0, 10).reverse().map((record, idx) => {
                    const maxWeight = Math.max(...cattle.weightRecords.map(r => r.weight));
                    const height = (record.weight / maxWeight) * 100;
                    return (
                      <div key={record.id} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-emerald-500 rounded-t transition-all hover:bg-emerald-600"
                          style={{ height: `${height}%` }}
                          title={`${record.weight}kg - ${record.date.toLocaleDateString()}`}
                        />
                        <p className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left">
                          {record.date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Average Daily Gain</p>
                      <p className="font-medium text-gray-900">
                        {cattle.weightRecords.length >= 2 
                          ? ((cattle.weightRecords[0].weight - cattle.weightRecords[cattle.weightRecords.length - 1].weight) / 
                             Math.floor((cattle.weightRecords[0].date.getTime() - cattle.weightRecords[cattle.weightRecords.length - 1].date.getTime()) / (1000 * 60 * 60 * 24))).toFixed(2)
                          : 'N/A'} kg/day
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Gain</p>
                      <p className="font-medium text-gray-900">
                        {cattle.weightRecords.length >= 2 
                          ? (cattle.weightRecords[0].weight - cattle.weightRecords[cattle.weightRecords.length - 1].weight).toFixed(0)
                          : 'N/A'} kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No weight records available</p>
            )}
          </div>

          {/* Health Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Health Timeline</h3>
              <Link href="/dashboard/health" className="text-sm text-emerald-700 hover:text-emerald-800">
                View all →
              </Link>
            </div>
            {cattle.healthRecords.length > 0 ? (
              <div className="space-y-3">
                {cattle.healthRecords.map((record) => (
                  <div key={record.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0">
                      {record.eventType === 'VACCINATION' ? '💉' : 
                       record.eventType === 'TREATMENT' ? '💊' : '🏥'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{record.eventType}</p>
                      {record.productName && <p className="text-sm text-gray-600">{record.productName}</p>}
                      <p className="text-xs text-gray-500 mt-1">{record.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No health records</p>
            )}
          </div>

          {/* Breeding History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Breeding History</h3>
              <Link href="/dashboard/breeding" className="text-sm text-emerald-700 hover:text-emerald-800">
                View all →
              </Link>
            </div>
            {cattle.breedingRecordsAsMother.length > 0 ? (
              <div className="space-y-3">
                {cattle.breedingRecordsAsMother.map((record) => (
                  <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{record.serviceType}</p>
                        <p className="text-sm text-gray-600">
                          {record.serviceDate.toLocaleDateString()}
                        </p>
                      </div>
                      {record.pregnancyConfirmed && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Confirmed
                        </span>
                      )}
                    </div>
                    {record.expectedCalvingDate && (
                      <p className="text-sm text-gray-600">
                        Expected: {record.expectedCalvingDate.toLocaleDateString()}
                      </p>
                    )}
                    {record.bull && (
                      <p className="text-sm text-gray-600">
                        Bull: {record.bull.name || record.bull.tagNumber}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No breeding records</p>
            )}
          </div>

          {/* Calving Records */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Calving Records</h3>
            {cattle.calvingRecords.length > 0 ? (
              <div className="space-y-3">
                {cattle.calvingRecords.map((record) => (
                  <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {record.calvingDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Birth Ease: {record.birthEase}</p>
                        {record.calfWeight && (
                          <p className="text-sm text-gray-600">Calf Weight: {record.calfWeight} kg</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No calving records</p>
            )}
          </div>

          {/* Movement History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Movement History</h3>
            {cattle.movements.length > 0 ? (
              <div className="space-y-2">
                {cattle.movements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{movement.movementType}</p>
                      <p className="text-sm text-gray-600">
                        {movement.date.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {movement.toLocation && (
                        <p className="text-sm text-gray-600">To: {movement.toLocation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No movement records</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
