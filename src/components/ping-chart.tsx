"use client";

import { Ping } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

export function PingChart({ pings }: { pings: Ping[] }) {
  if (pings.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-[var(--muted-foreground)] text-sm">
        No pings yet. Send your first heartbeat!
      </div>
    );
  }

  // Group pings by hour for the chart
  const grouped = new Map<string, number>();
  for (const ping of pings) {
    const hour = format(new Date(ping.pinged_at), "MMM d HH:00");
    grouped.set(hour, (grouped.get(hour) || 0) + 1);
  }

  const data = Array.from(grouped.entries())
    .map(([time, count]) => ({ time, count }))
    .reverse()
    .slice(-48); // last 48 hours

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10 }}
          interval="preserveStartEnd"
        />
        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
