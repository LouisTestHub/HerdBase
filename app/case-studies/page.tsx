import Link from 'next/link';

export default function CaseStudiesPage() {
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
            <Link href="/features" className="text-gray-700 hover:text-[#1B5E20] transition">Features</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#1B5E20] transition">Pricing</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1B5E20] transition">About</Link>
            <Link href="/case-studies" className="text-[#1B5E20] font-semibold">Case Studies</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1B5E20] transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Real Farms, Real Results</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            See how UK cattle farmers are using HerdBase to run more profitable, efficient operations
          </p>
        </div>
      </section>

      {/* Case Study 1: Dairy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80" 
                alt="Holstein dairy cows in modern milking parlour"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="inline-block bg-[#1B5E20] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Dairy Farm
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Greenfield Dairy: From Paper Chaos to Digital Clarity
              </h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Shropshire
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  340 Holstein Friesians
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-l-4 border-[#1B5E20]">
                <p className="text-lg text-gray-700 italic">
                  "Before HerdBase, we were drowning in paperwork. Treatment records in one notebook, 
                  breeding in another, movements on scraps of paper. During our Red Tractor audit, 
                  it took me three days to pull everything together. Now it's done in 20 minutes."
                </p>
                <div className="mt-4">
                  <p className="font-bold text-gray-900">Tom Henderson</p>
                  <p className="text-sm text-gray-600">Farm Manager, Greenfield Dairy</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
              <p className="text-gray-700 mb-4">
                Greenfield Dairy was managing 340 cows across two sites with paper records, spreadsheets, 
                and a lot of manual data entry. When Red Tractor came for an audit, Tom spent days 
                reconstructing treatment histories and movement logs from scattered notes.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Imported all historic records into HerdBase in one afternoon</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Integrated Allflex activity sensors for heat detection</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Connected Tru-Test weigh scales for automatic DLWG tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Set up automatic BCMS birth and movement reporting</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Results</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#1B5E20] text-white p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold mb-2">3 days</div>
                  <div className="text-sm text-green-100">saved per month on admin</div>
                </div>
                <div className="bg-[#1B5E20] text-white p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold mb-2">+12%</div>
                  <div className="text-sm text-green-100">conception rate improvement</div>
                </div>
                <div className="bg-[#1B5E20] text-white p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold mb-2">£0</div>
                  <div className="text-sm text-green-100">audit penalty fees (down from £850)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 2: Beef */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Beef Farm
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meadowbank Beef: Doubling Profit Per Animal
              </h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Herefordshire
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  185 Aberdeen Angus / Hereford cross
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-l-4 border-amber-700">
                <p className="text-lg text-gray-700 italic">
                  "I thought I knew which cows were profitable. I was wrong. HerdBase showed me exactly 
                  which bloodlines were costing me money. We culled 22 cows, changed our bull, and doubled 
                  our profit per head in 18 months."
                </p>
                <div className="mt-4">
                  <p className="font-bold text-gray-900">Emma Pritchard</p>
                  <p className="text-sm text-gray-600">Owner, Meadowbank Beef</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
              <p className="text-gray-700 mb-4">
                Emma was running a suckler-to-finishing operation but had no clear visibility into 
                profitability. She knew revenue, but not true costs per animal. Some cows were eating 
                more than they'd ever earn.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-700 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Tracked feed costs per animal using daily ration inputs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-700 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Logged all sales data — deadweight prices, mart sales, cull cows</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-700 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Analysed profit-per-cow dashboard by bloodline and sire</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-700 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Identified and culled low-performing genetics</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Results</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-amber-700 text-white p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold mb-2">+£240</div>
                  <div className="text-sm text-amber-100">profit per animal (from £118 to £358)</div>
                </div>
                <div className="bg-amber-700 text-white p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold mb-2">-9%</div>
                  <div className="text-sm text-amber-100">feed cost per kg gain</div>
                </div>
                <div className="bg-amber-700 text-white p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold mb-2">18mo</div>
                  <div className="text-sm text-amber-100">to payback period</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1594909132806-5bb86ea82a02?w=800&q=80" 
                alt="Aberdeen Angus cattle grazing in field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B5E20] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Your farm could be next</h2>
          <p className="text-xl text-green-100 mb-8">Join 200+ UK farms using HerdBase to run better cattle operations</p>
          <Link href="/login" className="inline-block bg-white text-[#1B5E20] px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Start Free Trial
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
