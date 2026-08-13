import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Layers, Plus, Trash2, Edit, CheckCircle2, Database, Shield, X, Code } from 'lucide-react';
import { OntologySchemaClass } from '../../types';

export const OntologyBuilder: React.FC = () => {
  const { schemaClasses, addSchemaClass } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [attributes, setAttributes] = useState<Array<{ name: string; type: string; required: boolean }>>([
    { name: 'code', type: 'String', required: true }
  ]);

  const handleAddAttribute = () => {
    setAttributes(prev => [...prev, { name: '', type: 'String', required: false }]);
  };

  const handleAttributeChange = (idx: number, field: string, value: any) => {
    setAttributes(prev => prev.map((attr, i) => i === idx ? { ...attr, [field]: value } : attr));
  };

  const handleRemoveAttribute = (idx: number) => {
    setAttributes(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    addSchemaClass({
      name,
      description,
      color,
      attributes: attributes.filter(a => a.name.trim() !== ''),
      instanceCount: 0,
      status: 'ACTIVE'
    });

    setName('');
    setDescription('');
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
            <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Visual Schema & Ontology Class Builder
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Define RDF schema classes, attributes, and structural constraints for DRDO Defense Knowledge Base.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Schema Class
        </button>
      </div>

      {/* Schema Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemaClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-4 h-4 rounded-full border border-white dark:border-slate-800"
                  style={{ backgroundColor: cls.color }}
                />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{cls.name}</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-bold">
                {cls.instanceCount} Instances
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {cls.description}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Class Attributes ({cls.attributes.length})
              </span>
              <div className="space-y-1 font-mono text-xs">
                {cls.attributes.map((attr, i) => (
                  <div key={i} className="flex justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">{attr.name}</span>
                    <span className="text-slate-400">{attr.type} {attr.required ? '*' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Create New Ontology Class</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Class Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AvionicsModule"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Attributes</label>
                  <button
                    type="button"
                    onClick={handleAddAttribute}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Attribute
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {attributes.map((attr, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="attrName"
                        value={attr.name}
                        onChange={e => handleAttributeChange(idx, 'name', e.target.value)}
                        className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                      <select
                        value={attr.type}
                        onChange={e => handleAttributeChange(idx, 'type', e.target.value)}
                        className="p-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="String">String</option>
                        <option value="Number">Number</option>
                        <option value="Boolean">Boolean</option>
                        <option value="Enum">Enum</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttribute(idx)}
                        className="p-1.5 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
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
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};
