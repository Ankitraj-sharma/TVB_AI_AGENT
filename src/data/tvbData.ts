import { 
  GrowthEngine, 
  Orbit, 
  Hub, 
  NetworkCompany, 
  MarketplacePartner, 
  CadenceRitual, 
  FlywheelStep, 
  StrategicPrinciple, 
  PersonaType,
  TeamMember,
  TVBPartner
} from '../types';

export const TVB_ONE_LINER = {
  headline: 'The AI-Powered Venture Catalyst Platform',
  thesis: 'The future of scaling is not advising. It is execution.',
  summary: 'The Venture Build (TVB) helps ambitious startups and scale-ups grow through execution, market access, operator support, partner ecosystems, and capital readiness. TVB is not a traditional advisor, accelerator, consulting firm, broker, or venture fund. It is designed as an operating ecosystem for companies that need leverage beyond money.',
  bigIdea: {
    venture: 'Traditional venture gives capital.',
    consulting: 'Traditional consulting gives advice.',
    accelerator: 'Traditional accelerators give programming.',
    tvb: 'TVB gives founders an execution ecosystem.'
  },
  strategicEndState: [
    'A venture operating system',
    'A marketplace for scale-up execution',
    'A trusted network for investors',
    'A growth channel for partners',
    'A market access engine for founders',
    'A launchpad for global scale-ups',
    'A vertical and geographic ecosystem through Orbits and Hubs',
    'An AI-powered platform that automates venture operations at scale'
  ]
};

export const PERSONA_DATA: Record<PersonaType, {
  title: string;
  badge: string;
  positioning: string;
  coreBenefit: string;
  keyFeatures: string[];
  cta: string;
}> = {
  founder: {
    title: 'Founders & Scale-Ups',
    badge: 'Seed to Series A/B • $2M to $20M ARR',
    positioning: 'TVB becomes your execution partner for the parts of scaling that are hardest to build alone: GTM, market access, funding readiness, fractional leadership, and trusted partners.',
    coreBenefit: 'Avoid hiring expensive full-time executives too early while unlocking instant enterprise buyers and vetted execution partners.',
    keyFeatures: [
      'Direct Market Access to enterprise buyers & corporate innovation groups',
      'Fractional CXO operator pairings (CRO, CMO, CFO, CTO) tied to outcomes',
      '"Costco for Scale-ups" pre-negotiated marketplace rates & tooling perks',
      'Capital readiness, narrative refinement, and investor mapping without broker fees'
    ],
    cta: 'Initiate Founder Venture Audit'
  },
  advisor: {
    title: 'Advisors & Operators',
    badge: 'Fractional CXOs & Enterprise Leaders',
    positioning: 'Experienced operators, executives, and domain experts who support founders with high-trust execution, receiving outcome-aligned upside.',
    coreBenefit: 'Work with pre-screened, validated scale-ups with clear mandates, standardized equity frameworks, and automated operational orchestration.',
    keyFeatures: [
      'Standardized equity frameworks (Standard 0.15-0.25%, Strategic 0.30-0.50%, Expert 0.60-1.00%)',
      'Hybrid compensation models (Cash retainers, milestone fees, fractional leadership, equity)',
      'Dedicated vertical Orbits matching your exact industry domain expertise',
      'Zero administrative overhead: TVB OS handles contract scoping, onboarding, and tracking'
    ],
    cta: 'Explore Operator Orbits'
  },
  investor: {
    title: 'Investors & Capital Partners',
    badge: 'VCs, Angels, Family Offices, PE',
    positioning: 'TVB helps de-risk venture execution by surrounding high-potential companies with operators, market access, and a curated execution ecosystem.',
    coreBenefit: 'Receive better prepared deal flow, bridge portfolio execution gaps post-investment, and surface revenue signals before traditional market rounds.',
    keyFeatures: [
      'De-risked deal flow: Companies have vetted unit economics and market-access pilots',
      'Post-investment acceleration: Leverage TVB engines to unblock portfolio GTM bottlenecks',
      'Monthly Investor Roundtables and quarterly Orbit showcases',
      'Warm co-investment and SPV syndicate pathways across Hubs'
    ],
    cta: 'Access Curated Deal Flow'
  },
  partner: {
    title: 'Service & Ecosystem Partners',
    badge: 'Agencies, Tech Platforms, Referral Allies',
    positioning: 'TVB gives partners access to qualified founders and ecosystem opportunities while creating aligned revenue paths through referrals, services, marketplace participation, and channel collaboration.',
    coreBenefit: 'High-intent scale-up clients without customer acquisition friction, backed by transparent referral economics (4%-6% payout / marketplace margin).',
    keyFeatures: [
      'Featured placement in the TVB Scale-Up Marketplace ("Costco for scale-ups")',
      'Predictable referral economics tied to closed transactions',
      'Cross-selling within Orbits alongside complementary vetted providers',
      'Co-branded content, perk spotlights, and monthly partner showcases'
    ],
    cta: 'List Service in Marketplace'
  },
  corporate: {
    title: 'Corporates & Enterprise Partners',
    badge: 'Fortune 1000 & Innovation Groups',
    positioning: 'TVB gives corporates a curated path to innovation, pilots, startup partnerships, and venture-backed solutions without having to source and vet every company from scratch.',
    coreBenefit: 'Accelerate digital transformation with pre-vetted enterprise-ready scale-ups that meet security, compliance, and integration standards.',
    keyFeatures: [
      'Targeted 60-day to 90-day pilot sprints with defined KPI gates',
      'First-look access to emerging solutions across Cybersecurity, AI, Digital Twin, and Health',
      'Sponsored corporate innovation programs and venture scouting nodes',
      'Strategic alliance and channel distribution pathways'
    ],
    cta: 'Explore Enterprise Pilots'
  }
};

