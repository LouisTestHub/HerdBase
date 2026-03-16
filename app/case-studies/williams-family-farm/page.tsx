import Link from 'next/link';

export default function WilliamsFamilyFarmCaseStudy() {
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
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80"
            alt="Welsh Black cattle on hillside"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
                ← Back to case studies
              </Link>
              <div className="inline-block bg-[#1B5E20] text-white px-4 py-1 rounded-full text-sm font-semibold mb-3 border border-white/30">
                Hill Farm · Welsh Black
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Williams Family Farm: TB Admin Cut 80%, Calving Losses Down 15%
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <span>Wyn Williams, Farmer</span>
                <span>Powys, Mid Wales</span>
                <span>600 Welsh Black cattle</span>
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
              <div className="text-3xl font-bold text-[#1B5E20]">-80%</div>
              <div className="text-sm text-gray-600 mt-1">TB testing admin time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">100%</div>
              <div className="text-sm text-gray-600 mt-1">Breeding records digitised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1B5E20]">-15%</div>
              <div className="text-sm text-gray-600 mt-1">Calving losses reduced</div>
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
                  Wyn Williams runs a 600-head Welsh Black suckler herd across 800 acres of hill farm 
                  in Powys. It&apos;s a traditional family operation — Wyn, his wife Megan, and two sons 
                  manage the entire herd. Welsh Black cattle are hardy and perfectly suited to the terrain, 
                  but managing 600 animals across remote hill fields creates unique record-keeping challenges.
                </p>
                <p className="text-gray-700 mb-4">
                  TB testing was the biggest administrative burden. As a high-risk area, Williams Farm faces 
                  annual TB testing of the entire herd. Preparing the paperwork — ear tag lists, movement 
                  histories, previous test results — took Wyn and Megan three full days before every test. 
                  During the actual test, matching animals to paper records in the crush was chaotic, with 
                  illegible handwriting causing delays and errors.
                </p>
                <p className="text-gray-700">
                  Breeding records were equally problematic. With bulls running with cows on the hill, tracking 
                  service dates was largely guesswork. Calving predictions were unreliable, and the Williams 
                  family was losing 8-10 calves per year to unattended difficult calvings — especially first-calvers 
                  on remote hill fields.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <ul className="space-y-3">
                  {[
                    'TB test preparation — auto-generates complete herd lists with ear tags, ages, previous test history, and movement records. What took 3 days now takes 30 minutes.',
                    'Mobile recording in the crush — scan ear tags during testing, record results on phone in real-time. Vet gets a digital copy immediately.',
                    'Bull tracking — record which bulls run with which groups and dates. HerdBase calculates expected calving windows for every cow.',
                    'Calving alerts — push notifications to phone for expected calvings, with priority flags for first-calvers and animals with difficult calving history.',
                    'BCMS auto-reporting — births, deaths, and movements uploaded directly. No more manual form-filling.',
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
                    { value: '-80%', label: 'TB testing admin time' },
                    { value: '100%', label: 'Breeding records digitised' },
                    { value: '-15%', label: 'Calving losses reduced' },
                    { value: '30 mins', label: 'TB test prep (was 3 days)' },
                    { value: 'Zero', label: 'BCMS return errors' },
                  ].map((r) => (
                    <div key={r.label} className="bg-[#1B5E20] text-white p-5 rounded-xl text-center">
                      <div className="text-2xl font-bold mb-1">{r.value}</div>
                      <div className="text-sm text-green-100">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#1B5E20]">
                <p className="text-lg text-gray-700 italic mb-4">
                  &quot;TB testing used to be the most stressful week of the year. Three days preparing 
                  paperwork, then chaos in the crush matching paper to cattle. Now I pull up the herd list 
                  on my phone, scan tags as they come through, and the vet gets a digital record on the spot. 
                  But the calving alerts have been the real lifesaver — literally. We&apos;ve saved calves 
                  that we would have lost on the hill because we didn&apos;t know they were due.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-bold text-gray-900">Wyn Williams</p>
                  <p className="text-sm text-gray-600">Farmer, Williams Family Farm</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 space-y-6">
                <h3 className="font-bold text-gray-900">Farm Profile</h3>
                <div className="space-y-4 text-sm">
                  <div><div className="text-gray-500">Farm</div><div className="font-semibold">Williams Family Farm</div></div>
                  <div><div className="text-gray-500">Farmer</div><div className="font-semibold">Wyn Williams</div></div>
                  <div><div className="text-gray-500">Location</div><div className="font-semibold">Powys, Mid Wales</div></div>
                  <div><div className="text-gray-500">Herd</div><div className="font-semibold">600 Welsh Black cattle</div></div>
                  <div><div className="text-gray-500">Type</div><div className="font-semibold">Hill farm suckler herd</div></div>
                  <div><div className="text-gray-500">Acreage</div><div className="font-semibold">800 acres</div></div>
                  <div><div className="text-gray-500">Key Challenge</div><div className="font-semibold">TB admin &amp; hill calving losses</div></div>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Get Similar Results</h4>
                  <p className="text-sm text-gray-600 mb-4">See how HerdBase works for hill farms and large herds.</p>
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
