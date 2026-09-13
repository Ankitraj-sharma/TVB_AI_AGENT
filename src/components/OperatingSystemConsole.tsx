import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Send, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Share2, 
  Calendar, 
  Clock, 
  AlertCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { TVB_ORBITS, TVB_HUBS, NETWORK_COMPANIES } from '../data/tvbData';

export const OperatingSystemConsole: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'audit' | 'intro' | 'meeting' | 'ledger'>('audit');
  const [copiedText, setCopiedText] = useState(false);

  // Tool 1: Venture Audit State
  const [companyName, setCompanyName] = useState('Pulsar Health');
  const [stage, setStage] = useState('Series Seed');
  const [arr, setArr] = useState('$2.1M');
  const [sector, setSector] = useState('Healthcare Orbit');
  const [coreChallenge, setCoreChallenge] = useState('Enterprise GTM and state Medicaid HIE pilot access');
  const [targetHub, setTargetHub] = useState('Austin / Texas Hub');
  const [productDesc, setProductDesc] = useState('Care coordination and social determinants of health (SDOH) relationship layer connecting community providers to enterprise payers.');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  // Tool 2: Intro Router State
  const [introSender, setIntroSender] = useState('ThreatWorx');
  const [introRecipient, setIntroRecipient] = useState('Enterprise CISO or Head of Cloud Infrastructure');
  const [introOrbit, setIntroOrbit] = useState('Cybersecurity Orbit');
  const [introContext, setIntroContext] = useState('60-day pilot for automated attack surface assessment and continuous compliance with $0 integration friction.');
  const [introHub, setIntroHub] = useState('Austin / Texas');
  const [introLoading, setIntroLoading] = useState(false);
  const [introResult, setIntroResult] = useState<any>(null);

  // Tool 3: Meeting Capture State
  const [meetingFounder, setMeetingFounder] = useState('Ankit Sharma');
  const [meetingCompany, setMeetingCompany] = useState('Wizcrow');
  const [meetingStage, setMeetingStage] = useState('Seed');
  const [meetingNotes, setMeetingNotes] = useState('Built multi-agent autonomous workflow engine in India Hub. Traction: $900k ARR. Blockers: Needs US market access, Fortune 1000 sandbox pilots, and enterprise pricing redesign. Ready for Austin Hub launchpad.');
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [meetingResult, setMeetingResult] = useState<any>(null);

  // Quick preset loader
  const loadPreset = (companyKey: string) => {
    const found = NETWORK_COMPANIES.find(c => c.name.toLowerCase().includes(companyKey.toLowerCase()));
    if (found) {
      setCompanyName(found.name);
      setStage(found.stage);
      setArr(found.arrEstimate);
      setSector(found.orbit.toUpperCase() + ' Orbit');
      setCoreChallenge(found.operatingNeeds.join(', '));
      setProductDesc(found.description);
    }
  };

  // Run AI Venture Audit
  const handleRunAudit = async () => {
    setAuditLoading(true);
    setAuditResult(null);
    try {
      const res = await fetch('/api/ai/venture-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          stage,
          arr,
          sector,
          coreChallenge,
          targetGeographies: [targetHub],
          productDescription: productDesc
        })
      });
      const data = await res.json();
      if (data.data) {
        setAuditResult(data.data);
      }
    } catch (err) {
      console.error('Audit run failed:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  // Run AI Intro Router
  const handleRunIntro = async () => {
    setIntroLoading(true);
    setIntroResult(null);
    try {
      const res = await fetch('/api/ai/intro-router', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderCompany: introSender,
          targetPersona: introRecipient,
          targetOrbit: introOrbit,
          context: introContext,
          originHub: introHub
        })
      });
      const data = await res.json();
      if (data.data) {
        setIntroResult(data.data);
      }
    } catch (err) {
      console.error('Intro route failed:', err);
    } finally {
      setIntroLoading(false);
    }
  };

  // Run Meeting Prep
  const handleRunMeeting = async () => {
    setMeetingLoading(true);
    setMeetingResult(null);
    try {
      const res = await fetch('/api/ai/meeting-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderName: meetingFounder,
          company: meetingCompany,
          stage: meetingStage,
          notes: meetingNotes
        })
      });
      const data = await res.json();
      if (data.data) {
        setMeetingResult(data.data);
      }
    } catch (err) {
      console.error('Meeting prep failed:', err);
    } finally {
      setMeetingLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 mb-2 uppercase tracking-wide">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>TVB Operating System • Section 10</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              Venture Operations Orchestration Layer
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              <strong>Operational Target:</strong> "Automate roughly 80% of venture operations while keeping high-trust human judgment in the most important relationship moments."
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-right space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">System Status</span>
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Intelligent Pipeline Active</span>
            </div>
            <span className="text-[11px] text-slate-400">80% Automation • 20% Operator Trust</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTool('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTool === 'audit'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Venture Execution Audit</span>
        </button>

        <button
          onClick={() => setActiveTool('intro')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTool === 'intro'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Double-Opt-In Intro Router</span>
        </button>

        <button
          onClick={() => setActiveTool('meeting')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTool === 'meeting'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Meeting Capture & Follow-up</span>
        </button>

        <button
          onClick={() => setActiveTool('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTool === 'ledger'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>TVB 3-Stage Core Workflow</span>
        </button>
      </div>

      {/* Tool 1: AI Venture Audit */}
      {activeTool === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Intake Form */}
          <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-white">Startup Profile Intake</h3>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span>Presets:</span>
                <button onClick={() => loadPreset('Pulsar')} className="text-cyan-400 hover:underline">Pulsar</button>
                <span>•</span>
                <button onClick={() => loadPreset('ThreatWorx')} className="text-cyan-400 hover:underline">ThreatWorx</button>
                <span>•</span>
                <button onClick={() => loadPreset('Wizcrow')} className="text-cyan-400 hover:underline">Wizcrow</button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Scale-Up / Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>Pre-Seed</option>
                    <option>Seed</option>
                    <option>Series A</option>
                    <option>Series B</option>
                    <option>Growth ($10M-$40M)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Current ARR</label>
                  <input
                    type="text"
                    value={arr}
                    onChange={(e) => setArr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Sector / Orbit</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {TVB_ORBITS.map(o => (
                      <option key={o.id} value={o.name}>{o.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Primary Expansion Hub</label>
                  <select
                    value={targetHub}
                    onChange={(e) => setTargetHub(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {TVB_HUBS.map(h => (
                      <option key={h.id} value={h.name}>{h.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Primary Scaling Challenge</label>
                <input
                  type="text"
                  value={coreChallenge}
                  onChange={(e) => setCoreChallenge(e.target.value)}
                  placeholder="e.g. Enterprise GTM, pricing packaging, or capital readiness"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Product & Traction Overview</label>
                <textarea
                  rows={3}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleRunAudit}
                disabled={auditLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/10 mt-4"
              >
                {auditLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Synthesizing TVB Execution Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run TVB Venture Catalyst Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audit Results */}
          <div className="lg:col-span-7">
            {auditResult ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Audit Generated for {companyName}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-1">
                      Execution Strategy Dossier
                    </h3>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-slate-400 block">Orbit Pairing:</span>
                    <span className="font-bold text-cyan-400">{auditResult.recommendedOrbit}</span>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    Operator Assessment
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{auditResult.executiveSummary}"
                  </p>
                </div>

                {/* Four Engines Action Plan */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                    4-Engine Operational Deployment
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Advisory */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                        1. Executive Advisory
                      </span>
                      {auditResult.fourEngineActionPlan.executiveAdvisory.map((item: any, i: number) => (
                        <div key={i} className="text-xs text-slate-300">
                          <strong className="text-white">{item.role}:</strong> {item.focus}
                        </div>
                      ))}
                    </div>

                    {/* Market Access */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                        2. Market Access
                      </span>
                      {auditResult.fourEngineActionPlan.marketAccess.map((item: any, i: number) => (
                        <div key={i} className="text-xs text-slate-300">
                          <strong className="text-white">{item.targetBuyer}:</strong> {item.pilotRoute}
                        </div>
                      ))}
                    </div>

                    {/* Marketplace */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                        3. Scale-Up Marketplace (Costco)
                      </span>
                      {auditResult.fourEngineActionPlan.scaleUpMarketplace.map((item: any, i: number) => (
                        <div key={i} className="text-xs text-slate-300">
                          <strong className="text-white">{item.category}:</strong> {item.whyCostcoModel}
                        </div>
                      ))}
                    </div>

                    {/* Capital Readiness */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                        4. Capital Readiness
                      </span>
                      <div className="text-xs text-slate-300">
                        <strong className="text-white">Instrument:</strong> {auditResult.fourEngineActionPlan.capitalReadiness.instrument}
                      </div>
                      <div className="text-xs text-slate-300">
                        <strong className="text-white">Narrative:</strong> {auditResult.fourEngineActionPlan.capitalReadiness.narrativeFocus}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12-Week Roadmap */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Immediate 12-Week Operational Cadence
                  </h4>
                  <div className="space-y-2">
                    {auditResult.immediateExecutionRoadmap.map((item: any, i: number) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                        <span className="font-mono text-cyan-400 font-semibold">{item.week}</span>
                        <span className="text-slate-400 font-medium">{item.ritual}:</span>
                        <span className="text-white font-medium">{item.deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Economic Alignment footer */}
                <div className="p-3 rounded-xl bg-slate-950 text-xs border border-slate-800 flex flex-wrap justify-between items-center text-slate-400">
                  <span>Advisor Equity: <strong className="text-white">{auditResult.economicAlignment.suggestedAdvisorEquityRange}</strong></span>
                  <span>Channel Fee: <strong className="text-cyan-400">{auditResult.economicAlignment.tvbChannelFee}</strong></span>
                  <span>Referral Split: <strong className="text-indigo-400">{auditResult.economicAlignment.referralShare}</strong></span>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white">No Audit Run Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Fill in the company profile on the left or choose one of the pre-loaded scale-ups (Pulsar, ThreatWorx, Wizcrow) to generate an actionable execution plan.
                </p>
                <button
                  onClick={handleRunAudit}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
                >
                  Generate Sample Plan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tool 2: Double-Opt-In Intro Router */}
      {activeTool === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="font-display font-bold text-base text-white">Route Warm Introduction</h3>
            <p className="text-xs text-slate-400">
              Generate operator-vetted, high-trust intro briefs adhering strictly to TVB's double-opt-in standard.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Originating Scale-Up</label>
                <input
                  type="text"
                  value={introSender}
                  onChange={(e) => setIntroSender(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Target Decision-Maker Persona</label>
                <input
                  type="text"
                  value={introRecipient}
                  onChange={(e) => setIntroRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Target Orbit</label>
                  <select
                    value={introOrbit}
                    onChange={(e) => setIntroOrbit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {TVB_ORBITS.map(o => (
                      <option key={o.id} value={o.name}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Origin Hub</label>
                  <select
                    value={introHub}
                    onChange={(e) => setIntroHub(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {TVB_HUBS.map(h => (
                      <option key={h.id} value={h.name.split('/')[0].trim()}>{h.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Specific Value Proposition / Offer</label>
                <textarea
                  rows={3}
                  value={introContext}
                  onChange={(e) => setIntroContext(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleRunIntro}
                disabled={introLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/10 mt-4"
              >
                {introLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Formatting Double-Opt-In Brief...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Generate Operator Intro Brief</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            {introResult ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Operator Intro Dossier</h3>
                    <p className="text-xs text-slate-400">Pre-cleared double-opt-in draft & talk track</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Match Compatibility:</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {introResult.routingScore}% Fit
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Draft Subject Line:</span>
                    <span className="text-cyan-400 font-medium">{introResult.subjectLine}</span>
                  </div>

                  {/* Email Draft */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative group">
                    <button
                      onClick={() => copyToClipboard(introResult.doubleOptInDraft)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed pr-16">
                      {introResult.doubleOptInDraft}
                    </pre>
                  </div>
                </div>

                {/* Operator Talking Points */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                    Operator Context & Talking Points
                  </span>
                  <div className="space-y-1.5">
                    {introResult.talkingPoints.map((point: string, i: number) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Economic Attribution */}
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200">
                  <strong className="text-white">TVB Attribution Ledger:</strong> {introResult.economicTracking}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white">No Intro Drafted Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Input recipient role and value context on the left to generate an engineered double-opt-in briefing with automatic economic tracking.
                </p>
                <button
                  onClick={handleRunIntro}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
                >
                  Generate Sample Intro
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tool 3: Meeting Capture & Follow-Up */}
      {activeTool === 'meeting' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="font-display font-bold text-base text-white">Discovery Call Ingest</h3>
            <p className="text-xs text-slate-400">
              Paste raw founder call notes to instantly produce a TVB Operator Action Dossier and follow-up draft.
            </p>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Founder Name</label>
                  <input
                    type="text"
                    value={meetingFounder}
                    onChange={(e) => setMeetingFounder(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Company Name</label>
                  <input
                    type="text"
                    value={meetingCompany}
                    onChange={(e) => setMeetingCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Raw Meeting Notes / Scratchpad</label>
                <textarea
                  rows={5}
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <button
                onClick={handleRunMeeting}
                disabled={meetingLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/10 mt-2"
              >
                {meetingLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Parsing Operational Action Items...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate Operator Dossier & Follow-Up</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            {meetingResult ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Call Processing Results</h3>
                    <p className="text-xs text-slate-400">Automated intake converted into action plan</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">{meetingResult.orbitHubRouting}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">Identified GTM Blockers</span>
                  <div className="space-y-1">
                    {meetingResult.identifiedBlockers.map((b: string, i: number) => (
                      <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300">
                        • {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block">
                    Recommended Costco Marketplace Partners
                  </span>
                  <div className="space-y-1">
                    {meetingResult.costcoMarketplaceRecommendations.map((r: string, i: number) => (
                      <div key={i} className="p-2 rounded bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200">
                        ✓ {r}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                      Draft Follow-Up Email to Founder
                    </span>
                    <button
                      onClick={() => copyToClipboard(meetingResult.followUpEmailToFounder)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed">
                    {meetingResult.followUpEmailToFounder}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-white">No Notes Analyzed</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Paste notes from any founder discovery session to extract blockers, orbit routing, and a ready-to-send follow-up email.
                </p>
                <button
                  onClick={handleRunMeeting}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
                >
                  Process Sample Notes
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tool 4: 3-Stage Core Workflow Architecture */}
      {activeTool === 'ledger' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">PDF Section 10: TVB Operating System</span>
              <h2 className="text-2xl font-display font-bold text-white mt-1">
                The 3-Stage Venture Scaling Workflow
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                How TVB moves companies from initial signal to lasting enterprise outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stage 1 */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                    01
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Intake Layer</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Lead to Prospect</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Multi-channel intake across social media, website, founder events, partner channels, and warm referrals from investors and advisors.
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <div>• Automated meeting capture</div>
                  <div>• Initial founder profile generation</div>
                  <div>• Orbit & Hub affinity scoring</div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                    02
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Qualification</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Prospect to Customer</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-trust discovery call, operator fit assessment, outcome-aligned agreement structuring, and full ecosystem mapping.
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <div>• Advisor equity agreement setup</div>
                  <div>• 20% distribution channel scoping</div>
                  <div>• Costco marketplace perk unblocking</div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    03
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Value Delivery</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Customer Success & Growth</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Active routing to advisors, partners, investors, or market access paths. Track warm introductions, capture outcome economics, and feed learnings into the flywheel.
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <div>• Double-opt-in intro routing</div>
                  <div>• Deal & revenue attribution ledger</div>
                  <div>• Proof points converted to playbooks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
