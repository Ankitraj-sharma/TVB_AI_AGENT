import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Orbit as OrbitIcon, 
  Globe2, 
  ShoppingBag, 
  Database, 
  Calculator, 
  Cpu, 
  Layers, 
  ShieldCheck,
  ChevronDown,
  Users,
  Server,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { PersonaType } from '../types';
import { PERSONA_DATA } from '../data/tvbData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: PersonaType;
  setCurrentPersona: (persona: PersonaType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  setCurrentPersona
}) => {
  const [dbModalOpen, setDbModalOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    readyState: number;
    error: string | null;
    cluster: string;
    targetDatabase: string;
  }>({
    connected: false,
    readyState: 0,
    error: null,
    cluster: 'cluster0.uxisngo.mongodb.net',
    targetDatabase: 'tvb_platform'
  });
  const [checkingDb, setCheckingDb] = useState(false);

  const fetchDbStatus = () => {
    setCheckingDb(true);
    fetch('/api/db/status')
      .then(res => res.json())
      .then(data => {
        setDbStatus(data);
      })
      .catch(err => {
        console.warn('DB status check failed:', err);
      })
      .finally(() => {
        setCheckingDb(false);
      });
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);
  const tabs = [
    { id: 'overview', label: 'Engines & Vision', icon: Layers },
    { id: 'team', label: 'Team & Partners', icon: Users, badge: 'TVB Network' },
    { id: 'orbits', label: '7 Orbits', icon: OrbitIcon },
    { id: 'hubs', label: 'Hubs & Corridors', icon: Globe2 },
    { id: 'marketplace', label: 'Scale-Up Marketplace', icon: ShoppingBag, badge: 'Costco Model' },
    { id: 'network', label: 'Network (~40 Cos)', icon: Database },
    { id: 'economics', label: 'Economics Simulator', icon: Calculator },
    { id: 'ai-os', label: 'TVB Operating System', icon: Cpu, badge: 'Nexus AI' }
  ];

  const personas: { id: PersonaType; label: string }[] = [
    { id: 'founder', label: 'Founders' },
    { id: 'advisor', label: 'Advisors' },
    { id: 'investor', label: 'Investors' },
    { id: 'partner', label: 'Partners' },
    { id: 'corporate', label: 'Corporates' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#02172e]/95 backdrop-blur-md border-b border-[#172a3e]">
      {/* Top Banner: One-Liner / Thesis */}
      <div className="bg-[#021d3a] border-b border-[#172a3e]/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1863dc]/15 text-[#81a9f0] border border-[#1863dc]/30 tracking-wide uppercase">
              Core Thesis
            </span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              "The future of scaling is not advising. It is execution."
            </span>
            <span className="sm:hidden text-slate-300 font-medium">
              Execution over advising.
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            {/* MongoDB Atlas Status Pill */}
            <button
              onClick={() => setDbModalOpen(true)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b1f34] hover:bg-[#172a3e] border border-[#172a3e] text-[10px] font-mono text-slate-300 transition-colors"
              title="Click to view MongoDB Atlas Database status"
            >
              <Database className={`w-3 h-3 ${dbStatus.connected ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="font-semibold text-white">MongoDB Atlas:</span>
              <span className={dbStatus.connected ? 'text-emerald-400' : 'text-amber-300'}>
                {dbStatus.connected ? 'Connected' : 'Cluster0'}
              </span>
            </button>

            <span className="text-slate-600 hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-slate-300">Austin HQ Active</span>
            </div>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 font-mono text-[11px] hidden md:inline">4 Engines • 7 Orbits • 5 Hubs</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-8 flex items-center">
            <img 
              src="/tvb-logo.svg" 
              alt="The Venture Build" 
              className="h-7 w-auto object-contain"
            />
          </div>
          <div className="pl-2 border-l border-[#172a3e]">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-white tracking-tight">The Venture Build</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[#0b1f34] text-[#81a9f0] border border-[#172a3e]">
                TVB
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Venture Catalyst & Execution Operating System</p>
          </div>
        </div>

        {/* Persona Switcher */}
        <div className="flex items-center gap-1 bg-[#021d3a] border border-[#172a3e] p-1 rounded-lg">
          <span className="text-[11px] text-slate-400 font-medium px-2 hidden md:inline">Perspective:</span>
          {personas.map((p) => {
            const isSelected = currentPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentPersona(p.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#1863dc] text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0b1f34]'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none border-t border-[#172a3e]">
        <nav className="flex space-x-1 py-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0b1f34] text-[#81a9f0] font-semibold border border-[#1863dc]/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#021d3a]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1863dc]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    isActive 
                      ? 'bg-[#1863dc]/20 text-[#81a9f0]' 
                      : 'bg-[#021d3a] text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* MongoDB Atlas Diagnostics Modal */}
      {dbModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#021d3a] border border-[#1863dc]/40 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0b1f34] border border-[#1863dc]/50 flex items-center justify-center text-[#1863dc]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white">MongoDB Atlas Cloud Database</h3>
                  <p className="text-xs text-slate-300">Cluster: cluster0.uxisngo.mongodb.net</p>
                </div>
              </div>
              <button
                onClick={() => setDbModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#0b1f34] text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Connection Status Box */}
            <div className={`p-4 rounded-xl border ${
              dbStatus.connected 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/20 border-amber-500/30 text-amber-300'
            } text-xs space-y-2`}>
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-2">
                  {dbStatus.connected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Status: {dbStatus.connected ? 'Connected to MongoDB Atlas' : 'Pending Atlas Network / Auth Clearance'}</span>
                </span>
                <button
                  onClick={fetchDbStatus}
                  disabled={checkingDb}
                  className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#0b1f34] hover:bg-[#172a3e] border border-[#172a3e] text-white transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${checkingDb ? 'animate-spin' : ''}`} />
                  <span>Test Connection</span>
                </button>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {dbStatus.connected 
                  ? 'All scale-up companies, TVB operator profiles, and ecosystem partners are actively connected to your MongoDB Atlas cloud cluster.'
                  : 'Your backend has been fully upgraded with Mongoose schemas and endpoints. However, MongoDB Atlas returned an authentication/network error for the provided credentials.'}
              </p>
            </div>

            {/* Atlas Quick Checklist */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block text-[11px]">
                MongoDB Atlas Setup Checklist
              </span>

              <div className="space-y-2 p-3.5 rounded-xl bg-[#0b1f34] border border-[#172a3e] text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1863dc]/20 text-[#81a9f0] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-semibold text-white">Network Access (Allow 0.0.0.0/0):</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      In your MongoDB Atlas Dashboard &gt; <strong>Network Access</strong>, ensure an IP Access List entry for <code className="text-emerald-400">0.0.0.0/0</code> (Allow Access from Anywhere) is active.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-[#172a3e]">
                  <span className="w-4 h-4 rounded-full bg-[#1863dc]/20 text-[#81a9f0] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-semibold text-white">Database User & Password (no &lt;&gt; brackets):</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      In Atlas &gt; <strong>Database Access</strong>, verify the password for user <code className="text-[#81a9f0]">ankitrajsharma666_db_user</code>. Ensure the angle brackets <code className="text-amber-400">&lt; &gt;</code> are removed when pasting the password.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-[#172a3e]">
                  <span className="w-4 h-4 rounded-full bg-[#1863dc]/20 text-[#81a9f0] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-semibold text-white">Auto-Seeding Enabled:</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      The moment Atlas authenticates, TVB's backend automatically creates the <code className="text-[#81a9f0]">tvb_platform</code> database and seeds the 40+ Network Companies, 16 Leadership Members, and 7 Institutional Partners into your collections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">DB: tvb_platform</span>
              <button
                onClick={() => setDbModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#1863dc] hover:bg-[#1452b8] text-white font-medium text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
