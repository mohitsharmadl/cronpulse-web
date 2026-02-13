"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { syncUser } from "@/lib/api";
import { Activity } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verify") === "1";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = email.replace(/[^a-z0-9]/gi, "-").toLowerCase();
      const result = await syncUser({
        id: userId,
        email,
        name: name || email.split("@")[0],
      });

      localStorage.setItem("pingcron_api_key", result.api_key);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary)' }}>
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
            Welcome to PingCron
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
            Sign in to monitor your cron jobs
          </p>
        </div>

        {verified && (
          <div className="border px-4 py-3 rounded-lg mb-4 text-sm text-center" style={{ background: 'var(--primary-muted)', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            Check your email for a sign-in link!
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-4 p-6 rounded-xl border"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          {error && (
            <div className="border px-4 py-3 rounded-lg text-sm" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
              Name <span style={{ color: 'var(--muted-foreground)' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
          No password required. We&apos;ll create your account instantly.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
