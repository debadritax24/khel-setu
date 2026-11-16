# System Architecture

## 1. Overview & Architectural Principles

Khel Setu (खेल सेतु) is architected around **Clean Architecture**, **Domain-Driven Design (DDD)** principles, and **Feature-Driven Development (FDD)**, paired with a sports-tech design system and Web Audio telemetry.

### Core Architectural Principles
- **Separation of Concerns:** Distinct boundaries between Presentation, Application Ingress, Business Domain, and Data Persistence.
- **Dependency Inversion:** High-level domain services depend on abstracted repository contracts rather than raw database drivers.
- **Single Source of Truth:** Data models are derived from the relational schema in `prisma/schema.prisma`, with runtime boundaries enforced by unified Zod schemas in `src/schemas/`.
- **Fail-Fast Validation:** Every incoming mutation payload is validated at the application boundary via Zod before business logic executes.
- **Strict RBAC Enforcement:** Authentication state and role authorizations are verified on every Server Action and layout transition.

---

## 2. Multi-Tier Layer Architecture

```
┌────────────────────────────────────────────────────────┐
│               PRESENTATION LAYER (RSC & UI)             │
│  - Next.js 15 App Router: (auth) and (main) route groups │
│  - React Server Components (RSC) by default            │
│  - Interactive Client Components with "use client"     │
│  - Design System: Space Grotesk, Inter, Roboto Mono    │
│  - Sound Engine: Web Audio API sound telemetry         │
└──────────────────────────┬─────────────────────────────┘
                           │ (Server Action Call / Form Submit)
┌──────────────────────────▼─────────────────────────────┐
│          APPLICATION LAYER (BOUNDARY & VALIDATION)      │
│  - Next.js Server Actions (src/actions/)               │
│  - Webhook Ingress & File Streaming (src/app/api/)     │
│  - Clerk Session & Identity Resolution (src/lib/auth)  │
│  - Zod Request Schema Validation (src/schemas/)        │
└──────────────────────────┬─────────────────────────────┘
                           │ (Validated Request Payload + Auth Context)
┌──────────────────────────▼─────────────────────────────┐
│               DOMAIN SERVICES LAYER                    │
│  - Pure Business Logic (src/services/)                 │
│  - Role-Based Access Control (RBAC) Permissions        │
│  - Business Invariant & State Transition Validation    │
│  - Cross-domain Orchestration & Transactions           │
│  - Event Dispatch: Nodemailer SMTP & Audit Logging     │
└──────────────────────────┬─────────────────────────────┘
                           │ (Repository Query / Mutation Commands)
┌──────────────────────────▼─────────────────────────────┐
│             DATA ACCESS LAYER (REPOSITORIES)           │
│  - Repository Pattern (src/repositories/)              │
│  - Isolated Prisma v6 Queries & Relation Includes      │
│  - Query Filters, Pagination, & Sorting Normalization  │
└──────────────────────────┬─────────────────────────────┘
                           │ (SQL over TLS / Connection Pool)
┌──────────────────────────▼─────────────────────────────┐
│                   PERSISTENCE LAYER                    │
│  - Neon Serverless PostgreSQL Database                 │
│  - Cloudinary CDN (Images, Certificates, Media)        │
└────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Layer Responsibilities

### 3.1 Presentation Layer (`src/app/`, `src/components/`, `src/providers/`)
- **Server Components:** Default execution mode. Pre-renders pages on the server, reads cached data directly, and sends zero JavaScript bundle weight to the browser for static sections.
- **Client Components:** Reserved for interactive widgets, form controls, audio triggers, modal dialogs, and animated sections.
- **Design Tokens & Theme:** Tailwind CSS v4 `@theme` mappings, obsidian/saffron athletic palette, with `next-themes` delivering dark/light mode toggling.
- **Audio Feedback Engine (`src/lib/sound.ts`, `src/providers/sound-provider.tsx`):** Synthesizes subtle Web Audio frequencies for hover, click, success, and alert telemetry without external audio file loading overhead.

### 3.2 Application Boundary Layer (`src/actions/`, `src/app/api/`)
- **Server Actions:** Form the primary RPC boundary. Each action executes on the server and performs:
  1. Identity extraction via `requireCurrentUser()` or `requireRole()`.
  2. Input parsing with strict Zod schemas from `src/schemas/`.
  3. Delegation to the corresponding domain service.
  4. Response shaping via `ApiResponse<T>` with consistent `{ success, data, error }` semantics.
- **Route Handlers:** Handles third-party webhook ingest (`/api/webhooks/clerk`) with cryptographic signature validation (`svix`) and file streaming (`/api/upload`).

### 3.3 Domain Service Layer (`src/services/`)
- Encapsulates all domain rules, state machines (e.g. `TournamentStatus` flow: `DRAFT` → `REGISTRATION_OPEN` → `REGISTRATION_CLOSED` → `ONGOING` → `COMPLETED`), and access permissions.
- Dispatches transactional emails (certificate issuance, registration receipts, sponsor invites) via `src/lib/email.ts`.
- Emits system audit log records via `auditService` for security-sensitive actions.

### 3.4 Data Access Layer (`src/repositories/`)
- Functional repositories that encapsulate all Prisma Client interactions (`prisma.<entity>.findMany`, `create`, `update`, `delete`).
- Standardizes pagination schemas through `PaginationInput` and returns structured `{ data, pagination }` envelopes.
- Keeps domain services free of ORM-specific query building and raw database nuances.

---

## 4. End-to-End Data Flow

```
[Browser / UI Component]
         │
         │ 1. Triggers Server Action (e.g., registerForTournamentAction)
         ▼
[Server Action Boundary]
         │
         ├── 2. Clerk Auth: Verify user session & extract current user
         ├── 3. Zod Schema: Parse and sanitize input payload
         ▼
[Domain Service (e.g. TournamentService)]
         │
         ├── 4. Authorize: Verify athlete role & check registration deadline
         ├── 5. Capacity Check: Validate participant capacity not exceeded
         ├── 6. Business Transaction: Execute registration via Repository
         ├── 7. Audit Log: Log registration event to AuditLog table
         ├── 8. Notifications: Trigger email receipt & in-app alert
         ▼
[Repository (e.g. TournamentRepository)]
         │
         ├── 9. Prisma Client: Execute type-safe SQL query against Neon DB
         ▼
[PostgreSQL Database (Neon)]
```

---

## 5. Security & RBAC Specifications

### Role Matrix
| Role | Access Scope |
|---|---|
| `SUPER_ADMIN` | Global platform administration, verification of schools/coaches, dispute handling, audit inspections. |
| `SCHOOL_ADMIN` | Management of school entity, facility details, student-athlete rosters, institutional entries. |
| `COACH` | Management of coaching credentials, assigned athlete training logs, scouting recommendations. |
| `ATHLETE` | Personal passport profile, tournament registration, achievement portfolio, message inbox. |
| `SPONSOR` | Sponsorship marketplace discovery, sponsorship proposal dispatch, brand alignment metrics. |

### Security Measures
- **Clerk Identity & Webhook Synchronization:** Cryptographic signature verification using SVIX headers ensures user records remain tamper-proof.
- **Strict Input Validation:** All Server Action payloads are parsed with Zod before reaching domain code, preventing parameter tampering.
- **CSRF & Injection Mitigation:** Server Actions use native Next.js token protection; Prisma parameterizes all queries preventing SQL injection.
- **Audit Logging:** Administrative actions, role escalations, and status transitions are recorded in `AuditLog` with actor ID, timestamp, and metadata.
