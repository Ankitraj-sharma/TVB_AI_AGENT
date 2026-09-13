import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanyDoc extends Document {
  name: string;
  category: string;
  orbit: string;
  stage: string;
  valuation: string;
  tagline: string;
  focus: string;
  geography: string[];
  metrics: {
    growth: string;
    teamSize: number;
    arr?: string;
  };
  tvbIntervention: string;
  createdAt?: Date;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  orbit: { type: String, required: true },
  stage: { type: String, required: true },
  valuation: { type: String, default: 'Undisclosed' },
  tagline: { type: String, required: true },
  focus: { type: String, required: true },
  geography: [{ type: String }],
  metrics: {
    growth: { type: String, default: '50%+' },
    teamSize: { type: Number, default: 10 },
    arr: { type: String }
  },
  tvbIntervention: { type: String, default: 'TVB Operator Execution' }
}, {
  timestamps: true
});

export const CompanyModel = mongoose.models.Company || mongoose.model<ICompanyDoc>('Company', CompanySchema);

export interface ITeamDoc extends Document {
  name: string;
  role: string;
  domain: string;
  bio: string;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  domain: { type: String, required: true },
  bio: { type: String, required: true }
}, {
  timestamps: true
});

export const TeamModel = mongoose.models.Team || mongoose.model<ITeamDoc>('Team', TeamSchema);

export interface IPartnerDoc extends Document {
  name: string;
  category: string;
  description: string;
}

const PartnerSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});

export const PartnerModel = mongoose.models.Partner || mongoose.model<IPartnerDoc>('Partner', PartnerSchema);
