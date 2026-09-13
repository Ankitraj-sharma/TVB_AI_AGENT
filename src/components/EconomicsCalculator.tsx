import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  ShieldCheck, 
  Award, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { ADVISOR_EQUITY_FRAMEWORK } from '../data/tvbData';

export const EconomicsCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equity' | 'revenue-share' | 'costco-savings'>('equity');

  // Equity Calculator State
  const [companyValuation, setCompanyValuation] = useState<number>(15000000); // $15M
  const [exitValuation, setExitValuation] = useState<number>(100000000); // $100M
  const [equityTier, setEquityTier] = useState<number>(1); // 0: Standard, 1: Strategic, 2: Expert
  const [selectedEquityPercent, setSelectedEquityPercent] = useState<number>(0.40); // 0.40%

  // Revenue Share Calculator State
  const [channelDealSize, setChannelDealSize] = useState<number>(500000); // $500k enterprise contract
  const [tvbDistributionFeePercent, setTvbDistributionFeePercent] = useState<number>(20); // 20%
  const [referralPartnerSplitPercent, setReferralPartnerSplitPercent] = useState<number>(5); // 4-6% directional in PDF

  // Costco Savings State
  const [fractionalCfoHours, setFractionalCfoHours] = useState<number>(15);
  const [abmOutboundNeeded, setAbmOutboundNeeded] = useState<boolean>(true);
  const [soc2ComplianceSprint, setSoc2ComplianceSprint] = useState<boolean>(true);
  const [legalSafePackage, setLegalSafePackage] = useState<boolean>(true);

  // Derived Calculations
  const currentEquityValue = (companyValuation * selectedEquityPercent) / 100;
  const projectedExitValue = (exitValuation * selectedEquityPercent) / 100;

  const tvbChannelFeeTotal = (channelDealSize * tvbDistributionFeePercent) / 100;
  const referralPayoutTotal = (channelDealSize * referralPartnerSplitPercent) / 100;
  const netScaleUpRevenue = channelDealSize - tvbChannelFeeTotal;
  const netTvbRetained = tvbChannelFeeTotal - referralPayoutTotal;

  // Traditional hiring cost comparison:
  // Full-time VP of Sales base ($220k) + OTE ($180k) + Benefits ($40k) + recruiter fee ($60k) = $500k
  const traditionalFixedBurn = 500000;
  const cashBurnPreserved = traditionalFixedBurn - tvbChannelFeeTotal;

  // Costco savings math:
  // Fractional CFO: Traditional $350/hr vs TVB $195/hr
  const cfoSavings = fractionalCfoHours * (350 - 195) * 12;
  const abmSavings = abmOutboundNeeded ? 40000 : 0; // Traditional $8k/mo retainer vs TVB milestone
  const soc2Savings = soc2ComplianceSprint ? 25000 : 0; // Traditional Big4/Consulting $45k vs TVB $20k sprint
  const legalSavings = legalSafePackage ? 18000 : 0; // Traditional billable hours $35k vs TVB fixed package $17k
  const totalAnnualSavings = cfoSavings + abmSavings + soc2Savings + legalSavings;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-950 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Section 4, 5 & 6: Outcome Economics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              Outcome-Aligned Financial Model
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              "The core principle is that TVB should win when the founder, partner, and ecosystem win." Explore interactive simulators for the Advisor Equity Framework, 20% TVB Distribution Channel Revenue Share, and "Costco for Scale-ups" cash preservation.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('equity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'equity'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Advisor Equity
            </button>
            <button
              onClick={() => setActiveTab('revenue-share')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'revenue-share'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Market Access (20%)
            </button>
            <button
              onClick={() => setActiveTab('costco-savings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'costco-savings'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Runway Preserved
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Advisor Equity Framework */}
      {activeTab === 'equity' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">PDF Section 6.3: Advisor Payments</span>
              <h2 className="text-xl font-display font-bold text-white mt-1">
                Advisor Equity Framework Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                "Source material includes an advisor equity framework with ranges by company stage and advisor involvement."
              </p>
            </div>

            {/* Tier Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ADVISOR_EQUITY_FRAMEWORK.map((framework, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setEquityTier(i);
                    if (i === 0) setSelectedEquityPercent(0.20);
                    else if (i === 1) setSelectedEquityPercent(0.40);
                    else setSelectedEquityPercent(0.80);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    equityTier === i
                      ? 'bg-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    {framework.tier}
                  </span>
                  <div className="text-lg font-bold text-amber-400 mb-1">{framework.range}</div>
                  <span className="text-[11px] text-slate-400 block mb-2">{framework.commitment}</span>
                  <p className="text-[11px] text-slate-400 leading-snug">{framework.focus}</p>
                </div>
              ))}
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Selected Equity Grant Percentage</span>
                  <span className="text-amber-400 font-mono text-sm">{selectedEquityPercent.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="1.50"
                  step="0.05"
                  value={selectedEquityPercent}
                  onChange={(e) => setSelectedEquityPercent(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>0.10% (Min)</span>
                  <span>Standard (0.15-0.25%)</span>
                  <span>Strategic (0.30-0.50%)</span>
                  <span>Expert (0.60-1.00%)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Current Company Post-Money Valuation</span>
                  <span className="text-white font-mono text-sm">${(companyValuation / 1000000).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="1000000"
                  value={companyValuation}
                  onChange={(e) => setCompanyValuation(parseInt(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Target Exit / Enterprise Valuation</span>
                  <span className="text-emerald-400 font-mono text-sm">${(exitValuation / 1000000).toFixed(0)}M</span>
                </div>
                <input
                  type="range"
                  min="20000000"
                  max="500000000"
                  step="10000000"
                  value={exitValuation}
                  onChange={(e) => setExitValuation(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-800 rounded-lg h-2"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 block">
                Outcome Alignment Summary
              </span>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Current Paper Value</span>
                <div className="text-2xl font-bold text-white">${currentEquityValue.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400">At ${(companyValuation/1000000).toFixed(1)}M valuation</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">
                  Projected Value at ${(exitValuation/1000000).toFixed(0)}M Exit
                </span>
                <div className="text-3xl font-extrabold text-emerald-400">
                  ${projectedExitValue.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-300/80">
                  {((exitValuation / companyValuation)).toFixed(1)}x multiple on operational upside
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Keeps upfront cash burden zero for founders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Standardized 2-year vesting with 1-year cliff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Aligned with long-term enterprise value</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 text-[11px] text-slate-400 border border-slate-800/80 italic">
              "These percentages should be treated as reference ranges, not automatic defaults." (TVB Reference Note)
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Revenue Share & Distribution Fees */}
      {activeTab === 'revenue-share' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">PDF Section 4.2 & 6.1: Revenue Share</span>
              <h2 className="text-xl font-display font-bold text-white mt-1">
                Market Access & Channel Partner Split Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                "TVB may take a distribution or market access fee, such as 20% of revenue generated through a TVB-led channel. If a referral partner sourced the lead, they receive a portion (e.g. 4% to 6%)."
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Closed TVB-Led Channel Deal Contract Value</span>
                  <span className="text-emerald-400 font-mono text-base">${channelDealSize.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="25000"
                  value={channelDealSize}
                  onChange={(e) => setChannelDealSize(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$50k Pilot</span>
                  <span>$250k Mid-Market</span>
                  <span>$500k Enterprise</span>
                  <span>$1M+ Multi-Year</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>TVB Distribution Fee</span>
                    <span className="text-cyan-400 font-mono font-bold">{tvbDistributionFeePercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={tvbDistributionFeePercent}
                    onChange={(e) => setTvbDistributionFeePercent(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-2"
                  />
                  <span className="text-[10px] text-slate-400">Directional baseline from PDF: 20%</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Referral Partner Payout</span>
                    <span className="text-indigo-400 font-mono font-bold">{referralPartnerSplitPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.5"
                    value={referralPartnerSplitPercent}
                    onChange={(e) => setReferralPartnerSplitPercent(parseFloat(e.target.value))}
                    className="w-full accent-indigo-400 bg-slate-800 rounded-lg h-2"
                  />
                  <span className="text-[10px] text-slate-400">Directional baseline from PDF: 4% - 6%</span>
                </div>
              </div>
            </div>

            {/* Waterfall Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                Transaction Economics Waterfall
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-300">Total Enterprise Customer Payment:</span>
                  <span className="font-bold text-white font-mono">${channelDealSize.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80 text-emerald-400">
                  <span>Net Revenue to Founder Scale-Up ({100 - tvbDistributionFeePercent}%):</span>
                  <span className="font-bold font-mono">+${netScaleUpRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80 text-indigo-300">
                  <span>Referral Partner Payout ({referralPartnerSplitPercent}%):</span>
                  <span className="font-bold font-mono">+${referralPayoutTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-cyan-400">
                  <span>TVB Platform Operating Share ({tvbDistributionFeePercent - referralPartnerSplitPercent}%):</span>
                  <span className="font-bold font-mono">+${netTvbRetained.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Comparison Side Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block">
                Burn Avoidance Analysis
              </span>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Traditional In-House Enterprise Sales Team</span>
                <div className="text-xl font-bold text-rose-400">-$500,000 / yr</div>
                <p className="text-[11px] text-slate-400">Base salaries + recruiter fees + SDR overhead, regardless of whether a single deal closes.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">TVB Market Access Model</span>
                <div className="text-xl font-bold text-emerald-400">$0 Fixed Upfront</div>
                <p className="text-[11px] text-emerald-300/80">
                  Pay only 20% on closed deals. You retain 80% with immediate positive cash-flow margin from day 1.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-300 space-y-1 border border-slate-800">
                <span className="font-bold text-white block">Key Takeaway:</span>
                <p>Execution beats advice. Market access is a pre-negotiated product, not an ongoing payroll liability.</p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 text-center">
              Directional examples per Section 4.2 & 6.1
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Costco for Scale-ups Savings */}
      {activeTab === 'costco-savings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">PDF Section 2.3: Scale-Up Marketplace</span>
              <h2 className="text-xl font-display font-bold text-white mt-1">
                "Costco for Scale-Ups" Annual Runway Preservation
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculate the exact capital saved by leveraging TVB pre-negotiated member pricing instead of full-time C-suite hires and agency retainers.
              </p>
            </div>

            <div className="space-y-4">
              {/* CFO Slider */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Monthly Fractional CFO / Finance Operator Hours</span>
                  <span className="text-emerald-400 font-mono font-bold">{fractionalCfoHours} hrs / mo</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={fractionalCfoHours}
                  onChange={(e) => setFractionalCfoHours(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-800 rounded-lg h-2"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Standard Rate: $350/hr</span>
                  <span className="text-emerald-400 font-medium">TVB Member Rate: $195/hr</span>
                  <span>Annual Savings: <strong>${cfoSavings.toLocaleString()}</strong></span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={abmOutboundNeeded}
                      onChange={(e) => setAbmOutboundNeeded(e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Milestone-Based Enterprise Demand Gen (ABM)</div>
                      <div className="text-[11px] text-slate-400">$0 retainer; pay only per verified C-level discovery meeting</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">+$40,000 / yr</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={soc2ComplianceSprint}
                      onChange={(e) => setSoc2ComplianceSprint(e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Automated SOC2 / HIPAA Fast-Track Bundle</div>
                      <div className="text-[11px] text-slate-400">Pre-configured auditor mesh vs traditional consulting firms</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">+$25,000</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={legalSafePackage}
                      onChange={(e) => setLegalSafePackage(e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Fixed-Fee SAFE & Series A Venture Legal Package</div>
                      <div className="text-[11px] text-slate-400">Apex Venture Legal with 30% equity deferral option</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">+$18,000</span>
                </label>
              </div>
            </div>
          </div>

          {/* Costco Totals Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block">
                Total Runway Preserved
              </span>

              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/40 space-y-1">
                <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">
                  Annual Capital Saved
                </span>
                <div className="text-3xl font-extrabold text-emerald-400">
                  ${totalAnnualSavings.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Equivalent to <strong>{(totalAnnualSavings / 18000).toFixed(1)} months</strong> of additional runway for an early-stage engineering team.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>No upfront recruiting headhunter fees (typical 20-25% of salary)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Cloud Consortium credits: up to $150,000 (AWS/GCP/Azure)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Make.com Pro Tier + Remote People 15% discount active</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-400 border border-slate-800">
              "The purpose is to help founders avoid hiring full-time teams too early while still getting high-quality execution capacity."
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
