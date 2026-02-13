"use client";

import Link from "next/link";
import { Monitor } from "@/lib/api";
import { statusColor, statusBgColor, timeAgo } from "@/lib/utils";
import { Activity, Clock, Copy, Check } from "lucide-react";
import { useState } from "react";

export function MonitorCard({ monitor }: { monitor: Monitor }) {
  const [copied, setCopied] = useState(false);

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
        className={`rounded-lg border p-4 transition-shadow hover:shadow-md cursor-pointer ${statusBgColor(monitor.status)}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${statusColor(monitor.status)}`} />
            <h3 className="font-semibold text-sm">{monitor.name}</h3>
          </div>
          <span className="text-xs uppercase font-medium text-[var(--muted-foreground)]">
            {monitor.status}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>Schedule: {monitor.schedule}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3" />
            <span>Last ping: {timeAgo(monitor.last_ping_at)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1">
          <code className="text-[10px] bg-[var(--muted)] px-1.5 py-0.5 rounded truncate flex-1">
            {monitor.ping_url}
          </code>
          <button
            onClick={copyPingUrl}
            className="p-1 hover:bg-[var(--muted)] rounded"
            title="Copy ping URL"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
