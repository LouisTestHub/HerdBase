import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Small Farm',
      price: '£29',
      limit: 'Up to 100 head',
      description: 'Perfect for small herds and mixed farms',
      features: [
        'All 8 core modules',
        'BCMS integration',
        'Mobile app (iOS & Android)',
        'Unlimited users',
        'Email support',
        'Data exports',
        'Basic reports',
        'Cloud backup'
      ]
    },
    {
      name: 'Growing Farm',
      price: '£59',
      limit: 'Up to 500 head',
      description: 'Most popular for commercial beef and dairy',
      recommended: true,
      features: [
        'Everything in Small Farm',
        'Sensor integration (Allflex, Moocall)',
        'Scale & EID reader sync',
        'Advanced analytics',
        'Custom dashboards',
        'Priority email support',
        'Phone support',
        'Detailed profitability reports'
      ]
    },
    {
      name: 'Enterprise',
      price: '£99',
      limit: 'Unlimited cattle',
      description: 'For large herds and multiple holdings',
      features: [
        'Everything in Growing Farm',
        'Xero / QuickBooks sync',
        'Multiple CPH support',
        'API access',
        'White-label option',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom feature development',
        'On-farm training'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1B5E20] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#1B5E20]">HerdBase</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/features" className="text-gray-700 hover:text-[#1B5E20] transition">Features</Link>
            <Link href="/pricing" className="text-[#1B5E20] font-semibold">Pricing</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1B5E20] transition">About</Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1B5E20] transition">Case Studies</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1B5E20] transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your herd size. No hidden fees, no long-term contracts. Cancel anytime.
          </p>
          <div className="inline-flex items-center bg-[#1B5E20]/10 border-2 border-[#1B5E20] rounded-full px-6 py-3 text-[#1B5E20] font-semibold">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            14-day free trial • No credit card required
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  plan.recommended ? 'ring-4 ring-[#1B5E20] scale-105 relative' : 'border border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <div className="bg-[#1B5E20] text-white text-center py-2 font-semibold text-sm">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-[#1B5E20]">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                    <p className="text-gray-600 mt-2 font-medium">{plan.limit}</p>
                  </div>

                  <Link 
                    href="/login" 
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition mb-6 ${
                      plan.recommended 
                        ? 'bg-[#1B5E20] text-white hover:bg-[#2E7D32]' 
                        : 'border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20]/5'
                    }`}
                  >
                    Start Free Trial
                  </Link>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <svg className="w-5 h-5 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 text-gray-900 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold">Small Farm</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold bg-[#1B5E20]/5">Growing Farm</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Maximum cattle', values: ['100', '500', 'Unlimited'] },
                  { name: 'Herd Register & BCMS', values: ['✓', '✓', '✓'] },
                  { name: 'Health Monitoring', values: ['✓', '✓', '✓'] },
                  { name: 'Breeding & Fertility', values: ['✓', '✓', '✓'] },
                  { name: 'Feed Management', values: ['✓', '✓', '✓'] },
                  { name: 'Weight & Growth Tracking', values: ['✓', '✓', '✓'] },
                  { name: 'Calving Monitoring', values: ['✓', '✓', '✓'] },
                  { name: 'Pasture Management', values: ['✓', '✓', '✓'] },
                  { name: 'Financial & Admin', values: ['✓', '✓', '✓'] },
                  { name: 'Mobile app', values: ['✓', '✓', '✓'] },
                  { name: 'Unlimited users', values: ['✓', '✓', '✓'] },
                  { name: 'Sensor integration', values: ['—', '✓', '✓'] },
                  { name: 'Scale & EID sync', values: ['—', '✓', '✓'] },
                  { name: 'Advanced analytics', values: ['—', '✓', '✓'] },
                  { name: 'Priority support', values: ['—', '✓', '✓'] },
                  { name: 'Accounting software sync', values: ['—', '—', '✓'] },
                  { name: 'Multiple CPH support', values: ['—', '—', '✓'] },
                  { name: 'API access', values: ['—', '—', '✓'] },
                  { name: 'Dedicated account manager', values: ['—', '—', '✓'] },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-900">{row.name}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.values[0]}</td>
                    <td className="py-3 px-4 text-center text-gray-700 bg-[#1B5E20]/5 font-semibold">{row.values[1]}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.values[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Absolutely. Upgrade or downgrade anytime from your account settings. Changes take effect immediately.'
              },
              {
                q: 'What happens after the 14-day trial?',
                a: 'We\'ll email you 3 days before your trial ends. If you don\'t add a payment method, your account simply pauses — no automatic charges, ever.'
              },
              {
                q: 'Is my data safe?',
                a: 'Yes. All data is encrypted, backed up daily, and stored on UK servers. We\'re GDPR compliant and take security seriously.'
              },
              {
                q: 'Do you offer discounts for multiple years?',
                a: 'Yes! Pay annually and save 15%. Contact us for multi-holding or family farm discounts.'
              },
              {
                q: 'Can I import my existing records?',
                a: 'Yes. We can import from spreadsheets, CTS downloads, or other farm software. Support team will help you migrate.'
              },
              {
                q: 'What if I have more than 500 cattle?',
                a: 'Choose Enterprise for unlimited cattle, or contact us for volume pricing if you manage multiple large herds.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B5E20] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-green-100 mb-8">Join 200+ UK farms using HerdBase. Try it free for 14 days.</p>
          <Link href="/login" className="inline-block bg-white text-[#1B5E20] px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Start Your Free Trial
          </Link>
          <p className="text-green-200 mt-4 text-sm">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">HerdBase</h3>
              <p className="text-sm">Complete cattle management for UK farmers.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/bcms-compliance" className="hover:text-white transition">BCMS Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition">Case Studies</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/resources" className="hover:text-white transition">Blog & Guides</Link></li>
                <li><Link href="#" className="hover:text-white transition">Help Centre</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 HerdBase by Data & Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
