import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DRDOLogo } from '../common/DRDOLogo';
import { UserRole } from '../../types';
import {
  Shield,
  Database,
  Search,
  Network,
  Layers,
  BookOpen,
  Bot,
  ArrowRight,
  FileText,
  Lock,
  CheckCircle2,
  KeyRound,
  Fingerprint,
  Binary,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  ArrowDownRight,
  Cpu,
  FileCheck,
  Users,
  Building2,
  FileSpreadsheet,
  Zap,
  Globe,
  Radio,
  Share2,
  Activity,
  History,
  ShieldAlert,
  HelpCircle,
  Mail,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';

export const DKIPLandingPage: React.FC = () => {
  const { setActivePage, setIsAuthenticated, setCurrentUser, users, addAuditLog } = useApp();

  // Dark/Light Theme state for government portal preview
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Direct Access Launch Handler
  const handleRoleLaunch = (role: UserRole) => {
    const matchedUser = users.find(u => u.role === role) || {
      id: `usr-${role}`,
      name: role === 'end_user' ? 'Dr. Tessy Thomas' : role === 'knowledge_admin' ? 'Shri G. Satheesh Reddy' : 'Dr. V. K. Saraswat',
      email: role === 'end_user' ? 'scientist.thomas@drdo.gov.in' : role === 'knowledge_admin' ? 'knowledge.admin@drdo.gov.in' : 'admin.saraswat@drdo.gov.in',
      role: role,
      clearance: role === 'super_admin' ? 'LEVEL_4_TOP_SECRET' : role === 'knowledge_admin' ? 'LEVEL_3_SECRET' : 'LEVEL_2_CONFIDENTIAL',
      lab: 'DRDO HQ',
      designation: role === 'end_user' ? 'Senior Defence Scientist' : role === 'knowledge_admin' ? 'Head Ontology Curator' : 'Chief System Administrator',
      status: 'ACTIVE',
      lastActive: 'Just now'
    };

    setCurrentUser(matchedUser);
    setIsAuthenticated(true);
    setActivePage('dashboard');

    addAuditLog(
      'PORTAL_DIRECT_ACCESS',
      `Launched portal via DKIP Landing Page (${role.toUpperCase()})`,
      `User navigated to Dashboard with ${role.toUpperCase()} privileges`,
      'SUCCESS'
    );
  };

  // Section 2: Why DKIP - Exactly 4 Transformation Cards
  const whyDKIPCards = [
    {
      from: 'Scattered Documents',
      to: 'Centralized Knowledge',
      iconFrom: FileText,
      iconTo: Database,
      desc: 'Brings research documents and information together in one organized platform.'
    },
    {
      from: 'Keyword Search',
      to: 'Semantic AI Search',
      iconFrom: Search,
      iconTo: Sparkles,
      desc: 'Find information based on meaning and context, not just exact words.'
    },
    {
      from: 'Disconnected Information',
      to: 'Knowledge Graph Intelligence',
      iconFrom: Layers,
      iconTo: Network,
      desc: 'Connects related information through Ontology and Knowledge Graphs.'
    },
    {
      from: 'Manual Research',
      to: 'AI-Assisted Insights',
      iconFrom: FileCheck,
      iconTo: Bot,
      desc: 'Helps users quickly understand and discover useful information from research data.'
    }
  ];

  // Section 3: Platform Features - 6 Cards
  const features = [
    {
      title: 'Semantic Search',
      desc: 'Find relevant information using the meaning and context of a query. Helps users discover useful knowledge without searching through documents manually.',
      icon: Search
    },
    {
      title: 'Knowledge Graph',
      desc: 'Connects related information such as threats, assets, incidents, projects and departments. Helps users explore relationships and understand how different pieces of knowledge are connected.',
      icon: Network
    },
    {
      title: 'Ontology Builder',
      desc: "Organizes knowledge into defined concepts, categories and relationships. Provides a structured way to represent and manage the organization's knowledge.",
      icon: Layers
    },
    {
      title: 'Triple Store',
      desc: 'High-performance SPARQL-compliant graph repository storing millions of subject-predicate-object semantic triples.',
      icon: Database
    },
    {
      title: 'Research Repository',
      desc: 'Centralized air-gapped archive storing technical publications, test logs, and patents with checksum version control.',
      icon: BookOpen
    },
    {
      title: 'AI Assistant',
      desc: "Allows users to ask questions about the organization's available knowledge in natural language. Provides answers using relevant documents and connected knowledge from the system.",
      icon: Bot
    }
  ];

  // Section 4: Workflow - 6 Steps
  const workflowSteps = [
    { step: '01', title: 'Upload Documents', icon: FileText },
    { step: '02', title: 'AI Processing', icon: Cpu },
    { step: '03', title: 'Ontology Creation', icon: Layers },
    { step: '04', title: 'Knowledge Graph', icon: Network },
    { step: '05', title: 'Semantic Search', icon: Search },
    { step: '06', title: 'AI Generated Insights', icon: Bot }
  ];

  // Section 5: Access Roles - 3 Cards
  const accessRoles = [
    {
      role: 'super_admin' as UserRole,
      title: 'Super Admin',
      desc: 'Manages users, permissions, departments and system governance.'
    },
    {
      role: 'knowledge_admin' as UserRole,
      title: 'Knowledge Admin',
      desc: 'Manages ontology, documents, metadata and knowledge graph.'
    },
    {
      role: 'end_user' as UserRole,
      title: 'End User / Scientist',
      desc: 'Discovers knowledge using semantic search and AI.'
    }
  ];

  // Section 6: Security & Governance - 4 Cards
  const securityCards = [
    {
      title: 'Role Based Access Control',
      desc: 'Granular clearance level verification enforcing strict document and lab-level isolation.',
      icon: Lock
    },
    {
      title: 'Audit Logs',
      desc: 'Immutable CSOC security event logging tracking all search queries, views, and data exports.',
      icon: ShieldCheck
    },
    {
      title: 'Secure Authentication',
      desc: 'Multi-factor authentication and government smart-card (PKI) single sign-on integration.',
      icon: KeyRound
    },
    {
      title: 'AI Governance',
      desc: 'Air-gapped offline model deployment with zero internet connectivity and strict source attribution.',
      icon: Shield
    }
  ];

  // Section 7: Research Domains - 6 Cards
  const researchDomains = [
    { title: 'Artificial Intelligence', desc: 'Autonomous systems, robotics, computer vision, and cognitive decision support.', icon: Cpu },
    { title: 'Cyber Security', desc: 'Tactical command networks, quantum-safe encryption, and threat intelligence.', icon: Lock },
    { title: 'Missile Technology', desc: 'Guided propulsion, solid/liquid boosters, seeker radar guidance, and re-entry materials.', icon: Zap },
    { title: 'Radar Systems', desc: 'Active Electronically Scanned Array (AESA) radar, signals intelligence, and EW.', icon: Radio },
    { title: 'Electronic Warfare', desc: 'Acoustic countermeasures, radar jamming, signals interception, and spectrum control.', icon: Activity },
    { title: 'Advanced Materials', desc: 'High-temperature ceramic composites, stealth coatings, and aerospace superalloys.', icon: Layers }
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 font-sans selection:bg-blue-600 selection:text-white ${
      isDarkMode 
        ? 'bg-[#0B1F3A] text-slate-100' 
        : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      
      {/* ========================================================================= */}
      {/* NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 border-b ${
        isDarkMode 
          ? 'bg-[#0B1F3A]/95 border-slate-800' 
          : 'bg-white/95 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* DRDO Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <DRDOLogo size="md" className="w-10 h-10 bg-white p-1 rounded-full shadow-sm shrink-0 border border-slate-200" />
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  DRDO Knowledge Intelligence Platform
                </span>
              </div>
              <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Government of India • Ministry of Defence
              </p>
            </div>
          </div>

          {/* Nav Buttons (Attractive & Clear Navigation Pills) */}
          <nav className="hidden lg:flex items-center space-x-2 text-xs font-semibold">
            {[
              { label: 'Platform', href: '#why-dkip', icon: Layers },
              { label: 'Features', href: '#features', icon: Zap },
              { label: 'Workflow', href: '#workflow', icon: Activity },
              { label: 'Roles', href: '#roles', icon: Users },
              { label: 'Security', href: '#security', icon: Lock },
              { label: 'Research Domains', href: '#domains', icon: Globe },
              { label: 'Contact', href: '#footer', icon: Mail }
            ].map((item) => {
              const NavIcon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center space-x-1.5 font-medium cursor-pointer shadow-xs ${
                    isDarkMode
                      ? 'border-slate-800/80 bg-slate-900/60 hover:bg-blue-600/20 hover:border-blue-500/50 text-slate-300 hover:text-white shadow-slate-950/40'
                      : 'border-slate-200/80 bg-slate-100/70 hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 shadow-slate-200/50'
                  }`}
                >
                  <NavIcon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 text-blue-400" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons & Theme Switcher */}
          <div className="flex items-center space-x-2.5">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Request Access */}
            <button
              onClick={() => setActivePage('request_access')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Request Access
            </button>

            {/* Login Primary Button */}
            <button
              onClick={() => setActivePage('login')}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>


      {/* ========================================================================= */}
      {/* HERO SECTION (SPLIT LAYOUT) */}
      {/* ========================================================================= */}
      <section className={`relative pt-12 pb-20 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#0B1F3A]' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE (Content) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Small Badge */}
              <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-md border text-xs font-semibold tracking-wide ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-700 text-slate-300' 
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Government of India &bull; Ministry of Defence</span>
              </div>

              {/* Main Heading */}
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Ontology Driven AI <br className="hidden sm:inline" />
                <span className="text-blue-500">Knowledge Management System</span>
              </h1>

              {/* Subheading */}
              <p className={`text-xs sm:text-sm font-semibold tracking-wide ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                for Cyber Intelligence and ERP using Knowledge Graph, RAG, and LLMs
              </p>

              {/* Short Description */}
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xl font-normal ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                A secure, ontology-driven knowledge platform for connecting cyber intelligence, ERP and research information through semantic search, Knowledge Graphs and AI-powered, evidence-grounded insights.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActivePage('login')}
                  className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('request_access')}
                  className={`px-6 py-3 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  Request Access
                </button>
              </div>

            </div>

            {/* RIGHT SIDE (Clean Enterprise Minimal Graphic Illustration) */}
            <div className="lg:col-span-6">
              <div className={`p-6 rounded-2xl border shadow-xl relative overflow-hidden transition-colors ${
                isDarkMode 
                  ? 'bg-slate-900/90 border-slate-800' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/50 text-xs font-mono">
                  <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    ONTOLOGY &amp; KNOWLEDGE GRAPH VISUALIZER
                  </span>
                  <span className="text-blue-500 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    SEMANTIC ENGINE
                  </span>
                </div>

                {/* Vector Connection Graph Box */}
                <div className={`relative h-72 w-full rounded-xl border p-4 flex items-center justify-center overflow-hidden ${
                  isDarkMode ? 'bg-[#071325] border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  {/* Subtle Grid SVG */}
                  <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 300">
                    <defs>
                      <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2563EB" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                    
                    {/* Minimal Connecting Lines */}
                    <line x1="80" y1="70" x2="200" y2="140" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="320" y1="70" x2="200" y2="140" stroke="#2563EB" strokeWidth="1.5" />
                    <line x1="200" y1="140" x2="100" y2="230" stroke="#3B82F6" strokeWidth="1.5" />
                    <line x1="200" y1="140" x2="300" y2="230" stroke="#3B82F6" strokeWidth="1.5" />
                  </svg>

                  {/* Connected Research Nodes */}
                  <div className="absolute top-5 left-5 p-2 rounded-lg bg-blue-600/10 border border-blue-500/30 text-[11px] font-semibold text-blue-400 flex items-center space-x-1.5 shadow-sm">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Research Document</span>
                  </div>

                  <div className="absolute top-5 right-5 p-2 rounded-lg bg-blue-600/10 border border-blue-500/30 text-[11px] font-semibold text-blue-400 flex items-center space-x-1.5 shadow-sm">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Ontology Class</span>
                  </div>

                  {/* Central Node */}
                  <div className="relative z-10 p-3.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg text-center border border-blue-400/40">
                    <div className="flex items-center justify-center space-x-1.5">
                      <Network className="w-4 h-4 text-blue-200" />
                      <span>Knowledge Graph Node</span>
                    </div>
                    <div className="text-[10px] text-blue-100 font-normal mt-0.5">Semantic Triples &amp; Relations</div>
                  </div>

                  <div className="absolute bottom-5 left-5 p-2 rounded-lg bg-blue-600/10 border border-blue-500/30 text-[11px] font-semibold text-blue-400 flex items-center space-x-1.5 shadow-sm">
                    <Search className="w-3.5 h-3.5" />
                    <span>Semantic Vector Search</span>
                  </div>

                  <div className="absolute bottom-5 right-5 p-2 rounded-lg bg-blue-600/10 border border-blue-500/30 text-[11px] font-semibold text-blue-400 flex items-center space-x-1.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI Intelligence</span>
                  </div>
                </div>

                {/* Subtitle label */}
                <p className={`text-[11px] font-medium text-center mt-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Connected Research Nodes &bull; Ontology Relationships &bull; Digital Semantic Connections
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 2: WHY DKIP? (4 CARDS EXACTLY) */}
      {/* ========================================================================= */}
      <section id="why-dkip" className={`py-16 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#071325]' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Platform Purpose
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              WHY AI KNOWLEDGE MANAGEMENT SYSTEM?
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Making defence research knowledge easier to organize, discover and understand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyDKIPCards.map((card, idx) => {
              const IconFrom = card.iconFrom;
              const IconTo = card.iconTo;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg space-y-4 ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/40' 
                      : 'bg-white border-slate-200 hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-400">
                      <IconFrom className="w-5 h-5" />
                    </div>
                    <ArrowDownRight className="w-4 h-4 text-blue-500" />
                    <div className="p-2.5 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-500">
                      <IconTo className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {card.from}
                    </div>
                    <div className="text-sm font-bold text-blue-500 my-1 flex items-center gap-1">
                      <span>&darr;</span> {card.to}
                    </div>
                    <p className={`text-xs leading-relaxed font-normal mt-2 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 3: PLATFORM FEATURES (6 CARDS) */}
      {/* ========================================================================= */}
      <section id="features" className={`py-16 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#0B1F3A]' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Core Capabilities
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              PLATFORM FEATURES
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Enterprise tools designed for knowledge management and research discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3 ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-500/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {feat.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 4: HOW THE PLATFORM WORKS (HORIZONTAL WORKFLOW) */}
      {/* ========================================================================= */}
      <section id="workflow" className={`py-16 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#071325]' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              System Architecture
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              HOW THE PLATFORM WORKS
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              End-to-end processing from document ingestion to AI intelligence.
            </p>
          </div>

          {/* Horizontal Workflow Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border relative text-center space-y-2 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-blue-500">STEP {s.step}</div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-500 mx-auto flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {s.title}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 5: ACCESS ROLES (3 CARDS) */}
      {/* ========================================================================= */}
      <section id="roles" className={`py-16 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#0B1F3A]' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Role Governance
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              ACCESS ROLES
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Role-based access permissions tailored for DRDO organizational structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessRoles.map((role) => (
              <div 
                key={role.role}
                className={`p-6 rounded-2xl border transition-all hover:shadow-xl flex flex-col justify-between space-y-4 ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' 
                    : 'bg-slate-50 border-slate-200 hover:border-blue-500/50'
                }`}
              >
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {role.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {role.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/50 flex items-center justify-end">
                  <button
                    onClick={() => handleRoleLaunch(role.role)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center space-x-1 cursor-pointer shadow-sm"
                  >
                    <span>Launch Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 6: SECURITY & GOVERNANCE (4 CARDS) */}
      {/* ========================================================================= */}
      <section id="security" className={`py-16 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#071325]' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Compliance &amp; Isolation
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              SECURITY &amp; GOVERNANCE
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Air-gapped security protocols engineered for defense intelligence standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityCards.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-3 ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {sec.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {sec.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 7: RESEARCH DOMAINS (6 CARDS) */}
      {/* ========================================================================= */}
      <section id="domains" className={`py-16 border-b ${
        isDarkMode ? 'border-slate-800 bg-[#0B1F3A]' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Taxonomy Coverage
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              RESEARCH DOMAINS
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Standardized ontology schemas across core DRDO scientific domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchDomains.map((dom, idx) => {
              const Icon = dom.icon;
              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border space-y-2.5 transition-all hover:border-blue-500/40 ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500 border border-blue-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {dom.title}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {dom.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer id="footer" className={`pt-12 pb-8 ${
        isDarkMode ? 'bg-[#071325] text-slate-400' : 'bg-slate-100 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/60">
            
            {/* Logo & Description */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center space-x-3">
                <DRDOLogo size="md" className="w-9 h-9 bg-white p-1 rounded-full shadow-sm shrink-0 border border-slate-200" />
                <div>
                  <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    DRDO Knowledge Intelligence Platform
                  </div>
                  <div className="text-[11px] text-blue-500 font-semibold">
                    Ministry of Defence &bull; Government of India
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed max-w-md">
                Official enterprise semantic knowledge management system developed for Defence Research &amp; Development Organisation laboratories.
              </p>
            </div>

            {/* Quick Links Column 1 */}
            <div className="md:col-span-3 space-y-2">
              <div className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                Platform
              </div>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#why-dkip" className="hover:text-blue-500 transition-colors">Overview</a></li>
                <li><a href="#features" className="hover:text-blue-500 transition-colors">Features</a></li>
                <li><a href="#workflow" className="hover:text-blue-500 transition-colors">Workflow Architecture</a></li>
                <li><a href="#domains" className="hover:text-blue-500 transition-colors">Taxonomy Domains</a></li>
              </ul>
            </div>

            {/* Quick Links Column 2 */}
            <div className="md:col-span-4 space-y-2">
              <div className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                Support &amp; Governance
              </div>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#security" className="hover:text-blue-500 transition-colors">CSOC Audit &amp; Security</a></li>
                <li><a href="#roles" className="hover:text-blue-500 transition-colors">Role Clearances</a></li>
                <li className="cursor-pointer hover:text-blue-500 transition-colors" onClick={() => setActivePage('login')}>Portal Login</li>
                <li className="cursor-pointer hover:text-blue-500 transition-colors" onClick={() => setActivePage('request_access')}>Request Access</li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              &copy; Defence Research &amp; Development Organisation &bull; Government of India
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
