"use client";

import { Incident } from "@/lib/api";
import { formatDate, formatDuration } from "@/lib/utils";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function IncidentList({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <div className="text-center text-[var(--muted-foreground)] text-sm py-8">
        No incidents recorded.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={`flex items-start gap-3 p-3 rounded-lg border ${
            incident.resolved_at
              ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
              : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
          }`}
        >
          {incident.resolved_at ? (
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">
                {incident.monitor_name || "Monitor down"}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {formatDuration(incident.duration_secs)}
              </span>
            </div>
            <div className="text-xs text-[var(--muted-foreground)] mt-1">
              Started: {formatDate(incident.started_at)}
              {incident.resolved_at && (
                <> &middot; Resolved: {formatDate(incident.resolved_at)}</>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
