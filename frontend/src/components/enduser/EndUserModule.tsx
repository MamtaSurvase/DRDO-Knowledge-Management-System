import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  BrainCircuit, 
  FileText, 
  Bookmark, 
  Network, 
  BarChart3, 
  BookOpen, 
  BellRing, 
  User as UserIcon, 
  Settings, 
  Zap, 
  ArrowRight, 
  Download, 
  Clock, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  Star, 
  Filter, 
  Share2, 
  Tag, 
  ShieldAlert, 
  Database, 
  Layers, 
  Folder, 
  Send, 
  Sun,
  Moon,
  HelpCircle, 
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Cpu,
  Check
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { IntelligenceReport, OntologyEntity, KnowledgeTriple, IngestionPipelineItem } from '../../types';

// Mock Search Queries History
const RECENT_AI_QUERIES = [
  { id: 'q-1', text: 'Agni-V Ring Laser Gyro guidance telemetry limits', time: '10 mins ago', triples: 14 },
  { id: 'q-2', text: 'GaN TR Module thermal thresholds in Uttam AESA Radar', time: '2 hours ago', triples: 9 },
  { id: 'q-[3]', text: 'Titanium alloy fatigue specs for Rustom-II UAV airframe', time: 'Yesterday', triples: 6 },
  { id: 'q-4', text: 'K-4 SLBM underwater launch acoustic signature analysis', time: '2 days ago', triples: 18 }
];

// Mock Suggested Documents
const SUGGESTED_DOCUMENTS = [
  { id: 'sd-1', title: 'GaN Solid-State Power Amplifier Spec Sheet', lab: 'LRDE Bengaluru', category: 'Radar & Avionics', clearance: 'LEVEL_2_CONFIDENTIAL', date: '2026-07-28', rating: 4.9 },
  { id: 'sd-2', title: 'Astra Mk-2 BVRAAM Propulsion System Test Brief', lab: 'DRDL Hyderabad', category: 'Missile Guidance', clearance: 'LEVEL_3_SECRET', date: '2026-07-20', rating: 4.8 },
  { id: 'sd-3', title: 'Abhay EW Suite Cyber Defense Protocol Documentation', lab: 'DL Jodhpur', category: 'Cyber EW', clearance: 'LEVEL_2_CONFIDENTIAL', date: '2026-07-15', rating: 4.7 }
];

// Mock Research Trends Data
const RESEARCH_TRENDS = [
  { month: 'Jan', queries: 120, downloads: 45, AI_insights: 85 },
  { month: 'Feb', queries: 180, downloads: 62, AI_insights: 140 },
  { month: 'Mar', queries: 240, downloads: 90, AI_insights: 195 },
  { month: 'Apr', queries: 210, downloads: 82, AI_insights: 170 },
  { month: 'May', queries: 310, downloads: 115, AI_insights: 260 },
  { month: 'Jun', queries: 380, downloads: 140, AI_insights: 320 },
  { month: 'Jul', queries: 450, downloads: 180, AI_insights: 410 },
];

const DOMAIN_DISTRIBUTION = [
  { name: 'Radar & Avionics', value: 38, color: '#0d9488' },
  { name: 'Missile Technology', value: 32, color: '#2563eb' },
  { name: 'Unmanned Systems', value: 18, color: '#8b5cf6' },
  { name: 'Cyber & EW', value: 12, color: '#f59e0b' },
];

