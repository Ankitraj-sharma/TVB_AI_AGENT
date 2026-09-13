import React, { useState } from 'react';
import { 
  Compass, 
  DoorOpen, 
  ShoppingBag, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Repeat, 
  Shield, 
  ChevronRight, 
  Clock, 
  Target,
  Award,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  TVB_ONE_LINER, 
  GROWTH_ENGINES, 
  PERSONA_DATA, 
  CADENCE_RITUALS, 
  FLYWHEEL_STEPS, 
  STRATEGIC_PRINCIPLES 
} from '../data/tvbData';
import { PersonaType } from '../types';

interface GrowthEnginesViewProps {
  currentPersona: PersonaType;
  setCurrentPersona: (p: PersonaType) => void;
  setActiveTab: (tab: string) => void;
}

export const GrowthEnginesView: React.FC<GrowthEnginesViewProps> = ({
  currentPersona,
  setCurrentPersona,
  setActiveTab
}) => {
  const [selectedEngineId, setSelectedEngineId] = useState<string>('executive-advisory');
  const [activeCadenceFilter, setActiveCadenceFilter] = useState<'All' | 'Weekly' | 'Monthly' | 'Quarterly'>('All');
  const [activeFlywheelStep, setActiveFlywheelStep] = useState<number>(1);

  const personaConfig = PERSONA_DATA[currentPersona];
  const activeEngine = GROWTH_ENGINES.find(e => e.id === selectedEngineId) || GROWTH_ENGINES[0];

  const filteredRituals = activeCadenceFilter === 'All' 
    ? CADENCE_RITUALS 
    : CADENCE_RITUALS.filter(r => r.frequency === activeCadenceFilter);

  const getEngineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-6 h-6 text-cyan-400" />;
      case 'DoorOpen': return <DoorOpen className="w-6 h-6 text-indigo-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'Coins': return <Coins className="w-6 h-6 text-amber-400" />;
      default: return <Compass className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-2xl bg-[#021d3a] border border-[#172a3e] p-6 md:p-10 shadow-sm">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-[#0b1f34] text-[#81a9f0] border border-[#172a3e] mb-4 tracking-wide uppercase">
            <span>Operating Ecosystem for High-Growth Ventures</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-4">
            The Future of Scaling is <span className="text-[#1863dc]">Execution</span>.
          </h1>

          <p className="text-base text-slate-300 leading-relaxed mb-8 max-w-3xl font-normal">
            {TVB_ONE_LINER.summary}
          </p>

          {/* The Big Idea Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#172a3e]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">Traditional Venture</span>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">Gives capital alone, with passive quarterly board governance.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#172a3e]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">Traditional Consulting</span>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">Gives high-level advice with heavy upfront billable hours.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#172a3e]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">Traditional Accelerators</span>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">Give fixed cohorts and generic mentor programming.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1f34] border border-[#1863dc]/50">
              <span className="text-[11px] uppercase tracking-wider text-[#81a9f0] font-bold block mb-1">The Venture Build (TVB)</span>
              <p className="text-xs font-medium text-white leading-relaxed">Surrounds founders with a full-stack, outcome-aligned execution ecosystem.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('ai-os')}
              className="px-4 py-2.5 rounded-lg bg-[#1863dc] hover:bg-[#1452b8] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-xs"
            >
              <Cpu className="w-4 h-4" />
              <span>Launch TVB Operating System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className="px-4 py-2.5 rounded-lg bg-[#0b1f34] hover:bg-[#172a3e] border border-[#172a3e] text-slate-200 font-medium text-xs transition-all"
            >
              Meet TVB Leadership & Operators
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className="px-4 py-2.5 rounded-lg bg-[#0b1f34] hover:bg-[#172a3e] border border-[#172a3e] text-slate-300 font-medium text-xs transition-all"
            >
              Explore 40+ Network Companies
            </button>
          </div>
        </div>
      </section>

      {/* Persona Lens Spotlight */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Positioning Language</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{personaConfig.badge}</span>
            </div>
            <h2 className="text-xl font-display font-bold text-white mt-1">
              TVB for {personaConfig.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Switch Stakeholder Lens:</span>
            <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['founder', 'advisor', 'investor', 'partner', 'corporate'] as PersonaType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPersona(p)}
                  className={`text-xs px-2.5 py-1 rounded capitalize font-medium transition-all ${
                    currentPersona === p
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <p className="text-slate-200 italic font-medium leading-relaxed">
                "{personaConfig.positioning}"
              </p>
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">Core Operational Advantage</span>
              <p className="text-sm text-slate-300">{personaConfig.coreBenefit}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col justify-between">
            <div className="space-y-2 mb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 block">Ecosystem Deliverables</span>
              {personaConfig.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (currentPersona === 'founder') setActiveTab('ai-os');
                else if (currentPersona === 'advisor') setActiveTab('economics');
                else if (currentPersona === 'investor') setActiveTab('network');
                else if (currentPersona === 'partner') setActiveTab('marketplace');
                else setActiveTab('hubs');
              }}
              className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{personaConfig.cta}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* The 4 Practical Growth Engines */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Section 2: What TVB Does</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-1">
              Four Practical Growth Engines
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              TVB helps founders move from traction to scale by uniting operator advisory, direct market access, a vetted marketplace, and capital readiness.
            </p>
          </div>
        </div>

        {/* Engine Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GROWTH_ENGINES.map((engine) => {
            const isSelected = engine.id === selectedEngineId;
            return (
              <div
                key={engine.id}
                onClick={() => setSelectedEngineId(engine.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center">
                    {getEngineIcon(engine.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">Engine 0{engine.number}</span>
                </div>
                <h3 className={`font-display font-bold text-base mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {engine.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {engine.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Engine Deep Dive Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e1729] to-slate-950 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
                  <span>Engine 0{activeEngine.number} Focus</span>
                  <span>•</span>
                  <span>{activeEngine.tagline}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{activeEngine.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{activeEngine.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Operational Execution Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeEngine.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Operator Philosophy</span>
                </div>
                <blockquote className="text-xs text-slate-300 italic border-l-2 border-amber-400/60 pl-3 py-1">
                  "{activeEngine.operatorPhilosophy}"
                </blockquote>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">TVB Ecosystem Integration</span>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <p>• Automated by TVB OS workflow engine</p>
                    <p>• Outcome-aligned compensation structure</p>
                    <p>• Linked to 7 Orbits & 5 Geographic Hubs</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    if (activeEngine.id === 'scale-up-marketplace') setActiveTab('marketplace');
                    else if (activeEngine.id === 'executive-advisory') setActiveTab('orbits');
                    else if (activeEngine.id === 'market-access') setActiveTab('hubs');
                    else setActiveTab('economics');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/10"
                >
                  <span>Explore {activeEngine.title} Actions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: TVB Ecosystem Flywheel */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Section 11: Ecosystem Flywheel</span>
            <h2 className="text-2xl font-display font-bold text-white mt-1">
              The 8-Step Compounding Flywheel
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              TVB's long-term power comes from the ecosystem flywheel. Over time, TVB becomes less like a services company and more like an ecosystem infrastructure layer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {FLYWHEEL_STEPS.map((step) => {
            const isActive = activeFlywheelStep === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setActiveFlywheelStep(step.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Stage {step.step}/8</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">{step.description}</p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>{step.leveragePoint}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 12: TVB Operating Cadence */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Section 12: TVB Cadence</span>
            <h2 className="text-2xl font-display font-bold text-white mt-1">
              Repeatable Operational Rituals
            </h2>
            <p className="text-sm text-slate-400">
              "This cadence converts the network from passive relationships into active momentum."
            </p>
          </div>

          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['All', 'Weekly', 'Monthly', 'Quarterly'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCadenceFilter(filter)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeCadenceFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRituals.map((ritual, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    ritual.frequency === 'Weekly' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                    ritual.frequency === 'Monthly' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {ritual.frequency} Ritual
                  </span>
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h4 className="font-display font-bold text-sm text-white mb-1">{ritual.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">{ritual.purpose}</p>
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Participants:</span> {ritual.participants}
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">Tangible Deliverable</span>
                <span className="text-xs text-slate-300">{ritual.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 15: Strategic Principles */}
      <section className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Section 15: Strategic Principles</span>
          <h2 className="text-2xl font-display font-bold text-white mt-1">
            TVB Operating Tenets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {STRATEGIC_PRINCIPLES.map((principle) => (
            <div key={principle.number} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/20">
                {principle.number}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{principle.principle}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{principle.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
