import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DRDOLogo } from '../common/DRDOLogo';
import { UserRole } from '../../types';
import { 
  Shield, 
  Database, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  CreditCard, 
  ShieldAlert, 
  Network, 
  Layers, 
  Search,
  BookOpen,
  Bot,
  Globe,
  Sun,
  Moon,
  Type,
  Check,
  ArrowRight,
  FileText,
  X,
  KeyRound,
  Info,
  Clock,
  Calendar,
  UserCheck,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, setIsAuthenticated, setActivePage, users, addAuditLog } = useApp();

  // State
  const [selectedRole, setSelectedRole] = useState<UserRole>('end_user');
  const [employeeIdOrEmail, setEmployeeIdOrEmail] = useState<string>('scientist.thomas@drdo.gov.in');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Header Top Right State: Clock, Language, Accessibility
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [fontSizeClass, setFontSizeClass] = useState<'text-normal' | 'text-large'>('text-normal');

  // Modals
  const [helpModalOpen, setHelpModalOpen] = useState<boolean>(false);
  const [smartCardAlert, setSmartCardAlert] = useState<boolean>(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState<boolean>(false);

  // Live Clock Updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setCurrentDate(now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Role details mapping
  const roleCards = [
    {
      id: 'super_admin' as UserRole,
      title: 'Super Admin',
      badge: 'Full Control',
      icon: ShieldAlert,
      description: 'System Admin & Security Control',
      email: 'admin.saraswat@drdo.gov.in',
      colorStyles: {
        active: 'border-amber-500 bg-gradient-to-b from-amber-500/20 via-[#111A2E] to-amber-950/30 text-white ring-1 ring-amber-500/60 shadow-lg shadow-amber-500/20',
        iconActive: 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40',
        iconInactive: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20',
        badgeActive: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        badgeInactive: 'bg-slate-800/80 text-slate-400 border-slate-700/60'
      }
    },
    {
      id: 'knowledge_admin' as UserRole,
      title: 'Knowledge Admin',
      badge: 'Ontology & Graph',
      icon: Database,
      description: 'Knowledge Graph & Triple Store',
      email: 'knowledge.admin@drdo.gov.in',
      colorStyles: {
        active: 'border-emerald-500 bg-gradient-to-b from-emerald-500/20 via-[#111A2E] to-emerald-950/30 text-white ring-1 ring-emerald-500/60 shadow-lg shadow-emerald-500/20',
        iconActive: 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40',
        iconInactive: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20',
        badgeActive: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        badgeInactive: 'bg-slate-800/80 text-slate-400 border-slate-700/60'
      }
    },
    {
      id: 'end_user' as UserRole,
      title: 'End User / Scientist',
      badge: 'AI Search & Discovery',
      icon: UserCheck,
      description: 'AI Knowledge Search & Assistant',
      email: 'scientist.thomas@drdo.gov.in',
      colorStyles: {
        active: 'border-blue-500 bg-gradient-to-b from-blue-500/20 via-[#111A2E] to-blue-950/30 text-white ring-1 ring-blue-500/60 shadow-lg shadow-blue-500/20',
        iconActive: 'bg-blue-500 text-white shadow-md shadow-blue-500/40',
        iconInactive: 'bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20',
        badgeActive: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        badgeInactive: 'bg-slate-800/80 text-slate-400 border-slate-700/60'
      }
    }
  ];

  // Five Knowledge Flow Stages
  const flowStages = [
    { id: '1', title: 'Research Documents', icon: FileText },
    { id: '2', title: 'Ontology', icon: Layers },
    { id: '3', title: 'Knowledge Graph', icon: Network },
    { id: '4', title: 'Semantic Search', icon: Search },
    { id: '5', title: 'AI Insights', icon: Sparkles },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const matched = roleCards.find(r => r.id === role);
    if (matched) {
      setEmployeeIdOrEmail(matched.email);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const matchedUser = users.find(u => u.role === selectedRole) || {
        id: `usr-${selectedRole}`,
        name: selectedRole === 'end_user' ? 'Dr. Tessy Thomas' : selectedRole === 'knowledge_admin' ? 'Shri G. Satheesh Reddy' : 'Dr. V. K. Saraswat',
        email: employeeIdOrEmail,
        role: selectedRole,
        clearance: selectedRole === 'super_admin' ? 'LEVEL_4_TOP_SECRET' : selectedRole === 'knowledge_admin' ? 'LEVEL_3_SECRET' : 'LEVEL_2_CONFIDENTIAL',
        lab: 'DRDO HQ',
        designation: selectedRole === 'end_user' ? 'Senior Defence Scientist' : selectedRole === 'knowledge_admin' ? 'Head Ontology Curator' : 'Chief System Administrator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'ACTIVE',
        lastActive: 'Just now'
      };

      setCurrentUser(matchedUser);
      setIsAuthenticated(true);
      setActivePage('dashboard');

      addAuditLog(
        'USER_LOGIN',
        `Authenticated as ${matchedUser.name}`,
        `User logged into Portal with ${selectedRole.toUpperCase()} access`,
        'SUCCESS'
      );

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className={`min-h-screen w-full bg-[#070C15] text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white ${fontSizeClass === 'text-large' ? 'text-base' : 'text-sm'}`}>
      
      {/* ========================================================================= */}
      {/* LEFT PANEL (42% on lg, 40% on xl) - Deep Blue Enterprise Government Branding Panel */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[42%] xl:w-[40%] bg-[#081325] text-white relative p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between border-r border-[#1E293B] overflow-hidden shrink-0">
        
        {/* Very small dotted grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.12] bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Low-opacity subtle geometric blueprint lines & connected-node pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 500 700" fill="none">
          <circle cx="100" cy="180" r="180" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="420" cy="520" r="220" stroke="#3B82F6" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M0 220 L500 220 M0 520 L500 520 M250 0 V700 M50 120 L450 620" stroke="#2563EB" strokeWidth="0.75" strokeDasharray="3 3" />
          <circle cx="250" cy="220" r="3" fill="#60A5FA" />
          <circle cx="100" cy="520" r="3" fill="#60A5FA" />
          <circle cx="400" cy="220" r="3" fill="#60A5FA" />
          <circle cx="250" cy="520" r="3" fill="#60A5FA" />
        </svg>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* 1. TOP BRANDING */}
            <div className="flex items-center space-x-3.5 sm:space-x-4 mb-6 sm:mb-8">
              <DRDOLogo size="lg" className="w-12 h-12 sm:w-14 sm:h-14 bg-white p-1 rounded-full shadow-lg shrink-0 border border-slate-200" />
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300 font-sans leading-tight truncate">
                  MINISTRY OF DEFENCE &bull; GOVERNMENT OF INDIA
                </div>
                <div className="text-[11px] sm:text-xs xl:text-[13px] font-extrabold text-white tracking-wider uppercase mt-0.5 leading-snug">
                  DEFENCE RESEARCH &amp; DEVELOPMENT ORGANISATION
                </div>
              </div>
            </div>

            {/* 2. MAIN PROJECT TITLE */}
            <h1 className="text-2xl sm:text-3xl xl:text-3xl font-extrabold tracking-tight leading-snug mb-3 sm:mb-4">
              <span className="text-white block">Ontology Driven</span>
              <span className="text-blue-500 block">AI Knowledge Management System</span>
            </h1>

            {/* 3. PROJECT SUMMARY */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg font-normal mb-6 sm:mb-8">
              Transforming scattered defence research knowledge into a connected, intelligent and searchable knowledge ecosystem.
            </p>

            {/* 4. KNOWLEDGE FLOW VISUAL (5 STAGES HORIZONTAL FLOW) */}
            <div className="my-4 sm:my-6 py-5 sm:py-6 px-3 sm:px-4 bg-[#0D1B2E]/80 border border-blue-900/40 rounded-2xl backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono mb-4 sm:mb-5 text-center">
                Knowledge Architecture Flow
              </div>

              {/* Desktop & Tablet Horizontal Flow */}
              <div className="hidden sm:flex items-start justify-between w-full px-1">
                {flowStages.map((stage, idx) => {
                  const IconComp = stage.icon;
                  const isLast = idx === flowStages.length - 1;
                  return (
                    <React.Fragment key={stage.id}>
                      {/* Circular Outline Stage Node */}
                      <div className="flex flex-col items-center text-center group flex-1">
                        <div className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-[#11243E] border border-blue-500/40 text-blue-400 flex items-center justify-center shadow-md shadow-blue-950/60 group-hover:border-blue-400 group-hover:bg-blue-600/20 group-hover:text-white transition-all duration-300 shrink-0">
                          <IconComp className="w-4 h-4 lg:w-5 lg:h-5 stroke-[2]" />
                        </div>
                        <span className="text-[10px] lg:text-[11px] font-semibold text-slate-200 mt-2 leading-tight group-hover:text-white transition-colors px-0.5">
                          {stage.title}
                        </span>
                      </div>

                      {/* Connecting Line with Glowing Point */}
                      {!isLast && (
                        <div className="flex items-center justify-center pt-5 shrink-0 w-4 sm:w-6 lg:w-8">
                          <div className="w-full h-[2px] bg-gradient-to-r from-blue-500/40 via-blue-400 to-blue-500/40 relative">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3B82F6] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Mobile Vertical Flow */}
              <div className="flex sm:hidden flex-col items-center space-y-2">
                {flowStages.map((stage, idx) => {
                  const IconComp = stage.icon;
                  const isLast = idx === flowStages.length - 1;
                  return (
                    <React.Fragment key={stage.id}>
                      <div className="flex items-center space-x-3 w-full px-3.5 py-2 rounded-xl bg-[#11243E]/80 border border-blue-500/30">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-100">{stage.title}</span>
                      </div>
                      {!isLast && (
                        <div className="w-[2px] h-2.5 bg-gradient-to-b from-blue-500/50 to-blue-400 relative">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5. BOTTOM TAGLINE */}
          <div className="pt-5 sm:pt-6 mt-6 sm:mt-8 border-t border-[#1E293B] flex items-center justify-center text-[11px] sm:text-xs font-medium tracking-wider text-slate-300">
            <span>Secure</span>
            <span className="mx-2.5 sm:mx-3 text-blue-500">&bull;</span>
            <span>Intelligent</span>
            <span className="mx-2.5 sm:mx-3 text-blue-500">&bull;</span>
            <span>Knowledge Driven</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT PANEL (60%) - Matching Dark Navy Theme & Floating Auth Card */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[60%] bg-[#0B1220] p-4 sm:p-8 lg:p-12 flex flex-col justify-between relative min-h-screen">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-[#2563EB]/5 blur-3xl rounded-full pointer-events-none" />



        {/* FLOATING AUTHENTICATION CARD (Rounded 24px, Dark Glassmorphism) */}
        <div className="relative z-10 my-auto py-4 flex items-center justify-center">
          <div className="w-full max-w-xl bg-[#0F172A]/90 backdrop-blur-2xl border border-[#1E293B] shadow-2xl shadow-blue-950/80 rounded-[24px] p-6 sm:p-10 transition-all">
            
            {/* CARD TOP HEADER */}
            <div className="mb-6 flex flex-col items-center text-center pb-5 border-b border-[#1E293B]">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-1 max-w-xs">
                Sign in to continue to the AI Knowledge Management System
              </p>
            </div>

            {/* ROLE SELECTION (ATTRACTIVE CARDS) */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2.5">
                Select Portal Access Role
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {roleCards.map((rc) => {
                  const IconComp = rc.icon;
                  const isSelected = selectedRole === rc.id;

                  return (
                    <button
                      key={rc.id}
                      type="button"
                      onClick={() => handleRoleSelect(rc.id)}
                      className={`relative flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                        isSelected
                          ? rc.colorStyles.active
                          : 'border-[#1E293B] bg-[#111A2E]/80 hover:bg-[#162238] hover:border-slate-500 text-slate-300'
                      }`}
                    >
                      {/* Selection indicator mark */}
                      <div className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/50' : 'border border-slate-600 bg-[#0B1220] group-hover:border-slate-500'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>

                      <div>
                        {/* Top Icon Box & Title */}
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-2 rounded-lg transition-all ${
                            isSelected ? rc.colorStyles.iconActive : rc.colorStyles.iconInactive
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>

                          <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                            {rc.title}
                          </h4>
                        </div>
                      </div>

                      {/* Badge Pill */}
                      <div className="mt-3 pt-2 border-t border-[#1E293B]/60 flex items-center justify-between">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase border ${
                          isSelected ? rc.colorStyles.badgeActive : rc.colorStyles.badgeInactive
                        }`}>
                          {rc.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Official Email Address or Employee ID */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                  Official Email Address or Employee ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={employeeIdOrEmail}
                    onChange={(e) => setEmployeeIdOrEmail(e.target.value)}
                    placeholder="e.g. scientist.thomas@drdo.gov.in"
                    className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-sans"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-blue-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#111A2E] border-[#1E293B] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="font-medium">Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setActivePage('forgot_password')}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Large Primary Button: Sign In Securely */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-white" />
                    <span>Sign In Securely</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1E293B]"></div>
                </div>
                <div className="relative flex justify-center text-[11px] uppercase font-mono">
                  <span className="bg-[#0F172A] px-3 text-slate-400 font-bold">OR</span>
                </div>
              </div>

              {/* Secondary Button: Login using Smart Card (CAC Token) */}
              <button
                type="button"
                onClick={() => setSmartCardAlert(true)}
                className="w-full bg-[#111A2E] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span>Login using Smart Card (CAC Token)</span>
              </button>

            </form>

            {/* REQUEST ACCESS & NEED HELP LINKS */}
            <div className="mt-6 pt-5 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span>New to the platform?</span>
                <button
                  type="button"
                  onClick={() => setActivePage('request_access')}
                  className="font-bold text-blue-400 hover:text-blue-300 underline transition-colors cursor-pointer"
                >
                  Request Access
                </button>
              </div>

              <button
                type="button"
                onClick={() => setHelpModalOpen(true)}
                className="inline-flex items-center space-x-1 text-slate-400 hover:text-slate-200 font-medium transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Need Help? Contact System Administrator</span>
              </button>

            </div>

          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="relative z-10 pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-medium">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setPrivacyPolicyOpen(true)} 
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setPrivacyPolicyOpen(true)} 
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setFontSizeClass(f => f === 'text-normal' ? 'text-large' : 'text-normal')} 
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Accessibility
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setHelpModalOpen(true)} 
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Support
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            DRDO Knowledge System Gateway
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: Smart Card Token Reader Alert */}
      {/* ========================================================================= */}
      {smartCardAlert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setSmartCardAlert(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Smart Card Reader Required</h3>
                <p className="text-xs text-slate-400 font-mono">PKI Token Authentication</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Hardware Cryptographic CAC Smart Card Token reader was not detected on USB interface. Please connect your official DRDO Smart Card Token reader to proceed with PKI login.
            </p>
            <button
              onClick={() => setSmartCardAlert(false)}
              className="w-full bg-[#111A2E] hover:bg-[#1E293B] border border-[#1E293B] text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Return to Standard Login
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: System Administrator Help */}
      {/* ========================================================================= */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setHelpModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">System Administrator Assistance</h3>
                <p className="text-xs text-slate-400 font-mono">DRDO CSOC Help Desk</p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-slate-300 mb-6">
              <div className="p-3 rounded-lg bg-[#111A2E] border border-[#1E293B]">
                <p className="font-bold text-white mb-1">Knowledge System Access Support</p>
                <p className="text-slate-400">For lab dataset access requests, ontology schema clearance, or password resets.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#111A2E] border border-[#1E293B]">
                <p className="font-bold text-white mb-1">DRDO HQ IT Infrastructure Cell</p>
                <p className="text-slate-400">DRDO Bhavan, Rajaji Marg, New Delhi - 110011</p>
                <p className="text-blue-400 font-mono mt-1 font-bold">Ext: 4400 / 4402 | csoc-support@drdo.gov.in</p>
              </div>
            </div>
            <button
              onClick={() => setHelpModalOpen(false)}
              className="w-full bg-[#111A2E] hover:bg-[#1E293B] border border-[#1E293B] text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Privacy & Security Policy */}
      {/* ========================================================================= */}
      {privacyPolicyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setPrivacyPolicyOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Security &amp; Privacy Terms</h3>
                <p className="text-xs text-slate-400 font-mono">Government Defense Portal</p>
              </div>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300 mb-6 max-h-60 overflow-y-auto pr-1">
              <p>
                1. <strong>Authorized Personnel Only:</strong> Access to the DRDO AI Knowledge Management System is granted exclusively to verified DRDO officers, scientists, and accredited research fellows.
              </p>
              <p>
                2. <strong>Audit &amp; Telemetry:</strong> All user sessions, queries, semantic searches, and document downloads are logged in compliance with DRDO Cyber Security Operations Centre (CSOC) standards.
              </p>
              <p>
                3. <strong>Data Classification:</strong> Information retrieved from the ontology database must be handled according to its assigned security classification tag.
              </p>
            </div>
            <button
              onClick={() => setPrivacyPolicyOpen(false)}
              className="w-full bg-[#111A2E] hover:bg-[#1E293B] border border-[#1E293B] text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Acknowledge &amp; Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
