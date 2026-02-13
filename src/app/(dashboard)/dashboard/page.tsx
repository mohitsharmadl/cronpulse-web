"use client";

import { useEffect, useState } from "react";
import { Monitor, listMonitors } from "@/lib/api";
import { MonitorCard } from "@/components/monitor-card";
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMonitors = async () => {
    try {
      setLoading(true);
      const data = await listMonitors();
      setMonitors(data);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load monitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
    const interval = setInterval(fetchMonitors, 30000);
    return () => clearInterval(interval);
  }, []);

  const upCount = monitors.filter((m) => m.status === "up").length;
  const downCount = monitors.filter((m) => m.status === "down").length;
  const newCount = monitors.filter((m) => m.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {monitors.length} monitors &middot; {upCount} up &middot;{" "}
            {downCount} down &middot; {newCount} new
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchMonitors}
            className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/monitors/new"
            className="flex items-center gap-1.5 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Monitor
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      {loading && monitors.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-lg border border-[var(--border)] bg-[var(--muted)] animate-pulse"
            />
          ))}
        </div>
      ) : monitors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--muted-foreground)] mb-4">
            No monitors yet. Create one to get started!
          </p>
          <Link
            href="/monitors/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Monitor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>
      )}
    </div>
  );
}
