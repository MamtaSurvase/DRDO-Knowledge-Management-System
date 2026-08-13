import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DRDOLogo } from '../common/DRDOLogo';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  LockKeyhole,
  Check,
  X,
  Info,
  RefreshCw,
  Building2,
  Cpu
} from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const { setActivePage, addAuditLog } = useApp();

  // Form states
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Password Requirement Checks
  const checks = {
    length: newPassword.length >= 8,
    capital: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
    match: newPassword.length > 0 && newPassword === confirmPassword,
  };

  // Password Strength Score Calculation (0 to 100)
  const calculateStrength = (): { score: number; label: string; color: string; barBg: string } => {
    if (!newPassword) return { score: 0, label: 'Not Entered', color: 'text-slate-500', barBg: 'bg-slate-700' };

    let passedCount = 0;
    if (checks.length) passedCount += 1;
    if (checks.capital) passedCount += 1;
    if (checks.number) passedCount += 1;
    if (checks.special) passedCount += 1;
    if (newPassword.length >= 12) passedCount += 1;

    if (passedCount <= 1) {
      return { score: 25, label: 'Weak', color: 'text-red-400', barBg: 'bg-red-500' };
    } else if (passedCount <= 3) {
      return { score: 55, label: 'Fair / Moderate', color: 'text-amber-400', barBg: 'bg-amber-500' };
    } else if (passedCount === 4) {
      return { score: 80, label: 'Strong', color: 'text-blue-400', barBg: 'bg-blue-500' };
    } else {
      return { score: 100, label: 'Top Secret / Very Strong', color: 'text-emerald-400', barBg: 'bg-emerald-500' };
    }
  };

  const strength = calculateStrength();
  const allRequirementsMet = checks.length && checks.capital && checks.number && checks.special && checks.match;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in both password fields.');
      return;
    }

    if (!checks.match) {
      setErrorMessage('Passwords do not match. Please ensure both fields are identical.');
      return;
    }

    if (!allRequirementsMet) {
      setErrorMessage('Please ensure all security password criteria are satisfied.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      addAuditLog(
        'PASSWORD_RESET_COMPLETED',
        'DRDO KMS Account Credentials Updated',
        'Password successfully changed in HSM Cryptographic Vault.',
        'SUCCESS'
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#070C15] text-slate-100 flex flex-col lg:flex-row overflow-x-hidden select-none font-sans">
      
      {/* LEFT PANEL (48%) - DRDO Intranet Cryptographic Vault Illustration */}
      <div className="w-full lg:w-[48%] bg-gradient-to-br from-[#050912] via-[#0B1220] to-[#0F1A30] relative p-8 sm:p-12 lg:p-14 flex flex-col justify-between border-r border-[#1E293B]/80 overflow-hidden">
        
        {/* Background Grid & Ambient Glows */}
        <div className="absolute inset-0 bg-[radial-[#2563EB]/10_1px,transparent_1px] [background-size:24px_24px] opacity-35 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <DRDOLogo size="xl" className="w-16 h-16 shadow-2xl ring-2 ring-[#2563EB]/60 rounded-full bg-white p-1 shrink-0" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-blue-400 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
                <Shield className="w-3 h-3 text-blue-400" /> DRDO Cyber Security Division
              </div>
              <h2 className="text-xs font-semibold text-slate-300 tracking-widest uppercase">
                Defence Research &amp; Development Organisation
              </h2>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
            Reset Password <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
              Credential Vault
            </span>
          </h1>
          <p className="text-sm text-slate-300 font-medium max-w-lg leading-relaxed">
            Configure a compliant password conforming to DRDO Cyber Security Guidelines (CSG-2026).
          </p>
        </div>

        {/* CENTER SECURITY GRAPHIC: Shield, Lock, Password Strength Indicator */}
        <div className="relative z-10 my-8 py-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md h-64 sm:h-72 flex items-center justify-center">
            
            {/* SVG Connecting Graphic Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="gradReset" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <line x1="200" y1="75" x2="100" y2="210" stroke="url(#gradReset)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="200" y1="75" x2="300" y2="210" stroke="url(#gradReset)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="100" y1="210" x2="300" y2="210" stroke="url(#gradReset)" strokeWidth="2" strokeDasharray="4 4" />

              <circle cx="200" cy="150" r="115" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="6 6" />
            </svg>

            {/* NODE 1: SHIELD */}
            <div className="absolute top-2 z-20 flex flex-col items-center group">
              <div className="relative p-4 rounded-2xl bg-[#0B1220] border-2 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-blue-200 bg-[#0F172A]/90 px-3 py-0.5 rounded-full border border-blue-500/40 tracking-wider shadow-md">
                Shield Policy
              </span>
            </div>

            {/* NODE 2: LOCK */}
            <div className="absolute bottom-4 left-6 sm:left-12 z-20 flex flex-col items-center group">
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border-2 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-7 h-7 text-indigo-400" />
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-indigo-200 bg-[#0F172A]/90 px-3 py-0.5 rounded-full border border-indigo-500/40 tracking-wider shadow-md">
                HSM Vault
              </span>
            </div>

            {/* NODE 3: STRENGTH / KEY */}
            <div className="absolute bottom-4 right-6 sm:right-12 z-20 flex flex-col items-center group">
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border-2 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-300">
                <KeyRound className="w-7 h-7 text-emerald-400" />
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-emerald-200 bg-[#0F172A]/90 px-3 py-0.5 rounded-full border border-emerald-500/40 tracking-wider shadow-md">
                Strong Entropy
              </span>
            </div>

            {/* Center Core Badge */}
            <div className="absolute z-30 p-2.5 rounded-xl bg-[#0F172A] border border-blue-500/60 shadow-2xl flex items-center space-x-2 text-xs font-mono font-bold text-white">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>AES-256 HSM</span>
            </div>

          </div>

          {/* DRDO Password Policy Info Card */}
          <div className="w-full max-w-lg mt-4 bg-[#0F172A]/90 border border-[#1E293B] rounded-2xl p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5 mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> CSG Compliance Guidelines
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300 font-sans">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Minimum 8 characters with alphanumeric mix</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Cannot match previous 5 laboratory passwords</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Password remains valid for 90 days across DRDO Labs</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Cryptographic Vault Engine Active
          </span>
          <span className="font-bold text-slate-300">Authorized Scientist Access</span>
        </div>

      </div>

      {/* RIGHT PANEL (52%) - Glassmorphism Reset Password Form */}
      <div className="w-full lg:w-[52%] bg-[#0B1220] p-6 sm:p-10 lg:p-14 flex items-center justify-center relative min-h-screen">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#2563EB]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="w-full max-w-xl relative z-10">
          
          {/* Glassmorphism Container */}
          <div className="bg-[#0F172A]/85 backdrop-blur-2xl border border-[#1E293B] shadow-2xl shadow-blue-950/70 rounded-2xl p-6 sm:p-10 transition-all">
            
            {/* Top Navigation */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setActivePage('login')}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Login</span>
                </button>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold font-mono">
                  <LockKeyhole className="w-3.5 h-3.5 text-blue-400" /> Credential Management
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Reset Password
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Create a new password for your Knowledge Management Portal account.
              </p>
            </div>

            {/* Error Alert Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>{errorMessage}</div>
              </div>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* FIELD 1: New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    New Password <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4 text-blue-400" />
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-3 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* PASSWORD STRENGTH INDICATOR */}
                <div className="p-3.5 rounded-xl bg-[#111A2E]/90 border border-[#1E293B] space-y-3">
                  
                  {/* Score Header */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Password Strength:
                    </span>
                    <span className={`font-mono font-bold text-xs ${strength.color}`}>
                      {strength.label} ({strength.score}%)
                    </span>
                  </div>

                  {/* Visual Strength Progress Bar */}
                  <div className="w-full h-2 bg-[#0B1220] rounded-full overflow-hidden p-0.5 border border-[#1E293B]">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${strength.barBg}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>

                  {/* Requirements Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#1E293B]/60">
                    
                    <div className="flex items-center space-x-1.5">
                      {checks.length ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className={checks.length ? 'text-slate-200' : 'text-slate-500'}>
                        At least 8 characters
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {checks.capital ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className={checks.capital ? 'text-slate-200' : 'text-slate-500'}>
                        Uppercase &amp; lowercase letters
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {checks.number ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className={checks.number ? 'text-slate-200' : 'text-slate-500'}>
                        At least 1 number (0-9)
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {checks.special ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className={checks.special ? 'text-slate-200' : 'text-slate-500'}>
                        Special character (@, #, $, etc)
                      </span>
                    </div>

                  </div>

                </div>

                {/* FIELD 2: Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    Confirm Password <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className={`w-full bg-[#111A2E] border rounded-xl py-3 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-mono ${
                        confirmPassword
                          ? checks.match
                            ? 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                            : 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#1E293B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Match Status Message */}
                  {confirmPassword && (
                    <div className="mt-1.5 flex items-center space-x-1.5 text-[11px]">
                      {checks.match ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Passwords match!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-red-400 font-bold">Passwords do not match.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Primary Action: Reset Password Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !allRequirementsMet}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Updating Vault Password...</span>
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="w-4 h-4" />
                      <span>Reset Password Button</span>
                    </>
                  )}
                </button>

                {/* Notice banner */}
                <div className="p-3 rounded-xl bg-[#111A2E] border border-[#1E293B] flex items-start space-x-2 text-[11px] text-slate-400">
                  <Building2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200 block">Single Sign-On Sync:</span>
                    Resetting your password will synchronize access across DRDO Knowledge Base, Triple Store, and Semantic Search.
                  </div>
                </div>

                {/* Back to Login Link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setActivePage('login')}
                    className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-medium transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
                    <span>Back to Login</span>
                  </button>
                </div>

              </form>
            ) : (
              /* RESET SUCCESS STATE */
              <div className="text-center py-6 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">Password Reset Complete</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Your account password has been updated in the DRDO Hardware Security Vault. You may now sign in using your new credentials.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111A2E] border border-[#1E293B] text-left text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Encryption standard:</span>
                    <span className="text-blue-300 font-bold">AES-256 HSM</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Audit Ref:</span>
                    <span className="text-slate-200 font-bold">DRDO-CSOC-PW-89201</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Next Mandatory Renewal:</span>
                    <span className="text-emerald-400 font-bold">90 Days</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePage('login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Login with New Password</span>
                </button>
              </div>
            )}


          </div>

        </div>

      </div>

    </div>
  );
};
