import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Shield, 
  Database, 
  FileText, 
  BrainCircuit, 
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    entities, 
    triples, 
    reports, 
    setActivePage,
    setSelectedEntity,
    setSelectedReport
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const filteredEntities = query.trim() === '' ? entities.slice(0, 4) : entities.filter(e => 
    e.label.toLowerCase().includes(query.toLowerCase()) || 
    e.type.toLowerCase().includes(query.toLowerCase()) ||
    e.summary.toLowerCase().includes(query.toLowerCase())
  );

  const filteredReports = query.trim() === '' ? reports.slice(0, 3) : reports.filter(r =>
    (r.title || '').toLowerCase().includes(query.toLowerCase()) ||
    (r.summary || '').toLowerCase().includes(query.toLowerCase()) ||
    (r.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#0B172A] border border-blue-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#060D19]">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, ontology, knowledge graph..."
            className="w-full bg-transparent text-base font-medium text-white placeholder-slate-400 focus:outline-none font-sans"
            autoFocus
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[65vh] overflow-y-auto space-y-5">
          
          {/* Quick AI Trigger Banner */}
          {query.length > 2 && (
            <button
              onClick={() => {
                setActivePage('ai_assistant');
                setCommandPaletteOpen(false);
              }}
              className="w-full p-3.5 rounded-xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/60 hover:border-amber-400 flex items-center justify-between text-left group transition-all shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/25 text-amber-300 border border-amber-500/40">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-300 block">
                    Ask DRDO AI Reasoning Assistant
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    "{query}"
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Ontology Entities */}
          <div>
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider block">
                Ontology Entities ({filteredEntities.length})
              </span>
            </div>
            <div className="space-y-2">
              {filteredEntities.map((ent) => {
                const isTopSecret = ent.clearance.includes('TOP_SECRET');
                const isSecret = ent.clearance.includes('SECRET') && !isTopSecret;
                const isConfidential = ent.clearance.includes('CONFIDENTIAL');
                
                const badgeStyle = isTopSecret
                  ? 'bg-rose-500/25 text-rose-300 border-rose-500/50'
                  : isSecret
                  ? 'bg-amber-500/25 text-amber-300 border-amber-500/50'
                  : isConfidential
                  ? 'bg-blue-500/25 text-blue-300 border-blue-500/50'
                  : 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50';

                return (
                  <button
                    key={ent.id}
                    onClick={() => {
                      setSelectedEntity(ent);
                      setActivePage('knowledge_explorer');
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-[#11223B] hover:bg-[#1A3358] border border-slate-700/80 hover:border-blue-400/60 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors truncate">
                          {ent.label}
                        </div>
                        <div className="text-xs font-medium text-slate-300 truncate mt-0.5">
                          <span className="text-blue-300 font-semibold">[{ent.type}]</span> • {ent.drdoLab}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border shrink-0 ${badgeStyle}`}>
                      {ent.clearance.replace('LEVEL_', 'L')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intelligence Reports */}
          <div>
            <div className="flex items-center justify-between px-1 mb-2 pt-1">
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider block">
                Classified Intelligence Reports ({filteredReports.length})
              </span>
            </div>
            <div className="space-y-2">
              {filteredReports.map((rep) => (
                <button
                  key={rep.id}
                  onClick={() => {
                    setSelectedReport(rep);
                    setActivePage('reports_generator');
                    setCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#11223B] hover:bg-[#1A3358] border border-slate-700/80 hover:border-emerald-400/60 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors truncate">
                        {rep.title}
                      </div>
                      <div className="text-xs font-medium text-slate-300 truncate mt-0.5">
                        {rep.author} • <span className="text-slate-400">{rep.date}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-3 border-t border-slate-800 bg-[#060D19] flex items-center justify-between text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded text-[10px] font-bold">Esc</kbd>
            <span>to close</span>
          </div>
          <span className="text-slate-400 font-sans font-medium text-xs">DRDO AI Knowledge Index</span>
        </div>

      </div>
    </div>
  );
};
