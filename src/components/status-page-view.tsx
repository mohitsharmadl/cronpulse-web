"use client";

import { StatusPagePublic } from "@/lib/api";
import { statusColor, timeAgo } from "@/lib/utils";

export function StatusPageView({ data }: { data: StatusPagePublic }) {
  const allUp = data.monitors.every((m) => m.status === "up");

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`text-center p-6 rounded-lg mb-8 ${
          allUp
            ? "bg-green-50 dark:bg-green-950"
            : "bg-red-50 dark:bg-red-950"
        }`}
      >
        <div
          className={`text-2xl font-bold ${
            allUp ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
          }`}
        >
          {allUp ? "All Systems Operational" : "Some Systems Down"}
        </div>
      </div>

      <div className="space-y-3">
        {data.monitors.map((monitor, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-lg border border-[var(--border)]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${statusColor(monitor.status)}`} />
              <span className="font-medium text-sm">{monitor.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
              <span>{monitor.uptime_pct.toFixed(2)}% uptime</span>
              <span>Last ping: {timeAgo(monitor.last_ping_at)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-xs text-[var(--muted-foreground)]">
        Powered by CronPulse
      </div>
    </div>
  );
}