export const GROWTH_ENGINES: GrowthEngine[] = [
  {
    id: 'executive-advisory',
    number: 1,
    title: 'Executive Advisory',
    tagline: 'Operator-led, not mentor-led execution support',
    description: 'TVB gives founders access to seasoned operators who have built and scaled companies. The focus is actionable decision support, fractional CXO leadership, and immediate problem-solving rather than high-level passive mentorship.',
    capabilities: [
      'Go-to-market (GTM) strategy & enterprise ICP design',
      'Product positioning, value proposition, and narrative',
      'Pricing & packaging optimization for enterprise deals',
      'Sales strategy, pipeline hygiene, and outbound motions',
      'Fractional CXO support (Fractional CMO, CFO, COO, CRO, CTO)',
      'Fundraising readiness & data room hygiene',
      'Investor narrative & pitch deck refinement',
      'Exit and M&A thinking & strategic decision support'
    ],
    operatorPhilosophy: 'The goal is to help founders make better decisions and execute faster with leaders who have sat in the chair before.',
    iconName: 'Compass'
  },
  {
    id: 'market-access',
    number: 2,
    title: 'Market Access',
    tagline: 'Opening high-trust doors to buyers, channels, and pilots',
    description: 'Companies rarely fail from product alone; they fail because they cannot reach the right buyers, channels, and decision-makers fast enough. TVB converts market access into an engineered product with pre-cleared access paths.',
    capabilities: [
      'Enterprise customer discovery and qualified executive meetings',
      'Channel partner co-selling & distribution agreements',
      'Strategic alliances with industry platform leaders',
      'Pilot opportunities with enterprise innovation groups',
      'Corporate innovation group introductions & sandbox trials',
      'Geographic expansion routes across US, Europe, UAE, and India',
      'Industry-specific ecosystem partnerships within vertical Orbits'
    ],
    operatorPhilosophy: 'Market access is one of TVB’s biggest differentiators because revenue traction de-risks all downstream venture dynamics.',
    iconName: 'DoorOpen'
  },
  {
    id: 'scale-up-marketplace',
    number: 3,
    title: 'Scale-Up Marketplace',
    tagline: 'A curated "Costco for Scale-Ups" execution network',
    description: 'A curated execution marketplace giving founders instant access to vetted partners at ecosystem pricing. Avoid hiring bloated full-time teams too early while maintaining elite execution quality.',
    capabilities: [
      'Legal counsel (SAFE agreements, commercial contracts, IP, data privacy)',
      'Finance & Accounting (Fractional CFO, audit readiness, bookkeeping)',
      'Compliance & Security (SOC2, HIPAA, ISO27001 readiness)',
      'Marketing, PR, and strategic media placements',
      'Demand Generation & sales enablement engines',
      'Product development, engineering velocity, and architecture',
      'AI, workflow automation, and agent deployment',
      'Talent, recruiting, and fractional executive staffing',
      'Cloud, tooling, and software perks (AWS, GCP, Make.com, etc.)'
    ],
    operatorPhilosophy: 'Save cash, prevent premature headcount bloat, and get institutional-grade service providers with pre-negotiated terms.',
    iconName: 'ShoppingBag'
  },
  {
    id: 'funding-advisory',
    number: 4,
    title: 'Funding Advisory & Capital Readiness',
    tagline: 'Capital readiness without broker positioning',
    description: 'TVB helps companies prepare for institutional capital, but does not position itself as a broker. TVB’s philosophy is that funding alone does not solve scaling; capital paired with execution and market access creates enduring value.',
    capabilities: [
      'Comprehensive investor readiness audit and gap identification',
      'Pitch refinement and narrative stress-testing',
      'Data room structure, cap table hygiene, and metric modeling',
      'Fundraising strategy and timing optimization',
      'Targeted investor mapping (VCs, family offices, strategics)',
      'Warm investor introductions where strategically appropriate',
      'Capital structure thinking (Bridge, SAFE, Equity, SPV, strategic capital options)'
    ],
    operatorPhilosophy: 'Capital is an accelerant for an already operating machine. TVB builds the machine first.',
    iconName: 'Coins'
  }
];

