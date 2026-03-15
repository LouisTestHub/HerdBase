import Link from 'next/link';

export default function BCMSCompliancePage() {
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
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1B5E20] transition">Case Studies</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1B5E20] transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-[#2E7D32] transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              BCMS Approved Integration
            </div>
            <h1 className="text-6xl font-bold text-white mb-6">BCMS Compliance Made Simple</h1>
            <p className="text-2xl text-green-100">
              Stay compliant with UK cattle regulations. Automated reporting, deadline tracking, and audit-ready records.
            </p>
          </div>
        </div>
      </section>

      {/* What is BCMS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What is BCMS?</h2>
          <p className="text-xl text-gray-700 mb-6">
            The <strong>British Cattle Movement Service (BCMS)</strong> is the government database that tracks 
            every cattle animal in Great Britain. As a cattle keeper, you're legally required to:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <strong className="text-gray-900">Report births within 27 days</strong>
                <p className="text-gray-600">Register every calf born on your holding</p>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <strong className="text-gray-900">Report movements within 3 days</strong>
                <p className="text-gray-600">Both on-moves (animals arriving) and off-moves (animals leaving)</p>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <strong className="text-gray-900">Report deaths within 7 days</strong>
                <p className="text-gray-600">Including on-farm deaths and animals sent for slaughter</p>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <strong className="text-gray-900">Maintain a holding register</strong>
                <p className="text-gray-600">Keep accurate records of all cattle on your CPH number</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-red-900">Penalties for non-compliance</p>
                <p className="text-red-700 text-sm mt-1">Late or missing reports can result in fines up to £5,000 per animal and loss of BPS payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How HerdBase Helps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How HerdBase Keeps You Compliant</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We automate the tedious parts so you can focus on farming, not form-filling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-[#1B5E20] transition">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automatic Reporting</h3>
              <p className="text-gray-600">
                Log a birth, death, or movement in HerdBase and we submit it to BCMS automatically. 
                No manual website logins, no form duplication.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-[#1B5E20] transition">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deadline Reminders</h3>
              <p className="text-gray-600">
                Get push notifications and email alerts before deadlines. Never miss a 3-day movement 
                or 27-day birth registration window again.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-[#1B5E20] transition">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Holding Register</h3>
              <p className="text-gray-600">
                Your complete CPH register maintained electronically. Every animal, every movement, 
                fully compliant with BCMS requirements.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-[#1B5E20] transition">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passport Management</h3>
              <p className="text-gray-600">
                Scan and store cattle passports digitally. Link to each animal record. 
                Instant access from anywhere, even at the mart or abattoir.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-[#1B5E20] transition">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Audit Reports</h3>
              <p className="text-gray-600">
                One-click PDF export of your entire holding register, movement history, and treatment records. 
                Red Tractor inspectors love it.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 hover:border-[#1B5E20] transition">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Validation Checks</h3>
              <p className="text-gray-600">
                HerdBase validates every entry before submission. Missing ear tag? Invalid CPH? 
                We catch it before BCMS rejects it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">How the Integration Works</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure OAuth Connection</h3>
                  <p className="text-gray-700">
                    When you sign up, we guide you through linking your BCMS account using official OAuth authentication. 
                    Your credentials stay with you — HerdBase never sees your password.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Sync</h3>
                  <p className="text-gray-700">
                    Every birth, movement, or death logged in HerdBase is transmitted to BCMS in real-time. 
                    You see confirmation within seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bi-Directional Updates</h3>
                  <p className="text-gray-700">
                    If BCMS updates an animal record (e.g., slaughter confirmation from an abattoir), 
                    HerdBase automatically pulls it in. Your records stay in perfect sync.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Error Handling</h3>
                  <p className="text-gray-700">
                    If BCMS is down or rejects a submission, HerdBase queues it and retries automatically. 
                    You get a notification only if action is needed on your part.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Beyond BCMS: Other Compliance Support</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Red Tractor Assurance</h3>
              <p className="text-gray-600">
                All treatment records, medicine withdrawal tracking, and audit trails meet Red Tractor beef and dairy standards.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">DEFRA Inspections</h3>
              <p className="text-gray-600">
                Export holding registers and movement logs in the exact format DEFRA inspectors request.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">BPS / Rural Payments</h3>
              <p className="text-gray-600">
                Track eligible livestock for Basic Payment Scheme claims with automated headage counts.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medicine Records</h3>
              <p className="text-gray-600">
                VMD-compliant treatment logs with batch numbers, dosages, and withdrawal period alerts.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">FSA Food Chain Information</h3>
              <p className="text-gray-600">
                Generate FCI declarations for abattoirs showing treatment history and withdrawal compliance.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1B5E20] transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">TB Testing Records</h3>
              <p className="text-gray-600">
                Log TB test results, restrictions, and reactor movements with full audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B5E20] py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Stop worrying about compliance</h2>
          <p className="text-xl text-green-100 mb-8">Let HerdBase handle the regulations while you run your farm</p>
          <Link href="/login" className="inline-block bg-white text-[#1B5E20] px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Start Free Trial
          </Link>
          <p className="text-green-200 mt-4 text-sm">BCMS integration included in all plans</p>
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
