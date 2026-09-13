import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GrowthEnginesView } from './components/GrowthEnginesView';
import { TeamAndPartnersView } from './components/TeamAndPartnersView';
import { OrbitsView } from './components/OrbitsView';
import { HubsView } from './components/HubsView';
import { MarketplaceView } from './components/MarketplaceView';
import { NetworkDatabaseView } from './components/NetworkDatabaseView';
import { EconomicsCalculator } from './components/EconomicsCalculator';
import { OperatingSystemConsole } from './components/OperatingSystemConsole';
import { PersonaType } from './types';
import { TVB_ONE_LINER, TVB_CONTACT_INFO } from './data/tvbData';
import { Zap, Heart, Shield, Globe2, Cpu, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [currentPersona, setCurrentPersona] = useState<PersonaType>('founder');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setActiveTab('network');
  };

  return (
    <div className="min-h-screen bg-[#02172e] bg-grid-subtle text-slate-200 flex flex-col font-sans selection:bg-[#1863dc]/25 selection:text-white">
      {/* Top sticky navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <GrowthEnginesView
            currentPersona={currentPersona}
            setCurrentPersona={setCurrentPersona}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'team' && (
          <TeamAndPartnersView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'orbits' && (
          <OrbitsView
            onSelectCompany={handleSelectCompany}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'hubs' && (
          <HubsView
            onSelectCompany={handleSelectCompany}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'network' && (
          <NetworkDatabaseView
            selectedCompanyId={selectedCompanyId}
            setSelectedCompanyId={setSelectedCompanyId}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'economics' && (
          <EconomicsCalculator />
        )}

        {activeTab === 'ai-os' && (
          <OperatingSystemConsole />
        )}
      </main>

      {/* Professional Ecosystem Footer matching theventurebuild.com */}
      <footer className="border-t border-[#172a3e] bg-[#021d3a] mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src="/tvb-logo.svg" 
                  alt="The Venture Build" 
                  className="h-7 w-auto object-contain"
                />
                <span className="font-display font-bold text-white text-base">The Venture Build</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                We are more than just Venture Capital. We help accelerate growth for ambitious scale-ups through hands-on execution, fractional CXO leadership, market access, and non-broker capital readiness.
              </p>
              <div className="text-xs text-[#81a9f0] font-medium italic">
                "{TVB_ONE_LINER.thesis}"
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1863dc]" />
                  <span>{TVB_CONTACT_INFO.headquarters}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#1863dc]" />
                  <a href={`tel:${TVB_CONTACT_INFO.phone}`} className="hover:text-white">{TVB_CONTACT_INFO.phone}</a>
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#1863dc]" />
                  <a href={`mailto:${TVB_CONTACT_INFO.email}`} className="hover:text-white">{TVB_CONTACT_INFO.email}</a>
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block">Platform Navigation</span>
              <ul className="space-y-1.5 text-slate-300">
                <li><button onClick={() => setActiveTab('overview')} className="hover:text-[#81a9f0] transition-colors">4 Growth Engines</button></li>
                <li><button onClick={() => setActiveTab('team')} className="hover:text-[#81a9f0] transition-colors">Team & Partners (Austin)</button></li>
                <li><button onClick={() => setActiveTab('orbits')} className="hover:text-[#81a9f0] transition-colors">7 Vertical Orbits</button></li>
                <li><button onClick={() => setActiveTab('hubs')} className="hover:text-[#81a9f0] transition-colors">5 Global Hubs & Corridors</button></li>
                <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-[#81a9f0] transition-colors">Scale-Up Marketplace</button></li>
                <li><button onClick={() => setActiveTab('network')} className="hover:text-[#81a9f0] transition-colors">Network (~40 Companies)</button></li>
                <li><button onClick={() => setActiveTab('economics')} className="hover:text-[#81a9f0] transition-colors">Economics Simulator</button></li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block">Nexus Operating System</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automate 80% of venture operations while keeping high-trust human judgment in relationship moments.
              </p>
              <div className="pt-2 space-y-2">
                <button 
                  onClick={() => setActiveTab('ai-os')} 
                  className="px-3.5 py-1.5 rounded-lg bg-[#1863dc] hover:bg-[#1452b8] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span>Launch TVB OS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a 
                  href="https://nexus.theventurebuild.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="block text-[11px] text-slate-400 hover:text-[#81a9f0]"
                >
                  nexus.theventurebuild.com ↗
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#172a3e] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} The Venture Build (TVB). All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#81a9f0] font-medium">Austin • London • Paris • India • UAE</span>
              <span>•</span>
              <span className="text-slate-400">Outcome-Aligned Execution</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
