import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  HardDrive, 
  Cpu, 
  Activity, 
  Server, 
  Settings, 
  BellRing, 
  FileText, 
  User as UserIcon, 
  Layers, 
  RefreshCw, 
  Database, 
  Lock, 
  Plus, 
  Trash2, 
  Edit,
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Send, 
  Search, 
  Filter, 
  Zap, 
  ShieldAlert, 
  KeyRound, 
  SlidersHorizontal,
  Clock,
  Terminal,
  FileSpreadsheet,
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
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { UserRole, ClearanceLevel, User, DRDOLab } from '../../types';

// Mock Monitoring Time-series Data
const PERFORMANCE_HISTORY = [
  { time: '00:00', cpu: 22, memory: 48, qps: 180, latency: 12 },
  { time: '03:00', cpu: 18, memory: 45, qps: 120, latency: 10 },
  { time: '06:00', cpu: 35, memory: 52, qps: 340, latency: 14 },
  { time: '09:00', cpu: 68, memory: 74, qps: 890, latency: 22 },
  { time: '12:00', cpu: 82, memory: 81, qps: 1240, latency: 28 },
  { time: '15:00', cpu: 75, memory: 78, qps: 1100, latency: 24 },
  { time: '18:00', cpu: 54, memory: 65, qps: 680, latency: 18 },
  { time: '21:00', cpu: 38, memory: 58, qps: 410, latency: 15 },
];

const STORAGE_BREAKDOWN = [
  { name: 'Triple Store', value: 180, color: '#2563eb' },
  { name: 'Document Vault', value: 140, color: '#0d9488' },
  { name: 'Vector Embeddings', value: 95, color: '#8b5cf6' },
  { name: 'Audit Logs', value: 45, color: '#f59e0b' },
  { name: 'System Backups', value: 40, color: '#ec4899' },
];

const MOCK_BACKUPS = [
  { id: 'bk-109', filename: 'drdo_stratos_snapshot_20260305.tar.gz', size: '14.2 GB', date: '2026-03-05 02:00 IST', type: 'AUTOMATED', status: 'VERIFIED', checksum: 'sha256-e9f8a10d...' },
  { id: 'bk-108', filename: 'drdo_stratos_snapshot_20260304.tar.gz', size: '13.9 GB', date: '2026-03-04 02:00 IST', type: 'AUTOMATED', status: 'VERIFIED', checksum: 'sha256-d4c3b2a1...' },
  { id: 'bk-107', filename: 'manual_pre_schema_migration.tar.gz', size: '13.8 GB', date: '2026-03-03 16:45 IST', type: 'MANUAL', status: 'VERIFIED', checksum: 'sha256-a1b2c3d4...' },
  { id: 'bk-106', filename: 'drdo_stratos_snapshot_20260302.tar.gz', size: '13.5 GB', date: '2026-03-02 02:00 IST', type: 'AUTOMATED', status: 'VERIFIED', checksum: 'sha256-8f7e6d5c...' },
];

