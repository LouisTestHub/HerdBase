import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function FinancePage() {
  const [financialRecords, invoices, grants] = await Promise.all([
    prisma.financialRecord.findMany({
      take: 50,
      orderBy: { date: 'desc' },
    }),
    prisma.invoice.findMany({
      take: 20,
      orderBy: { date: 'desc' },
    }),
    prisma.grant.findMany({
      orderBy: { year: 'desc' },
    }),
  ]);

  const totalIncome = financialRecords
    .filter((r) => r.type === 'INCOME')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = financialRecords
    .filter((r) => r.type === 'EXPENSE')
    .reduce((sum, r) => sum + r.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const expensesByCategory = financialRecords
    .filter((r) => r.type === 'EXPENSE')
    .reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + r.amount;
      return acc;
    }, {} as Record<string, number>);

  const topExpenseCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalGrantValue = grants.reduce((sum, g) => sum + (g.paymentReceived || 0), 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Management</h1>
        <p className="text-gray-600">Profit tracking, invoices, grants, and financial reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <span className="text-3xl block mb-2">📈</span>
          <p className="text-3xl font-bold text-emerald-700">£{(totalIncome / 1000).toFixed(1)}k</p>
          <p className="text-sm text-emerald-600">Total Income</p>
        </div>
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <span className="text-3xl block mb-2">📉</span>
          <p className="text-3xl font-bold text-red-700">£{(totalExpenses / 1000).toFixed(1)}k</p>
          <p className="text-sm text-red-600">Total Expenses</p>
        </div>
        <div className={`rounded-xl p-6 border ${netProfit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
          <span className="text-3xl block mb-2">💰</span>
          <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>
            £{(netProfit / 1000).toFixed(1)}k
          </p>
          <p className={`text-sm ${netProfit >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>Net Profit/Loss</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <span className="text-3xl block mb-2">🎁</span>
          <p className="text-3xl font-bold text-purple-700">£{(totalGrantValue / 1000).toFixed(1)}k</p>
          <p className="text-sm text-purple-600">Grant Payments</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Top Expense Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Top Expense Categories</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topExpenseCategories.map(([category, amount]) => (
              <div key={category} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{category.replace(/_/g, ' ')}</p>
                  <p className="text-lg font-bold text-gray-900">£{amount.toFixed(2)}</p>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(amount / totalExpenses) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Invoices</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{invoice.number}</p>
                    <p className="text-sm text-gray-600">{invoice.customerSupplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">£{invoice.total.toFixed(2)}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        invoice.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : invoice.status === 'OVERDUE'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {invoice.type} • {invoice.date.toLocaleDateString()}
                  {invoice.dueDate && ` • Due: ${invoice.dueDate.toLocaleDateString()}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grants */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Grant & Subsidy Tracking</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grants.map((grant) => (
                <tr key={grant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{grant.scheme}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grant.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    {grant.applicationRef || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grant.claimAmount ? `£${grant.claimAmount.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grant.approvedAmount ? `£${grant.approvedAmount.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {grant.paymentReceived ? `£${grant.paymentReceived.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        grant.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : grant.status === 'APPROVED'
                          ? 'bg-blue-100 text-blue-700'
                          : grant.status === 'APPLIED'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {grant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Financial Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-sm font-medium">
            + New Transaction
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">VAT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.category.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.supplier || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-bold ${
                        record.type === 'INCOME' ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {record.type === 'INCOME' ? '+' : '-'}£{record.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.vat ? `£${record.vat.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        record.type === 'INCOME' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-medium">
          + Record Transaction
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📊 Profit & Loss Report
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          💰 Cost Per Head
        </button>
        <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition font-medium">
          📥 Export to Xero
        </button>
      </div>
    </div>
  );
}
