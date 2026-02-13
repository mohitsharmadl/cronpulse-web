"use client";

import Link from "next/link";
import {
  Activity,
  Bell,
  Clock,
  Shield,
  Globe,
  Terminal,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "One-Line Setup",
    description:
      "Add a single curl to your cron script. No agents, no SDKs, no config files.",
  },
  {
    icon: Bell,
    title: "Email, Telegram, Slack, Webhook",
    description:
      "Get alerted wherever you are. Four channels out of the box, configure in seconds.",
  },
  {
    icon: Globe,
    title: "Public Status Pages",
    description:
      "Share uptime with your team or customers. Auto-updating, no maintenance required.",
  },
  {
    icon: Shield,
    title: "Smart Grace Periods",
    description:
      "Set custom buffers per monitor. No false alarms from slow-running jobs.",
  },
  {
    icon: Zap,
    title: "Sub-10ms Response",
    description:
      "Go-powered backend. Your monitoring ping returns faster than a database query.",
  },
  {
    icon: BarChart3,
    title: "Ping History & Incidents",
    description:
      "Full timeline of every heartbeat. See when things broke and how long they were down.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "5 monitors",
      "5 min minimum interval",
      "7 days ping history",
      "2 alert channels",
      "1 status page",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    features: [
      "50 monitors",
      "30s minimum interval",
      "90 days ping history",
      "Unlimited alert channels",
      "5 status pages",
      "1 year incident history",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    features: [
      "200 monitors",
      "10s minimum interval",
      "1 year ping history",
      "Unlimited alert channels",
      "10 status pages",
      "Unlimited incident history",
      "Priority support",
    ],
    cta: "Start Business Trial",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--foreground)' }}>CronPulse</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:opacity-80"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Log In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-24 max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 border"
          style={{ background: 'var(--primary-muted)', color: 'var(--primary)', borderColor: 'var(--primary)' }}
        >
          <Activity className="w-3 h-3" />
          Heartbeat monitoring for cron jobs
        </div>

        <h1
          className="text-[3.25rem] leading-[1.1] font-extrabold tracking-tight mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          Your cron jobs called.
          <br />
          <span style={{ color: 'var(--primary)' }}>They didn&apos;t check in.</span>
        </h1>

        <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          CronPulse watches your scheduled tasks. If a job doesn&apos;t ping us
          on time, we alert you before your users notice.
        </p>

        <div className="flex items-center justify-center gap-3 mb-16">
          <Link
            href="/login"
            className="px-7 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Start Monitoring
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="px-7 py-3 rounded-lg text-sm font-semibold border transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            How It Works
          </a>
        </div>

        {/* Terminal Demo */}
        <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1e1e2e' }}>
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs text-slate-500 font-mono">crontab -e</span>
          </div>
          <div className="px-5 py-4 text-left font-mono text-[13px] leading-relaxed" style={{ background: '#11111b' }}>
            <div className="text-slate-500"># Database backup — every 6 hours</div>
            <div>
              <span className="text-amber-400">0 */6 * * *</span>
              <span className="text-slate-300"> /opt/scripts/backup.sh</span>
              <span className="text-emerald-400"> && \</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">curl -fsS </span>
              <span className="text-sky-400 underline decoration-sky-400/30">https://ping.pingcron.dev/p/abc123</span>
            </div>
            <div className="mt-4 text-slate-500"># Email report — daily at 8am</div>
            <div>
              <span className="text-amber-400">0 8 * * *</span>
              <span className="text-slate-300"> python3 report.py</span>
              <span className="text-emerald-400"> && \</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">curl -fsS </span>
              <span className="text-sky-400 underline decoration-sky-400/30">https://ping.pingcron.dev/p/def456</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Three steps. Zero complexity.
        </h2>
        <p className="text-center mb-14 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Set up monitoring in under a minute.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Create a monitor",
              desc: "Pick a name and schedule — every 5 minutes, hourly, daily. Set a grace period for slow jobs.",
              color: "#10b981",
            },
            {
              step: "2",
              title: "Add the ping",
              desc: "Append one curl command to your cron script. It takes literally 10 seconds.",
              color: "#6366f1",
            },
            {
              step: "3",
              title: "Sleep easy",
              desc: "If the ping doesn't arrive on time, you get an alert on your phone. We've got your back.",
              color: "#f59e0b",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border p-6"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white mb-4"
                style={{ background: item.color }}
              >
                {item.step}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20" style={{ background: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
            Everything you need
          </h2>
          <p className="text-center mb-14 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            No bloat. Just the features that matter for cron job monitoring.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border p-5"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'var(--primary-muted)' }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--foreground)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Simple pricing
        </h2>
        <p className="text-center mb-14 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Start free. Upgrade when you outgrow it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-xl border p-7"
              style={{
                background: 'var(--card)',
                borderColor: tier.highlighted ? 'var(--primary)' : 'var(--border)',
                boxShadow: tier.highlighted ? '0 0 0 1px var(--primary)' : undefined,
              }}
            >
              {tier.highlighted && (
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                  style={{ background: 'var(--primary-muted)', color: 'var(--primary)' }}
                >
                  Most Popular
                </span>
              )}
              <h3 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>{tier.name}</h3>
              <div className="mt-2 mb-5">
                <span className="text-4xl font-extrabold" style={{ color: 'var(--foreground)' }}>{tier.price}</span>
                <span className="text-sm ml-1" style={{ color: 'var(--muted-foreground)' }}>
                  {tier.period}
                </span>
              </div>
              <ul className="space-y-2.5 mb-7">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--foreground)' }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={
                  tier.highlighted
                    ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
                    : { border: '1px solid var(--border)', color: 'var(--foreground)' }
                }
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-12 text-center"
          style={{ background: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}
        >
          <Activity className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
          <h2 className="text-2xl font-bold mb-3 text-white">
            Stop finding out from your users.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--sidebar-foreground)' }}>
            Set up your first monitor in 60 seconds. Free forever for up to 5 cron jobs.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>CronPulse</span>
          </div>
          <p>&copy; {new Date().getFullYear()} CronPulse</p>
        </div>
      </footer>
    </div>
  );
}
