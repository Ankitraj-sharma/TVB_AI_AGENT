import twilio from 'twilio';
import nodemailer from 'nodemailer';

// Store generated OTPs in memory with timestamp (10 minute expiry)
interface StoredOtp {
  code: string;
  destination: string; // phone or email
  type: 'sms' | 'email';
  expiresAt: number;
  deliveryStatus: 'sent_real_sms' | 'sent_real_email' | 'system_dispatched';
  providerMessage?: string;
}

const activeOtps = new Map<string, StoredOtp>();

// Cache Twilio Verify Service SID to avoid re-creating on every request
let cachedVerifyServiceSid: string | null = 'VA4fe02ddf096b1107cfb1250a727b7859';

async function getOrCreateVerifyService(client: any): Promise<string> {
  if (cachedVerifyServiceSid) {
    try {
      // Quick check if service is accessible
      await client.verify.v2.services(cachedVerifyServiceSid).fetch();
      return cachedVerifyServiceSid;
    } catch (e: any) {
      console.warn('Cached verify service invalid, fetching or creating new:', e.message);
      cachedVerifyServiceSid = null;
    }
  }

  try {
    const services = await client.verify.v2.services.list({ limit: 5 });
    if (services && services.length > 0) {
      cachedVerifyServiceSid = services[0].sid;
      return cachedVerifyServiceSid!;
    }
    const created = await client.verify.v2.services.create({ friendlyName: 'The Venture Build' });
    cachedVerifyServiceSid = created.sid;
    return cachedVerifyServiceSid!;
  } catch (err: any) {
    console.error('Error in getOrCreateVerifyService:', err.message);
    throw err;
  }
}

// Normalize phone numbers to standard international E.164 format (+CountryCodeDigits)
export function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '').trim();
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  // Standard 10-digit mobile (e.g. 7903356870 in India) -> prepend +91
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  return `+${cleaned}`;
}

// Helper to clean up expired OTPs
function cleanExpired() {
  const now = Date.now();
  for (const [key, val] of activeOtps.entries()) {
    if (val.expiresAt < now) {
      activeOtps.delete(key);
    }
  }
}

// Generate a random 6-digit numeric OTP for email
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Dispatches a REAL SMS OTP via Twilio Verify Service directly to the user's mobile carrier
 */
export async function sendSmsOtp(phoneNumber: string): Promise<{
  success: boolean;
  message: string;
  deliveryMethod: 'twilio_verify' | 'twilio_real_sms';
  expiresInSeconds: number;
  formattedPhone: string;
  error?: string;
}> {
  cleanExpired();
  const e164Phone = normalizePhoneNumber(phoneNumber);
  const expiresInSeconds = 600; // 10 minutes

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;

  if (!twilioSid || !twilioToken) {
    return {
      success: false,
      message: 'SMS gateway not configured. Please add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in Settings.',
      deliveryMethod: 'twilio_verify',
      expiresInSeconds: 0,
      formattedPhone: e164Phone,
      error: 'Twilio credentials not configured'
    };
  }

  try {
    const client = twilio(twilioSid, twilioToken);
    const serviceSid = await getOrCreateVerifyService(client);

    console.log(`[Twilio Verify] Dispatching real carrier SMS to ${e164Phone} using Service ${serviceSid}...`);

    const verification = await client.verify.v2.services(serviceSid).verifications.create({
      to: e164Phone,
      channel: 'sms'
    });

    console.log(`[Twilio Verify] Real SMS dispatched! SID: ${verification.sid}, Status: ${verification.status}`);

    return {
      success: true,
      message: `Real SMS verification code dispatched to ${e164Phone}. Please check your phone messages.`,
      deliveryMethod: 'twilio_verify',
      expiresInSeconds,
      formattedPhone: e164Phone
    };
  } catch (twilioErr: any) {
    console.error(`[Twilio Verify] Failed to dispatch SMS to ${e164Phone}:`, twilioErr.message);
    return {
      success: false,
      message: `Failed to deliver SMS to ${e164Phone}: ${twilioErr.message}`,
      deliveryMethod: 'twilio_verify',
      expiresInSeconds: 0,
      formattedPhone: e164Phone,
      error: twilioErr.message
    };
  }
}

/**
 * Validates the SMS OTP code using Twilio Verify API
 */
export async function verifyPhoneOtp(phoneNumber: string, submittedCode: string): Promise<{
  valid: boolean;
  error?: string;
  formattedPhone?: string;
}> {
  const e164Phone = normalizePhoneNumber(phoneNumber);
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;

  if (twilioSid && twilioToken) {
    try {
      const client = twilio(twilioSid, twilioToken);
      const serviceSid = await getOrCreateVerifyService(client);

      console.log(`[Twilio Verify] Validating code for ${e164Phone}...`);
      const check = await client.verify.v2.services(serviceSid).verificationChecks.create({
        to: e164Phone,
        code: submittedCode.trim()
      });

      console.log(`[Twilio Verify] Result for ${e164Phone}: status=${check.status}, valid=${check.valid}`);

      if (check.status === 'approved' && check.valid) {
        return { valid: true, formattedPhone: e164Phone };
      } else {
        return {
          valid: false,
          error: 'Incorrect verification code. Please check the SMS on your phone and enter the exact 6-digit code received.'
        };
      }
    } catch (checkErr: any) {
      console.warn(`[Twilio Verify] VerificationCheck error: ${checkErr.message}`);
      return {
        valid: false,
        error: checkErr.message || 'Verification check failed. Please request a new code.'
      };
    }
  }

  // Fallback to local memory store if Twilio is not bound
  return verifyOtp(e164Phone, submittedCode);
}

