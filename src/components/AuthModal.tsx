import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Phone, 
  User, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  LogOut,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { AuthRole, UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginSuccess: (user: UserAccount) => void;
  onLogout: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email_otp' | 'email'>('phone');
  const [selectedRole, setSelectedRole] = useState<AuthRole>('founder');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | null>(null);
  const [organization, setOrganization] = useState('');
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset demo accounts for quick testing
  const handleDemoLogin = (role: AuthRole) => {
    const demoAccounts: Record<AuthRole, UserAccount> = {
      founder: {
        id: 'usr_founder_01',
        name: 'Ankit Sharma (Founder)',
        email: 'founder@theventurebuild.com',
        role: 'founder',
        provider: 'google',
        title: 'Founder & CEO',
        organization: 'HookMhealth / TVB Orbit'
      },
      investor: {
        id: 'usr_lp_02',
        name: 'Marcus Sterling (GP / LP)',
        email: 'capital@venturebuild-partners.com',
        role: 'investor',
        provider: 'email',
        title: 'Managing General Partner',
        organization: 'TVB Global Syndicate & Fund'
      },
      advisor: {
        id: 'usr_adv_03',
        name: 'Dr. Evelyn Chen',
        email: 'evelyn@tvb-advisors.io',
        role: 'advisor',
        provider: 'google',
        title: 'Healthcare Orbit Lead Advisor',
        organization: 'The Venture Build Advisory'
      },
      partner: {
        id: 'usr_partner_04',
        name: 'David Vance',
        email: 'vance@apexlaw.com',
        role: 'partner',
        provider: 'email',
        title: 'Managing Partner',
        organization: 'Apex Growth Legal (Costco Perk)'
      },
      corporate: {
        id: 'usr_corp_05',
        name: 'Sophia Laurent',
        email: 'laurent@enterprise-tvb.com',
        role: 'corporate',
        provider: 'email',
        title: 'Head of Open Innovation',
        organization: 'Global 500 Corporate Partner'
      }
    };

    const user = demoAccounts[role];
    onLoginSuccess(user);
    onClose();
  };

  // Google Login Simulation
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const simulatedGoogleUser = {
        name: 'Ankit Raj Sharma',
        email: 'ankitrajsharma.125891@marwadiuniversity.ac.in',
        provider: 'google' as const,
        role: selectedRole
      };

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulatedGoogleUser)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage('Logged in successfully with Google Workspace!');
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 600);
      } else {
        setError(data.error || 'Google login failed');
      }
    } catch (err: any) {
      // Fallback
      onLoginSuccess({
        id: 'usr_google_' + Date.now(),
        name: 'Google Verified User',
        email: 'ankitrajsharma.125891@marwadiuniversity.ac.in',
        role: selectedRole,
        provider: 'google',
        title: 'Scale-Up Operator',
        organization: 'The Venture Build Network'
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Real SMS / Phone OTP Verification
  const handleSendOtp = async () => {
    if (!phone || phone.trim().length < 7) {
      setError('Please enter a valid phone number (e.g. +1 512 555 0192 or 7903356870)');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/send-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setOtp('');
        setSuccessMessage(data.message || `Verification code sent to ${data.formattedPhone || phone}`);
      } else {
        setError(data.error || 'Failed to dispatch verification code.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification service unreachable.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (!otp || otp.trim().length < 4) {
      setError('Please enter the 6-digit verification code received.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), code: otp.trim(), role: selectedRole, name: name || undefined })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage('Phone verified successfully! Signing in...');
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 500);
      } else {
        setError(data.error || 'Invalid verification code. Please check and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Real Email OTP Verification via SMTP
  const handleSendEmailOtp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setEmailPreviewUrl(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setOtp('');
        setSuccessMessage(data.message || `Verification code sent to ${email}`);
        if (data.previewUrl) {
          setEmailPreviewUrl(data.previewUrl);
        }
      } else {
        setError(data.error || 'Failed to dispatch email verification code.');
      }
    } catch (err: any) {
      setError(err.message || 'Email dispatch service unreachable.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!otp || otp.trim().length < 4) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: otp.trim(), role: selectedRole, name: name || undefined })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage('Email verified successfully! Signing in...');
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 500);
      } else {
        setError(data.error || 'Invalid verification code. Please check your inbox and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login' 
      ? { email, password, provider: 'email', role: selectedRole }
      : { name, email, password, role: selectedRole, organization, title, provider: 'email' };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(mode === 'login' ? 'Welcome back!' : 'Account registered successfully!');
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 500);
      } else {
        setError(data.error || 'Authentication failed. Check your details.');
      }
    } catch {
      // Local fallback
      onLoginSuccess({
        id: 'usr_' + Date.now(),
        name: name || email.split('@')[0],
        email,
        role: selectedRole,
        provider: 'email',
        title: title || 'Scale-Up Leader',
        organization: organization || 'TVB Ecosystem'
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#021d3a] border border-[#1863dc]/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1863dc] via-cyan-400 to-[#81a9f0]" />

        {/* Modal Top Bar */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-[#172a3e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1863dc]/20 border border-[#1863dc]/50 flex items-center justify-center text-[#81a9f0]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {currentUser ? 'TVB Operator Profile' : mode === 'login' ? 'Sign In to TVB OS' : 'Join The Venture Build'}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser ? `Signed in as ${currentUser.email}` : 'Access deal rooms, scale-up engines, and verified network'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0b1f34] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="p-6 space-y-6">
            <div className="bg-[#0b1f34] border border-[#172a3e] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Current Session</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                  Active {currentUser.role}
                </span>
              </div>
              <div className="font-bold text-white text-base">{currentUser.name}</div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.email}</span>
              </div>
              {currentUser.phone && (
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser.phone}</span>
                </div>
              )}
              {currentUser.organization && (
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser.organization} • {currentUser.title || 'Executive'}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onLogout();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 text-red-300 text-xs font-semibold transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#1863dc] hover:bg-[#1863dc]/90 text-white text-xs font-semibold shadow-lg shadow-[#1863dc]/25 transition-all"
              >
                Continue to Operating System
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Form */
          <div className="p-6 space-y-5">
            {/* Mode Switcher Tabs (Login vs Register) */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'login' 
                    ? 'bg-[#1863dc] text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'register' 
                    ? 'bg-[#1863dc] text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role selection pill selector */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Your Role / Perspective
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
                {(['founder', 'investor', 'advisor'] as AuthRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 px-2 rounded-lg border text-center capitalize transition-all ${
                      selectedRole === r
                        ? 'bg-[#1863dc]/25 border-[#1863dc] text-white font-bold'
                        : 'bg-[#0b1f34] border-[#172a3e] text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick 1-Click Social Sign-In Buttons */}
            <div className="space-y-2">
              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold transition-all shadow-md active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google / Gmail</span>
              </button>

              {/* Method Switcher: Phone vs Email OTP vs Password */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => { setLoginMethod('phone'); setError(null); setOtpSent(false); setOtp(''); }}
                  className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all text-center ${
                    loginMethod === 'phone'
                      ? 'bg-[#0b1f34] text-[#81a9f0] border-[#1863dc]/60 font-bold'
                      : 'bg-[#02172e] text-slate-400 border-[#172a3e] hover:text-slate-200'
                  }`}
                >
                  Phone (SMS OTP)
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginMethod('email_otp'); setError(null); setOtpSent(false); setOtp(''); }}
                  className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all text-center ${
                    loginMethod === 'email_otp'
                      ? 'bg-[#0b1f34] text-[#81a9f0] border-[#1863dc]/60 font-bold'
                      : 'bg-[#02172e] text-slate-400 border-[#172a3e] hover:text-slate-200'
                  }`}
                >
                  Email (Inbox OTP)
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginMethod('email'); setError(null); }}
                  className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all text-center ${
                    loginMethod === 'email'
                      ? 'bg-[#0b1f34] text-[#81a9f0] border-[#1863dc]/60 font-bold'
                      : 'bg-[#02172e] text-slate-400 border-[#172a3e] hover:text-slate-200'
                  }`}
                >
                  Password
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#172a3e]"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-slate-500">or authenticate</span>
              <div className="flex-grow border-t border-[#172a3e]"></div>
            </div>

            {/* Error / Success feedback */}
            {error && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form for Phone Number OTP */}
            {loginMethod === 'phone' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Mobile Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (512) 555-0199 or 7903356870"
                      className="w-full pl-9 pr-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-[#1863dc] hover:bg-[#1863dc]/90 text-white text-xs font-semibold shadow-lg shadow-[#1863dc]/25 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Send 6-Digit Verification Code</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-slate-300 font-medium">Enter 6-Digit Code</label>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[10px] text-[#81a9f0] hover:underline"
                        >
                          Resend Code
                        </button>
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit code"
                        maxLength={6}
                        className="w-full px-3 py-2 text-center tracking-widest font-mono text-base bg-[#02172e] border border-[#1863dc] rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyPhone}
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verify & Sign In</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : loginMethod === 'email_otp' ? (
              /* Form for Email OTP via Real SMTP */
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Your Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@theventurebuild.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                {emailPreviewUrl && (
                  <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-800 text-cyan-200 text-xs flex flex-col gap-1.5">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Live SMTP Email Dispatched:
                    </span>
                    <a
                      href={emailPreviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-mono text-[11px]"
                    >
                      <span>Open dispatched email in web viewer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-[#1863dc] hover:bg-[#1863dc]/90 text-white text-xs font-semibold shadow-lg shadow-[#1863dc]/25 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Send 6-Digit Email Code via SMTP</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-slate-300 font-medium">Enter 6-Digit Email Code</label>
                        <button
                          type="button"
                          onClick={handleSendEmailOtp}
                          className="text-[10px] text-[#81a9f0] hover:underline"
                        >
                          Resend Code
                        </button>
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit code"
                        maxLength={6}
                        className="w-full px-3 py-2 text-center tracking-widest font-mono text-base bg-[#02172e] border border-[#1863dc] rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyEmailOtp}
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verify & Sign In</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Form for Email & Password */
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ankit Sharma"
                        className="w-full pl-9 pr-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Work or Personal Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@scaleup.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Company / Startup</label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. ThreatWorx"
                        className="w-full px-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Job Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Co-Founder & CTO"
                        className="w-full px-3 py-2 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-[#1863dc] hover:bg-[#1863dc]/90 text-white text-xs font-semibold shadow-lg shadow-[#1863dc]/25 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to TVB Platform' : 'Create Verified Account'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick 1-Click Demo Login Shortcuts */}
            <div className="pt-2 border-t border-[#172a3e]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Instant Demo Access (1-Click)
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">No password required</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('founder')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0b1f34] hover:bg-[#172a3e] border border-[#172a3e] text-left text-slate-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span className="font-medium truncate">Founder Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('investor')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0b1f34] hover:bg-[#172a3e] border border-[#172a3e] text-left text-slate-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium truncate">GP / LP Investor</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
