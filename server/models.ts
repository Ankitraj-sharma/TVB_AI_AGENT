import mongoose, { Schema, Model, Document } from 'mongoose';

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
  tagline: { type: String, default: 'Scaling with The Venture Build' },
  focus: { type: String, default: 'Enterprise execution and market access' },
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

export const CompanyModel: Model<ICompanyDoc> = 
  (mongoose.models.Company as Model<ICompanyDoc>) || mongoose.model<ICompanyDoc>('Company', CompanySchema);

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

export const TeamModel: Model<ITeamDoc> = 
  (mongoose.models.Team as Model<ITeamDoc>) || mongoose.model<ITeamDoc>('Team', TeamSchema);

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

export const PartnerModel: Model<IPartnerDoc> = 
  (mongoose.models.Partner as Model<IPartnerDoc>) || mongoose.model<IPartnerDoc>('Partner', PartnerSchema);

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  provider: 'google' | 'phone' | 'email';
  role: string;
  title?: string;
  organization?: string;
  createdAt?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  phone: { type: String },
  provider: { type: String, enum: ['google', 'phone', 'email'], default: 'email' },
  role: { type: String, enum: ['founder', 'investor', 'advisor', 'partner', 'corporate'], default: 'founder' },
  title: { type: String },
  organization: { type: String }
}, {
  timestamps: true
});

export const UserModel: Model<IUserDoc> = 
  (mongoose.models.User as Model<IUserDoc>) || mongoose.model<IUserDoc>('User', UserSchema);
