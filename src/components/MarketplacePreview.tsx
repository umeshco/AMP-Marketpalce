import React, { useState } from 'react';
import { Search, Zap, Check, ChevronRight, Globe, ShieldCheck } from 'lucide-react';

interface MarketplacePreviewProps {
  onRegisterTrigger: () => void;
}

export default function MarketplacePreview({ onRegisterTrigger }: MarketplacePreviewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNiche, setActiveNiche] = useState('All');

  // Static list of curated premium live guest-posting outlets
  const sampleSites: any[] = [];

  const nichesList = ['All', 'Technology', 'Health & Wellness', 'Finance & Investing', 'Digital Marketing', 'Travel & Tourism'];

  const filteredSites = sampleSites.filter(site => {
    const matchesSearch = site.domain.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche = activeNiche === 'All' || site.niche === activeNiche;
    return matchesSearch && matchesNiche;
  });

  return (
    <div id="live-directory-preview" className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm text-left relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute right-0 top-0 h-48 w-48 bg-radial from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9.5px] font-black tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full uppercase">
            <Globe size={11} className="text-indigo-600" /> Premium Publisher Inventory
          </span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-2.5">
            Verified Guest Posting Outlets
          </h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Browse premium manually-vetted media. Connect to search over 12,000+ top-tier publication domains inside the primary live ecosystem.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-[11px] font-bold">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span>Publisher Feeds Online</span>
        </div>
      </div>

      {/* Directory Filters & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
        {/* Niche Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2 md:mx-0 md:px-0">
          {nichesList.map(n => (
            <button
              key={n}
              onClick={() => setActiveNiche(n)}
              className={`px-3.5 py-2 text-xs font-black rounded-xl cursor-pointer transition-all whitespace-nowrap border ${
                activeNiche === n
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-md shadow-indigo-150'
                  : 'bg-slate-50 text-slate-500 border-slate-150 hover:bg-slate-100'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Search input field */}
        <div className="relative w-full lg:w-72">
          <Search size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search domain or niche..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-9 pr-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Grid of site cards */}
      {filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <div
              key={site.id}
              className="group relative bg-white border border-slate-200 hover:border-indigo-400/80 rounded-3xl p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9.5px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                      {site.niche}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base mt-3 group-hover:text-indigo-600 transition-colors">
                      {site.name}
                    </h4>
                    <p className="text-[10.5px] font-mono text-slate-450 font-semibold">{site.domain}</p>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <span className="text-[8.5px] block text-slate-400 font-extrabold uppercase tracking-wider">Placement</span>
                    <span className="text-xl font-black text-indigo-900">${site.price}</span>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50/75 rounded-2xl p-3 text-center border border-slate-100">
                  <div>
                    <span className="text-[8.5px] text-slate-400 font-extrabold block uppercase tracking-wider">DA Rating</span>
                    <span className="text-[11.5px] font-black text-indigo-700">DA {site.da}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] text-slate-400 font-extrabold block uppercase tracking-wider">DR Metric</span>
                    <span className="text-[11.5px] font-black text-purple-700 font-extrabold">DR {site.dr}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] text-slate-400 font-extrabold block uppercase tracking-wider">Visits/mo</span>
                    <span className="text-[11.5px] font-black text-emerald-600">{site.traffic}</span>
                  </div>
                </div>
              </div>

              {/* Card bottom */}
              <div className="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between text-xs">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-500" /> {site.safety}
                  </span>
                  <span className="text-[10px] text-slate-550 font-semibold flex items-center gap-1">
                    <Zap size={11} className="text-amber-500 fill-amber-400" /> {site.speed} speed
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onRegisterTrigger}
                  className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-md shadow-indigo-200/50 hover:shadow-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  Place pitch <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-14 text-center border bg-slate-50/50 rounded-2xl border-slate-150 space-y-3 px-6">
          <span className="text-3xl block">🔒</span>
          <h4 className="font-extrabold text-slate-700">Account Authorization Required</h4>
          <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
            Authorized publishers list their sites securely inside the verified environment. Create an account or log in to search publications, run live audits, or place placement pitches.
          </p>
          <div className="pt-2">
            <button
              onClick={onRegisterTrigger}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md hover:shadow-lg hover:brightness-105 transition-all"
            >
              Sign Up or Login
            </button>
          </div>
        </div>
      )}

      {/* Explanatory subtitle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-100 text-xs text-slate-450">
        <span className="flex items-center gap-1.5 font-medium text-slate-500">
          🛡️ Secure Escrow protection. Payout releases processed only after active indexable publication is verified.
        </span>
        <button
          onClick={onRegisterTrigger}
          className="text-indigo-600 hover:text-indigo-700 font-black hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all 12,400+ domains inside the ecosystem →
        </button>
      </div>
    </div>
  );
}
