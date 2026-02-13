"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Monitor,
  Ping,
  Incident,
  getMonitor,
  listPings,
  listMonitorIncidents,
  deleteMonitor,
  updateMonitor,
} from "@/lib/api";
import { PingChart } from "@/components/ping-chart";
import { IncidentList } from "@/components/incident-list";
import { formatDate, timeAgo } from "@/lib/utils";
import { ArrowLeft, Trash2, Copy, Check, Pause, Play } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { dot: string; label: string; bg: string }> = {
  up: { dot: "bg-emerald-500", label: "Operational", bg: "bg-emerald-500/10" },
  down: { dot: "bg-red-500", label: "Down", bg: "bg-red-500/10" },
  paused: { dot: "bg-amber-500", label: "Paused", bg: "bg-amber-500/10" },
  new: { dot: "bg-slate-400", label: "Waiting", bg: "bg-slate-400/10" },
};

export default function MonitorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [monitor, setMonitor] = useState<Monitor | null>(null);
  const [pings, setPings] = useState<Ping[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [m, p, inc] = await Promise.all([
          getMonitor(id),
          listPings(id),
          listMonitorIncidents(id),
        ]);
        setMonitor(m);
        setPings(p);
        setIncidents(inc);
      } catch {
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Delete this monitor? This cannot be undone.")) return;
    await deleteMonitor(id);
    router.push("/dashboard");
  };

  const togglePause = async () => {
    if (!monitor) return;
    const newStatus = monitor.status === "paused" ? "up" : "paused";
    const updated = await updateMonitor(id, { status: newStatus });
    setMonitor(updated);
  };

  const copyUrl = () => {
    if (!monitor) return;
    navigator.clipboard.writeText(monitor.ping_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded-lg animate-pulse" style={{ background: 'var(--muted)' }} />
        <div className="h-48 rounded-xl animate-pulse" style={{ background: 'var(--muted)' }} />
      </div>
    );
  }

  if (!monitor) return null;

  const config = statusConfig[monitor.status] || statusConfig.new;

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:opacity-80"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
              {monitor.name}
            </h1>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} border border-transparent`}>
              <div className={`w-2 h-2 rounded-full ${config.dot}`} />
              {config.label}
            </div>
          </div>
          <p className="text-sm mt-1 font-mono" style={{ color: 'var(--muted-foreground)' }}>
            Schedule: {monitor.schedule} &middot; Grace: {monitor.grace_seconds}s
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePause}
            className="p-2.5 rounded-lg border transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            title={monitor.status === "paused" ? "Resume" : "Pause"}
          >
            {monitor.status === "paused" ? (
              <Play className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            ) : (
              <Pause className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            )}
          </button>
          <button
            onClick={handleDelete}
            className="p-2.5 rounded-lg border transition-colors hover:opacity-80"
            style={{ borderColor: '#fecaca', background: '#fef2f2', color: '#dc2626' }}
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ping URL */}
      <div
        className="flex items-center gap-2 p-3.5 rounded-xl border mb-6 font-mono"
        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
      >
        <code className="text-sm flex-1 truncate" style={{ color: 'var(--foreground)' }}>{monitor.ping_url}</code>
        <button
          onClick={copyUrl}
          className="p-1.5 rounded-lg transition-opacity hover:opacity-70 flex-shrink-0"
        >
          {copied ? (
            <Check className="w-4 h-4" style={{ color: 'var(--success)' }} />
          ) : (
            <Copy className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Last Ping", value: timeAgo(monitor.last_ping_at) },
          { label: "Next Expected", value: formatDate(monitor.next_expected) },
          { label: "Total Pings (7d)", value: String(pings.length) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border p-4"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              {stat.label}
            </div>
            <div className="text-sm font-semibold mt-1.5" style={{ color: 'var(--foreground)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Ping Chart */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Ping History
        </h2>
        <div className="rounded-xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <PingChart pings={pings} />
        </div>
      </div>

      {/* Incidents */}
      <div>
        <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Incidents
        </h2>
        <IncidentList incidents={incidents} />
      </div>
    </div>
  );
}
