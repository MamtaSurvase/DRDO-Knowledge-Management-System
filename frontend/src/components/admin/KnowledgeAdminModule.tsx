import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  UploadCloud, 
  GitBranch, 
  Database, 
  Cpu, 
  FileBarChart, 
  BellRing, 
  Settings, 
  User as UserIcon, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  ArrowRight, 
  BookOpen, 
  RefreshCw, 
  Shield, 
  Tags, 
  BrainCircuit, 
  Eye, 
  Download, 
  Terminal, 
  Share2, 
  Check, 
  Building2, 
  Zap, 
  Clock,
  Sparkles,
  HelpCircle,
  FolderTree,
  Edit3,
  GitMerge,
  Network,
  Printer,
  FileCheck,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { ClearanceLevel, KnowledgeTriple, OntologySchemaClass, IngestionPipelineItem, OntologyEntity } from '../../types';

// Mock Department Distribution Data for Chart
const DEPARTMENT_DISTRIBUTION = [
  { lab: 'DRDL Hyderabad', docs: 42, triples: 3200, color: '#2563eb' },
  { lab: 'LRDE Bengaluru', docs: 38, triples: 2900, color: '#0d9488' },
  { lab: 'ADE Bengaluru', docs: 28, triples: 2100, color: '#8b5cf6' },
  { lab: 'CAIR Bengaluru', docs: 35, triples: 2600, color: '#f59e0b' },
  { lab: 'DMRL Hyderabad', docs: 22, triples: 1800, color: '#ec4899' },
  { lab: 'NSTL Visakhapatnam', docs: 18, triples: 1200, color: '#6366f1' },
];

const PROCESSING_TIME_SERIES = [
  { day: 'Mon', ingested: 12, extractedTriples: 240, latencySec: 1.8 },
  { day: 'Tue', ingested: 18, extractedTriples: 380, latencySec: 1.6 },
  { day: 'Wed', ingested: 25, extractedTriples: 510, latencySec: 2.1 },
  { day: 'Thu', ingested: 15, extractedTriples: 310, latencySec: 1.5 },
  { day: 'Fri', ingested: 32, extractedTriples: 680, latencySec: 2.4 },
  { day: 'Sat', ingested: 8, extractedTriples: 150, latencySec: 1.2 },
  { day: 'Sun', ingested: 10, extractedTriples: 210, latencySec: 1.3 },
];

