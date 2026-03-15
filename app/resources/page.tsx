import Link from 'next/link';

export default function ResourcesPage() {
  const articles = [
    {
      category: 'Cattle Management',
      title: '10 Signs Your Cow Needs a Vet (And When It Can Wait)',
      excerpt: 'Learn to spot the difference between a minor issue and a genuine emergency. Could save you hundreds in call-out fees.',
      readTime: '8 min read',
      date: 'March 2025'
    },
    {
      category: 'BCMS Compliance',
      title: 'BCMS Deadlines Explained: The 3-27-7 Rule',
      excerpt: '3 days for movements, 27 days for births, 7 days for deaths. Everything you need to stay compliant and avoid fines.',
      readTime: '6 min read',
      date: 'March 2025'
    },
    {
      category: 'Breeding',
      title: 'Improving Conception Rates: What the Data Actually Shows',
      excerpt: 'Analysis of 50,000+ services from HerdBase farms. What works, what doesn\'t, and why timing is everything.',
      readTime: '12 min read',
      date: 'February 2025'
    },
    {
      category: 'Financial Planning',
      title: 'Know Your Numbers: Calculating True Cost Per Kilo',
      excerpt: 'Feed, vet bills, bedding, labour — how to work out what each kilo of liveweight gain actually costs you.',
      readTime: '10 min read',
      date: 'February 2025'
    },
    {
      category: 'Pasture Management',
      title: 'Rotational Grazing for Beginners: A Practical Guide',
      excerpt: 'Boost grass utilisation by 30%+ without buying more land. Step-by-step guide to setting up a rotation system.',
      readTime: '15 min read',
      date: 'January 2025'
    },
    {
      category: 'Health Monitoring',
      title: 'Antibiotic Withdrawal Periods: Never Get Caught Out Again',
      excerpt: 'Complete UK withdrawal period table + how to set up automatic alerts so you never send an animal too early.',
      readTime: '7 min read',
      date: 'January 2025'
    }
  ];

  const guides = [
    {
      title: 'Getting Started with HerdBase',
      description: 'Import your herd, set up your CPH, and log your first animal in under 10 minutes.',
      icon: '🚀'
    },
    {
      title: 'Calving Season Prep Checklist',
      description: 'Everything you need ready before your first heifer calves. Downloadable PDF.',
      icon: '📋'
    },
    {
      title: 'Red Tractor Audit Survival Guide',
      description: 'What inspectors look for and how to have everything ready in advance.',
      icon: '✅'
    },
    {
      title: 'Choosing the Right Bull: Data-Driven Selection',
      description: 'EBVs, calving ease, and market trends — how to pick genetics that make money.',
      icon: '🐂'
    }
  ];

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
      <section className="relative bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Resources & Guides</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Practical cattle farming knowledge, compliance guides, and data-driven insights for UK farmers
          </p>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Guides</h2>
            <p className="text-lg text-gray-600">Step-by-step resources to help you get the most from your cattle operation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, idx) => (
              <Link 
                key={idx} 
                href="#"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-2 border-transparent hover:border-[#1B5E20]"
              >
                <div className="text-5xl mb-4">{guide.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 text-sm">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">Real-world insights from UK cattle farms using HerdBase</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <article key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition group">
                <div className="h-48 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-[#1B5E20] px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1B5E20] transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <Link 
                    href="#"
                    className="inline-block mt-4 text-[#1B5E20] font-semibold hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="#"
              className="inline-block border-2 border-[#1B5E20] text-[#1B5E20] px-8 py-3 rounded-lg font-semibold hover:bg-[#1B5E20] hover:text-white transition"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Topic</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Cattle Management', count: 24 },
              { name: 'BCMS Compliance', count: 12 },
              { name: 'Breeding & Fertility', count: 18 },
              { name: 'Health Monitoring', count: 15 },
              { name: 'Feed Management', count: 14 },
              { name: 'Financial Planning', count: 11 },
              { name: 'Pasture & Grazing', count: 9 },
              { name: 'Software Tips', count: 16 }
            ].map((category, idx) => (
              <Link 
                key={idx}
                href="#"
                className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-[#1B5E20] transition flex items-center justify-between group"
              >
                <span className="font-semibold text-gray-900 group-hover:text-[#1B5E20]">{category.name}</span>
                <span className="text-sm text-gray-500">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Get farming tips in your inbox</h2>
            <p className="text-lg text-green-100 mb-8">
              Monthly newsletter with cattle management insights, compliance updates, and HerdBase feature releases.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email"
                placeholder="your@email.co.uk"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit"
                className="bg-white text-[#1B5E20] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-green-200 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Help Centre CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Visit our Help Centre for step-by-step guides, video tutorials, and troubleshooting tips.
              </p>
              <Link 
                href="#"
                className="inline-block bg-[#1B5E20] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition"
              >
                Visit Help Centre
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Have a Question?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help. Get in touch and we'll respond within 24 hours.
              </p>
              <Link 
                href="/contact"
                className="inline-block border-2 border-[#1B5E20] text-[#1B5E20] px-6 py-3 rounded-lg font-semibold hover:bg-[#1B5E20] hover:text-white transition"
              >
                Contact Support
              </Link>
            </div>
          </div>
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
