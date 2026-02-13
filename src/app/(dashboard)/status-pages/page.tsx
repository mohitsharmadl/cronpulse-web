"use client";

import { useEffect, useState } from "react";
import {
  StatusPage,
  Monitor,
  listStatusPages,
  listMonitors,
  createStatusPage,
  deleteStatusPage,
} from "@/lib/api";
import { Globe, Trash2, ExternalLink } from "lucide-react";

export default function StatusPagesPage() {
  const [pages, setPages] = useState<StatusPage[]>([]);
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formSlug, setFormSlug] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formMonitors, setFormMonitors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [p, m] = await Promise.all([listStatusPages(), listMonitors()]);
      setPages(p);
      setMonitors(m);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createStatusPage({
        slug: formSlug,
        title: formTitle,
        monitors: formMonitors,
        is_public: true,
      });
      setShowForm(false);
      setFormSlug("");
      setFormTitle("");
      setFormMonitors([]);
      fetchData();
    } catch {
      alert("Failed to create status page");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this status page?")) return;
    await deleteStatusPage(id);
    fetchData();
  };

  const toggleMonitor = (id: string) => {
    setFormMonitors((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Status Pages</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium hover:opacity-90"
        >
          <Globe className="w-4 h-4" />
          New Status Page
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="p-4 rounded-lg border border-[var(--border)] mb-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="My Service Status"
              className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Slug</label>
            <input
              type="text"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder="my-service"
              className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Public URL: /status/{formSlug || "your-slug"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Monitors to include
            </label>
            <div className="space-y-2 max-h-48 overflow-auto">
              {monitors.map((m) => (
                <label
                  key={m.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formMonitors.includes(m.id)}
                    onChange={() => toggleMonitor(m.id)}
                    className="rounded"
                  />
                  {m.name}
                </label>
              ))}
              {monitors.length === 0 && (
                <p className="text-xs text-[var(--muted-foreground)]">
                  Create some monitors first.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || formMonitors.length === 0}
              className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-[var(--border)] rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-[var(--muted)] animate-pulse"
            />
          ))}
        </div>
      ) : pages.length === 0 ? (
        <p className="text-center text-[var(--muted-foreground)] py-8">
          No status pages yet. Create one to share your uptime publicly.
        </p>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-4 rounded-lg border border-[var(--border)]"
            >
              <div>
                <div className="text-sm font-medium">{page.title}</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  /status/{page.slug} &middot; {page.monitors.length} monitors
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/status/${page.slug}`}
                  target="_blank"
                  className="p-2 rounded-md hover:bg-[var(--muted)]"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
