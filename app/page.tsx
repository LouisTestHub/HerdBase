import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-900">HerdBase</h1>
              <p className="text-xs text-emerald-600">One system for your entire herd</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-emerald-700 transition">Features</Link>
            <Link href="#pricing" className="text-gray-700 hover:text-emerald-700 transition">Pricing</Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-emerald-700 transition">Testimonials</Link>
          </nav>
          <Link href="/login" className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
              Trusted by 500+ UK cattle farmers
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stop losing cattle records in notebooks
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              One system for your entire herd — records, health, breeding, and business. 
              Built for UK cattle farmers who want to stay compliant and profitable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-800 transition text-center">
                Start Free Trial
              </Link>
              <Link href="#demo" className="border-2 border-emerald-700 text-emerald-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition text-center">
                Watch Demo
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">14-day free trial • No credit card required • Cancel anytime</p>
          </div>

          {/* Cattle SVG Illustration */}
          <div className="relative">
            <svg viewBox="0 0 600 500" className="w-full h-auto">
              <defs>
                <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.2}} />
                  <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 0.3}} />
                </linearGradient>
              </defs>
              
              {/* Background - Rolling hills */}
              <path d="M 0 350 Q 150 280 300 350 T 600 350 L 600 500 L 0 500 Z" fill="url(#grassGradient)" />
              <path d="M 0 380 Q 180 320 360 380 T 600 380 L 600 500 L 0 500 Z" fill="#10b981" fillOpacity="0.15" />
              
              {/* Fence */}
              <line x1="50" y1="320" x2="50" y2="380" stroke="#8B4513" strokeWidth="4" />
              <line x1="150" y1="310" x2="150" y2="370" stroke="#8B4513" strokeWidth="4" />
              <line x1="250" y1="320" x2="250" y2="380" stroke="#8B4513" strokeWidth="4" />
              <line x1="350" y1="315" x2="350" y2="375" stroke="#8B4513" strokeWidth="4" />
              <line x1="50" y1="340" x2="350" y2="335" stroke="#8B4513" strokeWidth="3" />
              <line x1="50" y1="360" x2="350" y2="355" stroke="#8B4513" strokeWidth="3" />
              
              {/* Cow 1 - Foreground, black and white dairy cow */}
              <g transform="translate(350, 340)">
                <ellipse cx="0" cy="0" rx="80" ry="50" fill="#ffffff" stroke="#1f2937" strokeWidth="2" />
                <ellipse cx="-20" cy="-10" rx="30" ry="35" fill="#1f2937" />
                <ellipse cx="25" cy="5" rx="25" ry="30" fill="#1f2937" />
                <circle cx="-50" cy="-5" r="28" fill="#ffffff" stroke="#1f2937" strokeWidth="2" />
                <circle cx="-55" cy="-8" r="8" fill="#1f2937" />
                <circle cx="-54" cy="-9" r="3" fill="#ffffff" />
                <path d="M -70 -20 Q -75 -30 -72 -35 Q -70 -32 -68 -35 Q -66 -30 -62 -22" fill="none" stroke="#1f2937" strokeWidth="2" />
                <line x1="-45" y1="40" x2="-45" y2="65" stroke="#1f2937" strokeWidth="4" />
                <line x1="-20" y1="42" x2="-20" y2="67" stroke="#1f2937" strokeWidth="4" />
                <line x1="10" y1="42" x2="10" y2="67" stroke="#1f2937" strokeWidth="4" />
                <line x1="35" y1="40" x2="35" y2="65" stroke="#1f2937" strokeWidth="4" />
                <path d="M 60 -8 Q 80 -15 85 -20 L 90 -18 L 88 -12 Q 82 -8 65 -3 Z" fill="#1f2937" />
              </g>

              {/* Cow 2 - Background, brown beef cow */}
              <g transform="translate(150, 300) scale(0.75)">
                <ellipse cx="0" cy="0" rx="80" ry="50" fill="#8B4513" stroke="#654321" strokeWidth="2" />
                <circle cx="-50" cy="-5" r="28" fill="#8B4513" stroke="#654321" strokeWidth="2" />
                <circle cx="-55" cy="-8" r="8" fill="#654321" />
                <circle cx="-54" cy="-9" r="3" fill="#ffffff" />
                <path d="M -70 -20 Q -75 -30 -72 -35 Q -70 -32 -68 -35 Q -66 -30 -62 -22" fill="none" stroke="#654321" strokeWidth="2" />
                <line x1="-45" y1="40" x2="-45" y2="65" stroke="#654321" strokeWidth="4" />
                <line x1="-20" y1="42" x2="-20" y2="67" stroke="#654321" strokeWidth="4" />
                <line x1="10" y1="42" x2="10" y2="67" stroke="#654321" strokeWidth="4" />
                <line x1="35" y1="40" x2="35" y2="65" stroke="#654321" strokeWidth="4" />
                <path d="M 60 -8 Q 80 -15 85 -20 L 90 -18 L 88 -12 Q 82 -8 65 -3 Z" fill="#654321" />
              </g>

              {/* Sun */}
              <circle cx="500" cy="80" r="40" fill="#fbbf24" opacity="0.8" />
              
              {/* Clouds */}
              <ellipse cx="100" cy="100" rx="40" ry="25" fill="#ffffff" opacity="0.7" />
              <ellipse cx="130" cy="100" rx="50" ry="30" fill="#ffffff" opacity="0.7" />
              <ellipse cx="160" cy="105" rx="35" ry="22" fill="#ffffff" opacity="0.7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to manage your herd</h2>
            <p className="text-xl text-gray-600">Eight powerful modules designed for UK cattle farmers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Record-Keeping & Compliance', icon: '📋', desc: 'BCMS submissions, passports, movement logs, ear tag tracking' },
              { title: 'Health Monitoring', icon: '🏥', desc: 'Treatment records, sensor integration, medicine withdrawal tracking' },
              { title: 'Breeding & Fertility', icon: '🐄', desc: 'Heat detection, AI records, calving predictions, bull performance' },
              { title: 'Feed Management', icon: '🌾', desc: 'Ration calculator, cost tracking, feed efficiency monitoring' },
              { title: 'Weight & Growth', icon: '📊', desc: 'Growth curves, DLWG calculations, scale integration, alerts' },
              { title: 'Calving Monitoring', icon: '🍼', desc: 'Calving calendar, sensor alerts, birth records, calf registration' },
              { title: 'Pasture Management', icon: '🌱', desc: 'Paddock mapping, grazing rotation, grass growth, stocking rates' },
              { title: 'Financial & Admin', icon: '💰', desc: 'Profit per cow, invoice management, grant tracking, reports' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-emerald-50 p-6 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your herd size</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '£29', limit: 'Up to 100 head', features: ['All core modules', 'BCMS integration', 'Mobile app', 'Email support'] },
              { name: 'Professional', price: '£59', limit: 'Up to 500 head', features: ['Everything in Starter', 'Sensor integration', 'Advanced analytics', 'Priority support'], recommended: true },
              { name: 'Enterprise', price: '£99', limit: 'Unlimited', features: ['Everything in Professional', 'Xero/QuickBooks sync', 'API access', 'Dedicated support'] },
            ].map((plan, idx) => (
              <div key={idx} className={`bg-white rounded-xl p-8 ${plan.recommended ? 'ring-4 ring-emerald-700 relative' : 'border border-gray-200'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-emerald-700">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.limit}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-emerald-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className={`block text-center py-3 rounded-lg font-semibold transition ${plan.recommended ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50'}`}>
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by farmers across the UK</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'James Hartley', farm: '250-head dairy, Yorkshire', quote: 'HerdBase saved us during our Red Tractor audit. Everything in one place, no more digging through notebooks.' },
              { name: 'Emma Davies', farm: '180-head beef, Welsh Borders', quote: 'The breeding module is brilliant. Heat alerts from our sensors go straight into the app. We haven\'t missed a service in 6 months.' },
              { name: 'Robert McGregor', farm: '95-head suckler herd, Scotland', quote: 'Finally know exactly what each cow costs to feed. The profit-per-cow dashboard changed how we make culling decisions.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-emerald-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="border-t border-emerald-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.farm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to modernise your farm records?</h2>
          <p className="text-xl text-emerald-100 mb-8">Join hundreds of UK cattle farmers managing their herds with HerdBase</p>
          <Link href="/login" className="inline-block bg-white text-emerald-700 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition">
            Start Your Free Trial
          </Link>
          <p className="text-emerald-200 mt-4">14 days free • No credit card • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">HerdBase</h3>
              <p className="text-sm">One system for your entire herd — records, health, breeding, and business.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">Mobile App</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Help Centre</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
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
