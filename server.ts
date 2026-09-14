import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { connectToDatabase, getDbStatus } from './server/db';
import { CompanyModel, TeamModel, PartnerModel, UserModel } from './server/models';
import { seedMongoIfEmpty } from './server/seedData';
import { NETWORK_COMPANIES, TVB_TEAM, TVB_OFFICIAL_PARTNERS } from './src/data/tvbData';
import { sendSmsOtp, sendEmailOtp, verifyOtp, verifyPhoneOtp, normalizePhoneNumber } from './server/verificationService';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Lazy-load or create GenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Multi-tier model generator with automatic resilience against 503 / high demand spikes
async function executeGeminiWithFallback(
  ai: GoogleGenAI,
  contents: string,
  responseMimeType: string = 'application/json'
): Promise<{ text: string; model: string } | null> {
  const candidateModels = [
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
    'gemini-flash-latest'
  ];

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          responseMimeType,
          temperature: 0.2
        }
      });
      const responseText = response.text?.trim();
      if (responseText) {
        return { text: responseText, model };
      }
    } catch (err: any) {
      console.log(`[TVB AI Router] Model ${model} encountered load condition (${err?.status || err?.message || 'retry'}), checking alternate tier.`);
    }
  }

  return null;
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    platform: 'The Venture Build (TVB) OS',
    database: getDbStatus()
  });
});

// ================= AUTH API & VERIFICATION ENDPOINTS ================= //

// Send Real SMS / Phone OTP endpoint
app.post('/api/auth/otp/send-phone', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone || String(phone).trim().length < 7) {
      return res.status(400).json({ success: false, error: 'A valid mobile phone number is required (e.g. +1 512 555 0192 or 7903356870).' });
    }

    const result = await sendSmsOtp(String(phone).trim());
    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error || result.message });
    }

    return res.json({
      success: true,
      message: result.message,
      deliveryMethod: result.deliveryMethod,
      expiresInSeconds: result.expiresInSeconds,
      formattedPhone: result.formattedPhone
    });
  } catch (err: any) {
    console.error('Error sending SMS OTP:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to dispatch SMS verification code.' });
  }
});

// Send Real Email OTP endpoint
app.post('/api/auth/otp/send-email', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    const result = await sendEmailOtp(String(email).trim());
    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error || result.message });
    }

    return res.json({
      success: true,
      message: result.message,
      deliveryMethod: result.deliveryMethod,
      expiresInSeconds: result.expiresInSeconds
    });
  } catch (err: any) {
    console.error('Error sending Email OTP:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to dispatch Email verification code.' });
  }
});

// Verify Phone OTP and log in / register
app.post('/api/auth/otp/verify-phone', async (req: Request, res: Response) => {
  try {
    const { phone, code, role = 'founder', name } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ success: false, error: 'Phone number and 6-digit verification code are required.' });
    }

    const verification = await verifyPhoneOtp(String(phone).trim(), String(code).trim());
    if (!verification.valid) {
      return res.status(401).json({ success: false, error: verification.error || 'Invalid verification code.' });
    }

    const resolvedPhone = verification.formattedPhone || normalizePhoneNumber(String(phone).trim());
    const rawCleanPhone = String(phone).trim();

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      try {
        let user = await UserModel.findOne({
          $or: [{ phone: resolvedPhone }, { phone: rawCleanPhone }]
        });
        if (!user) {
          user = new UserModel({
            name: name || `Member (${resolvedPhone.slice(-4)})`,
            phone: resolvedPhone,
            email: `${resolvedPhone.replace(/\D/g, '')}@theventurebuild.com`,
            provider: 'phone',
            role,
            title: role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'Venture Investor' : 'Scale-Up Operator',
            organization: 'TVB Global Ecosystem'
          });
          await user.save();
        }

        return res.json({
          success: true,
          verified: true,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            provider: 'phone',
            title: user.title,
            organization: user.organization
          }
        });
      } catch (dbErr: any) {
        console.warn('DB lookup failed on OTP verify, returning verified local session:', dbErr.message);
      }
    }

    // In-memory verified user response
    return res.json({
      success: true,
      verified: true,
      user: {
        id: 'usr_phone_' + Date.now(),
        name: name || `Mobile Operator (${resolvedPhone.slice(-4)})`,
        email: `${resolvedPhone.replace(/\D/g, '')}@theventurebuild.com`,
        phone: resolvedPhone,
        role,
        provider: 'phone',
        title: role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'Venture Investor' : 'Scale-Up Operator',
        organization: 'TVB Ecosystem'
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'OTP verification failed' });
  }
});

