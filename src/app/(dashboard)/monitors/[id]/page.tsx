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
import { statusColor, formatDate, timeAgo } from "@/lib/utils";
import { ArrowLeft, Trash2, Copy, Check, Pause, Play } from "lucide-react";
import Link from "next/link";

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
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-[var(--muted)] rounded" />
        <div className="h-48 bg-[var(--muted)] rounded-lg" />
      </div>
    );
  }

  if (!monitor) return null;

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className={`w-3 h-3 rounded-full ${statusColor(monitor.status)}`}
            />
            <h1 className="text-2xl font-bold">{monitor.name}</h1>
            <span className="text-xs uppercase font-medium px-2 py-0.5 rounded bg-[var(--muted)]">
              {monitor.status}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Schedule: {monitor.schedule} &middot; Grace: {monitor.grace_seconds}s
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePause}
            className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
            title={monitor.status === "paused" ? "Resume" : "Pause"}
          >
            {monitor.status === "paused" ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ping URL */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] mb-6">
        <code className="text-sm flex-1 truncate">{monitor.ping_url}</code>
        <button
          onClick={copyUrl}
          className="p-1.5 hover:bg-[var(--background)] rounded transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-[var(--border)]">
          <div className="text-xs text-[var(--muted-foreground)]">Last Ping</div>
          <div className="text-sm font-medium mt-1">
            {timeAgo(monitor.last_ping_at)}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border)]">
          <div className="text-xs text-[var(--muted-foreground)]">Next Expected</div>
          <div className="text-sm font-medium mt-1">
            {formatDate(monitor.next_expected)}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border)]">
          <div className="text-xs text-[var(--muted-foreground)]">Total Pings (7d)</div>
          <div className="text-sm font-medium mt-1">{pings.length}</div>
        </div>
      </div>

      {/* Ping Chart */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Ping History</h2>
        <div className="p-4 rounded-lg border border-[var(--border)]">
          <PingChart pings={pings} />
        </div>
      </div>

      {/* Incidents */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Incidents</h2>
        <IncidentList incidents={incidents} />
      </div>
    </div>
  );
}
