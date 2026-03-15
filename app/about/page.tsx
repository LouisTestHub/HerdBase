import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/about" className="text-[#1B5E20] font-semibold">About</Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1B5E20] transition">Case Studies</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1B5E20] transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80" 
            alt="British cattle farm landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-4">Built by people who understand farming</h1>
            <p className="text-2xl text-gray-200">Software designed for farmers, by people who know what it takes to run a cattle operation.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              To give UK cattle farmers the best tools to run profitable, compliant, and sustainable businesses — 
              without needing a computer science degree. Farm software should work <em>for</em> you, 
              not against you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Farmer-First Design</h3>
              <p className="text-gray-600">Simple enough to use in the field, powerful enough for serious business decisions.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">UK Compliance Built-In</h3>
              <p className="text-gray-600">BCMS, DEFRA, Red Tractor — we keep you compliant from day one.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Decisions</h3>
              <p className="text-gray-600">Know your margins, track performance, make every decision with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="prose prose-lg text-gray-700 space-y-6">
            <p>
              HerdBase was born out of frustration. We saw too many farmers drowning in paperwork, 
              juggling spreadsheets, and spending evenings trying to piece together records for 
              inspections or vet visits.
            </p>
            <p>
              The available software was either too complicated (designed for tech companies, not farms) 
              or too basic (glorified spreadsheets with no real intelligence). Nothing was built 
              specifically for the realities of UK cattle farming.
            </p>
            <p>
              So we set out to build something different. Something that would work on a muddy phone 
              in the calving shed at 3am. Something that would submit your BCMS reports automatically. 
              Something that would tell you which cows are actually making you money.
            </p>
            <p>
              We partnered with working farmers from day one. Every feature was tested on real farms. 
              Every button placement, every workflow — informed by people who actually use this stuff daily.
            </p>
            <p>
              Today, HerdBase is trusted by over 200 cattle farms across the UK, tracking more than 
              50,000 animals. And we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#1B5E20] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Simplicity',
                desc: 'If it takes more than 3 taps to do something common, we\'ve failed.'
              },
              {
                title: 'Reliability',
                desc: '99.8% uptime. Your data is always there when you need it.'
              },
              {
                title: 'Honesty',
                desc: 'No dark patterns, no hidden fees, no BS. Just good software.'
              },
              {
                title: 'Partnership',
                desc: 'We succeed when you succeed. Your feedback shapes every update.'
              }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-green-100">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600">A mix of farmers, developers, and agricultural specialists.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Co-Founder & CEO',
                bio: 'Third-generation beef farmer turned software engineer. Ran a 300-head suckler herd in Devon before building HerdBase.'
              },
              {
                name: 'David Chen',
                role: 'Co-Founder & CTO',
                bio: '15 years building agricultural tech. Previously led platform development at a major farm management company.'
              },
              {
                name: 'Emma Harrison',
                role: 'Head of Product',
                bio: 'Grew up on a dairy farm in Cheshire. Studied Agricultural Business Management before joining HerdBase.'
              }
            ].map((person, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-24 h-24 bg-[#1B5E20] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">{person.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{person.name}</h3>
                <p className="text-[#1B5E20] font-semibold text-center mb-4">{person.role}</p>
                <p className="text-gray-600 text-center">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B5E20] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Join us</h2>
          <p className="text-xl text-green-100 mb-8">See why 200+ UK farms trust HerdBase with their herd data</p>
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
