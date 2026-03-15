'use client';

import { useState } from 'react';

export default function FeedCalculatorPage() {
  const [animalWeight, setAnimalWeight] = useState(600);
  const [animalClass, setAnimalClass] = useState('GROWING');
  const [targetGain, setTargetGain] = useState(1.0);
  const [season, setSeason] = useState('WINTER');

  // Simplified feed calculation
  const calculateFeed = () => {
    const baseDMI = animalWeight * 0.025; // 2.5% of body weight
    const seasonAdjustment = season === 'WINTER' ? 1.1 : season === 'SUMMER' ? 0.9 : 1.0;
    const targetAdjustment = 1 + (targetGain - 0.8) * 0.2;
    
    const dailyDMI = baseDMI * seasonAdjustment * targetAdjustment;
    
    return {
      dryMatter: dailyDMI,
      silage: dailyDMI * 0.6 / 0.25, // 60% from silage at 25% DM
      concentrate: dailyDMI * 0.4, // 40% from concentrate
    };
  };

  const feed = calculateFeed();
  
  // Mock feed costs
  const costs = {
    silagePerKg: 0.04,
    concentratePerKg: 0.28,
  };

  const dailyCost = (feed.silage * costs.silagePerKg) + (feed.concentrate * costs.concentratePerKg);
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;

  // Mock ration comparison
  const rationOptions = [
    {
      name: 'High Silage',
      silage: 30,
      concentrate: 2,
      costPerDay: 2.76,
      expectedGain: 0.8,
      description: 'Low cost, moderate growth'
    },
    {
      name: 'Balanced',
      silage: 25,
      concentrate: 4,
      costPerDay: 3.12,
      expectedGain: 1.0,
      description: 'Optimal cost/performance'
    },
    {
      name: 'Intensive',
      silage: 20,
      concentrate: 6,
      costPerDay: 3.48,
      expectedGain: 1.2,
      description: 'Maximum growth rate'
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed Cost Calculator</h1>
        <p className="text-gray-600">Calculate daily feed requirements and costs per head</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Animal Details</h2>
            
            <div className="space-y-6">
              {/* Animal Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animal Weight (kg)
                </label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="10"
                  value={animalWeight}
                  onChange={(e) => setAnimalWeight(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>200kg</span>
                  <span className="font-bold text-emerald-700">{animalWeight}kg</span>
                  <span>800kg</span>
                </div>
              </div>

              {/* Animal Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animal Class
                </label>
                <select
                  value={animalClass}
                  onChange={(e) => setAnimalClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="CALF">Calf ({'<'}6 months)</option>
                  <option value="WEANER">Weaner (6-12 months)</option>
                  <option value="GROWING">Growing (12-24 months)</option>
                  <option value="FINISHING">Finishing ({'>'} 24 months)</option>
                  <option value="LACTATING">Lactating Cow</option>
                  <option value="DRY">Dry Cow</option>
                </select>
              </div>

              {/* Target Daily Gain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Daily Gain (kg/day)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={targetGain}
                  onChange={(e) => setTargetGain(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0.5kg</span>
                  <span className="font-bold text-emerald-700">{targetGain.toFixed(1)}kg</span>
                  <span>1.5kg</span>
                </div>
              </div>

              {/* Season */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['SUMMER', 'AUTUMN', 'WINTER'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        season === s
                          ? 'bg-emerald-700 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Daily Feed Requirements</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-emerald-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total Dry Matter</p>
                <p className="text-3xl font-bold text-emerald-700">{feed.dryMatter.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">kg DM/day</p>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Silage (as fed)</p>
                <p className="text-3xl font-bold text-blue-700">{feed.silage.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">kg/day @ 25% DM</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Concentrate</p>
                <p className="text-3xl font-bold text-purple-700">{feed.concentrate.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">kg/day</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-2">Feed Composition Breakdown:</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 flex items-center justify-center text-white text-xs font-medium" style={{ width: '60%' }}>
                    Silage 60%
                  </div>
                  <div className="bg-purple-500 flex items-center justify-center text-white text-xs font-medium" style={{ width: '40%' }}>
                    Concentrate 40%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Cost Analysis</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Daily Cost per Head</p>
                <p className="text-3xl font-bold text-gray-900">£{dailyCost.toFixed(2)}</p>
                <div className="mt-3 space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Silage:</span>
                    <span>£{(feed.silage * costs.silagePerKg).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concentrate:</span>
                    <span>£{(feed.concentrate * costs.concentratePerKg).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Monthly Cost</p>
                <p className="text-3xl font-bold text-gray-900">£{monthlyCost.toFixed(0)}</p>
                <p className="text-xs text-gray-500 mt-1">30 days @ £{dailyCost.toFixed(2)}/day</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Annual Cost</p>
                <p className="text-3xl font-bold text-gray-900">£{annualCost.toFixed(0)}</p>
                <p className="text-xs text-gray-500 mt-1">365 days @ £{dailyCost.toFixed(2)}/day</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <span className="text-xl mr-2">💡</span>
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Cost per kg of Liveweight Gain</p>
                  <p className="text-blue-800">
                    £{(dailyCost / targetGain).toFixed(2)}/kg at {targetGain}kg/day target gain
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ration Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ration Comparison</h2>
            
            <div className="space-y-4">
              {rationOptions.map((ration, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{ration.name}</h3>
                      <p className="text-sm text-gray-600">{ration.description}</p>
                    </div>
                    <button className="px-3 py-1 border border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 text-sm font-medium">
                      Select
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Silage</p>
                      <p className="font-medium text-gray-900">{ration.silage} kg/day</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Concentrate</p>
                      <p className="font-medium text-gray-900">{ration.concentrate} kg/day</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Daily Cost</p>
                      <p className="font-medium text-gray-900">£{ration.costPerDay.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expected Gain</p>
                      <p className="font-medium text-emerald-700">{ration.expectedGain} kg/day</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Prices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Current Feed Prices</h2>
              <button className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                Update Prices →
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Grass Silage</p>
                <p className="text-2xl font-bold text-gray-900">£{costs.silagePerKg.toFixed(2)}/kg</p>
                <p className="text-xs text-gray-500 mt-1">@ 25% dry matter</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Concentrate (16% protein)</p>
                <p className="text-2xl font-bold text-gray-900">£{costs.concentratePerKg.toFixed(2)}/kg</p>
                <p className="text-xs text-gray-500 mt-1">Delivered price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
