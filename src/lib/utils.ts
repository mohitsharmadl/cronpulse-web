import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | null) {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleString();
}

export function formatDuration(seconds: number | null) {
  if (seconds === null) return "Ongoing";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export function timeAgo(dateStr: string | null) {
  if (!dateStr) return "Never";
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function statusColor(status: string) {
  switch (status) {
    case "up":
      return "bg-green-500";
    case "down":
      return "bg-red-500";
    case "paused":
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
}

export function statusBgColor(status: string) {
  switch (status) {
    case "up":
      return "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800";
    case "down":
      return "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
    case "paused":
      return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800";
    default:
      return "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700";
  }
}
