# Actors and Roles

## Document Information

| Project | DRDO Knowledge Management System |
|----------|---------------------------------|
| Module | Actors and Roles |
| Version | 1.0 |
| Status | Draft |
| Author | Samruddhi Somvanshi |

---

# 1. Purpose

This document defines all actors interacting with the DRDO Knowledge Management System, their responsibilities, permissions, and accessible features.

---

# 2. System Actors

The system consists of four primary actors:

- Administrator
- Knowledge Manager
- Researcher
- Employee

---

# 3. Actor Details

## A-01 Administrator

### Description

The Administrator manages the entire system and has unrestricted access to all modules.

### Responsibilities

- Manage Users
- Assign Roles
- Manage Permissions
- Configure System
- View Audit Logs
- Monitor System
- Manage Documents
- Manage Knowledge Graph

### Accessible Features

- Authentication
- User Management
- Role Management
- Document Management
- Metadata Management
- Knowledge Graph
- AI Search
- Dashboard
- Administration
- Audit Logging

---

## A-02 Knowledge Manager

### Description

Responsible for organizing and maintaining organizational knowledge.

### Responsibilities

- Upload Documents
- Update Documents
- Delete Documents
- Manage Metadata
- Create Knowledge Graph Entities
- Create Relationships
- Verify Knowledge

### Accessible Features

- Authentication
- Document Management
- Metadata Management
- Knowledge Graph
- AI Search
- Dashboard

---

## A-03 Researcher

### Description

Researches organizational knowledge and retrieves information.

### Responsibilities

- Search Knowledge
- View Documents
- Download Documents
- Ask AI Questions
- Browse Knowledge Graph

### Accessible Features

- Authentication
- AI Search
- Document Search
- Knowledge Graph
- Dashboard

---

## A-04 Employee

### Description

General user of the system.

### Responsibilities

- Login
- Search Documents
- View Documents
- Ask AI Questions

### Accessible Features

- Authentication
- AI Search
- Document Search

---

# 4. Role Permission Matrix

| Feature | Admin | Knowledge Manager | Researcher | Employee |
|---------|:-----:|:-----------------:|:----------:|:--------:|
| Login | ✅ | ✅ | ✅ | ✅ |
| User Management | ✅ | ❌ | ❌ | ❌ |
| Role Management | ✅ | ❌ | ❌ | ❌ |
| Upload Document | ✅ | ✅ | ❌ | ❌ |
| Update Document | ✅ | ✅ | ❌ | ❌ |
| Delete Document | ✅ | ✅ | ❌ | ❌ |
| View Document | ✅ | ✅ | ✅ | ✅ |
| Download Document | ✅ | ✅ | ✅ | ✅ |
| Manage Metadata | ✅ | ✅ | ❌ | ❌ |
| Manage Knowledge Graph | ✅ | ✅ | ❌ | ❌ |
| AI Search | ✅ | ✅ | ✅ | ✅ |
| Dashboard | ✅ | ✅ | ✅ | ❌ |
| Audit Logs | ✅ | ❌ | ❌ | ❌ |
| System Configuration | ✅ | ❌ | ❌ | ❌ |

---

# 5. Spring Security Roles

The backend application will define the following roles:

```

ROLE_ADMIN
ROLE_KNOWLEDGE_MANAGER
ROLE_RESEARCHER
ROLE_EMPLOYEE

```

Each authenticated user will be assigned one or more of these roles.

---

# 6. Database Mapping

The following database entities will support role management:

- User
- Role
- Permission
- UserRole

These entities will be implemented using PostgreSQL.

---

# 7. API Authorization

Examples of endpoint access:

| API | Authorized Roles |
|-----|------------------|
| POST /api/auth/login | Public |
| POST /api/users | Administrator |
| GET /api/users | Administrator |
| POST /api/documents | Administrator, Knowledge Manager |
| PUT /api/documents | Administrator, Knowledge Manager |
| DELETE /api/documents | Administrator, Knowledge Manager |
| GET /api/documents | All Authenticated Users |
| POST /api/search | All Authenticated Users |
| GET /api/dashboard | Administrator, Knowledge Manager, Researcher |
| GET /api/admin/logs | Administrator |

---

# 8. Summary

This document defines the actors, responsibilities, permissions, and authorization model of the DRDO Knowledge Management System. These definitions will guide database design, Spring Security configuration, and REST API authorization.