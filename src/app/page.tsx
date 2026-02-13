"use client";

import Link from "next/link";
import {
  Zap,
  Bell,
  Clock,
  Shield,
  Globe,
  Terminal,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Heartbeat Monitoring",
    description:
      "Your cron jobs ping CronPulse when they run. If a ping doesn't arrive on time, we alert you instantly.",
  },
  {
    icon: Bell,
    title: "Multi-Channel Alerts",
    description:
      "Get notified via Email, Telegram, Slack, or Webhooks. Never miss a failed cron job again.",
  },
  {
    icon: Globe,
    title: "Public Status Pages",
    description:
      "Share your system uptime with customers via beautiful, auto-updating status pages.",
  },
  {
    icon: Shield,
    title: "Grace Periods",
    description:
      "Set custom grace periods per monitor to avoid false alarms from slow-running jobs.",
  },
  {
    icon: Terminal,
    title: "Dead Simple Setup",
    description:
      'Add one line to your cron script: curl https://ping.cronpulse.dev/p/YOUR_ID. That\'s it.',
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description:
      "Built with Go for sub-10ms ping responses. Your monitoring should never be the bottleneck.",
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
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    features: [
      "50 monitors",
      "30s minimum interval",
      "90 days ping history",
      "Unlimited alert channels",
      "5 status pages",
      "1 year incident history",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-[var(--primary)]" />
          <span className="font-bold text-xl">CronPulse</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium mb-6">
          <Zap className="w-3 h-3" />
          Dead man&apos;s switch for your cron jobs
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Know instantly when your{" "}
          <span className="text-[var(--primary)]">cron jobs</span> stop running
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">
          CronPulse monitors your scheduled tasks with heartbeat pings. If your
          cron job doesn&apos;t check in on time, we alert you via Email,
          Telegram, Slack, or Webhook.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium hover:opacity-90 flex items-center gap-2"
          >
            Start Monitoring Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Code snippet */}
        <div className="mt-12 p-4 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-left max-w-md mx-auto">
          <div className="text-xs text-[var(--muted-foreground)] mb-2">
            # Add to the end of your cron script
          </div>
          <code className="text-sm text-[var(--primary)]">
            curl -fsS https://ping.cronpulse.dev/p/abc123
          </code>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create a Monitor",
              desc: "Set the expected schedule (every 5 min, daily at 6am, etc.) and a grace period.",
            },
            {
              step: "2",
              title: "Add the Ping",
              desc: "Put the curl command at the end of your cron script. It takes 2 seconds.",
            },
            {
              step: "3",
              title: "Get Alerted",
              desc: "If the ping doesn't arrive on time, you get notified instantly. Sleep easy.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-sm font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-[var(--muted)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-lg bg-[var(--background)] border border-[var(--border)]"
                >
                  <Icon className="w-5 h-5 text-[var(--primary)] mb-3" />
                  <h3 className="font-semibold text-sm mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-center text-[var(--muted-foreground)] mb-12">
          Start free. Upgrade when you need more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-lg border ${
                tier.highlighted
                  ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                  : "border-[var(--border)]"
              }`}
            >
              <h3 className="font-semibold text-lg">{tier.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-[var(--muted-foreground)] text-sm">
                  {tier.period}
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={`block text-center px-4 py-2.5 rounded-md text-sm font-medium ${
                  tier.highlighted
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "border border-[var(--border)] hover:bg-[var(--muted)]"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            CronPulse
          </div>
          <p>&copy; {new Date().getFullYear()} CronPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
