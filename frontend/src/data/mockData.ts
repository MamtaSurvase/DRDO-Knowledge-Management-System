import { 
  User, 
  DRDOLab, 
  OntologyEntity, 
  KnowledgeTriple, 
  OntologySchemaClass, 
  IngestionPipelineItem, 
  AuditLogItem, 
  IntelligenceReport,
  SystemMetric 
} from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Dr. V. K. Saraswat',
    email: 'vk.saraswat@drdo.gov.in',
    role: 'super_admin',
    clearance: 'LEVEL_4_TOP_SECRET',
    designation: 'Director General & System Chief',
    department: 'Strategic Systems Directorate',
    drdoLab: 'DRDO HQ, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastActive: 'Just now',
    status: 'ACTIVE'
  },
  {
    id: 'usr-2',
    name: 'Dr. Tessy Thomas',
    email: 'tessy.thomas@drdl.drdo.in',
    role: 'knowledge_admin',
    clearance: 'LEVEL_4_TOP_SECRET',
    designation: 'Chief Knowledge Engineer',
    department: 'Aeronautical Systems Cluster',
    drdoLab: 'DRDL Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastActive: '5 mins ago',
    status: 'ACTIVE'
  },
  {
    id: 'usr-3',
    name: 'Col. Rajesh Sharma',
    email: 'r.sharma@cair.drdo.in',
    role: 'end_user',
    clearance: 'LEVEL_3_SECRET',
    designation: 'Senior Defense Intelligence Analyst',
    department: 'Cyber & AI Research Division',
    drdoLab: 'CAIR Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastActive: '12 mins ago',
    status: 'ACTIVE'
  },
  {
    id: 'usr-4',
    name: 'Dr. Anita Roy',
    email: 'anita.roy@lrde.drdo.in',
    role: 'knowledge_admin',
    clearance: 'LEVEL_3_SECRET',
    designation: 'Radar Systems Curator',
    department: 'Electronics & Radar Division',
    drdoLab: 'LRDE Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    lastActive: '1 hour ago',
    status: 'ACTIVE'
  },
  {
    id: 'usr-5',
    name: 'Lt. Cdr. Arjun Nair',
    email: 'arjun.nair@nstl.drdo.in',
    role: 'end_user',
    clearance: 'LEVEL_2_CONFIDENTIAL',
    designation: 'Naval Weapons Research Officer',
    department: 'Underwater Weapons Division',
    drdoLab: 'NSTL Visakhapatnam',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    lastActive: '2 hours ago',
    status: 'ACTIVE'
  }
];

export const MOCK_DRDO_LABS: DRDOLab[] = [
  {
    id: 'lab-1',
    code: 'DRDL',
    name: 'Defense Research and Development Laboratory',
    location: 'Hyderabad, Telangana',
    cluster: 'Missile Systems',
    nodeCount: 3420,
    leadDirector: 'Dr. G. A. Srinivasa Murthy',
    activeAnalysts: 142,
    domain: 'Strategic Ballistic & Cruise Missile Systems',
    activeProjects: ['Agni-V', 'BrahMos-II', 'Astra Mk-3', 'Pralay'],
    headcount: 850
  },
  {
    id: 'lab-2',
    code: 'LRDE',
    name: 'Electronics & Radar Development Establishment',
    location: 'Bengaluru, Karnataka',
    cluster: 'Electronics & Radar',
    nodeCount: 2890,
    leadDirector: 'Dr. P. K. Atrey',
    activeAnalysts: 98,
    domain: 'AESA Radars, Airborne Warning & Signal Processing',
    activeProjects: ['Uttam AESA', 'Ashwini LLTR', 'Arudhra MPR'],
    headcount: 620
  },
  {
    id: 'lab-3',
    code: 'ADE',
    name: 'Aeronautical Development Establishment',
    location: 'Bengaluru, Karnataka',
    cluster: 'Aeronautical',
    nodeCount: 2150,
    leadDirector: 'Y. Dilip',
    activeAnalysts: 76,
    domain: 'Unmanned Aerial Vehicles & Flight Control Systems',
    activeProjects: ['Tapas BH-201', 'Abhyas High-Speed Target', 'Ghatak UCAV'],
    headcount: 540
  },
  {
    id: 'lab-4',
    code: 'CAIR',
    name: 'Center for Artificial Intelligence & Robotics',
    location: 'Bengaluru, Karnataka',
    cluster: 'Electronics & Radar',
    nodeCount: 1980,
    leadDirector: 'Dr. B. K. Das',
    activeAnalysts: 110,
    domain: 'Military AI, Autonomous Navigation & Cyber Security',
    activeProjects: ['STRATOS Knowledge Graph', 'Unmanned Ground Robot', 'CSOC AI'],
    headcount: 410
  },
  {
    id: 'lab-5',
    code: 'DMRL',
    name: 'Defense Metallurgical Research Laboratory',
    location: 'Hyderabad, Telangana',
    cluster: 'Materials & Life Sciences',
    nodeCount: 1640,
    leadDirector: 'Dr. Chandan Mondal',
    activeAnalysts: 54,
    domain: 'High-Temperature Ceramic Composites & Stealth RAM',
    activeProjects: ['Ceramic Matrix RAM', 'Titanium Single-Crystal Blades'],
    headcount: 380
  },
  {
    id: 'lab-6',
    code: 'NSTL',
    name: 'Naval Science & Technological Laboratory',
    location: 'Visakhapatnam, AP',
    cluster: 'Naval Systems',
    nodeCount: 1420,
    leadDirector: 'Dr. Y. Sreenivas Rao',
    activeAnalysts: 48,
    domain: 'Underwater Weapons, Torpedo Systems & Stealth Submarines',
    activeProjects: ['Varunastra Torpedo', 'TAKSHAK Autonomous UUV'],
    headcount: 320
  }
];

