"use client";

import { useEffect, useState } from "react";
import { Monitor, listMonitors } from "@/lib/api";
import { MonitorCard } from "@/components/monitor-card";
import Link from "next/link";
import { Plus, RefreshCw, Activity, AlertTriangle, Pause } from "lucide-react";

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
  const newCount = monitors.filter((m) => m.status === "new" || m.status === "paused").length;

  const stats = [
    { label: "Total Monitors", value: monitors.length, icon: Activity, color: "var(--primary)" },
    { label: "Operational", value: upCount, icon: Activity, color: "#10b981" },
    { label: "Down", value: downCount, icon: AlertTriangle, color: "#ef4444" },
    { label: "Waiting / Paused", value: newCount, icon: Pause, color: "#f59e0b" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
            Dashboard
          </h1>
          <p className="text-base mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Monitor your cron jobs in real time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchMonitors}
            className="p-2.5 rounded-lg border transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} style={{ color: 'var(--muted-foreground)' }} />
          </button>
          <Link
            href="/monitors/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Plus className="w-4 h-4" />
            New Monitor
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border p-5"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                  {stat.label}
                </span>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="rounded-lg border px-4 py-3 mb-6 text-sm" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
          {error}
        </div>
      )}

      {/* Monitor Grid */}
      {loading && monitors.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 rounded-xl border animate-pulse"
              style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
            />
          ))}
        </div>
      ) : monitors.length === 0 ? (
        <div className="text-center py-20 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <Activity className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
          <p className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
            No monitors yet
          </p>
          <p className="text-sm mb-5" style={{ color: 'var(--muted-foreground)' }}>
            Create your first monitor to start watching a cron job.
          </p>
          <Link
            href="/monitors/new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
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