export const TVB_ORBITS: Orbit[] = [
  {
    id: 'healthcare',
    name: 'Healthcare Orbit',
    headline: 'Digital health, care coordination, trust infrastructure & HIE integration',
    focusAreas: [
      'Digital health platforms & clinical workflows',
      'Social determinants of health (SDOH)',
      'Care coordination & patient journey routing',
      'Health Information Exchange (HIE) partnerships',
      'Closed-loop referrals across community providers',
      'Consent, governance, and clinical trust infrastructure'
    ],
    relatedInitiatives: [
      'HookMhealth as trust layer',
      'Pulsar Health as relationship / social care workflow layer'
    ],
    companies: ['HookMhealth', 'Pulsar Health'],
    keyAdvisors: ['Chief Medical Officers', 'Health System Innovation Leads', 'HIPAA/Compliance Counsel'],
    color: '#06b6d4'
  },
  {
    id: 'education',
    name: 'Education Orbit',
    headline: 'Workforce development, community colleges, and AI-personalized skills',
    focusAreas: [
      'Workforce development & upskilling pathways',
      'Community college system integrations',
      'Modular micro-credential learning systems',
      'Apprenticeships & internship pipelines',
      'Skills-based hiring & education matching',
      'AI-personalized learning & retention engines'
    ],
    relatedInitiatives: [
      'The Venture Nest',
      'Mask NextGen'
    ],
    companies: ['MaskNextGen', 'The Venture Nest'],
    keyAdvisors: ['Higher Ed Provosts', 'Workforce Board Executives', 'EdTech Product Leaders'],
    color: '#8b5cf6'
  },
  {
    id: 'ai',
    name: 'AI Orbit',
    headline: 'Applied enterprise AI, trust & safety, agents, and automation infrastructure',
    focusAreas: [
      'Applied AI vertical domain companies',
      'AI trust, safety, bias, and reliability auditing',
      'Autonomous workflow automation & agent systems',
      'Enterprise AI adoption & change management',
      'AI agents, multi-agent orchestration & tooling',
      'AI infrastructure, inference optimization, and GTM'
    ],
    relatedInitiatives: [
      'Threatworx ecosystem integration',
      'ContextQA autonomous testing framework',
      'Essert.io compliance & trust mesh'
    ],
    companies: ['ThreatWorx', 'ContextQA', 'Essert.io', 'Wizcrow'],
    keyAdvisors: ['Applied AI Researchers', 'Enterprise Chief AI Officers', 'MLOps Infrastructure Architects'],
    color: '#10b981'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Orbit',
    headline: 'Threat posture, compliance automation, risk containment & enterprise security',
    focusAreas: [
      'Early to growth security startups',
      'Automated compliance (SOC2, ISO, FedRAMP)',
      'Continuous enterprise risk management',
      'External scan and attack surface assessment offers',
      'Enterprise security adoption & CISO sales motions'
    ],
    relatedInitiatives: [
      'ThreatWorx attack surface and continuous compliance scanner'
    ],
    companies: ['ThreatWorx'],
    keyAdvisors: ['Former Enterprise CISOs', 'Vulnerability Intelligence Leads', 'DevSecOps Operators'],
    color: '#ef4444'
  },
  {
    id: 'digital-twin',
    name: 'Digital Twin Orbit',
    headline: 'Spatial simulation, physical asset modeling, infrastructure & industrial pilots',
    focusAreas: [
      'Digital twin strategic consulting & architecture',
      'Implementation partner ecosystems',
      'Academia & university engineering partnerships',
      'Infrastructure partners & sensor telemetry',
      'Industrial pilots in smart cities, aerospace & energy'
    ],
    relatedInitiatives: [
      'EDX Digital Twin Infrastructure & Ecosystem Platform'
    ],
    companies: ['EDX'],
    keyAdvisors: ['Industrial Automation Heads', 'BIM/Spatial Computing Leads', 'Infrastructure Engineers'],
    color: '#3b82f6'
  },
  {
    id: 'travel',
    name: 'Travel Orbit',
    headline: 'Travel technology, white-label booking infra, embedded payments & distribution',
    focusAreas: [
      'Modern travel tech stacks & booking APIs',
      'White-label travel infrastructure for brands',
      'Travel payments, cards & currency routing',
      'Global distribution system (GDS) integrations',
      'Strategic capital & hospitality M&A pathways'
    ],
    relatedInitiatives: [
      'Xeni white-label travel booking platform'
    ],
    companies: ['Xeni'],
    keyAdvisors: ['Airline/Hospitality Commercial Execs', 'OTA Distribution Leaders', 'Fintech Card Program Managers'],
    color: '#f59e0b'
  },
  {
    id: 'fintech',
    name: 'Fintech & Payments Orbit',
    headline: 'Prepaid cards, embedded finance, cross-border flows & compliance workflows',
    focusAreas: [
      'Prepaid & commercial card programs',
      'Embedded finance for SaaS & marketplaces',
      'Cross-border payments & treasury routing',
      'Compliance-heavy financial workflows (AML/KYC)',
      'Financial services core infrastructure & sponsor banks'
    ],
    relatedInitiatives: [
      'Xchange.pe cross-border currency rails',
      'Upshot financial intelligence platform'
    ],
    companies: ['Xchange PE', 'Upshot'],
    keyAdvisors: ['Sponsor Bank Relationship Leads', 'Fintech General Counsels', 'Payments Scheme Specialists'],
    color: '#14b8a6'
  }
];

export const TVB_HUBS: Hub[] = [
  {
    id: 'austin',
    name: 'Austin / Texas Hub',
    region: 'North America',
    status: 'Home Base',
    role: [
      'TVB Global Home Base & Operating Headquarters',
      'High-density founder network & weekly operator meetups',
      'Corporate & enterprise innovation relationships across Texas',
      'Academic & workforce partnerships (UT Austin, Texas A&M, Community Colleges)',
      'Digital Twin & Applied AI innovation ecosystem node'
    ],
    strategicBridge: 'Connects Southwestern US enterprise capital to global scale-ups',
    locationDetails: 'Austin, TX • Texas Tech Corridor'
  },
  {
    id: 'uk',
    name: 'UK Hub',
    region: 'Europe',
    status: 'Current Hub',
    role: [
      'European expansion bridgehead for US and Indian companies',
      'Institutional investor, family office & advisor network',
      'Podcast, media, and market access collaborations',
      'London financial center & cross-border regulatory pathways'
    ],
    strategicBridge: 'Two-way bridge between North America and European tech hubs',
    locationDetails: 'London • Tech City'
  },
  {
    id: 'paris',
    name: 'Paris / France Hub',
    region: 'Europe',
    status: 'Current Hub',
    role: [
      'Continental European venture ecosystem gateway',
      'Potential bridge for corporate, AI, and enterprise innovation partnerships',
      'Station F & French Tech sovereign AI ecosystem ties',
      'European Union grant & strategic pilot acceleration'
    ],
    strategicBridge: 'Continental Europe enterprise GTM & AI research collaborations',
    locationDetails: 'Paris • Île-de-France'
  },
  {
    id: 'india',
    name: 'India Hub',
    region: 'Asia Pacific',
    status: 'Current Hub',
    role: [
      'High-velocity founder pipeline across tech & enterprise software',
      'Enterprise delivery & technical engineering scaling capability',
      'Startup ecosystem access with T-Hub and regional ecosystem connections',
      'US and European market expansion support for Indian scale-ups'
    ],
    strategicBridge: 'Global delivery hub and US launchpad for Indian cross-border scale-ups',
    locationDetails: 'Hyderabad (T-Hub) & Bengaluru'
  },
  {
    id: 'uae',
    name: 'UAE Hub',
    region: 'Middle East',
    status: 'Current Hub',
    role: [
      'Middle East & North Africa (MENA) market expansion',
      'Sovereign wealth, family office & institutional capital access',
      'Corporate partnerships across logistics, smart cities, and fintech',
      'Gateway for India, Europe, and US cross-border bridge opportunities'
    ],
    strategicBridge: 'Capital gateway and sovereign innovation corridor for TVB companies',
    locationDetails: 'Dubai (DIFC) & Abu Dhabi (ADGM)'
  },
  {
    id: 'emerging',
    name: 'Emerging TVB Hubs',
    region: 'Global Growth Nodes',
    status: 'Emerging Node',
    role: [
      'Dallas & Houston (Energy transition, healthcare systems, enterprise HQ depth)',
      'Singapore (Southeast Asia GTM bridge & wealth management hub)',
      'LATAM (Nearshore engineering talent & high-growth fintech markets)',
      'Pakistan founder & women entrepreneur network initiative'
    ],
    strategicBridge: 'Expanding the global TVB mesh to capture high-potential geographic nodes',
    locationDetails: 'Dallas • Houston • Singapore • São Paulo • Lahore'
  }
];

