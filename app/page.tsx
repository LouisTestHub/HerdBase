import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1B5E20] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B5E20]">HerdBase</h1>
              <p className="text-xs text-gray-600">Complete cattle management for UK farmers</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/features" className="text-gray-700 hover:text-[#1B5E20] transition">Features</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#1B5E20] transition">Pricing</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1B5E20] transition">About</Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1B5E20] transition">Case Studies</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1B5E20] transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-[#1B5E20]/10 border-2 border-[#1B5E20] px-4 py-2 rounded-full text-sm font-semibold mb-6 text-[#1B5E20]">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 200+ UK cattle farmers • BCMS Compliant
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stop losing cattle records in notebooks
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              One system for your entire herd — records, health, breeding, and business. 
              Built for UK cattle farmers who want to stay compliant and profitable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-800 transition text-center">
                Start Free Calving Book
              </Link>
              <Link href="/login" className="border-2 border-emerald-700 text-emerald-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition text-center">
                Try Free Demo →
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • Free forever for up to 50 animals • Works offline in the field</p>
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
              <path d="M 0 350 Q 150 280 300 350 T 600 350 L 600 500 L 0 500 Z" fill="url(#grassGradient)" />
              <path d="M 0 380 Q 180 320 360 380 T 600 380 L 600 500 L 0 500 Z" fill="#10b981" fillOpacity="0.15" />
              <line x1="50" y1="320" x2="50" y2="380" stroke="#8B4513" strokeWidth="4" />
              <line x1="150" y1="310" x2="150" y2="370" stroke="#8B4513" strokeWidth="4" />
              <line x1="250" y1="320" x2="250" y2="380" stroke="#8B4513" strokeWidth="4" />
              <line x1="350" y1="315" x2="350" y2="375" stroke="#8B4513" strokeWidth="4" />
              <line x1="50" y1="340" x2="350" y2="335" stroke="#8B4513" strokeWidth="3" />
              <line x1="50" y1="360" x2="350" y2="355" stroke="#8B4513" strokeWidth="3" />
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
              <circle cx="500" cy="80" r="40" fill="#fbbf24" opacity="0.8" />
              <ellipse cx="100" cy="100" rx="40" ry="25" fill="#ffffff" opacity="0.7" />
              <ellipse cx="130" cy="100" rx="50" ry="30" fill="#ffffff" opacity="0.7" />
              <ellipse cx="160" cy="105" rx="35" ry="22" fill="#ffffff" opacity="0.7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-[#1B5E20] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { value: '200+', label: 'UK Farms' },
              { value: '50,000+', label: 'Cattle Tracked' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">{stat.value}</div>
                <div className="text-emerald-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Badges */}
      <section className="py-10 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by farmers. Rated by the industry.</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: 'Capterra', rating: '4.8/5' },
              { name: 'G2', rating: '4.8/5' },
              { name: 'Software Advice', rating: '4.9/5' },
              { name: 'GetApp', rating: '4.8/5' },
            ].map((badge) => (
              <div key={badge.name} className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">{badge.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">on {badge.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlimited Messaging */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">No Limits on Paid Plans</h2>
          <p className="text-emerald-100 text-lg mb-8">Scale your herd without scaling your costs.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🐄', label: 'Unlimited Animals' },
              { icon: '📋', label: 'Unlimited Records' },
              { icon: '📊', label: 'Unlimited Exports' },
            ].map((item) => (
              <div key={item.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xl font-bold text-white">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-emerald-200 text-sm mt-4">Available on Professional and Enterprise plans</p>
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-2">Product Demo</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See HerdBase in 2 Minutes</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Watch how UK farmers manage their herds, track health records, and stay BCMS-compliant.</p>
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-3 gap-4 p-8 h-full">
                  <div className="bg-white/10 rounded-lg" />
                  <div className="bg-white/10 rounded-lg col-span-2" />
                  <div className="bg-white/10 rounded-lg col-span-2" />
                  <div className="bg-white/10 rounded-lg" />
                </div>
              </div>
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">2:22</div>
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

      {/* New Features Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              New Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Just Launched — Built for UK Farmers
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              New tools designed to save you time, keep you compliant, and help you run a more profitable farm.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📖',
                title: 'Free Calving Book',
                desc: 'Digital calving book available free for every farmer. Record calvings, track ease scores, and register calves — no subscription needed.',
                badge: 'Free',
              },
              {
                icon: '📱',
                title: 'Offline PWA',
                desc: 'Full app works without signal. Record data in the field, in the parlour, or anywhere on your farm. Syncs automatically when back online.',
                badge: 'Mobile',
              },
              {
                icon: '🧪',
                title: 'TB Testing Module',
                desc: 'Digital TB test recording, results tracking, movement restrictions, and pre-movement testing reminders. Stay compliant with APHA requirements.',
                badge: 'Compliance',
              },
              {
                icon: '🏪',
                title: 'Livestock Markets',
                desc: 'Connect to market data. Pre-sale consignment lists, post-sale record updates, and automatic movement notifications to BCMS.',
                badge: 'Markets',
              },
              {
                icon: '🏆',
                title: 'Breed Association Exports',
                desc: 'Export registrations directly to breed societies. Compatible with major UK breed associations for pedigree and performance recording.',
                badge: 'Exports',
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-5 bg-white p-6 rounded-xl border border-emerald-200 hover:shadow-lg transition-all">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{feature.badge}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Up and Running in 3 Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Sign Up', desc: 'Create your free account in 2 minutes. No credit card needed. Start with the free calving book or pick a plan.', icon: '🚀' },
              { step: '2', title: 'Set Up Your Herd', desc: 'Import your herd from CSV, BCMS, or add animals manually. Set up your farm, fields, and management groups.', icon: '⚙️' },
              { step: '3', title: 'Start Managing', desc: 'Record health, breeding, weights, and movements. Stay compliant with BCMS. See your herd performance at a glance.', icon: '📊' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-700 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">{item.step}</div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section id="testimonials" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by farmers across the UK</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'James Hartley',
                role: 'Dairy Farmer',
                company: '250-head dairy, Yorkshire',
                initials: 'JH',
                quote: 'HerdBase saved us during our Red Tractor audit. Everything in one place, no more digging through notebooks.',
                result: 'Audit-ready in 10 mins',
                stars: 5,
              },
              {
                name: 'Emma Davies',
                role: 'Beef Producer',
                company: '180-head beef, Welsh Borders',
                initials: 'ED',
                quote: 'The breeding module is brilliant. Heat alerts from our sensors go straight into the app. We haven\'t missed a service in 6 months.',
                result: '100% conception rate',
                stars: 5,
              },
              {
                name: 'Robert McGregor',
                role: 'Suckler Herd Manager',
                company: '95-head suckler, Scotland',
                initials: 'RM',
                quote: 'Finally know exactly what each cow costs to feed. The profit-per-cow dashboard changed how we make culling decisions.',
                result: '£45/head more profit',
                stars: 5,
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-8 rounded-xl border border-emerald-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">{testimonial.result}</span>
                </div>
                <div className="border-t border-emerald-100 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white text-sm font-bold">{testimonial.initials}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
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

      {/* Final CTA Section */}
      <section className="bg-emerald-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to modernise your farm records?</h2>
          <p className="text-emerald-100 font-semibold mb-2">Start your free 14-day trial — no credit card required</p>
          <p className="text-xl text-emerald-100 mb-8">Join hundreds of UK cattle farmers managing their herds with HerdBase</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="inline-block bg-white text-emerald-700 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition">
              Start Your Free Trial
            </Link>
            <Link href="/contact" className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition">
              Book a Demo
            </Link>
          </div>
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
            <p>&copy; 2026 HerdBase by Data & Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
