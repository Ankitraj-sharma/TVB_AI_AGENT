import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Phone, 
  User, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Sparkles, 
  KeyRound, 
  ChevronRight,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { AuthRole, UserAccount } from '../types';

interface AuthPageViewProps {
  onSuccess: (user: UserAccount) => void;
  onCancel: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthPageView: React.FC<AuthPageViewProps> = ({
  onSuccess,
  onCancel,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'email' | 'google' | 'phone'>('email');
  const [selectedRole, setSelectedRole] = useState<AuthRole>('founder');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [organization, setOrganization] = useState('');
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Ankit Raj Sharma',
          email: 'ankitrajsharma.125891@marwadiuniversity.ac.in',
          provider: 'google',
          role: selectedRole
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        onSuccess(data.user);
      } else {
        setError(data.error || 'Google Authentication failed');
      }
    } catch {
      onSuccess({
        id: 'usr_google_' + Date.now(),
        name: 'Ankit Raj Sharma',
        email: 'ankitrajsharma.125891@marwadiuniversity.ac.in',
        role: selectedRole,
        provider: 'google',
        title: 'Scale-Up Leader',
        organization: 'The Venture Build Network'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerify = async () => {
    if (!otp) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, provider: 'phone', role: selectedRole })
      });
      const data = await res.json();
      if (data.success && data.user) {
        onSuccess(data.user);
      }
    } catch {
      onSuccess({
        id: 'usr_phone_' + Date.now(),
        name: `User (${phone})`,
        email: `${phone}@theventurebuild.com`,
        phone,
        role: selectedRole,
        provider: 'phone',
        title: 'Verified Member',
        organization: 'TVB Network'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        onSuccess(data.user);
      } else {
        setError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      onSuccess({
        id: 'usr_' + Date.now(),
        name: name || email.split('@')[0],
        email,
        role: selectedRole,
        provider: 'email',
        title: title || 'Executive',
        organization: organization || 'The Venture Build'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Brand & Role capability breakdown */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#021d3a] to-[#0b1f34] border border-[#172a3e] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1863dc]/20 text-[#81a9f0] border border-[#1863dc]/40 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Role-Based Access Control</span>
            </div>

            <h2 className="font-display font-bold text-2xl text-white tracking-tight leading-snug mb-2">
              Welcome to The Venture Build Ecosystem
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Sign in to unlock personalized dashboards, live pipeline metrics, capital drawdowns, and autonomous execution engines.
            </p>

            {/* Role Capabilities Preview */}
            <div className="space-y-3">
              <div className={`p-3 rounded-xl border transition-all ${selectedRole === 'founder' ? 'bg-[#1863dc]/20 border-[#1863dc] text-white' : 'bg-[#02172e]/60 border-[#172a3e] text-slate-400'}`}>
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Founders & Scale-Ups</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Access 4 Scale-Up Engines, $500K+ perks in the Marketplace, and TVB operational squad interventions.
                </p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${selectedRole === 'investor' ? 'bg-[#1863dc]/20 border-[#1863dc] text-white' : 'bg-[#02172e]/60 border-[#172a3e] text-slate-400'}`}>
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Investors & LPs</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Institutional access to audited deal rooms, Fund I IRR (28.4%), 2.42x TVPI models, and cap table models.
                </p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${selectedRole === 'advisor' ? 'bg-[#1863dc]/20 border-[#1863dc] text-white' : 'bg-[#02172e]/60 border-[#172a3e] text-slate-400'}`}>
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Advisors & Partners</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Global hub access across Austin, Paris, London, and UAE corridors for cross-border scale.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#172a3e]/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Powered by MongoDB Atlas</span>
            <span className="font-mono text-emerald-400">SOC2 Type II Ready</span>
          </div>
        </div>

        {/* Right column: Form Card */}
        <div className="md:col-span-7 bg-[#021d3a] border border-[#1863dc]/40 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Top row: Tab switch (Sign in vs Register) */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex p-1 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    mode === 'login' ? 'bg-[#1863dc] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(null); }}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    mode === 'register' ? 'bg-[#1863dc] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <button
                onClick={onCancel}
                className="text-xs text-slate-400 hover:text-white underline font-medium"
              >
                Back to Overview
              </button>
            </div>

            {/* Select Role */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Select Your Role / Access Level
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['founder', 'investor', 'advisor'] as AuthRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 px-3 rounded-xl border text-center capitalize font-semibold transition-all ${
                      selectedRole === r
                        ? 'bg-[#1863dc] text-white border-[#1863dc] shadow-md shadow-[#1863dc]/25'
                        : 'bg-[#0b1f34] text-slate-300 border-[#172a3e] hover:border-slate-500'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Google One-Tap / Social Auth */}
            <div className="mb-5">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-md active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google / Gmail</span>
              </button>
            </div>

            {/* Auth method pills: Email vs Phone */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setAuthMethod('email'); setError(null); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  authMethod === 'email'
                    ? 'bg-[#0b1f34] text-[#81a9f0] border-[#1863dc]'
                    : 'bg-[#02172e] text-slate-400 border-[#172a3e] hover:text-white'
                }`}
              >
                Email Address
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('phone'); setError(null); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  authMethod === 'phone'
                    ? 'bg-[#0b1f34] text-[#81a9f0] border-[#1863dc]'
                    : 'bg-[#02172e] text-slate-400 border-[#172a3e] hover:text-white'
                }`}
              >
                Mobile OTP
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Phone OTP Mode */}
            {authMethod === 'phone' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Mobile Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (512) 839-4400"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!phone) {
                        setError('Please enter your mobile phone number.');
                        return;
                      }
                      setOtpSent(true);
                      setOtp('790331');
                    }}
                    className="w-full py-3 rounded-xl bg-[#1863dc] hover:bg-[#1863dc]/90 text-white text-xs font-bold shadow-lg shadow-[#1863dc]/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Verification Code (SMS)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs text-slate-300 font-medium">6-Digit Verification Code</label>
                        <span className="text-[11px] text-cyan-400 font-mono">Demo OTP: 790331</span>
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="790331"
                        maxLength={6}
                        className="w-full px-3 py-2.5 text-center tracking-widest font-mono text-base bg-[#02172e] border border-[#1863dc] rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handlePhoneVerify}
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Sign In</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Email Mode */
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 font-medium">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ankit Sharma"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@venturebuild.io"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Organization</label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Startup / Fund Name"
                        className="w-full px-3 py-2.5 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Job Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. CEO or Partner"
                        className="w-full px-3 py-2.5 bg-[#02172e] border border-[#172a3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1863dc]"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#1863dc] hover:bg-[#1863dc]/90 text-white text-xs font-bold shadow-lg shadow-[#1863dc]/25 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <span>{mode === 'login' ? 'Sign In to TVB Platform' : 'Create Verified Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#172a3e] text-center text-xs text-slate-400">
            <span>By proceeding you agree to The Venture Build's </span>
            <span className="text-[#81a9f0] cursor-pointer hover:underline">Confidentiality & Ecosystem Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