export const MOCK_ONTOLOGY_ENTITIES: OntologyEntity[] = [
  {
    id: 'ent-1',
    label: 'Agni-V ICBM',
    type: 'Missile',
    clearance: 'LEVEL_4_TOP_SECRET',
    drdoLab: 'DRDL Hyderabad',
    summary: 'Surface-to-surface 3-stage solid-fueled intercontinental ballistic missile with 5000+ km range and MIRV capability.',
    properties: {
      Range: '5,500 - 8,000 km',
      Speed: 'Mach 24',
      Payload: '1,500 kg MIRV',
      Guidance: 'Ring Laser Gyro INS + NavIC'
    },
    linkedIds: ['ent-2', 'ent-5', 'ent-8']
  },
  {
    id: 'ent-2',
    label: 'DRDL Hyderabad',
    type: 'Laboratory',
    clearance: 'LEVEL_1_RESTRICTED',
    drdoLab: 'DRDL Hyderabad',
    summary: 'Premier missile systems laboratory designing hypersonic, tactical, and strategic guided weapons.',
    properties: {
      Established: '1961',
      Cluster: 'Missile Systems',
      Location: 'Kanchanbagh, Hyderabad'
    },
    linkedIds: ['ent-1', 'ent-3', 'ent-6']
  },
  {
    id: 'ent-3',
    label: 'BrahMos Mk-II',
    type: 'WeaponSystem',
    clearance: 'LEVEL_3_SECRET',
    drdoLab: 'DRDL Hyderabad',
    summary: 'Hypersonic speed variant capable of Mach 7 flight using scramjet air-breathing propulsion.',
    properties: {
      Range: '450 km',
      Speed: 'Mach 7.2',
      Engine: 'Scramjet Dual-Mode'
    },
    linkedIds: ['ent-2', 'ent-5', 'ent-7']
  },
  {
    id: 'ent-4',
    label: 'Uttam AESA Radar',
    type: 'RadarSystem',
    clearance: 'LEVEL_3_SECRET',
    drdoLab: 'LRDE Bengaluru',
    summary: 'Indigenously developed Solid State Active Electronically Scanned Array radar for LCA Tejas fighter aircraft.',
    properties: {
      Frequency: 'X-Band',
      Modules: '780 GaN TR Modules',
      MaxRange: '160 km vs 2m² RCS'
    },
    linkedIds: ['ent-6', 'ent-9']
  },
  {
    id: 'ent-5',
    label: 'DMRL Ceramic Composite',
    type: 'Material',
    clearance: 'LEVEL_2_CONFIDENTIAL',
    drdoLab: 'DMRL Hyderabad',
    summary: 'Ultra-high temperature ceramic matrix composite withstands 2200°C atmospheric re-entry friction.',
    properties: {
      MeltingPoint: '2,800 °C',
      Density: '2.8 g/cm³',
      Application: 'Hypersonic Nose Cone & RAM'
    },
    linkedIds: ['ent-1', 'ent-3']
  },
  {
    id: 'ent-6',
    label: 'LRDE Bengaluru',
    type: 'Laboratory',
    clearance: 'LEVEL_1_RESTRICTED',
    drdoLab: 'LRDE Bengaluru',
    summary: 'Pioneer research institute developing radar, sensor, and electronic warfare systems for Indian Defense Forces.',
    properties: {
      Established: '1958',
      Cluster: 'Electronics & Radar',
      Location: 'CV Raman Nagar, Bengaluru'
    },
    linkedIds: ['ent-4', 'ent-10']
  },
  {
    id: 'ent-7',
    label: 'Hypersonic Test Facility (TBRL)',
    type: 'Laboratory',
    clearance: 'LEVEL_3_SECRET',
    drdoLab: 'TBRL Chandigarh',
    summary: 'Terminal Ballistics Research Laboratory high-velocity impulse tunnel for hypersonic shock wave analysis.',
    properties: {
      MaxShockMach: 'Mach 12',
      TestingArea: 'Ramgarh Range'
    },
    linkedIds: ['ent-3']
  },
  {
    id: 'ent-8',
    label: 'NavIC Satellite Guidance',
    type: 'Avionics',
    clearance: 'LEVEL_2_CONFIDENTIAL',
    drdoLab: 'CAIR Bengaluru',
    summary: 'Indian Regional Navigation Satellite System military anti-jamming receiver module.',
    properties: {
      Accuracy: '< 2.5 meters',
      FrequencyBands: 'L5 & S-Band'
    },
    linkedIds: ['ent-1']
  },
  {
    id: 'ent-9',
    label: 'LCA Tejas Mk-2',
    type: 'WeaponSystem',
    clearance: 'LEVEL_2_CONFIDENTIAL',
    drdoLab: 'ADE Bengaluru',
    summary: '4.5th generation medium weight fighter aircraft equipped with indigenous Uttam AESA and Astra BVR.',
    properties: {
      MaxTakeoffWeight: '17,500 kg',
      Engine: 'GE F414 INS6',
      Hardpoints: '11'
    },
    linkedIds: ['ent-4', 'ent-10']
  },
  {
    id: 'ent-10',
    label: 'Astra Mk-III BVRAAM',
    type: 'Missile',
    clearance: 'LEVEL_3_SECRET',
    drdoLab: 'DRDL Hyderabad',
    summary: 'Beyond Visual Range Air-to-Air missile equipped with Solid Fuel Ducted Ramjet (SFDR) engine for 340+ km kinetic engagement.',
    properties: {
      Range: '340 km',
      Speed: 'Mach 4.5',
      Seeker: 'AESA Active Homing'
    },
    linkedIds: ['ent-9', 'ent-6']
  }
];

