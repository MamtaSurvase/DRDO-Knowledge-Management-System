import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  Network, 
  Search, 
  Plus, 
  Filter, 
  Layers, 
  Database, 
  ShieldAlert, 
  X, 
  ExternalLink,
  GitBranch,
  Building,
  SlidersHorizontal,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { OntologyEntity, EntityType, ClearanceLevel } from '../../types';

export const KnowledgeExplorer: React.FC = () => {
  const { 
    entities, 
    triples, 
    selectedEntity, 
    setSelectedEntity, 
    addEntity, 
    currentUser 
  } = useApp();

  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Form State for Adding Entity
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState<EntityType>('WeaponSystem');
  const [newClearance, setNewClearance] = useState<ClearanceLevel>('LEVEL_3_SECRET');
  const [newLab, setNewLab] = useState('DRDL Hyderabad');
  const [newSummary, setNewSummary] = useState('');
  const [newPropKey, setNewPropKey] = useState('');
  const [newPropVal, setNewPropVal] = useState('');
  const [properties, setProperties] = useState<Record<string, string>>({});

  const filteredEntities = entities.filter(e => {
    const matchesType = filterType === 'ALL' || e.type === filterType;
    const matchesSearch = e.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.drdoLab.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddProperty = () => {
    if (newPropKey && newPropVal) {
      setProperties(prev => ({ ...prev, [newPropKey]: newPropVal }));
      setNewPropKey('');
      setNewPropVal('');
    }
  };

  const handleCreateEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newSummary) return;

    addEntity({
      label: newLabel,
      type: newType,
      clearance: newClearance,
      drdoLab: newLab,
      summary: newSummary,
      properties: properties,
      linkedIds: []
    });

    setNewLabel('');
    setNewSummary('');
    setProperties({});
    setModalOpen(false);
  };

  const getEntityIconColor = (type: EntityType) => {
    switch (type) {
      case 'Laboratory': return 'bg-blue-600 text-white';
      case 'Missile': return 'bg-red-600 text-white';
      case 'RadarSystem': return 'bg-emerald-600 text-white';
      case 'Material': return 'bg-purple-600 text-white';
      case 'WeaponSystem': return 'bg-amber-600 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  const getLinkedTriples = (entityId: string) => {
    return triples.filter(t => t.subjectId === entityId || t.objectId === entityId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.25 }}
      className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans text-slate-900 dark:text-slate-100"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            DRDO Ontology Knowledge Graph
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore military entities, weapons, materials, and lab connections in an RDF semantic structure.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm shadow-blue-200 dark:shadow-none flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Ontology Entity
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter entities, missiles, labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Type:
          </span>
          {['ALL', 'Laboratory', 'Missile', 'WeaponSystem', 'RadarSystem', 'Material'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                filterType === t
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Entities Canvas Grid + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entities Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredEntities.map((entity) => {
              const isSelected = selectedEntity?.id === entity.id;
              const linkedTriples = getLinkedTriples(entity.id);

              return (
                <div
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${getEntityIconColor(entity.type)}`}>
                        {entity.label.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {entity.label}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {entity.drdoLab}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {entity.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {entity.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                      <GitBranch className="w-3 h-3" /> {linkedTriples.length} Triples Linked
                    </span>
                    <span className="text-slate-400">
                      {entity.clearance.replace('LEVEL_', 'L')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Entity Inspector Side Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          {selectedEntity ? (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                    ENTITY INSPECTOR
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedEntity.label}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedEntity.drdoLab}</p>
                </div>
                <button
                  onClick={() => setSelectedEntity(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Summary</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  {selectedEntity.summary}
                </p>
              </div>

              {/* Key Properties */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Technical Properties</h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {Object.entries(selectedEntity.properties || {}).map(([k, v]) => (
                    <div key={k} className="flex justify-between p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">{k}:</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Knowledge Triples */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">RDF Triples ({getLinkedTriples(selectedEntity.id).length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {getLinkedTriples(selectedEntity.id).map(t => (
                    <div key={t.id} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono bg-slate-50 dark:bg-slate-850">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{t.subjectLabel}</span>
                      <span className="mx-1.5 text-slate-400">➔ {t.predicate} ➔</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t.objectLabel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
              <Database className="w-10 h-10 opacity-30 text-blue-600" />
              <p className="text-xs font-medium">Select any ontology entity card to inspect its RDF graph & properties</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Entity Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Create New Ontology Entity</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEntity} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Entity Label / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pinaka Mk-III MBRL"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Type Class</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as EntityType)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="WeaponSystem">WeaponSystem</option>
                    <option value="Missile">Missile</option>
                    <option value="RadarSystem">RadarSystem</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Material">Material</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Clearance Level</label>
                  <select
                    value={newClearance}
                    onChange={e => setNewClearance(e.target.value as ClearanceLevel)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="LEVEL_1_RESTRICTED">L1 Restricted</option>
                    <option value="LEVEL_2_CONFIDENTIAL">L2 Confidential</option>
                    <option value="LEVEL_3_SECRET">L3 Secret</option>
                    <option value="LEVEL_4_TOP_SECRET">L4 Top Secret</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">DRDO Laboratory</label>
                <input
                  type="text"
                  value={newLab}
                  onChange={e => setNewLab(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Summary Briefing</label>
                <textarea
                  required
                  rows={3}
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  placeholder="Provide technical overview..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};
