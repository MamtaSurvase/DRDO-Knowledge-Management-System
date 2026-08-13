import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { FileSearch, Upload, CheckCircle2, XCircle, Clock, FileText, AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { ClearanceLevel } from '../../types';

export const IngestionPipelineView: React.FC = () => {
  const { ingestionQueue, processIngestionItem, uploadDocument, currentUser } = useApp();

  const [clearance, setClearance] = useState<ClearanceLevel>('LEVEL_3_SECRET');
  const [selectedLab, setSelectedLab] = useState<string>('DRDL Hyderabad');
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      await uploadDocument(e.target.files[0], clearance, selectedLab);
      setUploading(false);
    }
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
            <FileSearch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Document Ingestion & Automated RDF Extraction Pipeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ingest classified DRDO telemetry, flight trial reports, and radar logs into ontology triples.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-600" /> Upload Intelligence Document / Telemetry File
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">DRDO Laboratory Origin</label>
            <select
              value={selectedLab}
              onChange={e => setSelectedLab(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
            >
              <option value="DRDL Hyderabad">DRDL Hyderabad (Missile Systems)</option>
              <option value="LRDE Bengaluru">LRDE Bengaluru (Radar & Sensors)</option>
              <option value="ADE Bengaluru">ADE Bengaluru (Aeronautical Systems)</option>
              <option value="CAIR Bengaluru">CAIR Bengaluru (AI & Cyber)</option>
              <option value="DMRL Hyderabad">DMRL Hyderabad (Metallurgy)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Required Security Clearance</label>
            <select
              value={clearance}
              onChange={e => setClearance(e.target.value as ClearanceLevel)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-mono"
            >
              <option value="LEVEL_1_RESTRICTED">L1 RESTRICTED</option>
              <option value="LEVEL_2_CONFIDENTIAL">L2 CONFIDENTIAL</option>
              <option value="LEVEL_3_SECRET">L3 SECRET</option>
              <option value="LEVEL_4_TOP_SECRET">L4 TOP SECRET</option>
            </select>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-slate-50/50 dark:bg-slate-950/50 relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt,.csv"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-blue-600 mx-auto" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Drag & drop telemetry files or click to browse
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Supported: PDF, DOCX, RADAR LOGS, TELEMETRY (Max 50MB)
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline Queue */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
          <span>Active Ingestion Queue ({ingestionQueue.length})</span>
          <span className="text-xs text-slate-400 font-mono">Auto OCR & Triple Merger Active</span>
        </h3>

        <div className="space-y-4">
          {ingestionQueue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.filename}</h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.drdoLab} • {item.fileSize} • Uploaded by {item.uploadedBy}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : item.status === 'REJECTED'
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}>
                    {item.status}
                  </span>

                  {item.status === 'PENDING_VERIFICATION' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => processIngestionItem(item.id, 'APPROVE')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded cursor-pointer"
                      >
                        Approve & Merge
                      </button>
                      <button
                        onClick={() => processIngestionItem(item.id, 'REJECT')}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed bg-white dark:bg-slate-800 p-2.5 rounded border border-slate-200 dark:border-slate-700">
                "{item.previewSnippet}"
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>Triples Extracted: <strong className="text-blue-600 dark:text-blue-400">{item.triplesExtracted}</strong></span>
                <span>Confidence Score: <strong className="text-emerald-600 font-bold">{(item.confidenceScore * 100).toFixed(0)}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
