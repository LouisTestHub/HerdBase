import Link from 'next/link';

function DataCard({ title, value, source }: { title: string; value: string; source?: string }) {
  return (
    <div className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {source && <div className="text-xs text-gray-400 mt-2">📎 {source}</div>}
    </div>
  );
}

export default function MarketResearchPage() {
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
            <Link href="/opportunity" className="text-gray-700 hover:text-[#1B5E20] transition">Opportunity</Link>
            <Link href="/market" className="text-[#1B5E20] font-medium">Market Research</Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1B5E20] transition">Case Studies</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm text-emerald-200 mb-6">
            🔬 Industry Research Report
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            UK Cattle Farming<br />
            <span className="text-emerald-300">Market Intelligence</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-3xl">
            Comprehensive research into the UK cattle farming sector — herd statistics, BCMS requirements, 
            TB testing, technology adoption, and Defra farming reforms. Updated March 2026.
          </p>
        </div>
      </section>

      {/* Herd Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🐄 UK Cattle Industry Statistics</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">The UK maintains one of Europe&apos;s largest cattle populations, with significant economic importance across beef and dairy sectors.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <DataCard title="Total UK Cattle (June 2024)" value="9.41M head" source="Defra Livestock Census" />
            <DataCard title="Cattle Holdings (2024)" value="58,342" source="BCMS/APHA Data" />
            <DataCard title="Total Breeding Herd (Dec 2024)" value="3.1M" source="Defra Statistics" />
            <DataCard title="YoY Population Change" value="-1.5%" source="June 2023–2024" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Herd Composition (December 2024)</h3>
              <div className="space-y-3">
                {[
                  { label: "Dairy breeding herd", value: "1.9M", change: "+1.1%", positive: true },
                  { label: "Beef breeding herd", value: "<1.3M", change: "-4.3%", positive: false },
                  { label: "Total breeding herd", value: "3.1M", change: "-1.2%", positive: false },
                  { label: "Total cattle & calves", value: "~9.2M", change: "-1.0%", positive: false },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
                      <span className={`text-xs ${item.positive ? "text-green-600" : "text-red-500"}`}>{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">England Specific (June 2025)</h3>
              <div className="space-y-3">
                {[
                  { label: "Total cattle & calves", value: "4.9M", change: "-1.4%", positive: false },
                  { label: "Breeding herd", value: "1.7M", change: "-1.4%", positive: false },
                  { label: "Dairy herd", value: "1.1M", change: "Stable", positive: true },
                  { label: "Beef herd", value: "569K", change: "-4.3%", positive: false },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
                      <span className={`text-xs ${item.positive ? "text-green-600" : "text-red-500"}`}>{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="font-bold text-yellow-800 mb-2">📉 Why is the Herd Declining?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <ul className="space-y-2">
                <li>• High input costs (feed, fuel, fertiliser)</li>
                <li>• Extreme weather events</li>
                <li>• TB restrictions and reactor losses</li>
              </ul>
              <ul className="space-y-2">
                <li>• Reduced subsidies (BPS phase-out)</li>
                <li>• Market volatility and low margins</li>
                <li>• Labour shortages in rural areas</li>
              </ul>
            </div>
            <p className="text-sm text-yellow-800 mt-3 font-medium">
              💡 The declining herd makes remaining farms larger and more complex — increasing the need for 
              professional management software. Fewer farms, bigger herds, more compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Cattle Holdings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🏡 Cattle Holdings by Region</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">Holdings data shows regional distribution and the trend of consolidation across UK cattle farming.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 text-center">
              <div className="text-4xl mb-2">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
              <div className="text-2xl font-bold text-[#1B5E20]">England</div>
              <div className="text-sm text-gray-600 mt-1">Largest share of holdings</div>
              <div className="text-xs text-red-500 mt-2">-2.3% decline in 2024</div>
            </div>
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 text-center">
              <div className="text-4xl mb-2">🏴󠁧󠁢󠁳󠁣󠁴󠁿</div>
              <div className="text-2xl font-bold text-blue-700">Scotland</div>
              <div className="text-sm text-gray-600 mt-1">Significant beef sector</div>
              <div className="text-xs text-red-500 mt-2">-2.7% decline (largest drop)</div>
            </div>
            <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-center">
              <div className="text-4xl mb-2">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
              <div className="text-2xl font-bold text-red-700">Wales</div>
              <div className="text-sm text-gray-600 mt-1">Strong suckler tradition</div>
              <div className="text-xs text-red-500 mt-2">-2.0% decline in 2024</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl border p-6">
            <h3 className="font-bold text-gray-900 mb-3">Total Holdings: 58,342 (2024) — down from 59,720 (2023)</h3>
            <p className="text-sm text-gray-600">
              The 2.3% decline in cattle holdings reflects the ongoing consolidation trend. Smaller 
              farms are exiting, while remaining farms grow larger and more complex. This consolidation 
              trend favours professional management software — bigger herds need better systems.
            </p>
          </div>
        </div>
      </section>

      {/* BCMS & Traceability */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🔗 BCMS & Livestock Traceability</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">The British Cattle Movement Service (BCMS) maintains a comprehensive cattle traceability system — one of the most advanced in the world.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-bold text-gray-900 mb-4">BCMS Requirements</h3>
              <ul className="space-y-3">
                {[
                  "Register births within 27 days",
                  "Report all movements within 3 days",
                  "Notify deaths within 7 days",
                  "Maintain on-farm herd register",
                  "Double ear-tag within 20 days of birth",
                  "Retain cattle passports for each animal",
                  "Report to CTS Online or by post",
                  "Annual inventory reconciliation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#1B5E20] mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-bold text-gray-900 mb-4">Traceability Technology</h3>
              <div className="space-y-4">
                {[
                  { title: "EID (Electronic ID) Tags", desc: "Ultra-high frequency RFID tags enabling automated reading. Becoming the standard for UK cattle identification." },
                  { title: "CTS Online", desc: "DEFRA's online system for reporting movements, births, and deaths. HerdBase integrates directly, eliminating manual data entry." },
                  { title: "ScotEID", desc: "Scotland's electronic identification database for livestock. Separate system requiring different integration." },
                  { title: "Blockchain Traceability", desc: "Emerging technology for supply chain transparency. Some processors and retailers exploring blockchain-based provenance tracking." },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium text-sm text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TB Testing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🧪 TB Testing & Movement Reporting</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">Bovine tuberculosis remains one of the biggest challenges — and compliance burdens — facing UK cattle farmers.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-4">The TB Challenge</h3>
              <ul className="space-y-3">
                {[
                  "Over 30,000 cattle slaughtered due to TB annually",
                  "Testing frequency: annually to every 4 years by risk area",
                  "High Risk Areas (HRA): predominantly South West, Midlands, Wales",
                  "Movement restrictions imposed during and after testing",
                  "Reactor animals must be slaughtered within 10 working days",
                  "Inconclusive reactors require re-testing at 60 days",
                  "Herd breakdowns can last 6+ months",
                  "Significant financial and emotional impact on farmers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                    <span className="text-red-500 mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-4">How HerdBase Helps</h3>
              <ul className="space-y-3">
                {[
                  "Automated TB test scheduling and reminders",
                  "Digital recording of test results by animal",
                  "Movement restriction tracking and alerts",
                  "Reactor animal flagging and slaughter management",
                  "Inconclusive reactor re-test scheduling",
                  "Vet visit preparation — pre-populated test lists",
                  "Historical test data for each animal",
                  "Export reports for APHA compliance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                    <span className="text-green-500 mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Adoption */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📱 Technology Adoption in Agriculture</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">Agricultural technology adoption is accelerating — driven by generational change, sustainability requirements, and economic pressure.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Precision Livestock Farming",
                desc: "Sensors, wearables, and automated monitoring for individual animal health, fertility, and behaviour. Growth in bolus sensors and collar-based systems.",
                trend: "Growing fast",
              },
              {
                title: "EID & Automated Reading",
                desc: "Electronic ear tags enabling automated data capture at crushes, races, and weighbridges. Eliminates manual identification and recording.",
                trend: "Becoming standard",
              },
              {
                title: "Mobile-First Farming",
                desc: "Younger farmers expect mobile apps. Smartphone penetration in farming communities now exceeds 80%. Apps must work offline in rural areas.",
                trend: "Essential",
              },
              {
                title: "AI & Data Analytics",
                desc: "Emerging applications in breeding selection, health prediction, and feed optimisation. Early stage but growing interest among progressive farmers.",
                trend: "Emerging",
              },
              {
                title: "Farm Payment Reforms",
                desc: "SFI and ELM schemes require evidence-based claims. Digital record-keeping is increasingly necessary to access government payments.",
                trend: "Regulatory push",
              },
              {
                title: "Connectivity Challenge",
                desc: "Rural broadband and 4G coverage remain patchy. The Shared Rural Network aims for 95% geographic 4G coverage by 2025, but gaps persist.",
                trend: "Improving",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{item.trend}</span>
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defra Reforms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🏛️ Defra Farming Reforms</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">The biggest change to UK farming policy in 50 years. The transition from EU-style area payments to environmental outcomes payments.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "BPS Phase-Out (2024–2027)",
                items: [
                  "Direct payments reducing by 50%+ for larger farms",
                  "Complete phase-out by 2028",
                  "Progressive reductions hitting income hard",
                  "Replaced by performance-based environmental schemes",
                ],
              },
              {
                title: "Sustainable Farming Incentive (SFI)",
                items: [
                  "Pays for sustainable farming actions",
                  "Evidence-based claims require digital records",
                  "Soil health, biodiversity, and water quality actions",
                  "Annual applications with monitoring requirements",
                ],
              },
              {
                title: "Environmental Land Management (ELM)",
                items: [
                  "Three tiers: SFI, Countryside Stewardship, Landscape Recovery",
                  "Significant funding for environmental outcomes",
                  "Complex application and evidence requirements",
                  "Favours farms with good record-keeping systems",
                ],
              },
              {
                title: "Animal Health & Welfare Pathway",
                items: [
                  "Annual vet visits funded (£522–£684 per visit)",
                  "Health planning and disease prevention",
                  "Digital health records essential for participation",
                  "Equipment grants for approved health improvements",
                ],
              },
            ].map((reform) => (
              <div key={reform.title} className="bg-gray-50 rounded-2xl border p-6">
                <h3 className="font-bold text-sm text-gray-900 mb-4">{reform.title}</h3>
                <ul className="space-y-2">
                  {reform.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#1B5E20] mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 Sources & References</h2>
          <div className="bg-white rounded-2xl border p-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              {[
                "Defra — UK Livestock Census June 2024",
                "Defra — Livestock Populations at 1 December 2024",
                "Defra — Livestock Populations in England at 1 June 2025",
                "BCMS/APHA — Cattle Population Data July 2024",
                "AHDB — UK Prime Cattle Slaughter Statistics 2024",
                "Defra — Resources and Waste Strategy",
                "APHA — Bovine TB in Great Britain Reports",
                "Defra — Future Farming and Countryside Programme",
                "Farming Weekly — Industry Reports and Analysis",
                "Meat Promotion Wales — Monthly Market Reports",
              ].map((source) => (
                <div key={source} className="flex items-start gap-2 py-1">
                  <span className="text-gray-400 mt-0.5">📎</span>
                  <span>{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-[#1B5E20]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Purpose-built for UK cattle farming
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            BCMS compliant. Offline-first. Free for small herds. Built by people who understand farming.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B5E20] text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Free Calving Book →
            </Link>
            <Link href="/opportunity" className="inline-flex items-center justify-center px-8 py-3 border border-white text-white text-lg rounded-lg hover:bg-white/10 transition-colors">
              View Business Plan
            </Link>
          </div>
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