export const NETWORK_COMPANIES: NetworkCompany[] = [
  {
    id: 'threatworx',
    name: 'ThreatWorx',
    orbit: 'cybersecurity',
    hub: 'austin',
    stage: 'Series A',
    arrEstimate: '$3.8M',
    description: 'Cloud asset attack surface assessment and continuous compliance platform for high-velocity software engineering teams.',
    operatingNeeds: ['US Enterprise CISO market access', 'Channel partner co-selling program', 'SOC2 automation bundle'],
    tvbIntervention: 'Routing pilots with enterprise innovation groups; paired with Fractional CRO for enterprise tier pricing.',
    tags: ['Cybersecurity', 'Cloud Posture', 'Continuous Assessment', 'Enterprise GTM']
  },
  {
    id: 'mask-nextgen',
    name: 'MaskNextGen',
    orbit: 'education',
    hub: 'austin',
    stage: 'Seed',
    arrEstimate: '$1.4M',
    description: 'Next-generation workforce readiness, vocational training, and apprenticeship intelligence platform for community institutions.',
    operatingNeeds: ['Texas community college partnerships', 'State workforce development grant alignment', 'Investor narrative'],
    tvbIntervention: 'Connected to Texas Hub workforce leaders; refined institutional pitch deck for Series A readiness.',
    tags: ['Workforce Tech', 'Community Colleges', 'Apprenticeships', 'EdTech']
  },
  {
    id: 'upshot',
    name: 'Upshot',
    orbit: 'fintech',
    hub: 'austin',
    stage: 'Series A',
    arrEstimate: '$4.5M',
    description: 'Financial intelligence and automated cash flow analytics platform for middle-market corporate treasuries.',
    operatingNeeds: ['Sponsor bank relationships', 'Fractional CFO support for credit facility', 'Market access to CFO networks'],
    tvbIntervention: 'Integrated into TVB Austin financial network; structuring 20% distribution channel with regional banking partners.',
    tags: ['Treasury', 'Financial Analytics', 'Fintech Infrastructure', 'B2B']
  },
  {
    id: 'wizcrow',
    name: 'Wizcrow',
    orbit: 'ai',
    hub: 'india',
    stage: 'Seed',
    arrEstimate: '$900K',
    description: 'Enterprise autonomous AI agent orchestration and workflow optimization engine for operations-heavy enterprises.',
    operatingNeeds: ['US market expansion', 'Enterprise pilot sandbox access', 'Pricing & packaging restructuring'],
    tvbIntervention: 'Providing US GTM bridge from India Hub to Austin Hub; structured pilot agreements with Fortune 1000 targets.',
    tags: ['Autonomous Agents', 'Workflow AI', 'Cross-Border', 'Enterprise AI']
  },
  {
    id: 'verge',
    name: 'Verge',
    orbit: 'ai',
    hub: 'uk',
    stage: 'Series A',
    arrEstimate: '$5.2M',
    description: 'Data mesh intelligence and enterprise knowledge graph builder powering contextual AI search for global distributed teams.',
    operatingNeeds: ['UK to US expansion', 'Fractional VP of Sales', 'Series B investor syndication'],
    tvbIntervention: 'Routed to UK Hub media & investor network; deployed TVB Costco marketplace partner for US entity formation.',
    tags: ['Knowledge Graph', 'Search AI', 'UK Expansion', 'Scale-up']
  },
  {
    id: 'xchange-pe',
    name: 'Xchange PE',
    orbit: 'fintech',
    hub: 'uae',
    stage: 'Growth ($10M-$40M)',
    arrEstimate: '$14.0M',
    description: 'Private equity transaction exchange and secondary market infrastructure platform for alternative asset funds.',
    operatingNeeds: ['Middle East sovereign fund introductions', 'Cross-border compliance framework', 'SPV execution velocity'],
    tvbIntervention: 'Active representation across UAE Hub and DIFC ecosystem; strategic advisory on SPV capital structures.',
    tags: ['Private Equity', 'Secondary Liquidity', 'MENA Corridor', 'Institutional']
  },
  {
    id: 'hookmhealth',
    name: 'HookMhealth',
    orbit: 'healthcare',
    hub: 'austin',
    stage: 'Seed',
    arrEstimate: '$1.8M',
    description: 'Trust layer and patient consent infrastructure enabling compliant, interoperable health data exchange across health systems.',
    operatingNeeds: ['HIE partnership agreements', 'Hospital system pilot approvals', 'HIPAA governance validation'],
    tvbIntervention: 'Positioned as core trust layer in Healthcare Orbit; facilitated warm intro to regional Texas health networks.',
    tags: ['Consent Mesh', 'HIE Integration', 'Digital Health', 'Trust Infrastructure']
  },
  {
    id: 'pulsar-health',
    name: 'Pulsar Health',
    orbit: 'healthcare',
    hub: 'austin',
    stage: 'Seed',
    arrEstimate: '$2.1M',
    description: 'Relationship and social care workflow layer connecting Medicaid managed care organizations to community service providers.',
    operatingNeeds: ['Closed-loop referral validation', 'Enterprise payer contracts', 'GTM sales motion'],
    tvbIntervention: 'Combined with HookMhealth for joint healthcare GTM offering; 20% TVB distribution channel in place.',
    tags: ['Social Care', 'SDOH', 'Medicaid Workflows', 'Care Coordination']
  },
  {
    id: 'edx',
    name: 'EDX',
    orbit: 'digital-twin',
    hub: 'austin',
    stage: 'Series A',
    arrEstimate: '$6.2M',
    description: 'Industrial digital twin simulation and spatial telemetry software for smart grid, manufacturing, and port operations.',
    operatingNeeds: ['Industry pilot procurement', 'Academic R&D grant leverage', 'European corporate bridge'],
    tvbIntervention: 'Lead anchor in Digital Twin Orbit; coordinating joint demonstration sprint with Paris and Austin Hub partners.',
    tags: ['Digital Twin', 'Industrial IoT', 'Simulation', 'Smart Infrastructure']
  },
  {
    id: 'xeni',
    name: 'Xeni',
    orbit: 'travel',
    hub: 'uk',
    stage: 'Series A',
    arrEstimate: '$7.5M',
    description: 'White-label B2B travel booking infrastructure, inventory aggregator, and embedded travel payment card provider.',
    operatingNeeds: ['Strategic travel corporate capital', 'M&A advisory', 'Global distribution channel partners'],
    tvbIntervention: 'Anchoring TVB Travel Orbit; navigating strategic capital and M&A pathways with European hospitality conglomerates.',
    tags: ['Travel Tech', 'White-label Booking', 'Embedded Cards', 'B2B Travel']
  },
  {
    id: 'contextqa',
    name: 'ContextQA',
    orbit: 'ai',
    hub: 'india',
    stage: 'Seed',
    arrEstimate: '$1.1M',
    description: 'Autonomous AI-driven regression testing and software reliability orchestration for cloud-native applications.',
    operatingNeeds: ['US demand generation engine', 'Enterprise buyer introductions', 'Pitch refinement for Silicon Valley VCs'],
    tvbIntervention: 'Selected for TVB Costco demand gen bundle; generated 12 enterprise pilot discovery sessions within 45 days.',
    tags: ['AI QA', 'Software Testing', 'Autonomous Code', 'DevTools']
  },
  {
    id: 'essert-io',
    name: 'Essert.io',
    orbit: 'cybersecurity',
    hub: 'austin',
    stage: 'Series A',
    arrEstimate: '$4.1M',
    description: 'AI data privacy, sovereign compliance, and automated risk management suite for multi-cloud enterprise architectures.',
    operatingNeeds: ['Corporate venture backing', 'Cross-orbit packaging with ThreatWorx', 'Channel distribution'],
    tvbIntervention: 'Packaged into TVB Security & Trust bundle; featured in monthly Investor Roundtable and CISO briefing.',
    tags: ['Data Privacy', 'AI Governance', 'Sovereignty', 'Compliance']
  }
];

