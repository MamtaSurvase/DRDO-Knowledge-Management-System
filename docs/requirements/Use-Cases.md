# Use Case Specification

## Document Information

| Project | DRDO Knowledge Management System |
|----------|---------------------------------|
| Module | Use Cases |
| Version | 1.0 |
| Status | Draft |
| Author | Samruddhi Somvanshi |

---

# 1. Purpose

This document defines the interactions between users (actors) and the DRDO Knowledge Management System. These use cases describe how each actor achieves specific goals using the system.

---

# UC-01 User Login

## Primary Actor

All Users

## Description

The user logs into the system using valid credentials.

## Preconditions

- User account exists.
- User account is active.

## Main Flow

1. User opens login page.
2. User enters email and password.
3. System validates credentials.
4. JWT token is generated.
5. User is redirected to the dashboard.

## Alternative Flow

- Invalid credentials
- Inactive account

## Postconditions

- User is authenticated.
- JWT token is issued.

## Related Functional Requirement

FR-01

---

# UC-02 Upload Document

## Primary Actor

Administrator

Knowledge Manager

## Description

Authorized users upload organizational documents.

## Preconditions

- User is authenticated.
- User has upload permission.

## Main Flow

1. User selects Upload Document.
2. User chooses a file.
3. User enters metadata.
4. System validates document.
5. Document is stored.
6. Metadata is saved.
7. Success message displayed.

## Alternative Flow

- Invalid file format
- Missing metadata
- Upload failure

## Postconditions

- Document stored successfully.
- Metadata saved.

## Related Functional Requirement

FR-04
FR-05

---

# UC-03 Search Knowledge

## Primary Actor

All Users

## Description

Users search organizational knowledge using natural language.

## Preconditions

- User is authenticated.

## Main Flow

1. User enters query.
2. System processes query.
3. Search service retrieves relevant data.
4. AI generates contextual response.
5. Results displayed.

## Alternative Flow

- No relevant information found.
- AI service unavailable.

## Postconditions

- Search history recorded.

## Related Functional Requirement

FR-07

---

# UC-04 Manage Users

## Primary Actor

Administrator

## Description

Administrator manages user accounts.

## Preconditions

- Administrator logged in.

## Main Flow

1. Open User Management.
2. View users.
3. Add, update, or deactivate user.
4. Save changes.

## Alternative Flow

- Duplicate email.
- Invalid role.

## Postconditions

- User information updated.

## Related Functional Requirement

FR-02

---

# UC-05 Manage Knowledge Graph

## Primary Actor

Knowledge Manager

Administrator

## Description

Manage entities and relationships within the knowledge graph.

## Preconditions

- User has graph management permission.

## Main Flow

1. Select entity.
2. Create or update relationship.
3. Save graph changes.

## Alternative Flow

- Entity not found.
- Duplicate relationship.

## Postconditions

- Knowledge graph updated.

## Related Functional Requirement

FR-06

---

# UC-06 View Dashboard

## Primary Actor

Administrator

Knowledge Manager

Researcher

## Description

View dashboard statistics.

## Preconditions

- User authenticated.

## Main Flow

1. Login.
2. Open Dashboard.
3. Dashboard retrieves statistics.
4. Display charts and metrics.

## Postconditions

- Dashboard displayed successfully.

## Related Functional Requirement

FR-08

---

# UC-07 View Audit Logs

## Primary Actor

Administrator

## Description

Administrator reviews system activity logs.

## Preconditions

- Administrator authenticated.

## Main Flow

1. Open Audit Logs.
2. Filter logs.
3. View activity details.

## Postconditions

- Logs displayed.

## Related Functional Requirement

FR-10

---

# Use Case Summary

| Use Case ID | Use Case | Primary Actor |
|--------------|--------------------------|----------------|
| UC-01 | User Login | All Users |
| UC-02 | Upload Document | Admin, Knowledge Manager |
| UC-03 | Search Knowledge | All Users |
| UC-04 | Manage Users | Administrator |
| UC-05 | Manage Knowledge Graph | Admin, Knowledge Manager |
| UC-06 | View Dashboard | Admin, Knowledge Manager, Researcher |
| UC-07 | View Audit Logs | Administrator |

---

# Traceability Matrix

| Use Case | Functional Requirement |
|-----------|------------------------|
| UC-01 | FR-01 |
| UC-02 | FR-04, FR-05 |
| UC-03 | FR-07 |
| UC-04 | FR-02 |
| UC-05 | FR-06 |
| UC-06 | FR-08 |
| UC-07 | FR-10 |

---

# Summary

These use cases describe the primary interactions between users and the system. They provide the foundation for REST API design, controller implementation, service logic, and testing.