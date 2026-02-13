"use client";

import { StatusPagePublic } from "@/lib/api";
import { statusColor, timeAgo } from "@/lib/utils";
import { CheckCircle, AlertTriangle } from "lucide-react";

export function StatusPageView({ data }: { data: StatusPagePublic }) {
  const allUp = data.monitors.every((m) => m.status === "up");

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`text-center p-6 rounded-xl mb-8 ${
          allUp ? "bg-emerald-500/10" : "bg-red-500/10"
        }`}
      >
        {allUp ? (
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
        ) : (
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
        )}
        <div className={`text-xl font-bold ${allUp ? "text-emerald-700" : "text-red-700"}`}>
          {allUp ? "All Systems Operational" : "Some Systems Down"}
        </div>
      </div>

      <div className="space-y-2">
        {data.monitors.map((monitor, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-xl border"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${statusColor(monitor.status)}`} />
              <span className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{monitor.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span className="font-mono">{monitor.uptime_pct.toFixed(2)}%</span>
              <span>{timeAgo(monitor.last_ping_at)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 text-xs" style={{ color: 'var(--muted-foreground)' }}>
        Powered by <span className="font-semibold" style={{ color: 'var(--primary)' }}>PingCron</span>
      </div>
    </div>
  );
}