export const EndUserModule: React.FC<{ initialTab?: string }> = ({ initialTab = 'overview' }) => {
  const { 
    currentUser, 
    ingestionQueue, 
    triples, 
    entities, 
    schemaClasses, 
    reports, 
    notifications, 
    markNotificationRead,
    setSelectedEntity,
    setSelectedReport,
    setActivePage,
    addAuditLog,
    drdoLabs,
    theme,
    setTheme
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Search State
  const [searchQueryLocal, setSearchQueryLocal] = useState('');
  const [selectedLab, setSelectedLab] = useState('ALL');
  const [selectedDomain, setSelectedDomain] = useState('ALL');

  // AI Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string; sources?: string[] }>>([
    {
      sender: 'assistant',
      text: 'Greetings, Researcher. I am the Gemini-powered DRDO Defense Knowledge Assistant. How may I assist your technical inquiry today?',
      time: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<Array<{ id: string; title: string; type: string; date: string }>>([
    { id: 'bm-1', title: 'Agni-V Guidance Telemetry Trial 6', type: 'Document', date: '2026-08-01' },
    { id: 'bm-2', title: 'Uttam AESA GaN TR Module Thermal Performance', type: 'Knowledge Triple', date: '2026-07-29' },
    { id: 'bm-3', title: 'Pralay Surface-to-Surface Quasi-Ballistic Specs', type: 'Document', date: '2026-07-25' }
  ]);

  // Selected Doc Viewer State
  const [viewingDoc, setViewingDoc] = useState<IngestionPipelineItem | null>(null);

  // Settings State
  const [userSettings, setUserSettings] = useState({
    aiModel: 'gemini-2.5-flash',
    searchDepth: 'Deep Semantic & Graph Expansion',
    autoSaveHistory: true,
    emailAlerts: true,
    highClearanceWarning: true
  });

  // AI Chat Handler
  const handleSendChat = (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user' as const, text: textToSend, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    if (!promptText) setInputPrompt('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = `Based on the verified DRDO Knowledge Base, "${textToSend}" directly correlates with telemetry specs stored across DRDL Hyderabad and LRDE Bengaluru.`;
      let sources = ['DRDL-AGNI-V-SPEC-2026.pdf', 'LRDE-AESA-RADAR-V3.pdf'];

      if (textToSend.toLowerCase().includes('agni')) {
        reply = "Agni-V utilizes a solid-propellant three-stage engine paired with a high-accuracy Ring Laser Gyroscope (RLG) inertial navigation system (INS). Extracted triples confirm a range exceeding 5,000 km with terminal guidance accuracy within 10 meters CEP.";
        sources = ['DRDL-AGNI-V-TELEMETRY-TRIAL6.pdf'];
      } else if (textToSend.toLowerCase().includes('radar') || textToSend.toLowerCase().includes('aesa')) {
        reply = "The Uttam AESA Radar features active electronic scanning with Gallium Nitride (GaN) Transmit/Receive modules manufactured by LRDE. GaN technology increases radar power density by 300% compared to legacy GaAs components.";
        sources = ['LRDE-UTTAM-AESA-GAN-REPORT.pdf', 'LRDE-TR-MODULE-BENCHMARK.pdf'];
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply, time: 'Just now', sources }]);
      setIsAiThinking(false);
      addAuditLog('AI_QUERY', 'Gemini AI Assistant', `Query: "${textToSend}"`);
    }, 1200);
  };

  const handleToggleBookmark = (id: string, title: string, type: string) => {
    const exists = bookmarks.some(b => b.id === id);
    if (exists) {
      setBookmarks(prev => prev.filter(b => b.id !== id));
    } else {
      setBookmarks(prev => [...prev, { id, title, type, date: new Date().toISOString().split('T')[0] }]);
    }
  };

  // Filtered Documents
  const filteredDocs = ingestionQueue.filter(doc => {
    const matchSearch = doc.filename.toLowerCase().includes(searchQueryLocal.toLowerCase());
    const matchLab = selectedLab === 'ALL' || doc.drdoLab === selectedLab;
    return matchSearch && matchLab;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <ShieldCheck className="w-4 h-4" /> DRDO RESEARCH & DEFENSE INTELLIGENCE PORTAL
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Defense Intelligence Workbench
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome, <span className="font-bold text-slate-900 dark:text-white">{currentUser.name}</span> [{currentUser.department}]. Access verified defense knowledge, AI assistant, and ontology graph.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('ai_assistant')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-500/20"
          >
            <BrainCircuit className="w-4 h-4" /> Gemini AI Assistant
          </button>
          <button 
            onClick={() => setActiveTab('search')}
            className="px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-teal-500/20"
          >
            <Search className="w-4 h-4" /> Search Knowledge Base
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 scrollbar-none shadow-inner">
        {[
          { id: 'overview', label: 'Intelligence Hub', icon: Zap },
          { id: 'ai_assistant', label: 'AI Assistant', icon: BrainCircuit, badge: 'Gemini' },
          { id: 'search', label: 'Search Knowledge', icon: Search },
          { id: 'library', label: 'Document Library', icon: FileText, count: ingestionQueue.length },
          { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark, count: bookmarks.length },
          { id: 'graph', label: 'Knowledge Graph', icon: Network, count: triples.length },
          { id: 'ontology', label: 'Ontology Explorer', icon: Database, count: schemaClasses.length },
          { id: 'analytics', label: 'Research Analytics', icon: BarChart3 },
          { id: 'reports', label: 'Reports & Digests', icon: BookOpen, count: reports.length },
          { id: 'notifications', label: 'Alerts', icon: BellRing, count: notifications.length },
          { id: 'profile', label: 'My Profile', icon: UserIcon },
          { id: 'settings', label: 'Preferences', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-blue-700/80 text-white' : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/80 text-white font-mono uppercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Viewport */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* SECTION 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accessible Documents</span>
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black">{ingestionQueue.length + 184}</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">Clearance Level 3</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Across 6 DRDO Laboratories</p>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Knowledge Triples</span>
                    <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                      <Database className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black">{triples.length}</span>
                    <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">100% Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Semantic Entity Graph Active</p>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Bookmarks</span>
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                      <Bookmark className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black">{bookmarks.length}</span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">Quick Access</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Research Items Stored</p>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Assistant Queries</span>
                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black">24</span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Gemini 2.5 Active</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Zero Hallucination Verified</p>
                </motion.div>
              </div>

          {/* Quick Actions & AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions Widget */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setActiveTab('ai_assistant')}
                  className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-left space-y-1 transition cursor-pointer"
                >
                  <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <p className="font-bold text-xs">Ask Gemini AI</p>
                  <p className="text-[10px] text-slate-500">Query specifications</p>
                </button>

                <button 
                  onClick={() => setActiveTab('search')}
                  className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 text-left space-y-1 transition cursor-pointer"
                >
                  <Search className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <p className="font-bold text-xs">Search Triples</p>
                  <p className="text-[10px] text-slate-500">Semantic graph</p>
                </button>

                <button 
                  onClick={() => setActiveTab('library')}
                  className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 text-left space-y-1 transition cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <p className="font-bold text-xs">Browse Library</p>
                  <p className="text-[10px] text-slate-500">DRDO documents</p>
                </button>

                <button 
                  onClick={() => setActiveTab('graph')}
                  className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 text-left space-y-1 transition cursor-pointer"
                >
                  <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <p className="font-bold text-xs">Graph Explorer</p>
                  <p className="text-[10px] text-slate-500">Ontology nodes</p>
                </button>
              </div>
            </div>

            {/* AI Recommendations Widget */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" /> AI Recommended Research Briefs
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Tailored to DRDL & Missile Systems</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SUGGESTED_DOCUMENTS.map(doc => (
                  <div key={doc.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                      {doc.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">{doc.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{doc.lab}</p>
                    <div className="flex items-center justify-between pt-2 text-[10px]">
                      <span className="text-amber-500 font-bold font-mono">★ {doc.rating}</span>
                      <button onClick={() => setActiveTab('library')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                        View Brief →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Widgets Grid: Recent Documents, Recent AI Queries, Bookmarks, Knowledge Graph Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Widget: Recent Documents */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" /> Recent Ingested Documents
                </h3>
                <button onClick={() => setActiveTab('library')} className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View All →
                </button>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {ingestionQueue.slice(0, 4).map(doc => (
                  <div key={doc.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{doc.filename}</p>
                      <p className="text-[10px] text-slate-400">{doc.drdoLab} | {doc.uploadDate}</p>
                    </div>
                    <button 
                      onClick={() => { setViewingDoc(doc); setActiveTab('library'); }}
                      className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded font-bold text-[10px] hover:bg-blue-200 cursor-pointer"
                    >
                      Read
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Recent AI Queries */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" /> Recent AI Reasoning Queries
                </h3>
                <button onClick={() => setActiveTab('ai_assistant')} className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">
                  New Query →
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {RECENT_AI_QUERIES.map(q => (
                  <div key={q.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{q.text}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{q.time} • {q.triples} Knowledge Triples Referenced</p>
                    </div>
                    <button 
                      onClick={() => { handleSendChat(q.text); setActiveTab('ai_assistant'); }}
                      className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded font-bold text-[10px] hover:bg-amber-200 cursor-pointer shrink-0"
                    >
                      Rerun
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Bookmarks */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-purple-500" /> Saved Research Bookmarks
                </h3>
                <button onClick={() => setActiveTab('bookmarks')} className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline">
                  Manage ({bookmarks.length}) →
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {bookmarks.map(bm => (
                  <div key={bm.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                        {bm.type}
                      </span>
                      <p className="font-bold text-slate-900 dark:text-white mt-0.5">{bm.title}</p>
                    </div>
                    <button 
                      onClick={() => handleToggleBookmark(bm.id, bm.title, bm.type)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Knowledge Graph Preview */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Network className="w-4 h-4 text-teal-500" /> Knowledge Graph Preview
                </h3>
                <button onClick={() => setActiveTab('graph')} className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline">
                  Full Graph Explorer →
                </button>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 text-slate-200 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-teal-400 font-bold">Primary Subgraph Nodes</span>
                  <span className="text-[10px] text-slate-500">Agni-V Core</span>
                </div>

                {triples.slice(0, 3).map(t => (
                  <div key={t.id} className="flex items-center justify-between text-[11px] p-2 rounded bg-slate-900/60">
                    <span className="text-blue-400 font-bold">{t.subjectLabel}</span>
                    <span className="text-slate-400 text-[10px]">--[{t.predicate}]--&gt;</span>
                    <span className="text-emerald-400 font-bold">{t.objectLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: AI ASSISTANT */}
      {activeTab === 'ai_assistant' && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-500" /> Gemini AI Defense Research Assistant
            </h2>
            <p className="text-xs text-slate-500">Ask natural language questions across DRDO specifications, missile telemetry, radar specs, and material reports.</p>
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-2">
            {[
              "Agni-V Ring Laser Gyro guidance telemetry limits",
              "Uttam AESA Radar GaN TR Module specifications",
              "Astra Mk-2 BVRAAM dual-pulse rocket motor test",
              "Pralay surface-to-surface missile accuracy CEP"
            ].map((p, idx) => (
              <button 
                key={idx}
                onClick={() => handleSendChat(p)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-mono text-xs transition cursor-pointer"
              >
                💡 {p}
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="space-y-4 min-h-[320px] max-h-[500px] overflow-y-auto p-2">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-xl max-w-[85%] text-xs space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-teal-600 dark:text-teal-400 font-bold block">Verified Citations</span>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((src, i) => (
                            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                              📄 {src}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs font-mono text-blue-500 p-2">
                  <Sparkles className="w-4 h-4 animate-spin" /> Gemini AI querying DRDO Knowledge Graph...
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendChat(); }} className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <input 
                type="text" 
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                placeholder="Ask technical questions about defense specifications..."
                className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
              />
              <button 
                type="submit"
                disabled={!inputPrompt.trim() || isAiThinking}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 3: SEARCH KNOWLEDGE */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Semantic & Keyword Knowledge Search</h2>
            <p className="text-xs text-slate-500">Query across ingested documents, extracted triples, and ontology schemas with security level filtering.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by missile name, guidance system, radar module, or lab..."
                value={searchQueryLocal}
                onChange={e => setSearchQueryLocal(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <select 
              value={selectedLab}
              onChange={e => setSelectedLab(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs p-2.5 font-mono"
            >
              <option value="ALL">All DRDO Labs</option>
              {drdoLabs.map(l => (
                <option key={l.id} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-500">Found {filteredDocs.length} Knowledge Documents Matching Query</span>
            {filteredDocs.map(doc => (
              <div key={doc.id} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-teal-500/50 transition">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-[10px]">
                      {doc.clearance}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">{doc.filename}</h3>
                    <p className="text-xs text-slate-500">Origin: <span className="font-bold font-mono">{doc.drdoLab}</span> | Uploaded by {doc.uploadedBy} on {doc.uploadDate}</p>
                  </div>

                  <button 
                    onClick={() => handleToggleBookmark(doc.id, doc.filename, 'Document')}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 cursor-pointer"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.some(b => b.id === doc.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs font-mono text-slate-600 dark:text-slate-300">
                  Extracted Triples: <span className="font-bold text-teal-600 dark:text-teal-400">{doc.triplesExtracted} Knowledge Triples</span> verified in graph.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: DOCUMENT LIBRARY & VIEWER */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">DRDO Technical Document Library</h2>
              <p className="text-xs text-slate-500">Access verified defense documents, trial reports, and specification briefs.</p>
            </div>
          </div>

          {/* Document Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Document Title</th>
                  <th className="p-4">DRDO Lab</th>
                  <th className="p-4">Clearance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ingestionQueue.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{doc.filename}</td>
                    <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">{doc.drdoLab}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-[10px]">
                        {doc.clearance}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{doc.status}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => setViewingDoc(doc)}
                        className="px-3 py-1 bg-blue-600 text-white rounded font-bold text-[10px] hover:bg-blue-700 cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Document Detail Viewer Modal */}
          {viewingDoc && (
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-[10px]">
                      {viewingDoc.clearance}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1">{viewingDoc.filename}</h3>
                  </div>
                  <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                    <div><span className="text-slate-400">Laboratory:</span> <span className="font-bold">{viewingDoc.drdoLab}</span></div>
                    <div><span className="text-slate-400">Uploaded By:</span> <span className="font-bold">{viewingDoc.uploadedBy}</span></div>
                    <div><span className="text-slate-400">File Size:</span> <span className="font-bold">{viewingDoc.fileSize}</span></div>
                    <div><span className="text-slate-400">Extracted Triples:</span> <span className="font-bold text-teal-600">{viewingDoc.triplesExtracted} Triples</span></div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/80 font-mono text-[11px] space-y-2">
                    <p className="font-bold text-slate-700 dark:text-slate-300">Extracted Document Excerpt:</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      "This technical specification details the flight trial telemetry parameters recorded during execution. Guidance feedback loops demonstrated &lt;1.2m error margins under high-G manoeuvres."
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    onClick={() => addAuditLog('DOCUMENT_DOWNLOADED', viewingDoc.filename, 'Downloaded defense specification')}
                    className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download PDF Brief
                  </button>
                  <button onClick={() => setViewingDoc(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 font-bold text-xs rounded-lg">Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Saved Research Bookmarks</h2>
            <p className="text-xs text-slate-500">Your personal repository of pinned documents, triples, and ontology entities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookmarks.map(bm => (
              <div key={bm.id} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold uppercase">
                    {bm.type}
                  </span>
                  <button onClick={() => handleToggleBookmark(bm.id, bm.title, bm.type)} className="text-rose-500 font-bold text-xs hover:underline cursor-pointer">
                    Remove
                  </button>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{bm.title}</h3>
                <p className="text-[10px] text-slate-400 font-mono">Saved on {bm.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: KNOWLEDGE GRAPH EXPLORER */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Interactive Knowledge Graph</h2>
            <p className="text-xs text-slate-500">Explore relationships and semantic connections across defense entities.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 text-slate-100 space-y-4 font-mono shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-teal-400 font-bold flex items-center gap-2">
                <Network className="w-4 h-4" /> DRDO Semantic Triple Inspector
              </span>
              <span className="text-xs text-slate-400">Total Triples: {triples.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {triples.map(t => (
                <div key={t.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-400 font-bold">{t.subjectLabel}</span>
                    <span className="text-slate-400 text-[10px]">--[{t.predicate}]--&gt;</span>
                    <span className="text-emerald-400 font-bold">{t.objectLabel}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    <span>Confidence: {(t.confidence * 100).toFixed(1)}%</span>
                    <span>Lab: {t.drdoLab}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: ONTOLOGY EXPLORER */}
      {activeTab === 'ontology' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">DRDO Defense Ontology Schema</h2>
            <p className="text-xs text-slate-500">Browse schema classes and entity attributes defined in the defense taxonomy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schemaClasses.map(cls => (
              <div key={cls.id} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold uppercase">
                  {cls.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{cls.name}</h3>
                <p className="text-xs text-slate-500">{cls.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Research Activity & Knowledge Analytics</h2>
            <p className="text-xs text-slate-500">Query trends, AI insights usage, and document downloads across DRDO laboratories.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base">Monthly Research Queries Velocity</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={RESEARCH_TRENDS}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="queries" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base">Knowledge Domain Share</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DOMAIN_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {DOMAIN_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">DRDO Intelligence Reports & Digests</h2>
            <p className="text-xs text-slate-500">Access curated research digests and strategic summaries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map(rep => (
              <div key={rep.id} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold uppercase">
                  {rep.classification}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{rep.title}</h3>
                <p className="text-xs text-slate-500">{rep.summary}</p>
                <p className="text-[10px] text-slate-400 font-mono">Published on {rep.generatedDate} by {rep.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 10: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold">Knowledge Alerts & Notifications</h2>
            <p className="text-xs text-slate-500">Updates regarding newly ingested documents, spec changes, and system announcements.</p>
          </div>

          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                    {n.type}
                  </span>
                  <h4 className="font-bold text-sm">{n.title}</h4>
                  <p className="text-xs text-slate-500">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">{n.timestamp}</span>
                </div>
                {!n.read && (
                  <button onClick={() => markNotificationRead(n.id)} className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 11: PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold">{currentUser.name}</h2>
                <p className="text-xs text-slate-500">{currentUser.email} • {currentUser.department}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-[10px]">
                  Clearance: {currentUser.clearanceLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 12: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-bold">User Preferences & AI Assistant Configuration</h2>
            <p className="text-xs text-slate-500">Configure AI reasoning models, default search parameters, and email notification alerts.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            {/* Appearance Theme Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Interface Appearance & Theme Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-200 ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">Light Theme</p>
                    <p className="text-[10px] opacity-75">High Contrast Daylight Mode</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-200 ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">Dark Theme</p>
                    <p className="text-[10px] opacity-75">Tactical Low-Light Canvas</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Preferred Gemini AI Reasoning Model</label>
              <select 
                value={userSettings.aiModel}
                onChange={e => setUserSettings(prev => ({ ...prev, aiModel: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra Fast Reasoning)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Technical Analysis)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Default Search Depth</label>
              <select 
                value={userSettings.searchDepth}
                onChange={e => setUserSettings(prev => ({ ...prev, searchDepth: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold"
              >
                <option value="Deep Semantic & Graph Expansion">Deep Semantic & Graph Expansion</option>
                <option value="Exact Keyword Match Only">Exact Keyword Match Only</option>
              </select>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={userSettings.autoSaveHistory}
                  onChange={e => setUserSettings(prev => ({ ...prev, autoSaveHistory: e.target.checked }))}
                  className="rounded text-blue-600"
                />
                Auto-save AI Query History & Referenced Triples
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={userSettings.emailAlerts}
                  onChange={e => setUserSettings(prev => ({ ...prev, emailAlerts: e.target.checked }))}
                  className="rounded text-blue-600"
                />
                Receive Email Notifications on New Ingested Documents
              </label>
            </div>
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
