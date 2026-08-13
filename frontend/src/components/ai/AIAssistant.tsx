import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Shield, 
  Database, 
  GitBranch, 
  Layers, 
  Cpu, 
  RefreshCw, 
  CheckCircle2, 
  Bot, 
  User as UserIcon,
  Copy,
  Plus
} from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const { currentUser, addTriple, addAuditLog } = useApp();

  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'reasoning' | 'extraction'>('reasoning');

  // Response State for AI Reasoning
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string; source?: string; time: string }>>([
    {
      sender: 'ai',
      text: `### STRATOS Defense Intelligence Engine Ready
**Node:** DRDO-STRATOS-HYD-04 // Gemini 2.5 Flash Engine Enabled
**Access Clearance:** ${currentUser.clearance}

Welcome, Officer ${currentUser.name}. How can I assist with DRDO ontology reasoning, missile propulsion telemetry, AESA radar specs, or knowledge triple extraction today?`,
      source: 'Gemini 2.5 Flash Defense Node',
      time: 'Just now'
    }
  ]);

  // Triple Extraction State
  const [inputText, setInputText] = useState<string>(
    'BrahMos Mk-II hypersonic cruise missile developed by DRDL Hyderabad uses a dual-mode scramjet engine and ultra-high temperature ceramic composite shield from DMRL for atmospheric flight at Mach 7.'
  );
  const [extractedTriples, setExtractedTriples] = useState<Array<any>>([]);
  const [extracting, setExtracting] = useState<boolean>(false);

  const samplePrompts = [
    'Analyze BrahMos Mk-II hypersonic airframe and thermal shield properties',
    'Summarize Uttam AESA radar TR modules and tracking range',
    'Extract knowledge triples for Agni-V ICBM guidance and NavIC links',
    'Identify cross-lab dependencies between DRDL and DMRL for high-stress alloys'
  ];

  const handleQuery = async (queryText?: string) => {
    const textToQuery = queryText || prompt;
    if (!textToQuery.trim()) return;

    const userMsg = textToQuery;
    setPrompt('');
    setChatHistory(prev => [...prev, {
      sender: 'user',
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setLoading(true);

    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          role: currentUser.role,
          context: `User DRDO Lab: ${currentUser.drdoLab}, Clearance: ${currentUser.clearance}`
        })
      });

      const data = await res.json();

      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: data.answer || 'No response returned from AI reasoning engine.',
        source: data.source || 'STRATOS Intelligence Node',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      addAuditLog('AI_SEMANTIC_QUERY', `Prompt: "${userMsg.slice(0, 40)}..."`, 'Generated intelligence briefing via Gemini API.');
    } catch (err) {
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: '### System Warning\nUnable to reach cloud AI endpoint. Local offline fallback active.',
        source: 'STRATOS Local Defense Node',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleExtractTriples = async () => {
    if (!inputText.trim()) return;
    setExtracting(true);

    try {
      const res = await fetch('/api/ai/extract-entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });

      const data = await res.json();
      setExtractedTriples(data.triples || []);
      addAuditLog('AI_TRIPLE_EXTRACTION', 'Text snippet parsing', `Extracted ${data.triples?.length || 0} RDF triples.`);
    } catch (err) {
      alert('Error during extraction');
    } finally {
      setExtracting(false);
    }
  };

  const handleSaveTriple = (triple: any) => {
    addTriple({
      subjectId: `ent-${Date.now()}`,
      subjectLabel: triple.subject,
      subjectType: triple.subjectType || 'WeaponSystem',
      predicate: triple.predicate,
      objectId: `ent-${Date.now() + 1}`,
      objectLabel: triple.object,
      objectType: triple.objectType || 'Laboratory',
      confidence: triple.confidence || 0.95,
      createdDate: new Date().toISOString().slice(0, 10),
      drdoLab: currentUser.drdoLab,
      status: 'VERIFIED'
    });

    alert(`Knowledge Triple "${triple.subject} ➔ ${triple.predicate} ➔ ${triple.object}" merged into DRDO Triple Store!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.25 }}
      className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans text-slate-900 dark:text-slate-100"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            STRATOS AI Defense Co-Pilot & Reasoning Engine
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Powered by Gemini 2.5 Flash — Contextual Defense Intelligence, RDF Triple Extraction & Ontology Querying.
          </p>
        </div>

        {/* View Switch Tabs */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('reasoning')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reasoning'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Strategic Reasoning
          </button>
          <button
            onClick={() => setActiveTab('extraction')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'extraction'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Triple Auto-Extractor
          </button>
        </div>
      </div>

      {activeTab === 'reasoning' ? (
        <div className="space-y-4">
          {/* Sample Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Strategic Queries:
            </span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuery(p)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs shrink-0 transition-colors cursor-pointer text-left font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Stream Window */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[520px]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-slate-800 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {msg.sender === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none font-sans'
                  }`}>
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text}
                    </div>

                    {msg.source && (
                      <div className="pt-2 border-t border-slate-200/40 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-mono opacity-80">
                        <span>Source: {msg.source}</span>
                        <span>{msg.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-500 font-mono flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    STRATOS AI synthesis in progress across DRDO ontology store...
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-b-xl flex items-center gap-3">
              <input
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleQuery()}
                placeholder="Ask STRATOS AI regarding DRDO missiles, radars, materials, or lab capabilities..."
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleQuery()}
                disabled={loading || !prompt.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> Synthesize
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Triple Extraction Workbench */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-blue-600" /> Input Unstructured Defense Intelligence Text
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Paste technical reports, telemetry logs, or operational briefings to auto-generate RDF triples.
              </p>
            </div>

            <textarea
              rows={8}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleExtractTriples}
              disabled={extracting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {extracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Extract Knowledge Triples via AI
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span>Extracted Knowledge Triples ({extractedTriples.length})</span>
              <span className="text-[10px] font-mono text-blue-600 font-bold">RDF STANAG-4609 Standard</span>
            </h3>

            {extractedTriples.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <GitBranch className="w-8 h-8 opacity-30 text-blue-600" />
                <p className="text-xs font-medium">Click "Extract Knowledge Triples" to run NLP entity parsing</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {extractedTriples.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-blue-600 dark:text-blue-400">{t.subject}</span>
                        <span className="text-slate-400">➔ {t.predicate} ➔</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{t.object}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Confidence: {(t.confidence * 100).toFixed(0)}%
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveTriple(t)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Merge
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
