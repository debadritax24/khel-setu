# Khel Setu (खेल सेतु)

> **One Platform. Every Athlete. Every Opportunity.**  
> India's premier national sports ecosystem platform uniting athletes, coaches, schools, academies, tournament organizers, and sponsors into a unified digital network.

---

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Design System & UI Experience](#design-system--ui-experience)
- [Key Modules & Capabilities](#key-modules--capabilities)
- [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
- [Directory Structure](#directory-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database & Seed Data](#database--seed-data)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**Khel Setu** bridges grassroots Indian sports with competitive opportunities, scouts, and corporate sponsorships. Built with Next.js 15, React 19, TypeScript, Prisma v6, and Neon PostgreSQL, it provides:

- Verified athlete profiles, stats, and achievements portfolios.
- Full tournament lifecycle management (registration, scheduling, brackets, certificates).
- School and sports academy management portals.
- Sponsor marketplace connecting emerging talent with brand support.
- Real-time communication and in-app/email notification pipelines.

---

## 🏛️ System Architecture

Khel Setu follows a **4-Tier Clean Architecture** with Feature-Driven boundaries:

```
┌────────────────────────────────────────────────────────┐
│  Presentation Layer (Next.js 15 App Router + RSC)     │
│  - Route Groups: (auth), (main)                       │
│  - UI: shadcn/ui, Radix, Tailwind CSS v4, Framer      │
└──────────────────────────┬─────────────────────────────┘
                           │ User Interaction / Form Submit
┌──────────────────────────▼─────────────────────────────┐
│  Application Boundary (Server Actions & API Routes)    │
│  - Session Authentication & RBAC (Clerk)               │
│  - Input Parsing & Sanitization (Zod Schemas)          │
└──────────────────────────┬─────────────────────────────┘
                           │ Validated Payload
┌──────────────────────────▼─────────────────────────────┐
│  Domain Service Layer                                  │
│  - Business logic, authorization rules, invariants     │
│  - Event dispatch (Email notifications, Audit trails)  │
└──────────────────────────┬─────────────────────────────┘
                           │ Domain Queries & Commands
┌──────────────────────────▼─────────────────────────────┐
│  Data Access Layer (Repositories + Prisma v6)          │
│  - Isolated query models and transaction management    │
└──────────────────────────┬─────────────────────────────┘
                           │ SQL / Connection Pool
┌──────────────────────────▼─────────────────────────────┐
│  Infrastructure Layer                                  │
│  - Neon Serverless PostgreSQL                          │
│  - Cloudinary CDN (Media & Documents)                  │
│  - Nodemailer SMTP (Transactional Notifications)       │
└────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System & UI Experience

Designed with high-octane sports performance aesthetics and Indian athletic identity:

### Color Palette & Theme Engine
- **Obsidian Dark & Crisp Light Modes:** Built-in `next-themes` theme provider with full light and dark mode toggling.
- **Electric Flame & Saffron Accents (`#FF4D12`, `#F28C28`):** High-energy visual hierarchy highlighting active tournaments, key actions, and state transitions.
- **Precision Grid & Crosshairs:** Subtle architectural borders (`rgba(255, 255, 255, 0.1)`) delivering an international high-performance feel.

### Typography Hierarchy
- **Display Headings:** **Space Grotesk** — bold, dominant, geometric display type for hero headlines and section headers.
- **Interface & Body:** **Inter** — clear, balanced sans-serif optimized for tabular data and responsive viewports.
- **Telemetry Badges:** **Roboto Mono** — monospaced counters, timestamp coordinates, and verified status badges (`[ 01 // OVERVIEW ]`, `STATUS: VERIFIED`).

### Audio Telemetry
- Integrated Web Audio sound engine providing subtle feedback on primary actions, interactive elements, and navigation switches.

---

## ⚡ Key Modules & Capabilities

1. **🏆 Tournament Lifecycle Management**
   - End-to-end tournament creation: registration windows, entry fees, eligibility, rules, bracket scheduling, and match results.
   - Live filters by Indian state, city, sport category, and tournament status (`REGISTRATION_OPEN`, `ONGOING`, `COMPLETED`).

2. **🎖️ Digital Achievements & Portfolio**
   - Verified athlete record books tracking national, state, and district medals, awards, and records.

3. **📜 Automated Digital Certificate Verification**
   - Automated issuance of digital certificates with cryptographically verifiable QR codes and unique verification codes.

4. **🤝 Sponsor Marketplace**
   - Direct sponsorship request workflow connecting brands with athletes and tournaments. Filter by budget, tier, and target sports.

5. **💬 Real-Time Messaging**
   - Integrated communication channel between athletes, certified coaches, and sponsors.

6. **🗺️ Interactive Geographic Discovery**
   - Map-based venue exploration via Leaflet for finding local sports infrastructure, academies, and tournaments across Indian states.

7. **🔔 Notification Engine**
   - Multi-channel alerts (transactional email via Nodemailer + in-app notification center) for registration updates, match alerts, and sponsorship proposals.

---

## 👥 Role-Based Access Control (RBAC)

The platform supports 5 distinct role personas:

| Role | Primary Capabilities |
|---|---|
| `SUPER_ADMIN` | Platform oversight, system audits, user verification, tournament approvals, comprehensive telemetry. |
| `SCHOOL_ADMIN` | Student-athlete roster management, team registrations, school facility profiles, institutional achievement records. |
| `COACH` | Training roster management, athlete evaluations, scouting insights, direct messaging with athletes and sponsors. |
| `ATHLETE` | Personal athletic passport, competition entries, performance telemetry, achievement showcase, sponsorship discovery. |
| `SPONSOR` | Opportunity exploration, athlete sponsorship proposals, tournament partnerships, branding asset management. |

---

## 📂 Directory Structure

A clean, modular layout following senior software development practices:

```
khel-setu/
├── .env.example              # Documented environment variable template
├── ARCHITECTURE.md           # Deep-dive system architecture specifications
├── CONTRIBUTING.md           # Engineering guidelines, git workflow, and conventions
├── DEPLOYMENT.md             # Production deployment manual (Vercel, Neon, Clerk)
├── README.md                 # Project documentation and quickstart
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js 15 runtime and build settings
├── package.json              # Dependencies, build scripts, and Prisma seed config
├── tsconfig.json             # TypeScript compiler options and path aliases (@/*)
│
├── prisma/
│   ├── schema.prisma         # Relational database schema with enums, models, indexes
│   ├── seed.ts               # Prisma CLI seed entrypoint (npx prisma db seed)
│   └── migrations/           # Versioned SQL migration history
│
├── scripts/
│   └── seed-platform.ts      # Comprehensive seed script for demo data across sports
│
└── src/
    ├── actions/              # Next.js Server Actions (Mutation & Query boundary)
    │   ├── achievement.actions.ts
    │   ├── athlete.actions.ts
    │   ├── tournament.actions.ts
    │   └── ...
    ├── app/                  # Next.js App Router (Layouts & Pages)
    │   ├── (auth)/           # Public auth routes (login, sign-up, onboarding)
    │   ├── (main)/           # Authenticated application views
    │   │   ├── athletes/
    │   │   ├── dashboard/    # Role-specialized dashboard views
    │   │   ├── sports/       # Sport category explorer
    │   │   ├── tournaments/
    │   │   └── ...
    │   ├── api/              # API Route Handlers (Uploads, Clerk Webhooks)
    │   ├── globals.css       # Design tokens, Tailwind CSS v4, custom utility classes
    │   └── layout.tsx        # Root HTML layout with providers and fonts
    ├── components/
    │   ├── layout/           # Header, Footer, Sidebar, PageHeader, ThemeToggle
    │   ├── sections/         # Landing page sections (Hero, Bento Grid, Stats, FAQ, CTA)
    │   ├── shared/           # Reusable data table, search inputs, pagination, empty states
    │   └── ui/               # Radix UI and shadcn primitives (Button, Card, Dialog, etc.)
    ├── config/               # App metadata, environment configuration, pagination limits
    ├── constants/            # Sports categories, Indian states, navigation menus, roles
    ├── emails/               # Transactional HTML email templates
    ├── lib/                  # Singletons (Prisma client, Cloudinary, Sound, Auth, Utils)
    ├── providers/            # Client context providers (Theme, Toast, SoundEffects)
    ├── repositories/         # Data Access Layer (Prisma database queries)
    ├── schemas/              # Unified Zod validation schemas & inferred types
    │   ├── common.schema.ts  # Primitives, pagination, IDs, search inputs
    │   ├── tournament.schema.ts
    │   └── ...
    ├── services/             # Business Logic Layer (Authorization, transactions, events)
    ├── types/                # Core TypeScript contracts and domain models
    └── validators/           # Backward-compatible re-export barrel for schemas
```

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15 (React 19)**: App Router with React Server Components (RSC) and Server Actions.
- **TypeScript 5.7**: Strict type-checking and interface guarantees.

### Presentation & Styling
- **Tailwind CSS v4**: PostCSS integration, design tokens, utility classes.
- **Radix UI & shadcn/ui**: Accessible UI primitives (Dialog, Dropdown, Tabs, Accordion).
- **Framer Motion**: Staggered animations, layout transitions, reduced-motion support.
- **next-themes**: Dark/Light theme switching with zero flash of unstyled content.
- **Lucide React**: Vector iconography.
- **Leaflet & React Leaflet**: Interactive map rendering for sports venues.

### Data & Backend
- **Prisma ORM v6**: Type-safe database queries, migrations, and relationship handling.
- **Neon Serverless PostgreSQL**: High-performance cloud database with connection pooling.
- **Clerk**: Authentication, session tokens, user metadata, and webhook sync.
- **Cloudinary**: Cloud media storage and asset optimization.
- **Nodemailer**: SMTP transactional email delivery.
- **Zod**: Runtime data validation across form inputs and Server Action boundaries.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20+** (LTS recommended)
- **npm**, **pnpm**, or **yarn**
- **Neon PostgreSQL** database account (or any PostgreSQL 14+ instance)
- **Clerk** account for user authentication
- **Cloudinary** account for image uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/khel-setu.git
   cd khel-setu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your credentials (database URL, Clerk keys, Cloudinary credentials, and SMTP details).

4. **Initialize database schema and seed data:**
   ```bash
   # Push schema to PostgreSQL
   npm run db:push

   # Generate Prisma client
   npm run db:generate

   # Seed platform with initial tournaments, athletes, and categories
   npm run db:seed
   ```

5. **Start local development server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database & Seed Data

The database schema (`prisma/schema.prisma`) models the complete sports ecosystem:

- **Users & Identities:** `User`, `Athlete`, `School`, `Coach`, `Sponsor`
- **Tournaments & Matches:** `Tournament`, `TournamentRegistration`, `Match`
- **Athletic Portfolio:** `Performance`, `Achievement`, `Certificate`, `Gallery`
- **Ecosystem Interactions:** `Sponsorship`, `Message`, `Notification`
- **Compliance & Security:** `AuditLog`

### Seeding
Run `npm run db:seed` (or `npx prisma db seed`) to populate:
- Verified tournaments across major Indian sports (Cricket, Badminton, Athletics, Football, Kabaddi).
- Pre-configured schools, sports facilities, and organizers.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Launches local development server on port 3000 |
| `npm run build` | Compiles production-optimized build |
| `npm run start` | Boots production server |
| `npm run lint` | Runs ESLint analysis across the project |
| `npm run typecheck` | Validates TypeScript contracts without emitting files |
| `npm run db:generate` | Generates type-safe Prisma Client from schema |
| `npm run db:push` | Synchronizes Prisma schema directly with the database |
| `npm run db:migrate` | Runs Prisma development migrations |
| `npm run db:studio` | Opens interactive Prisma Studio database viewer |
| `npm run db:seed` | Populates database with national sports fixtures and data |

---

## 🔐 Environment Variables

Refer to [`.env.example`](file:///.env.example) for the complete annotated configuration. Core variables:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical domain URL (e.g. `http://localhost:3000`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string (Neon DB) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk client-side publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk backend authentication secret |
| `CLERK_WEBHOOK_SECRET` | Optional | Webhook verification secret for user sync |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `EMAIL_HOST` / `EMAIL_USER` / `EMAIL_PASS` | Optional | SMTP credentials for transactional emails |

---

## 🚢 Deployment

Khel Setu is built for seamless deployment on **Vercel** with serverless compute:

1. Import your repository into Vercel.
2. Add all environment variables from `.env.example`.
3. Set the build command to `next build` and output directory to default.
4. Run migrations with `npm run db:push` or configure CI/CD migration triggers.

For detailed production instructions, consult [`DEPLOYMENT.md`](file:///DEPLOYMENT.md).

---

## 🤝 Contributing

We welcome contributions from the community. Please read [`CONTRIBUTING.md`](file:///CONTRIBUTING.md) for branch naming conventions, commit formats, and the PR review process.

---

## 📄 License

This project is licensed under the MIT License — see the project repository for full terms.  
© 2026 Khel Setu. All rights reserved.