export const SuperAdminModule: React.FC<{ initialTab?: string }> = ({ initialTab = 'overview' }) => {
  const { 
    users, 
    drdoLabs, 
    auditLogs, 
    systemMetrics, 
    currentUser, 
    addUser, 
    updateUser,
    deleteUser,
    updateUserStatus, 
    updateUserRole, 
    updateUserClearance,
    addDRDOLab,
    updateDRDOLab,
    deleteDRDOLab,
    sendBroadcastNotification,
    notifications,
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

  // Search & Filter States
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [deptSearch, setDeptSearch] = useState('');

  // Modals & Form States
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [editingLab, setEditingLab] = useState<DRDOLab | null>(null);
  const [deletingLab, setDeletingLab] = useState<DRDOLab | null>(null);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showRestoreConfirmModal, setShowRestoreConfirmModal] = useState<string | null>(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'end_user' as UserRole,
    clearance: 'LEVEL_1_RESTRICTED' as ClearanceLevel,
    designation: 'Defense Research Analyst',
    department: 'STRATOS AI Wing',
    drdoLab: 'DRDL Hyderabad',
    status: 'ACTIVE' as const
  });

  // New Dept Form State
  const [newDept, setNewDept] = useState({
    code: '',
    name: '',
    location: '',
    cluster: 'Missile Systems' as DRDOLab['cluster'],
    nodeCount: 1000,
    leadDirector: '',
    activeAnalysts: 50,
    domain: '',
    headcount: 300,
    activeProjects: ''
  });

  // Broadcast Form State
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    type: 'INFO' as 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT'
  });

  // AI Config State
  const [aiConfig, setAiConfig] = useState({
    model: 'gemini-2.5-flash',
    temperature: 0.2,
    topP: 0.95,
    maxOutputTokens: 2048,
    systemPrompt: `You are the DRDO STRATOS Intelligence Assistant. Adhere to defense security classification protocols. Never disclose top secret credentials or unverified triple predicates. Provide evidence-backed citations from the DRDO Knowledge Graph.`
  });

  // RBAC Permission Toggles State
  const [rbacMatrix, setRbacMatrix] = useState<Record<string, Record<UserRole, boolean>>>({
    'View Knowledge Graph': { super_admin: true, knowledge_admin: true, end_user: true },
    'Execute AI Reasoning': { super_admin: true, knowledge_admin: true, end_user: true },
    'Ingest Defense Documents': { super_admin: true, knowledge_admin: true, end_user: false },
    'Verify Knowledge Triples': { super_admin: true, knowledge_admin: true, end_user: false },
    'Alter Ontology Schema': { super_admin: true, knowledge_admin: true, end_user: false },
    'Manage User Accounts': { super_admin: true, knowledge_admin: false, end_user: false },
    'Elevate Security Clearance': { super_admin: true, knowledge_admin: false, end_user: false },
    'Execute Database Restores': { super_admin: true, knowledge_admin: false, end_user: false },
    'Publish Broadcast Alerts': { super_admin: true, knowledge_admin: false, end_user: false },
    'Access CSOC Audit Stream': { super_admin: true, knowledge_admin: false, end_user: false }
  });

  // System Settings State
  const [sysSettings, setSysSettings] = useState({
    maintenanceMode: false,
    enforceMfa: true,
    sessionTimeoutMins: 30,
    defaultClearance: 'LEVEL_1_RESTRICTED',
    ipWhitelist: '10.240.0.0/16, 172.16.42.0/24',
    alertThresholdQps: 1500
  });

  // Backups List
  const [backupsList, setBackupsList] = useState(MOCK_BACKUPS);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Handlers
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    addUser(newUser);
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'end_user',
      clearance: 'LEVEL_1_RESTRICTED',
      designation: 'Defense Research Analyst',
      department: 'STRATOS AI Wing',
      drdoLab: 'DRDL Hyderabad',
      status: 'ACTIVE'
    });
  };

  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        clearance: editingUser.clearance,
        designation: editingUser.designation,
        department: editingUser.department,
        drdoLab: editingUser.drdoLab,
        status: editingUser.status
      });
      setEditingUser(null);
    }
  };

  const handleDeleteUserConfirm = () => {
    if (deletingUser) {
      deleteUser(deletingUser.id);
      setDeletingUser(null);
    }
  };

  const handleAddDeptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code) return;
    addDRDOLab({
      ...newDept,
      activeProjects: newDept.activeProjects ? newDept.activeProjects.split(',').map(p => p.trim()) : ['Strategic Project']
    });
    setShowAddDeptModal(false);
    setNewDept({
      code: '',
      name: '',
      location: '',
      cluster: 'Missile Systems',
      nodeCount: 1000,
      leadDirector: '',
      activeAnalysts: 50,
      domain: '',
      headcount: 300,
      activeProjects: ''
    });
  };

  const handleEditDeptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLab) {
      updateDRDOLab(editingLab.id, {
        name: editingLab.name,
        code: editingLab.code,
        location: editingLab.location,
        cluster: editingLab.cluster,
        leadDirector: editingLab.leadDirector,
        headcount: Number(editingLab.headcount),
        domain: editingLab.domain,
        activeProjects: Array.isArray(editingLab.activeProjects) 
          ? editingLab.activeProjects 
          : typeof editingLab.activeProjects === 'string'
            ? (editingLab.activeProjects as string).split(',').map(p => p.trim())
            : ['Strategic Project']
      });
      setEditingLab(null);
    }
  };

  const handleDeleteDeptConfirm = () => {
    if (deletingLab) {
      deleteDRDOLab(deletingLab.id);
      setDeletingLab(null);
    }
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) return;
    sendBroadcastNotification(broadcastForm.title, broadcastForm.message, broadcastForm.type);
    setShowBroadcastModal(false);
    setBroadcastForm({ title: '', message: '', type: 'INFO' });
  };

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    addAuditLog('DATABASE_BACKUP_INITIATED', 'Graph Triple Store', 'Triggered manual snapshot generation');
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().replace(/[-T:]/g, '').slice(0, 8);
      const newBk = {
        id: `bk-${Date.now()}`,
        filename: `manual_snapshot_${dateStr}_${Math.floor(Math.random()*1000)}.tar.gz`,
        size: '14.5 GB',
        date: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)} IST`,
        type: 'MANUAL',
        status: 'VERIFIED',
        checksum: `sha256-${Math.random().toString(36).substring(2, 10)}...`
      };
      setBackupsList(prev => [newBk, ...prev]);
      setIsBackingUp(false);
      addAuditLog('DATABASE_BACKUP_COMPLETED', `File: ${newBk.filename}`, 'Triple store graph snapshot verified & written');
    }, 1500);
  };

  const handleRestoreBackup = (bkId: string) => {
    setShowRestoreConfirmModal(null);
    addAuditLog('DATABASE_RESTORE_INITIATED', `Backup ID: ${bkId}`, 'Restoring triple store state from snapshot', 'WARNING');
    sendBroadcastNotification('System State Restoration', `Restored graph database state from backup ${bkId}`, 'SUCCESS');
  };

  const toggleRbacPermission = (perm: string, role: UserRole) => {
    setRbacMatrix(prev => ({
      ...prev,
      [perm]: {
        ...prev[perm],
        [role]: !prev[perm][role]
      }
    }));
    addAuditLog('RBAC_PERMISSION_TOGGLED', `Permission: ${perm} [${role.toUpperCase()}]`, 'Updated security permission policy', 'WARNING');
  };

  // Filtered lists
  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.drdoLab.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const filteredDepts = drdoLabs.filter(d => 
    d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.code.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.cluster.toLowerCase().includes(deptSearch.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <ShieldCheck className="w-4 h-4" /> SUPER ADMIN CONTROL PLANE
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            System Administration & Governance
          </h1>

        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowBroadcastModal(true)}
            className="px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition cursor-pointer shadow-sm"
          >
            <BellRing className="w-4 h-4" /> Broadcast Alert
          </button>
          <button 
            onClick={handleTriggerBackup}
            disabled={isBackingUp}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isBackingUp ? 'animate-spin' : ''}`} /> 
            {isBackingUp ? 'Snapshotting...' : 'Backup Graph Now'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 scrollbar-none shadow-inner">
        {[
          { id: 'overview', label: 'Command Overview', icon: Activity },
          { id: 'users', label: 'Manage Users', icon: Users, count: users.length },
          { id: 'departments', label: 'Departments & Labs', icon: Building2, count: drdoLabs.length },
          { id: 'rbac', label: 'Role & Permissions', icon: Layers },
          { id: 'ai_config', label: 'AI Configuration', icon: Cpu },
          { id: 'backups', label: 'Database Backup', icon: HardDrive },
          { id: 'monitoring', label: 'System Monitoring', icon: Server },
          { id: 'audit', label: 'Audit Logs', icon: ShieldAlert },
          { id: 'notifications', label: 'Notifications', icon: BellRing, count: notifications.length },
          { id: 'settings', label: 'System Settings', icon: Settings },
          { id: 'profile', label: 'Admin Profile', icon: UserIcon }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-blue-700/80 text-white' : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {tab.count}
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
          {/* Top 8 Dashboard Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Widget 1: Total Users */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total System Users</span>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{users.length}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {users.filter(u => u.status === 'ACTIVE').length} Active | {users.filter(u => u.role === 'super_admin').length} Admins
              </p>
            </div>

            {/* Widget 2: Total Departments */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">DRDO Labs & Depts</span>
                <Building2 className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{drdoLabs.length}</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">6 Clusters</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {drdoLabs.reduce((acc, l) => acc + (l.headcount || 0), 0)} Total Scientists
              </p>
            </div>

            {/* Widget 3: Storage Usage */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Storage Usage</span>
                <HardDrive className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{systemMetrics.storageUsageGB} GB</span>
                <span className="text-xs text-slate-500 font-mono">of 500 GB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full" 
                  style={{ width: `${(systemMetrics.storageUsageGB / 500) * 100}%` }}
                />
              </div>
            </div>

            {/* Widget 4: System Health */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">System Health</span>
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">OPTIMAL</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">14ms Latency</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Uptime: 99.99% | CSOC Level 4
              </p>
            </div>

            {/* Widget 5: CPU Usage */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CPU Load</span>
                <Cpu className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{systemMetrics.cpuUsage}%</span>
                <span className="text-xs font-mono text-slate-400">16 Cores</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full" 
                  style={{ width: `${systemMetrics.cpuUsage}%` }}
                />
              </div>
            </div>

            {/* Widget 6: Memory Usage */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Memory Load</span>
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{systemMetrics.memoryUsage}%</span>
                <span className="text-xs font-mono text-slate-400">64 GB RAM</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full" 
                  style={{ width: `${systemMetrics.memoryUsage}%` }}
                />
              </div>
            </div>

            {/* Widget 7: Database Status */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Triple Store DB</span>
                <Database className="w-5 h-5 text-teal-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{systemMetrics.totalTriplesInStore.toLocaleString()}</span>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">ONLINE</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {systemMetrics.totalOntologyNodes.toLocaleString()} Graph Nodes Indexed
              </p>
            </div>

            {/* Widget 8: Queries / min */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Query Throughput</span>
                <Server className="w-5 h-5 text-sky-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{systemMetrics.queriesPerMinute}</span>
                <span className="text-xs font-mono text-slate-400">QPM</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {systemMetrics.activeSessions} Active Security Sessions
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live System Performance Chart */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">System Resource Utilization (24h)</h3>
                  <p className="text-xs text-slate-500">CPU %, Memory % and Query Rate metrics</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-500 inline-block" /> CPU
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-500 inline-block" /> Memory
                  </span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_HISTORY}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="cpu" stroke="#2563eb" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                    <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMem)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Storage Distribution Pie */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base">Storage Breakdown</h3>
                <p className="text-xs text-slate-500">Storage allocation across vault & triple graph</p>
              </div>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={STORAGE_BREAKDOWN}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {STORAGE_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 font-mono text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                {STORAGE_BREAKDOWN.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-bold">{item.value} GB</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Audit Activities Table */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">CSOC Governance Audit Stream</h3>
                <p className="text-xs text-slate-500">Real-time security logs and user access events</p>
              </div>
              <button 
                onClick={() => setActiveTab('audit')}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                View All Logs →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-y border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">User & IP</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Resource Target</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {auditLogs.slice(0, 5).map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3 font-semibold">{log.user} <span className="text-[10px] text-slate-400 font-normal">({log.ipAddress})</span></td>
                      <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">{log.action}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300 truncate max-w-xs">{log.resource}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          log.status === 'SUCCESS' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                          log.status === 'WARNING' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                          'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
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
        </div>
      )}

      {/* SECTION 2: MANAGE USERS */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">User Management & RBAC Provisioning</h2>
              <p className="text-xs text-slate-500">Manage user accounts, security clearances, and system privileges.</p>
            </div>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Provision New User
            </button>
          </div>

          {/* Search & Role Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search user by name, email, or lab..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select 
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-2 font-mono"
              >
                <option value="ALL">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="knowledge_admin">Knowledge Admin</option>
                <option value="end_user">End User</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Clearance Level</th>
                  <th className="p-4">DRDO Lab</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <select 
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                        className="bg-slate-100 dark:bg-slate-800 font-mono text-[11px] px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-semibold cursor-pointer"
                      >
                        <option value="super_admin">super_admin</option>
                        <option value="knowledge_admin">knowledge_admin</option>
                        <option value="end_user">end_user</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select 
                        value={user.clearance}
                        onChange={(e) => updateUserClearance(user.id, e.target.value as ClearanceLevel)}
                        className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-[10px] px-2 py-1 rounded border border-blue-200 dark:border-blue-800 font-bold cursor-pointer"
                      >
                        <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                        <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                        <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                        <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                      </select>
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-300">{user.drdoLab}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        user.status === 'ACTIVE' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                        'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => setEditingUser(user)}
                          title="Edit User Details"
                          className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition border border-slate-200 dark:border-slate-700"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => updateUserStatus(user.id, user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                          title={user.status === 'ACTIVE' ? 'Suspend User' : 'Activate User'}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition ${
                            user.status === 'ACTIVE' 
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300' 
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}
                        >
                          {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => setDeletingUser(user)}
                          title="Delete User Account"
                          className="px-2.5 py-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition border border-rose-200 dark:border-rose-900/50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: MANAGE DEPARTMENTS */}
      {activeTab === 'departments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">DRDO Laboratories & Research Departments</h2>
              <p className="text-xs text-slate-500">Configure research clusters, lead directors, scientist headcounts, and active projects.</p>
            </div>
            <button 
              onClick={() => setShowAddDeptModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Register DRDO Lab
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search DRDO Lab by name, code, or cluster..."
              value={deptSearch}
              onChange={e => setDeptSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepts.map(lab => (
              <div key={lab.id} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                      {lab.code}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">{lab.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{lab.location}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                    {lab.cluster}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Director:</span>
                    <span className="font-bold">{lab.leadDirector}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Headcount:</span>
                    <span className="font-mono font-bold">{lab.headcount || 200} Scientists</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Ontology Nodes:</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{lab.nodeCount}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1.5">Active Research Projects</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lab.activeProjects || ['Defense Project']).map(p => (
                      <span key={p} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setEditingLab(lab)}
                    title="Edit DRDO Lab details"
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs flex items-center gap-1 cursor-pointer transition border border-slate-200 dark:border-slate-700"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => setDeletingLab(lab)}
                    title="Delete DRDO Lab"
                    className="px-2.5 py-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition border border-rose-200 dark:border-rose-900/50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: ROLE & PERMISSION MANAGEMENT (RBAC) */}
      {activeTab === 'rbac' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Role-Based Access Control (RBAC) Matrix</h2>
            <p className="text-xs text-slate-500">Fine-grained security permissions matrix across system user roles.</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">System Capability / Permission</th>
                  <th className="p-4 text-center">Super Admin</th>
                  <th className="p-4 text-center">Knowledge Admin</th>
                  <th className="p-4 text-center">End User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {Object.entries(rbacMatrix).map(([capability, roles]) => (
                  <tr key={capability} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{capability}</td>
                    {(['super_admin', 'knowledge_admin', 'end_user'] as UserRole[]).map(r => (
                      <td key={r} className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={roles[r]}
                          onChange={() => toggleRbacPermission(capability, r)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: AI CONFIGURATION */}
      {activeTab === 'ai_config' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold">Gemini AI Engine Configuration</h2>
            <p className="text-xs text-slate-500">Tune model parameters, API key status, temperature, and global system prompt.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <Cpu className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-bold text-sm">Gemini SDK API Key Status</h4>
                  <p className="text-xs text-slate-400 font-mono">Server-side process.env.GEMINI_API_KEY</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE & CONNECTED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Selected Gemini Model</label>
                <select 
                  value={aiConfig.model}
                  onChange={e => setAiConfig({ ...aiConfig, model: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Fast Reasoning)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (High Precision Intelligence)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Max Token Limit: {aiConfig.maxOutputTokens}</label>
                <input 
                  type="range" 
                  min="512" 
                  max="8192" 
                  step="256"
                  value={aiConfig.maxOutputTokens}
                  onChange={e => setAiConfig({ ...aiConfig, maxOutputTokens: parseInt(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Temperature: {aiConfig.temperature}</label>
                <input 
                  type="range" 
                  min="0.0" 
                  max="1.0" 
                  step="0.05"
                  value={aiConfig.temperature}
                  onChange={e => setAiConfig({ ...aiConfig, temperature: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Top P: {aiConfig.topP}</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.05"
                  value={aiConfig.topP}
                  onChange={e => setAiConfig({ ...aiConfig, topP: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Global System Prompt Template</label>
              <textarea 
                rows={4}
                value={aiConfig.systemPrompt}
                onChange={e => setAiConfig({ ...aiConfig, systemPrompt: e.target.value })}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <button 
              onClick={() => addAuditLog('AI_CONFIG_SAVED', 'Gemini Model Parameters', 'Updated model temperature and prompt rules')}
              className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Save AI Configuration
            </button>
          </div>
        </div>
      )}

      {/* SECTION 6: DATABASE BACKUP & RESTORE */}
      {activeTab === 'backups' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Graph Database Backup & Restore</h2>
              <p className="text-xs text-slate-500">Automated snapshot schedules, checksum verifications, and instant graph restores.</p>
            </div>
            <button 
              onClick={handleTriggerBackup}
              disabled={isBackingUp}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isBackingUp ? 'animate-spin' : ''}`} /> Trigger Instant Backup
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Backup Filename</th>
                  <th className="p-4">File Size</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">SHA-256 Checksum</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {backupsList.map(bk => (
                  <tr key={bk.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-blue-600 dark:text-blue-400">{bk.filename}</td>
                    <td className="p-4">{bk.size}</td>
                    <td className="p-4 text-slate-400">{bk.date}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        {bk.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-[10px]">{bk.checksum}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => setShowRestoreConfirmModal(bk.id)}
                        className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] cursor-pointer"
                      >
                        Restore State
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 7: SYSTEM MONITORING */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Real-time Infrastructure Monitoring</h2>
            <p className="text-xs text-slate-500">Node cluster performance, API latencies, memory pressure, and network IO.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm">Query Rate (QPS) over Time</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PERFORMANCE_HISTORY}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="qps" stroke="#0284c7" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm">API Latency (ms)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_HISTORY}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="latency" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">CSOC Audit Stream & Threat Monitoring</h2>
              <p className="text-xs text-slate-500">Complete immutable record of system security mutations and data accesses.</p>
            </div>
            <button 
              onClick={() => alert('Exporting CSOC Audit Stream to CSV...')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export CSV Log
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">ID & Timestamp</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Resource Target</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 text-slate-400">{log.id} <br/><span className="text-[10px]">{log.timestamp}</span></td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{log.user}</td>
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">{log.action}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{log.resource}</td>
                    <td className="p-4 text-slate-400">{log.ipAddress}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.status === 'SUCCESS' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                        log.status === 'WARNING' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                        'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
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
      )}

      {/* SECTION 9: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Broadcast Notifications & System Alerts</h2>
              <p className="text-xs text-slate-500">Publish urgent broadcast messages to active defense sessions.</p>
            </div>
            <button 
              onClick={() => setShowBroadcastModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" /> Create Broadcast Alert
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    n.type === 'ALERT' ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' :
                    n.type === 'WARNING' ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                    'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  }`}>
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{n.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                    <span className="text-[10px] font-mono text-slate-400 mt-2 block">{n.timestamp}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {n.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 10: SYSTEM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold">Global System Settings</h2>
            <p className="text-xs text-slate-500">Configure global security parameters, maintenance mode, and IP whitelists.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            {/* Interface Theme Settings */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">System Interface Theme & Appearance</label>
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

            <div className="flex items-center justify-between p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
              <div>
                <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200">System Maintenance Mode</h4>
                <p className="text-xs text-rose-700 dark:text-rose-300">Blocks non-admin users from accessing graph query endpoints during schema updates.</p>
              </div>
              <input 
                type="checkbox" 
                checked={sysSettings.maintenanceMode}
                onChange={e => setSysSettings({ ...sysSettings, maintenanceMode: e.target.checked })}
                className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold">Session Timeout (Minutes)</label>
                <input 
                  type="number"
                  value={sysSettings.sessionTimeoutMins}
                  onChange={e => setSysSettings({ ...sysSettings, sessionTimeoutMins: parseInt(e.target.value) || 30 })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold">Default User Clearance</label>
                <select 
                  value={sysSettings.defaultClearance}
                  onChange={e => setSysSettings({ ...sysSettings, defaultClearance: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                >
                  <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                  <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                  <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">CSOC IP Subnet Whitelist</label>
              <input 
                type="text"
                value={sysSettings.ipWhitelist}
                onChange={e => setSysSettings({ ...sysSettings, ipWhitelist: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <button 
              onClick={() => addAuditLog('SYSTEM_SETTINGS_SAVED', 'Global Security Config', 'Saved timeout & subnet whitelist rules')}
              className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Save System Settings
            </button>
          </div>
        </div>
      )}

      {/* SECTION 11: ADMIN PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h2 className="text-xl font-bold">Super Admin Profile & Security Credentials</h2>
            <p className="text-xs text-slate-500">Master operator identity, clearance status, and cryptographic key keys.</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-600" />
              <div>
                <h3 className="font-extrabold text-lg">{currentUser.name}</h3>
                <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">{currentUser.designation}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{currentUser.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Security Clearance:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{currentUser.clearance}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Assigned DRDO Lab:</span>
                <span className="font-bold">{currentUser.drdoLab}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">2-Factor Authentication:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">ENABLED (Hardware Key)</span>
              </div>
            </div>
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>

      {/* MODAL: PROVISION NEW USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base">Provision New System User</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Full Name</label>
                <input 
                  type="text" required 
                  value={newUser.name} 
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Dr. Rajesh Kumar"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">DRDO Email Address</label>
                <input 
                  type="email" required 
                  value={newUser.email} 
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="rajesh.kumar@drdo.in"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Assigned Role</label>
                  <select 
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg font-mono font-bold"
                  >
                    <option value="end_user">end_user</option>
                    <option value="knowledge_admin">knowledge_admin</option>
                    <option value="super_admin">super_admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Clearance Level</label>
                  <select 
                    value={newUser.clearance}
                    onChange={e => setNewUser({ ...newUser, clearance: e.target.value as ClearanceLevel })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg font-mono font-bold"
                  >
                    <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                    <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                    <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                    <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit User Profile & Permissions</h3>
              </div>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
                <input 
                  type="text" required 
                  value={editingUser.name} 
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">DRDO Email Address</label>
                <input 
                  type="email" required 
                  value={editingUser.email} 
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Assigned Role</label>
                  <select 
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="end_user">end_user</option>
                    <option value="knowledge_admin">knowledge_admin</option>
                    <option value="super_admin">super_admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Clearance Level</label>
                  <select 
                    value={editingUser.clearance}
                    onChange={e => setEditingUser({ ...editingUser, clearance: e.target.value as ClearanceLevel })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                    <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                    <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                    <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">DRDO Laboratory</label>
                  <select 
                    value={editingUser.drdoLab}
                    onChange={e => setEditingUser({ ...editingUser, drdoLab: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                  >
                    {drdoLabs.map(lab => (
                      <option key={lab.id} value={lab.name}>{lab.name} ({lab.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Account Status</label>
                  <select 
                    value={editingUser.status}
                    onChange={e => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                    <option value="PENDING_VERIFICATION">PENDING_VERIFICATION</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Designation</label>
                  <input 
                    type="text" 
                    value={editingUser.designation} 
                    onChange={e => setEditingUser({ ...editingUser, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Department</label>
                  <input 
                    type="text" 
                    value={editingUser.department} 
                    onChange={e => setEditingUser({ ...editingUser, department: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE USER CONFIRMATION */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-2.5 rounded-full bg-rose-100 dark:bg-rose-950/80">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete User Account</h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Irreversible Administrative Action</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs font-mono">
              <p className="text-slate-900 dark:text-white font-bold">{deletingUser.name}</p>
              <p className="text-slate-500">{deletingUser.email}</p>
              <p className="text-slate-400">{deletingUser.drdoLab} • {deletingUser.role}</p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to purge <strong>{deletingUser.name}</strong> from the STRATOS system? Their active sessions will be terminated and clearance revoked immediately.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={() => setDeletingUser(null)} 
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleDeleteUserConfirm} 
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Delete User</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD DRDO LAB */}
      {showAddDeptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base">Register DRDO Lab / Department</h3>
              <button onClick={() => setShowAddDeptModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddDeptSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Lab Code</label>
                  <input 
                    type="text" required 
                    value={newDept.code} 
                    onChange={e => setNewDept({ ...newDept, code: e.target.value })}
                    placeholder="ADE"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Cluster</label>
                  <select 
                    value={newDept.cluster}
                    onChange={e => setNewDept({ ...newDept, cluster: e.target.value as DRDOLab['cluster'] })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    <option value="Aeronautical">Aeronautical</option>
                    <option value="Armaments & Combat">Armaments & Combat</option>
                    <option value="Electronics & Radar">Electronics & Radar</option>
                    <option value="Missile Systems">Missile Systems</option>
                    <option value="Naval Systems">Naval Systems</option>
                    <option value="Materials & Life Sciences">Materials & Life Sciences</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Full Laboratory Name</label>
                <input 
                  type="text" required 
                  value={newDept.name} 
                  onChange={e => setNewDept({ ...newDept, name: e.target.value })}
                  placeholder="Aeronautical Development Establishment"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Location</label>
                  <input 
                    type="text" required 
                    value={newDept.location} 
                    onChange={e => setNewDept({ ...newDept, location: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Lead Director</label>
                  <input 
                    type="text" required 
                    value={newDept.leadDirector} 
                    onChange={e => setNewDept({ ...newDept, leadDirector: e.target.value })}
                    placeholder="Dr. Y. Dilip"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Active Projects (comma separated)</label>
                <input 
                  type="text" 
                  value={newDept.activeProjects} 
                  onChange={e => setNewDept({ ...newDept, activeProjects: e.target.value })}
                  placeholder="Tapas BH-201, Ghatak UCAV"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddDeptModal(false)} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">Register Lab</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DRDO LAB */}
      {editingLab && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit DRDO Laboratory</h3>
              </div>
              <button onClick={() => setEditingLab(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleEditDeptSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Lab Code</label>
                  <input 
                    type="text" required 
                    value={editingLab.code} 
                    onChange={e => setEditingLab({ ...editingLab, code: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Research Cluster</label>
                  <select 
                    value={editingLab.cluster}
                    onChange={e => setEditingLab({ ...editingLab, cluster: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Aeronautical">Aeronautical</option>
                    <option value="Armaments & Combat">Armaments & Combat</option>
                    <option value="Electronics & Radar">Electronics & Radar</option>
                    <option value="Missile Systems">Missile Systems</option>
                    <option value="Naval Systems">Naval Systems</option>
                    <option value="Materials & Life Sciences">Materials & Life Sciences</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Full Laboratory Name</label>
                <input 
                  type="text" required 
                  value={editingLab.name} 
                  onChange={e => setEditingLab({ ...editingLab, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Location</label>
                  <input 
                    type="text" required 
                    value={editingLab.location} 
                    onChange={e => setEditingLab({ ...editingLab, location: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Lead Director</label>
                  <input 
                    type="text" required 
                    value={editingLab.leadDirector} 
                    onChange={e => setEditingLab({ ...editingLab, leadDirector: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Scientist Headcount</label>
                  <input 
                    type="number" required 
                    value={editingLab.headcount || 200} 
                    onChange={e => setEditingLab({ ...editingLab, headcount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Domain / Focus Area</label>
                  <input 
                    type="text" 
                    value={editingLab.domain || ''} 
                    onChange={e => setEditingLab({ ...editingLab, domain: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Active Projects (comma separated)</label>
                <input 
                  type="text" 
                  value={Array.isArray(editingLab.activeProjects) ? editingLab.activeProjects.join(', ') : (editingLab.activeProjects || '')} 
                  onChange={e => setEditingLab({ ...editingLab, activeProjects: e.target.value.split(',').map(p => p.trim()) })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingLab(null)} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-sm">Save Lab Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE DRDO LAB CONFIRMATION */}
      {deletingLab && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-2.5 rounded-full bg-rose-100 dark:bg-rose-950/80">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete DRDO Laboratory</h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Irreversible Administrative Action</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs font-mono">
              <p className="text-slate-900 dark:text-white font-bold">{deletingLab.name} [{deletingLab.code}]</p>
              <p className="text-slate-500">{deletingLab.location} • {deletingLab.cluster}</p>
              <p className="text-slate-400">Director: {deletingLab.leadDirector}</p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to remove <strong>{deletingLab.name}</strong> from the STRATOS directory? This lab registration will be revoked across all system modules.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={() => setDeletingLab(null)} 
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleDeleteDeptConfirm} 
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Delete Lab</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BROADCAST NOTIFICATION */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base">Broadcast System Notification</h3>
              <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Alert Category</label>
                <select 
                  value={broadcastForm.type}
                  onChange={e => setBroadcastForm({ ...broadcastForm, type: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg font-mono font-bold"
                >
                  <option value="INFO">INFO</option>
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="WARNING">WARNING</option>
                  <option value="ALERT">ALERT</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Notification Title</label>
                <input 
                  type="text" required 
                  value={broadcastForm.title} 
                  onChange={e => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  placeholder="System Maintenance Window Scheduled"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Broadcast Message Body</label>
                <textarea 
                  rows={3} required 
                  value={broadcastForm.message} 
                  onChange={e => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  placeholder="DRDO Knowledge Graph schema migration scheduled at 02:00 IST."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowBroadcastModal(false)} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">Publish Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM RESTORE BACKUP */}
      {showRestoreConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base">Confirm Database Restoration</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Restoring snapshot <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{showRestoreConfirmModal}</span> will override current graph state. Are you sure?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowRestoreConfirmModal(null)} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-xs cursor-pointer">Cancel</button>
              <button onClick={() => handleRestoreBackup(showRestoreConfirmModal)} className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs cursor-pointer">Confirm Restore</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
