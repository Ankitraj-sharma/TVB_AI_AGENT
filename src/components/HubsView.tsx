import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Building, 
  ArrowUpRight, 
  Share2, 
  CheckCircle2, 
  Send, 
  Compass, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { TVB_HUBS, NETWORK_COMPANIES } from '../data/tvbData';
import { HubId } from '../types';

interface HubsViewProps {
  onSelectCompany: (companyId: string) => void;
  setActiveTab: (tab: string) => void;
}

export const HubsView: React.FC<HubsViewProps> = ({ onSelectCompany, setActiveTab }) => {
  const [selectedHubId, setSelectedHubId] = useState<HubId>('austin');
  const [activeCorridor, setActiveCorridor] = useState<string>('us-india');

  const activeHub = TVB_HUBS.find(h => h.id === selectedHubId) || TVB_HUBS[0];
  const hubCompanies = NETWORK_COMPANIES.filter(c => c.hub === selectedHubId);

  const crossBorderCorridors = [
    {
      id: 'us-india',
      name: 'US <> India Scale-Up Corridor',
      origin: 'India Hub (T-Hub / Hyderabad / Bengaluru)',
      destination: 'Austin / Texas Home Base',
      description: 'Engineering depth & high-velocity founder pipeline scaled directly into North American enterprise buyers via Texas Tech Corridor.',
      activeFlow: 'Wizcrow, ContextQA utilizing US market access playbook'
    },
    {
      id: 'us-uk-paris',
      name: 'Transatlantic Europe Bridge',
      origin: 'UK Hub (London) & Paris Hub (Station F / French Tech)',
      destination: 'Austin / Texas Hub',
      description: 'Sovereign European AI scale-ups expanding into US enterprise market; US companies establishing European regulatory and GTM footprint.',
      activeFlow: 'Verge, Xeni expanding GTM and institutional co-investment'
    },
    {
      id: 'mena-global',
      name: 'Middle East Capital & Sovereign Gateway',
      origin: 'UAE Hub (DIFC / ADGM)',
      destination: 'Global TVB Network (US, India, Europe)',
      description: 'Connecting top-tier TVB scale-ups with GCC sovereign wealth funds, family offices, and regional smart city & fintech deployments.',
      activeFlow: 'Xchange PE secondary exchange and private capital routing'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Section 8: TVB Hubs</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            Geographic Ecosystem Nodes
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            "Hubs create geographic reach." Physical ecosystem nodes orchestrating local market access, regulatory navigation, capital pathways, and founder support.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Austin HQ + 4 Global Nodes</span>
          </span>
        </div>
      </div>

      {/* Hub Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {TVB_HUBS.map((hub) => {
          const isSelected = hub.id === selectedHubId;
          const isHome = hub.status === 'Home Base';
          return (
            <button
              key={hub.id}
              onClick={() => setSelectedHubId(hub.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    isHome 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : hub.status === 'Emerging Node'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {hub.status}
                  </span>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
                <h3 className={`font-display font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {hub.name}
                </h3>
                <p className="text-[11px] text-slate-400">{hub.locationDetails}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
                <span>{hub.region}</span>
                <span className="text-cyan-400 font-mono">
                  {NETWORK_COMPANIES.filter(c => c.hub === hub.id).length} cos
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Hub Detail */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e172a] to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold text-cyan-400">{activeHub.region}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{activeHub.status}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-3">
              <span>{activeHub.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">{activeHub.locationDetails}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('ai-os')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Route Expansion Through {activeHub.name.split('/')[0].trim()}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          {/* Roles and Responsibilities */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Node Operational Mandate</span>
              </h3>
              <div className="space-y-2.5">
                {activeHub.role.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-3">
                    <span className="w-5 h-5 rounded bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5 border border-cyan-500/20">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Bridge Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/30 via-slate-950 to-slate-950 border border-indigo-900/40">
              <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-400 block mb-1">
                Strategic Cross-Border Advantage
              </span>
              <p className="text-sm text-slate-200 font-medium">
                {activeHub.strategicBridge}
              </p>
            </div>
          </div>

          {/* Scale-Ups Associated with this Hub */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between">
              <span>Active Scale-Ups in Node ({hubCompanies.length})</span>
              <button 
                onClick={() => setActiveTab('network')}
                className="text-cyan-400 hover:text-cyan-300 text-[11px] font-medium"
              >
                All Network
              </button>
            </h3>

            <div className="space-y-2.5">
              {hubCompanies.length > 0 ? (
                hubCompanies.map((co) => (
                  <div
                    key={co.id}
                    onClick={() => onSelectCompany(co.id)}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white">{co.name}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                        {co.stage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{co.description}</p>
                    <div className="mt-2 text-[10px] text-cyan-400 flex items-center justify-between">
                      <span>ARR: {co.arrEstimate}</span>
                      <span>{co.orbit.toUpperCase()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                  Global hub companies actively participating via cross-hub corridors.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Border Corridors Visualizer */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">TVB Cross-Border Mesh</span>
          <h2 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
            Active Scale-Up Expansion Corridors
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            How TVB bridges capital, enterprise pilots, and delivery talent between continents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crossBorderCorridors.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-cyan-400 mb-2">
                  <span>{c.name}</span>
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1 mb-3 text-xs">
                  <div className="text-slate-400">From: <span className="text-slate-200 font-medium">{c.origin}</span></div>
                  <div className="text-slate-400">To: <span className="text-slate-200 font-medium">{c.destination}</span></div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-0.5">Active Proof Point</span>
                <span className="text-xs text-slate-400">{c.activeFlow}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
