import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Database, Plus, CheckCircle2, Clock, Filter, Search, GitBranch, Shield, X } from 'lucide-react';

export const TripleStore: React.FC = () => {
  const { triples, verifyTriple, addTriple, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const [subj, setSubj] = useState('');
  const [pred, setPred] = useState('developedBy');
  const [obj, setObj] = useState('');

  const filteredTriples = triples.filter(t => {
    const matchStatus = filterStatus === 'ALL' || t.status === filterStatus;
    const matchSearch = t.subjectLabel.toLowerCase().includes(search.toLowerCase()) ||
                        t.predicate.toLowerCase().includes(search.toLowerCase()) ||
                        t.objectLabel.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subj || !obj) return;

    addTriple({
      subjectId: `ent-${Date.now()}`,
      subjectLabel: subj,
      subjectType: 'WeaponSystem',
      predicate: pred,
      objectId: `ent-${Date.now() + 1}`,
      objectLabel: obj,
      objectType: 'Laboratory',
      confidence: 0.98,
      createdDate: new Date().toISOString().slice(0, 10),
      drdoLab: currentUser.drdoLab,
      status: 'VERIFIED'
    });

    setSubj('');
    setObj('');
    setModalOpen(false);
  };

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
            <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            RDF Triple Store Workbench
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage 14,820+ verified DRDO knowledge graph assertions (Subject ➔ Predicate ➔ Object).
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Knowledge Triple
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search subject, predicate, or object..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'VERIFIED', 'PENDING'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterStatus === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Triples List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Subject</th>
                <th className="p-4">Predicate</th>
                <th className="p-4">Object</th>
                <th className="p-4">Confidence</th>
                <th className="p-4">Origin Lab</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTriples.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-blue-600 dark:text-blue-400">{t.subjectLabel}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold">{t.predicate}</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">{t.objectLabel}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{(t.confidence * 100).toFixed(0)}%</td>
                  <td className="p-4 text-slate-500">{t.drdoLab}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.status === 'VERIFIED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {t.status === 'VERIFIED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {t.status === 'PENDING' && (
                      <button
                        onClick={() => verifyTriple(t.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] cursor-pointer"
                      >
                        Verify Triple
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Knowledge Triple</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subject Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Astra Mk-III"
                  value={subj}
                  onChange={e => setSubj(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Predicate Link</label>
                <select
                  value={pred}
                  onChange={e => setPred(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                >
                  <option value="developedBy">developedBy</option>
                  <option value="usesRadarSeekerFrom">usesRadarSeekerFrom</option>
                  <option value="isIntegratedInto">isIntegratedInto</option>
                  <option value="testedAt">testedAt</option>
                  <option value="manufacturedBy">manufacturedBy</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Object Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DRDL Hyderabad"
                  value={obj}
                  onChange={e => setObj(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Triple
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};