export const MARKETPLACE_PARTNERS: MarketplacePartner[] = [
  {
    id: 'make-com',
    name: 'Make.com Partnership',
    category: 'AI & Automation',
    pricingModel: 'Discounted Ecosystem Pricing',
    ecosystemPerk: 'TVB VIP Tier: 6 months free Pro Tier + dedicated solutions architect for enterprise workflows',
    description: 'Visual integration and automated workflow orchestration platform connecting over 1,500 APIs without custom backend code.',
    idealForStage: 'Seed to Series B',
    featured: true
  },
  {
    id: 'remote-people',
    name: 'Remote People',
    category: 'Talent & Recruiting',
    pricingModel: 'Discounted Ecosystem Pricing',
    ecosystemPerk: '15% lower placement fee + 90-day replacement guarantee for fractional and specialized engineering hires',
    description: 'Curated global technical talent and fractional operator network vetted specifically for scale-up pace.',
    idealForStage: 'All Stages',
    featured: true
  },
  {
    id: 'apex-venture-legal',
    name: 'Apex Venture Legal',
    category: 'Legal & Compliance',
    pricingModel: 'Success Fee / Equity',
    ecosystemPerk: 'Fixed-fee SAFE & Series A packages; option to defer 30% of legal fee into advisor equity options',
    description: 'Premier venture counsel specializing in SAFEs, priced equity rounds, IP assignment, and cross-border US flip structures.',
    idealForStage: 'Seed to Series A'
  },
  {
    id: 'fractional-cfo-studio',
    name: 'VentureCFO Studio',
    category: 'Finance & Accounting',
    pricingModel: 'Discounted Ecosystem Pricing',
    ecosystemPerk: 'Comprehensive data room & unit economics audit + 20 hours of monthly fractional CFO time at $195/hr (standard $350)',
    description: 'Experienced scale-up CFOs who prepare financial models, manage monthly board decks, and support institutional due diligence.',
    idealForStage: '$1M to $15M ARR'
  },
  {
    id: 'pipeline-engine-abm',
    name: 'Catalyst Demand Gen',
    category: 'Demand Generation & Sales',
    pricingModel: 'Milestone-Based',
    ecosystemPerk: 'Pay-per-qualified-meeting with verified enterprise buyers; $0 upfront retainer for TVB portfolio',
    description: 'Account-based marketing (ABM) and cold enterprise outbound engine targeting Fortune 1000 decision-makers.',
    idealForStage: '$2M+ ARR with proven PMF'
  },
  {
    id: 'trust-soc2-readiness',
    name: 'ComplianceSprint',
    category: 'Legal & Compliance',
    pricingModel: 'Discounted Ecosystem Pricing',
    ecosystemPerk: 'Guaranteed 30-day SOC2 Type 1 certification path with pre-configured templates & auditor network',
    description: 'Automated compliance orchestration for SOC2, HIPAA, ISO27001, and GDPR tailored for rapid enterprise sales closure.',
    idealForStage: 'Seed to Series A'
  },
  {
    id: 'growth-narrative-pr',
    name: 'Signal & Story PR',
    category: 'Marketing & PR',
    pricingModel: 'Direct Client Payment',
    ecosystemPerk: 'Guaranteed Tier-1 tech press placement (TechCrunch, Forbes, VentureBeat) upon funding or product milestone',
    description: 'B2B enterprise PR agency focused on establishing founder authority, investor narrative, and category leadership.',
    idealForStage: 'Series A / Growth'
  },
  {
    id: 'cloud-scale-perks',
    name: 'TVB Cloud Consortium (AWS/GCP/Azure)',
    category: 'Cloud & Software Perks',
    pricingModel: 'Discounted Ecosystem Pricing',
    ecosystemPerk: 'Up to $150,000 in combined cloud infrastructure credits + 1:1 architectural review with principal cloud engineers',
    description: 'Consortium partnership providing institutional-scale cloud hosting credits and direct support channels.',
    idealForStage: 'Pre-Seed to Series A',
    featured: true
  }
];

