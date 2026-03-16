import Link from 'next/link';

function StatCard({ value, label, emoji }: { value: string; label: string; emoji: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:border-emerald-300">
      <div className="text-3xl mb-3">{emoji}</div>
      <div className="text-3xl font-bold text-[#1B5E20] mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default function OpportunityPage() {
  const competitors = [
    { name: "Herdwatch", pricing: "€79+/year", strengths: "Affordable, 15K+ farms, compliance", weaknesses: "Ireland-focused, basic analytics", target: "Irish/UK mixed farms" },
    { name: "Breedr", pricing: "£240/year", strengths: "Performance data, supply chain", weaknesses: "Complex for small farms", target: "Progressive farmers" },
    { name: "Farmplan", pricing: "On request", strengths: "BCMS integration, established", weaknesses: "Legacy UI, expensive", target: "Large farms" },
    { name: "Shearwell", pricing: "Hardware + SW", strengths: "EID readers + software", weaknesses: "Hardware-dependent", target: "EID adopters" },
    { name: "AgriWebb", pricing: "$35+/mo", strengths: "Good UI, pasture mgmt", weaknesses: "Australian, limited UK compliance", target: "Grazing operations" },
    { name: "CattleMax", pricing: "$18+/mo", strengths: "Affordable, simple", weaknesses: "US-built, no BCMS", target: "US ranchers" },
  ];

  const projections = [
    { customers: "500", mrr: "£5,000", arr: "£60,000" },
    { customers: "1,000", mrr: "£10,000", arr: "£120,000" },
    { customers: "5,000", mrr: "£50,000", arr: "£600,000" },
    { customers: "10,000", mrr: "£100,000", arr: "£1,200,000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1B5E20] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B5E20]">HerdBase</h1>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/features" className="text-gray-700 hover:text-[#1B5E20] transition">Features</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#1B5E20] transition">Pricing</Link>
            <Link href="/opportunity" className="text-[#1B5E20] font-medium">Opportunity</Link>
            <Link href="/market" className="text-gray-700 hover:text-[#1B5E20] transition">Market Research</Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1B5E20] transition">Case Studies</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm text-emerald-200 mb-6">
            📊 Business Plan & Market Opportunity
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            9.4 Million Cattle.<br />
            <span className="text-emerald-300">58,000 Farms. One Platform.</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-10">
            UK cattle farming is a £6.5 billion industry. BCMS compliance, TB testing, and movement reporting 
            are mandatory — yet most farmers still use paper records and notebooks. HerdBase is the modern answer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B5E20] text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Free Calving Book →
            </Link>
            <Link href="/market" className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white text-lg rounded-lg hover:bg-white/10 transition-colors">
              View Market Research
            </Link>
          </div>
        </div>
      </section>

      {/* Market Size */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Market Size</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            UK cattle farming is a vast, compliance-heavy industry with massive digital transformation potential.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="9.41M" label="UK Cattle Population (June 2024)" emoji="🐄" />
            <StatCard value="58,342" label="Cattle Holdings in GB (2024)" emoji="🏡" />
            <StatCard value="3.1M" label="Breeding Herd (Dec 2024)" emoji="🐮" />
            <StatCard value="-1.5%" label="Annual Herd Change" emoji="📉" />
          </div>
          <div className="mt-12 bg-white rounded-2xl border p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">TAM → SAM → SOM</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-emerald-50">
                <div className="text-sm font-semibold text-[#1B5E20] mb-2">Total Addressable Market</div>
                <div className="text-4xl font-bold text-gray-900">£175M</div>
                <div className="text-sm text-gray-600 mt-2">Farm management software across all UK livestock operations</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-blue-50">
                <div className="text-sm font-semibold text-blue-600 mb-2">Serviceable Addressable Market</div>
                <div className="text-4xl font-bold text-gray-900">£58M</div>
                <div className="text-sm text-gray-600 mt-2">Cattle-specific herd management for UK beef & dairy farms</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-orange-50">
                <div className="text-sm font-semibold text-orange-600 mb-2">Serviceable Obtainable Market</div>
                <div className="text-4xl font-bold text-gray-900">£2.9M</div>
                <div className="text-sm text-gray-600 mt-2">5% capture within 5 years — 2,900 paying farms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The Problem</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            UK cattle farmers face heavy compliance burdens — but most manage everything with paper, memory, and stress.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "📓", title: "Paper Cattle Passports", desc: "Individual cattle passports for every animal. Lost passports mean animals can't be moved or sold. Replacements take weeks." },
              { emoji: "🧪", title: "TB Testing Chaos", desc: "Mandatory TB testing every 1–4 years depending on area. Recording test results, reactor animals, and movement restrictions — all on paper." },
              { emoji: "🚚", title: "Movement Reporting", desc: "Every cattle movement must be reported to BCMS within 3 days. Late reporting means penalties and movement restrictions." },
              { emoji: "💊", title: "Medicine Records", desc: "All treatments must be recorded with batch numbers, withdrawal periods, and vet details. Missing records mean failed farm assurance audits." },
              { emoji: "📊", title: "No Performance Data", desc: "Most farmers don't know their cost per kilo of gain, calving intervals, or which bulls produce the best calves. Decisions made on gut feel." },
              { emoji: "💰", title: "Subsidy Changes", desc: "BPS phased out, replaced by SFI and ELM schemes. Complex applications, evidence requirements — all requiring digital records." },
            ].map((p) => (
              <div key={p.title} className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Drivers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Regulatory Drivers</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            UK cattle farming is one of the most heavily regulated agricultural sectors.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "BCMS (British Cattle Movement Service)", desc: "Every cattle movement must be reported within 3 days. Birth registrations within 27 days. Death notifications within 7 days. All via CTS Online or by post. HerdBase integrates directly." },
              { title: "TB Testing & Eradication", desc: "Mandatory tuberculin testing every 1–4 years depending on risk area. Reactor animals must be slaughtered. Movement restrictions during and after testing. Complex recording requirements." },
              { title: "Cattle Identification", desc: "All cattle must be double ear-tagged within 20 days of birth. Cattle passports issued for every animal. Herd register must be maintained on-farm. EID tags becoming standard." },
              { title: "Defra Farming Reforms", desc: "Basic Payment Scheme phasing out (2024–2027). Replaced by SFI, Countryside Stewardship, and Landscape Recovery. Evidence-based claims require digital records." },
            ].map((reg) => (
              <div key={reg.title} className="bg-white rounded-2xl border p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#1B5E20] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">⚖️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{reg.title}</h3>
                    <p className="text-sm text-gray-600">{reg.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Target Customer</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">🐄 Primary: UK Cattle Farmers</h3>
                  <ul className="space-y-3">
                    {[
                      "Beef suckler herds (20–500+ cows)",
                      "Dairy farmers (50–1,000+ cows)",
                      "Store cattle finishers",
                      "Pedigree breeders",
                      "Mixed livestock farms",
                      "Farm assurance scheme members",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-[#1B5E20]">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">📊 Market Numbers</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#1B5E20]">58,342</div>
                      <div className="text-sm text-gray-600">Cattle holdings in GB (2024)</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#1B5E20]">£10/mo</div>
                      <div className="text-sm text-gray-600">Average target price point</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#1B5E20]">Free tier</div>
                      <div className="text-sm text-gray-600">Up to 50 animals — always free</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Landscape */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Competitive Landscape</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The farm software market is fragmented. No single platform nails UK cattle compliance and modern UX.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border overflow-hidden">
              <thead>
                <tr className="bg-[#1B5E20] text-white">
                  <th className="text-left p-4 text-sm font-semibold">Competitor</th>
                  <th className="text-left p-4 text-sm font-semibold">Pricing</th>
                  <th className="text-left p-4 text-sm font-semibold">Strengths</th>
                  <th className="text-left p-4 text-sm font-semibold">Weaknesses</th>
                  <th className="text-left p-4 text-sm font-semibold">Target</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr key={c.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-sm">{c.name}</td>
                    <td className="p-4 text-sm text-gray-600">{c.pricing}</td>
                    <td className="p-4 text-sm text-green-600">{c.strengths}</td>
                    <td className="p-4 text-sm text-red-500">{c.weaknesses}</td>
                    <td className="p-4 text-sm text-gray-600">{c.target}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-50 border-t-2 border-[#1B5E20]">
                  <td className="p-4 font-bold text-sm text-[#1B5E20]">HerdBase ✦</td>
                  <td className="p-4 text-sm font-medium">Free – £10/mo</td>
                  <td className="p-4 text-sm text-green-600">BCMS integration, offline, modern UI</td>
                  <td className="p-4 text-sm text-gray-400">New entrant, building brand</td>
                  <td className="p-4 text-sm font-medium">UK cattle farmers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why HerdBase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why HerdBase Wins</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🇬🇧", title: "Built for UK Farmers", desc: "BCMS integration, TB testing workflow, cattle passport management. Not an Australian or US tool adapted for the UK." },
              { emoji: "📱", title: "Works in the Field", desc: "Offline-first mobile app. Record births, treatments, and movements from the cattle crush — no signal needed." },
              { emoji: "🆓", title: "Free for Small Herds", desc: "Up to 50 animals completely free, forever. No credit card, no trial expiry. Perfect for smallholders and new farmers." },
              { emoji: "🧬", title: "Breeding Intelligence", desc: "Track bull performance, calving intervals, EBVs, and genetic progress. Make data-driven breeding decisions." },
              { emoji: "💊", title: "Medicine Compliance", desc: "Automatic withdrawal period tracking, medicine stock management, and Red Tractor audit-ready reports." },
              { emoji: "📊", title: "Financial Clarity", desc: "Cost per head, margin per animal, feed conversion ratios. Know exactly what each animal costs and earns." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-emerald-300 transition-colors">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Projections */}
      <section className="py-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Revenue Projections</h2>
          <p className="text-center text-emerald-100 mb-12 max-w-2xl mx-auto">
            Based on freemium model with average £10/month for paying customers. High volume, low price — farmer-friendly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projections.map((p) => (
              <div key={p.customers} className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6 text-center">
                <div className="text-sm text-emerald-300 font-medium mb-1">{p.customers} Paying Farms</div>
                <div className="text-3xl font-bold text-white mb-2">{p.arr}</div>
                <div className="text-sm text-emerald-200">ARR ({p.mrr} MRR)</div>
              </div>
            ))}
          </div>
          <p className="text-center text-emerald-200 text-sm mt-8">
            Note: With a free tier driving adoption, expect 3–5x more farms on free plans driving word-of-mouth growth.
          </p>
        </div>
      </section>

      {/* Go-to-Market */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Go-to-Market Strategy</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { emoji: "🆓", title: "Freemium Adoption", desc: "Free for up to 50 animals drives viral adoption. Farmers try it risk-free, upgrade when their herd grows or they need premium features." },
              { emoji: "🤝", title: "Mart & Market Days", desc: "Demonstrate at livestock markets, agricultural shows, and farming events. Farmers trust what they see used by other farmers." },
              { emoji: "🔍", title: "Farming Press & SEO", desc: "Advertise in Farmers Weekly, FarmingUK. Target searches for 'cattle record keeping app', 'BCMS software', 'TB testing app'." },
              { emoji: "👨‍⚕️", title: "Vet Practice Partnerships", desc: "Partner with farm vet practices to recommend HerdBase. Vets benefit from better client records and treatment tracking." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
                <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-[#1B5E20]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop losing cattle records in notebooks
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of UK cattle farmers who&apos;ve gone digital with HerdBase.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B5E20] text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start Free Calving Book →
          </Link>
          <p className="text-sm text-emerald-200 mt-4">No credit card required • Free forever for up to 50 animals • Works offline</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-2">
                <Link href="/features" className="block text-gray-400 hover:text-white">Features</Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white">Pricing</Link>
                <Link href="/bcms-compliance" className="block text-gray-400 hover:text-white">BCMS Compliance</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white">About</Link>
                <Link href="/opportunity" className="block text-gray-400 hover:text-white">Opportunity</Link>
                <Link href="/market" className="block text-gray-400 hover:text-white">Market Research</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                <Link href="/case-studies" className="block text-gray-400 hover:text-white">Case Studies</Link>
                <Link href="/resources" className="block text-gray-400 hover:text-white">Guides</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-400 hover:text-white">Privacy</Link>
                <Link href="/terms" className="block text-gray-400 hover:text-white">Terms</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} HerdBase by Data & Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
