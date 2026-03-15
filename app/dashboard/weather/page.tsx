export const dynamic = "force-dynamic";

// Mock weather data (in production, would fetch from wttr.in API)
const weatherData = {
  current: {
    temp: 8,
    feelsLike: 5,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 78,
    wind: 15,
    rainfall: 0,
  },
  forecast: [
    { day: 'Mon', high: 10, low: 4, condition: 'Rain', icon: '🌧️', rain: 12 },
    { day: 'Tue', high: 9, low: 3, condition: 'Cloudy', icon: '☁️', rain: 3 },
    { day: 'Wed', high: 11, low: 5, condition: 'Sunny', icon: '☀️', rain: 0 },
    { day: 'Thu', high: 12, low: 6, condition: 'Partly Cloudy', icon: '⛅', rain: 0 },
    { day: 'Fri', high: 8, low: 2, condition: 'Frost', icon: '❄️', rain: 0 },
    { day: 'Sat', high: 10, low: 4, condition: 'Rain', icon: '🌧️', rain: 8 },
    { day: 'Sun', high: 11, low: 5, condition: 'Sunny', icon: '☀️', rain: 0 },
  ],
  alerts: [
    {
      type: 'FROST',
      severity: 'WARNING',
      message: 'Frost expected Friday night/Saturday morning. Check water troughs.',
      icon: '❄️',
    },
  ],
};

// Calculate grass growth prediction
const calculateGrassGrowth = (temp: number, rainfall: number) => {
  const baseGrowth = Math.max(0, (temp - 5) * 5);
  const rainFactor = rainfall > 20 ? 0.8 : rainfall < 5 ? 0.9 : 1.0;
  return Math.round(baseGrowth * rainFactor);
};

