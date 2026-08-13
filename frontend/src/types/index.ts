export type UserRole = 'super_admin' | 'knowledge_admin' | 'end_user';

export type ClearanceLevel = 'LEVEL_1_RESTRICTED' | 'LEVEL_2_CONFIDENTIAL' | 'LEVEL_3_SECRET' | 'LEVEL_4_TOP_SECRET';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clearance: ClearanceLevel;
  designation: string;
  department: string;
  drdoLab: string;
  avatar?: string;
  lastActive: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
}

export interface DRDOLab {
  id: string;
  code: string;
  name: string;
  location: string;
  cluster: 'Aeronautical' | 'Armaments & Combat' | 'Electronics & Radar' | 'Missile Systems' | 'Naval Systems' | 'Materials & Life Sciences';
  nodeCount: number;
  leadDirector: string;
  activeAnalysts: number;
  domain?: string;
  activeProjects?: string[];
  headcount?: number;
}

export type EntityType = 
  | 'Laboratory' 
  | 'WeaponSystem' 
  | 'Missile' 
  | 'RadarSystem' 
  | 'Avionics' 
  | 'Material' 
  | 'ThreatActor' 
  | 'Countermeasure' 
  | 'Document' 
  | 'Officer';

export interface OntologyEntity {
  id: string;
  label: string;
  type: EntityType;
  clearance: ClearanceLevel;
  drdoLab: string;
  summary: string;
  properties: Record<string, string | number>;
  linkedIds: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface KnowledgeTriple {
  id: string;
  subjectId: string;
  subjectLabel: string;
  subjectType: EntityType;
  predicate: string;
  objectId: string;
  objectLabel: string;
  objectType: EntityType;
  confidence: number;
  createdDate: string;
  drdoLab: string;
  status: 'VERIFIED' | 'PENDING' | 'FLAGGED';
}

export interface OntologySchemaClass {
  id: string;
  name: string;
  description: string;
  parentClass?: string;
  color: string;
  attributes: { name: string; type: string; required: boolean }[];
  instanceCount: number;
  status: 'ACTIVE' | 'DRAFT' | 'DEPRECATED';
}

export interface IngestionPipelineItem {
  id: string;
  filename: string;
  fileType: 'PDF' | 'DOCX' | 'RADAR_LOG' | 'INTEL_BRIEF' | 'TELEMETRY';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  drdoLab: string;
  clearance: ClearanceLevel;
  status: 'PROCESSING' | 'EXTRACTED' | 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';
  triplesExtracted: number;
  confidenceScore: number;
  previewSnippet: string;
  category?: string;
  tags?: string;
  author?: string;
  keywords?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  resource: string;
  clearance: ClearanceLevel;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT' | 'BLOCKED';
  details: string;
}

export interface IntelligenceReport {
  id: string;
  title: string;
  author: string;
  classification: ClearanceLevel;
  clearance?: ClearanceLevel;
  date: string;
  drdoLab: string;
  summary: string;
  content?: string;
  linkedNodes: string[];
  tags: string[];
  readsCount: number;
  fileSize: string;
}

export interface SystemMetric {
  cpuUsage: number;
  memoryUsage: number;
  storageUsageGB: number;
  activeSessions: number;
  queriesPerMinute: number;
  totalTriplesInStore: number;
  totalOntologyNodes: number;
  systemHealth: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
}
