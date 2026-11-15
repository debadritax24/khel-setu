# Architecture

## Overview

Khel Setu follows a clean architecture approach with Feature-Driven Development (FDD), paired with a high-performance design system inspired by **The Performance Lab** (`theperformancelab.ca`).

## Principles

- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Clean Architecture** - Strict separation of concerns between presentation, application, domain, and data layers
- **Repository Pattern** - Abstracted, isolated database queries through functional repositories
- **Service Layer** - Centralized business logic, authorization, and validation isolation
- **Feature-Driven Domain** - Domain logic organized around athletic entities (Tournaments, Athletes, Schools, Coaches, Sponsors)

---

## Architectural Layers

### 1. Presentation & Design System Layer
- **App Router:** Next.js 15 route groups (`(auth)` and `(main)`)
- **Typography:**
  - Display / Editorial: `Space Grotesk` (`--font-space-grotesk`)
  - Interface / Body: `Inter` (`--font-inter`)
  - Telemetry / Protocol Tags: `Roboto Mono` (`--font-roboto-mono`)
- **Design System:**
  - Obsidian Dark Foundation (`#0A0A0A`, `#121212`)
  - Electric Athletic Saffron / Flame (`#FF4D12`, `#F28C28`)
  - Tailwind CSS v4 `@theme` with custom color mappings and glassmorphic utilities
- **Motion & Interactions:**
  - Framer Motion staggered reveals and spring animations
  - Active navigation indicators and dynamic scroll header (`scrolled` detection)
  - Full accessibility compliance with `@media (prefers-reduced-motion: reduce)`

### 2. Application Layer (Boundary)
- **Next.js Server Actions:** Frontend API boundary with built-in Clerk authentication validation
- **API Routes:** Webhook ingress (`/api/webhooks/clerk`) and file streaming endpoints (`/api/upload`)
- **Zod Validation:** Strict input parsing and schema verification on every action

### 3. Domain Layer
- **Services:** Pure business logic handling permissions, transactions, and notification triggers
- **Repositories:** Direct data access layer interfacing with Prisma Client
- **Types & Enums:** Shared TypeScript contracts derived from Prisma schema and business models

### 4. Infrastructure & Integration Layer
- **Database:** Serverless PostgreSQL via Neon DB
- **ORM:** Prisma v6 with automated migrations and connection pooling
- **Authentication:** Clerk RBAC (Super Admin, School Admin, Athlete, Coach, Sponsor)
- **Media Delivery:** Cloudinary CDN for sports photography and certificates
- **Email Dispatch:** SMTP / Nodemailer transactional templates

---

## Data Flow

```
[UI Component / Page]
        │
        ▼ (Interactive Form / Event)
[Server Action / API Route] ── (Zod Validation & Clerk Auth Check)
        │
        ▼
[Domain Service] ───────────── (Business Rules & RBAC Permissions)
        │
        ▼
[Repository] ───────────────── (Prisma ORM Queries)
        │
        ▼
[PostgreSQL (Neon)]
```

---

## Security & Reliability

- **Clerk Authentication & Webhooks:** Tamper-proof user identity and role assignment
- **Role-Based Access Control (RBAC):** Strict policy enforcement in Server Actions and layouts
- **Input Validation:** Zod schemas applied before reaching database queries
- **Data Protection:** Sanitized email templates and secure URL generation
- **Rate Limiting & CSRF:** Native Next.js 15 CSRF protection on Server Actions
