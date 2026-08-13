import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Building2, MapPin, Cpu, ArrowRight, Shield, Layers } from 'lucide-react';

export const DefenseTaxonomyView: React.FC = () => {
  const { drdoLabs = [], setActivePage } = useApp();

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
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            DRDO Defense Taxonomy & Laboratory Cluster Directory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official catalog of 50+ DRDO research establishments, missile labs, radar clusters, and metallurgy centers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(drdoLabs || []).map(lab => (
          <div
            key={lab.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                  {lab.cluster}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> {lab.location}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{lab.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{lab.domain || 'Defense Systems Research'}</p>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Active Defense Projects ({lab.activeProjects?.length || 0})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(lab.activeProjects || []).map(p => (
                    <span key={p} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">Headcount: {lab.headcount || 100} Scientists</span>
              <button
                onClick={() => setActivePage('knowledge_explorer')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Inspect Graph Nodes <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
