"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StatusPagePublic, getPublicStatusPage } from "@/lib/api";
import { StatusPageView } from "@/components/status-page-view";
import { Zap } from "lucide-react";

export default function PublicStatusPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<StatusPagePublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPublicStatusPage(slug)
      .then(setData)
      .catch(() => setError("Status page not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-8 h-8 text-[var(--muted-foreground)] mx-auto mb-2" />
          <p className="text-[var(--muted-foreground)]">{error || "Not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{data.title}</h1>
      </div>
      <StatusPageView data={data} />
    </div>
  );
}
