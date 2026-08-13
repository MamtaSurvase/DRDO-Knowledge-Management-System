import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Search, FileText, Download, Shield, Eye, BookOpen, Tag, Calendar, ExternalLink, X } from 'lucide-react';
import { IntelligenceReport } from '../../types';

export const SemanticSearchReportsView: React.FC = () => {
  const { reports, selectedReport, setSelectedReport } = useApp();
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('ALL');

  const allTags = ['ALL', 'Hypersonic', 'Propulsion', 'Radar', 'AESA', 'NavIC', 'ICBM', 'Avionics'];

  const filteredReports = reports.filter(r => {
    const matchTag = tagFilter === 'ALL' || (r.tags || []).includes(tagFilter);
    const matchSearch = (r.title || '').toLowerCase().includes(search.toLowerCase()) ||
                        (r.summary || '').toLowerCase().includes(search.toLowerCase()) ||
                        (r.content || r.summary || '').toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
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
            <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Semantic Search & Classified Intelligence Repository
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access DRDO technical briefs, missile flight telemetry dossiers, and radar operational manuals.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search defense intelligence dossiers, telemetry keywords..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Filter Tag:
          </span>
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setTagFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                tagFilter === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map(rep => (
          <div
            key={rep.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                  {(rep.clearance || rep.classification || 'LEVEL_1_RESTRICTED').replace('_', ' ')}
                </span>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {rep.date}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                {rep.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {rep.summary}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {(rep.tags || []).map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Author: {rep.author}</span>
              <button
                onClick={() => setSelectedReport(rep)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> Read Dossier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                  CLASSIFIED INTELLIGENCE DOSSIER
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedReport.title}</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedReport.author} • {selectedReport.date}</span>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap">
              {selectedReport.content}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Classification: {(selectedReport.clearance || selectedReport.classification || 'LEVEL_1_RESTRICTED')}</span>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