// Verify Email OTP and log in / register
app.post('/api/auth/otp/verify-email', async (req: Request, res: Response) => {
  try {
    const { email, code, role = 'founder', name } = req.body;
    if (!email || !code) {
      return res.status(400).json({ success: false, error: 'Email and 6-digit verification code are required.' });
    }

    const verification = verifyOtp(String(email).trim().toLowerCase(), String(code).trim());
    if (!verification.valid) {
      return res.status(401).json({ success: false, error: verification.error || 'Invalid verification code.' });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      try {
        let user = await UserModel.findOne({ email: String(email).trim().toLowerCase() });
        if (!user) {
          user = new UserModel({
            name: name || String(email).split('@')[0],
            email: String(email).trim().toLowerCase(),
            provider: 'email',
            role,
            title: role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'Venture Investor' : 'Scale-Up Operator',
            organization: 'TVB Global Network'
          });
          await user.save();
        }

        return res.json({
          success: true,
          verified: true,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            provider: 'email',
            title: user.title,
            organization: user.organization
          }
        });
      } catch (dbErr: any) {
        console.warn('DB lookup failed on Email OTP verify:', dbErr.message);
      }
    }

    return res.json({
      success: true,
      verified: true,
      user: {
        id: 'usr_email_' + Date.now(),
        name: name || String(email).split('@')[0],
        email: String(email).trim().toLowerCase(),
        role,
        provider: 'email',
        title: role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'Venture Investor' : 'Scale-Up Operator',
        organization: 'TVB Network'
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Email OTP verification failed' });
  }
});

// Login endpoint (supports email/password, Google auth, or Phone OTP)
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, phone, provider = 'email', role = 'founder', name } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      try {
        let existingUser = null;
        if (provider === 'phone' && phone) {
          existingUser = await UserModel.findOne({ phone });
        } else if (email) {
          existingUser = await UserModel.findOne({ email: email.toLowerCase().trim() });
        }

        if (existingUser) {
          return res.json({
            success: true,
            user: {
              id: existingUser._id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              phone: existingUser.phone,
              role: existingUser.role,
              provider: existingUser.provider,
              title: existingUser.title || 'Venture Member',
              organization: existingUser.organization || 'TVB Ecosystem'
            }
          });
        }

        // Auto-provision user if logging in via Google
        if (provider === 'google' && email) {
          const newUser = new UserModel({
            name: name || email.split('@')[0],
            email: email.toLowerCase().trim(),
            provider: 'google',
            role,
            title: role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'Venture Investor' : 'Ecosystem Partner',
            organization: 'TVB Global Network'
          });
          await newUser.save();

          return res.json({
            success: true,
            user: {
              id: newUser._id.toString(),
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              provider: newUser.provider,
              title: newUser.title,
              organization: newUser.organization
            }
          });
        }
      } catch (dbErr: any) {
        console.warn('DB auth lookup failed, falling back to local session:', dbErr?.message);
      }
    }

    // Fallback in-memory session (e.g. Atlas offline or demo mode)
    const displayName = name || (email ? email.split('@')[0] : phone ? `Member (${phone.slice(-4)})` : 'Verified Operator');
    return res.json({
      success: true,
      user: {
        id: 'usr_' + Date.now(),
        name: displayName,
        email: email || `${phone || 'user'}@theventurebuild.com`,
        phone: phone || '',
        role: role || 'founder',
        provider: provider || 'email',
        title: role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'Venture Investor' : 'Scale-Up Advisor',
        organization: 'The Venture Build Network'
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Login failed' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role = 'founder', organization, title, provider = 'email' } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ success: false, error: 'Name and email or phone number are required.' });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      try {
        if (email) {
          const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
          if (existing) {
            return res.status(409).json({ success: false, error: 'An account with this email already exists. Please log in.' });
          }
        }

        const newUser = new UserModel({
          name,
          email: email ? email.toLowerCase().trim() : `${phone}@theventurebuild.com`,
          password,
          phone,
          provider,
          role,
          title: title || (role === 'founder' ? 'Founder & CEO' : role === 'investor' ? 'General Partner' : 'Operator'),
          organization: organization || 'The Venture Build Ecosystem'
        });
        await newUser.save();

        return res.status(201).json({
          success: true,
          user: {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            provider: newUser.provider,
            title: newUser.title,
            organization: newUser.organization
          }
        });
      } catch (dbErr: any) {
        console.warn('DB register error, using in-memory response:', dbErr?.message);
      }
    }

    // In-memory fallback
    return res.status(201).json({
      success: true,
      user: {
        id: 'usr_' + Date.now(),
        name,
        email: email || `${phone}@theventurebuild.com`,
        phone: phone || '',
        role,
        provider,
        title: title || (role === 'founder' ? 'Founder & CEO' : 'Venture Partner'),
        organization: organization || 'The Venture Build Ecosystem'
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Registration failed' });
  }
});

// Live Database Status Endpoint
app.get('/api/db/status', (_req: Request, res: Response) => {
  const status = getDbStatus();
  res.json({
    success: true,
    ...status,
    cluster: 'cluster0.uxisngo.mongodb.net',
    targetDatabase: 'tvb_platform'
  });
});

// Companies collection: Read from MongoDB Atlas or fallback to TVB dataset
app.get('/api/db/companies', async (_req: Request, res: Response) => {
  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const companies = await CompanyModel.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'mongodb-atlas', data: companies });
    } catch (err: any) {
      console.warn('MongoDB query error, returning in-memory:', err?.message);
    }
  }
  return res.json({ success: true, source: 'in-memory-tvb', data: NETWORK_COMPANIES });
});

