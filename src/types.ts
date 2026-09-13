export type PersonaType = 'founder' | 'advisor' | 'investor' | 'partner' | 'corporate';

export type OrbitId = 
  | 'healthcare'
  | 'education'
  | 'ai'
  | 'cybersecurity'
  | 'digital-twin'
  | 'travel'
  | 'fintech';

export type HubId = 
  | 'austin'
  | 'uk'
  | 'paris'
  | 'india'
  | 'uae'
  | 'emerging';

export interface GrowthEngine {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  operatorPhilosophy: string;
  iconName: string;
}

export interface Orbit {
  id: OrbitId;
  name: string;
  headline: string;
  focusAreas: string[];
  relatedInitiatives: string[];
  companies: string[];
  keyAdvisors: string[];
  color: string;
}

export interface Hub {
  id: HubId;
  name: string;
  region: string;
  status: 'Current Hub' | 'Home Base' | 'Target Hub' | 'Emerging Node';
  role: string[];
  strategicBridge: string;
  locationDetails: string;
  coordinates?: { lat: number; lng: number };
}

export interface NetworkCompany {
  id: string;
  name: string;
  orbit: OrbitId;
  hub: HubId;
  stage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Growth ($10M-$40M)';
  arrEstimate: string;
  description: string;
  operatingNeeds: string[];
  tvbIntervention: string;
  tags: string[];
}

export interface MarketplacePartner {
  id: string;
  name: string;
  category: 
    | 'Legal & Compliance'
    | 'Finance & Accounting'
    | 'Marketing & PR'
    | 'Demand Generation & Sales'
    | 'Product & Development'
    | 'AI & Automation'
    | 'Talent & Recruiting'
    | 'Fractional Leadership'
    | 'Cloud & Software Perks';
  pricingModel: 'Discounted Ecosystem Pricing' | 'Direct Client Payment' | 'Deferred Payment' | 'Milestone-Based' | 'Success Fee / Equity';
  ecosystemPerk: string;
  description: string;
  idealForStage: string;
  featured?: boolean;
}

export interface CadenceRitual {
  frequency: 'Weekly' | 'Monthly' | 'Quarterly';
  name: string;
  participants: string;
  purpose: string;
  deliverable: string;
}

export interface FlywheelStep {
  step: number;
  title: string;
  description: string;
  leveragePoint: string;
}

export interface StrategicPrinciple {
  number: number;
  principle: string;
  detail: string;
}

export interface TeamMember {
  name: string;
  role: string;
  domain: string;
  bio: string;
}

export interface TVBPartner {
  name: string;
  category: 'Venture Fund' | 'Ecosystem Partner' | 'Corporate' | 'Advisory';
  description: string;
}
