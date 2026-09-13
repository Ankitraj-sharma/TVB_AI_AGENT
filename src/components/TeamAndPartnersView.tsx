import React, { useState } from 'react';
import { 
  Users, 
  Handshake, 
  ArrowUpRight, 
  Building2, 
  Award, 
  Globe, 
  Briefcase, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { TVB_TEAM, TVB_OFFICIAL_PARTNERS, TVB_CONTACT_INFO } from '../data/tvbData';
import { TeamMember, TVBPartner } from '../types';

interface TeamAndPartnersViewProps {
  setActiveTab: (tab: string) => void;
}

export const TeamAndPartnersView: React.FC<TeamAndPartnersViewProps> = ({ setActiveTab }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'team' | 'partners' | 'contact'>('team');
  const [partnerFilter, setPartnerFilter] = useState<string>('All');

  const partnerCategories = ['All', 'Venture Fund', 'Ecosystem Partner', 'Corporate'];

  const filteredPartners = partnerFilter === 'All'
    ? TVB_OFFICIAL_PARTNERS
    : TVB_OFFICIAL_PARTNERS.filter(p => p.category === partnerFilter);

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner matching theventurebuild.com */}
      <div className="rounded-2xl bg-[#021d3a] border border-[#172a3e] p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-[#1863dc]/15 text-[#1863dc] border border-[#1863dc]/30 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>The Backbone to Your Success</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Leadership, Operators & Ecosystem Partners
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            "Our partners bring decades of business, domain, and operational experience to assist navigating through the turbid waters of building a business. We understand the struggle and respect the passion of teams building innovative solutions."
          </p>

          {/* Quick Sub-Navigation */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setActiveSubTab('team')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'team'
                  ? 'bg-[#1863dc] text-white shadow-xs'
                  : 'bg-[#0b1f34] text-slate-300 hover:text-white border border-[#172a3e]'
              }`}
            >
              Executive Team ({TVB_TEAM.length})
            </button>
            <button
              onClick={() => setActiveSubTab('partners')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'partners'
                  ? 'bg-[#1863dc] text-white shadow-xs'
                  : 'bg-[#0b1f34] text-slate-300 hover:text-white border border-[#172a3e]'
              }`}
            >
              Institutional Partners ({TVB_OFFICIAL_PARTNERS.length})
            </button>
            <button
              onClick={() => setActiveSubTab('contact')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'contact'
                  ? 'bg-[#1863dc] text-white shadow-xs'
                  : 'bg-[#0b1f34] text-slate-300 hover:text-white border border-[#172a3e]'
              }`}
            >
              Get in Touch (Austin HQ)
            </button>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: EXECUTIVE TEAM */}
      {activeSubTab === 'team' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-white">TVB Leadership & Core Operators</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Senior executives, serial founders, and PE/VC partners driving operational leverage across 7 vertical Orbits.
              </p>
            </div>
            <span className="text-xs font-mono text-[#1863dc] bg-[#021d3a] px-3 py-1 rounded-md border border-[#172a3e]">
              President TiE Austin • Vista Equity Alumni • AWS / Sun Microsystems Veterans
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TVB_TEAM.map((member, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedMember(member)}
                className="p-5 rounded-xl bg-[#021d3a]/80 border border-[#172a3e] hover:border-[#1863dc]/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#0b1f34] border border-[#1863dc]/30 flex items-center justify-center text-sm font-bold text-white group-hover:border-[#1863dc] transition-colors">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#0b1f34] text-[#81a9f0] border border-[#172a3e]">
                      {member.domain.split('&')[0]}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#1863dc] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#172a3e] flex items-center justify-between text-[11px] text-[#1863dc] font-medium">
                  <span>View Full Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: INSTITUTIONAL PARTNERS */}
      {activeSubTab === 'partners' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-white">Ecosystem & Capital Partners</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Venture funds, syndicate networks, and corporate innovation platforms backing TVB scale-ups.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#021d3a] p-1 rounded-lg border border-[#172a3e]">
              {partnerCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPartnerFilter(cat)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    partnerFilter === cat
                      ? 'bg-[#1863dc] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map((partner, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-[#021d3a]/80 border border-[#172a3e] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0b1f34] border border-[#1863dc]/40 flex items-center justify-center text-[#1863dc]">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-white">
                      {partner.name}
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#0b1f34] text-slate-300 border border-[#172a3e]">
                    {partner.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {partner.description}
                </p>

                <div className="pt-2 border-t border-[#172a3e] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active Co-Investment / Co-Sell</span>
                  </span>
                  <span className="text-[#1863dc]">Official Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: CONTACT & AUSTIN HQ */}
      {activeSubTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#021d3a] border border-[#172a3e] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#1863dc] font-bold">Connect With TVB</span>
              <h2 className="text-2xl font-display font-bold text-white mt-1">We Love Hearing Stories & Struggles</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                "Please feel free to reach out to us to schedule a call. We will be direct if we cannot help you save time at both ends. If we can, we will certainly be glad to help you and be part of your growth journey."
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#172a3e] flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#1863dc] shrink-0" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Global Headquarters</span>
                  <span className="text-sm font-bold text-white">{TVB_CONTACT_INFO.headquarters}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#172a3e] flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1863dc] shrink-0" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Telephone</span>
                  <a href={`tel:${TVB_CONTACT_INFO.phone}`} className="text-sm font-bold text-white hover:text-[#1863dc]">
                    {TVB_CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#172a3e] flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1863dc] shrink-0" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Direct Inquiries</span>
                  <a href={`mailto:${TVB_CONTACT_INFO.email}`} className="text-sm font-bold text-white hover:text-[#1863dc]">
                    {TVB_CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#021d3a] border border-[#172a3e] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-[#1863dc]/15 text-[#1863dc] border border-[#1863dc]/30 uppercase tracking-wider">
                <span>Venture Operations Platform</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Nexus Operating System</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                TVB Nexus is the operational command center that connects portfolio scale-ups, fractional operators, and investors into an automated execution flywheel.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>80% Automation of Venture Workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Automated Double-Opt-In Intro Routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct Marketplace & Fractional CXO Matchmaking</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#172a3e] space-y-3">
              <button
                onClick={() => setActiveTab('ai-os')}
                className="w-full py-3 rounded-xl bg-[#1863dc] hover:bg-[#1452b8] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Launch TVB Operating System</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href={TVB_CONTACT_INFO.nexusPortal}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#0b1f34] hover:bg-[#172a3e] text-slate-300 hover:text-white font-medium text-xs transition-all flex items-center justify-center gap-2 border border-[#172a3e]"
              >
                <span>External Nexus Portal (nexus.theventurebuild.com)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#021d3a] border border-[#1863dc]/40 rounded-2xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0b1f34] border border-[#1863dc] flex items-center justify-center text-base font-bold text-white">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-xs text-[#1863dc] font-semibold">{selectedMember.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-8 h-8 rounded-lg bg-[#0b1f34] text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#0b1f34] border border-[#172a3e] text-xs text-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Primary Domain & Specialty</span>
              {selectedMember.domain}
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Executive Bio</span>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                {selectedMember.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-[#172a3e] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">The Venture Build Operator Network</span>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-lg bg-[#1863dc] hover:bg-[#1452b8] text-white text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