// Add a new company into MongoDB Atlas
app.post('/api/db/companies', async (req: Request, res: Response) => {
  const dbStatus = getDbStatus();
  if (!dbStatus.connected) {
    return res.status(503).json({
      success: false,
      error: 'MongoDB Atlas is currently offline or authenticating. Please verify credentials.'
    });
  }
  try {
    const payload = {
      ...req.body,
      tagline: req.body.tagline || req.body.description || 'Scaling with The Venture Build',
      focus: req.body.focus || req.body.description || req.body.category || 'Enterprise execution and market access',
      geography: req.body.geography || (req.body.hub ? [req.body.hub] : ['Austin / Texas Hub']),
      category: req.body.category || 'Tech Scale-Up',
      orbit: req.body.orbit || 'ai',
      stage: req.body.stage || 'Seed / Series A'
    };
    const newCompany = new CompanyModel(payload);
    await newCompany.save();
    return res.status(201).json({ success: true, data: newCompany });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err?.message || 'Failed to create company' });
  }
});

// Team collection: Read from MongoDB Atlas or fallback
app.get('/api/db/team', async (_req: Request, res: Response) => {
  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const team = await TeamModel.find({});
      if (team.length > 0) {
        return res.json({ success: true, source: 'mongodb-atlas', data: team });
      }
    } catch (err: any) {
      console.warn('MongoDB team query error:', err?.message);
    }
  }
  return res.json({ success: true, source: 'in-memory-tvb', data: TVB_TEAM });
});

// Partners collection: Read from MongoDB Atlas or fallback
app.get('/api/db/partners', async (_req: Request, res: Response) => {
  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const partners = await PartnerModel.find({});
      if (partners.length > 0) {
        return res.json({ success: true, source: 'mongodb-atlas', data: partners });
      }
    } catch (err: any) {
      console.warn('MongoDB partner query error:', err?.message);
    }
  }
  return res.json({ success: true, source: 'in-memory-tvb', data: TVB_OFFICIAL_PARTNERS });
});

