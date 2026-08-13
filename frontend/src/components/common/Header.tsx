import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClearanceBadge } from './ClearanceBadge';
import { DRDOLogo } from './DRDOLogo';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  UserCheck, 
  ChevronDown, 
  Command,
  CheckCircle2,
  Layers,
  Shield
} from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const { 
    currentUser, 
    switchRole, 
    theme, 
    toggleTheme, 
    setCommandPaletteOpen,
    notifications,
    activePage
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { title: string; desc: string }> = {
    super_admin: {
      title: 'Super Admin',
      desc: 'Security, Audit Logs & Access Control'
    },
    knowledge_admin: {
      title: 'Knowledge Admin',
      desc: 'Ontology Curator & Triple Pipeline'
    },
    end_user: {
      title: 'End User Officer',
      desc: 'Defense Intelligence Analyst'
    }
  };

  const getBreadcrumb = () => {
    switch (activePage) {
      case 'dashboard': return 'Administrative Overview';
      case 'user_management': return 'User Access (RBAC)';
      case 'audit_logs': return 'Security Audit Logs';
      case 'knowledge_explorer': return 'Ontology Explorer';
      case 'ontology_builder': return 'Schema Control';
      case 'ingestion_pipeline': return 'Ingestion Pipeline';
      case 'triple_store': return 'Triple Store Workbench';
      case 'ai_assistant': return 'AI Reasoning Engine';
      case 'semantic_search': return 'Semantic Search';
      case 'reports_generator': return 'Knowledge Repository';
      case 'defense_taxonomy': return 'DRDO Defense Directory';
      default: return 'Global View';
    }
  };

  return (
    <header className="h-16 bg-[#0B1220] border-b border-[#1E293B] text-white px-4 lg:px-8 shrink-0 z-30 transition-colors shadow-lg flex items-center">
      <div className="max-w-[1800px] w-full mx-auto flex items-center justify-between gap-4 min-w-0">
        
        {/* Left Branding & Section Breadcrumb */}
        <div className="flex items-center space-x-3 shrink-0">
          <DRDOLogo size="md" className="w-8 h-8 shrink-0 shadow-md ring-1 ring-[#2563EB]/40 rounded-full bg-white p-0.5" />
          <nav className="flex items-center text-xs font-semibold text-slate-400 space-x-2">
            <span className="font-bold text-slate-200 tracking-wide">DRDO KM</span>
            <span className="text-slate-600">/</span>
            <span className="text-sm font-bold text-blue-400 tracking-tight">{getBreadcrumb()}</span>
          </nav>
        </div>

        {/* Right Controls Area */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 shrink-0">
          
          {/* Search Trigger Input Box */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="relative flex items-center group cursor-pointer"
          >
            <div className="w-48 sm:w-64 md:w-72 bg-[#111A2E] hover:bg-[#16223B] text-slate-300 text-xs rounded-xl py-2 px-3.5 flex items-center justify-between border border-[#1E293B] group-hover:border-[#2563EB]/50 transition-all shadow-inner">
              <span className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="truncate text-slate-400 group-hover:text-slate-200">
                  Search documents, ontology, knowledge graph...
                </span>
              </span>
              <kbd className="hidden sm:inline-flex text-[9px] font-mono bg-[#0B1220] border border-[#1E293B] px-1.5 py-0.5 rounded text-slate-400 ml-2">
                ⌘K
              </kbd>
            </div>
          </button>

          {/* Vertical Separator */}
          <div className="h-6 w-px bg-[#1E293B] hidden sm:block" />

          {/* Role Perspective Selector */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#111A2E] hover:bg-[#16223B] border border-[#1E293B] text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden lg:inline">{roleLabels[currentUser.role].title}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0B1220] border border-[#1E293B] shadow-2xl p-2 z-50 text-white"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-[#1E293B] mb-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Switch Role Perspective
                  </p>
                </div>
                {(['super_admin', 'knowledge_admin', 'end_user'] as UserRole[]).map((r) => {
                  const info = roleLabels[r];
                  const isSelected = currentUser.role === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-start space-x-2.5 p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-[#2563EB]/20 border border-[#2563EB]/40 text-blue-300 font-semibold' 
                          : 'text-slate-300 hover:bg-[#111A2E]'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                        ) : (
                          <Layers className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{info.title}</p>
                        <p className="text-[10px] text-slate-400">{info.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#111A2E] hover:bg-[#16223B] border border-[#1E293B] text-slate-300 hover:text-white transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-400" />
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#111A2E] hover:bg-[#16223B] border border-[#1E293B] text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Notifications & Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-[#0B1220]" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
