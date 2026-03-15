import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function SalesPage() {
  const farm = await prisma.farm.findFirst();
  
  const cattle = await prisma.cattle.findMany({
    where: { status: 'ALIVE' },
    include: {
      weightRecords: { orderBy: { date: 'desc' }, take: 1 },
    },
    orderBy: { currentWeight: 'desc' },
  });

  // Mock mart prices (in production, could fetch from API)
  const martPrices = {
    'BEEF_HEIFER': { pricePerKg: 3.20, trend: 'up' },
    'BEEF_STEER': { pricePerKg: 3.35, trend: 'up' },
    'DAIRY_HEIFER': { pricePerKg: 2.80, trend: 'stable' },
    'CULL_COW': { pricePerKg: 2.10, trend: 'down' },
  };

  // Calculate potential sales value
  const salesReady = cattle.filter(c => 
    c.currentWeight && c.currentWeight >= 500 && c.type === 'BEEF'
  );

  const estimatePrice = (animal: typeof cattle[0]) => {
    const basePrice = animal.sex === 'HEIFER' ? 3.20 : animal.sex === 'STEER' ? 3.35 : 2.80;
    const weight = animal.currentWeight || 0;
    return weight * basePrice;
  };

  // Mock sale lots
  const saleLots = [
    {
      id: '1',
      name: 'Lot 1 - Prime Steers',
      animals: 12,
      avgWeight: 620,
      estimatedValue: 24960,
      grade: 'U3',
      status: 'READY'
    },
    {
      id: '2',
      name: 'Lot 2 - Beef Heifers',
      animals: 8,
      avgWeight: 580,
      estimatedValue: 14848,
      grade: 'R3',
      status: 'READY'
    },
    {
      id: '3',
      name: 'Lot 3 - Store Cattle',
      animals: 15,
      avgWeight: 420,
      estimatedValue: 20160,
      grade: 'O3',
      status: 'PENDING'
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mart/Sale Preparation</h1>
        <p className="text-gray-600">{farm?.name} • Sales planning & lot preparation</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">🐄</span>
          <p className="text-2xl font-bold text-gray-900">{salesReady.length}</p>
          <p className="text-sm text-gray-600">Animals Sale-Ready</p>
          <p className="text-xs text-gray-500 mt-1">≥500kg liveweight</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">💷</span>
          <p className="text-2xl font-bold text-gray-900">
            £{salesReady.reduce((sum, a) => sum + estimatePrice(a), 0).toFixed(0)}
          </p>
          <p className="text-sm text-gray-600">Estimated Value</p>
          <p className="text-xs text-gray-500 mt-1">Current market rates</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📊</span>
          <p className="text-2xl font-bold text-gray-900">
            {salesReady.length > 0 
              ? (salesReady.reduce((sum, a) => sum + (a.currentWeight || 0), 0) / salesReady.length).toFixed(0)
              : 0}kg
          </p>
          <p className="text-sm text-gray-600">Average Weight</p>
          <p className="text-xs text-gray-500 mt-1">Sale-ready animals</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-2xl block mb-2">📅</span>
          <p className="text-2xl font-bold text-gray-900">{saleLots.length}</p>
          <p className="text-sm text-gray-600">Sale Lots Prepared</p>
          <p className="text-xs text-gray-500 mt-1">Ready to market</p>
        </div>
      </div>

      {/* Current Mart Prices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Current Mart Prices</h2>
              <p className="text-sm text-gray-600 mt-1">Live from Ballymena Mart • Updated 2 hours ago</p>
            </div>
            <button className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
              Refresh Prices →
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 p-6">
          {Object.entries(martPrices).map(([category, data]) => (
            <div key={category} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">
                  {category.replace('_', ' ')}
                </p>
                <span className={`text-lg ${
                  data.trend === 'up' ? '📈' : data.trend === 'down' ? '📉' : '➡️'
                }`}></span>
              </div>
              <p className="text-2xl font-bold text-gray-900">£{data.pricePerKg.toFixed(2)}</p>
              <p className="text-xs text-gray-600">per kg liveweight</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sale Lots */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Sale Lots</h2>
            <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 font-medium">
              + Create New Lot
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {saleLots.map((lot) => (
            <div key={lot.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{lot.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lot.status === 'READY' ? 'bg-green-100 text-green-700' :
                      lot.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lot.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{lot.animals} head • Grade: {lot.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-700">£{lot.estimatedValue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Estimated value</p>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Animals</p>
                  <p className="text-lg font-medium text-gray-900">{lot.animals}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Avg Weight</p>
                  <p className="text-lg font-medium text-gray-900">{lot.avgWeight}kg</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Price/kg</p>
                  <p className="text-lg font-medium text-gray-900">£{(lot.estimatedValue / (lot.animals * lot.avgWeight)).toFixed(2)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Total Weight</p>
                  <p className="text-lg font-medium text-gray-900">{(lot.animals * lot.avgWeight).toLocaleString()}kg</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Grade</p>
                  <p className="text-lg font-medium text-gray-900">{lot.grade}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium">
                  Generate Catalogue
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  View Animals
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  Edit Lot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sale-Ready Animals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Sale-Ready Animals</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Types</option>
                <option>Beef</option>
                <option>Dairy</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Weights</option>
                <option>500-600kg</option>
                <option>600-700kg</option>
                <option>700+kg</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesReady.slice(0, 20).map((animal) => {
                const ageMonths = Math.floor((Date.now() - animal.dob.getTime()) / (1000 * 60 * 60 * 24 * 30));
                const estimatedPrice = estimatePrice(animal);
                const estimatedGrade = animal.currentWeight && animal.currentWeight >= 650 ? 'U3' :
                                      animal.currentWeight && animal.currentWeight >= 600 ? 'R3' : 'O3';

                return (
                  <tr key={animal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{animal.name || animal.tagNumber}</div>
                      <div className="text-xs text-gray-500">{animal.tagNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{animal.breed}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{animal.sex}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{animal.currentWeight}kg</div>
                      {animal.lastWeightDate && (
                        <div className="text-xs text-gray-500">{animal.lastWeightDate.toLocaleDateString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{ageMonths}m</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-emerald-700">£{estimatedPrice.toFixed(0)}</div>
                      <div className="text-xs text-gray-500">@ £{(estimatedPrice / (animal.currentWeight || 1)).toFixed(2)}/kg</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        {estimatedGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-emerald-700 hover:text-emerald-900 text-sm font-medium">
                        Add to Lot →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
