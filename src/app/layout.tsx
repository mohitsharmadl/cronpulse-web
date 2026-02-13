import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PingCron — Cron Job Monitoring",
  description: "Monitor your cron jobs with heartbeat pings. Get alerted instantly when something breaks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
