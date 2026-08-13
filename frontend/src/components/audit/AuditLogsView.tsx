import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Search, Download, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter(log => {
    const matchFilter = filter === 'ALL' || log.status === filter;
    const matchSearch = log.action.toLowerCase().includes(search.toLowerCase()) ||
                        log.resource.toLowerCase().includes(search.toLowerCase()) ||
                        log.user.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.25 }}
      className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans text-slate-900 dark:text-slate-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            CSOC Real-Time Security Audit Logs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cyber Security Operations Center event logs, authorization blocks, and RBAC mutations.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action, user, or resource..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'SUCCESS', 'BLOCKED', 'WARNING'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Resource</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-400">{log.timestamp}</td>
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{log.user}</td>
                  <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">{log.action}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{log.resource}</td>
                  <td className="p-4 text-slate-500">{log.ipAddress}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'SUCCESS'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : log.status === 'BLOCKED'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
