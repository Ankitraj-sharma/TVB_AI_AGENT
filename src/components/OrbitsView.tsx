import React, { useState } from 'react';
import { 
  Orbit as OrbitIcon, 
  Activity, 
  GraduationCap, 
  Bot, 
  ShieldAlert, 
  Layers, 
  Plane, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Building2, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TVB_ORBITS, NETWORK_COMPANIES } from '../data/tvbData';
import { OrbitId } from '../types';

interface OrbitsViewProps {
  onSelectCompany: (companyId: string) => void;
  setActiveTab: (tab: string) => void;
}

export const OrbitsView: React.FC<OrbitsViewProps> = ({ onSelectCompany, setActiveTab }) => {
  const [selectedOrbitId, setSelectedOrbitId] = useState<OrbitId>('healthcare');

  const activeOrbit = TVB_ORBITS.find(o => o.id === selectedOrbitId) || TVB_ORBITS[0];
  const orbitCompanies = NETWORK_COMPANIES.filter(c => c.orbit === selectedOrbitId);

  const getOrbitIcon = (id: OrbitId) => {
    switch (id) {
      case 'healthcare': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'education': return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case 'ai': return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'cybersecurity': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'digital-twin': return <Layers className="w-5 h-5 text-blue-400" />;
      case 'travel': return <Plane className="w-5 h-5 text-amber-400" />;
      case 'fintech': return <CreditCard className="w-5 h-5 text-teal-400" />;
      default: return <OrbitIcon className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
            <OrbitIcon className="w-3.5 h-3.5" />
            <span>Section 7: TVB Orbits</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            Vertical Ecosystems
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            "Orbits create vertical depth." Each Orbit brings together founders, advisors, investors, corporate partners, service partners, and repeatable GTM plays in a focused industry sector.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">7 Dedicated Orbits</span>
          <span className="text-sm font-semibold text-cyan-400">Vertical Depth + Repeatable GTM</span>
        </div>
      </div>

      {/* Orbit Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {TVB_ORBITS.map((orbit) => {
          const isSelected = orbit.id === selectedOrbitId;
          return (
            <button
              key={orbit.id}
              onClick={() => setSelectedOrbitId(orbit.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {getOrbitIcon(orbit.id)}
                <span className="text-[10px] font-mono text-slate-500">
                  {NETWORK_COMPANIES.filter(c => c.orbit === orbit.id).length} cos
                </span>
              </div>
              <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {orbit.name.replace(' Orbit', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Orbit Detail Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d1527] to-slate-950 border border-slate-800 shadow-xl space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                {getOrbitIcon(activeOrbit.id)}
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white">{activeOrbit.name}</h2>
                <p className="text-xs text-slate-400">{activeOrbit.headline}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ai-os')}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Route Intro in this Orbit</span>
            </button>
          </div>
        </div>

        {/* Orbit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Focus Areas */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Domain Focus & Execution Themes</span>
            </h3>
            <div className="space-y-2">
              {activeOrbit.focusAreas.map((area, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Initiatives & Advisors */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-wider text-indigo-400 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Related Initiatives Mentioned in Source</span>
              </h3>
              <div className="space-y-2">
                {activeOrbit.relatedInitiatives.map((init, i) => (
                  <div key={i} className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200">
                    {init}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Specialized Operator & Advisor Profiles</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeOrbit.keyAdvisors.map((advisor, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium">
                    {advisor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Network Companies in this Orbit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Orbit Companies ({orbitCompanies.length})</span>
              </h3>
              <button 
                onClick={() => setActiveTab('network')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
              >
                View full network
              </button>
            </div>

            <div className="space-y-2.5">
              {orbitCompanies.length > 0 ? (
                orbitCompanies.map((company) => (
                  <div
                    key={company.id}
                    onClick={() => onSelectCompany(company.id)}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {company.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                        {company.stage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-2">{company.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-900">
                      <span>ARR: {company.arrEstimate}</span>
                      <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                  Additional confidential scale-ups in this Orbit undergoing onboarding.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
