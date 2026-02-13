"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMonitor } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewMonitorPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [schedule, setSchedule] = useState("5m");
  const [graceSeconds, setGraceSeconds] = useState(300);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug || slug === toSlug(name)) {
      setSlug(toSlug(value));
    }
  };

  const toSlug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createMonitor({
        name,
        slug: slug || toSlug(name),
        schedule,
        grace_seconds: graceSeconds,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create monitor");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    borderColor: 'var(--border)',
    background: 'var(--background)',
    color: 'var(--foreground)',
  };

  return (
    <div className="max-w-lg">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:opacity-80"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
        Create Monitor
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
        Set up a new heartbeat monitor for your cron job.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6 rounded-xl border"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {error && (
          <div className="border px-4 py-3 rounded-lg text-sm" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Database Backup"
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="database-backup"
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2"
            style={inputStyle}
          />
          <p className="text-xs mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
            Auto-generated from name. Used in your ping URL.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Schedule</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="5m or */5 * * * *"
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2"
            style={inputStyle}
            required
          />
          <p className="text-xs mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
            Simple: <code className="font-mono px-1 py-0.5 rounded" style={{ background: 'var(--muted)' }}>5m</code>{" "}
            <code className="font-mono px-1 py-0.5 rounded" style={{ background: 'var(--muted)' }}>1h</code>{" "}
            <code className="font-mono px-1 py-0.5 rounded" style={{ background: 'var(--muted)' }}>1d</code>
            {" "}&mdash; or cron:{" "}
            <code className="font-mono px-1 py-0.5 rounded" style={{ background: 'var(--muted)' }}>*/5 * * * *</code>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
            Grace Period (seconds)
          </label>
          <input
            type="number"
            value={graceSeconds}
            onChange={(e) => setGraceSeconds(Number(e.target.value))}
            min={30}
            max={86400}
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={inputStyle}
          />
          <p className="text-xs mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
            How long to wait after the expected time before alerting. Default: 300s (5 min).
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || !name || !schedule}
          className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          {submitting ? "Creating..." : "Create Monitor"}
        </button>
      </form>
    </div>
  );
}