export const MOCK_KNOWLEDGE_TRIPLES: KnowledgeTriple[] = [
  {
    id: 'trp-101',
    subjectId: 'ent-1',
    subjectLabel: 'Agni-V ICBM',
    subjectType: 'Missile',
    predicate: 'developedBy',
    objectId: 'ent-2',
    objectLabel: 'DRDL Hyderabad',
    objectType: 'Laboratory',
    confidence: 0.99,
    createdDate: '2026-02-10',
    drdoLab: 'DRDL Hyderabad',
    status: 'VERIFIED'
  },
  {
    id: 'trp-102',
    subjectId: 'ent-1',
    subjectLabel: 'Agni-V ICBM',
    subjectType: 'Missile',
    predicate: 'usesThermalShield',
    objectId: 'ent-5',
    objectLabel: 'DMRL Ceramic Composite',
    objectType: 'Material',
    confidence: 0.97,
    createdDate: '2026-02-11',
    drdoLab: 'DMRL Hyderabad',
    status: 'VERIFIED'
  },
  {
    id: 'trp-103',
    subjectId: 'ent-3',
    subjectLabel: 'BrahMos Mk-II',
    subjectType: 'WeaponSystem',
    predicate: 'undergoesWindTunnelTestingAt',
    objectId: 'ent-7',
    objectLabel: 'Hypersonic Test Facility (TBRL)',
    objectType: 'Laboratory',
    confidence: 0.94,
    createdDate: '2026-02-14',
    drdoLab: 'TBRL Chandigarh',
    status: 'VERIFIED'
  },
  {
    id: 'trp-104',
    subjectId: 'ent-4',
    subjectLabel: 'Uttam AESA Radar',
    subjectType: 'RadarSystem',
    predicate: 'isIntegratedInto',
    objectId: 'ent-9',
    objectLabel: 'LCA Tejas Mk-2',
    objectType: 'WeaponSystem',
    confidence: 0.98,
    createdDate: '2026-02-18',
    drdoLab: 'LRDE Bengaluru',
    status: 'VERIFIED'
  },
  {
    id: 'trp-105',
    subjectId: 'ent-10',
    subjectLabel: 'Astra Mk-III BVRAAM',
    subjectType: 'Missile',
    predicate: 'usesRadarSeekerFrom',
    objectId: 'ent-6',
    objectLabel: 'LRDE Bengaluru',
    objectType: 'Laboratory',
    confidence: 0.91,
    createdDate: '2026-02-22',
    drdoLab: 'LRDE Bengaluru',
    status: 'PENDING'
  },
  {
    id: 'trp-106',
    subjectId: 'ent-8',
    subjectLabel: 'NavIC Satellite Guidance',
    subjectType: 'Avionics',
    predicate: 'providesPositioningTo',
    objectId: 'ent-1',
    objectLabel: 'Agni-V ICBM',
    objectType: 'Missile',
    confidence: 0.96,
    createdDate: '2026-02-25',
    drdoLab: 'CAIR Bengaluru',
    status: 'VERIFIED'
  }
];

