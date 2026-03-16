import Link from 'next/link';

export default function RiversideHerefordsCaseStudy() {
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
            <Link href="/case-studies" className="text-[#1B5E20] font-semibold">Case Studies</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]">
          <img
            src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1600&q=80"
            alt="Pedigree Hereford cattle"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
                ← Back to case studies
              </Link>
              <div className="inline-block bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                Pedigree Hereford
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Riverside Herefords: Breed Society Submissions Automated, Record Prices at Market
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <span>Tom &amp; Emma Bradshaw</span>
                <span>Somerset</span>
                <span>200 pedigree Herefords</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">Automated</div>
              <div className="text-sm text-gray-600 mt-1">Breed society submissions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">-50%</div>
              <div className="text-sm text-gray-600 mt-1">Sale lot preparation time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">Record</div>
              <div className="text-sm text-gray-600 mt-1">Prices achieved at market</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
                <p className="text-gray-700 mb-4">
                  Tom and Emma Bradshaw run Riverside Herefords — a 200-head pedigree Hereford herd in the 
                  Somerset levels. As pedigree breeders, their business depends on meticulous record-keeping. 
                  Every calf needs registering with the Hereford Breed Society, every animal needs a complete 
                  multi-generational pedigree, and sale stock needs comprehensive performance data to command 
                  premium prices.
                </p>
                <p className="text-gray-700 mb-4">
                  The challenge was that breed society submissions were entirely manual. Tom would fill in 
                  paper registration forms, cross-referencing dam and sire pedigrees from a filing cabinet of 
                  certificates going back decades. Each registration took 20-30 minutes. With 80-90 calves 
                  per year, that was 30-40 hours spent just on registrations. Errors — a wrong ear tag number, 
                  a misspelled sire name — would bounce forms back, adding weeks of delay.
                </p>
                <p className="text-gray-700">
                  Sale lot preparation was equally painful. Before each market, Tom needed to compile performance 
                  data, EBV figures, health records, and pedigree information for every lot. It took a full week 
                  to prepare for a major sale. And without easy access to performance data, some genuinely 
                  exceptional animals were being undersold because buyers couldn&apos;t see the full picture.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <ul className="space-y-3">
                  {[
                    'Breed society integration — calf registration data auto-populated from HerdBase breeding and calving records. One-click submission to the Hereford Breed Society.',
                    'Complete pedigree database — multi-generational pedigrees built automatically as animals are recorded. No more filing cabinet searches.',
                    'Performance recording — weights, EBVs, conformation scores, and health data all tracked per animal. Sale lot sheets auto-generated.',
                    'Sale preparation module — select animals for sale, and HerdBase compiles pedigree, performance, health, and photo data into a professional sale catalogue format.',
                    'Mobile recording — weights and scores recorded in the field with phone, synced instantly to the central database.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Results</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { value: 'Automated', label: 'Breed society submissions' },
                    { value: '-50%', label: 'Sale lot preparation time' },
                    { value: 'Record', label: 'Prices achieved at Hereford sales' },
                    { value: '-95%', label: 'Registration errors/bouncebacks' },
                    { value: '30+ hrs/year', label: 'Saved on registrations alone' },
                  ].map((r) => (
                    <div key={r.label} className="bg-[#1B5E20] text-white p-5 rounded-xl text-center">
                      <div className="text-2xl font-bold mb-1">{r.value}</div>
                      <div className="text-sm text-green-100">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-700">
                <p className="text-lg text-gray-700 italic mb-4">
                  &quot;Pedigree breeding is all about data — but we were drowning in paper. HerdBase transformed 
                  how we manage registrations and sale prep. Breed society submissions that took 30 minutes each 
                  now take one click. But the real impact has been at market. When buyers can see five generations 
                  of pedigree, full EBV data, and health records on every lot, they bid with confidence. We set 
                  a personal record at Hereford market last autumn — and I credit the quality of information we 
                  presented through HerdBase.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-bold text-gray-900">Tom Bradshaw</p>
                  <p className="text-sm text-gray-600">Pedigree Breeder, Riverside Herefords</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 space-y-6">
                <h3 className="font-bold text-gray-900">Farm Profile</h3>
                <div className="space-y-4 text-sm">
                  <div><div className="text-gray-500">Farm</div><div className="font-semibold">Riverside Herefords</div></div>
                  <div><div className="text-gray-500">Breeders</div><div className="font-semibold">Tom &amp; Emma Bradshaw</div></div>
                  <div><div className="text-gray-500">Location</div><div className="font-semibold">Somerset</div></div>
                  <div><div className="text-gray-500">Herd</div><div className="font-semibold">200 pedigree Herefords</div></div>
                  <div><div className="text-gray-500">Type</div><div className="font-semibold">Pedigree breeding &amp; sales</div></div>
                  <div><div className="text-gray-500">Key Challenge</div><div className="font-semibold">Breed society admin &amp; sale prep</div></div>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Get Similar Results</h4>
                  <p className="text-sm text-gray-600 mb-4">See how HerdBase supports pedigree breeders.</p>
                  <Link href="/login" className="block bg-[#1B5E20] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition mb-2">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; 2025 HerdBase by Data &amp; Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