export const KnowledgeAdminModule: React.FC<{ initialTab?: string }> = ({ initialTab = 'overview' }) => {
  const { 
    ingestionQueue, 
    processIngestionItem, 
    uploadDocument, 
    updateDocument,
    deleteDocument,
    schemaClasses, 
    addSchemaClass, 
    triples, 
    addTriple, 
    updateTriple,
    deleteTriple,
    verifyTriple, 
    entities, 
    addEntity, 
    updateEntity,
    deleteEntity,
    mergeEntities, 
    currentUser, 
    notifications, 
    markNotificationRead,
    drdoLabs,
    addAuditLog,
    theme,
    setTheme
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLab, setUploadLab] = useState<string>('DRDL Hyderabad');
  const [uploadClearance, setUploadClearance] = useState<ClearanceLevel>('LEVEL_2_CONFIDENTIAL');
  const [uploadCategory, setUploadCategory] = useState<string>('Radar & Avionics');
  const [uploadTags, setUploadTags] = useState<string>('Agni-V, GaN TR Module, Guidance');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Manage documents state
  const [docSearch, setDocSearch] = useState('');
  const [docFilterLab, setDocFilterLab] = useState('ALL');
  const [docFilterCategory, setDocFilterCategory] = useState<string>('ALL');
  const [editingDoc, setEditingDoc] = useState<IngestionPipelineItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<IngestionPipelineItem | null>(null);

  // Metadata & Tags Batch State
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [batchTagInput, setBatchTagInput] = useState('');
  const [batchCategoryInput, setBatchCategoryInput] = useState('');

  // Schema state
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassDesc, setNewClassDesc] = useState('');
  const [newClassCategory, setNewClassCategory] = useState<'entity' | 'concept' | 'event' | 'relation'>('entity');
  const [newClassAttributes, setNewClassAttributes] = useState('designation, weight_kg, speed_mach, range_km');

  // Triple state
  const [showAddTripleModal, setShowAddTripleModal] = useState(false);
  const [newSubj, setNewSubj] = useState('');
  const [newPred, setNewPred] = useState('');
  const [newObj, setNewObj] = useState('');
  const [newConfidence, setNewConfidence] = useState(0.95);

  // Knowledge Graph Workbench States
  const [graphActiveView, setGraphActiveView] = useState<'nodes' | 'triples'>('nodes');
  
  // Node Filters & Search
  const [nodeSearch, setNodeSearch] = useState('');
  const [nodeFilterLab, setNodeFilterLab] = useState('ALL');
  const [nodeFilterType, setNodeFilterType] = useState('ALL');

  // Node Modals
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeType, setNodeType] = useState<any>('WeaponSystem');
  const [nodeDrdoLab, setNodeDrdoLab] = useState('DRDL Hyderabad');
  const [nodeClearance, setNodeClearance] = useState<ClearanceLevel>('LEVEL_2_CONFIDENTIAL');
  const [nodeSummary, setNodeSummary] = useState('');

  const [editingNode, setEditingNode] = useState<OntologyEntity | null>(null);
  const [deletingNode, setDeletingNode] = useState<OntologyEntity | null>(null);

  // Merge Nodes Modal
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeSourceId, setMergeSourceId] = useState('');
  const [mergeTargetId, setMergeTargetId] = useState('');

  // Triple / Relationship Correction States
  const [tripleSearch, setTripleSearch] = useState('');
  const [tripleFilterStatus, setTripleFilterStatus] = useState('ALL');
  const [tripleFilterLab, setTripleFilterLab] = useState('ALL');
  const [editingTriple, setEditingTriple] = useState<KnowledgeTriple | null>(null);
  const [deletingTriple, setDeletingTriple] = useState<KnowledgeTriple | null>(null);

  // Curation Reports Feature States
  const [reportSubTab, setReportSubTab] = useState<'knowledge' | 'graph' | 'document'>('knowledge');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportFilterLab, setReportFilterLab] = useState('ALL');
  const [reportFilterClearance, setReportFilterClearance] = useState('ALL');
  const [reportFilterStatus, setReportFilterStatus] = useState('ALL');
  const [generatedReport, setGeneratedReport] = useState<{
    type: 'knowledge' | 'graph' | 'document';
    title: string;
    generatedAt: string;
    reportId: string;
    author: string;
    labFilter: string;
    clearanceFilter: string;
    summaryText: string;
    metrics: { label: string; value: string | number; change?: string; color?: string }[];
    tableData: any[];
    chartData?: any[];
  } | null>(null);
  const [reportToast, setReportToast] = useState<string | null>(null);

  // Settings State
  const [curationSettings, setCurationSettings] = useState({
    autoTripleVerifyThreshold: 0.90,
    ocrEngine: 'Tesseract + Gemini OCR',
    maxBatchSize: 20,
    notifyOnPending: true,
    autoExtractTriples: true,
    defaultClassification: 'LEVEL_2_CONFIDENTIAL'
  });

  // Handlers
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    await uploadDocument(selectedFile, uploadClearance, uploadLab, uploadCategory, uploadTags);
    setIsUploading(false);
    setSelectedFile(null);
    setActiveTab('manage_docs');
  };

  const handleEditDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoc) {
      const authorVal = editingDoc.author || editingDoc.uploadedBy;
      const keywordsVal = editingDoc.keywords || editingDoc.tags;
      updateDocument(editingDoc.id, {
        filename: editingDoc.filename,
        author: authorVal,
        uploadedBy: authorVal,
        keywords: keywordsVal,
        tags: keywordsVal,
        category: editingDoc.category,
        drdoLab: editingDoc.drdoLab,
        clearance: editingDoc.clearance,
        status: editingDoc.status
      });
      setEditingDoc(null);
    }
  };

  const handleToggleSelectDoc = (id: string) => {
    setSelectedDocIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllDocs = (docs: IngestionPipelineItem[]) => {
    if (selectedDocIds.length === docs.length) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(docs.map(d => d.id));
    }
  };

  const handleApplyBatchUpdate = () => {
    if (selectedDocIds.length === 0) return;
    selectedDocIds.forEach(id => {
      const doc = ingestionQueue.find(d => d.id === id);
      if (doc) {
        const existingKeywords = doc.keywords || doc.tags || '';
        const updatedKeywords = batchTagInput 
          ? (existingKeywords ? `${existingKeywords}, ${batchTagInput}` : batchTagInput)
          : existingKeywords;
        const updatedCategory = batchCategoryInput || doc.category;
        
        updateDocument(id, {
          ...doc,
          keywords: updatedKeywords,
          tags: updatedKeywords,
          category: updatedCategory
        });
      }
    });
    setSelectedDocIds([]);
    setBatchTagInput('');
    setBatchCategoryInput('');
  };

  const handleDeleteDocConfirm = () => {
    if (deletingDoc) {
      deleteDocument(deletingDoc.id);
      setDeletingDoc(null);
    }
  };

  const handleAddClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;
    const rawAttrs = newClassAttributes.split(',').map(a => a.trim()).filter(Boolean);
    const formattedAttrs = (rawAttrs.length > 0 ? rawAttrs : ['id', 'name', 'classification']).map(a => ({
      name: a,
      type: 'string',
      required: false
    }));
    addSchemaClass({
      name: newClassName,
      description: newClassDesc || 'DRDO Defense Ontology Schema Class',
      category: newClassCategory,
      attributes: formattedAttrs,
      parentClass: 'DefenseSystem',
      color: '#8b5cf6',
      instanceCount: 0,
      status: 'ACTIVE'
    });
    setShowAddClassModal(false);
    setNewClassName('');
    setNewClassDesc('');
  };

  const handleAddTripleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubj || !newPred || !newObj) return;
    addTriple({
      subjectId: `ent-${Date.now()}-s`,
      subjectLabel: newSubj,
      predicate: newPred,
      objectId: `ent-${Date.now()}-o`,
      objectLabel: newObj,
      confidence: newConfidence,
      status: 'VERIFIED',
      drdoLab: uploadLab,
      clearance: 'LEVEL_2_CONFIDENTIAL'
    });
    setShowAddTripleModal(false);
    setNewSubj('');
    setNewPred('');
    setNewObj('');
  };

  const handleAddNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeLabel) return;
    addEntity({
      label: nodeLabel,
      type: nodeType,
      drdoLab: nodeDrdoLab,
      clearance: nodeClearance,
      summary: nodeSummary || `${nodeLabel} entity node registered in ${nodeDrdoLab} knowledge graph.`,
      properties: { createdBy: currentUser.name, createdDate: new Date().toISOString().slice(0, 10) },
      linkedIds: []
    });
    setShowAddNodeModal(false);
    setNodeLabel('');
    setNodeSummary('');
  };

  const handleEditNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNode) {
      updateEntity(editingNode.id, {
        label: editingNode.label,
        type: editingNode.type,
        drdoLab: editingNode.drdoLab,
        clearance: editingNode.clearance,
        summary: editingNode.summary
      });
      setEditingNode(null);
    }
  };

  const handleDeleteNodeConfirm = () => {
    if (deletingNode) {
      deleteEntity(deletingNode.id);
      setDeletingNode(null);
    }
  };

  const handleMergeNodesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mergeSourceId || !mergeTargetId || mergeSourceId === mergeTargetId) return;
    mergeEntities(mergeSourceId, mergeTargetId);
    setShowMergeModal(false);
    setMergeSourceId('');
    setMergeTargetId('');
  };

  const handleEditTripleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTriple) {
      updateTriple(editingTriple.id, {
        subjectLabel: editingTriple.subjectLabel,
        predicate: editingTriple.predicate,
        objectLabel: editingTriple.objectLabel,
        confidence: editingTriple.confidence,
        status: editingTriple.status,
        drdoLab: editingTriple.drdoLab,
        clearance: editingTriple.clearance
      });
      setEditingTriple(null);
    }
  };

  const handleDeleteTripleConfirm = () => {
    if (deletingTriple) {
      deleteTriple(deletingTriple.id);
      setDeletingTriple(null);
    }
  };

  // Report Generation Handlers
  const triggerReportGeneration = (type: 'knowledge' | 'graph' | 'document') => {
    setIsGeneratingReport(true);
    setGeneratedReport(null);

    setTimeout(() => {
      const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      const reportId = `DRDO-RPT-${type.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      if (type === 'knowledge') {
        const filteredE = entities.filter(e => 
          (reportFilterLab === 'ALL' || e.drdoLab === reportFilterLab) &&
          (reportFilterClearance === 'ALL' || e.clearance === reportFilterClearance)
        );
        const filteredT = triples.filter(t => 
          (reportFilterLab === 'ALL' || t.drdoLab === reportFilterLab) &&
          (reportFilterClearance === 'ALL' || t.clearance === reportFilterClearance)
        );
        const verifiedCount = filteredT.filter(t => t.status === 'VERIFIED').length;
        const avgConfidence = filteredT.length > 0 ? (filteredT.reduce((acc, t) => acc + t.confidence, 0) / filteredT.length) * 100 : 96.4;

        setGeneratedReport({
          type: 'knowledge',
          title: 'Comprehensive Knowledge Base Audit & Intelligence Report',
          generatedAt: nowStr,
          reportId,
          author: currentUser.name,
          labFilter: reportFilterLab,
          clearanceFilter: reportFilterClearance,
          summaryText: `Generated aggregate knowledge report covering ${filteredE.length} ontology entities and ${filteredT.length} extracted relationship triples across ${reportFilterLab === 'ALL' ? 'all DRDO research laboratories' : reportFilterLab}. The knowledge store exhibits a ${(verifiedCount / (filteredT.length || 1) * 100).toFixed(1)}% triple verification rate with an average AI confidence index of ${avgConfidence.toFixed(1)}%.`,
          metrics: [
            { label: 'Active Entities', value: filteredE.length, change: '+12% this month', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Knowledge Triples', value: filteredT.length, change: '+18% this month', color: 'text-teal-600 dark:text-teal-400' },
            { label: 'Triple Verification Rate', value: `${(verifiedCount / (filteredT.length || 1) * 100).toFixed(1)}%`, change: 'Verified by Curation Officers', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Avg AI Confidence', value: `${avgConfidence.toFixed(1)}%`, change: 'Gemini 2.5 Flash OCR Engine', color: 'text-purple-600 dark:text-purple-400' }
          ],
          chartData: [
            { name: 'Weapon Systems', count: filteredE.filter(e => e.type === 'WeaponSystem' || e.type === 'Missile').length || 12 },
            { name: 'Radar & Avionics', count: filteredE.filter(e => e.type === 'RadarSystem' || e.type === 'Avionics').length || 8 },
            { name: 'DRDO Labs', count: filteredE.filter(e => e.type === 'Laboratory').length || 6 },
            { name: 'Materials & Metallurgy', count: filteredE.filter(e => e.type === 'Material').length || 5 },
            { name: 'Countermeasures', count: filteredE.filter(e => e.type === 'Countermeasure').length || 4 }
          ],
          tableData: filteredE.map(e => ({
            col1: e.label,
            col2: e.type,
            col3: e.drdoLab,
            col4: e.clearance,
            col5: `${triples.filter(t => t.subjectLabel === e.label || t.objectLabel === e.label).length} connected edges`
          }))
        });
        addAuditLog('REPORT_EXPORTED', 'Knowledge Base Report', `Compiled Knowledge Report #${reportId}`);
        setReportToast(`Knowledge Base Report #${reportId} generated successfully.`);
      } else if (type === 'graph') {
        const filteredT = triples.filter(t => 
          (reportFilterLab === 'ALL' || t.drdoLab === reportFilterLab) &&
          (reportFilterStatus === 'ALL' || t.status === reportFilterStatus)
        );
        const uniqueNodes = new Set(filteredT.flatMap(t => [t.subjectLabel, t.objectLabel])).size || entities.length;
        const verifiedT = filteredT.filter(t => t.status === 'VERIFIED').length;
        const unverifiedT = filteredT.filter(t => t.status === 'UNVERIFIED').length;

        setGeneratedReport({
          type: 'graph',
          title: 'Knowledge Graph Topology & Triple Store Health Audit Report',
          generatedAt: nowStr,
          reportId,
          author: currentUser.name,
          labFilter: reportFilterLab,
          clearanceFilter: 'ALL',
          summaryText: `Generated topological graph analysis for ${uniqueNodes} graph nodes connected by ${filteredT.length} active predicate edges. ${verifiedT} relationship triples are fully verified and locked, while ${unverifiedT} pending triples await officer curation. Overall schema consistency score stands at 99.1%.`,
          metrics: [
            { label: 'Graph Nodes (Entities)', value: uniqueNodes, change: 'Topological Hubs Identified', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Predicate Edges', value: filteredT.length, change: 'Subject-Predicate-Object', color: 'text-teal-600 dark:text-teal-400' },
            { label: 'Verified Triples', value: verifiedT, change: `${((verifiedT / (filteredT.length || 1)) * 100).toFixed(1)}% of total`, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Pending Curation Queued', value: unverifiedT, change: 'Requires Admin Verification', color: 'text-amber-600 dark:text-amber-400' }
          ],
          chartData: [
            { name: 'DEVELOPED_BY', count: filteredT.filter(t => t.predicate === 'DEVELOPED_BY').length || 15 },
            { name: 'MANUFACTURED_BY', count: filteredT.filter(t => t.predicate === 'MANUFACTURED_BY').length || 9 },
            { name: 'DEPLOYED_WITH', count: filteredT.filter(t => t.predicate === 'DEPLOYED_WITH').length || 7 },
            { name: 'EQUIPPED_WITH', count: filteredT.filter(t => t.predicate === 'EQUIPPED_WITH').length || 11 },
            { name: 'TESTED_AT', count: filteredT.filter(t => t.predicate === 'TESTED_AT').length || 6 }
          ],
          tableData: filteredT.map(t => ({
            col1: t.subjectLabel,
            col2: `--[ ${t.predicate} ]-->`,
            col3: t.objectLabel,
            col4: `${(t.confidence * 100).toFixed(1)}%`,
            col5: t.status
          }))
        });
        addAuditLog('REPORT_EXPORTED', 'Knowledge Graph Report', `Compiled Graph Report #${reportId}`);
        setReportToast(`Knowledge Graph Report #${reportId} generated successfully.`);
      } else if (type === 'document') {
        const filteredDocs = ingestionQueue.filter(d => 
          (reportFilterLab === 'ALL' || d.drdoLab === reportFilterLab) &&
          (reportFilterStatus === 'ALL' || d.status === reportFilterStatus) &&
          (reportFilterClearance === 'ALL' || d.clearance === reportFilterClearance)
        );
        const totalDocs = filteredDocs.length;
        const verifiedDocs = filteredDocs.filter(d => d.status === 'VERIFIED').length;
        const pendingDocs = filteredDocs.filter(d => d.status === 'PENDING_VERIFICATION' || d.status === 'PROCESSING').length;

        setGeneratedReport({
          type: 'document',
          title: 'Document Ingestion & Intelligence Pipeline Audit Report',
          generatedAt: nowStr,
          reportId,
          author: currentUser.name,
          labFilter: reportFilterLab,
          clearanceFilter: reportFilterClearance,
          summaryText: `Ingestion audit report evaluating ${totalDocs} uploaded defense technical documents across DRDO research labs. ${verifiedDocs} documents have completed full OCR, entity extraction, and triple verification. ${pendingDocs} documents are currently queued in the AI processing engine.`,
          metrics: [
            { label: 'Ingested Documents', value: totalDocs, change: 'Across All Archives', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Fully Verified Docs', value: verifiedDocs, change: 'Extraction Validated', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Pending Processing Queue', value: pendingDocs, change: 'OCR / Extraction Active', color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Avg Extraction Speed', value: '1.45 sec/PDF', change: 'Gemini Multimodal OCR', color: 'text-purple-600 dark:text-purple-400' }
          ],
          chartData: [
            { name: 'VERIFIED', count: filteredDocs.filter(d => d.status === 'VERIFIED').length || 10 },
            { name: 'PENDING_VERIFICATION', count: filteredDocs.filter(d => d.status === 'PENDING_VERIFICATION').length || 4 },
            { name: 'PROCESSING', count: filteredDocs.filter(d => d.status === 'PROCESSING').length || 2 },
            { name: 'REJECTED', count: filteredDocs.filter(d => d.status === 'REJECTED').length || 1 }
          ],
          tableData: filteredDocs.map(d => ({
            col1: d.filename,
            col2: d.drdoLab,
            col3: d.clearance,
            col4: `${d.extractedEntitiesCount || 12} entities / ${d.extractedTriplesCount || 18} triples`,
            col5: d.status
          }))
        });
        addAuditLog('REPORT_EXPORTED', 'Document Ingestion Report', `Compiled Document Report #${reportId}`);
        setReportToast(`Document Ingestion Report #${reportId} generated successfully.`);
      }

      setIsGeneratingReport(false);
      setTimeout(() => setReportToast(null), 4000);
    }, 600);
  };

  const filteredDocs = ingestionQueue.filter(item => {
    const matchSearch = item.filename.toLowerCase().includes(docSearch.toLowerCase()) ||
                        item.uploadedBy.toLowerCase().includes(docSearch.toLowerCase()) ||
                        (item.tags && item.tags.toLowerCase().includes(docSearch.toLowerCase())) ||
                        (item.category && item.category.toLowerCase().includes(docSearch.toLowerCase()));
    const matchLab = docFilterLab === 'ALL' || item.drdoLab === docFilterLab;
    const matchCategory = docFilterCategory === 'ALL' || item.category === docFilterCategory;
    return matchSearch && matchLab && matchCategory;
  });

  const filteredEntities = entities.filter(ent => {
    const matchSearch = ent.label.toLowerCase().includes(nodeSearch.toLowerCase()) ||
                        ent.summary.toLowerCase().includes(nodeSearch.toLowerCase()) ||
                        ent.type.toLowerCase().includes(nodeSearch.toLowerCase());
    const matchLab = nodeFilterLab === 'ALL' || ent.drdoLab === nodeFilterLab;
    const matchType = nodeFilterType === 'ALL' || ent.type === nodeFilterType;
    return matchSearch && matchLab && matchType;
  });

  const filteredTriples = triples.filter(t => {
    const matchSearch = t.subjectLabel.toLowerCase().includes(tripleSearch.toLowerCase()) ||
                        t.predicate.toLowerCase().includes(tripleSearch.toLowerCase()) ||
                        t.objectLabel.toLowerCase().includes(tripleSearch.toLowerCase());
    const matchStatus = tripleFilterStatus === 'ALL' || t.status === tripleFilterStatus;
    const matchLab = tripleFilterLab === 'ALL' || t.drdoLab === tripleFilterLab;
    return matchSearch && matchStatus && matchLab;
  });

  // Calculation for Dashboard Widgets
  const totalUploadedDocs = ingestionQueue.length + 184; // base + queue
  const pendingQueueCount = ingestionQueue.filter(i => i.status === 'PENDING_VERIFICATION' || i.status === 'PROCESSING').length;
  const ontologyClassCount = schemaClasses.length;
  const totalNodesCount = entities.length;
  const verifiedTriplesCount = triples.filter(t => t.status === 'VERIFIED').length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 mb-1">
            <GitBranch className="w-4 h-4" /> KNOWLEDGE CURATION & ONTOLOGY CONTROL PLANE
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Knowledge Admin Control Hub
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('upload')}
            className="px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-teal-500/20"
          >
            <UploadCloud className="w-4 h-4" /> Ingest New Document
          </button>
          <button 
            onClick={() => setActiveTab('graph')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-500/20"
          >
            <Database className="w-4 h-4" /> Triple Store Workbench
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 scrollbar-none shadow-inner">
        {[
          { id: 'overview', label: 'Curation Overview', icon: FileBarChart },
          { id: 'upload', label: 'Upload Documents', icon: UploadCloud },
          { id: 'manage_docs', label: 'Manage Documents', icon: FileText, count: ingestionQueue.length },
          { id: 'metadata_tags', label: 'Metadata & Tags', icon: Tags, count: ingestionQueue.length },
          { id: 'ontology', label: 'Ontology Management', icon: GitBranch, count: schemaClasses.length },
          { id: 'graph', label: 'Knowledge Graph', icon: Database, count: triples.length },
          { id: 'ai_monitor', label: 'AI Processing Monitor', icon: Cpu, badge: 'Live' },
          { id: 'reports', label: 'Curation Reports', icon: BookOpen },
          { id: 'notifications', label: 'Ingestion Alerts', icon: BellRing, count: notifications.length },
          { id: 'profile', label: 'Admin Profile', icon: UserIcon },
          { id: 'settings', label: 'Pipeline Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive 
                  ? 'bg-teal-600 text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-teal-700/80 text-white' : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/80 text-white font-mono uppercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Viewport */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* SECTION 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 4 Key Metric Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Widget 1: Documents Uploaded */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Documents Uploaded</span>
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{totalUploadedDocs}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">+14% this month</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {ingestionQueue.filter(i => i.status === 'APPROVED').length + 150} Ingested & Merged
              </p>
            </div>

            {/* Widget 2: Processing Queue */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Processing Queue</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{pendingQueueCount}</span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Awaiting Action</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Average Extraction Speed: 1.8s / Doc
              </p>
            </div>

            {/* Widget 3: Ontology Classes */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ontology Classes</span>
                <GitBranch className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{ontologyClassCount}</span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">Schema Active</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {schemaClasses.reduce((acc, c) => acc + c.attributes.length, 0)} Total Attributes Defined
              </p>
            </div>

            {/* Widget 4: Knowledge Graph Nodes */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Knowledge Graph Nodes</span>
                <Database className="w-5 h-5 text-teal-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{totalNodesCount} Entities</span>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">{verifiedTriplesCount} Triples</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Confidence Density: 96.4%
              </p>
            </div>
          </div>

          {/* Processing Pipeline Stage Diagram */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">AI Knowledge Ingestion Pipeline</h3>
                <p className="text-xs text-slate-500">Live 5-stage automated OCR, entity extraction, and triple verification workflow</p>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Pipeline Operational
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {[
                { stage: '1. Ingestion', desc: 'PDF / Brief Ingest', icon: UploadCloud, active: 12, color: 'blue' },
                { stage: '2. OCR & NLP', desc: 'Gemini Text Extraction', icon: Cpu, active: 4, color: 'indigo' },
                { stage: '3. Triple Gen', desc: 'Subject-Predicate-Object', icon: BrainCircuit, active: 28, color: 'purple' },
                { stage: '4. Admin Review', desc: 'Human-in-the-loop', icon: CheckCircle2, active: pendingQueueCount, color: 'amber' },
                { stage: '5. Graph Publish', desc: 'Triple Store Indexed', icon: Database, active: verifiedTriplesCount, color: 'emerald' },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.stage} className="relative p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-slate-500">{step.stage}</span>
                      <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{step.desc}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-400">
                      <span>Items: {step.active}</span>
                      <span className="text-emerald-500 font-bold">100% OK</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Distribution & Processing Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Document Distribution Chart */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base">Department & Lab Distribution</h3>
                <p className="text-xs text-slate-500">Document counts and knowledge triple contributions per DRDO Lab</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DEPARTMENT_DISTRIBUTION}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="lab" stroke="#888888" fontSize={10} tickFormatter={(v) => v.split(' ')[0]} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="docs" name="Documents" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ingestion Time-series Chart */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base">Weekly Ingestion Velocity</h3>
                <p className="text-xs text-slate-500">Extracted knowledge triples generated over the past 7 days</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PROCESSING_TIME_SERIES}>
                    <defs>
                      <linearGradient id="colorTriples" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="extractedTriples" stroke="#0d9488" fillOpacity={1} fill="url(#colorTriples)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Uploads Table Widget */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Recent Uploads & Extraction Verification Queue</h3>
                <p className="text-xs text-slate-500">Documents submitted for OCR and graph triple merging</p>
              </div>
              <button 
                onClick={() => setActiveTab('manage_docs')}
                className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
              >
                Manage All Documents →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-y border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Document Title</th>
                    <th className="p-3">DRDO Lab</th>
                    <th className="p-3">Clearance</th>
                    <th className="p-3">Triples Extracted</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {ingestionQueue.slice(0, 5).map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3">
                        <p className="font-bold text-slate-900 dark:text-white">{item.filename}</p>
                        <p className="text-[10px] text-slate-400">Uploaded by {item.uploadedBy} on {item.uploadDate}</p>
                      </td>
                      <td className="p-3 font-semibold">{item.drdoLab}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                          {item.clearance}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-teal-600 dark:text-teal-400">{item.triplesExtracted} Triples</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.status === 'APPROVED' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                          item.status === 'PENDING_VERIFICATION' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                          'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1.5">
                        {item.status === 'PENDING_VERIFICATION' && (
                          <>
                            <button 
                              onClick={() => processIngestionItem(item.id, 'APPROVE')}
                              className="px-2 py-1 bg-emerald-600 text-white rounded font-bold text-[10px] hover:bg-emerald-700 cursor-pointer"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => processIngestionItem(item.id, 'REJECT')}
                              className="px-2 py-1 bg-rose-600 text-white rounded font-bold text-[10px] hover:bg-rose-700 cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: UPLOAD DOCUMENTS */}
      {activeTab === 'upload' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold">Ingest Defense Document into Ontology Knowledge Base</h2>
            <p className="text-xs text-slate-500">Upload technical specifications, trial telemetry, or research papers for AI triple extraction.</p>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-6">
            {/* Drag and Drop Zone */}
            <div 
              onDragOver={e => e.preventDefault()}
              onDrop={handleFileDrop}
              className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-center space-y-3 hover:border-teal-500 transition cursor-pointer"
            >
              <UploadCloud className="w-10 h-10 mx-auto text-teal-500" />
              <div>
                <p className="font-bold text-sm">Drag and drop defense PDF, DOCX, or JSON here</p>
                <p className="text-xs text-slate-400 mt-1">Supports files up to 100 MB with embedded diagrams and tabular specifications</p>
              </div>
              <input 
                type="file" 
                id="file-upload" 
                onChange={handleFileSelect} 
                className="hidden" 
              />
              <label 
                htmlFor="file-upload" 
                className="inline-block px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-xs rounded-lg cursor-pointer transition"
              >
                Browse Files
              </label>

              {selectedFile && (
                <div className="mt-4 p-3 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-mono font-bold flex items-center justify-between">
                  <span>Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  <button type="button" onClick={() => setSelectedFile(null)} className="text-rose-500 hover:underline">Remove</button>
                </div>
              )}
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">DRDO Laboratory</label>
                <select 
                  value={uploadLab}
                  onChange={e => setUploadLab(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                >
                  {drdoLabs.map(lab => (
                    <option key={lab.id} value={lab.name}>{lab.name} [{lab.code}]</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Security Clearance Level</label>
                <select 
                  value={uploadClearance}
                  onChange={e => setUploadClearance(e.target.value as ClearanceLevel)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold text-blue-600 dark:text-blue-400"
                >
                  <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                  <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                  <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                  <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Document Domain Categorization</label>
                <select 
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold"
                >
                  <option value="Radar & Avionics">Radar & Avionics</option>
                  <option value="Strategic Missile Guidance">Strategic Missile Guidance</option>
                  <option value="Autonomous Unmanned Aerial Systems">Autonomous Unmanned Aerial Systems</option>
                  <option value="Metallurgy & Armor Materials">Metallurgy & Armor Materials</option>
                  <option value="Cyber & Electronic Warfare">Cyber & Electronic Warfare</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Metadata Tags (Comma Separated)</label>
                <input 
                  type="text" 
                  value={uploadTags}
                  onChange={e => setUploadTags(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
                  placeholder="e.g. Agni-V, GaN TR Module, Flight Trial"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={!selectedFile || isUploading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 shadow-md shadow-teal-500/20"
            >
              <Zap className={`w-4 h-4 ${isUploading ? 'animate-spin' : ''}`} />
              {isUploading ? 'Ingesting Document & Extracting Triples...' : 'Upload & Process via Gemini OCR Pipeline'}
            </button>
          </form>
        </div>
      )}

      {/* SECTION 3: MANAGE DOCUMENTS & EXTRACTION PIPELINE */}
      {activeTab === 'manage_docs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Manage Documents & Extraction Pipeline</h2>
              <p className="text-xs text-slate-500">
                Monitor file ingestion status, re-trigger AI triple extractions, and purge documents. To edit Title, Author, Keywords, Category, or Department, switch to the <button onClick={() => setActiveTab('metadata_tags')} className="text-teal-600 dark:text-teal-400 font-bold underline cursor-pointer">Metadata & Tags</button> tab.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('upload')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Upload Document
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by filename, uploader, or lab..."
                value={docSearch}
                onChange={e => setDocSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <select 
              value={docFilterLab}
              onChange={e => setDocFilterLab(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-mono font-bold"
            >
              <option value="ALL">All DRDO Labs</option>
              {drdoLabs.map(l => (
                <option key={l.id} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Document Title</th>
                  <th className="p-4">DRDO Lab</th>
                  <th className="p-4">Clearance</th>
                  <th className="p-4">Ingestion Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">
                      No matching defense documents found.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-4">
                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                          {doc.filename}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Size: {doc.fileSize} | By: {doc.author || doc.uploadedBy} on {doc.uploadDate}
                        </p>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">{doc.drdoLab}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-[10px]">
                          {doc.clearance}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          doc.status === 'APPROVED' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                          doc.status === 'PENDING_VERIFICATION' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                          doc.status === 'REJECTED' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400' :
                          'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => {
                              setEditingDoc(doc);
                              setActiveTab('metadata_tags');
                            }}
                            className="px-2.5 py-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded font-bold text-[10px] hover:bg-teal-100 dark:hover:bg-teal-900/80 flex items-center gap-1 cursor-pointer transition"
                            title="Edit Title, Author, Keywords, Category & Department in Tags Tab"
                          >
                            <Tags className="w-3 h-3" /> Edit Metadata & Tags
                          </button>
                          <button 
                            onClick={() => setDeletingDoc(doc)}
                            className="px-2.5 py-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded font-bold text-[10px] hover:bg-rose-100 dark:hover:bg-rose-900/80 flex items-center gap-1 cursor-pointer transition"
                            title="Delete Document"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                          <button 
                            onClick={() => processIngestionItem(doc.id, 'APPROVE')}
                            className="px-2 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-bold text-[10px] hover:bg-slate-200 cursor-pointer transition"
                            title="Trigger AI Triple Re-extraction"
                          >
                            Re-extract
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION: METADATA & TAGS */}
      {activeTab === 'metadata_tags' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-teal-400 mb-1">
                <Tags className="w-4 h-4" /> KNOWLEDGE BASE METADATA & TAXONOMY CURATION
              </div>
              <h2 className="text-xl font-bold">Metadata, Keywords & Categorization Control</h2>
              <p className="text-xs text-slate-500">
                Curate and edit Document Title, Author, Keywords, Category, and Department (DRDO Lab) across all ingested defense files.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('upload')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Ingest New Document
            </button>
          </div>

          {/* KPI Summary Row for Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Curated Files</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{ingestionQueue.length}</p>
              <p className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">100% Ingestion Coverage</p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Categorized Documents</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {ingestionQueue.filter(d => d.category).length} / {ingestionQueue.length}
              </p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                {Math.round((ingestionQueue.filter(d => d.category).length / Math.max(1, ingestionQueue.length)) * 100)}% Categorized
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unique Keyword Tags</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {new Set(ingestionQueue.flatMap(d => (d.keywords || d.tags || '').split(',').map(s => s.trim()).filter(Boolean))).size} Tags
              </p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">Active Taxonomy Vocabulary</p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Departments</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {new Set(ingestionQueue.map(d => d.drdoLab)).size} DRDO Labs
              </p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">Departmental Distribution</p>
            </div>
          </div>

          {/* Batch Tagging & Category Toolbar */}
          {selectedDocIds.length > 0 && (
            <div className="p-4 bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-teal-900 dark:text-teal-200">
                <span className="px-2.5 py-1 bg-teal-600 text-white rounded-full text-xs font-mono">
                  {selectedDocIds.length}
                </span>
                <span>Documents Selected for Batch Metadata Update</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Add Keyword Tag (e.g. Hypersonic)"
                  value={batchTagInput}
                  onChange={e => setBatchTagInput(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                />
                <select 
                  value={batchCategoryInput}
                  onChange={e => setBatchCategoryInput(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold"
                >
                  <option value="">Select Category...</option>
                  <option value="Radar & Avionics">Radar & Avionics</option>
                  <option value="Strategic Missile Guidance">Strategic Missile Guidance</option>
                  <option value="Autonomous Unmanned Aerial Systems">Autonomous Unmanned Systems</option>
                  <option value="Metallurgy & Armor Materials">Metallurgy & Materials</option>
                  <option value="Cyber & Electronic Warfare">Cyber & Electronic Warfare</option>
                  <option value="Naval & Submarine Systems">Naval & Submarine Systems</option>
                </select>
                <button 
                  onClick={handleApplyBatchUpdate}
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg cursor-pointer transition shadow-sm"
                >
                  Apply Batch Update
                </button>
                <button 
                  onClick={() => setSelectedDocIds([])}
                  className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by Title, Author, Keywords, Category, or Department..."
                value={docSearch}
                onChange={e => setDocSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>
            <select 
              value={docFilterCategory}
              onChange={e => setDocFilterCategory(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-bold text-slate-700 dark:text-slate-300"
            >
              <option value="ALL">All Categories</option>
              <option value="Radar & Avionics">Radar & Avionics</option>
              <option value="Strategic Missile Guidance">Strategic Missile Guidance</option>
              <option value="Autonomous Unmanned Aerial Systems">Autonomous Unmanned Systems</option>
              <option value="Metallurgy & Armor Materials">Metallurgy & Materials</option>
              <option value="Cyber & Electronic Warfare">Cyber & Electronic Warfare</option>
              <option value="Naval & Submarine Systems">Naval & Submarine Systems</option>
            </select>
            <select 
              value={docFilterLab}
              onChange={e => setDocFilterLab(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-mono font-bold text-slate-700 dark:text-slate-300"
            >
              <option value="ALL">All Departments (Labs)</option>
              {drdoLabs.map(l => (
                <option key={l.id} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>

          {/* Metadata Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4 w-10 text-center">
                    <input 
                      type="checkbox" 
                      checked={filteredDocs.length > 0 && selectedDocIds.length === filteredDocs.length}
                      onChange={() => handleSelectAllDocs(filteredDocs)}
                      className="rounded border-slate-300 dark:border-slate-700 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Title (Document Name)</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Keywords / Tags</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Department (DRDO Lab)</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                      No matching documents found. Try adjusting title, author, keyword or department filters.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map(doc => {
                    const isSelected = selectedDocIds.includes(doc.id);
                    const author = doc.author || doc.uploadedBy;
                    const keywords = doc.keywords || doc.tags || 'N/A';
                    return (
                      <tr key={doc.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition ${isSelected ? 'bg-teal-50/40 dark:bg-teal-950/30' : ''}`}>
                        <td className="p-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => handleToggleSelectDoc(doc.id)}
                            className="rounded border-slate-300 dark:border-slate-700 cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                            {doc.filename}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Uploaded on {doc.uploadDate} | Clearance: {doc.clearance}
                          </p>
                        </td>
                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                          {author}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {keywords.split(',').map((kw, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px] font-mono border border-slate-200/60 dark:border-slate-700/60">
                                #{kw.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-bold text-[10px] inline-block border border-teal-200 dark:border-teal-800">
                            {doc.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {doc.drdoLab}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setEditingDoc(doc)}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-500/20 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Metadata & Tags
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: ONTOLOGY MANAGEMENT */}
      {activeTab === 'ontology' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Ontology Schema & Class Management</h2>
              <p className="text-xs text-slate-500">Define domain entity classes, relationship attributes, and parent/child class hierarchies.</p>
            </div>
            <button 
              onClick={() => setShowAddClassModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Create Schema Class
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemaClasses.map(cls => (
              <div key={cls.id} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold uppercase">
                      {cls.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">{cls.name}</h3>
                  </div>
                  <GitBranch className="w-5 h-5 text-purple-500 shrink-0" />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">{cls.description}</p>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1.5">Defined Attributes ({cls.attributes.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cls.attributes.map((attr, idx) => {
                      const attrName = typeof attr === 'string' ? attr : attr.name;
                      return (
                        <span key={`${attrName}-${idx}`} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                          {attrName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: KNOWLEDGE GRAPH WORKBENCH */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Knowledge Graph Workbench & Triple Store
              </h2>
              <p className="text-xs text-slate-500">Manage ontology entity nodes, merge duplicate entities, and correct relationship triples.</p>
            </div>

            {/* Quick Feature Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button 
                onClick={() => setShowAddNodeModal(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/20 transition"
              >
                <Plus className="w-4 h-4" /> Add Node
              </button>
              <button 
                onClick={() => setShowMergeModal(true)}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm shadow-purple-500/20 transition"
              >
                <GitMerge className="w-4 h-4" /> Merge Nodes
              </button>
              <button 
                onClick={() => setGraphActiveView('triples')}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm shadow-amber-500/20 transition"
              >
                <Edit3 className="w-4 h-4" /> Correct Relationships
              </button>
              <button 
                onClick={() => setShowAddTripleModal(true)}
                className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-500/20 transition"
              >
                <Plus className="w-4 h-4" /> Add Relationship Triple
              </button>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setGraphActiveView('nodes')}
              className={`px-4 py-2.5 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
                graphActiveView === 'nodes'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Entity Nodes Library</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono">
                {entities.length}
              </span>
            </button>
            <button
              onClick={() => setGraphActiveView('triples')}
              className={`px-4 py-2.5 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
                graphActiveView === 'triples'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Relationships & Triples Store</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-mono">
                {triples.length}
              </span>
            </button>
          </div>

          {/* SUB-VIEW 1: ENTITY NODES LIBRARY */}
          {graphActiveView === 'nodes' && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search nodes by name, type, summary..."
                    value={nodeSearch}
                    onChange={e => setNodeSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <select 
                  value={nodeFilterType}
                  onChange={e => setNodeFilterType(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="ALL">All Entity Types</option>
                  <option value="WeaponSystem">Weapon System</option>
                  <option value="Missile">Missile</option>
                  <option value="RadarSystem">Radar System</option>
                  <option value="Avionics">Avionics</option>
                  <option value="Laboratory">DRDO Laboratory</option>
                  <option value="Material">Material & Metallurgy</option>
                  <option value="ThreatActor">Threat Actor</option>
                  <option value="Countermeasure">Countermeasure</option>
                </select>
                <select 
                  value={nodeFilterLab}
                  onChange={e => setNodeFilterLab(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-mono font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="ALL">All DRDO Labs</option>
                  {drdoLabs.map(l => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Nodes Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-4">Node Label</th>
                      <th className="p-4">Entity Type</th>
                      <th className="p-4">DRDO Lab</th>
                      <th className="p-4">Clearance</th>
                      <th className="p-4">Summary / Details</th>
                      <th className="p-4 text-center">Connected Triples</th>
                      <th className="p-4 text-right">Node Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredEntities.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                          No matching entity nodes found. Try adding a new node or adjusting filters.
                        </td>
                      </tr>
                    ) : (
                      filteredEntities.map(ent => {
                        const connectedTriples = triples.filter(t => t.subjectId === ent.id || t.objectId === ent.id || t.subjectLabel === ent.label || t.objectLabel === ent.label).length;
                        return (
                          <tr key={ent.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                            <td className="p-4 font-bold text-blue-600 dark:text-blue-400">
                              <p className="flex items-center gap-1.5 text-sm">
                                <Network className="w-4 h-4 text-blue-500 shrink-0" />
                                {ent.label}
                              </p>
                              <p className="text-[10px] font-mono text-slate-400 font-normal">ID: {ent.id}</p>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold text-[10px] inline-block border border-purple-200 dark:border-purple-800">
                                {ent.type}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                              {ent.drdoLab}
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                                {ent.clearance}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2">
                              {ent.summary}
                            </td>
                            <td className="p-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                              <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 rounded-full border border-blue-200 dark:border-blue-800">
                                {connectedTriples} edges
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingNode(ent)}
                                  className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded cursor-pointer"
                                  title="Edit Node Metadata"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setMergeSourceId(ent.id);
                                    setShowMergeModal(true);
                                  }}
                                  className="p-1.5 bg-purple-100 dark:bg-purple-950 hover:bg-purple-200 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 rounded cursor-pointer"
                                  title="Merge into another node"
                                >
                                  <GitMerge className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeletingNode(ent)}
                                  className="p-1.5 bg-rose-100 dark:bg-rose-950 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-400 rounded cursor-pointer"
                                  title="Delete Node"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: RELATIONSHIPS & TRIPLES STORE (CORRECT RELATIONSHIPS) */}
          {graphActiveView === 'triples' && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search relationship by Subject, Predicate, or Object..."
                    value={tripleSearch}
                    onChange={e => setTripleSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <select 
                  value={tripleFilterStatus}
                  onChange={e => setTripleFilterStatus(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="VERIFIED">Verified Only</option>
                  <option value="UNVERIFIED">Unverified Only</option>
                  <option value="FLAGGED">Flagged Only</option>
                </select>
                <select 
                  value={tripleFilterLab}
                  onChange={e => setTripleFilterLab(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-mono font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="ALL">All DRDO Labs</option>
                  {drdoLabs.map(l => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Triples Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-4">Subject Entity</th>
                      <th className="p-4 text-center">Predicate Relationship</th>
                      <th className="p-4">Object Entity / Value</th>
                      <th className="p-4">Confidence</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Relationship Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {filteredTriples.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 text-xs font-sans">
                          No matching relationship triples found.
                        </td>
                      </tr>
                    ) : (
                      filteredTriples.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="p-4 font-bold text-blue-600 dark:text-blue-400">
                            {t.subjectLabel}
                            <span className="block text-[9px] text-slate-400 font-normal">[{t.subjectType || 'Entity'}]</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px]">
                              --[{t.predicate}]--&gt;
                            </span>
                          </td>
                          <td className="p-4 font-bold text-teal-600 dark:text-teal-400">
                            {t.objectLabel}
                            <span className="block text-[9px] text-slate-400 font-normal">[{t.objectType || 'Entity'}]</span>
                          </td>
                          <td className="p-4 font-bold">{(t.confidence * 100).toFixed(1)}%</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              t.status === 'VERIFIED' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                              t.status === 'FLAGGED' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400' :
                              'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 font-sans">
                              {t.status !== 'VERIFIED' && (
                                <button 
                                  onClick={() => verifyTriple(t.id)}
                                  className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[10px] hover:bg-emerald-700 cursor-pointer shadow-xs"
                                >
                                  Verify
                                </button>
                              )}
                              <button
                                onClick={() => setEditingTriple(t)}
                                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[10px] cursor-pointer shadow-xs flex items-center gap-1"
                                title="Correct Relationship"
                              >
                                <Edit3 className="w-3 h-3" /> Correct
                              </button>
                              <button
                                onClick={() => setDeletingTriple(t)}
                                className="p-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded cursor-pointer"
                                title="Delete Relationship"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 6: AI PROCESSING MONITORING */}
      {activeTab === 'ai_monitor' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">AI Extraction Engine Monitoring</h2>
            <p className="text-xs text-slate-500">Live processing metrics for Gemini OCR, entity extraction accuracy, and token throughput.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Extraction Accuracy</span>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">98.2%</p>
              <p className="text-xs text-slate-400 font-mono">Evaluated against DRDO Gold Standard</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Avg Triple Generation Speed</span>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">1.45 sec</p>
              <p className="text-xs text-slate-400 font-mono">Per 50-page technical PDF</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Token Throughput</span>
              <p className="text-3xl font-black text-purple-600 dark:text-purple-400">142,500</p>
              <p className="text-xs text-slate-400 font-mono">Tokens / minute capacity</p>
            </div>
          </div>

          {/* Console Log Terminal Widget */}
          <div className="p-6 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs space-y-3 shadow-md border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <Terminal className="w-4 h-4" /> Gemini AI Extraction Stream (Live Console)
              </span>
              <span className="text-[10px] text-slate-500">Node Worker #04 - Active</span>
            </div>

            <div className="space-y-1.5 h-48 overflow-y-auto text-[11px] text-slate-300">
              <p className="text-slate-500">[05:12:01.002] INFO: Ingested document "Agni-V_Guidance_Telemetry_Rpt.pdf"</p>
              <p className="text-slate-400">[05:12:01.420] OCR: Extracted 14,200 characters from 22 pages.</p>
              <p className="text-teal-400">[05:12:02.110] GEMINI_API: Prompting gemini-2.5-flash with ontology schema rules...</p>
              <p className="text-emerald-400">[05:12:02.890] EXTRACTED: 18 Entities identified: [Agni-V, DRDL, Ring Laser Gyro, Solid Rocket Booster].</p>
              <p className="text-blue-400">[05:12:03.104] TRIPLES: Generated 24 Knowledge Triples. Avg confidence: 0.962.</p>
              <p className="text-amber-400">[05:12:03.350] WORKFLOW: Sent 24 triples to Knowledge Admin verification queue.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: CURATION REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-teal-400 mb-1 uppercase tracking-wider">
                <FileBarChart className="w-4 h-4" /> Defense Knowledge Analytics & Dissemination
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Curation Reports & Intelligence Engine</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Compile and export Knowledge Base, Knowledge Graph Topology, and Document Ingestion intelligence reports.
              </p>
            </div>

            {/* Quick Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={reportFilterLab} 
                  onChange={e => setReportFilterLab(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value="ALL">All DRDO Labs</option>
                  {drdoLabs.map(l => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={reportFilterClearance} 
                  onChange={e => setReportFilterClearance(e.target.value)}
                  className="bg-transparent text-xs font-mono font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value="ALL">All Clearance</option>
                  <option value="LEVEL_1_RESTRICTED">Restricted</option>
                  <option value="LEVEL_2_CONFIDENTIAL">Confidential</option>
                  <option value="LEVEL_3_SECRET">Secret</option>
                  <option value="LEVEL_4_TOP_SECRET">Top Secret</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {reportToast && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-3 bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{reportToast}</span>
              </div>
              <button onClick={() => setReportToast(null)} className="text-white/80 hover:text-white font-bold text-xs">✕</button>
            </motion.div>
          )}

          {/* 3 Dedicated Report Generators Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Knowledge Report Generator */}
            <div className={`p-6 rounded-2xl border transition shadow-sm space-y-4 flex flex-col justify-between ${
              reportSubTab === 'knowledge' 
                ? 'bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-slate-900 border-blue-500/50 dark:border-blue-500/40 ring-2 ring-blue-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-extrabold border border-blue-200 dark:border-blue-800">
                    {entities.length} Entities
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Knowledge Base Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Aggregate audit of defense weapon systems, laboratories, missile specifications, and technology domain coverage.
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-mono space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <p className="flex justify-between"><span>Lab Scope:</span> <strong className="text-slate-800 dark:text-slate-200">{reportFilterLab}</strong></p>
                  <p className="flex justify-between"><span>Clearance:</span> <strong className="text-slate-800 dark:text-slate-200">{reportFilterClearance}</strong></p>
                  <p className="flex justify-between"><span>Avg AI Confidence:</span> <strong className="text-emerald-600 dark:text-emerald-400">96.4%</strong></p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setReportSubTab('knowledge');
                  triggerReportGeneration('knowledge');
                }}
                disabled={isGeneratingReport}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 transition"
              >
                {isGeneratingReport && reportSubTab === 'knowledge' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling Knowledge Report...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    <span>Generate Knowledge Report</span>
                  </>
                )}
              </button>
            </div>

            {/* 2. Graph Report Generator */}
            <div className={`p-6 rounded-2xl border transition shadow-sm space-y-4 flex flex-col justify-between ${
              reportSubTab === 'graph' 
                ? 'bg-gradient-to-br from-teal-50/50 to-white dark:from-teal-950/20 dark:to-slate-900 border-teal-500/50 dark:border-teal-500/40 ring-2 ring-teal-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-300'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-mono text-[10px] font-extrabold border border-teal-200 dark:border-teal-800">
                    {triples.length} Triples
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Knowledge Graph Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Topological graph schema metrics, node centrality hubs, predicate relationship breakdown, and triple store health.
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-mono space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <p className="flex justify-between"><span>Unique Nodes:</span> <strong className="text-slate-800 dark:text-slate-200">{entities.length}</strong></p>
                  <p className="flex justify-between"><span>Verified Triples:</span> <strong className="text-emerald-600 dark:text-emerald-400">{triples.filter(t => t.status === 'VERIFIED').length}</strong></p>
                  <p className="flex justify-between"><span>Unverified Queue:</span> <strong className="text-amber-600 dark:text-amber-400">{triples.filter(t => t.status === 'UNVERIFIED').length}</strong></p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setReportSubTab('graph');
                  triggerReportGeneration('graph');
                }}
                disabled={isGeneratingReport}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-500/20 transition"
              >
                {isGeneratingReport && reportSubTab === 'graph' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling Graph Topology...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4" />
                    <span>Generate Graph Report</span>
                  </>
                )}
              </button>
            </div>

            {/* 3. Document Report Generator */}
            <div className={`p-6 rounded-2xl border transition shadow-sm space-y-4 flex flex-col justify-between ${
              reportSubTab === 'document' 
                ? 'bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-900 border-purple-500/50 dark:border-purple-500/40 ring-2 ring-purple-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-extrabold border border-purple-200 dark:border-purple-800">
                    {ingestionQueue.length} PDFs
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Document Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Ingestion audit of defense technical documents, OCR extraction accuracy, verification status, and lab submission logs.
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-mono space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <p className="flex justify-between"><span>Verified Docs:</span> <strong className="text-emerald-600 dark:text-emerald-400">{ingestionQueue.filter(i => i.status === 'VERIFIED').length}</strong></p>
                  <p className="flex justify-between"><span>Processing Queue:</span> <strong className="text-amber-600 dark:text-amber-400">{ingestionQueue.filter(i => i.status === 'PENDING_VERIFICATION' || i.status === 'PROCESSING').length}</strong></p>
                  <p className="flex justify-between"><span>OCR Engine:</span> <strong className="text-slate-800 dark:text-slate-200">Gemini Multimodal</strong></p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setReportSubTab('document');
                  triggerReportGeneration('document');
                }}
                disabled={isGeneratingReport}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20 transition"
              >
                {isGeneratingReport && reportSubTab === 'document' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling Ingestion Audit...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Generate Document Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GENERATED REPORT INTERACTIVE VIEWER */}
          {generatedReport && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
            >
              {/* Report Official Classification Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>REF: {generatedReport.reportId}</span>
                    <span>•</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">OFFICIAL USE ONLY / LEVEL 3 SECRET</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    {generatedReport.type === 'knowledge' && <BookOpen className="w-5 h-5 text-blue-600" />}
                    {generatedReport.type === 'graph' && <GitBranch className="w-5 h-5 text-teal-600" />}
                    {generatedReport.type === 'document' && <FileText className="w-5 h-5 text-purple-600" />}
                    {generatedReport.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Compiled on {generatedReport.generatedAt} by Officer <strong className="text-slate-800 dark:text-slate-200">{generatedReport.author}</strong> ({generatedReport.labFilter === 'ALL' ? 'All DRDO Labs Scope' : generatedReport.labFilter})
                  </p>
                </div>

                {/* Export Action Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={() => {
                      addAuditLog('REPORT_EXPORTED', generatedReport.title, 'Printed PDF Digest');
                      window.print();
                    }}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / PDF Digest
                  </button>
                  <button 
                    onClick={() => {
                      addAuditLog('REPORT_EXPORTED', generatedReport.title, 'Exported CSV Data');
                      const keys = Object.keys(generatedReport.tableData[0] || {});
                      const csvContent = "data:text/csv;charset=utf-8," 
                        + [keys.join(",")].concat(generatedReport.tableData.map(r => Object.values(r).map(v => `"${v}"`).join(","))).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `${generatedReport.reportId}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      setReportToast(`Report data exported as ${generatedReport.reportId}.csv`);
                    }}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button 
                    onClick={() => {
                      addAuditLog('REPORT_EXPORTED', generatedReport.title, 'Exported JSON Schema');
                      const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(generatedReport, null, 2));
                      const link = document.createElement("a");
                      link.setAttribute("href", jsonStr);
                      link.setAttribute("download", `${generatedReport.reportId}.json`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      setReportToast(`Report JSON exported as ${generatedReport.reportId}.json`);
                    }}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Export JSON
                  </button>
                </div>
              </div>

              {/* Executive Summary Paragraph */}
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <p className="font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider text-[10px] mb-1 font-mono">Executive Summary Briefing:</p>
                {generatedReport.summaryText}
              </div>

              {/* 4 Metric KPI Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {generatedReport.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">{m.label}</span>
                    <p className={`text-2xl font-black ${m.color || 'text-slate-900 dark:text-white'}`}>{m.value}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{m.change}</p>
                  </div>
                ))}
              </div>

              {/* Visual Distribution Chart & Tabular Data Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Distribution Chart */}
                {generatedReport.chartData && (
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      Domain Distribution Analysis
                    </h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={generatedReport.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                          <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} interval={0} />
                          <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tabular Data Breakdown */}
                <div className={`${generatedReport.chartData ? 'lg:col-span-2' : 'lg:col-span-3'} rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs`}>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span>Report Compiled Records ({generatedReport.tableData.length} records)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">✓ Audited & Verified</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 text-[10px] text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="p-3">Record Label / Name</th>
                          <th className="p-3">Class / Predicate</th>
                          <th className="p-3">DRDO Lab / Target</th>
                          <th className="p-3">Clearance / Score</th>
                          <th className="p-3 text-right">Status / Edges</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {generatedReport.tableData.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{row.col1}</td>
                            <td className="p-3 text-slate-700 dark:text-slate-300 font-bold">{row.col2}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">{row.col3}</td>
                            <td className="p-3 text-teal-600 dark:text-teal-400 font-bold">{row.col4}</td>
                            <td className="p-3 text-right">
                              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                                {row.col5}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Historical Static Archive Reports Downloads */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              Archived Strategic Dissemination Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">DRDO Strategic Knowledge Graph Summary 2026</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Comprehensive ontology summary of missile systems, radar telemetry, and material research nodes across 6 laboratories.</p>
                <button 
                  onClick={() => {
                    triggerReportGeneration('knowledge');
                  }} 
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Download className="w-3.5 h-3.5" /> Generate & View Summary
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Weekly Ingestion Audit & Verification Log</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Log of all approved, rejected, and modified triples in the primary knowledge store.</p>
                <button 
                  onClick={() => {
                    triggerReportGeneration('document');
                  }} 
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Download className="w-3.5 h-3.5" /> Generate & View Ingestion Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold">Ingestion & Verification Alerts</h2>
            <p className="text-xs text-slate-500">System notifications regarding new uploads, triple verification requests, and schema updates.</p>
          </div>

          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                    {n.type}
                  </span>
                  <h4 className="font-bold text-sm">{n.title}</h4>
                  <p className="text-xs text-slate-500">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">{n.timestamp}</span>
                </div>
                {!n.read && (
                  <button onClick={() => markNotificationRead(n.id)} className="text-xs text-teal-600 font-bold hover:underline cursor-pointer">
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 9: PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-bold">Knowledge Admin Security Profile</h2>
            <p className="text-xs text-slate-500">Curation officer credentials and lab affiliation details.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-500" />
              <div>
                <h3 className="text-lg font-bold">{currentUser.name}</h3>
                <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-mono text-[10px] font-bold">
                    {currentUser.role}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-bold">
                    {currentUser.clearance}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Designation:</span>
                <span className="font-bold">{currentUser.designation}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Department:</span>
                <span className="font-bold">{currentUser.department}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">DRDO Lab:</span>
                <span className="font-bold">{currentUser.drdoLab}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-bold">Ingestion Pipeline Settings</h2>
            <p className="text-xs text-slate-500">Configure OCR parameters, auto-verification thresholds, and default clearance levels.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            {/* Appearance Theme Selector */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Interface Appearance & Theme Mode</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-200 ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">Light Theme</p>
                    <p className="text-[10px] opacity-75">High Contrast Daylight Mode</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-200 ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">Dark Theme</p>
                    <p className="text-[10px] opacity-75">Tactical Low-Light Canvas</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Auto-Triple Verification Confidence Threshold</label>
              <input 
                type="number" 
                step="0.05" 
                min="0.5" 
                max="0.99"
                value={curationSettings.autoTripleVerifyThreshold}
                onChange={e => setCurationSettings({ ...curationSettings, autoTripleVerifyThreshold: parseFloat(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
              />
              <p className="text-[11px] text-slate-400">Triples extracted with confidence above this score are automatically verified.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">OCR Extraction Engine</label>
              <select 
                value={curationSettings.ocrEngine}
                onChange={e => setCurationSettings({ ...curationSettings, ocrEngine: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold"
              >
                <option value="Tesseract + Gemini OCR">Tesseract + Gemini OCR (High Accuracy)</option>
                <option value="Gemini Multimodal Direct">Gemini Multimodal Direct (Fast)</option>
              </select>
            </div>

            <button onClick={() => addAuditLog('SETTINGS_SAVED', 'Pipeline Settings', 'Updated OCR threshold settings')} className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-lg hover:bg-teal-700 transition cursor-pointer">
              Save Settings
            </button>
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>

      {/* MODAL: CREATE SCHEMA CLASS */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-bold text-lg">Create New Ontology Schema Class</h3>
            <form onSubmit={handleAddClassSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Class Name</label>
                <input type="text" placeholder="e.g. HypersonicGlideVehicle" value={newClassName} onChange={e => setNewClassName(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded font-mono" required />
              </div>
              <div>
                <label className="font-bold block mb-1">Category</label>
                <select value={newClassCategory} onChange={e => setNewClassCategory(e.target.value as any)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded font-mono">
                  <option value="entity">Entity Class</option>
                  <option value="concept">Concept Class</option>
                  <option value="event">Event Class</option>
                  <option value="relation">Relation Class</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Description</label>
                <input type="text" placeholder="Short domain description..." value={newClassDesc} onChange={e => setNewClassDesc(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded" />
              </div>
              <div>
                <label className="font-bold block mb-1">Attributes (Comma Separated)</label>
                <input type="text" value={newClassAttributes} onChange={e => setNewClassAttributes(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded font-mono" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddClassModal(false)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 font-bold rounded">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-purple-600 text-white font-bold rounded">Create Class</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TRIPLE MANUALLY */}
      {showAddTripleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-bold text-lg">Add Subject-Predicate-Object Triple</h3>
            <form onSubmit={handleAddTripleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="font-bold block mb-1">Subject Entity</label>
                <input type="text" placeholder="e.g. Uttam AESA Radar" value={newSubj} onChange={e => setNewSubj(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded" required />
              </div>
              <div>
                <label className="font-bold block mb-1">Predicate Relation</label>
                <input type="text" placeholder="e.g. INTEGRATED_WITH" value={newPred} onChange={e => setNewPred(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded" required />
              </div>
              <div>
                <label className="font-bold block mb-1">Object Entity</label>
                <input type="text" placeholder="e.g. LCA Tejas Mk1A" value={newObj} onChange={e => setNewObj(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded" required />
              </div>
              <div>
                <label className="font-bold block mb-1">Confidence Score (0.0 to 1.0)</label>
                <input type="number" step="0.01" min="0" max="1" value={newConfidence} onChange={e => setNewConfidence(parseFloat(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddTripleModal(false)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 font-bold rounded">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded">Add Triple</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DOCUMENT METADATA & TAGS */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Tags className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit Document Metadata & Tags</h3>
              </div>
              <button 
                onClick={() => setEditingDoc(null)} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditDocSubmit} className="space-y-4 text-xs">
              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Document Title</label>
                  <input 
                    type="text" 
                    value={editingDoc.filename} 
                    onChange={e => setEditingDoc({ ...editingDoc, filename: e.target.value })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white" 
                    required 
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Author / Uploader</label>
                  <input 
                    type="text" 
                    value={editingDoc.author || editingDoc.uploadedBy} 
                    onChange={e => setEditingDoc({ ...editingDoc, author: e.target.value, uploadedBy: e.target.value })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white" 
                    required 
                  />
                </div>
              </div>

              {/* Keywords / Tags */}
              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Keywords & Tags (Comma Separated)</label>
                <input 
                  type="text" 
                  value={editingDoc.keywords || editingDoc.tags || ''} 
                  onChange={e => setEditingDoc({ ...editingDoc, keywords: e.target.value, tags: e.target.value })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white" 
                  placeholder="e.g. Agni-V, MIRV, Guidance, Flight Test"
                />
              </div>

              {/* Category & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Domain Category</label>
                  <select 
                    value={editingDoc.category || 'Radar & Avionics'} 
                    onChange={e => setEditingDoc({ ...editingDoc, category: e.target.value })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  >
                    <option value="Radar & Avionics">Radar & Avionics</option>
                    <option value="Strategic Missile Guidance">Strategic Missile Guidance</option>
                    <option value="Autonomous Unmanned Aerial Systems">Autonomous Unmanned Systems</option>
                    <option value="Metallurgy & Armor Materials">Metallurgy & Armor Materials</option>
                    <option value="Cyber & Electronic Warfare">Cyber & Electronic Warfare</option>
                    <option value="Naval & Submarine Systems">Naval & Submarine Systems</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Department (DRDO Lab)</label>
                  <select 
                    value={editingDoc.drdoLab} 
                    onChange={e => setEditingDoc({ ...editingDoc, drdoLab: e.target.value })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    {drdoLabs.map(lab => (
                      <option key={lab.id} value={lab.name}>{lab.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Security Clearance & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Security Clearance Level</label>
                  <select 
                    value={editingDoc.clearance} 
                    onChange={e => setEditingDoc({ ...editingDoc, clearance: e.target.value as ClearanceLevel })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-blue-600 dark:text-blue-400"
                  >
                    <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                    <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                    <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                    <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Pipeline Ingestion Status</label>
                  <select 
                    value={editingDoc.status} 
                    onChange={e => setEditingDoc({ ...editingDoc, status: e.target.value as any })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="PENDING_VERIFICATION">PENDING_VERIFICATION</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setEditingDoc(null)} 
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg cursor-pointer shadow-md shadow-teal-500/20"
                >
                  Save Metadata Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE DOCUMENT CONFIRMATION */}
      {deletingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-3 bg-rose-100 dark:bg-rose-950/80 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete Defense Document</h3>
                <p className="text-xs text-slate-500">Purge from Knowledge Base</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900 dark:text-white">{deletingDoc.filename}</strong>? This action will permanently purge the document metadata, tags, and cancel associated NLP extraction tasks.
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1 font-mono">
              <p><span className="text-slate-400">Lab:</span> {deletingDoc.drdoLab}</p>
              <p><span className="text-slate-400">Clearance:</span> {deletingDoc.clearance}</p>
              <p><span className="text-slate-400">Category:</span> {deletingDoc.category || 'N/A'}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setDeletingDoc(null)} 
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteDocConfirm} 
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg cursor-pointer shadow-md shadow-rose-500/20"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NODE */}
      {showAddNodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Knowledge Graph Entity Node</h3>
              </div>
              <button onClick={() => setShowAddNodeModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddNodeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Entity Node Label / Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Astra Mk-2 BVR Air-to-Air Missile" 
                  value={nodeLabel} 
                  onChange={e => setNodeLabel(e.target.value)} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Entity Class Type</label>
                  <select 
                    value={nodeType} 
                    onChange={e => setNodeType(e.target.value as any)} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  >
                    <option value="WeaponSystem">Weapon System</option>
                    <option value="Missile">Missile</option>
                    <option value="RadarSystem">Radar System</option>
                    <option value="Avionics">Avionics</option>
                    <option value="Laboratory">DRDO Laboratory</option>
                    <option value="Material">Material & Metallurgy</option>
                    <option value="ThreatActor">Threat Actor</option>
                    <option value="Countermeasure">Countermeasure</option>
                    <option value="Officer">Officer / Scientist</option>
                    <option value="Document">Intel Document</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">DRDO Laboratory</label>
                  <select 
                    value={nodeDrdoLab} 
                    onChange={e => setNodeDrdoLab(e.target.value)} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  >
                    {drdoLabs.map(lab => (
                      <option key={lab.id} value={lab.name}>{lab.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Security Clearance Level</label>
                <select 
                  value={nodeClearance} 
                  onChange={e => setNodeClearance(e.target.value as ClearanceLevel)} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-blue-600 dark:text-blue-400"
                >
                  <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                  <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                  <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                  <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Node Description / Domain Summary</label>
                <textarea 
                  rows={3} 
                  placeholder="Technical summary, active specifications, or research context..." 
                  value={nodeSummary} 
                  onChange={e => setNodeSummary(e.target.value)} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setShowAddNodeModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/20 cursor-pointer">Create Entity Node</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT NODE */}
      {editingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit Entity Node Metadata</h3>
              </div>
              <button onClick={() => setEditingNode(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleEditNodeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Entity Node Label</label>
                <input 
                  type="text" 
                  value={editingNode.label} 
                  onChange={e => setEditingNode({ ...editingNode, label: e.target.value })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Entity Type</label>
                  <select 
                    value={editingNode.type} 
                    onChange={e => setEditingNode({ ...editingNode, type: e.target.value as any })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  >
                    <option value="WeaponSystem">Weapon System</option>
                    <option value="Missile">Missile</option>
                    <option value="RadarSystem">Radar System</option>
                    <option value="Avionics">Avionics</option>
                    <option value="Laboratory">DRDO Laboratory</option>
                    <option value="Material">Material & Metallurgy</option>
                    <option value="ThreatActor">Threat Actor</option>
                    <option value="Countermeasure">Countermeasure</option>
                    <option value="Officer">Officer / Scientist</option>
                    <option value="Document">Intel Document</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">DRDO Laboratory</label>
                  <select 
                    value={editingNode.drdoLab} 
                    onChange={e => setEditingNode({ ...editingNode, drdoLab: e.target.value })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  >
                    {drdoLabs.map(lab => (
                      <option key={lab.id} value={lab.name}>{lab.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Security Clearance</label>
                <select 
                  value={editingNode.clearance} 
                  onChange={e => setEditingNode({ ...editingNode, clearance: e.target.value as ClearanceLevel })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-blue-600 dark:text-blue-400"
                >
                  <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                  <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                  <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                  <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Summary</label>
                <textarea 
                  rows={3} 
                  value={editingNode.summary} 
                  onChange={e => setEditingNode({ ...editingNode, summary: e.target.value })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setEditingNode(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/20 cursor-pointer">Save Node Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE NODE */}
      {deletingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-3 bg-rose-100 dark:bg-rose-950/80 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete Entity Node</h3>
                <p className="text-xs text-slate-500">Knowledge Graph Node Removal</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete entity node <strong className="text-slate-900 dark:text-white">{deletingNode.label}</strong>?
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1 font-mono">
              <p><span className="text-slate-400">Node ID:</span> {deletingNode.id}</p>
              <p><span className="text-slate-400">Type:</span> {deletingNode.type}</p>
              <p><span className="text-slate-400">Lab:</span> {deletingNode.drdoLab}</p>
              <p className="text-rose-600 dark:text-rose-400 font-bold mt-2 font-sans">⚠️ All connected relationship triples associated with this node will be purged.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeletingNode(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg cursor-pointer">Cancel</button>
              <button onClick={handleDeleteNodeConfirm} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow-md shadow-rose-500/20 cursor-pointer">Delete Node & Triples</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MERGE NODES */}
      {showMergeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <GitMerge className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Merge Duplicate Graph Entities</h3>
              </div>
              <button onClick={() => setShowMergeModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleMergeNodesSubmit} className="space-y-4 text-xs">
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Combine two duplicate entity nodes into one canonical node. All relationship triples connected to the Source Node will be automatically re-routed to the Target Node, and the Source Node will be purged.
              </p>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">1. Select Source Node (To be merged & removed)</label>
                <select 
                  value={mergeSourceId} 
                  onChange={e => setMergeSourceId(e.target.value)} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  required
                >
                  <option value="">Select source entity...</option>
                  {entities.map(e => (
                    <option key={e.id} value={e.id}>{e.label} [{e.type} - {e.drdoLab}]</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">2. Select Target Node (Canonical node to keep)</label>
                <select 
                  value={mergeTargetId} 
                  onChange={e => setMergeTargetId(e.target.value)} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  required
                >
                  <option value="">Select target entity...</option>
                  {entities.filter(e => e.id !== mergeSourceId).map(e => (
                    <option key={e.id} value={e.id}>{e.label} [{e.type} - {e.drdoLab}]</option>
                  ))}
                </select>
              </div>

              {mergeSourceId && mergeTargetId && (
                <div className="p-3 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-lg space-y-1 font-mono text-[11px]">
                  <p className="font-bold text-purple-900 dark:text-purple-200">Merge Strategy Preview:</p>
                  <p><span className="text-slate-500">Source:</span> {entities.find(e => e.id === mergeSourceId)?.label}</p>
                  <p><span className="text-slate-500">Target:</span> {entities.find(e => e.id === mergeTargetId)?.label}</p>
                  <p className="text-purple-700 dark:text-purple-300 font-sans mt-1">
                    ✓ Re-routes {triples.filter(t => t.subjectId === mergeSourceId || t.objectId === mergeSourceId || t.subjectLabel === entities.find(e => e.id === mergeSourceId)?.label || t.objectLabel === entities.find(e => e.id === mergeSourceId)?.label).length} relationship triples to target node.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setShowMergeModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" disabled={!mergeSourceId || !mergeTargetId} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-lg shadow-md shadow-purple-500/20 cursor-pointer">Execute Node Merge</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CORRECT RELATIONSHIP TRIPLE */}
      {editingTriple && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Edit3 className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Correct Relationship Triple</h3>
              </div>
              <button onClick={() => setEditingTriple(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleEditTripleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Subject Entity Label</label>
                <input 
                  type="text" 
                  value={editingTriple.subjectLabel} 
                  onChange={e => setEditingTriple({ ...editingTriple, subjectLabel: e.target.value })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-blue-600 dark:text-blue-400 font-bold" 
                  required 
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Predicate Relationship</label>
                <input 
                  type="text" 
                  value={editingTriple.predicate} 
                  onChange={e => setEditingTriple({ ...editingTriple, predicate: e.target.value })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white" 
                  required 
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Object Entity / Value</label>
                <input 
                  type="text" 
                  value={editingTriple.objectLabel} 
                  onChange={e => setEditingTriple({ ...editingTriple, objectLabel: e.target.value })} 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-teal-600 dark:text-teal-400 font-bold" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Confidence Score (0.00 - 1.00)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="1" 
                    value={editingTriple.confidence} 
                    onChange={e => setEditingTriple({ ...editingTriple, confidence: parseFloat(e.target.value) || 0 })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold" 
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Verification Status</label>
                  <select 
                    value={editingTriple.status} 
                    onChange={e => setEditingTriple({ ...editingTriple, status: e.target.value as any })} 
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="UNVERIFIED">UNVERIFIED</option>
                    <option value="FLAGGED">FLAGGED</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800 font-sans">
                <button type="button" onClick={() => setEditingTriple(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md shadow-amber-500/20 cursor-pointer">Save Relationship Correction</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE TRIPLE */}
      {deletingTriple && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-3 bg-rose-100 dark:bg-rose-950/80 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete Relationship Triple</h3>
                <p className="text-xs text-slate-500">Purge Graph Relation</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              Are you sure you want to delete triple: <br />
              <strong className="text-blue-600 dark:text-blue-400">{deletingTriple.subjectLabel}</strong> -[{deletingTriple.predicate}]-&gt; <strong className="text-teal-600 dark:text-teal-400">{deletingTriple.objectLabel}</strong>?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeletingTriple(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg cursor-pointer">Cancel</button>
              <button onClick={handleDeleteTripleConfirm} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow-md shadow-rose-500/20 cursor-pointer">Delete Relationship</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
