import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DRDOLogo } from '../common/DRDOLogo';
import { 
  Shield, 
  Lock, 
  Mail, 
  ArrowLeft, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Send,
  Building2,
  LockKeyhole
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { setActivePage, addAuditLog } = useApp();

  // Form states
  const [email, setEmail] = useState<string>('scientist.thomas@drdo.gov.in');
  const [step, setStep] = useState<'request_otp' | 'verify_otp' | 'success'>('request_otp');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // Loading & Timer states
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Sample quick email select for testing ease
  const quickEmails = [
    { label: 'Dr. Tessy Thomas (End User)', email: 'scientist.thomas@drdo.gov.in' },
    { label: 'Shri G. Satheesh Reddy (Knowledge Admin)', email: 'knowledge.admin@drdo.gov.in' },
    { label: 'Dr. V. K. Saraswat (Super Admin)', email: 'admin.saraswat@drdo.gov.in' },
  ];

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle Send OTP
  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid DRDO registered email address.');
      return;
    }

    if (!email.endsWith('drdo.gov.in') && !email.includes('@')) {
      setErrorMessage('Access restricted: Email must be a registered @drdo.gov.in address.');
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setStep('verify_otp');
      setCountdown(45); // 45 seconds countdown for resend
      setSuccessMessage(`OTP sent successfully to ${email}. Check your defense intranet mail.`);
      
      // Auto fill a mock OTP for easy verification testing
      setOtpValues(['8', '4', '2', '9', '1', '0']);

      addAuditLog(
        'PASSWORD_RESET_OTP_REQUESTED',
        `OTP requested for ${email}`,
        `Password reset OTP generated and sent to encrypted gateway for ${email}`,
        'SUCCESS'
      );
    }, 800);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.slice(0, 6).split('');
      const newOtp = [...otpValues];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtpValues(newOtp);
      return;
    }

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle KeyDown for backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle Verify OTP and Reset
  const handleVerifyAndReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter the full 6-digit OTP code.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');

      addAuditLog(
        'PASSWORD_RESET_VERIFIED',
        `Password reset completed for ${email}`,
        `Security verification successful. User credential updated in KMS vault.`,
        'SUCCESS'
      );
    }, 1000);
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (countdown > 0) return;
    setIsSending(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSending(false);
      setCountdown(45);
      setSuccessMessage(`New OTP re-dispatched to ${email}.`);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#070C15] text-slate-100 flex flex-col lg:flex-row overflow-x-hidden select-none font-sans">
      
      {/* LEFT PANEL (48%) - Security Illustration & Security Credentials */}
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
            Forgot Password <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
              Identity Verification
            </span>
          </h1>
          <p className="text-sm text-slate-300 font-medium max-w-lg leading-relaxed">
            Enter your registered email address to receive a secure One-Time Password (OTP) on the DRDO intranet gateway.
          </p>
        </div>

        {/* CENTER SECURITY ILLUSTRATION: Shield, Lock, Email */}
        <div className="relative z-10 my-8 py-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md h-64 sm:h-72 flex items-center justify-center">
            
            {/* SVG Connecting Graphic Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="gradSecurity" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Connecting Dashed Triangles */}
              <line x1="200" y1="80" x2="100" y2="210" stroke="url(#gradSecurity)" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="200" y1="80" x2="300" y2="210" stroke="url(#gradSecurity)" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="100" y1="210" x2="300" y2="210" stroke="url(#gradSecurity)" strokeWidth="2" strokeDasharray="5 5" />

              {/* Pulsing Concentric Circles */}
              <circle cx="200" cy="150" r="110" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="200" cy="150" r="60" fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" />
            </svg>

            {/* TOP ILLUSTRATION NODE: SHIELD */}
            <div className="absolute top-2 z-20 flex flex-col items-center group">
              <div className="relative p-4 rounded-2xl bg-[#0B1220] border-2 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-blue-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-blue-200 bg-[#0F172A]/90 px-3 py-0.5 rounded-full border border-blue-500/40 tracking-wider shadow-md">
                Shield
              </span>
            </div>

            {/* BOTTOM LEFT ILLUSTRATION NODE: LOCK */}
            <div className="absolute bottom-4 left-6 sm:left-12 z-20 flex flex-col items-center group">
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border-2 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-7 h-7 text-indigo-400" />
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-indigo-200 bg-[#0F172A]/90 px-3 py-0.5 rounded-full border border-indigo-500/40 tracking-wider shadow-md">
                Lock
              </span>
            </div>

            {/* BOTTOM RIGHT ILLUSTRATION NODE: EMAIL */}
            <div className="absolute bottom-4 right-6 sm:right-12 z-20 flex flex-col items-center group">
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border-2 border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-cyan-400" />
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-cyan-200 bg-[#0F172A]/90 px-3 py-0.5 rounded-full border border-cyan-500/40 tracking-wider shadow-md">
                Email
              </span>
            </div>

            {/* Center Core Badge */}
            <div className="absolute z-30 p-2 rounded-xl bg-[#0F172A] border border-blue-500/60 shadow-xl flex items-center space-x-1.5 text-[10px] font-mono font-bold text-white">
              <LockKeyhole className="w-3.5 h-3.5 text-blue-400" />
              <span>OTP AUTH</span>
            </div>

          </div>

          {/* Security Features Checklist */}
          <div className="w-full max-w-lg mt-4 bg-[#0F172A]/90 border border-[#1E293B] rounded-2xl p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5 mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Security Reset Protocol
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                256-BIT ENCRYPTED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-[#111A2E]/80 border border-[#1E293B]">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white">Shield Validation</p>
                  <p className="text-[9px] text-slate-400 truncate">Identity Verification</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-xl bg-[#111A2E]/80 border border-[#1E293B]">
                <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white">Lock Encryption</p>
                  <p className="text-[9px] text-slate-400 truncate">Vault Level Passcode</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-xl bg-[#111A2E]/80 border border-[#1E293B]">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white">Email Dispatch</p>
                  <p className="text-[9px] text-slate-400 truncate">Official Intranet Mail</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            DRDO Security Node Active
          </span>
        </div>

      </div>

      {/* RIGHT PANEL (52%) - Glassmorphism Forgot Password Form */}
      <div className="w-full lg:w-[52%] bg-[#0B1220] p-6 sm:p-10 lg:p-14 flex items-center justify-center relative min-h-screen">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#2563EB]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="w-full max-w-xl relative z-10">
          
          {/* Glass Card */}
          <div className="bg-[#0F172A]/85 backdrop-blur-2xl border border-[#1E293B] shadow-2xl shadow-blue-950/70 rounded-2xl p-6 sm:p-10 transition-all">
            
            {/* Header */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setActivePage('login')}
                className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mb-4 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Login</span>
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-mono mb-2 ml-3">
                <KeyRound className="w-3.5 h-3.5 text-blue-400" /> Account Recovery
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Forgot Password
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Enter your registered email address to receive an authentication OTP.
              </p>
            </div>

            {/* Error or Success Alert Banners */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-2.5 text-xs text-red-300 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>{errorMessage}</div>
              </div>
            )}

            {successMessage && step !== 'success' && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>{successMessage}</div>
              </div>
            )}

            {/* STEP 1: REQUEST OTP */}
            {step === 'request_otp' && (
              <form onSubmit={handleSendOTP} className="space-y-5">
                
                {/* Registered Email Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4.5 h-4.5 text-blue-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. scientist.thomas@drdo.gov.in"
                      className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Quick Test Email Selectors */}
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Select Test Account Email:
                  </span>
                  <div className="space-y-1.5">
                    {quickEmails.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEmail(item.email)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          email === item.email
                            ? 'bg-[#2563EB]/20 border-[#2563EB] text-blue-300 font-bold'
                            : 'bg-[#111A2E]/60 border-[#1E293B] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-[10px] text-slate-400">{item.email}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Action: Send OTP Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending OTP to DRDO Mailer...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send OTP Button</span>
                    </>
                  )}
                </button>

                {/* Security Restriction Banner */}
                <div className="p-3 rounded-xl bg-[#111A2E] border border-[#1E293B] flex items-start space-x-2 text-[11px] text-slate-400">
                  <Building2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200 block">Intranet Verification Notice:</span>
                    OTPs are dispatched via DRDO secure mail server. Check your defense email inbox or spam filter.
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
            )}

            {/* STEP 2: VERIFY OTP & SET NEW PASSWORD */}
            {step === 'verify_otp' && (
              <form onSubmit={handleVerifyAndReset} className="space-y-5">
                
                {/* Email Display */}
                <div className="p-3 rounded-xl bg-[#111A2E] border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-xs font-mono text-slate-200 truncate">{email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('request_otp')}
                    className="text-[11px] text-blue-400 hover:underline shrink-0 ml-2 font-bold cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* 6-Digit OTP Inputs */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-300 font-mono">
                      Enter 6-Digit OTP Code
                    </label>
                    <span className="text-[11px] text-blue-400 font-mono font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Auto-filled for testing
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {otpValues.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-full h-12 text-center text-lg font-mono font-bold bg-[#111A2E] border border-[#1E293B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl text-white outline-none transition-all"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend OTP button */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Didn't receive the code?</span>
                  <button
                    type="button"
                    disabled={countdown > 0 || isSending}
                    onClick={handleResendOTP}
                    className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-bold disabled:text-slate-600 disabled:no-underline cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSending ? 'animate-spin' : ''}`} />
                    <span>
                      {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                    </span>
                  </button>
                </div>

                {/* Optional New Password Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4 text-blue-400" />
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new account password (min 6 chars)"
                      className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new account password"
                      className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying OTP &amp; Updating Vault...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify OTP &amp; Reset Password</span>
                    </>
                  )}
                </button>

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
            )}

            {/* STEP 3: SUCCESS STATE */}
            {step === 'success' && (
              <div className="text-center py-6 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">Password Reset Successful!</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Your password credentials for <span className="text-blue-400 font-mono font-bold">{email}</span> have been updated in the DRDO Knowledge Management System vault.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111A2E] border border-[#1E293B] text-left text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-bold">VERIFIED &amp; UPDATED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Intranet Audit ID:</span>
                    <span className="text-slate-200">AUD-DRDO-2026-9041</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePage('reset_password')}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Go to Reset Password Page</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePage('login')}
                    className="flex-1 bg-[#111A2E] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-blue-400" />
                    <span>Back to Login</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
