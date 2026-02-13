const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";

async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey =
    typeof window !== "undefined" ? localStorage.getItem("pingcron_api_key") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || res.statusText);
  }

  if (res.status === 204) return null as T;
  return res.json();
}

// --- Monitors ---

export interface Monitor {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  schedule: string;
  grace_seconds: number;
  status: "new" | "up" | "down" | "paused";
  last_ping_at: string | null;
  next_expected: string | null;
  created_at: string;
  ping_url: string;
}

export interface CreateMonitorInput {
  name: string;
  slug: string;
  schedule: string;
  grace_seconds: number;
}

export function listMonitors() {
  return fetchAPI<Monitor[]>("/api/monitors");
}

export function getMonitor(id: string) {
  return fetchAPI<Monitor>(`/api/monitors/${id}`);
}

export function createMonitor(input: CreateMonitorInput) {
  return fetchAPI<Monitor>("/api/monitors", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateMonitor(
  id: string,
  input: Partial<Pick<Monitor, "name" | "schedule" | "grace_seconds" | "status">>
) {
  return fetchAPI<Monitor>(`/api/monitors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteMonitor(id: string) {
  return fetchAPI<null>(`/api/monitors/${id}`, { method: "DELETE" });
}

// --- Pings ---

export interface Ping {
  id: number;
  monitor_id: string;
  pinged_at: string;
  source_ip: string;
  latency_ms: number | null;
}

export function listPings(monitorId: string) {
  return fetchAPI<Ping[]>(`/api/monitors/${monitorId}/pings`);
}

// --- Incidents ---

export interface Incident {
  id: string;
  monitor_id: string;
  started_at: string;
  resolved_at: string | null;
  duration_secs: number | null;
  alert_sent: boolean;
  monitor_name?: string;
}

export function listMonitorIncidents(monitorId: string) {
  return fetchAPI<Incident[]>(`/api/monitors/${monitorId}/incidents`);
}

export function listAllIncidents() {
  return fetchAPI<Incident[]>("/api/incidents");
}

// --- Alert Channels ---

export interface AlertChannel {
  id: string;
  user_id: string;
  type: "email" | "telegram" | "slack" | "webhook";
  config: Record<string, string>;
  enabled: boolean;
  created_at: string;
}

export function listAlertChannels() {
  return fetchAPI<AlertChannel[]>("/api/alert-channels");
}

export function createAlertChannel(type: string, config: Record<string, string>) {
  return fetchAPI<AlertChannel>("/api/alert-channels", {
    method: "POST",
    body: JSON.stringify({ type, config }),
  });
}

export function deleteAlertChannel(id: string) {
  return fetchAPI<null>(`/api/alert-channels/${id}`, { method: "DELETE" });
}

// --- Status Pages ---

export interface StatusPage {
  id: string;
  slug: string;
  title: string;
  monitors: string[];
  is_public: boolean;
  created_at: string;
}

export interface StatusPagePublic {
  title: string;
  monitors: {
    name: string;
    status: string;
    uptime_pct: number;
    last_ping_at: string | null;
  }[];
}

export function listStatusPages() {
  return fetchAPI<StatusPage[]>("/api/status-pages");
}

export function createStatusPage(input: {
  slug: string;
  title: string;
  monitors: string[];
  is_public: boolean;
}) {
  return fetchAPI<StatusPage>("/api/status-pages", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function deleteStatusPage(id: string) {
  return fetchAPI<null>(`/api/status-pages/${id}`, { method: "DELETE" });
}

export function getPublicStatusPage(slug: string) {
  return fetchAPI<StatusPagePublic>(`/api/status/${slug}`);
}

// --- User ---

export interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  api_key: string;
}

export function getMe() {
  return fetchAPI<User>("/api/me");
}

// --- Auth sync ---

export function syncUser(user: { id: string; email: string; name: string }) {
  return fetchAPI<{ api_key: string }>("/api/auth/sync", {
    method: "POST",
    body: JSON.stringify(user),
  });
}
