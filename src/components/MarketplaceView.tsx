import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Percent, 
  Clock, 
  Coins, 
  X,
  FileCheck
} from 'lucide-react';
import { MARKETPLACE_PARTNERS } from '../data/tvbData';
import { MarketplacePartner } from '../types';

interface MarketplaceViewProps {
  setActiveTab: (tab: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [activeModalPartner, setActiveModalPartner] = useState<MarketplacePartner | null>(null);
  const [claimedSuccess, setClaimedSuccess] = useState(false);

  const categories = [
    'All',
    'AI & Automation',
    'Talent & Recruiting',
    'Legal & Compliance',
    'Finance & Accounting',
    'Demand Generation & Sales',
    'Marketing & PR',
    'Cloud & Software Perks'
  ];

  const pricingModels = [
    'All',
    'Discounted Ecosystem Pricing',
    'Success Fee / Equity',
    'Milestone-Based',
    'Direct Client Payment'
  ];

  const filteredPartners = MARKETPLACE_PARTNERS.filter((partner) => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.ecosystemPerk.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    const matchesPricing = selectedPricing === 'All' || partner.pricingModel === selectedPricing;

    return matchesSearch && matchesCategory && matchesPricing;
  });

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimedSuccess(true);
    setTimeout(() => {
      setClaimedSuccess(false);
      setActiveModalPartner(null);
    }, 2200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Engine 3: Scale-Up Marketplace</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              The "Costco for Scale-Ups"
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Vetted execution partners across legal, finance, marketing, AI, and talent. Designed specifically to help founders <strong>avoid hiring full-time executive teams too early</strong> while still locking in institutional-grade execution capacity.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-right space-y-1">
            <span className="text-xs text-slate-400 block">Negotiated Perks</span>
            <div className="text-lg font-bold text-emerald-400">$250k+ Avg Value</div>
            <span className="text-[11px] text-slate-500">Zero Agency Markups</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vetted partners, perks, tooling (e.g., Make.com, SOC2, CFO)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Pricing:</span>
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              {pricingModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {partner.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                    {partner.name}
                  </h3>
                </div>
                {partner.featured && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {partner.description}
              </p>

              {/* Pre-Negotiated Perk Badge */}
              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[11px] text-emerald-400">
                  <Percent className="w-3.5 h-3.5" />
                  <span>TVB Pre-Negotiated Perk</span>
                </div>
                <p className="text-[11px] leading-snug">{partner.ecosystemPerk}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Model: <strong className="text-slate-300">{partner.pricingModel}</strong></span>
                <span>Stage: <strong className="text-slate-300">{partner.idealForStage}</strong></span>
              </div>

              <button
                onClick={() => setActiveModalPartner(partner)}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Claim Perk / Request Intro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Claiming Perk / Intro */}
      {activeModalPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalPartner(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {claimedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Ecosystem Route Initialized!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your request for <strong>{activeModalPartner.name}</strong> has been logged in the TVB OS. An operator will route the double-opt-in intro within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleClaim} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-1">
                    Costco for Scale-ups
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Unlock {activeModalPartner.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeModalPartner.ecosystemPerk}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Startup / Scale-Up Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Health Technologies"
                      defaultValue="Pulsar Health"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Current Stage</label>
                      <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">
                        <option>Pre-Seed / Angel</option>
                        <option>Seed ($1M - $3M)</option>
                        <option>Series A ($3M - $10M)</option>
                        <option>Growth / Scale-up ($10M+)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Urgency</label>
                      <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500">
                        <option>Immediate (Active Deal / Need)</option>
                        <option>This Quarter</option>
                        <option>Exploring Options</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Specific Execution Goal</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what needs to be solved (e.g. need SOC2 audit ready in 45 days, or need enterprise ABM outbound to hospital CISOs)..."
                      defaultValue="Need immediate assistance structuring enterprise pilot agreement and HIPAA compliance audit."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 text-[11px] text-slate-400 space-y-1 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>TVB Outcome-Aligned Guarantee</span>
                  </div>
                  <p>Vetted partner honors TVB ecosystem pricing with direct operator escalation if deliverables drift.</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalPartner(null)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/10"
                  >
                    Confirm Partner Intro Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