export const MOCK_SCHEMA_CLASSES: OntologySchemaClass[] = [
  {
    id: 'cls-1',
    name: 'Laboratory',
    description: 'DRDO constituent research center or establishment.',
    color: '#3b82f6', // blue
    attributes: [
      { name: 'code', type: 'String', required: true },
      { name: 'location', type: 'String', required: true },
      { name: 'cluster', type: 'Enum', required: true }
    ],
    instanceCount: 52,
    status: 'ACTIVE'
  },
  {
    id: 'cls-2',
    name: 'Missile',
    description: 'Guided strategic or tactical ballistic/cruise missile hardware.',
    color: '#ef4444', // red
    attributes: [
      { name: 'rangeKm', type: 'Number', required: true },
      { name: 'machSpeed', type: 'Number', required: true },
      { name: 'propulsionType', type: 'String', required: false }
    ],
    instanceCount: 124,
    status: 'ACTIVE'
  },
  {
    id: 'cls-3',
    name: 'RadarSystem',
    description: 'Radio detection and ranging hardware including AESA, PESA, and SAR.',
    color: '#10b981', // emerald
    attributes: [
      { name: 'frequencyBand', type: 'String', required: true },
      { name: 'detectionRange', type: 'Number', required: true }
    ],
    instanceCount: 88,
    status: 'ACTIVE'
  },
  {
    id: 'cls-4',
    name: 'Material',
    description: 'Advanced metallurgic alloy, composite ceramic, or radar absorbing material.',
    color: '#8b5cf6', // purple
    attributes: [
      { name: 'thermalLimitC', type: 'Number', required: true },
      { name: 'density', type: 'Number', required: false }
    ],
    instanceCount: 310,
    status: 'ACTIVE'
  },
  {
    id: 'cls-5',
    name: 'ThreatActor',
    description: 'External adversary radar signatures, electronic warfare emitters, or threat entities.',
    color: '#f59e0b', // amber
    attributes: [
      { name: 'threatCode', type: 'String', required: true },
      { name: 'riskRating', type: 'Enum', required: true }
    ],
    instanceCount: 45,
    status: 'ACTIVE'
  }
];

