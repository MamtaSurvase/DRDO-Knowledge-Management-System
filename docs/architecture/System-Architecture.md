# System Architecture

## Document Information

| Project | DRDO Knowledge Management System |
|----------|---------------------------------|
| Module | System Architecture |
| Version | 1.0 |
| Status | Draft |
| Author | Samruddhi karale |

---

# 1. Purpose

This document describes the overall architecture of the DRDO Knowledge Management System. It explains how different components interact to provide secure knowledge management and AI-powered search capabilities.

---

# 2. Architecture Style

The system follows a layered architecture combined with modular design principles.

The application consists of:

- Presentation Layer
- Business Layer
- Data Access Layer
- Database Layer
- AI Layer

---

# 3. High-Level Architecture

```
                    +----------------------+
                    |      Web Client      |
                    +----------+-----------+
                               |
                         HTTPS / REST
                               |
                    +----------v-----------+
                    |    Spring Boot API   |
                    +----------+-----------+
                               |
      +------------------------+------------------------+
      |                        |                        |
+-----v------+         +-------v-------+       +--------v--------+
| PostgreSQL |         |    Neo4j      |       | AI Components   |
| Structured |         | Knowledge     |       | LangChain4j     |
| Data       |         | Graph         |       | Ollama / RAG    |
+------------+         +---------------+       +-----------------+
```

---

# 4. Architectural Layers

## Presentation Layer

Responsibilities:

- REST APIs
- HTTP Request Handling
- Response Generation
- Input Validation

Components:

- Controllers
- DTOs

---

## Business Layer

Responsibilities:

- Business Logic
- Authorization
- Validation
- AI Orchestration

Components:

- Services
- Utility Classes

---

## Data Access Layer

Responsibilities:

- Database Operations
- CRUD Operations
- Query Execution

Components:

- JPA Repositories
- Neo4j Repositories

---

## Database Layer

The project uses two databases.

### PostgreSQL

Stores:

- Users
- Roles
- Permissions
- Documents
- Metadata
- Audit Logs

### Neo4j

Stores:

- Entities
- Relationships
- Knowledge Graph

---

## AI Layer

Responsibilities

- Semantic Search
- Context Retrieval
- RAG Pipeline
- AI Response Generation

Technologies

- LangChain4j
- Ollama
- Embedding Model

---

# 5. Request Flow

A typical request follows this path:

User

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Service

↓

Controller

↓

User

---

# 6. AI Search Flow

Natural Language Query

↓

Search Service

↓

Neo4j

↓

PostgreSQL

↓

RAG

↓

LLM

↓

AI Response

---

# 7. Technology Stack

Backend

- Java 21
- Spring Boot
- Spring Security

Database

- PostgreSQL
- Neo4j

AI

- LangChain4j
- Ollama
- RAG

Build Tool

- Maven

Version Control

- Git
- GitHub

---

# 8. Advantages of the Architecture

- Modular Design
- Easy Maintenance
- Scalable
- Secure
- AI Ready
- Easy Testing
- Separation of Concerns

---

# 9. Summary

The layered architecture provides a scalable and maintainable foundation for developing the DRDO Knowledge Management System. It separates responsibilities across multiple layers while integrating AI and knowledge graph technologies.