// AI Operating System Endpoint: Venture Execution Audit & Gap Analysis
app.post('/api/ai/venture-audit', async (req: Request, res: Response) => {
  try {
    const {
      companyName = 'Scale-Up Tech',
      stage = 'Series A',
      arr = '$3.5M',
      sector = 'AI Orbit',
      coreChallenge = 'GTM and Enterprise Market Access',
      targetGeographies = ['Austin / Texas', 'UK'],
      productDescription = 'B2B infrastructure platform'
    } = req.body;

    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `You are the chief operator at The Venture Build (TVB) - an AI-powered venture catalyst platform that helps startups scale through execution, market access, operator support, partner ecosystems, and capital readiness.
TVB's core thesis is: "The future of scaling is not advising. It is execution."
TVB operates 4 growth engines: Executive Advisory, Market Access, Scale-Up Marketplace ("Costco for scale-ups"), and Funding Advisory & Capital Readiness.
TVB has 7 Orbits: Healthcare, Education, AI, Cybersecurity, Digital Twin, Travel, Fintech & Payments.
TVB has 5 primary Hubs: Austin/Texas (home), UK, Paris/France, India, UAE.

Analyze this startup:
- Name: ${companyName}
- Stage: ${stage}
- Current Revenue / ARR: ${arr}
- Sector: ${sector}
- Core Challenge: ${coreChallenge}
- Target Geographies: ${Array.isArray(targetGeographies) ? targetGeographies.join(', ') : targetGeographies}
- Description: ${productDescription}

Return a valid JSON object strictly matching this schema with high-density, actionable operator strategy:
{
  "executiveSummary": "string (2 sentences framing the core leverage point beyond money)",
  "recommendedOrbit": "string (which of the 7 TVB Orbits fits best)",
  "primaryHub": "string (primary geographic hub for expansion)",
  "fourEngineActionPlan": {
    "executiveAdvisory": [
      { "role": "string e.g. Fractional CRO", "focus": "string", "urgency": "High | Medium" }
    ],
    "marketAccess": [
      { "targetBuyer": "string", "channelPlay": "string", "pilotRoute": "string" }
    ],
    "scaleUpMarketplace": [
      { "category": "Legal | Finance | Marketing | Demand Gen | AI & Automation | Talent", "partnerType": "string", "whyCostcoModel": "string" }
    ],
    "capitalReadiness": {
      "instrument": "SAFE | Equity | Bridge | SPV | Strategic Capital",
      "narrativeFocus": "string",
      "investorTargets": "string"
    }
  },
  "economicAlignment": {
    "suggestedAdvisorEquityRange": "string (e.g. 0.30% - 0.50% Strategic)",
    "tvbChannelFee": "20% on TVB-led channel deals (directional)",
    "referralShare": "4% - 6% to sourcing partner"
  },
  "immediateExecutionRoadmap": [
    { "week": "Week 1-2", "ritual": "TVB Weekly Pulse & Intake", "deliverable": "string" },
    { "week": "Week 3-6", "ritual": "Monthly Scale-Up Showcase & Office Hours", "deliverable": "string" },
    { "week": "Week 7-12", "ritual": "Quarterly Market Access Sprint", "deliverable": "string" }
  ]
}`;

        const result = await executeGeminiWithFallback(ai, prompt, 'application/json');
        if (result) {
          const parsed = JSON.parse(result.text);
          return res.json({ success: true, data: parsed, source: result.model });
        }
      } catch (parseErr) {
        console.log('[TVB AI Router] Venture audit parse issue, using TVB domain engine fallback');
      }
    }

    // High quality deterministic fallback matching PDF domain specs
    const mockAudit = {
      executiveSummary: `${companyName} presents strong domain validation at ${arr} ARR, but requires direct market access pipelines and fractional operational leverage to cross from traction to predictable scale.`,
      recommendedOrbit: sector || 'AI Orbit',
      primaryHub: targetGeographies[0] || 'Austin / Texas Hub',
      fourEngineActionPlan: {
        executiveAdvisory: [
          { role: 'Fractional CRO / GTM Operator', focus: 'Enterprise pricing packaging, qualification criteria, and sales playbook standardisation.', urgency: 'High' },
          { role: 'Fractional Strategic CFO', focus: 'Data room hygiene, cap table modeling for next institutional round, and unit economics validation.', urgency: 'Medium' }
        ],
        marketAccess: [
          { targetBuyer: 'Mid-market & Fortune 1000 Innovation Groups', channelPlay: 'Co-selling through TVB Hub corporate partners', pilotRoute: '90-day structured proof-of-concept sprint with predefined KPI exit gates' }
        ],
        scaleUpMarketplace: [
          { category: 'Demand Gen', partnerType: 'ABM & Enterprise Lead Engine', whyCostcoModel: 'Avoid premature full-time SDR hires while securing high-yield executive meetings at pre-negotiated TVB member rates.' },
          { category: 'Legal & Compliance', partnerType: 'Venture & Data Privacy Counsel', whyCostcoModel: 'Standardized SAFE/Equity contracts and SOC2 readiness without billable hour bloat.' }
        ],
        capitalReadiness: {
          instrument: stage.includes('Seed') ? 'SAFE with Valuation Cap' : 'Priced Equity Round with SPV syndicate',
          narrativeFocus: 'Capital efficiency, market pull in target orbit, and defensible execution moat.',
          investorTargets: 'Top-tier vertical micro-VCs, sector-focused corporate venture arms, and strategic family offices.'
        }
      },
      economicAlignment: {
        suggestedAdvisorEquityRange: stage.includes('Seed') ? '0.15% to 0.25% (Standard)' : '0.30% to 0.50% (Strategic)',
        tvbChannelFee: '20% of revenue generated through TVB-led distribution channel',
        referralShare: '4% to 6% to referral source upon conversion'
      },
      immediateExecutionRoadmap: [
        { week: 'Week 1-2', ritual: 'TVB Weekly Pulse & Audit', deliverable: 'Comprehensive execution gap review and Orbit operator pairing' },
        { week: 'Week 3-6', ritual: 'Scale-Up Showcase & Office Hours', deliverable: 'Refined enterprise pilot offer, pricing packaging, and data room initialization' },
        { week: 'Week 7-12', ritual: 'Quarterly Market Access Sprint', deliverable: '3-5 vetted enterprise buyer introductions across Austin and target Hub nodes' }
      ]
    };

    return res.json({ success: true, data: mockAudit, source: 'tvb-domain-engine' });
  } catch (error: any) {
    console.error('Venture audit error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate venture audit' });
  }
});

