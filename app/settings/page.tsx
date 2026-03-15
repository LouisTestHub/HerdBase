import { PrismaClient, Role } from '@prisma/client';
import Link from 'next/link';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const [farm, users] = await Promise.all([
    prisma.farm.findFirst(),
    prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  if (!farm) {
    return <div className="p-8">No farm found</div>;
  }

  const roleColors: Record<Role, string> = {
    FARM_OWNER: 'bg-purple-100 text-purple-700',
    FARM_MANAGER: 'bg-blue-100 text-blue-700',
    WORKER: 'bg-green-100 text-green-700',
    VET: 'bg-red-100 text-red-700',
    AUDITOR: 'bg-gray-100 text-gray-700',
  };

  const roleLabels: Record<Role, string> = {
    FARM_OWNER: 'Farm Owner',
    FARM_MANAGER: 'Farm Manager',
    WORKER: 'Stockman',
    VET: 'Vet',
    AUDITOR: 'Auditor',
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Farm profile, users, and system configuration</p>
      </div>

      {/* Farm Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Farm Profile</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
              <input
                type="text"
                defaultValue={farm.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SBI Number</label>
              <input
                type="text"
                defaultValue={farm.sbi || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPH Number</label>
              <input
                type="text"
                defaultValue={farm.cphNumber || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Herd Mark</label>
              <input
                type="text"
                defaultValue={farm.herdMark || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                defaultValue={farm.address}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
              <input
                type="text"
                defaultValue={farm.postcode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Hectares</label>
              <input
                type="number"
                step="0.1"
                defaultValue={farm.totalHectares || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
              <select
                defaultValue={farm.subscriptionPlan}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="STARTER">Starter (up to 100 head) - £29/month</option>
                <option value="PROFESSIONAL">Professional (up to 500 head) - £59/month</option>
                <option value="ENTERPRISE">Enterprise (unlimited) - £99/month</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition font-medium">
              Save Changes
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Farm Staff & Users</h2>
            <p className="text-sm text-gray-600 mt-1">Manage access and permissions for your team</p>
          </div>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-emerald-700 hover:text-emerald-800 font-medium mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Reference */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Role Permissions</h2>
          <p className="text-sm text-gray-600 mt-1">What each role can access in HerdBase</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Farm Owner
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Full access:</strong> All records, financials, settings, user management, and system configuration.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Farm Manager
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Operations access:</strong> All herd, health, breeding, feed, pasture, and compliance records. Limited financial access.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Stockman
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Herd management:</strong> Record weights, movements, health events, breeding, and calving. View-only financial data.
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  Vet
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Health records only:</strong> View herd register, add health records, treatments, and vet visits. No access to financial data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">System Settings</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts for calvings, health events, and system updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">SMS Alerts</p>
                <p className="text-sm text-gray-600">Critical alerts sent via SMS (calvings, health emergencies)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Auto BCMS Submission</p>
                <p className="text-sm text-gray-600">Automatically submit movement records to BCMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Weekly Reports</p>
                <p className="text-sm text-gray-600">Receive summary email every Monday morning</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* BCMS Integration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">BCMS Integration</h2>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">BCMS API Coming Soon</p>
                <p className="text-sm text-blue-700 mt-1">Direct integration with BCMS for automated movement reporting is in development.</p>
              </div>
            </div>
          </div>
          <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium cursor-not-allowed" disabled>
            Connect BCMS Account
          </button>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Data Export</h2>
          <p className="text-sm text-gray-600 mt-1">Download your farm data for backup or analysis</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium text-center">
              📊 Export Herd Register (CSV)
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium text-center">
              💉 Export Health Records (Excel)
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium text-center">
              💰 Export Financial Data (PDF)
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium text-center">
              🐄 Export Breeding Records (CSV)
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium text-center">
              ⚖️ Export Weight Data (Excel)
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium text-center">
              📦 Export All Data (ZIP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
