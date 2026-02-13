"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMonitor } from "@/lib/api";

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
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

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

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Create Monitor</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1.5">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Database Backup"
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="database-backup"
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Auto-generated from name. Used in your ping URL.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Schedule</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="5m or */5 * * * *"
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Simple: <code>5m</code>, <code>1h</code>, <code>1d</code> — or cron:{" "}
            <code>*/5 * * * *</code>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Grace Period (seconds)
          </label>
          <input
            type="number"
            value={graceSeconds}
            onChange={(e) => setGraceSeconds(Number(e.target.value))}
            min={30}
            max={86400}
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            How long to wait after the expected time before alerting. Default: 300s (5 minutes).
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || !name || !schedule}
          className="w-full px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Monitor"}
        </button>
      </form>
    </div>
  );
}
