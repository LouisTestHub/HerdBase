import Link from 'next/link';

const caseStudies = [
  {
    slug: 'oakfield-farm',
    farm: 'Oakfield Farm',
    farmer: 'Harvey Jones',
    location: 'Herefordshire',
    herd: '350-head Hereford/Angus',
    type: 'Mixed Beef & Dairy',
    tagColor: 'bg-amber-700',
    headline: '£18K feed savings, conception rate 42%→68%, 12hrs/week saved',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
    stats: [
      { value: '£18K', label: 'Feed savings' },
      { value: '12 hrs/wk', label: 'Time saved' },
      { value: '42→68%', label: 'Conception' },
    ],
  },
  {
    slug: 'williams-family-farm',
    farm: 'Williams Family Farm',
    farmer: 'Wyn Williams',
    location: 'Powys, Mid Wales',
    herd: '600 Welsh Black cattle',
    type: 'Hill Farm',
    tagColor: 'bg-[#1B5E20]',
    headline: 'TB testing admin cut 80%, breeding records digitised, calving losses down 15%',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
    stats: [
      { value: '-80%', label: 'TB admin' },
      { value: '-15%', label: 'Calving losses' },
      { value: '100%', label: 'Digitised' },
    ],
  },
  {
    slug: 'riverside-herefords',
    farm: 'Riverside Herefords',
    farmer: 'Tom & Emma Bradshaw',
    location: 'Somerset',
    herd: '200 pedigree Herefords',
    type: 'Pedigree Breeding',
    tagColor: 'bg-amber-700',
    headline: 'Breed society submissions automated, sale lot prep halved, record prices at market',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80',
    stats: [
      { value: 'Auto', label: 'Registrations' },
      { value: '-50%', label: 'Sale prep' },
      { value: 'Record', label: 'Market prices' },
    ],
  },
];

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

      {/* Case Study Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.farm}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className={`inline-block ${study.tagColor} text-white px-3 py-1 rounded-full text-xs font-semibold mb-2`}>
                      {study.type}
                    </div>
                    <h2 className="text-xl font-bold">{study.farm}</h2>
                    <p className="text-sm text-gray-300">{study.location} · {study.herd}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-900 mb-4">&ldquo;{study.headline}&rdquo;</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg font-bold text-[#1B5E20]">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#1B5E20] font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read full story →
                  </p>
                </div>
              </Link>
            ))}
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
                <li><Link href="/resources" className="hover:text-white transition">Blog &amp; Guides</Link></li>
                <li><Link href="#" className="hover:text-white transition">Help Centre</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 HerdBase by Data &amp; Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
