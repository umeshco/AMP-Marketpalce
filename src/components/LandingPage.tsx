import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Target, 
  BookOpen, 
  User, 
  Building, 
  Users, 
  Lock, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Coins, 
  MousePointer, 
  Mail, 
  ArrowUpRight, 
  HelpCircle, 
  Search, 
  Check,
  Send,
  X,
  Sparkles,
  TrendingUp,
  Sliders,
  Globe,
  DollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { BlogPost, User as UserType } from '../types';
import MarketplacePreview from './MarketplacePreview';

interface LandingPageProps {
  onLogin: (user: UserType) => void;
  blogs: BlogPost[];
}

export default function LandingPage({ onLogin, blogs }: LandingPageProps) {
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState<'advertiser' | 'publisher'>('advertiser');
  const [authOpen, setAuthOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTabInAuth, setActiveTabInAuth] = useState<'presets' | 'custom'>('custom');
  const [authError, setAuthError] = useState<string | null>(null);

  // Hidden admin routing states
  const [isAdminPathActive, setIsAdminPathActive] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);
  const [storedAdminPassword, setStoredAdminPassword] = useState('placement2026');

  useEffect(() => {
    // Fetch DB settings to read custom admin password
    const fetchAdminSettings = async () => {
      try {
        const resp = await fetch('/api/db');
        if (resp.ok) {
          const data = await resp.json();
          if (data?.settings?.adminPassword) {
            setStoredAdminPassword(data.settings.adminPassword);
          }
        }
      } catch (err) {
        console.error('Error fetching admin password from settings:', err);
      }
    };
    fetchAdminSettings();
  }, [authOpen]);

  useEffect(() => {
    const checkPath = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isParamMatch = searchParams.get('admin') === 'login' || searchParams.get('mode') === 'admin';
      const isHashMatch = window.location.hash === '#admin' || window.location.hash === '#admin-login';
      
      if (isParamMatch || isHashMatch) {
        setIsAdminPathActive(true);
        setAuthOpen(true); // Automatically show modal if on admin path
      } else {
        setIsAdminPathActive(false);
      }
    };

    checkPath();
    window.addEventListener('hashchange', checkPath);
    const interval = setInterval(checkPath, 1000);

    return () => {
      window.removeEventListener('hashchange', checkPath);
      clearInterval(interval);
    };
  }, []);
  
  // Contact Form states
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Modal details state for footer pages
  const [activeDetailsModal, setActiveDetailsModal] = useState<'privacy' | 'terms' | 'guidelines' | 'pricing' | null>(null);

  // Live Interactive Marketplace Directory preview state
  const [marketSearch, setMarketSearch] = useState('');
  const [marketNiche, setMarketNiche] = useState('All');

  // Interactive ROI Link-Building Forecast Estimator state
  const [backlinkVolume, setBacklinkVolume] = useState(12);
  const [qualityTier, setQualityTier] = useState<'standard' | 'premium' | 'authority'>('premium');

  // Structured mocks representing premium guest-posting publishers
  const sampleMarketplaceSites: any[] = [];

  const tierDetails = {
    standard: { label: 'Standard (DR 40-55)', avgPrice: 110, multiplier: 1.2 },
    premium: { label: 'Premium Scholar (DR 55-70)', avgPrice: 185, multiplier: 2.2 },
    authority: { label: 'Elite Authority (DR 70-90+)', avgPrice: 320, multiplier: 3.5 }
  };

  const activeTier = tierDetails[qualityTier];
  const monthlyInvestment = backlinkVolume * activeTier.avgPrice;
  const estAnnualTrafficGain = Math.round(backlinkVolume * 1550 * activeTier.multiplier * 12);
  const estPpcValueSaved = Math.round(estAnnualTrafficGain * 1.55);

  // Generate dynamic compounding search traffic growth over 8 months
  const compoundGrowthData = Array.from({ length: 8 }, (_, i) => {
    const monthNum = i + 1;
    const compoundMultiplier = Math.pow(1.18, i / 1.5);
    const trafficWithAMP = Math.round(1500 + (backlinkVolume * 165 * activeTier.multiplier * monthNum * compoundMultiplier));
    const trafficBaseline = Math.round(1500 + (i * 115));
    return {
      month: `Month ${monthNum}`,
      'Active link strategy (AMP)': trafficWithAMP,
      'Organic Baseline (No links)': trafficBaseline
    };
  });

  // Decorative spectrum style helper for niche tag visualizer
  const getNicheColorClass = (index: number) => {
    const colors = [
      'bg-indigo-50/70 hover:bg-indigo-100 border-indigo-200 text-indigo-700 shadow-sm shadow-indigo-100/50',
      'bg-purple-50/70 hover:bg-purple-100 border-purple-200 text-purple-705 shadow-sm shadow-purple-100/50',
      'bg-teal-50/70 hover:bg-teal-100 border-teal-200 text-teal-800 shadow-sm shadow-teal-100/50',
      'bg-amber-50/70 hover:bg-amber-100 border-amber-300/40 text-amber-805 shadow-sm shadow-amber-50/50',
      'bg-sky-50/70 hover:bg-sky-100 border-sky-200 text-sky-820 shadow-sm shadow-sky-100/50',
      'bg-rose-50/70 hover:bg-rose-100 border-rose-250/50 text-rose-705 shadow-sm shadow-rose-50/50',
      'bg-emerald-50/70 hover:bg-emerald-100 border-emerald-250/40 text-emerald-805 shadow-sm shadow-emerald-50/50',
      'bg-pink-50/80 hover:bg-pink-100 border-pink-205 text-pink-700 shadow-sm shadow-pink-100/50'
    ];
    return colors[index % colors.length];
  };

  // Presets disabled to enforce exclusive custom authorized access
  const presets: any[] = [];

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError(null);
    if (!adminEmail || !adminPassword) {
      setAdminAuthError("Please fill out both administrative email and password key.");
      return;
    }

    const isEmailValid = 
      adminEmail.toLowerCase() === 'authorityplacement@gmail.com' || 
      adminEmail.toLowerCase() === 'umesh.webbuzz@gmail.com' || 
      adminEmail.toLowerCase() === 'admin';
    const isPasswordValid = adminPassword === storedAdminPassword;

    if (isEmailValid && isPasswordValid) {
      onLogin({
        id: 'preset_3',
        name: 'Platform Moderator',
        email: adminEmail.toLowerCase().includes('@') ? adminEmail.toLowerCase() : 'authorityplacement@gmail.com',
        role: 'admin',
        wallet: 45000.00
      });
      setAuthOpen(false);
    } else {
      setAdminAuthError("Invalid administrative email address or security key password.");
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("Registration and login for Publisher and Advertiser roles are currently locked by the platform administrator.");
  };

  const handlePresetClick = (preset: typeof presets[0]) => {
    onLogin({
      id: preset.role === 'admin' ? 'preset_3' : preset.role === 'advertiser' ? 'preset_1' : 'preset_2',
      name: preset.name,
      email: preset.email,
      role: preset.role,
      wallet: preset.wallet
    });
    setAuthOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactOpen(false);
        setContactSubmitted(false);
        setContactEmail('');
        setContactMessage('');
      }, 2500);
    }
  };

  // Niches Cloud for Section 4
  const niches = [
    "Technology", "SaaS & Software", "Cybersecurity", "AI & Machine Learning",
    "Blockchain & Web3", "Cryptocurrency", "Gaming", "E-commerce",
    "Digital Marketing", "Finance & Investing", "Business & Entrepreneurship",
    "Real Estate", "Startups", "Fintech & Banking", "Insurance", "Health & Wellness",
    "Mental Health", "Fitness & Exercise", "Nutrition & Diet", "Beauty & Skincare",
    "Fashion & Style", "Parenting & Family", "Pets & Animals", "Photography",
    "Music & Audio", "Education & E-Learning", "Online Courses", "Career Development",
    "Law & Legal", "Travel & Tourism", "Food & Recipes", "Home & Garden",
    "Interior Design", "Automotive", "Sports & Athletics", "Sustainability",
    "Science & Research", "Film & TV", "Social Media", "Luxury & Premium"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased text-left selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Header Navigation */}
      <header className="bg-white/90 sticky top-0 z-45 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex justify-between items-center transition-all duration-200">
        <div className="flex items-center gap-2">
          {/* Brand Logo matching premium standard */}
          <div className="flex flex-col items-start leading-none">
            <span className="text-2xl font-black tracking-tight text-slate-900 uppercase">AUTHORITY</span>
            <span className="text-[10px] font-black tracking-[0.25em] text-[#4f46e5] uppercase">MEDIA PLACEMENT</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-600">
          <a href="#blogs-section" className="hover:text-[#4f46e5] transition-colors">Blog</a>
          <a href="#how-it-works" className="hover:text-[#4f46e5] transition-colors">How It Works</a>
          <button 
            type="button" 
            onClick={() => setActiveDetailsModal('pricing')} 
            className="hover:text-[#4f46e5] transition-colors"
          >
            Pricing Information
          </button>
          <button 
            type="button" 
            onClick={() => setContactOpen(true)} 
            className="hover:text-[#4f46e5] transition-colors"
          >
            Contact
          </button>
          <div className="h-4 w-[1px] bg-slate-200" />
          
          {/* Quick role-specific signup options */}
          <button 
            type="button"
            onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); setCustomRole('advertiser'); }}
            className="text-[12px] font-bold text-indigo-650 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 bg-indigo-50/50 hover:bg-indigo-50/90 px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm"
          >
            🚀 Advertiser Sign Up
          </button>
          <button 
            type="button"
            onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); setCustomRole('publisher'); }}
            className="text-[12px] font-bold text-purple-650 hover:text-purple-800 transition-colors inline-flex items-center gap-1 bg-purple-50/50 hover:bg-purple-50/90 px-3 py-1.5 rounded-lg border border-purple-100 shadow-sm"
          >
            💰 Publisher Sign Up
          </button>
        </nav>

        {/* Primary Action Buttons / Login */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
            className="text-xs font-black text-slate-700 hover:text-[#4f46e5] transition-colors hover:underline"
          >
            Sign In
          </button>
          <button
            type="button"
            id="header-cta-btn"
            onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
            className="px-4 py-2.5 text-xs font-black text-white bg-[#4f46e5] hover:bg-opacity-95 rounded-xl shadow-md flex items-center gap-1 cursor-pointer transition-all duration-200"
          >
            Explore Marketplace <span className="text-[12px] font-normal">→</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#111625] py-20 md:py-28 px-6 relative overflow-hidden border-b border-slate-900">
        {/* Soft high-vitality mesh color splashes */}
        <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl opacity-40 pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-35 pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-2xl opacity-20 pointer-events-none -z-10 animate-pulse delay-500" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Trusted Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-black text-indigo-350 text-indigo-300 bg-indigo-950/60 border border-indigo-505/20 border-indigo-500/20 rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.15)] animate-fade-in uppercase tracking-wider">
            <span className="text-amber-400">⭐</span> Trusted by 3,200+ brands & agencies worldwide
          </div>

          {/* Large Hero Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold text-white tracking-tight leading-none">
              The #1 Marketplace for
            </h1>
            <h2 className="text-4xl sm:text-6xl md:text-[68px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 tracking-tight leading-none pb-1 filter drop-shadow-sm">
              Premium Guest Posts
            </h2>
            <h3 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold text-slate-300 tracking-tight leading-none">
              & Sponsored Content
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
            Connect with thousands of high-authority publishers. Build powerful backlinks, grow organic traffic, and boost your search rankings — all in one place.
          </p>

          {/* Unified CTA Button */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <button
              type="button"
              id="hero-unified-cta"
              onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
              className="w-full sm:w-auto px-10 py-5 text-sm font-black text-white bg-[#4f46e5] hover:bg-[#3b35be] rounded-full shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>✨</span> Enter Secure Guest-Posting Marketplace →
            </button>
            <p className="text-[11px] text-slate-450 font-medium">
              * Role-specific registration (Advertiser & Publisher) is available in the Header & Footer
            </p>
          </div>

          {/* Quick Statistic Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-3xl mx-auto text-center divide-x border-t border-slate-800 pt-12">
            <div className="space-y-1 block p-2">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">12,400+</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Websites</span>
            </div>
            <div className="space-y-1 block p-2 border-slate-800">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">$2.8M+</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paid to Publishers</span>
            </div>
            <div className="space-y-1 block p-2 border-slate-800">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">98%</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Satisfaction Rate</span>
            </div>
            <div className="space-y-1 block p-2 border-slate-800">
              <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">47</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Countries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ticker Ribbon / Feature Row (Page 2) */}
      <section className="bg-white border-y border-slate-100 py-6 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-500 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-extrabold">🔒</span>
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-extrabold">✅</span>
            <span>Manually Vetted Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-extrabold">💳</span>
            <span>PayPal Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-extrabold">⚡</span>
            <span>3–7 Day Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4f46e5]">📊</span>
            <span>Real Ahrefs & Moz Data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4f46e5]">🌐</span>
            <span>Global Publisher Network</span>
          </div>
        </div>
      </section>

      {/* NEW: DYNAMIC B2B HANDS-ON DEMO LAB */}
      <section className="bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white py-20 px-6 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-650 to-purple-650 uppercase tracking-[0.25em] block">
              Platform Demo Lab
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Test Drive the Placement Network Live
            </h2>
            <p className="text-slate-500 text-sm">
              Use our live directory catalogs below to inspect manual publisher standards in real-time.
            </p>
          </div>

          {/* Live Interactive Marketplace Directory Category Browser */}
          <MarketplacePreview onRegisterTrigger={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }} />

        </div>
      </section>

      {/* 4. Why Choose Us Section (Grid) */}
      <section className="bg-gradient-to-b from-[#FAF5FF] via-white to-white py-20 sm:py-24 px-6 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-[0.25em] block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Everything you need to scale your SEO</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              From discovery to delivery, Authority Media Placement makes link building effortless and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Precision Targeting */}
            <div className="bg-white border-2 border-indigo-100/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-indigo-100">
                  🎯
                </div>
                <h3 className="text-lg font-bold text-slate-800">Precision Targeting</h3>
                <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Filter by DA, DR, niche, traffic, and price to find the perfect site for your campaign every time.
                </p>
              </div>
            </div>

            {/* Card 2 - Live SEO Metrics */}
            <div className="bg-white border-2 border-emerald-100/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-emerald-100">
                  📊
                </div>
                <h3 className="text-lg font-bold text-slate-800">Live SEO Metrics</h3>
                <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Real-time Ahrefs DR, Moz DA, and organic traffic data auto-fetched the moment a site is added.
                </p>
              </div>
            </div>

            {/* Card 3 - PayPal Payments */}
            <div className="bg-white border-2 border-blue-100/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-blue-150">
                  💳
                </div>
                <h3 className="text-lg font-bold text-slate-800">PayPal Payments</h3>
                <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Secure escrow payments via PayPal. Advertisers pay upfront; publishers get paid automatically.
                </p>
              </div>
            </div>

            {/* Card 4 - Quality Vetted Sites */}
            <div className="bg-white border-2 border-amber-100/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-amber-550/10 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl font-bold group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-amber-100">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-slate-800">Quality Vetted Sites</h3>
                <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Every publisher site is manually reviewed and approved by our editorial team before going live.
                </p>
              </div>
            </div>

            {/* Card 5 - Fast Turnaround */}
            <div className="bg-white border-2 border-purple-100/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-purple-50 text-purple-650 rounded-xl flex items-center justify-center text-xl font-bold group-hover:bg-purple-650 group-hover:text-white transition-all duration-300 shadow-sm shadow-purple-100">
                  ⚡
                </div>
                <h3 className="text-lg font-bold text-slate-800">Fast Turnaround</h3>
                <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Most orders completed in 3–7 days. Track every order from placement to live URL in real time.
                </p>
              </div>
            </div>

            {/* Card 6 - Transparent Pricing */}
            <div className="bg-white border-2 border-pink-100/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-pink-50 text-pink-650 rounded-xl flex items-center justify-center text-xl font-bold group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-pink-100">
                  💎
                </div>
                <h3 className="text-lg font-bold text-slate-800">Transparent Pricing</h3>
                <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-normal">
                  No hidden fees. Publishers earn 90% of every sale. We take a simple 10% platform commission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-[0.25em] block">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">From order to live link in 4 simple steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/40 text-center relative flex flex-col items-center">
              <span className="absolute top-4 left-4 text-[10px] font-black text-indigo-400 tracking-widest uppercase">Step 01</span>
              <span className="text-3xl my-6">📣</span>
              <h3 className="font-bold text-base text-slate-800 mb-2">Browse & Filter</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                Search 12,000+ websites by niche, DA, DR, traffic, and price.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/40 text-center relative flex flex-col items-center">
              <span className="absolute top-4 left-4 text-[10px] font-black text-indigo-400 tracking-widest uppercase">Step 02</span>
              <span className="text-3xl my-6">🛒</span>
              <h3 className="font-bold text-base text-slate-800 mb-2">Place Order</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                Select post type, provide your URL, pay securely via PayPal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/40 text-center relative flex flex-col items-center">
              <span className="absolute top-4 left-4 text-[10px] font-black text-indigo-400 tracking-widest uppercase">Step 03</span>
              <span className="text-3xl my-6">✍️</span>
              <h3 className="font-bold text-base text-slate-800 mb-2">Content Published</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                Publisher writes and publishes your guest post on their site.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#4f46e5]/5 rounded-2xl p-6 border border-[#4f46e5]/10 text-center relative flex flex-col items-center">
              <span className="absolute top-4 left-4 text-[10px] font-black text-[#4f46e5] tracking-widest uppercase">Step 04</span>
              <span className="text-3xl my-6">🚀</span>
              <h3 className="font-bold text-base text-slate-800 mb-2">Go Live & Get Paid</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                You get a live backlink. Publisher gets paid. Everyone wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Niches Available Section */}
      <section className="bg-slate-50 py-20 sm:py-24 px-6 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-[0.25em] block">50+ Niches Available</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">12,000+ sites across every industry</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">
              Whatever your industry, we have high-authority publishers ready to host your content.
            </p>
          </div>

          {/* Cloud list of niches exactly matching the PDF screenshots */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {niches.map((n, idx) => (
              <span 
                key={idx}
                onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
                className={`px-4 py-2 text-xs sm:text-[13px] font-semibold rounded-full cursor-pointer transition-all duration-200 transform hover:scale-[1.05] border ${getNicheColorClass(idx)} hover:shadow-md`}
              >
                {n}
              </span>
            ))}
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
              className="px-8 py-3.5 text-sm font-bold text-[#4f46e5] bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-all duration-200 shadow-md shadow-slate-100 cursor-pointer"
            >
              Browse All Sites →
            </button>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section (Page 5) */}
      <section className="bg-white py-20 sm:py-24 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-[0.25em] block">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Loved by marketers & publishers</h2>
            <p className="text-slate-500 text-sm">
              Don't take our word for it — hear from our community of 3,200+ active users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-8 space-y-6">
              <div className="flex text-amber-500 font-bold tracking-widest text-[#eab308]">★★★★★</div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "Authority Media Placement is the best link building marketplace I've used. High-quality sites, fast delivery, and transparent pricing."
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-black rounded-full flex items-center justify-center text-xs">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Arjun Mehta</h4>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">SEO Agency Owner</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-8 space-y-6">
              <div className="flex text-amber-500 font-bold tracking-widest text-[#eab308]">★★★★★</div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "I've earned over $8,000 in 6 months. The platform is incredibly easy to use and payments are always on time."
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-black rounded-full flex items-center justify-center text-xs">
                  SC
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Sarah Collins</h4>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Content Publisher</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-8 space-y-6">
              <div className="flex text-amber-500 font-bold tracking-widest text-[#eab308]">★★★★★</div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "We scaled our DR from 22 to 61 in under a year using AMP. The quality of sites here is genuinely impressive."
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-black rounded-full flex items-center justify-center text-xs">
                  DP
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">David Park</h4>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">E-commerce Brand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Trust Guarantees & Editorial Protection safeguards */}
      <section className="bg-slate-50 py-20 sm:py-24 px-6 border-b border-slate-200/50 text-left">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-650 uppercase tracking-[0.25em] block">Rigorous Safety Protocols</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Enterprise Vetting Standards & Secure Escrows</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Why top SEO agencies and high-growth brands trust Authority Media Placement for their high-value backlinks content inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Guarantee 1 */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#4f46e5]">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm">365-Day Index Warranty</h4>
              <p className="text-[12px] text-slate-450 leading-relaxed font-normal">
                Our custom automated crawling engine constantly re-checks placements. If an accepted link is removed or changed to nofollow within 365 days, publishers are flagged for restoration or you receive a full refund.
              </p>
            </div>

            {/* Guarantee 2 */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm">Strict Zero-PBN Policy</h4>
              <p className="text-[12px] text-slate-450 leading-relaxed font-normal">
                We manually vet organic analytics parameters of every submitting domain. We reject over 70% of submissions to ensure completely clean, real human-trafficked websites with zero footprint risks.
              </p>
            </div>

            {/* Guarantee 3 */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Coins size={20} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm">Safeguarded Escrows</h4>
              <p className="text-[12px] text-slate-450 leading-relaxed font-normal">
                Funds are securely secured inside a protected client escrow ledger. Publisher payouts are only processed and released from ledger reserves after the finalized, indexable live publication is crawl-verified.
              </p>
            </div>

            {/* Guarantee 4 */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Lock size={20} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm">Privacy & NDAs Standard</h4>
              <p className="text-[12px] text-slate-450 leading-relaxed font-normal">
                All buyer niches, placement orders, drafts, URLs, and publisher agreements are fully locked under enterprise-grade cryptographic privacy with absolute public confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Secure Dashboard Platform Segment */}
      <section id="quick-login" className="bg-white py-20 px-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-[0.25em] block">Secure Dashboard Platform</span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Ready to access the placement ecosystem?</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Create your authorized buyer or publisher profile to explore full internal operations and run live audits.
            </p>
          </div>

          <div className="bg-slate-50/60 border border-slate-200 rounded-3xl p-6 md:p-8 max-w-xl mx-auto space-y-4 text-center">
            <h3 className="font-extrabold text-slate-900 text-base">Want a fully customized brand or publisher work environment?</h3>
            <p className="text-xs text-slate-500 leading-normal font-normal">
              Create your own secure user profile with custom roles, credentials, and wallet parameters inside modern, isolated client memory stacks.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-md shadow-indigo-100 hover:shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                Create Custom Profile <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Platform Blog Outlines section */}
      {blogs.length > 0 && (
        <section id="blogs-section" className="bg-slate-50 py-20 px-6 border-b border-slate-200/50">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-[#4f46e5] uppercase tracking-widest block">Resources</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Placements & Guest Posting Blogs</h2>
              <p className="text-xs text-slate-500">Expert blueprints and strategies synced dynamically from current data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map(blog => (
                <article key={blog.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-lg transition-all">
                  <div className="h-48 bg-slate-100 overflow-hidden relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[9px] font-black tracking-wider px-2.5 py-1 rounded-full uppercase">
                      {blog.readTime}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>By {blog.author}</span>
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-800 leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Strategies</span>
                      <button
                        type="button"
                        onClick={() => alert(`Title: ${blog.title}\n\nSummary: ${blog.summary}\n\nRead the full article dynamically by logging into your advertiser or publisher portal.`)}
                        className="text-xs font-bold text-[#4f46e5] hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        Read Post <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. Custom Unified Platform CTA Footer Banner */}
      <section className="bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#111625] py-20 px-6 relative overflow-hidden border-t border-b border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto space-y-8 text-center relative z-10">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Ready to grow your online authority?</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed font-normal">
              Join thousands of brands and publishers already utilizing the Authority Media Placement ecosystem with zero friction. Connect your profile and access the directory instantly.
            </p>
          </div>
 
          <div className="pt-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => { setAuthOpen(true); setActiveTabInAuth('custom'); }}
              className="px-10 py-4.5 text-xs font-black text-white bg-[#4f46e5] hover:bg-[#3b35be] rounded-2xl transition-all text-center cursor-pointer block w-full shadow-xl uppercase tracking-widest hover:scale-[1.01] font-bold"
            >
              🚀 Access the Marketplace Platform →
            </button>
            <p className="text-[10.5px] text-slate-500 mt-3 font-semibold">
              * Dedicated Advertiser & Publisher registration options are available in the Header & Footer
            </p>
          </div>
        </div>
      </section>

      {/* 12. Corporate Elegant Footer (Page 7) */}
      <footer className="bg-[#050911] py-16 px-6 border-t border-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
          {/* Brand/Logo col */}
          <div className="col-span-1 md:col-span-4 space-y-4 text-left">
            <div className="flex flex-col items-start leading-none">
              <span className="text-xl font-black tracking-tight text-white uppercase">AUTHORITY</span>
              <span className="text-[9px] font-black tracking-[0.25em] text-indigo-400 uppercase">MEDIA PLACEMENT</span>
            </div>
            <p className="text-[12px] text-slate-450 font-normal leading-relaxed">
              The #1 marketplace for premium guest posts and sponsored content. Connecting advertisers with top publishers worldwide since 2024.
            </p>
          </div>
 
          {/* Platform col */}
          <div className="col-span-1 md:col-span-2 space-y-3 text-left">
            <h4 className="font-extrabold text-[11px] text-white uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#quick-login" className="hover:text-indigo-400 transition-colors">Marketplace Directory</a></li>
              <li><a href="#blogs-section" className="hover:text-indigo-400 transition-colors">Outreach Blogs</a></li>
              <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a></li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveDetailsModal('pricing')} 
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Pricing Details
                </button>
              </li>
            </ul>
          </div>
 
          {/* Company col */}
          <div className="col-span-1 md:col-span-2 space-y-3 text-left">
            <h4 className="font-extrabold text-[11px] text-white uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveDetailsModal('privacy')} 
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveDetailsModal('terms')} 
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setContactOpen(true)} 
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveDetailsModal('guidelines')} 
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Publisher Guidelines
                </button>
              </li>
            </ul>
          </div>
 
          {/* Support/Emails col */}
          <div className="col-span-1 md:col-span-4 space-y-3 text-left font-normal">
            <h4 className="font-extrabold text-[11px] text-white uppercase tracking-widest">Support Enquiries</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li><a href="mailto:authorityplacement@gmail.com" className="hover:text-indigo-400 transition-colors block">authorityplacement@gmail.com</a></li>
            </ul>
          </div>
        </div>
 
        {/* Bottom row copyrights */}
        <div className="max-w-6xl mx-auto border-t border-slate-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-normal">
          <div>
            © 2026 authorityplacement.com · Premium Media Escrow Safe · All rights reserved
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button type="button" onClick={() => setActiveDetailsModal('privacy')} className="hover:text-indigo-400 transition-colors">Privacy Policy</button>
            <button type="button" onClick={() => setActiveDetailsModal('terms')} className="hover:text-indigo-400 transition-colors">Terms of Service</button>
            <button type="button" onClick={() => setContactOpen(true)} className="hover:text-indigo-400 transition-colors">Contact</button>
            <button type="button" onClick={() => setActiveDetailsModal('guidelines')} className="hover:text-indigo-400 transition-colors">Guidelines</button>
          </div>
        </div>
      </footer>

      {/* Slide Drawer/Modal Auth Panel overlay so user can log in visually and elegantly */}
      {authOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setAuthOpen(false)} 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 animate-slide-in">
            <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
              
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    {isAdminPathActive ? "🛡️ Admin Access Console" : "Secure Access Console"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAdminPathActive ? "Enter administrator credentials and security key" : "Lock in to your brand or publisher profile"}
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setAuthOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                {isAdminPathActive ? (
                  <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-xl text-xs space-y-1.5 text-left shadow-lg">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span className="text-sm">🔑</span>
                        <span>Administrative Entry Gateway</span>
                      </div>
                      <p className="leading-relaxed font-normal text-slate-400">
                        This workspace segment is restricted exclusively to platform operators. Please authenticate below.
                      </p>
                    </div>

                    {adminAuthError && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs text-left font-semibold">
                        ⚠️ {adminAuthError}
                      </div>
                    )}

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Administrative Email</label>
                      <input
                        type="email"
                        required
                        placeholder="authorityplacement@gmail.com"
                        value={adminEmail}
                        onChange={(e) => {
                          setAdminEmail(e.target.value);
                          if (adminAuthError) setAdminAuthError(null);
                        }}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5]"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Security Password Key</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => {
                          setAdminPassword(e.target.value);
                          if (adminAuthError) setAdminAuthError(null);
                        }}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 bg-[#4f46e5] hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-indigo-150 flex items-center justify-center gap-1.5"
                    >
                      Verify Key & Authenticate <ChevronRight size={14} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="space-y-4">
                    {/* Locked System Notice Banner */}
                    <div className="bg-amber-50 border border-amber-200/70 text-amber-800 p-4 rounded-xl text-xs space-y-1.5 text-left">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <span className="text-sm">🔒</span>
                        <span>Access Locked for Publishers & Advertisers</span>
                      </div>
                      <p className="leading-relaxed font-normal text-slate-600">
                        To protect the placement ecosystem, standard public registration and login are currently locked. Public onboarding is closed.
                      </p>
                    </div>

                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs text-left font-semibold">
                        ⚠️ {authError}
                      </div>
                    )}

                    <div className="space-y-1 text-left opacity-60 pointer-events-none select-none">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        disabled
                        placeholder="John Doe"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5] bg-slate-100"
                      />
                    </div>

                    <div className="space-y-1 text-left opacity-60 pointer-events-none select-none">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        disabled
                        placeholder="e.g. outreach@agency.com"
                        value={customEmail}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5] bg-slate-100"
                      />
                    </div>

                    <div className="space-y-1.5 text-left opacity-50 select-none">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1">
                        <span>Platform Role Selection</span>
                        <span className="text-[8px] tracking-widest font-black text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.2 rounded">LOCKED</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3 pointer-events-none">
                        <button
                          type="button"
                          disabled
                          className="py-2.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-400 bg-slate-50 flex items-center justify-center gap-1.5"
                        >
                          <span>Advertiser</span> <span className="text-xs">🔒</span>
                        </button>
                        <button
                          type="button"
                          disabled
                          className="py-2.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-400 bg-slate-50 flex items-center justify-center gap-1.5"
                        >
                          <span>Publisher</span> <span className="text-xs">🔒</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled
                      className="w-full mt-4 py-3 bg-slate-200 text-slate-400 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      Onboarding Currently Closed <Lock size={12} />
                    </button>
                  </form>
                )}

              </div>

              {/* Footer inside drawer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Secure Verifier Protocol</span>
                <span>AMP v2.0</span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Beautiful Contact US Modal Dialog popup */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop overlay */}
            <div 
              onClick={() => setContactOpen(false)} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              aria-hidden="true"
            />

            {/* Center content */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-slate-200 animate-scale-in relative z-10">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✉️</span>
                    <h3 className="text-lg font-extrabold text-slate-800" id="modal-title">Get in touch with AMP</h3>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setContactOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-3 p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-left">
                  <p className="text-xs text-indigo-950 font-bold leading-relaxed">
                    Please contact us for any query!
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal font-medium">
                    Whether you are an advertiser seeking custom backlink catalogs, need help selecting quality niches, require billing assistance, or want custom media solutions—please get in touch and our team will follow up quickly.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-indigo-100/60 flex items-center justify-between text-[11px]">
                    <span className="text-indigo-900 font-bold text-[9px] uppercase tracking-wider">Direct Support</span>
                    <a
                      href="mailto:authorityplacement@gmail.com"
                      className="text-indigo-700 hover:text-indigo-800 font-extrabold transition-all flex items-center gap-0.5"
                    >
                      <span>authorityplacement@gmail.com</span>
                      <span className="text-[9px]">↗</span>
                    </a>
                  </div>
                </div>

                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800">Inquiry Received Successfully!</h4>
                      <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                        Thank you for reaching out. An alignment coordinator will contact you at your email in under 2 working hours.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 pt-4">
                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. outreach@agency.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5]"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Brief Message / Requirement</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="e.g. We are looking for 40+ permanent dofollow SaaS guest posts with DR 60+."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#4f46e5] hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                      >
                        Send Message <Send size={12} />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="bg-slate-50 px-6 py-4 flex justify-between text-[11px] font-medium text-slate-400 border-t border-slate-100">
                <span>Fast response times SLA</span>
                <span>authorityplacement@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Details Modal for Footer Pages (Privacy, Terms, Guidelines, Pricing) */}
      {activeDetailsModal && (
        <div id="footer-details-modal" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-150 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-indigo-100/50 bg-gradient-to-r from-slate-50 via-slate-100/30 to-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                  <BookOpen size={18} className="stroke-[2.5]" />
                </div>
                <div className="text-left bg-transparent">
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {activeDetailsModal === 'privacy' && 'Privacy Policy & Data Shield'}
                    {activeDetailsModal === 'terms' && 'Marketplace Terms of Service'}
                    {activeDetailsModal === 'guidelines' && 'Publisher Quality Guidelines'}
                    {activeDetailsModal === 'pricing' && 'Transparent Pricing Guarantee'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-semibold">
                    Official Authority Media Placement legal documentation.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailsModal(null)}
                className="p-1 px-3 text-xs font-black text-slate-500 hover:text-slate-850 border border-slate-200 hover:bg-slate-100 rounded-lg cursor-pointer transition-all shrink-0 font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm text-left leading-relaxed">
              {activeDetailsModal === 'privacy' && (
                <div className="space-y-4">
                  <p className="font-bold text-slate-900">Last updated: June 15, 2026</p>
                  <p>
                    At Authority Media Placement, we prioritize the secure handling and isolation of all client campaigns, target anchor texts, publisher back-link directories, and account profile details.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">1. Data Storage & Local Protection</h4>
                    <p>
                      All registration details, custom project metadata, dynamic user wallet transactions, and order pitches are stored strictly inside securely separated data environments under high-integrity TLS encryption.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">2. Confidential Publisher Outlets</h4>
                    <p>
                      To shield our network against automated target harvesting and competitor sniffing, publishing outlet URLs are hidden under dynamic safety parameters and only disclosed to buyers during order fulfillment or confirmed transactions.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">3. Non-Disclosure & Secure Escrows</h4>
                    <p>
                      All transaction records are treated with absolute confidentiality. Authority Media Placement will never publish search statistics, client lists, or transaction history details to public trackers.
                    </p>
                  </div>
                </div>
              )}

              {activeDetailsModal === 'terms' && (
                <div className="space-y-4">
                  <p className="font-bold text-slate-900">Last updated: June 15, 2026</p>
                  <p>
                    These terms govern all transactions, order placement flows, content submissions, and payouts within the Authority Media Placement marketplace.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">1. 365-Day Backlink Index Warranty</h4>
                    <p>
                      Publishers are strictly required to maintain guest posts as permanent. If a backlink is deleted, modified to "nofollow", or blocked from search indexing within 365 days of creation, the seller is penalized and the buyer receives a full automatic refund.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">2. Fulfillment & Publication Window</h4>
                    <p>
                      Publishers have an agreed timeline of 3 to 7 business days to write, review, and successfully publish approved guest blogging pitches. Failure to submit live proof URLs within this window triggers order expiration and instant escrow reimbursement.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">3. Safe Escrow Payments</h4>
                    <p>
                      All client payments are held in our platform escrow vault. Funds are only paid out to the publisher after our automated crawling engine verifies the live, indexable, and correct backlink on the target domain.
                    </p>
                  </div>
                </div>
              )}

              {activeDetailsModal === 'guidelines' && (
                <div className="space-y-4">
                  <p className="font-bold text-slate-900">Last updated: June 15, 2026</p>
                  <p>
                    We maintain strict manual vetting protocols to ensure our marketplace holds only first-rate, natural websites.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">1. Strict Domain Thresholds</h4>
                    <p>
                      Listed domains must document real, active organic search traffic statistics, a Moz Domain Authority (DA) of at least 20, and an Ahrefs Domain Rating (DR) of at least 30.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">2. Anti-PBN footprint protection</h4>
                    <p>
                      Private Blog Networks (PBNs), spam catalogs, link farms, or websites built solely for SEO purposes are strictly blacklisted. We inspect backlink out-flow ratios daily to guarantee pristine backlink equity.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">3. Content Quality Standards</h4>
                    <p>
                      Guest blogging content must be well-researched, reader-friendly, and maintain complete grammatical accuracy. Posts containing spun content or low-intelligence AI slop will be deleted immediately with a loss of seller listing privileges.
                    </p>
                  </div>
                </div>
              )}

              {activeDetailsModal === 'pricing' && (
                <div className="space-y-4">
                  <p className="font-bold text-slate-900">Last updated: June 15, 2026</p>
                  <p>
                    Authority Media Placement is built on a model of fully transparent, transaction-based pricing with no secret membership subscriptions.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">1. Free Registration & Browsing</h4>
                    <p>
                      Browsing our marketplace, checking Domain Rating history, and filtering websites costs nothing. You only pay when you place an order.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">2. Standard 10% Escrow and Platform Fee</h4>
                    <p>
                      All listed prices show the complete total cost of publishing. No surprises at checkout. This price includes content drafting (if requested), secure escrow service, 365-day index monitoring, and our 10% platform operation commission.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900">3. Dynamic Guest Posting Options</h4>
                    <p>
                      Prices are set directly by publishers, starting from $30 up to high-tier authority placements of $500+. Link insertion edit requests can also be ordered on existing high-visability articles at discount rates.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-6">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                ✓ 100% Secure Marketplace Escrow Protected
              </span>
              <button
                type="button"
                onClick={() => {
                  setAuthOpen(true);
                  setActiveTabInAuth('custom');
                  setActiveDetailsModal(null);
                }}
                className="bg-indigo-650 hover:bg-indigo-700 text-white font-bold px-4 py-1.5 rounded-xl text-xs cursor-pointer transition-colors"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