/**
 * Dispatches a real Email OTP via SMTP (Nodemailer)
 */
export async function sendEmailOtp(email: string): Promise<{
  success: boolean;
  message: string;
  deliveryMethod: 'smtp_real_email';
  expiresInSeconds: number;
  error?: string;
}> {
  cleanExpired();
  const normalizedEmail = email.trim().toLowerCase();
  const code = generateOtpCode();
  const expiresInSeconds = 600; // 10 minutes
  const expiresAt = Date.now() + expiresInSeconds * 1000;

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser || 'The Venture Build <auth@theventurebuild.com>';

  if (!smtpUser || !smtpPass) {
    return {
      success: false,
      message: 'SMTP credentials not configured. Please provide SMTP_USER and SMTP_PASS (Gmail 16-character App Password) in Settings to deliver real emails.',
      deliveryMethod: 'smtp_real_email',
      expiresInSeconds: 0,
      error: 'SMTP credentials missing'
    };
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #02172e; color: #ffffff; padding: 32px; border-radius: 14px; border: 1px solid #172a3e;">
      <div style="margin-bottom: 24px; display: flex; align-items: center;">
        <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">The Venture Build</span>
        <span style="background: #1863dc; color: #ffffff; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; margin-left: 10px;">SECURITY GATEWAY</span>
      </div>
      <h2 style="margin: 0 0 12px 0; font-size: 22px; color: #ffffff; font-weight: 700;">Your Single-Use Verification Code</h2>
      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 28px;">
        A sign-in request was initiated for <strong>${normalizedEmail}</strong>. Enter this 6-digit authentication code to verify your credentials:
      </p>
      <div style="background: #0b1f34; border: 2px solid #1863dc; border-radius: 10px; padding: 22px; text-align: center; margin-bottom: 28px;">
        <span style="font-size: 36px; font-family: 'Courier New', monospace; font-weight: 800; letter-spacing: 8px; color: #38bdf8;">${code}</span>
      </div>
      <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0;">
        ⏱️ This security code is valid for 10 minutes. If you did not make this request, you can safely disregard this email.
      </p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: normalizedEmail,
      subject: `Your TVB Security Verification Code: ${code}`,
      text: `Your single-use verification security code for The Venture Build is: ${code}. Valid for 10 minutes.`,
      html: emailHtml
    });

    activeOtps.set(normalizedEmail, {
      code,
      destination: normalizedEmail,
      type: 'email',
      expiresAt,
      deliveryStatus: 'sent_real_email',
      providerMessage: `SMTP email delivered to ${normalizedEmail} via ${smtpHost}`
    });

    console.log(`[Email Gateway] Delivered live SMTP email to ${normalizedEmail} via ${smtpHost}`);

    return {
      success: true,
      message: `Real verification email sent to ${normalizedEmail}. Please check your inbox or spam folder.`,
      deliveryMethod: 'smtp_real_email',
      expiresInSeconds
    };
  } catch (smtpErr: any) {
    console.error(`[Email Gateway] SMTP dispatch failed: ${smtpErr.message}`);
    let errorHelp = smtpErr.message;
    if (smtpHost.includes('gmail.com') && (smtpErr.message.includes('535') || smtpErr.message.includes('BadCredentials'))) {
      errorHelp = 'Gmail rejected login credentials. Gmail requires a 16-character "App Password" (not your normal account password). In your Google Account: Security > 2-Step Verification > App Passwords, generate a password and save it in Settings under SMTP_PASS.';
    }
    return {
      success: false,
      message: errorHelp,
      deliveryMethod: 'smtp_real_email',
      expiresInSeconds: 0,
      error: errorHelp
    };
  }
}

/**
 * Validates a submitted OTP against the active security map
 */
export function verifyOtp(destination: string, submittedCode: string): {
  valid: boolean;
  error?: string;
} {
  cleanExpired();
  const normalizedDest = destination.trim().toLowerCase();
  const stored = activeOtps.get(normalizedDest) || activeOtps.get(destination.trim());

  if (!stored) {
    return {
      valid: false,
      error: 'No active verification code found. Please request a new code.'
    };
  }

  if (Date.now() > stored.expiresAt) {
    activeOtps.delete(normalizedDest);
    return {
      valid: false,
      error: 'Verification code has expired. Please request a new code.'
    };
  }

  if (stored.code !== submittedCode.trim()) {
    return {
      valid: false,
      error: 'Incorrect verification code. Please check your messages and enter the exact 6-digit code received.'
    };
  }

  // Code is verified: consume it so it cannot be re-used
  activeOtps.delete(normalizedDest);
  activeOtps.delete(destination.trim());

  return { valid: true };
}