// AI Operating System Endpoint: Intro Routing & Warm Brief Generator
app.post('/api/ai/intro-router', async (req: Request, res: Response) => {
  try {
    const {
      senderCompany = 'ThreatWorx',
      targetPersona = 'Enterprise CISO or Corporate Innovation Lead',
      targetOrbit = 'Cybersecurity Orbit',
      context = 'Seeking initial 60-day pilot for external scan & cloud asset risk posture',
      originHub = 'Austin / Texas'
    } = req.body;

    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `You are TVB's automated Intro Routing System.
In TVB, intros are operator-vetted and high-trust. TVB's philosophy: "Relationships come first, business follows. Execution beats advice."
Draft an intro routing brief and concise double-opt-in intro email for:
- Sponsoring Company: ${senderCompany}
- Target Recipient: ${targetPersona}
- Orbit: ${targetOrbit}
- Context/Offer: ${context}
- Hub: ${originHub}

Return JSON with:
{
  "routingScore": number (85-98),
  "rationale": "string",
  "subjectLine": "string",
  "doubleOptInDraft": "string (under 120 words, crisp, mutual value-add, no fluff)",
  "talkingPoints": ["string", "string", "string"],
  "economicTracking": "string (TVB Market Access fee 20% / Referral split 4-6%)"
}`;

        const result = await executeGeminiWithFallback(ai, prompt, 'application/json');
        if (result) {
          const parsed = JSON.parse(result.text);
          return res.json({ success: true, data: parsed, source: result.model });
        }
      } catch (parseErr) {
        console.log('[TVB AI Router] Intro router parse issue, using TVB domain engine fallback');
      }
    }

    // High quality deterministic fallback
    const mockBrief = {
      routingScore: 94,
      rationale: `Strong match within TVB ${targetOrbit}. The recipient profile has active demand for validated risk containment solutions with zero operational friction.`,
      subjectLine: `Intro: ${senderCompany} <> Enterprise Innovation (${targetOrbit})`,
      doubleOptInDraft: `Hi [Name],\n\nThrough our TVB ${originHub} network, I wanted to introduce ${senderCompany}. They have built an automated scanning and compliance layer that eliminates manual risk audits for high-growth tech stacks.\n\nThey're currently running a selective 60-day pilot cohort for enterprise partners. Given your focus on infrastructure security, I thought this would offer immediate operational leverage.\n\nWould you be open to a 20-minute executive briefing next Tuesday or Thursday?`,
      talkingPoints: [
        'Vetted by TVB Operator network; avoids typical 6-month enterprise procurement drag',
        'Direct outcome alignment with no heavy upfront integration overhead',
        'Proven deployment metrics across existing TVB portfolio scale-ups'
      ],
      economicTracking: 'Standard 20% TVB Market Access channel attribution tracked in OS ledger.'
    };

    return res.json({ success: true, data: mockBrief, source: 'tvb-domain-engine' });
  } catch (error: any) {
    console.error('Intro routing error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate intro route' });
  }
});

