"use client";

import { Incident } from "@/lib/api";
import { formatDate, formatDuration } from "@/lib/utils";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function IncidentList({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <div
        className="text-center py-10 rounded-xl border"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--primary)' }} />
        <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>No incidents</p>
        <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Everything has been running smoothly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          {incident.resolved_at ? (
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-500/10">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-500/10">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                {incident.monitor_name || (incident.resolved_at ? "Resolved" : "Monitor down")}
              </span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
              >
                {formatDuration(incident.duration_secs)}
              </span>
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
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