export const MOCK_INGESTION_QUEUE: IngestionPipelineItem[] = [
  {
    id: 'ing-1',
    filename: 'Agni5_Flight_Telemetry_Trial_6.pdf',
    fileType: 'TELEMETRY',
    fileSize: '18.4 MB',
    uploadDate: '2026-03-01 09:30',
    uploadedBy: 'Dr. Tessy Thomas',
    drdoLab: 'DRDL Hyderabad',
    clearance: 'LEVEL_4_TOP_SECRET',
    status: 'APPROVED',
    triplesExtracted: 24,
    confidenceScore: 0.98,
    previewSnippet: 'Flight trajectory data confirmed 3-stage motor burnout at T+320s with nominal MIRV deployment over Wheeler Island.',
    category: 'Strategic Missile Guidance',
    tags: 'Agni-V, MIRV, Flight Trajectory',
    author: 'Dr. Tessy Thomas',
    keywords: 'Agni-V, MIRV, Flight Trajectory'
  },
  {
    id: 'ing-2',
    filename: 'Uttam_AESA_GaN_TR_Module_Thermal_Loss_Report.docx',
    fileType: 'INTEL_BRIEF',
    fileSize: '6.2 MB',
    uploadDate: '2026-03-01 11:15',
    uploadedBy: 'Dr. Anita Roy',
    drdoLab: 'LRDE Bengaluru',
    clearance: 'LEVEL_3_SECRET',
    status: 'PENDING_VERIFICATION',
    triplesExtracted: 18,
    confidenceScore: 0.91,
    previewSnippet: 'GaN Transmit-Receive modules exhibited < 0.8dB insertion loss under high PRF air combat operational cycles.',
    category: 'Radar & Avionics',
    tags: 'Uttam AESA, GaN TR Module, Thermal',
    author: 'Dr. Anita Roy',
    keywords: 'Uttam AESA, GaN TR Module, Thermal'
  },
  {
    id: 'ing-3',
    filename: 'Hypersonic_Scramjet_Air_Intake_CFD_Simulations.pdf',
    fileType: 'PDF',
    fileSize: '42.1 MB',
    uploadDate: '2026-03-01 14:02',
    uploadedBy: 'Dr. V. K. Saraswat',
    drdoLab: 'DRDL Hyderabad',
    clearance: 'LEVEL_3_SECRET',
    status: 'PROCESSING',
    triplesExtracted: 0,
    confidenceScore: 0,
    previewSnippet: 'Inlet boundary layer bleeding at Mach 6.5 prevents shockwave boundary interaction inside combustor.',
    category: 'Strategic Missile Guidance',
    tags: 'Scramjet, CFD, Hypersonic',
    author: 'Dr. V. K. Saraswat',
    keywords: 'Scramjet, CFD, Hypersonic'
  },
  {
    id: 'ing-4',
    filename: 'Radar_Cross_Section_Reduction_DMRL_Nanocoatings.pdf',
    fileType: 'INTEL_BRIEF',
    fileSize: '12.8 MB',
    uploadDate: '2026-02-28 16:45',
    uploadedBy: 'Dr. Anita Roy',
    drdoLab: 'DMRL Hyderabad',
    clearance: 'LEVEL_2_CONFIDENTIAL',
    status: 'APPROVED',
    triplesExtracted: 14,
    confidenceScore: 0.96,
    previewSnippet: 'Carbon nanotube infused ceramic matrix reduced X-band specular reflection by 14.2 dB.',
    category: 'Metallurgy & Armor Materials',
    tags: 'Stealth, RCS, Nanocoatings',
    author: 'Dr. Anita Roy',
    keywords: 'Stealth, RCS, Nanocoatings'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-801',
    timestamp: '2026-03-01 15:42:10',
    user: 'Dr. V. K. Saraswat (usr-1)',
    role: 'super_admin',
    action: 'USER_CLEARANCE_MUTATION',
    resource: 'User: Lt. Cdr. Arjun Nair -> Elevated to Level 2',
    clearance: 'LEVEL_4_TOP_SECRET',
    ipAddress: '10.240.12.8',
    status: 'SUCCESS',
    details: 'Clearance level changed following defense security audit approval #DRDO-AUD-2026-88.'
  },
  {
    id: 'log-802',
    timestamp: '2026-03-01 15:30:22',
    user: 'Dr. Tessy Thomas (usr-2)',
    role: 'knowledge_admin',
    action: 'ONTOLOGY_TRIPLE_MUTATION',
    resource: 'Triple: Agni-V -> usesThermalShield -> DMRL Composite',
    clearance: 'LEVEL_4_TOP_SECRET',
    ipAddress: '10.240.18.44',
    status: 'SUCCESS',
    details: 'Verified and linked entity into DRDO core knowledge graph.'
  },
  {
    id: 'log-803',
    timestamp: '2026-03-01 14:12:05',
    user: 'Col. Rajesh Sharma (usr-3)',
    role: 'end_user',
    action: 'AI_SEMANTIC_QUERY',
    resource: 'Query: "Hypersonic RAM thermal endurance & radar signature"',
    clearance: 'LEVEL_3_SECRET',
    ipAddress: '10.240.32.19',
    status: 'SUCCESS',
    details: 'Extracted 4 knowledge nodes and generated executive report.'
  },
  {
    id: 'log-804',
    timestamp: '2026-03-01 12:08:40',
    user: 'Guest / External Subnet',
    role: 'end_user',
    action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
    resource: 'Resource: /api/ontology/top-secret-triples',
    clearance: 'LEVEL_1_RESTRICTED',
    ipAddress: '192.168.1.105',
    status: 'BLOCKED',
    details: 'Automatic RBAC guard blocked request. IP logged to DRDO Cyber Security Operations Center (CSOC).'
  }
];

