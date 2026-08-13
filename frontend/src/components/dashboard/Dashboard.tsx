import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  Database, 
  GitBranch, 
  BrainCircuit, 
  FileCheck, 
  ShieldAlert, 
  ArrowUpRight, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Zap,
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    systemMetrics, 
    auditLogs, 
    entities, 
    triples, 
    ingestionQueue, 
    setActivePage,
    setSelectedEntity,
    addAuditLog
  } = useApp();

  const pendingIngestions = ingestionQueue.filter(i => i.status === 'PENDING_VERIFICATION' || i.status === 'PROCESSING').length;

  const handleReindex = () => {
    addAuditLog('GRAPH_REINDEX_TRIGGERED', 'DRDO Ontology Graph', 'Initiated global re-indexing across 6 lab clusters.');
    alert('DRDO Knowledge Graph re-indexed successfully. All 14,820 triples refreshed.');
  };

  const handleExportLogs = () => {
    addAuditLog('AUDIT_EXPORT', 'CSOC System Logs', 'Exported CSV audit trail report.');
    const logData = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DRDO_STRATOS_Audit_Logs_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.25 }}
      className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans text-slate-900 dark:text-slate-100"
    >
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            System Health & Graph Integrity
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ontology-driven defense intelligence monitoring across 12 DRDO research clusters.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportLogs}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Audit Logs
          </button>
          <button
            onClick={handleReindex}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-200 dark:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-index Graph
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Total Entities
          </p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white font-mono">
            {systemMetrics.totalOntologyNodes.toLocaleString()}
          </p>
          <div className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 inline-block px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            +12% vs last month
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Knowledge Triples
          </p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white font-mono">
            {systemMetrics.totalTriplesInStore.toLocaleString()}
          </p>
          <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            Stable RDF Instance
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Reasoning Queries
          </p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white font-mono">
            {systemMetrics.queriesPerMinute} / min
          </p>
          <div className="mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 inline-block px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
            0.4ms latency avg
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-blue-600 dark:border-l-blue-500 transition-all hover:shadow-md">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Ingestion Pipeline
          </p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white font-mono">
            {pendingIngestions} Pending
          </p>
          <div className="mt-2 text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/50 inline-block px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 font-sans">
            Requires Authorization
          </div>
        </div>
      </div>

      {/* Main Grid: Ontology Graph Preview + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Knowledge Graph Preview */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Central DRDO Ontology Hierarchy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core missile, radar, materials, and lab node relationships.
              </p>
            </div>
            <button
              onClick={() => setActivePage('knowledge_explorer')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Open Full Graph <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Graph Visual Container */}
          <div className="h-64 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950/50 flex flex-col items-center justify-center relative p-4 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 500 200" className="w-full h-full max-w-lg">
              {/* Outer pulsing ring */}
              <circle cx="250" cy="100" r="50" fill="#2563EB" fillOpacity="0.1" stroke="#2563EB" strokeWidth="1" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '20s' }} />
              <circle cx="250" cy="100" r="8" fill="#2563EB" />
              <text x="250" y="85" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="bold" className="dark:fill-slate-200">DRDO_CORE_ONTOLOGY</text>

              {/* Connected Nodes */}
              {/* Node 1: DRDL Hyderabad */}
              <line x1="250" y1="100" x2="120" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="120" cy="40" r="6" fill="#ef4444" />
              <text x="120" y="25" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold" className="dark:fill-slate-400">DRDL (Lab)</text>

              {/* Node 2: LRDE Bengaluru */}
              <line x1="250" y1="100" x2="380" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="380" cy="40" r="6" fill="#10b981" />
              <text x="380" y="25" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold" className="dark:fill-slate-400">LRDE (Radar)</text>

              {/* Node 3: Agni-V ICBM */}
              <line x1="250" y1="100" x2="160" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="160" cy="160" r="6" fill="#3b82f6" />
              <text x="160" y="178" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold" className="dark:fill-slate-400">Agni-V ICBM</text>

              {/* Node 4: DMRL Composite */}
              <line x1="250" y1="100" x2="340" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="340" cy="160" r="6" fill="#8b5cf6" />
              <text x="340" y="178" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold" className="dark:fill-slate-400">DMRL Ceramic</text>

              {/* Cross Connections */}
              <line x1="120" y1="40" x2="160" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="380" y1="40" x2="340" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            </svg>

            {/* Quick Node Entity Chips */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Nodes: L1-L4 Class Hierarchy</span>
              <span>Encryption: AES-256</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Graph Synchronized</span>
            </div>
          </div>

          {/* Quick Entity Selector List */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Quick Inspect:
            </span>
            {entities.slice(0, 4).map((ent) => (
              <button
                key={ent.id}
                onClick={() => {
                  setSelectedEntity(ent);
                  setActivePage('knowledge_explorer');
                }}
                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-xs font-mono border border-slate-200 dark:border-slate-700 shrink-0 transition-colors cursor-pointer"
              >
                {ent.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Feed */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Administrative Audit Log
              </h3>
              <button
                onClick={() => setActivePage('audit_logs')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Log Stream */}
            <div className="space-y-4">
              {auditLogs.slice(0, 4).map((log) => {
                const getBorderColor = () => {
                  if (log.status === 'BLOCKED') return 'bg-red-500';
                  if (log.status === 'WARNING') return 'bg-amber-500';
                  return 'bg-blue-500';
                };

                return (
                  <div key={log.id} className="flex space-x-3 text-xs">
                    <div className={`w-1 ${getBorderColor()} rounded-full shrink-0`} />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {log.action.replace('_', ' ')}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {log.resource}
                      </p>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-1">
                        <span>{log.user.split(' ')[0]}</span>
                        <span>{log.timestamp.slice(11, 16)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage('audit_logs')}
              className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 uppercase tracking-widest transition-colors cursor-pointer"
            >
              CSOC Full Log Stream
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access AI Reasoning Prompt Box */}
      <div className="bg-gradient-to-r from-blue-900/20 via-slate-900 to-slate-900 border border-blue-500/30 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Ask DRDO STRATOS AI Reasoning Engine
            </h4>
            <p className="text-xs text-slate-400">
              Generate Executive Defense Briefings, extract knowledge triples, or query missile/radar specs via Gemini 2.5.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActivePage('ai_assistant')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer shrink-0"
        >
          Launch AI Engine <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
