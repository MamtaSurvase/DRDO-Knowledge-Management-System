import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { CommandPalette } from './components/common/CommandPalette';
import { LoginPage } from './components/auth/LoginPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AuthNavigationSwitcher } from './components/auth/AuthNavigationSwitcher';
import { DKIPLandingPage } from './components/landing/DKIPLandingPage';

import { Dashboard } from './components/dashboard/Dashboard';
import { KnowledgeExplorer } from './components/explorer/KnowledgeExplorer';
import { AIAssistant } from './components/ai/AIAssistant';
import { OntologyBuilder } from './components/ontology/OntologyBuilder';
import { TripleStore } from './components/triple/TripleStore';
import { IngestionPipelineView } from './components/ingestion/IngestionPipelineView';
import { UserManagementView } from './components/users/UserManagementView';
import { AuditLogsView } from './components/audit/AuditLogsView';
import { SemanticSearchReportsView } from './components/search/SemanticSearchReportsView';
import { DefenseTaxonomyView } from './components/taxonomy/DefenseTaxonomyView';
import { SuperAdminModule } from './components/admin/SuperAdminModule';
import { KnowledgeAdminModule } from './components/admin/KnowledgeAdminModule';
import { EndUserModule } from './components/enduser/EndUserModule';

export default function App() {
  const { activePage, currentUser, isAuthenticated } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Unauthenticated routing & auth screen navigation
  if (activePage === 'landing' || activePage === 'dkip_landing') {
    return (
      <div className="pt-12">
        <AuthNavigationSwitcher />
        <DKIPLandingPage />
      </div>
    );
  }

  if (activePage === 'request_access' || activePage === 'register' || activePage === 'create_account') {
    return (
      <div className="pt-12">
        <AuthNavigationSwitcher />
        <RegisterPage />
      </div>
    );
  }

  if (activePage === 'forgot_password') {
    return (
      <div className="pt-12">
        <AuthNavigationSwitcher />
        <ForgotPasswordPage />
      </div>
    );
  }

  if (activePage === 'reset_password') {
    return (
      <div className="pt-12">
        <AuthNavigationSwitcher />
        <ResetPasswordPage />
      </div>
    );
  }

  if (!isAuthenticated || activePage === 'login') {
    return (
      <div className="pt-12">
        <AuthNavigationSwitcher />
        <LoginPage />
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        if (currentUser.role === 'super_admin') return <SuperAdminModule initialTab="overview" />;
        if (currentUser.role === 'knowledge_admin') return <KnowledgeAdminModule initialTab="overview" />;
        return <EndUserModule initialTab="overview" />;
      case 'end_user':
      case 'eu_dashboard':
        return <EndUserModule initialTab="overview" />;
      case 'eu_ai_assistant':
        return <EndUserModule initialTab="ai_assistant" />;
      case 'eu_search':
        return <EndUserModule initialTab="search" />;
      case 'eu_library':
        return <EndUserModule initialTab="library" />;
      case 'eu_bookmarks':
        return <EndUserModule initialTab="bookmarks" />;
      case 'eu_graph':
        return <EndUserModule initialTab="graph" />;
      case 'eu_ontology':
        return <EndUserModule initialTab="ontology" />;
      case 'eu_analytics':
        return <EndUserModule initialTab="analytics" />;
      case 'eu_reports':
        return <EndUserModule initialTab="reports" />;
      case 'eu_notifications':
        return <EndUserModule initialTab="notifications" />;
      case 'eu_profile':
        return <EndUserModule initialTab="profile" />;
      case 'eu_settings':
        return <EndUserModule initialTab="settings" />;
      case 'super_admin':
        return <SuperAdminModule initialTab="overview" />;
      case 'user_management':
        return <SuperAdminModule initialTab="users" />;
      case 'departments':
        return <SuperAdminModule initialTab="departments" />;
      case 'rbac_matrix':
        return <SuperAdminModule initialTab="rbac" />;
      case 'system_monitoring':
        return <SuperAdminModule initialTab="monitoring" />;
      case 'ai_config':
        return <SuperAdminModule initialTab="ai_config" />;
      case 'backup_restore':
        return <SuperAdminModule initialTab="backups" />;
      case 'audit_logs':
        return <SuperAdminModule initialTab="audit" />;
      case 'notifications_broadcast':
        return <SuperAdminModule initialTab="notifications" />;
      case 'system_settings':
        return <SuperAdminModule initialTab="settings" />;
      case 'admin_profile':
        return <SuperAdminModule initialTab="profile" />;
      case 'knowledge_admin':
        return <KnowledgeAdminModule initialTab="overview" />;
      case 'upload_documents':
        return <KnowledgeAdminModule initialTab="upload" />;
      case 'manage_documents':
        return <KnowledgeAdminModule initialTab="manage_docs" />;
      case 'doc_categorization':
        return <KnowledgeAdminModule initialTab="metadata_tags" />;
      case 'ontology_management':
        return <KnowledgeAdminModule initialTab="ontology" />;
      case 'knowledge_graph_mgt':
        return <KnowledgeAdminModule initialTab="graph" />;
      case 'ai_processing':
        return <KnowledgeAdminModule initialTab="ai_monitor" />;
      case 'ka_reports':
        return <KnowledgeAdminModule initialTab="reports" />;
      case 'ka_notifications':
        return <KnowledgeAdminModule initialTab="notifications" />;
      case 'ka_profile':
        return <KnowledgeAdminModule initialTab="profile" />;
      case 'ka_settings':
        return <KnowledgeAdminModule initialTab="settings" />;
      case 'knowledge_explorer':
        return <KnowledgeExplorer />;
      case 'ai_assistant':
        return <AIAssistant />;
      case 'ontology_builder':
        return <OntologyBuilder />;
      case 'triple_store':
        return <TripleStore />;
      case 'ingestion_pipeline':
        return <IngestionPipelineView />;
      case 'semantic_search':
      case 'reports_generator':
      case 'reports_analytics':
        return <SemanticSearchReportsView />;
      case 'defense_taxonomy':
        return <DefenseTaxonomyView />;
      case 'landing':
      case 'dkip_landing':
        return <DKIPLandingPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Role-Based Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header Bar */}
          <Header onOpenNotifications={() => setNotificationsOpen(true)} />

          {/* Main Viewport */}
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
            {renderActivePage()}
          </main>
        </div>
      </div>

      {/* Global Drawers & Modals */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <CommandPalette />
    </div>
  );
}
