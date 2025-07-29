import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { collection, addDoc, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// --- ARCHITECTURAL FIX: Create a React Context for Authentication ---
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  const value = { user, loading };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}
// --- END ARCHITECTURAL FIX ---


// --- Helper Icons (Unchanged) ---
const IconTarget = () => (<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const IconZap = () => (<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const IconBarChart = () => (<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>);

// --- Main App Component ---
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/brand/:brandId" element={<ProtectedRoute><BrandManagerPage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
</BrowserRouter>
  );
}

// --- Protected Route Component ---
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// --- Page Components ---

// --- 1. The Homepage Component (Unchanged) ---
function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <div className="bg-gray-900 text-gray-200 font-sans antialiased">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold tracking-tight text-white">digitalaigency.ai</span>
            </Link>
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
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-6">
             <Link to="/login" className="text-sm font-semibold leading-6 text-gray-300 hover:text-indigo-400">
               Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/signup" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">
              Sign Up
            </Link>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold">digitalaigency.ai</span>
                </Link>
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
                      <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                      Log in
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-indigo-500 hover:bg-indigo-400">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <main>
        <div className="relative isolate overflow-hidden pt-14">
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
                <Link to="/signup" className="rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">
                  Get Started for Free
                </Link>
                <a href="#features" className="text-sm font-semibold leading-6 text-gray-300">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="how-it-works" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-400">The Future of Marketing</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Launch Winning Campaigns in 3 Simple Steps</p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">Our platform simplifies the entire creative process, from strategy to execution.</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        <div className="relative pl-16"><dt className="text-base font-semibold leading-7 text-white"><div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500"><span className="text-white font-bold">1</span></div>Add Your Brand</dt><dd className="mt-2 text-base leading-7 text-gray-300">Input your product details, target audience, and upload your brand assets. Our AI learns your unique voice.</dd></div>
                        <div className="relative pl-16"><dt className="text-base font-semibold leading-7 text-white"><div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500"><span className="text-white font-bold">2</span></div>Generate Campaigns</dt><dd className="mt-2 text-base leading-7 text-gray-300">Select your ad platform and let our AI generate dozens of ad angles, creatives, and landing pages based on proven marketing playbooks.</dd></div>
                        <div className="relative pl-16"><dt className="text-base font-semibold leading-7 text-white"><div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500"><span className="text-white font-bold">3</span></div>Launch & Optimize</dt><dd className="mt-2 text-base leading-7 text-gray-300">Deploy your campaigns with confidence. Our system will provide insights to help you scale what's working.</dd></div>
                    </dl>
                </div>
            </div>
        </div>
        <div id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto max-w-2xl sm:text-center"><h2 className="text-base font-semibold leading-7 text-indigo-400">Everything You Need</h2><p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">An Unfair Advantage for Marketers</p><p className="mt-6 text-lg leading-8 text-gray-300">We've productized the expertise of world-class media buyers into a single, powerful platform.</p></div></div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8"><dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"><div className="relative pl-9"><dt className="inline font-semibold text-white"><IconTarget /> AI Ad Angles</dt><dd className="inline"> Generate compliant and aggressive ad variations for any platform, ensuring you capture attention without getting banned.</dd></div><div className="relative pl-9"><dt className="inline font-semibold text-white"><IconZap /> Performance Creatives</dt><dd className="inline"> Turn basic product photos into stunning lifestyle images and generate high-converting video ad scripts in seconds.</dd></div><div className="relative pl-9"><dt className="inline font-semibold text-white"><IconBarChart /> Strategic Landing Pages</dt><dd className="inline"> Create persuasive, story-driven advertorials and direct-response landing pages that are proven to convert.</dd></div></dl></div>
        </div>
        <div id="pricing" className="py-24 sm:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto max-w-4xl text-center"><h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2><p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Plans for Teams of All Sizes</p></div><div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"><div className="rounded-3xl p-8 ring-1 ring-gray-200/10 xl:p-10"><h3 className="text-lg font-semibold leading-8 text-white">Starter</h3><p className="mt-4 text-sm leading-6 text-gray-300">For individuals and small projects getting started.</p><p className="mt-6 flex items-baseline gap-x-1"><span className="text-4xl font-bold tracking-tight text-white">$29</span><span className="text-sm font-semibold leading-6 text-gray-300">/month</span></p><Link to="/signup" className="mt-6 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 hover:ring-white/20">Buy plan</Link></div><div className="rounded-3xl p-8 ring-2 ring-indigo-500 xl:p-10"><h3 className="text-lg font-semibold leading-8 text-white">Pro</h3><p className="mt-4 text-sm leading-6 text-gray-300">For growing brands that need more power and scale.</p><p className="mt-6 flex items-baseline gap-x-1"><span className="text-4xl font-bold tracking-tight text-white">$79</span><span className="text-sm font-semibold leading-6 text-gray-300">/month</span></p><Link to="/signup" className="mt-6 block w-full rounded-md bg-indigo-500 py-2 px-3 text-center text-sm font-semibold leading-6 text-white hover:bg-indigo-400">Buy plan</Link></div><div className="rounded-3xl p-8 ring-1 ring-gray-200/10 xl:p-10"><h3 className="text-lg font-semibold leading-8 text-white">Agency</h3><p className="mt-4 text-sm leading-6 text-gray-300">For agencies managing multiple clients and brands.</p><p className="mt-6 flex items-baseline gap-x-1"><span className="text-4xl font-bold tracking-tight text-white">$199</span><span className="text-sm font-semibold leading-6 text-gray-300">/month</span></p><Link to="/signup" className="mt-6 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 hover:ring-white/20">Buy plan</Link></div></div></div></div>
        <div className="py-16 sm:py-24"><div className="mx-auto max-w-7xl sm:px-6 lg:px-8"><div className="relative isolate overflow-hidden bg-gray-800 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"><h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Revolutionize Your Marketing?</h2><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">Join hundreds of brands who are building faster, smarter, and more profitable campaigns with the power of AI.</p><div className="mt-10 flex items-center justify-center gap-x-6"><Link to="/signup" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">Start Your Free Trial</Link></div></div></div></div>
      </main>
      <footer className="bg-gray-900 border-t border-white/10"><div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8"><p className="text-center text-xs leading-5 text-gray-400">&copy; 2025 digitalaigency.ai, Inc. All rights reserved.</p></div></footer>
    </div>
  );
}

