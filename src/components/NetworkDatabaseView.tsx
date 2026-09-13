import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Building2, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  X,
  Send
} from 'lucide-react';
import { NETWORK_COMPANIES, TVB_ORBITS, TVB_HUBS } from '../data/tvbData';
import { NetworkCompany, OrbitId, HubId } from '../types';

interface NetworkDatabaseViewProps {
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export const NetworkDatabaseView: React.FC<NetworkDatabaseViewProps> = ({
  selectedCompanyId,
  setSelectedCompanyId,
  setActiveTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrbit, setSelectedOrbit] = useState<string>('All');
  const [selectedHub, setSelectedHub] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [introRequested, setIntroRequested] = useState(false);

  const activeCompany = NETWORK_COMPANIES.find(c => c.id === selectedCompanyId) || null;

  const filteredCompanies = NETWORK_COMPANIES.filter((company) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesOrbit = selectedOrbit === 'All' || company.orbit === selectedOrbit;
    const matchesHub = selectedHub === 'All' || company.hub === selectedHub;
    const matchesStage = selectedStage === 'All' || company.stage === selectedStage;

    return matchesSearch && matchesOrbit && matchesHub && matchesStage;
  });

  const getOrbitColor = (orbitId: OrbitId) => {
    const found = TVB_ORBITS.find(o => o.id === orbitId);
    return found ? found.color : '#06b6d4';
  };

  const getHubName = (hubId: HubId) => {
    const found = TVB_HUBS.find(h => h.id === hubId);
    return found ? found.name : hubId;
  };

  const handleRequestIntro = () => {
    setIntroRequested(true);
    setTimeout(() => {
      setIntroRequested(false);
      setSelectedCompanyId(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1628] to-slate-950 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Section 9: TVB Network Database</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              Ecosystem Scale-Up Directory
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Real company signals synthesized from TVB operating notes. Approximately <strong>40 companies</strong> across portfolio, partners, and broader ecosystem ($2M to $40M revenue), accelerating through the 4 growth engines.
            </p>
          </div>

          <div className="flex gap-3 text-center">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[100px]">
              <div className="text-xl font-bold text-white">~40</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Network Cos</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[100px]">
              <div className="text-xl font-bold text-cyan-400">$40M</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Max Scale</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, tags, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <select
              value={selectedOrbit}
              onChange={(e) => setSelectedOrbit(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All 7 Orbits</option>
              {TVB_ORBITS.map(o => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Hub Nodes</option>
              {TVB_HUBS.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Stages</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Growth ($10M-$40M)">Growth ($10M-$40M)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing <strong>{filteredCompanies.length}</strong> active companies matching filter criteria</span>
          {(searchQuery || selectedOrbit !== 'All' || selectedHub !== 'All' || selectedStage !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedOrbit('All');
                setSelectedHub('All');
                setSelectedStage('All');
              }}
              className="text-cyan-400 hover:text-cyan-300 text-xs"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            onClick={() => setSelectedCompanyId(company.id)}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border"
                      style={{ 
                        color: getOrbitColor(company.orbit), 
                        borderColor: `${getOrbitColor(company.orbit)}40`,
                        backgroundColor: `${getOrbitColor(company.orbit)}15`
                      }}
                    >
                      {company.orbit}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {getHubName(company.hub).split('/')[0]}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 block">{company.arrEstimate}</span>
                  <span className="text-[10px] text-slate-400">{company.stage}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">
                {company.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {company.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">TVB Intervention</span>
              <p className="text-xs text-slate-300 line-clamp-2">{company.tvbIntervention}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Company Detail Drawer / Modal */}
      {activeCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCompanyId(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {introRequested ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Operator Intro Queued</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  A high-trust double-opt-in intro brief for <strong>{activeCompany.name}</strong> has been created in the TVB OS. The Orbit Lead will review and dispatch.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{ 
                        color: getOrbitColor(activeCompany.orbit), 
                        borderColor: `${getOrbitColor(activeCompany.orbit)}40`,
                        backgroundColor: `${getOrbitColor(activeCompany.orbit)}15`
                      }}
                    >
                      {activeCompany.orbit.toUpperCase()} ORBIT
                    </span>
                    <span className="text-xs text-slate-400">
                      • {getHubName(activeCompany.hub)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white">{activeCompany.name}</h2>
                  <p className="text-sm text-slate-300 mt-1">{activeCompany.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">ARR Estimate</span>
                    <span className="text-sm font-bold text-emerald-400">{activeCompany.arrEstimate}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Stage</span>
                    <span className="text-sm font-bold text-white">{activeCompany.stage}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hub Node</span>
                    <span className="text-sm font-bold text-cyan-400">{getHubName(activeCompany.hub).split('/')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Alignment</span>
                    <span className="text-sm font-bold text-indigo-400">Outcome-Aligned</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">Active Operational & Scaling Needs</h4>
                  <div className="space-y-2">
                    {activeCompany.operatingNeeds.map((need, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                        <span>{need}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-cyan-400 block">
                    TVB Operator Execution Plan
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeCompany.tvbIntervention}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCompanyId(null);
                      setActiveTab('ai-os');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Run AI Venture Audit for {activeCompany.name}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCompanyId(null)}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestIntro}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Operator Introduction</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
