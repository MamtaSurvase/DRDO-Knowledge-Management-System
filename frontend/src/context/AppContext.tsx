import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  ClearanceLevel, 
  DRDOLab,
  OntologyEntity, 
  KnowledgeTriple, 
  OntologySchemaClass, 
  IngestionPipelineItem, 
  AuditLogItem, 
  IntelligenceReport,
  SystemMetric 
} from '../types';
import { 
  MOCK_USERS, 
  MOCK_DRDO_LABS, 
  MOCK_ONTOLOGY_ENTITIES, 
  MOCK_KNOWLEDGE_TRIPLES, 
  MOCK_SCHEMA_CLASSES, 
  MOCK_INGESTION_QUEUE, 
  MOCK_AUDIT_LOGS, 
  MOCK_INTELLIGENCE_REPORTS,
  MOCK_SYSTEM_METRICS 
} from '../data/mockData';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
}

interface AppContextType {
  // Theme & Role
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  logout: () => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  
  // Navigation & UI Modals
  activePage: string;
  setActivePage: (page: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  selectedEntity: OntologyEntity | null;
  setSelectedEntity: (entity: OntologyEntity | null) => void;
  selectedReport: IntelligenceReport | null;
  setSelectedReport: (report: IntelligenceReport | null) => void;
  
  // Data Collections
  users: User[];
  drdoLabs: DRDOLab[];
  entities: OntologyEntity[];
  triples: KnowledgeTriple[];
  schemaClasses: OntologySchemaClass[];
  ingestionQueue: IngestionPipelineItem[];
  auditLogs: AuditLogItem[];
  reports: IntelligenceReport[];
  systemMetrics: SystemMetric;
  notifications: Notification[];
  
  // Handlers & Mutations
  addAuditLog: (action: string, resource: string, details: string, status?: 'SUCCESS' | 'WARNING' | 'ALERT' | 'BLOCKED') => void;
  addEntity: (entity: Omit<OntologyEntity, 'id'>) => void;
  updateEntity: (id: string, updatedData: Partial<OntologyEntity>) => void;
  deleteEntity: (id: string) => void;
  mergeEntities: (sourceId: string, targetId: string) => void;
  addTriple: (triple: Omit<KnowledgeTriple, 'id'>) => void;
  updateTriple: (id: string, updatedData: Partial<KnowledgeTriple>) => void;
  deleteTriple: (id: string) => void;
  verifyTriple: (id: string) => void;
  addSchemaClass: (schema: Omit<OntologySchemaClass, 'id'>) => void;
  processIngestionItem: (id: string, action: 'APPROVE' | 'REJECT') => void;
  uploadDocument: (file: File, clearance: ClearanceLevel, lab: string, category?: string, tags?: string) => Promise<void>;
  updateDocument: (id: string, updatedData: Partial<IngestionPipelineItem>) => void;
  deleteDocument: (id: string) => void;
  updateUserClearance: (userId: string, newClearance: ClearanceLevel) => void;
  addUser: (user: Omit<User, 'id' | 'lastActive'>) => void;
  updateUser: (userId: string, updatedData: Partial<Omit<User, 'id'>>) => void;
  deleteUser: (userId: string) => void;
  updateUserStatus: (userId: string, status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION') => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  addDRDOLab: (lab: Omit<DRDOLab, 'id'>) => void;
  updateDRDOLab: (labId: string, updatedData: Partial<Omit<DRDOLab, 'id'>>) => void;
  deleteDRDOLab: (labId: string) => void;
  sendBroadcastNotification: (title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT') => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('drdo_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [drdoLabs] = useState<DRDOLab[]>(MOCK_DRDO_LABS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Default: Dr. V. K. Saraswat (Super Admin)
  const [activePage, setActivePage] = useState<string>('dashboard');

  const logout = () => {
    setIsAuthenticated(false);
    setActivePage('login');
    addAuditLog(
      'USER_LOGOUT',
      'User Session Terminated',
      `User ${currentUser.name} logged out from IP 10.240.14.32`,
      'SUCCESS'
    );
  };
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<OntologyEntity | null>(null);
  const [selectedReport, setSelectedReport] = useState<IntelligenceReport | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [entities, setEntities] = useState<OntologyEntity[]>(MOCK_ONTOLOGY_ENTITIES);
  const [triples, setTriples] = useState<KnowledgeTriple[]>(MOCK_KNOWLEDGE_TRIPLES);
  const [schemaClasses, setSchemaClasses] = useState<OntologySchemaClass[]>(MOCK_SCHEMA_CLASSES);
  const [ingestionQueue, setIngestionQueue] = useState<IngestionPipelineItem[]>(MOCK_INGESTION_QUEUE);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(MOCK_AUDIT_LOGS);
  const [reports, setReports] = useState<IntelligenceReport[]>(MOCK_INTELLIGENCE_REPORTS);
  const [systemMetrics] = useState<SystemMetric>(MOCK_SYSTEM_METRICS);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n-1',
      title: 'High Clearance Ingestion Verified',
      message: 'Agni-V Telemetry Trial 6 document ingested. 24 new knowledge triples generated.',
      timestamp: '10 mins ago',
      type: 'SUCCESS',
      read: false
    },
    {
      id: 'n-2',
      title: 'AESA Radar Node Verification Pending',
      message: 'LRDE uploaded Uttam GaN TR module report requiring Knowledge Admin approval.',
      timestamp: '25 mins ago',
      type: 'WARNING',
      read: false
    },
    {
      id: 'n-3',
      title: 'CSOC Security Alert',
      message: 'Blocked 1 unauthorized query attempt from external subnet on /api/ontology route.',
      timestamp: '1 hour ago',
      type: 'ALERT',
      read: false
    }
  ]);

  // Apply dark/light class to root document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('drdo_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const switchRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role) || {
      ...currentUser,
      role
    };
    setCurrentUser(targetUser);
    setActivePage('dashboard');
    