// AI Operating System: Meeting Capture & Operator Follow-Up Drafting
app.post('/api/ai/meeting-prep', async (req: Request, res: Response) => {
  try {
    const {
      founderName = 'Sarah Lin',
      company = 'Pulsar Health',
      stage = 'Series Seed',
      notes = 'Discussed social determinants of health workflow, looking for HIE partnerships and Medicaid managed care pilots in Texas.'
    } = req.body;

    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `You are TVB's 80% Operations Automation Engine.
Convert these raw meeting notes into a standardized TVB Operator Action Dossier:
Founder: ${founderName}, Company: ${company}, Stage: ${stage}
Notes: ${notes}

Return JSON with:
{
  "companyProfileSummary": "string",
  "identifiedBlockers": ["string", "string"],
  "orbitHubRouting": "string",
  "costcoMarketplaceRecommendations": ["string", "string"],
  "followUpEmailToFounder": "string",
  "internalOperatorNextActions": ["string", "string"]
}`;

        const result = await executeGeminiWithFallback(ai, prompt, 'application/json');
        if (result) {
          const parsed = JSON.parse(result.text);
          return res.json({ success: true, data: parsed, source: result.model });
        }
      } catch (parseErr) {
        console.log('[TVB AI Router] Meeting prep parse issue, using TVB domain engine fallback');
      }
    }

    const mockFollowup = {
      companyProfileSummary: `${company} is building trust and workflow infrastructure for closed-loop community care coordination. Ready for regional pilot execution.`,
      identifiedBlockers: [
        'Navigating complex state-level HIE governance agreements',
        'Packaging value proposition for enterprise payers and health systems'
      ],
      orbitHubRouting: 'Healthcare Orbit <> Austin / Texas Hub Node',
      costcoMarketplaceRecommendations: [
        'HIPAA & Healthcare Regulatory Compliance Partner (TVB Vetted Member Tier)',
        'Enterprise Healthcare GTM & Reimbursement Advisory'
      ],
      followUpEmailToFounder: `Hi ${founderName},\n\nGreat connecting during our TVB Discovery session. As discussed, our focus is pure execution: connecting you directly to HIE decision-makers and structuring your Texas pilot.\n\nNext steps:\n1. We will review your data room via the TVB Capital Readiness portal.\n2. We are routing an introduction to our Healthcare Orbit lead in the Austin Hub.\n3. Join this Thursday's Founder Operator Office Hours at 11am CT.\n\nLet's keep momentum high,\nThe Venture Build Team`,
      internalOperatorNextActions: [
        'Route lead to Austin Hub Health Lead for Texas HIE mapping',
        'Log 20% distribution agreement template into TVB CRM ledger'
      ]
    };

    return res.json({ success: true, data: mockFollowup, source: 'tvb-domain-engine' });
  } catch (error: any) {
    console.error('Meeting prep error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate meeting follow-up' });
  }
});

// Vite integration or static file serving
async function startServer() {
  // Initialize MongoDB Atlas in background (non-blocking)
  connectToDatabase().then((connected) => {
    if (connected) {
      seedMongoIfEmpty();
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TVB Server running on port ${PORT}`);
  });
}

startServer();
