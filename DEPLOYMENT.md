# Production Deployment Runbook

This guide details the end-to-end procedure for deploying **Khel Setu (खेल सेतु)** to production using **Vercel**, **Neon Serverless PostgreSQL**, **Clerk Authentication**, and **Cloudinary**.

---

## 🏗️ Production Topology

```
                  ┌──────────────────────┐
                  │    DNS / Cloudflare  │
                  └──────────┬───────────┘
                             │ HTTPS / TLS
                  ┌──────────▼───────────┐
                  │   Vercel Edge Network │
                  │  (Next.js 15 Server) │
                  └──────┬────────┬──────┘
                         │        │
           ┌─────────────┘        └─────────────┐
           ▼                                    ▼
┌───────────────────────┐            ┌───────────────────────┐
│ Neon Serverless DB    │            │ Cloudinary CDN        │
│ (PostgreSQL Pooler)   │            │ (Media & Badges)      │
└───────────────────────┘            └───────────────────────┘
           │                                    │
           ▼                                    ▼
┌───────────────────────┐            ┌───────────────────────┐
│ Clerk Identity        │            │ SMTP Mail Server      │
│ (Auth & User Sync)    │            │ (Nodemailer Pipeline) │
└───────────────────────┘            └───────────────────────┘
```

---

## 1. Prerequisites

Before beginning deployment, ensure you have:
- An active [Vercel](https://vercel.com) account.
- A [Neon Database](https://neon.tech) project with a PostgreSQL instance.
- A [Clerk](https://clerk.com) production application.
- A [Cloudinary](https://cloudinary.com) account.
- An SMTP service provider (e.g., Google Workspace, Amazon SES, SendGrid, Resend).

---

## 2. Environment Variables Configuration

Configure the following environment variables in your Vercel Project Settings under **Settings > Environment Variables**:

| Variable Name | Environment | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Production | Canonical domain (e.g. `https://khelsetu.com`) |
| `DATABASE_URL` | Production | Neon connection string with pooled connection and SSL mode (`sslmode=require`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Production | Clerk production publishable key (`pk_live_...`) |
| `CLERK_SECRET_KEY` | Production | Clerk production secret key (`sk_live_...`) |
| `CLERK_WEBHOOK_SECRET` | Production | Signing secret for the Clerk webhook (`whsec_...`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Production | `/login` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Production | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Production | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Production | `/onboarding` |
| `CLOUDINARY_CLOUD_NAME` | Production | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | Production | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Production | Cloudinary API secret |
| `EMAIL_HOST` | Production | SMTP host (e.g., `smtp.gmail.com` or `smtp.sendgrid.net`) |
| `EMAIL_PORT` | Production | SMTP port (`587` or `465`) |
| `EMAIL_USER` | Production | SMTP username/email address |
| `EMAIL_PASS` | Production | SMTP password or App Password |
| `EMAIL_FROM` | Production | Default sender header (e.g., `Khel Setu <noreply@khelsetu.com>`) |

---

## 3. Database Setup & Migration

### Neon Connection Pooling
When connecting Next.js serverless functions to PostgreSQL, always utilize Neon's pooled connection string to prevent connection exhaustion. The connection string format should resemble:

```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.[region].aws.neon.tech/[dbname]?sslmode=require"
```

### Applying Schema to Production
Before the application boots for the first time, apply the database schema:

```bash
# Generate the Prisma client
npx prisma generate

# Apply pending migrations or push schema
npx prisma db push

# (Optional) Seed platform metadata and initial sports fixtures
npx prisma db seed
```

---

## 4. Clerk Production Webhook Configuration

To synchronize Clerk user events (creation, update, deletion) with the internal `User` table:

1. Open your **Clerk Dashboard > Webhooks**.
2. Click **Add Endpoint**.
3. Set the **Endpoint URL** to:
   ```
   https://yourdomain.com/api/webhooks/clerk
   ```
4. Subscribe to the following events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy the **Signing Secret** and assign it to `CLERK_WEBHOOK_SECRET` in your Vercel project environment variables.

---

## 5. Deploying via Vercel

### Step-by-Step Deployment
1. Connect your GitHub repository to Vercel.
2. Select **Next.js** as the framework preset.
3. Verify the build commands:
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
4. Add all environment variables listed in Section 2.
5. Click **Deploy**.

### Custom Domain & DNS
1. Under **Project Settings > Domains**, enter your production domain (e.g., `khelsetu.com`).
2. Update your DNS registrar with the requested `A` or `CNAME` records pointing to Vercel's edge network.
3. SSL certificates are provisioned automatically via Let's Encrypt.

---

## 6. Post-Deployment Verification Checklist

Once deployed, complete this validation checklist:

- [ ] **Home Page:** Verify public landing page renders, styles load correctly, and animations initialize.
- [ ] **Theme Switching:** Confirm dark and light mode toggle operates smoothly without visual flicker.
- [ ] **Audio Telemetry:** Ensure interaction sound feedback triggers without browser console warnings.
- [ ] **Authentication:** Test user sign-up, sign-in, and onboarding redirect flows via Clerk.
- [ ] **Dashboard Access:** Verify role-specific dashboards load data according to the assigned user role.
- [ ] **Tournament Engine:** Browse tournaments, test filter facets (by sport, state, status), and test tournament registration.
- [ ] **Media Uploads:** Test profile picture and certificate uploads to Cloudinary via the upload endpoint.
- [ ] **Email Dispatch:** Confirm receipt of confirmation and transactional emails.

---

## 7. Troubleshooting

| Issue | Potential Cause | Remediation |
|---|---|---|
| Database connection timeout | Serverless connection spike | Ensure `DATABASE_URL` uses the pooled Neon endpoint (`-pooler`). |
| Clerk webhook returns 400 | Missing or invalid signing secret | Verify `CLERK_WEBHOOK_SECRET` in Vercel matches the Clerk dashboard secret. |
| Cloudinary upload failure | Invalid credentials or CORS policy | Verify Cloudinary keys and ensure upload presets allow incoming origin domain. |
| Email delivery failures | SMTP credentials or port mismatch | Verify `EMAIL_PORT` (use 587 for TLS, 465 for SSL) and app-specific credentials. |