export const MOCK_INTELLIGENCE_REPORTS: IntelligenceReport[] = [
  {
    id: 'rep-1',
    title: 'Hypersonic Re-entry Thermal Barrier & Ramjet Combustion Assessment',
    author: 'Dr. Tessy Thomas & DRDL Aerodynamics Wing',
    classification: 'LEVEL_4_TOP_SECRET',
    clearance: 'LEVEL_4_TOP_SECRET',
    date: '2026-02-28',
    drdoLab: 'DRDL Hyderabad',
    summary: 'Comprehensive analysis of ceramic matrix thermal protection nose cones subjected to Mach 7 flow field conditions in TBRL shock tunnel.',
    content: '### Executive Intelligence Briefing: Hypersonic Thermal Protection Systems\n\n1. Flight telemetry data from recent Agni-V and BrahMos Mk-II atmospheric re-entry trials confirm the operational viability of ultra-high temperature ceramic matrix composites (UHTCMC) developed by DMRL Hyderabad.\n2. Thermal barrier coating withstands friction temperatures up to 2,800°C without significant structural ablation.\n3. Ramjet dual-mode combustion stability verified in TBRL impulse shock tunnel at Mach 6.8.',
    linkedNodes: ['ent-1', 'ent-3', 'ent-5', 'ent-7'],
    tags: ['Hypersonic', 'Scramjet', 'Agni-V', 'Thermal Shield'],
    readsCount: 342,
    fileSize: '14.8 MB'
  },
  {
    id: 'rep-2',
    title: 'Next-Generation GaN Active Radar Transmit/Receive Module Performance',
    author: 'LRDE Radar Development Group',
    classification: 'LEVEL_3_SECRET',
    clearance: 'LEVEL_3_SECRET',
    date: '2026-02-20',
    drdoLab: 'LRDE Bengaluru',
    summary: 'Validation of Gallium Nitride (GaN) solid-state power amplifiers in Uttam AESA radar array for fighter avionics.',
    content: '### Technical Assessment: Uttam GaN AESA Transmit/Receive Array\n\n1. LRDE Bengaluru has completed operational bench tests for 780-element Gallium Nitride (GaN) T/R module array for LCA Tejas Mk-2 fighter aircraft.\n2. GaN technology increases power density by 3.5x compared to legacy GaAs modules while maintaining < 0.8dB insertion loss.\n3. Multi-beam tracking demonstrates concurrent engagement of 64 airborne targets up to 160 km.',
    linkedNodes: ['ent-4', 'ent-6', 'ent-9'],
    tags: ['AESA Radar', 'Uttam', 'Tejas Mk-2', 'Avionics'],
    readsCount: 512,
    fileSize: '8.4 MB'
  },
  {
    id: 'rep-3',
    title: 'Solid Fuel Ducted Ramjet (SFDR) Kinetic Range Optimization',
    author: 'Air Armament & Missile Cluster',
    classification: 'LEVEL_3_SECRET',
    clearance: 'LEVEL_3_SECRET',
    date: '2026-02-15',
    drdoLab: 'DRDL Hyderabad',
    summary: 'Flight trial telemetry data of Astra Mk-III air-to-air missile demonstrating no-escape zone extension beyond 180 km.',
    content: '### Telemetry Dossier: Astra Mk-III SFDR BVRAAM\n\n1. Solid Fuel Ducted Ramjet (SFDR) propulsion technology validated in flight test from Integrated Test Range (ITR) Chandipur.\n2. Missile sustained Mach 4.5 cruise across entire endgame engagement envelope, successfully expanding BVR no-escape zone to 180+ km.\n3. Active radar seeker integrated with NavIC GPS anti-jamming receiver module.',
    linkedNodes: ['ent-10', 'ent-9', 'ent-2'],
    tags: ['Astra Mk-III', 'SFDR', 'BVRAAM', 'Missile'],
    readsCount: 289,
    fileSize: '11.2 MB'
  }
];

export const MOCK_SYSTEM_METRICS: SystemMetric = {
  cpuUsage: 28,
  memoryUsage: 44,
  storageUsageGB: 1840,
  activeSessions: 38,
  queriesPerMinute: 1420,
  totalTriplesInStore: 14820,
  totalOntologyNodes: 3840,
  systemHealth: 'OPTIMAL'
};
