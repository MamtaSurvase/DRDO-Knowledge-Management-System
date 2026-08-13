import React from 'react';
import { useApp } from '../../context/AppContext';
import { DRDOLogo } from './DRDOLogo';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Network, 
  Database, 
  GitBranch, 
  FileSearch, 
  BrainCircuit, 
  BookOpen, 
  Search, 
  FileText, 
  Layers, 
  Shield,
  Building2,
  Cpu,
  HardDrive,
  Activity,
  BellRing,
  Settings,
  User as UserIcon,
  Server,
  UploadCloud,
  Tags,
  Bookmark,
  BarChart3,
  LogOut
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { currentUser, activePage, setActivePage, logout } = useApp();

  const getMenuForRole = (role: UserRole): { category: string; items: NavItem[] }[] => {
    switch (role) {
      case 'super_admin':
        return [
          {
            category: 'SUPER ADMIN MODULE',
            items: [
              { id: 'super_admin', label: 'Admin Command Hub', icon: ShieldCheck, badge: 'Master' },
              { id: 'user_management', label: 'Manage Users', icon: Users, badge: 'Users' },
              { id: 'departments', label: 'Departments & Labs', icon: Building2 },
              { id: 'rbac_matrix', label: 'Role & Permissions', icon: Layers },
            ]
          },
          {
            category: 'SYSTEM INFRASTRUCTURE',
            items: [
              { id: 'system_monitoring', label: 'System Monitoring', icon: Activity, badge: '99.99%' },
              { id: 'ai_config', label: 'AI Configuration', icon: Cpu, badge: 'Gemini' },
              { id: 'backup_restore', label: 'Backup & Restore', icon: HardDrive },
              { id: 'audit_logs', label: 'Audit Logs & CSOC', icon: Server, badge: 'Live' }
            ]
          },
          {
            category: 'GOVERNANCE & NOTIFICATIONS',
            items: [
              { id: 'reports_analytics', label: 'System Reports', icon: FileText },
              { id: 'notifications_broadcast', label: 'Notifications & Alerts', icon: BellRing },
              { id: 'system_settings', label: 'System Settings', icon: Settings },
              { id: 'admin_profile', label: 'Admin Profile', icon: UserIcon }
            ]
          }
        ];

      case 'knowledge_admin':
        return [
          {
            category: 'KNOWLEDGE CURATION HUB',
            items: [
              { id: 'knowledge_admin', label: 'Curation Command Hub', icon: ShieldCheck, badge: 'Master' },
              { id: 'upload_documents', label: 'Upload Documents', icon: UploadCloud, badge: 'Ingest' },
              { id: 'manage_documents', label: 'Manage Documents', icon: FileText, badge: 'Queue' },
              { id: 'doc_categorization', label: 'Metadata & Tags', icon: Tags }
            ]
          },
          {
            category: 'ONTOLOGY & GRAPH',
            items: [
              { id: 'ontology_management', label: 'Ontology Management', icon: GitBranch, badge: 'Schema' },
              { id: 'knowledge_graph_mgt', label: 'Knowledge Graph', icon: Database, badge: 'Triples' },
              { id: 'ai_processing', label: 'AI Extraction Monitor', icon: Cpu, badge: 'Gemini' }
            ]
          },
          {
            category: 'REPORTS & SETTINGS',
            items: [
              { id: 'ka_reports', label: 'Curation Reports', icon: BookOpen },
              { id: 'ka_notifications', label: 'Ingestion Alerts', icon: BellRing },
              { id: 'ka_settings', label: 'Pipeline Settings', icon: Settings },
              { id: 'ka_profile', label: 'Admin Profile', icon: UserIcon }
            ]
          }
        ];

      case 'end_user':
      default:
        return [
          {
            category: 'RESEARCH WORKBENCH',
            items: [
              { id: 'dashboard', label: 'Intelligence Hub', icon: LayoutDashboard },
              { id: 'eu_ai_assistant', label: 'AI Assistant', icon: BrainCircuit, badge: 'Gemini' },
              { id: 'eu_search', label: 'Search Knowledge', icon: Search },
              { id: 'eu_library', label: 'Document Library', icon: FileText }
            ]
          },
          {
            category: 'KNOWLEDGE GRAPH',
            items: [
              { id: 'eu_bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
              { id: 'eu_graph', label: 'Knowledge Graph', icon: Network },
              { id: 'eu_ontology', label: 'Ontology Explorer', icon: Database }
            ]
          },
          {
            category: 'ANALYTICS & PREFERENCES',
            items: [
              { id: 'eu_analytics', label: 'Research Analytics', icon: BarChart3 },
              { id: 'eu_reports', label: 'Reports & Digests', icon: BookOpen },
              { id: 'eu_notifications', label: 'Alerts', icon: BellRing },
              { id: 'eu_profile', label: 'My Profile', icon: UserIcon },
              { id: 'eu_settings', label: 'Preferences', icon: Settings }
            ]
          }
        ];
    }
  };

  const menu = getMenuForRole(currentUser.role);

  return (
    <aside className="w-64 bg-slate-900 flex flex-col shrink-0 h-full border-r border-slate-800 text-slate-100 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 bg-[#070C15]">
        <div className="flex items-start space-x-3">
          <DRDOLogo size="md" className="w-10 h-10 shrink-0 shadow-md ring-2 ring-blue-600/40 rounded-full bg-white p-0.5 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xs font-black tracking-tight text-white leading-snug">
              DRDO Ontology Driven
              <span className="block text-blue-400 font-bold">AI Knowledge Management System</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 sm:p-4 space-y-5 overflow-y-auto scrollbar-none">
        {menu.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">
              {group.category}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer User Card */}
      <div className="p-4 border-t border-slate-800 bg-[#070C15]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full bg-slate-700 object-cover border border-slate-700 shrink-0"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 capitalize truncate flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-400 shrink-0" />
                {currentUser.role.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out / Lock Session"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
