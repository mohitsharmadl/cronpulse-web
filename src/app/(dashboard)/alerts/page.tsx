"use client";

import { useEffect, useState } from "react";
import {
  AlertChannel,
  listAlertChannels,
  createAlertChannel,
  deleteAlertChannel,
} from "@/lib/api";
import { Bell, Trash2, Mail, MessageCircle, Globe, Webhook } from "lucide-react";

const typeIcons: Record<string, typeof Mail> = {
  email: Mail,
  telegram: MessageCircle,
  slack: Globe,
  webhook: Webhook,
};

const typeLabels: Record<string, string> = {
  email: "Email",
  telegram: "Telegram",
  slack: "Slack",
  webhook: "Webhook",
};

export default function AlertsPage() {
  const [channels, setChannels] = useState<AlertChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("email");
  const [formConfig, setFormConfig] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const fetchChannels = () => {
    listAlertChannels()
      .then(setChannels)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAlertChannel(formType, formConfig);
      setShowForm(false);
      setFormConfig({});
      fetchChannels();
    } catch {
      alert("Failed to create alert channel");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this alert channel?")) return;
    await deleteAlertChannel(id);
    fetchChannels();
  };

  const configFields: Record<string, { key: string; label: string; placeholder: string }[]> = {
    email: [{ key: "email", label: "Email Address", placeholder: "you@example.com" }],
    telegram: [
      { key: "bot_token", label: "Bot Token", placeholder: "123456:ABC-DEF..." },
      { key: "chat_id", label: "Chat ID", placeholder: "665202127" },
    ],
    slack: [
      {
        key: "webhook_url",
        label: "Webhook URL",
        placeholder: "https://hooks.slack.com/services/...",
      },
    ],
    webhook: [
      { key: "url", label: "Webhook URL", placeholder: "https://your-server.com/webhook" },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Alert Channels</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium hover:opacity-90"
        >
          <Bell className="w-4 h-4" />
          Add Channel
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="p-4 rounded-lg border border-[var(--border)] mb-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1.5">Type</label>
            <select
              value={formType}
              onChange={(e) => {
                setFormType(e.target.value);
                setFormConfig({});
              }}
              className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm"
            >
              <option value="email">Email</option>
              <option value="telegram">Telegram</option>
              <option value="slack">Slack</option>
              <option value="webhook">Webhook</option>
            </select>
          </div>

          {configFields[formType]?.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-1.5">
                {field.label}
              </label>
              <input
                type="text"
                value={formConfig[field.key] || ""}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, [field.key]: e.target.value })
                }
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
            </div>
          ))}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md text-sm font-medium disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add"}
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
      ) : channels.length === 0 ? (
        <p className="text-center text-[var(--muted-foreground)] py-8">
          No alert channels configured. Add one to get notified when monitors go down.
        </p>
      ) : (
        <div className="space-y-3">
          {channels.map((ch) => {
            const Icon = typeIcons[ch.type] || Bell;
            return (
              <div
                key={ch.id}
                className="flex items-center justify-between p-4 rounded-lg border border-[var(--border)]"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                  <div>
                    <div className="text-sm font-medium">
                      {typeLabels[ch.type]}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {Object.values(ch.config).join(" / ")}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(ch.id)}
                  className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
