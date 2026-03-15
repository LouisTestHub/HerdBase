import Link from 'next/link';
import Image from 'next/image';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <Link href="/features" className="text-[#1B5E20] font-semibold">Features</Link>
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

      {/* Hero */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Complete Cattle Management</h1>
            <p className="text-xl text-gray-100 max-w-2xl">Eight powerful modules designed specifically for UK cattle farmers. Everything you need in one system.</p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">BCMS Compliant</div>
                <div className="text-sm text-gray-600">Direct integration</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">200+</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">UK Farms</div>
                <div className="text-sm text-gray-600">Active users</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">50K+</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">Cattle Tracked</div>
                <div className="text-sm text-gray-600">Nationwide</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">99.8%</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">Uptime</div>
                <div className="text-sm text-gray-600">Always available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Feature 1: Herd Register */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80" 
                  alt="Cattle in field with ear tags"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 1
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Herd Register & Compliance</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Your complete digital herd book. Never miss a BCMS deadline or lose a passport again.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Electronic CPH & holding register</strong>
                      <p className="text-gray-600">All animals, movements, births, and deaths in one place</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">BCMS auto-submission</strong>
                      <p className="text-gray-600">Birth, death, and movement notifications sent automatically</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Digital passport storage</strong>
                      <p className="text-gray-600">Scan and store passports, access from anywhere</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Ear tag tracking & replacement log</strong>
                      <p className="text-gray-600">Track lost tags, record replacements, maintain compliance</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 2: Health Monitoring */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 2
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Health Monitoring</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Track treatments, manage medicine stocks, and never breach withdrawal periods.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Treatment records & medicine database</strong>
                      <p className="text-gray-600">Log every treatment with batch numbers and dosages</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Automatic withdrawal period alerts</strong>
                      <p className="text-gray-600">Get notified before animals go for slaughter or milk sale</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Sensor integration (Allflex, Moocall)</strong>
                      <p className="text-gray-600">Import health alerts from ear tag sensors automatically</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Vaccination schedules & reminders</strong>
                      <p className="text-gray-600">Never miss a booster or annual vaccination again</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1580981355792-c69903d95cf0?w=800&q=80" 
                  alt="Veterinarian examining cattle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Feature 3: Breeding & Fertility */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562349571-0b8e8d7e0f7e?w=800&q=80" 
                  alt="Cow with calf in field"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 3
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Breeding & Fertility</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Improve conception rates, plan calvings, and track bull performance.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Heat detection alerts</strong>
                      <p className="text-gray-600">Activity sensors + manual logging, never miss a bulling</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">AI & natural service records</strong>
                      <p className="text-gray-600">Track sire, date, technician, and conception outcomes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Calving predictions & reminders</strong>
                      <p className="text-gray-600">Auto-calculated due dates with 7-day alerts</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Bull performance analytics</strong>
                      <p className="text-gray-600">Compare conception rates, calving ease, and progeny growth</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 4: Feed Management */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 4
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Feed Management</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Optimise rations, track costs, and improve feed efficiency across your herd.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Ration calculator & planner</strong>
                      <p className="text-gray-600">Build least-cost rations meeting energy and protein needs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Feed stock tracking</strong>
                      <p className="text-gray-600">Monitor silage clamps, concentrate stores, and usage rates</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Cost per kg liveweight gain</strong>
                      <p className="text-gray-600">See exactly what each kilo of growth costs you</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Feed efficiency benchmarking</strong>
                      <p className="text-gray-600">Compare your FCR against breed standards and targets</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" 
                  alt="Cattle feeding"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Feature 5: Weight & Growth */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80" 
                  alt="Cattle being weighed"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 5
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Weight & Growth Tracking</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Monitor performance, identify slow growers, and make informed culling decisions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Growth curves & DLWG calculations</strong>
                      <p className="text-gray-600">Visualise daily liveweight gain for each animal</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Crush scale & EID reader integration</strong>
                      <p className="text-gray-600">Import weights directly from Tru-Test, Gallagher, etc.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Under-performing animal alerts</strong>
                      <p className="text-gray-600">Get notified when cattle fall below expected growth rates</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Finished weight predictions</strong>
                      <p className="text-gray-600">Forecast when finishing cattle will hit target weight</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 6: Calving Monitor */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 6
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Calving Monitoring</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Reduce calf losses, track calving ease, and register births instantly.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Calving calendar & due date tracker</strong>
                      <p className="text-gray-600">See who's due this week, next week, and beyond</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Moocall sensor integration</strong>
                      <p className="text-gray-600">Calving alerts sent to your phone 1 hour before birth</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Calving ease scoring</strong>
                      <p className="text-gray-600">Record assisted births, vet callouts, and sire performance</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Instant calf registration</strong>
                      <p className="text-gray-600">Register births to BCMS from the calving pen on your phone</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&q=80" 
                  alt="Newborn calf with mother"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Feature 7: Pasture Management */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80" 
                  alt="Cattle grazing in lush pasture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 7
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Pasture & Grazing Management</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Maximise grass utilisation and maintain optimal stocking rates year-round.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Interactive paddock mapping</strong>
                      <p className="text-gray-600">Digital field maps with area calculations and GPS support</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Rotational grazing planner</strong>
                      <p className="text-gray-600">Plan moves, track grazing days, optimise rest periods</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Grass growth tracking</strong>
                      <p className="text-gray-600">Log plate meter readings, see growth rates per paddock</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Stocking rate calculator</strong>
                      <p className="text-gray-600">Livestock units per hectare with seasonal adjustments</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 8: Financial & Admin */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Module 8
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial & Administration</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Know your true costs, track profitability, and make data-driven business decisions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Profit-per-cow dashboard</strong>
                      <p className="text-gray-600">See exactly which animals make you money</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Purchase & sales ledger</strong>
                      <p className="text-gray-600">Track all cattle transactions, deadweight prices, mart sales</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Grant & subsidy tracking</strong>
                      <p className="text-gray-600">BPS, agri-environment schemes, Rural Payments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Custom reports & exports</strong>
                      <p className="text-gray-600">PDF reports for accountants, banks, and audits</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" 
                  alt="Financial charts and data"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B5E20] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to modernise your farm records?</h2>
          <p className="text-xl text-green-100 mb-8">Join 200+ UK cattle farmers managing their herds with HerdBase</p>
          <Link href="/pricing" className="inline-block bg-white text-[#1B5E20] px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            View Pricing
          </Link>
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