// --- 2. The Sign Up Page Component (Unchanged) ---
function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            sign in to your existing account
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- 3. The Login Page Component (Unchanged) ---
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Or{' '}
                    <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                        create a new account
                    </Link>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// --- 4. The Dashboard Page Component (Unchanged)---
function DashboardPage() { 
  const { user } = useAuth();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandUrl, setNewBrandUrl] = useState('');

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "brands"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const brandsData = [];
        querySnapshot.forEach((doc) => {
          brandsData.push({ ...doc.data(), id: doc.id });
        });
        setBrands(brandsData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!user || newBrandName.trim() === '' || newBrandUrl.trim() === '') return;
    try {
      await addDoc(collection(db, "brands"), {
        userId: user.uid,
        name: newBrandName,
        url: newBrandUrl,
        createdAt: new Date(),
      });
      setNewBrandName('');
      setNewBrandUrl('');
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold">digitalaigency.ai Dashboard</span>
            </div>
            <div>
              <span className="text-sm mr-4">{user?.email}</span>
              <button onClick={handleLogout} className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">Your Brands</h1>
                <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                >
                    {showAddForm ? 'Cancel' : '+ Add New Brand'}
                </button>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {showAddForm && (
                <div className="my-8 bg-gray-800 p-6 rounded-lg">
                    <form onSubmit={handleAddBrand} className="space-y-4">
                        <div>
                            <label htmlFor="brand-name" className="block text-sm font-medium text-gray-300">Brand Name</label>
                            <input type="text" id="brand-name" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"/>
                        </div>
                        <div>
                            <label htmlFor="brand-url" className="block text-sm font-medium text-gray-300">Website URL</label>
                            <input type="url" id="brand-url" value={newBrandUrl} onChange={(e) => setNewBrandUrl(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"/>
                        </div>
                        <button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                            Save Brand
                        </button>
                    </form>
                </div>
            )}

            <div className="px-4 py-8 sm:px-0">
                {brands.length === 0 && !showAddForm ? (
                    <div className="rounded-lg border-4 border-dashed border-gray-700 p-8 text-center">
                        <h2 className="text-xl font-semibold">No brands yet!</h2>
                        <p className="mt-2 text-gray-400">
                        Click "Add New Brand" to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {brands.map(brand => (
                            <div key={brand.id} className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{brand.name}</h3>
                                    <a href={brand.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 text-sm hover:underline truncate">{brand.url}</a>
                                </div>
                                <Link to={`/brand/${brand.id}`} className="mt-4 text-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500">
                                    Manage Brand
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- 5. The Brand Manager Page Component ---
function BrandManagerPage() {
    const { brandId } = useParams();
    const { user } = useAuth();
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // --- NEW: State for our AI tool ---
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [analysisError, setAnalysisError] = useState('');

    useEffect(() => {
        if (user && brandId) {
            const docRef = doc(db, "brands", brandId);
            const unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists() && docSnap.data().userId === user.uid) {
                    setBrand({ ...docSnap.data(), id: docSnap.id });
                } else {
                    console.error("Brand not found or access denied.");
                    navigate('/dashboard');
                }
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [user, brandId, navigate]);

    const handleLogout = () => {
        signOut(auth).then(() => navigate('/'));
    };

    // --- UPDATED: This now calls our backend function ---
    const handleAnalyze = async () => {
        if (!brand || !brand.url) return;

        setIsAnalyzing(true);
        setAnalysisResult('');
        setAnalysisError('');
        
        try {
            const functions = getFunctions();
            const scrapeUrl = httpsCallable(functions, 'scrapeUrl');
            const result = await scrapeUrl({ url: brand.url });

            if (result.data.success) {
                setAnalysisResult(result.data.text);
            } else {
                setAnalysisError("The analysis failed. Please check the URL.");
            }

        } catch (error) {
            console.error("Error calling scrapeUrl function:", error);
            setAnalysisError(`An error occurred: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (loading || !brand) {
        return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading Brand...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white">&larr; Back to Dashboard</Link>
                        </div>
                        <div>
                            <span className="text-sm mr-4">{user?.email}</span>
                            <button onClick={handleLogout} className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">
                            Manage: <span className="text-indigo-400">{brand.name}</span>
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mt-8 bg-gray-800/50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-white">One-Click Campaign Generator</h2>
                            <p className="mt-2 text-gray-400">
                                Start by analyzing your brand's website to give our AI context for your products and offers.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="rounded-md bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                >
                                    {isAnalyzing ? 'Analyzing...' : '✨ Analyze Brand Website'}
                                </button>
                            </div>
                            
                            {/* --- NEW: Display Area for Results --- */}
                            <div className="mt-6">
                                {analysisError && <div className="p-4 bg-red-900/50 text-red-300 border border-red-500 rounded-md">{analysisError}</div>}
                                {analysisResult && (
                                    <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-md">
                                        <h3 className="font-semibold text-lg">Analysis Result:</h3>
                                        <p className="mt-2 text-gray-300 text-sm whitespace-pre-wrap">{analysisResult}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
