"use client";

import { useEffect, useState } from "react";
import { Incident, listAllIncidents } from "@/lib/api";
import { IncidentList } from "@/components/incident-list";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllIncidents()
      .then(setIncidents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Incidents</h1>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-[var(--muted)] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <IncidentList incidents={incidents} />
      )}
    </div>
  );
}