export const CADENCE_RITUALS: CadenceRitual[] = [
  {
    frequency: 'Weekly',
    name: 'TVB Weekly Pulse',
    participants: 'Founders, Lead Operators, Hub Directors',
    purpose: 'Rapid 30-minute sync to review weekly traction, identify immediate operational roadblocks, and execute immediate assists.',
    deliverable: 'Weekly execution action item dispatch & blocker unsticking'
  },
  {
    frequency: 'Weekly',
    name: 'Founder / Operator Updates & Warm Asks',
    participants: 'TVB Portfolio & Advisor Network',
    purpose: 'Digest of active company needs, enterprise intro requests, and high-impact operator responses.',
    deliverable: 'Double-opt-in intro routing across the TVB ecosystem mesh'
  },
  {
    frequency: 'Monthly',
    name: 'Scale-Up Showcase',
    participants: 'Founders, Vetted Investors, Enterprise Buyers',
    purpose: 'Curated 60-minute presentation highlighting 3 scale-ups with demonstrated market pull and proven unit economics.',
    deliverable: 'Direct pilot engagement requests and investor follow-up meetings'
  },
  {
    frequency: 'Monthly',
    name: 'Investor Roundtable & Signal Update',
    participants: 'Angel Syndicates, VC Partners, Family Offices',
    purpose: 'Deep dive into emerging vertical trends, cross-border macroeconomic tailwinds, and early revenue signals.',
    deliverable: 'Curated deal flow packets with TVB operator audit notes'
  },
  {
    frequency: 'Monthly',
    name: 'Founder Operator Office Hours & Perk Drop',
    participants: 'Founders, Fractional CXOs, Marketplace Partners',
    purpose: 'Open working sessions on GTM pricing, data room stress-testing, and announcement of new marketplace discounts.',
    deliverable: 'Surgical tactical fixes and newly unlocked software credits'
  },
  {
    frequency: 'Quarterly',
    name: 'Market Access Sprint',
    participants: 'TVB Enterprise Partners, Corporates, Scale-Ups',
    purpose: 'Intensive 2-week structured campaign matching enterprise buyer RFP requirements to TVB portfolio capabilities.',
    deliverable: 'Signed 60-day enterprise pilot agreements with predefined success criteria'
  },
  {
    frequency: 'Quarterly',
    name: 'Orbit Showcase & Hub Expansion Event',
    participants: 'Global TVB Network across all 5 Hubs',
    purpose: 'Flagship gathering rotating between Austin, London, Paris, Hyderabad, and Dubai to cement cross-border corridors.',
    deliverable: 'Cross-border alliance agreements and strategic capital commitments'
  }
];

