# Contributing to Khel Setu (खेल सेतु)

First off, thank you for considering contributing to **Khel Setu**! It is through developers, designers, and sports enthusiasts like you that we can build India's premier national athletic ecosystem platform.

Please take a moment to review this guide before submitting issues or pull requests.

---

## 🧭 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Treat all contributors and users with dignity, empathy, and professional respect.

---

## 🛠️ Architecture & Engineering Guidelines

Khel Setu follows a strict **4-Tier Clean Architecture** with Feature-Driven boundaries. When contributing code, follow these principles:

### 1. Architectural Boundaries
```
Presentation (RSC / Client Components)
      │
      ▼
Application Boundary (Server Actions / API Routes + Zod Validation + Clerk Auth)
      │
      ▼
Domain Layer (Business Services + RBAC Checks)
      │
      ▼
Data Access Layer (Prisma Repositories)
      │
      ▼
PostgreSQL Database (Neon)
```

- **Server Actions:** Placed in `src/actions/`. Handle input parsing (`zod`), Clerk session verification, and forward to domain services.
- **Services:** Placed in `src/services/`. Contain pure business logic, permissions enforcement, orchestration, email notifications, and transactions.
- **Repositories:** Placed in `src/repositories/`. Isolate Prisma queries. Never execute raw DB queries inside UI components or actions directly.
- **Schemas:** Placed in `src/schemas/`. Define single-source-of-truth Zod schemas and infer TypeScript types.

### 2. React & Next.js Conventions
- **React Server Components (RSC):** Use RSC by default. Only add `"use client"` when state, effects, browser APIs, or client-side interactivity are strictly required.
- **Design System:** Use the obsidian/dark foundation (`#0A0A0A`, `#121212`) with Saffron accents (`#FF4D12`, `#F28C28`). Use display typography (`font-display` / Space Grotesk) for headlines, `font-sans` (Inter) for interface text, and `font-mono-tag` (Roboto Mono) for badges and telemetry.
- **Sound Telemetry:** For interactive buttons and key navigation actions, integrate the sound engine via `useSoundEffects()`.
- **Accessibility:** Ensure semantic HTML, proper ARIA attributes, keyboard navigation, and support for `prefers-reduced-motion`.

---

## 🌿 Branching Strategy

Follow this branch naming convention:
- `feature/<short-description>`: New user-facing features or capabilities.
- `fix/<issue-description>`: Bug fixes and patches.
- `refactor/<module-name>`: Code restructuring without functional changes.
- `docs/<topic>`: Documentation updates.
- `perf/<optimization>`: Performance improvements.

Example:
```bash
git checkout -b feature/tournament-leaderboard
```

---

## 📝 Commit Conventions

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Prefix | Description | Example |
|---|---|---|
| `feat:` | A new feature | `feat(tournaments): add live match bracket visualizer` |
| `fix:` | A bug fix | `fix(auth): handle onboarding redirect edge-case` |
| `docs:` | Documentation changes | `docs(readme): update environment setup instructions` |
| `style:` | Formatting, missing semi-colons, etc. | `style(ui): align badge crosshair borders` |
| `refactor:`| Code restructuring without feature change | `refactor(schemas): unify common validation primitives` |
| `perf:` | Performance enhancement | `perf(athletes): optimize database query pagination` |
| `chore:` | Build tasks, package updates | `chore(deps): update prisma to latest patch` |

---

## 🚀 Local Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/khel-setu.git
   cd khel-setu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Fill in your Clerk, Neon DB, and Cloudinary keys
   ```

4. **Initialize database schema & seeds:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

---

## 🧪 Pre-Flight Quality Checks

Before pushing your changes or opening a PR, ensure all checks pass:

```bash
# 1. Typecheck TypeScript contracts
npm run typecheck

# 2. Lint and format validation
npm run lint

# 3. Production build verification
npm run build
```

---

## 📬 Submitting a Pull Request (PR)

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request targeting the `main` branch.
3. Complete the PR template describing:
   - Motivation and context for changes
   - Detailed list of updates
   - Screenshots or recordings for UI changes
   - Verification steps tested
4. A maintainer will review your submission and guide you through any requested adjustments.
