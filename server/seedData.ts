import { CompanyModel, TeamModel, PartnerModel } from './models';
import { NETWORK_COMPANIES, TVB_TEAM, TVB_OFFICIAL_PARTNERS } from '../src/data/tvbData';

export async function seedMongoIfEmpty() {
  try {
    const companyCount = await CompanyModel.countDocuments();
    if (companyCount === 0) {
      console.log('[MongoDB Seeder] Seeding initial 40+ TVB Network Companies into Atlas...');
      const companyDocs = NETWORK_COMPANIES.map(c => ({
        name: c.name,
        category: c.tags[0] || 'Enterprise Tech',
        orbit: c.orbit,
        stage: c.stage,
        valuation: c.arrEstimate ? `ARR: ${c.arrEstimate}` : 'Undisclosed',
        tagline: c.description,
        focus: c.operatingNeeds.join(', '),
        geography: [c.hub],
        metrics: {
          growth: '45-80% YoY',
          teamSize: 15,
          arr: c.arrEstimate
        },
        tvbIntervention: c.tvbIntervention
      }));
      await CompanyModel.insertMany(companyDocs);
      console.log(`[MongoDB Seeder] Successfully seeded ${companyDocs.length} companies to MongoDB Atlas.`);
    } else {
      console.log(`[MongoDB Seeder] Atlas already contains ${companyCount} companies.`);
    }

    const teamCount = await TeamModel.countDocuments();
    if (teamCount === 0) {
      console.log('[MongoDB Seeder] Seeding TVB Leadership & Operators into Atlas...');
      await TeamModel.insertMany(TVB_TEAM);
      console.log(`[MongoDB Seeder] Successfully seeded ${TVB_TEAM.length} team members.`);
    }

    const partnerCount = await PartnerModel.countDocuments();
    if (partnerCount === 0) {
      console.log('[MongoDB Seeder] Seeding TVB Institutional Partners into Atlas...');
      await PartnerModel.insertMany(TVB_OFFICIAL_PARTNERS);
      console.log(`[MongoDB Seeder] Successfully seeded ${TVB_OFFICIAL_PARTNERS.length} partners.`);
    }
  } catch (err: any) {
    console.warn('[MongoDB Seeder] Note during seeding:', err?.message || err);
  }
}