    addAuditLog(
      'ROLE_SWITCH',
      `Switched view perspective to: ${role.toUpperCase()}`,
      `User ${targetUser.name} loaded perspective ${role}`,
      'SUCCESS'
    );
  };

  const addAuditLog = (
    action: string, 
    resource: string, 
    details: string, 
    status: 'SUCCESS' | 'WARNING' | 'ALERT' | 'BLOCKED' = 'SUCCESS'
  ) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: `${currentUser.name} (${currentUser.id})`,
      role: currentUser.role,
      action,
      resource,
      clearance: currentUser.clearance,
      ipAddress: '10.240.14.32',
      status,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addEntity = (entityData: Omit<OntologyEntity, 'id'>) => {
    const newEntity: OntologyEntity = {
      ...entityData,
      id: `ent-${Date.now()}`
    };
    setEntities(prev => [newEntity, ...prev]);
    addAuditLog(
      'ENTITY_CREATED',
      `Ontology Entity: ${newEntity.label} [${newEntity.type}]`,
      `Entity added to lab ${newEntity.drdoLab}`
    );
  };

  const updateEntity = (id: string, updatedData: Partial<OntologyEntity>) => {
    setEntities(prev => prev.map(e => {
      if (e.id === id) {
        const updated = { ...e, ...updatedData };
        if (updatedData.label && updatedData.label !== e.label) {
          setTriples(triplesPrev => triplesPrev.map(t => ({
            ...t,
            subjectLabel: t.subjectId === id ? updatedData.label! : t.subjectLabel,
            objectLabel: t.objectId === id ? updatedData.label! : t.objectLabel,
          })));
        }
        return updated;
      }
      return e;
    }));
    addAuditLog('ENTITY_UPDATED', `Entity ID: ${id}`, `Updated ontology entity properties`);
  };

  const deleteEntity = (id: string) => {
    const targetEntity = entities.find(e => e.id === id);
    setEntities(prev => prev.filter(e => e.id !== id));
    setTriples(prev => prev.filter(t => t.subjectId !== id && t.objectId !== id));
    addAuditLog(
      'ENTITY_DELETED',
      `Entity: ${targetEntity?.label || id}`,
      `Removed node and purged associated graph triples.`
    );
  };

  const mergeEntities = (sourceId: string, targetId: string) => {
    const source = entities.find(e => e.id === sourceId);
    const target = entities.find(e => e.id === targetId);
    if (!source || !target) return;

    setTriples(prev => prev.map(t => {
      let subjectId = t.subjectId;
      let subjectLabel = t.subjectLabel;
      let subjectType = t.subjectType;
      let objectId = t.objectId;
      let objectLabel = t.objectLabel;
      let objectType = t.objectType;

      if (t.subjectId === sourceId) {
        subjectId = target.id;
        subjectLabel = target.label;
        subjectType = target.type;
      }
      if (t.objectId === sourceId) {
        objectId = target.id;
        objectLabel = target.label;
        objectType = target.type;
      }

      return {
        ...t,
        subjectId,
        subjectLabel,
        subjectType,
        objectId,
        objectLabel,
        objectType
      };
    }));

    setEntities(prev => prev.map(e => {
      if (e.id === targetId) {
        return {
          ...e,
          summary: `${e.summary} | Merged alias: ${source.label} (${source.summary})`,
          linkedIds: Array.from(new Set([...(e.linkedIds || []), ...(source.linkedIds || [])]))
        };
      }
      return e;
    }).filter(e => e.id !== sourceId));

    addAuditLog(
      'ENTITIES_MERGED',
      `Merged: "${source.label}" -> "${target.label}"`,
      `Re-routed all graph edges from source node to target node and purged source node.`
    );
  };

  const addTriple = (tripleData: Omit<KnowledgeTriple, 'id'>) => {
    const newTriple: KnowledgeTriple = {
      ...tripleData,
      id: `trp-${Date.now()}`
    };
    setTriples(prev => [newTriple, ...prev]);
    addAuditLog(
      'TRIPLE_CREATED',
      `Triple: ${newTriple.subjectLabel} -> ${newTriple.predicate} -> ${newTriple.objectLabel}`,
      `Created with confidence score ${newTriple.confidence}`
    );
  };

  const updateTriple = (id: string, updatedData: Partial<KnowledgeTriple>) => {
    setTriples(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
    addAuditLog('TRIPLE_UPDATED', `Triple ID: ${id}`, `Corrected relationship triple properties/status`);
  };

  const deleteTriple = (id: string) => {
    const targetTriple = triples.find(t => t.id === id);
    setTriples(prev => prev.filter(t => t.id !== id));
    addAuditLog('TRIPLE_DELETED', `Triple ID: ${id}`, `Deleted relationship: ${targetTriple?.subjectLabel || ''} -[${targetTriple?.predicate || ''}]-> ${targetTriple?.objectLabel || ''}`);
  };

  const verifyTriple = (id: string) => {
    setTriples(prev => prev.map(t => t.id === id ? { ...t, status: 'VERIFIED' } : t));
    const targetTriple = triples.find(t => t.id === id);
    if (targetTriple) {
      addAuditLog(
        'TRIPLE_VERIFIED',
        `Triple: ${targetTriple.subjectLabel} -> ${targetTriple.predicate} -> ${targetTriple.objectLabel}`,
        `Status set to VERIFIED by Knowledge Admin ${currentUser.name}`
      );
    }
  };

  const addSchemaClass = (schemaData: Omit<OntologySchemaClass, 'id'>) => {
    const newSchema: OntologySchemaClass = {
      ...schemaData,
      id: `cls-${Date.now()}`
    };
    setSchemaClasses(prev => [newSchema, ...prev]);
    addAuditLog(
      'SCHEMA_CLASS_CREATED',
      `Ontology Schema Class: ${newSchema.name}`,
      `Class created with ${newSchema.attributes.length} attributes.`
    );
  };

  const processIngestionItem = (id: string, action: 'APPROVE' | 'REJECT') => {
    setIngestionQueue(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED'
        };
      }
      return item;
    }));

    const item = ingestionQueue.find(i => i.id === id);
    if (item) {
      addAuditLog(
        action === 'APPROVE' ? 'INGESTION_APPROVED' : 'INGESTION_REJECTED',
        `File: ${item.filename}`,
        `Document ingestion ${action === 'APPROVE' ? 'approved & triples merged' : 'rejected'} by ${currentUser.name}`
      );
    }
  };

  const uploadDocument = async (file: File, clearance: ClearanceLevel, lab: string, category?: string, tags?: string) => {
    // Simulated Document Processing & Ingestion
    const newItem: IngestionPipelineItem = {
      id: `ing-${Date.now()}`,
      filename: file.name,
      fileType: file.name.endsWith('.pdf') ? 'PDF' : file.name.endsWith('.docx') ? 'INTEL_BRIEF' : 'TELEMETRY',
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      uploadedBy: currentUser.name,
      drdoLab: lab,
      clearance,
      status: 'PROCESSING',
      triplesExtracted: 0,
      confidenceScore: 0,
      previewSnippet: `Document "${file.name}" uploaded to DRDO STRATOS pipeline. Processing OCR, NLP Entity Extraction, and Triple Mapping...`,
      category: category || 'Radar & Avionics',
      tags: tags || 'Defence, Innovation'
    };

    setIngestionQueue(prev => [newItem, ...prev]);
    addAuditLog(
      'DOCUMENT_UPLOADED',
      `File: ${file.name}`,
      `Uploaded to ${lab} under ${clearance} level [Category: ${category || 'N/A'}].`
    );

    // Simulate async extraction completion after 2 seconds
    setTimeout(() => {
      setIngestionQueue(prev => prev.map(item => {
        if (item.id === newItem.id) {
          return {
            ...item,
            status: 'PENDING_VERIFICATION',
            triplesExtracted: Math.floor(Math.random() * 15) + 8,
            confidenceScore: 0.94,
            previewSnippet: `Extracted DRDO defense entities, radar specs, and material compositions. Triples waiting for Knowledge Admin verification.`
          };
        }
        return item;
      }));
    }, 2000);
  };

  const updateDocument = (id: string, updatedData: Partial<IngestionPipelineItem>) => {
    setIngestionQueue(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    const doc = ingestionQueue.find(d => d.id === id);
    addAuditLog(
      'DOCUMENT_UPDATED',
      `File: ${updatedData.filename || doc?.filename || id}`,
      `Document metadata, clearance, or categorization updated by ${currentUser.name}`,
      'SUCCESS'
    );
  };

  const deleteDocument = (id: string) => {
    const doc = ingestionQueue.find(d => d.id === id);
    setIngestionQueue(prev => prev.filter(item => item.id !== id));
    addAuditLog(
      'DOCUMENT_DELETED',
      `File: ${doc?.filename || id}`,
      `Document purged from knowledge base by ${currentUser.name}`,
      'ALERT'
    );
  };

  const updateUserClearance = (userId: string, newClearance: ClearanceLevel) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, clearance: newClearance } : u));
    const u = users.find(x => x.id === userId);
    addAuditLog(
      'USER_CLEARANCE_MUTATED',
      `User: ${u?.name || userId}`,
      `Elevated/Modified clearance to ${newClearance}`,
      'WARNING'
    );
  };

  const addUser = (userData: Omit<User, 'id' | 'lastActive'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      lastActive: 'Just now'
    };
    setUsers(prev => [newUser, ...prev]);
    addAuditLog(
      'USER_CREATED',
      `User: ${newUser.name} (${newUser.email})`,
      `Provisioned with role ${newUser.role} & clearance ${newUser.clearance}`
    );
  };

  const updateUserStatus = (userId: string, status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    const u = users.find(x => x.id === userId);
    addAuditLog(
      'USER_STATUS_MUTATED',
      `User: ${u?.name || userId}`,
      `Account status changed to ${status}`,
      status === 'SUSPENDED' ? 'ALERT' : 'SUCCESS'
    );
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    const u = users.find(x => x.id === userId);
    addAuditLog(
      'USER_ROLE_MUTATED',
      `User: ${u?.name || userId}`,
      `Role updated to ${role}`,
      'WARNING'
    );
  };

  const updateUser = (userId: string, updatedData: Partial<Omit<User, 'id'>>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updatedData } : u));
    const u = users.find(x => x.id === userId);
    addAuditLog(
      'USER_UPDATED',
      `User: ${u?.name || userId}`,
      `User profile and attributes modified by ${currentUser.name}`,
      'SUCCESS'
    );
  };

  const deleteUser = (userId: string) => {
    const u = users.find(x => x.id === userId);
    setUsers(prev => prev.filter(x => x.id !== userId));
    addAuditLog(
      'USER_DELETED',
      `User: ${u?.name || userId} (${u?.email || 'N/A'})`,
      `Account revoked and purged from system by ${currentUser.name}`,
      'ALERT'
    );
  };

  const [drdoLabsState, setDrdoLabsState] = useState<DRDOLab[]>(MOCK_DRDO_LABS);

  const addDRDOLab = (labData: Omit<DRDOLab, 'id'>) => {
    const newLab: DRDOLab = {
      ...labData,
      id: `lab-${Date.now()}`
    };
    setDrdoLabsState(prev => [...prev, newLab]);
    addAuditLog(
      'DRDO_LAB_REGISTERED',
      `Lab: ${newLab.name} [${newLab.code}]`,
      `Created under cluster ${newLab.cluster}`
    );
  };

  const updateDRDOLab = (labId: string, updatedData: Partial<Omit<DRDOLab, 'id'>>) => {
    setDrdoLabsState(prev => prev.map(l => l.id === labId ? { ...l, ...updatedData } : l));
    const lab = drdoLabsState.find(l => l.id === labId);
    addAuditLog(
      'DRDO_LAB_UPDATED',
      `Lab: ${lab?.name || labId}`,
      `Laboratory metadata and cluster configuration modified by ${currentUser.name}`,
      'SUCCESS'
    );
  };

  const deleteDRDOLab = (labId: string) => {
    const lab = drdoLabsState.find(l => l.id === labId);
    setDrdoLabsState(prev => prev.filter(l => l.id !== labId));
    addAuditLog(
      'DRDO_LAB_DELETED',
      `Lab: ${lab?.name || labId} [${lab?.code || 'N/A'}]`,
      `Laboratory purged from system directory by ${currentUser.name}`,
      'ALERT'
    );
  };

  const sendBroadcastNotification = (title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT') => {
    const newNotif = {
      id: `n-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    addAuditLog(
      'BROADCAST_PUBLISHED',
      `Notification: ${title}`,
      `Broadcast sent across all system active sessions`,
      type === 'ALERT' ? 'WARNING' : 'SUCCESS'
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        currentUser,
        setCurrentUser,
        switchRole,
        activePage,
        setActivePage,
        commandPaletteOpen,
        setCommandPaletteOpen,
        selectedEntity,
        setSelectedEntity,
        selectedReport,
        setSelectedReport,
        users,
        drdoLabs: drdoLabsState,
        entities,
        triples,
        schemaClasses,
        ingestionQueue,
        auditLogs,
        reports,
        systemMetrics,
        notifications,
        addAuditLog,
        addEntity,
        updateEntity,
        deleteEntity,
        mergeEntities,
        addTriple,
        updateTriple,
        deleteTriple,
        verifyTriple,
        addSchemaClass,
        processIngestionItem,
        uploadDocument,
        updateDocument,
        deleteDocument,
        updateUserClearance,
        addUser,
        updateUser,
        deleteUser,
        updateUserStatus,
        updateUserRole,
        addDRDOLab,
        updateDRDOLab,
        deleteDRDOLab,
        sendBroadcastNotification,
        markNotificationRead,
        clearAllNotifications,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
