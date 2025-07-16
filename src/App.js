import React, { useState } from 'react';

// --- Helper Components for Icons (Using inline SVG for simplicity) ---
const IconCheck = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const IconArrowRight = () => (
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
);

const IconTarget = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const IconZap = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const IconBarChart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
);


// --- Main App Component ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <div className="bg-gray-900 text-gray-200 font-sans antialiased">
      {/* --- Header & Navigation --- */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold tracking-tight text-white">digitalaigency.ai</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navLinks.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-300 hover:text-indigo-400">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              Sign Up <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold">digitalaigency.ai</span>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navLinks.map((item) => (
                      <a key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* --- Hero Section --- */}
        <div className="relative isolate overflow-hidden pt-14">
            <div 
                className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            </div>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Stop Guessing. Start Growing.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Welcome to the world's first Digital AIgency. We combine expert marketing strategies with powerful AI to generate high-performance ad campaigns, creatives, and landing pages in minutes, not weeks.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                  Get Started for Free
                </a>
                <a href="#features" className="text-sm font-semibold leading-6 text-gray-300">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- How It Works Section --- */}
        <div id="how-it-works" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-400">The Future of Marketing</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Launch Winning Campaigns in 3 Simple Steps</p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">Our platform simplifies the entire creative process, from strategy to execution.</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-white">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                Add Your Brand
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-300">Input your product details, target audience, and upload your brand assets. Our AI learns your unique voice.</dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-white">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                Generate Campaigns
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-300">Select your ad platform and let our AI generate dozens of ad angles, creatives, and landing pages based on proven marketing playbooks.</dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-white">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                Launch & Optimize
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-300">Deploy your campaigns with confidence. Our system will provide insights to help you scale what's working.</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>


        {/* --- Features Section --- */}
        <div id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">Everything You Need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">An Unfair Advantage for Marketers</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We've productized the expertise of world-class media buyers into a single, powerful platform.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              <div className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <IconTarget /> AI Ad Angles
                </dt>
                <dd className="inline"> Generate compliant and aggressive ad variations for any platform, ensuring you capture attention without getting banned.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <IconZap /> Performance Creatives
                </dt>
                <dd className="inline"> Turn basic product photos into stunning lifestyle images and generate high-converting video ad scripts in seconds.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <IconBarChart /> Strategic Landing Pages
                </dt>
                <dd className="inline"> Create persuasive, story-driven advertorials and direct-response landing pages that are proven to convert.</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* --- Pricing Section --- */}
        <div id="pricing" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Plans for Teams of All Sizes
              </p>
            </div>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Pricing Tiers */}
              <div className="rounded-3xl p-8 ring-1 ring-gray-200/10 xl:p-10">
                <h3 className="text-lg font-semibold leading-8 text-white">Starter</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">For individuals and small projects getting started.</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$29</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </p>
                <a href="#" className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 hover:ring-white/20">Buy plan</a>
              </div>
              <div className="rounded-3xl p-8 ring-2 ring-indigo-500 xl:p-10">
                <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">For growing brands that need more power and scale.</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$79</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </p>
                <a href="#" className="mt-6 block rounded-md bg-indigo-500 py-2 px-3 text-center text-sm font-semibold leading-6 text-white hover:bg-indigo-400">Buy plan</a>
              </div>
              <div className="rounded-3xl p-8 ring-1 ring-gray-200/10 xl:p-10">
                <h3 className="text-lg font-semibold leading-8 text-white">Agency</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">For agencies managing multiple clients and brands.</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$199</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </p>
                <a href="#" className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 hover:ring-white/20">Buy plan</a>
              </div>
            </div>
          </div>
        </div>

        {/* --- Final CTA Section --- */}
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-800 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Revolutionize Your Marketing?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Join hundreds of brands who are building faster, smarter, and more profitable campaigns with the power of AI.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Start Your Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 border-t border-white/10">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; 2025 digitalaigency.ai, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
