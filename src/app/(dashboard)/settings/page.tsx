"use client";

import { useEffect, useState } from "react";
import { User, getMe } from "@/lib/api";
import { Copy, Check, Key } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const copyKey = () => {
    const key = localStorage.getItem("cronpulse_api_key");
    if (key) {
      navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-32 bg-[var(--muted)] rounded" />
        <div className="h-24 bg-[var(--muted)] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-[var(--border)]">
          <h2 className="font-semibold text-sm mb-3">Account</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Name</span>
              <span>{user?.name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Plan</span>
              <span className="font-medium">{user?.plan}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[var(--border)]">
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Key className="w-4 h-4" /> API Key
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">
            Use this key to authenticate API requests. Keep it secret!
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm bg-[var(--muted)] px-3 py-2 rounded-md truncate">
              {user?.api_key}
            </code>
            <button
              onClick={copyKey}
              className="p-2 hover:bg-[var(--muted)] rounded-md transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[var(--border)]">
          <h2 className="font-semibold text-sm mb-3">Integration</h2>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">
            Add this to the end of your cron job script:
          </p>
          <code className="block text-xs bg-[var(--muted)] px-3 py-2 rounded-md">
            curl -fsS --retry 3 https://ping.pingcron.dev/p/YOUR_MONITOR_ID
          </code>
        </div>
      </div>
    </div>
  );
}