export const FLYWHEEL_STEPS: FlywheelStep[] = [
  {
    step: 1,
    title: 'Better Founders Join TVB',
    description: 'Attracted by operator execution and zero upfront cash drain, high-caliber founders choose TVB over passive advisors.',
    leveragePoint: 'Selectivity & alignment with real builder needs'
  },
  {
    step: 2,
    title: 'Elite Advisors & Partners Seek Access',
    description: 'Top fractional CXOs and vetted service providers actively request access to qualified, revenue-generating scale-ups.',
    leveragePoint: 'High-intent client pipeline with outcome upside'
  },
  {
    step: 3,
    title: 'Better Partners Create Better Outcomes',
    description: 'Vetted execution partners deliver enterprise-grade legal, GTM, and engineering speed without hiring delay.',
    leveragePoint: 'Execution speed replaces bureaucratic drag'
  },
  {
    step: 4,
    title: 'Better Outcomes Attract Investors & Corporates',
    description: 'Institutional investors and Fortune 1000 innovation buyers actively monitor TVB because companies are de-risked.',
    leveragePoint: 'High-trust filtering of real enterprise traction'
  },
  {
    step: 5,
    title: 'Investors & Corporates Create Market Access & Capital',
    description: 'Enterprise pilots turn into multi-year contracts, and capital readiness attracts favorable term sheets.',
    leveragePoint: 'Commercial pilots precede capital injection'
  },
  {
    step: 6,
    title: 'More Access Attracts Stronger Founders',
    description: 'Word spread that TVB opens doors that standard funds cannot; top founders from Austin to Dubai apply.',
    leveragePoint: 'Global flywheel compounding across Hubs'
  },
  {
    step: 7,
    title: 'Stronger Founders Create Stronger Proof Points',
    description: 'Case studies, multi-million dollar contracts, and successful exits reinforce the catalyst model.',
    leveragePoint: 'Concrete valuation and enterprise value creation'
  },
  {
    step: 8,
    title: 'TVB Converts Proof Points into Repeatable Playbooks',
    description: 'Every pilot and GTM motion is codified into the TVB Operating System and automated AI workflows.',
    leveragePoint: 'TVB evolves into an operating ecosystem infrastructure layer'
  }
];

export const STRATEGIC_PRINCIPLES: StrategicPrinciple[] = [
  {
    number: 1,
    principle: 'Execution beats advice.',
    detail: 'Advising without hands-on operational leverage creates noise. TVB focuses on doing the heavy lifting in GTM, packaging, and pilots.'
  },
  {
    number: 2,
    principle: 'Market access is a product.',
    detail: 'Customer introductions must be packaged, pre-cleared, and scoped with defined success gates, not thrown over the fence as casual favors.'
  },
  {
    number: 3,
    principle: 'Relationships come first, business follows.',
    detail: 'High-trust networks cannot be purely transactional. Cultivate authentic operator-to-founder trust before negotiating economics.'
  },
  {
    number: 4,
    principle: 'Capital is useful only when paired with execution.',
    detail: 'Money poured into an unproven distribution engine accelerates burn, not growth. TVB builds the operational muscle first.'
  },
  {
    number: 5,
    principle: 'Partners should be paid when value is created.',
    detail: 'Outcome-aligned incentives ensure everyone pulls in the same direction: equity upside, distribution revenue splits, and success milestones.'
  },
  {
    number: 6,
    principle: 'Founders should not carry heavy upfront costs when they need scale support.',
    detail: 'Ecosystem pricing, fractional engagement, and aligned equity retainers keep cash burn focused strictly on product and direct growth.'
  },
  {
    number: 7,
    principle: 'Ecosystem density creates leverage.',
    detail: 'Concentrating 40+ scale-ups across 7 vertical Orbits gives collective bargaining power comparable to Fortune 500 enterprises.'
  },
  {
    number: 8,
    principle: 'Orbits create vertical depth.',
    detail: 'Domain-specific ecosystems allow deep subject-matter synergies, regulatory navigation, and instant co-selling plays.'
  },
  {
    number: 9,
    principle: 'Hubs create geographic reach.',
    detail: 'Physical presence in Austin, London, Paris, Hyderabad, and Dubai provides seamless cross-border market entry and capital pathways.'
  },
  {
    number: 10,
    principle: 'AI should automate the operating layer, not replace trust.',
    detail: 'Automate 80% of venture operations—meeting prep, CRM logging, intro drafting, data room checks—while keeping human judgment for high-stakes decisions.'
  }
];

export const ADVISOR_EQUITY_FRAMEWORK = [
  {
    tier: 'Standard Operator',
    range: '0.15% to 0.25%',
    commitment: '2 - 4 hours / month',
    focus: 'Ad hoc strategic reviews, periodic customer warm intros, and monthly office hours.'
  },
  {
    tier: 'Strategic Catalyst',
    range: '0.30% to 0.50%',
    commitment: '5 - 10 hours / month',
    focus: 'Active GTM positioning, designing sales playbooks, co-selling directly on pilot accounts, and data room vetting.'
  },
  {
    tier: 'Expert Fractional CXO',
    range: '0.60% to 1.00%',
    commitment: '15 - 25+ hours / month',
    focus: 'Embedded fractional leadership (Fractional CRO/CMO/CFO), managing teams, closing anchor enterprise deals, and institutional fundraising.'
  }
];

export const TVB_CONTACT_INFO = {
  phone: '(512) 931-1791',
  email: 'connect@theventurebuild.com',
  headquarters: 'Austin, Texas, USA',
  nexusPortal: 'https://nexus.theventurebuild.com'
};

