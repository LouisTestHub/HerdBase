import Link from 'next/link';

export default function OakfieldFarmCaseStudy() {
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
            src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1600&q=80"
            alt="Hereford cattle grazing"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
                ← Back to case studies
              </Link>
              <div className="inline-block bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                Mixed Beef &amp; Dairy
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Oakfield Farm: £18K Feed Savings, Conception Rate 42%→68%
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <span>Harvey Jones, Farm Manager</span>
                <span>Herefordshire</span>
                <span>350-head mixed herd</span>
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
              <div className="text-3xl font-bold text-[#1B5E20]">£18K/year</div>
              <div className="text-sm text-gray-600 mt-1">Feed cost savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">12 hrs/week</div>
              <div className="text-sm text-gray-600 mt-1">Admin time saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">42→68%</div>
              <div className="text-sm text-gray-600 mt-1">Conception rate improvement</div>
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
                  Harvey Jones manages Oakfield Farm — a 350-head mixed Hereford and Angus operation in 
                  the heart of Herefordshire. Running both a suckler herd and a small dairy unit, Harvey 
                  was managing animal records across three different systems: a paper calving book, a 
                  spreadsheet for breeding, and a separate file for BCMS returns.
                </p>
                <p className="text-gray-700 mb-4">
                  Breeding performance had plateaued. Conception rate had been stuck at 42% for three years, 
                  but Harvey couldn&apos;t pinpoint whether the issue was bull fertility, heat detection timing, 
                  or genetic factors. Without consolidated data, every breeding decision was essentially a guess.
                </p>
                <p className="text-gray-700">
                  Feed costs were also spiralling. Low-performing cows — repeat breeders, poor mothers, slow 
                  growers — were staying in the herd too long because there was no easy way to identify them. 
                  The accountant estimated feed waste on unproductive animals was costing £18-20k per year.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <p className="text-gray-700 mb-4">
                  Harvey moved everything into HerdBase over a single weekend. The team imported breeding 
                  histories, calving records, and weight data going back 5 years.
                </p>
                <ul className="space-y-3">
                  {[
                    'Breeding analytics — identified 38 repeat breeders and low-conception bloodlines within the first month',
                    'Calving alerts — automatic notifications 7 days before due date, eliminating missed calvings',
                    'BCMS integration — monthly returns auto-generated from birth, death, and movement records',
                    'Performance scoring — every animal scored on fertility, growth rate, and maternal traits. Culling decisions backed by data.',
                    'Feed cost tracking — linked to individual animal performance, making it easy to spot uneconomic stock',
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
                    { value: '£18K/year', label: 'Feed cost savings from strategic culling' },
                    { value: '12 hrs/week', label: 'Admin time saved on records & BCMS' },
                    { value: '42→68%', label: 'Conception rate improvement' },
                    { value: 'Zero', label: 'Missed calvings since setup' },
                    { value: '10 mins', label: 'BCMS monthly return (was 2 days)' },
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
                  &quot;HerdBase showed us what we couldn&apos;t see with paper records. Within a month, we&apos;d 
                  identified 38 cows that were costing us money — repeat breeders, poor mothers, slow growers. 
                  We culled them, switched to genomic-tested sires based on the data, and our conception rate 
                  went from 42% to 68%. The £18k feed saving was just the start — better breeding means better 
                  calves, and better calves mean better prices at market.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-bold text-gray-900">Harvey Jones</p>
                  <p className="text-sm text-gray-600">Farm Manager, Oakfield Farm</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 space-y-6">
                <h3 className="font-bold text-gray-900">Farm Profile</h3>
                <div className="space-y-4 text-sm">
                  <div><div className="text-gray-500">Farm</div><div className="font-semibold">Oakfield Farm</div></div>
                  <div><div className="text-gray-500">Manager</div><div className="font-semibold">Harvey Jones</div></div>
                  <div><div className="text-gray-500">Location</div><div className="font-semibold">Herefordshire</div></div>
                  <div><div className="text-gray-500">Herd</div><div className="font-semibold">350-head Hereford/Angus</div></div>
                  <div><div className="text-gray-500">Type</div><div className="font-semibold">Mixed beef &amp; dairy</div></div>
                  <div><div className="text-gray-500">Key Challenge</div><div className="font-semibold">Low conception &amp; feed waste</div></div>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Get Similar Results</h4>
                  <p className="text-sm text-gray-600 mb-4">See how HerdBase can improve your herd performance.</p>
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
