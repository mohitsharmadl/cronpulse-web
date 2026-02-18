"use client";

import Link from "next/link";
import { Monitor } from "@/lib/api";
import { timeAgo } from "@/lib/utils";
import { Clock, Copy, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const statusConfig: Record<string, { dot: string; label: string; bg: string; border: string }> = {
  up: { dot: "bg-emerald-500", label: "Operational", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  down: { dot: "bg-red-500", label: "Down", bg: "bg-red-500/10", border: "border-red-500/20" },
  paused: { dot: "bg-amber-500", label: "Paused", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  new: { dot: "bg-slate-400", label: "Waiting", bg: "bg-slate-400/10", border: "border-slate-400/20" },
};

export function MonitorCard({ monitor }: { monitor: Monitor }) {
  const [copied, setCopied] = useState(false);
  const config = statusConfig[monitor.status] || statusConfig.new;

  const copyPingUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(monitor.ping_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href={`/monitors/${monitor.id}`}>
      <div
        className="group rounded-xl border p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--foreground)' }}>
              {monitor.name}
            </h3>
            <span className="text-[11px] font-mono" style={{ color: 'var(--muted-foreground)' }}>
              /{monitor.slug}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium ${config.bg} ${config.border} border`}>
            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`}>
              {monitor.status === "up" && (
                <div className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-ping`} />
              )}
            </div>
            {config.label}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg p-2.5" style={{ background: 'var(--muted)' }}>
            <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              Schedule
            </div>
            <div className="text-xs font-semibold mt-0.5 font-mono" style={{ color: 'var(--foreground)' }}>
              {monitor.schedule}
            </div>
          </div>
          <div className="rounded-lg p-2.5" style={{ background: 'var(--muted)' }}>
            <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              Last Ping
            </div>
            <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>
              {timeAgo(monitor.last_ping_at)}
            </div>
          </div>
        </div>

        {/* Ping URL */}
        <div className="flex items-center gap-1.5 rounded-lg p-2" style={{ background: 'var(--muted)' }}>
          <code className="text-[10px] flex-1 truncate font-mono" style={{ color: 'var(--muted-foreground)' }}>
            {monitor.ping_url}
          </code>
          <button
            onClick={copyPingUrl}
            className="p-1 rounded hover:opacity-70 transition-opacity flex-shrink-0"
            title="Copy ping URL"
          >
            {copied ? (
              <Check className="w-3 h-3" style={{ color: 'var(--success)' }} />
            ) : (
              <Copy className="w-3 h-3" style={{ color: 'var(--muted-foreground)' }} />
            )}
          </button>
        </div>

        {/* Hover arrow */}
        <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        </div>
      </div>
    </Link>
  );
}
