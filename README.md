# PingCron Web

Next.js frontend for [PingCron](https://pingcron.dev) — heartbeat monitoring for cron jobs.

Live at **[pingcron.dev](https://pingcron.dev)**

## What It Does

- Landing page with product demo, features, and pricing
- Dashboard to manage cron job monitors
- Real-time status view of all monitors (up/down/new)
- Ping history charts and incident timelines
- Alert channel management (Email, Telegram, Slack, Webhook)
- Public status pages for sharing uptime with teams/customers
- Mobile-responsive with hamburger menu sidebar

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Recharts** for ping history charts
- **Lucide React** for icons
- **date-fns** for date formatting

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx                   # Root layout + metadata
│   ├── globals.css                  # Theme variables (light/dark)
│   ├── (auth)/login/page.tsx        # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx               # Sidebar + auth guard
│   │   ├── dashboard/page.tsx       # Monitor grid overview
│   │   ├── monitors/new/page.tsx    # Create monitor form
│   │   ├── monitors/[id]/page.tsx   # Monitor detail + ping chart
│   │   ├── incidents/page.tsx       # All incidents
│   │   ├── alerts/page.tsx          # Alert channel management
│   │   ├── status-pages/page.tsx    # Status page management
│   │   └── settings/page.tsx        # API key + integration guide
│   └── status/[slug]/page.tsx       # Public status page (no auth)
├── lib/
│   ├── api.ts                       # Go backend API client
│   ├── auth.ts                      # NextAuth config
│   └── utils.ts                     # Helpers (cn, formatDate, statusColor, etc.)
└── components/
    ├── sidebar.tsx                  # Desktop sidebar + mobile hamburger drawer
    ├── monitor-card.tsx             # Monitor status card with pulsing dot
    ├── ping-chart.tsx               # Recharts bar chart
    ├── incident-list.tsx            # Incident timeline
    └── status-page-view.tsx         # Public status page component
```

## Quick Start

### Prerequisites

- Node.js 18+
- The [Go backend](https://github.com/mohitsharmadl/cronpulse-server) running locally

### Setup

```bash
# Install dependencies
npm install

# Copy env file
cp .env.local.example .env.local

# Start dev server
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8090` | Go backend URL |
| `NEXTAUTH_URL` | `http://localhost:3000` | App URL |
| `NEXTAUTH_SECRET` | — | NextAuth secret (any random string) |
| `RESEND_API_KEY` | — | For magic link emails (optional) |
| `EMAIL_FROM` | `noreply@pingcron.dev` | Sender email |

### Build

```bash
npm run build
npm start
```

## Design

- **Primary color:** Emerald green (#10b981)
- **Sidebar:** Dark navy (#111827)
- **Fonts:** Inter + JetBrains Mono
- **Dark mode:** Automatic via `prefers-color-scheme`
- **Mobile:** Hamburger menu with slide-out drawer

## Deployment

Deployed on **Vercel** with auto-deploy from this repo.

- Production: [pingcron.dev](https://pingcron.dev)
- Preview: cronpulse-web.vercel.app

Set `NEXT_PUBLIC_API_URL=https://api.pingcron.dev` in Vercel environment variables.

## Related

- [cronpulse-server](https://github.com/mohitsharmadl/cronpulse-server) — Go backend (private)