export const TVB_TEAM: TeamMember[] = [
  {
    name: 'Harshal Shah',
    role: 'Founder & CEO',
    domain: 'Healthcare & Enterprise Scale-Ups',
    bio: 'Founder and CEO of The Venture Build (TVB). Managed private equity, product engineering services, and healthcare and life sciences P&Ls for multi-billion-dollar technology services. Entrepreneur & former healthcare co-founder, advisor to multiple start-ups & on boards of technology companies and non-profits. President of TiE Austin.'
  },
  {
    name: 'Ankur Agarwal',
    role: 'Partner / Venture Lead',
    domain: 'AI Strategy & M&A',
    bio: 'General Partner at Executive Enterprise Venture Fund. Former private equity executive focused on AI strategy and M&A at Vista Equity Partners. Former BCG consultant and Microsoft Research scholar; conducted research at MIT Media Labs and Cambridge University.'
  },
  {
    name: 'Anuj Joshi',
    role: 'Operator & Partnerships Lead',
    domain: 'Ecosystem & Alliances',
    bio: '25+ years of industry expertise in customer-focused organizations including IBM, Sun Microsystems, Autodesk, and AWS. Expert in cultivating ecosystem partnerships from the ground up.'
  },
  {
    name: 'Ashok Ramaswami',
    role: 'Fractional CFO / Strategy Advisor',
    domain: 'Strategic Finance & Capital Markets',
    bio: 'Founder & CEO of Seqnc Inc., a finance SaaS company. Fractional CFO consultant and trusted advisor to CxOs of high-growth tech companies with deep expertise in capital markets and transaction advisory.'
  },
  {
    name: 'Dennis Hall',
    role: 'GTM & Revenue Leader',
    domain: 'Enterprise Sales ($100M+ Net-New)',
    bio: 'Accomplished sales leader with over two decades driving exceptional revenue growth and delivering innovative technology solutions, generating over $100M in net-new recurring SaaS revenue.'
  },
  {
    name: 'Erik Cottrell',
    role: 'Executive Advisor / Operator',
    domain: 'Digital Transformation & Product',
    bio: '25-year executive career spanning CEO, CPO, SVP, GM, and startup founder roles. Brings deep business and leadership perspective to digital transformation engagements.'
  },
  {
    name: 'Ganesh Laxminarayan',
    role: 'Technology Innovation Advisor',
    domain: 'Healthcare, Finance & Retail Tech',
    bio: 'Technology innovator and leader driving digital transformation. CEO of Aurix Global Advisors, a technology advisory firm helping startups, SMBs, and enterprises leverage emerging technologies for growth.'
  },
  {
    name: 'Gurshaman Baweja',
    role: 'General Partner / Advisor',
    domain: 'AI Roadmaps & Resilient Operations',
    bio: 'Advises tech VC firms and startups on strategy, sales growth, scaling operations, and resiliency. General Partner of Enterprise Venture Fund (EVF), accelerating enterprise AI adoption.'
  },
  {
    name: 'James Walbom',
    role: 'Financial Operations Leader',
    domain: 'SaaS Finance & Growth Operations',
    bio: 'Provides executive financial leadership for innovative disruptive technologies. Over two decades helping investor-backed tech ventures build robust financial controls and unit economics.'
  },
  {
    name: 'Jignasha Amin',
    role: 'Global Transformation Executive',
    domain: 'Organizational Scaling & Operations',
    bio: 'Demonstrated executive leading large global organizations through transformational change that enables their next level of market, operational, and financial success.'
  },
  {
    name: 'Ken Montgomery',
    role: 'Brand & Marketing Strategist',
    domain: 'Brand, Positioning & Communications',
    bio: '30-year veteran in brand, marketing, and communications. Innovative thinker who aligns cross-organizational stakeholders to deliver change-making growth results.'
  },
  {
    name: 'Matt Yeager',
    role: 'Education & Infrastructure Advisor',
    domain: 'Education Sector & Connectivity',
    bio: 'Founder & CEO of MJYC.tech. Over two decades of executive technology leadership within the education and community technology sector.'
  },
  {
    name: 'Pavak Shah',
    role: 'Global Delivery & Product Advisor',
    domain: 'Product Engineering (NA, Europe, India)',
    bio: '25+ years in IT ventures across North America, Europe, Middle East, and India, delivering digital product engineering and scaling offshore delivery centers.'
  },
  {
    name: 'Srini Ramachandra',
    role: 'Life Sciences & Commercialization Lead',
    domain: 'Software, Genomics & Healthcare Informatics',
    bio: 'Recognized business leader with a successful track record along the product commercialization continuum in software and informatics for life sciences and genomics.'
  },
  {
    name: 'Venkat Gopi',
    role: 'Investment & Growth Advisor',
    domain: 'Growth Transformation & PE',
    bio: 'Founder & Managing Director of K7 Capital Partners, an alternative investment firm partnering with businesses in technology, health, and sustainable growth.'
  },
  {
    name: 'Vidhya Subramanian',
    role: 'Enterprise AI & FinTech Advisor',
    domain: 'Global Banking & Retail AI',
    bio: '25+ years in global roles across Financial Services, AI technology, and retail at Goldman Sachs, JPMorgan Chase, and Target.'
  }
];

export const TVB_OFFICIAL_PARTNERS: TVBPartner[] = [
  {
    name: 'Enterprise Venture Fund (EVF VC)',
    category: 'Venture Fund',
    description: 'Venture capital partner co-investing in AI-driven enterprise scale-ups and accelerating enterprise pilot deployments.'
  },
  {
    name: 'Ten Capital Network',
    category: 'Ecosystem Partner',
    description: 'Leading syndicate and funding platform providing angel, family office, and institutional capital access for scale-ups.'
  },
  {
    name: 'Qapita',
    category: 'Ecosystem Partner',
    description: 'Equity management, digital cap table, and ESOP administration infrastructure for venture-backed companies.'
  },
  {
    name: 'Growth Channel',
    category: 'Ecosystem Partner',
    description: 'AI-powered marketing intelligence and GTM channel planning partner for high-velocity customer acquisition.'
  },
  {
    name: 'K7 Capital Partners',
    category: 'Venture Fund',
    description: 'Alternative investment and growth transformation firm providing growth capital and strategic operational leverage.'
  },
  {
    name: 'AI Meets',
    category: 'Ecosystem Partner',
    description: 'Global AI innovation community connecting enterprise leaders with bleeding-edge applied AI scale-ups.'
  },
  {
    name: 'Trinity Advisory',
    category: 'Corporate',
    description: 'Cross-border transaction and tax planning advisory for internationalizing scale-ups.'
  }
];
