import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DRDOLogo } from '../common/DRDOLogo';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  User,
  Mail,
  BadgeCheck,
  Phone,
  Building2,
  FlaskConical,
  Award,
  ShieldAlert,
  Network,
  UserCheck,
  Info,
  Send,
  LockKeyhole,
  Check,
  FileText
} from 'lucide-react';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const { setActivePage, addAuditLog } = useApp();

  // Personal Information
  const [fullName, setFullName] = useState<string>('Dr. Rajesh Kumar');
  const [email, setEmail] = useState<string>('rajesh.kumar@drdo.gov.in');
  const [empId, setEmpId] = useState<string>('DRDO-EMP-9204');
  const [mobile, setMobile] = useState<string>('+91 98765 43210');

  // Organization Information
  const [department, setDepartment] = useState<string>('Cyber Security & AI Division');
  const [drdoLab, setDrdoLab] = useState<string>('CAIR - Centre for Artificial Intelligence & Robotics');
  const [designation, setDesignation] = useState<string>("Scientist 'SD' / Senior Research Fellow");

  // Role Selection
  const [selectedRole, setSelectedRole] = useState<UserRole>('end_user');

  // Security
  const [password, setPassword] = useState<string>('DrdoKms@2026!');
  const [confirmPassword, setConfirmPassword] = useState<string>('DrdoKms@2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(true);

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sample DRDO Labs for Dropdown Option Quick Select
  const drdoLabsList = [
    'CAIR - Centre for Artificial Intelligence & Robotics',
    'ADE - Aeronautical Development Establishment',
    'DRDL - Defence Research & Development Laboratory',
    'LRDE - Electronics & Radar Development Establishment',
    'R&DE - Research & Development Establishment (Engineers)',
    'SAG - Scientific Analysis Group',
    'SSPL - Solid State Physics Laboratory',
    'LASTEC - Laser Science & Technology Centre',
  ];

  // Sample Departments
  const departmentsList = [
    'Cyber Security & AI Division',
    'Aeronautical Systems',
    'Armament & Combat Engineering',
    'Electronics & Communication',
    'Missiles & Strategic Systems',
    'Naval Systems & Materials',
  ];

  // Role Card Options
  const roleCards = [
    {
      id: 'knowledge_admin' as UserRole,
      title: 'Knowledge Admin',
      badge: 'Ontology & Graph',
      description: 'Ontology Curation & Schema Curation',
      icon: Network,
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
      badge: 'AI Assistant',
      description: 'Knowledge Search & AI Assistant Access',
      icon: UserCheck,
      colorStyles: {
        active: 'border-blue-500 bg-gradient-to-b from-blue-500/20 via-[#111A2E] to-blue-950/30 text-white ring-1 ring-blue-500/60 shadow-lg shadow-blue-500/20',
        iconActive: 'bg-blue-500 text-white shadow-md shadow-blue-500/40',
        iconInactive: 'bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20',
        badgeActive: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        badgeInactive: 'bg-slate-800/80 text-slate-400 border-slate-700/60'
      }
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !empId || !mobile || !department || !drdoLab || !designation || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!email.endsWith('drdo.gov.in') && !email.includes('drdo')) {
      setErrorMessage('Access Restricted: Email address must be an official @drdo.gov.in address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check both password fields.');
      return;
    }

    if (!agreePolicy) {
      setErrorMessage("You must agree to the organization's security policy to submit your registration request.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      addAuditLog(
        'ACCESS_REQUEST_SUBMITTED',
        `Access request submitted by ${fullName} (${email})`,
        `Role: ${selectedRole.toUpperCase()}, Lab: ${drdoLab}, EmpID: ${empId}`,
        'SUCCESS'
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#070C15] text-slate-100 flex flex-col lg:flex-row overflow-x-hidden select-none font-sans">
      
      {/* LEFT PANEL (40%) - DRDO Branding & System Access Overview */}
      <div className="w-full lg:w-[40%] bg-gradient-to-br from-[#050912] via-[#0B1220] to-[#0F1A30] relative p-8 sm:p-12 lg:p-14 flex flex-col justify-between border-r border-[#1E293B]/80 overflow-hidden">
        
        {/* Background Grid & Glowing Orbs */}
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
            Request Access <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
              AI Knowledge System
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-lg leading-relaxed">
            Submit your details for administrator approval to access the DRDO Ontology-Driven Knowledge Base.
          </p>
        </div>

        {/* CENTER ILLUSTRATION: Access Approval Diagram */}
        <div className="relative z-10 my-6 py-4 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-sm h-56 flex items-center justify-center">
            
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 220">
              <defs>
                <linearGradient id="gradRegister" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <line x1="175" y1="50" x2="80" y2="160" stroke="url(#gradRegister)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="175" y1="50" x2="270" y2="160" stroke="url(#gradRegister)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="80" y1="160" x2="270" y2="160" stroke="url(#gradRegister)" strokeWidth="2" strokeDasharray="4 4" />

              <circle cx="175" cy="110" r="90" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="5 5" />
            </svg>

            {/* TOP NODE: USER REQUEST */}
            <div className="absolute top-1 z-20 flex flex-col items-center group">
              <div className="p-3 rounded-2xl bg-[#0B1220] border-2 border-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-300">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <span className="mt-1 text-[10px] font-extrabold text-blue-200 bg-[#0F172A]/90 px-2.5 py-0.5 rounded-full border border-blue-500/40 tracking-wider">
                1. Scientist Request
              </span>
            </div>

            {/* BOTTOM LEFT NODE: SUPER ADMIN VERIFICATION */}
            <div className="absolute bottom-2 left-2 z-20 flex flex-col items-center group">
              <div className="p-3 rounded-2xl bg-[#0B1220] border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300">
                <ShieldAlert className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="mt-1 text-[10px] font-extrabold text-indigo-200 bg-[#0F172A]/90 px-2.5 py-0.5 rounded-full border border-indigo-500/40 tracking-wider">
                2. Admin Vetting
              </span>
            </div>

            {/* BOTTOM RIGHT NODE: PORTAL ACCESS */}
            <div className="absolute bottom-2 right-2 z-20 flex flex-col items-center group">
              <div className="p-3 rounded-2xl bg-[#0B1220] border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="mt-1 text-[10px] font-extrabold text-emerald-200 bg-[#0F172A]/90 px-2.5 py-0.5 rounded-full border border-emerald-500/40 tracking-wider">
                3. Access Granted
              </span>
            </div>

          </div>

          {/* Verification Protocol checklist */}
          <div className="w-full max-w-sm mt-2 bg-[#0F172A]/90 border border-[#1E293B] rounded-2xl p-3.5 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 mb-2">
              <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Registration Workflow
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Intranet domain &amp; Employee ID verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Lab Director &amp; Departmental clearance check</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Secure encrypted password vault provisioning</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="relative z-10 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            DRDO Onboarding Gateway Active
          </span>
        </div>

      </div>

      {/* RIGHT PANEL (60%) - Glassmorphism Request Access Form */}
      <div className="w-full lg:w-[60%] bg-[#0B1220] p-5 sm:p-8 lg:p-12 flex items-center justify-center relative min-h-screen">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[#2563EB]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="w-full max-w-2xl relative z-10 my-6">
          
          {/* Glassmorphic Container Card */}
          <div className="bg-[#0F172A]/85 backdrop-blur-2xl border border-[#1E293B] shadow-2xl shadow-blue-950/70 rounded-2xl p-6 sm:p-10 transition-all">
            
            {/* Form Header */}
            <div className="mb-6 border-b border-[#1E293B] pb-5">
              <button
                type="button"
                onClick={() => setActivePage('login')}
                className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mb-3 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Login</span>
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-mono mb-2 ml-3">
                <FileText className="w-3.5 h-3.5 text-blue-400" /> Account Access Registration
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Request Access
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Submit your details for administrator approval.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="font-medium">{errorMessage}</div>
              </div>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* SECTION 1: PERSONAL INFORMATION */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-1 border-b border-[#1E293B]/80">
                    <User className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Full Name <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Rajesh Kumar"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                        />
                      </div>
                    </div>

                    {/* Official DRDO Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Official DRDO Email Address <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. rajesh.kumar@drdo.gov.in"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Employee ID */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Employee ID <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <BadgeCheck className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={empId}
                          onChange={(e) => setEmpId(e.target.value)}
                          placeholder="e.g. DRDO-EMP-9204"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Mobile Number <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* SECTION 2: ORGANIZATION */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2 pb-1 border-b border-[#1E293B]/80">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Organization
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Department */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Department <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Building2 className="w-4 h-4 text-blue-400" />
                        </div>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                        >
                          {departmentsList.map((dept, idx) => (
                            <option key={idx} value={dept} className="bg-[#0F172A] text-white">
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* DRDO Laboratory */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        DRDO Laboratory <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <FlaskConical className="w-4 h-4 text-blue-400" />
                        </div>
                        <select
                          value={drdoLab}
                          onChange={(e) => setDrdoLab(e.target.value)}
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                        >
                          {drdoLabsList.map((lab, idx) => (
                            <option key={idx} value={lab} className="bg-[#0F172A] text-white">
                              {lab}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Designation <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Award className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Scientist 'SD' / Senior Research Officer"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* SECTION 3: ROLE SELECTION (RADIO CARDS) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2 pb-1 border-b border-[#1E293B]/80">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Role Selection
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {roleCards.map((role) => {
                      const IconComp = role.icon;
                      const isSelected = selectedRole === role.id;

                      return (
                        <div
                          key={role.id}
                          onClick={() => setSelectedRole(role.id)}
                          className={`relative flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                            isSelected
                              ? role.colorStyles.active
                              : 'border-[#1E293B] bg-[#111A2E]/80 hover:bg-[#162238] hover:border-slate-500 text-slate-300'
                          }`}
                        >
                          {/* Selection mark */}
                          <div className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                            isSelected ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/50' : 'border border-slate-600 bg-[#0B1220] group-hover:border-slate-500'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>

                          <div>
                            {/* Top Icon & Title */}
                            <div className="flex items-center space-x-2.5">
                              <div className={`p-2 rounded-lg transition-all ${
                                isSelected ? role.colorStyles.iconActive : role.colorStyles.iconInactive
                              }`}>
                                <IconComp className="w-4 h-4" />
                              </div>

                              <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                                {role.title}
                              </h4>
                            </div>
                          </div>

                          {/* Badge Pill */}
                          <div className="mt-3 pt-2 border-t border-[#1E293B]/60 flex items-center justify-between">
                            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase border ${
                              isSelected ? role.colorStyles.badgeActive : role.colorStyles.badgeInactive
                            }`}>
                              {role.badge}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION 4: SECURITY */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2 pb-1 border-b border-[#1E293B]/80">
                    <LockKeyhole className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Security
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Password <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter strong account password"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 font-mono">
                        Confirm Password <span className="text-blue-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-blue-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter account password"
                          className="w-full bg-[#111A2E] border border-[#1E293B] rounded-xl py-2.5 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* CHECKBOX: Security Policy Agreement */}
                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreePolicy}
                      onChange={(e) => setAgreePolicy(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded bg-[#111A2E] border-[#1E293B] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                      I agree to the organization's security policy.
                    </span>
                  </label>
                </div>

                {/* BUTTONS: PRIMARY & SECONDARY */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  
                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Registration Request</span>
                      </>
                    )}
                  </button>

                  {/* Secondary Back to Login Button */}
                  <button
                    type="button"
                    onClick={() => setActivePage('login')}
                    className="bg-[#111A2E] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-blue-400" />
                    <span>Back to Login</span>
                  </button>

                </div>

                {/* BLUE INFORMATION CARD BELOW */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start space-x-3 backdrop-blur-md">
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Your account request will be reviewed by the Super Administrator. You will receive an email after approval.
                  </p>
                </div>

              </form>
            ) : (
              /* SUCCESS CONFIRMATION RECEIPT */
              <div className="text-center py-6 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white">Registration Request Submitted!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                    Your access request for <span className="text-blue-400 font-mono font-bold">{fullName}</span> ({email}) has been logged in the DRDO Knowledge Management System.
                  </p>
                </div>

                {/* Summary Ticket Card */}
                <div className="p-4 rounded-2xl bg-[#111A2E] border border-[#1E293B] text-left text-xs space-y-2.5 max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] pb-2 border-b border-[#1E293B]">
                    <span>Reference Ticket ID:</span>
                    <span className="text-blue-400 font-bold font-mono">REQ-DRDO-2026-94812</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">Requested Role:</span>
                      <span className="font-bold text-white uppercase">{selectedRole}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">DRDO Lab:</span>
                      <span className="font-bold text-white truncate block">{drdoLab.split('-')[0]}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">Employee ID:</span>
                      <span className="font-mono text-slate-200">{empId}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">Reviewer:</span>
                      <span className="text-emerald-400 font-bold">Super Administrator</span>
                    </div>
                  </div>
                </div>

                {/* Blue Info Notice Card */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start space-x-3 text-left max-w-lg mx-auto">
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Your account request will be reviewed by the Super Administrator. You will receive an email after approval.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePage('login')}
                    className="w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </button>
                </div>

              </div>
            )}

            {/* Footer Notice */}
            <div className="mt-6 pt-4 border-t border-[#1E293B] text-center">
              <span className="text-xs text-slate-400">
                DRDO Knowledge Management System
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
