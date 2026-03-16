import Link from 'next/link';

const tiers = [
  {
    name: 'Free',
    price: '£0',
    period: 'forever',
    description: 'Start your free calving book — no card required',
    maxAnimals: '50',
    popular: false,
    features: ['Calving book with due dates', 'Basic herd register (50 animals)', 'Calving alerts', 'Mobile friendly', 'Offline access (PWA)'],
    cta: 'Start Free',
    href: '/register',
    ctaStyle: 'border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50',
  },
  {
    name: 'Starter',
    price: '£29',
    period: '/month',
    description: 'Health, weight and more for growing herds',
    maxAnimals: '200',
    popular: false,
    features: ['Everything in Free', 'Up to 200 animals', 'Health & medicine records', 'Weight tracking', 'Basic reports & CSV export', 'Email support'],
    cta: 'Start Free Trial',
    href: '/register',
    ctaStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
  },
  {
    name: 'Professional',
    price: '£59',
    period: '/month',
    description: 'Complete farm management for serious operations',
    maxAnimals: '500',
    popular: true,
    features: ['Everything in Starter', 'Up to 500 animals', 'Breeding & fertility', 'Feed management', 'Financial records', 'TB testing & compliance', 'EID reader integration', 'Market prices & lot prep', 'BCMS reporting', 'Priority support'],
    cta: 'Start Free Trial',
    href: '/register',
    ctaStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
  },
  {
    name: 'Enterprise',
    price: '£99',
    period: '/month',
    description: 'Unlimited scale with premium features',
    maxAnimals: 'Unlimited',
    popular: false,
    features: ['Everything in Professional', 'Unlimited animals', 'Multi-farm support', 'Sensor integrations', 'Custom reports & API access', 'Dedicated account manager', 'Phone support'],
    cta: 'Contact Sales',
    href: '/register',
    ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-emerald-900">HerdBase</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-700">Home</Link>
            <Link href="/pricing" className="text-emerald-700 font-medium">Pricing</Link>
          </nav>
          <Link href="/login" className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition">Sign In</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free with your calving book. Upgrade when you&apos;re ready — no surprises, no contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl border-2 p-8 relative flex flex-col ${tier.popular ? 'border-emerald-600 shadow-xl scale-105' : 'border-gray-200'}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500">{tier.period}</span>
                </div>
                <p className="text-sm text-gray-600 mt-3">{tier.description}</p>
                <p className="text-xs text-gray-400 mt-1">Up to {tier.maxAnimals} animals</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition ${tier.ctaStyle}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">All plans include SSL encryption, daily backups, and UK data hosting</p>
        </div>
      </div>
    </div>
  );
}
