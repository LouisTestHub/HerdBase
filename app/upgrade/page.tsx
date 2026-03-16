import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: 'forever',
    description: 'Perfect for small herds and calving records',
    maxAnimals: 50,
    current: false,
    features: [
      'Calving book with due dates',
      'Basic herd register',
      'Up to 50 animals',
      'Calving alerts',
      'Mobile friendly',
    ],
    cta: 'Current Plan',
    ctaStyle: 'border-2 border-gray-300 text-gray-500 cursor-default',
  },
  {
    name: 'Starter',
    price: '£29',
    period: '/month',
    description: 'For growing farms that need more',
    maxAnimals: 200,
    current: false,
    popular: false,
    features: [
      'Everything in Free',
      'Up to 200 animals',
      'Health & medicine records',
      'Weight tracking',
      'Basic reports & exports',
      'Email support',
    ],
    cta: 'Upgrade to Starter',
    ctaStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
  },
  {
    name: 'Professional',
    price: '£59',
    period: '/month',
    description: 'Full farm management for serious operations',
    maxAnimals: 500,
    current: false,
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 500 animals',
      'Breeding & fertility',
      'Feed management',
      'Financial records',
      'TB testing & compliance',
      'EID reader integration',
      'Market prices & lot prep',
      'BCMS reporting',
      'Priority support',
    ],
    cta: 'Upgrade to Professional',
    ctaStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
  },
  {
    name: 'Enterprise',
    price: '£99',
    period: '/month',
    description: 'Unlimited scale with premium features',
    maxAnimals: 99999,
    current: false,
    features: [
      'Everything in Professional',
      'Unlimited animals',
      'Multi-farm support',
      'Sensor integrations',
      'Custom reports',
      'API access',
      'Dedicated account manager',
      'Phone support',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
];

export default function UpgradePage() {
  // Mock usage data
  const currentAnimals = 42;
  const currentLimit = 50;
  const usagePercent = Math.round((currentAnimals / currentLimit) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/free/calving" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">HerdBase</span>
          </Link>
          <Link href="/free/calving" className="text-sm text-gray-600 hover:text-gray-900">← Back to dashboard</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose the right plan for your farm</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free with your calving book, then upgrade as your needs grow
          </p>
        </div>

        {/* Usage bar */}
        <div className="max-w-md mx-auto mb-12 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Your current usage</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{currentAnimals} animals</span>
            <span className="text-sm text-gray-500">Limit: {currentLimit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full ${usagePercent > 80 ? 'bg-amber-500' : 'bg-emerald-600'}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{usagePercent}% of Free plan limit used</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl border-2 p-6 relative flex flex-col ${plan.popular ? 'border-emerald-600 shadow-lg' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full px-6 py-3 rounded-lg font-semibold text-sm transition ${plan.ctaStyle}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Can I try before I buy?', a: 'Absolutely. The Free plan is free forever — no card needed, no time limit. Use the calving book and basic herd register for as long as you like.' },
              { q: 'What happens to my data if I downgrade?', a: 'Your data is always safe. If you downgrade, you keep read access to all records. You just can\'t add new records beyond your plan limits.' },
              { q: 'Can I switch plans at any time?', a: 'Yes. Upgrade or downgrade whenever you like. Upgrades take effect immediately, downgrades at the end of your billing cycle.' },
              { q: 'Is there a contract?', a: 'No. All plans are month-to-month. Cancel any time with no penalty.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