export default async function WeatherPage() {
  const weeklyGrassGrowth = weatherData.forecast.reduce((sum, day) => {
    return sum + calculateGrassGrowth(day.high, day.rain);
  }, 0);

  const avgGrassGrowth = Math.round(weeklyGrassGrowth / 7);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Dashboard</h1>
        <p className="text-gray-600">Oakfield Farm, County Antrim • Updated 10 minutes ago</p>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="mb-8 space-y-3">
          {weatherData.alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`border-l-4 p-6 rounded-lg ${
                alert.severity === 'WARNING' ? 'bg-yellow-50 border-yellow-500' :
                alert.severity === 'SEVERE' ? 'bg-red-50 border-red-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{alert.icon}</span>
                <div>
                  <h3 className={`font-bold mb-1 ${
                    alert.severity === 'WARNING' ? 'text-yellow-900' :
                    alert.severity === 'SEVERE' ? 'text-red-900' :
                    'text-blue-900'
                  }`}>
                    {alert.type} {alert.severity}
                  </h3>
                  <p className={`text-sm ${
                    alert.severity === 'WARNING' ? 'text-yellow-800' :
                    alert.severity === 'SEVERE' ? 'text-red-800' :
                    'text-blue-800'
                  }`}>
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-blue-100 mb-2">Current Conditions</p>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-6xl">{weatherData.current.icon}</span>
              <div>
                <p className="text-5xl font-bold">{weatherData.current.temp}°C</p>
                <p className="text-blue-100">Feels like {weatherData.current.feelsLike}°C</p>
              </div>
            </div>
            <p className="text-xl">{weatherData.current.condition}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-1">Humidity</p>
              <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-1">Wind Speed</p>
              <p className="text-2xl font-bold">{weatherData.current.wind} mph</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-1">Rainfall Today</p>
              <p className="text-2xl font-bold">{weatherData.current.rainfall} mm</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-1">Grass Growth</p>
              <p className="text-2xl font-bold">{calculateGrassGrowth(weatherData.current.temp, weatherData.current.rainfall)} kg/ha</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">7-Day Forecast</h2>
        </div>

        <div className="grid grid-cols-7 gap-0 divide-x divide-gray-100">
          {weatherData.forecast.map((day, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 text-center">
              <p className="text-sm font-medium text-gray-900 mb-2">{day.day}</p>
              <span className="text-4xl block mb-2">{day.icon}</span>
              <p className="text-xs text-gray-600 mb-2">{day.condition}</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-bold text-gray-900">{day.high}°</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-600">{day.low}°</span>
                </p>
                {day.rain > 0 && (
                  <p className="text-xs text-blue-600">💧 {day.rain}mm</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farm Decision Support */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Grass Growth Prediction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl">🌱</span>
            <div>
              <h3 className="font-bold text-gray-900">Grass Growth</h3>
              <p className="text-xs text-gray-600">7-day prediction</p>
            </div>
          </div>
          
          <p className="text-3xl font-bold text-green-700 mb-2">{avgGrassGrowth} kg/ha/day</p>
          <p className="text-sm text-gray-600 mb-4">Average daily growth rate</p>
          
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm font-medium text-green-900 mb-1">Recommendation</p>
            <p className="text-xs text-green-800">
              {avgGrassGrowth > 30 
                ? 'Excellent growth conditions. Increase grazing rotation.'
                : avgGrassGrowth > 15
                ? 'Moderate growth. Maintain current rotation.'
                : 'Low growth expected. Consider supplementary feeding.'}
            </p>
          </div>
        </div>

        {/* Housing Decision */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl">🏠</span>
            <div>
              <h3 className="font-bold text-gray-900">Housing Decision</h3>
              <p className="text-xs text-gray-600">Weather-based guidance</p>
            </div>
          </div>
          
          <div className="mb-4">
            {weatherData.forecast.some(d => d.rain > 10) ? (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                Monitor Conditions
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Good for Grazing
              </span>
            )}
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Heavy rain days:</span>
              <span className="font-medium text-gray-900">
                {weatherData.forecast.filter(d => d.rain > 10).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frost risk:</span>
              <span className="font-medium text-gray-900">
                {weatherData.forecast.some(d => d.low <= 2) ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Mud Risk Index */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl">🥾</span>
            <div>
              <h3 className="font-bold text-gray-900">Mud Risk Index</h3>
              <p className="text-xs text-gray-600">Ground condition forecast</p>
            </div>
          </div>
          
          <div className="mb-4">
            {(() => {
              const totalRain = weatherData.forecast.reduce((sum, d) => sum + d.rain, 0);
              const risk = totalRain > 50 ? 'HIGH' : totalRain > 25 ? 'MEDIUM' : 'LOW';
              const color = risk === 'HIGH' ? 'red' : risk === 'MEDIUM' ? 'yellow' : 'green';
              
              return (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full bg-${color}-500`}
                      style={{ width: `${Math.min(100, (totalRain / 50) * 100)}%` }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{risk} RISK</p>
                </>
              );
            })()}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-700">
              Expected rainfall: {weatherData.forecast.reduce((sum, d) => sum + d.rain, 0)}mm over 7 days
            </p>
          </div>
        </div>
      </div>

      {/* Additional Alerts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Water Trough Alert */}
        {weatherData.forecast.some(d => d.low <= 2) && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">💧</span>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Water Trough Freeze Alert</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Temperatures below freezing expected. Check water troughs daily and break ice as needed.
                </p>
                <button className="text-sm text-blue-900 font-medium hover:underline">
                  View Paddock Water Points →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grazing Advice */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🌾</span>
            <div>
              <h3 className="font-bold text-green-900 mb-2">Grazing Advice</h3>
              <p className="text-sm text-green-800 mb-3">
                {weatherData.forecast.filter(d => d.rain > 10).length > 3
                  ? 'Heavy rain expected. Consider restricting grazing to prevent poaching.'
                  : 'Good grazing conditions forecast. Optimize rotation for grass utilization.'}
              </p>
              <button className="text-sm text-green-900 font-medium hover:underline">
                View Rotation Plan →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
