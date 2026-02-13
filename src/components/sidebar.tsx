"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Monitor,
  AlertTriangle,
  Bell,
  Globe,
  Settings,
  LogOut,
  Activity,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/monitors/new", label: "New Monitor", icon: Monitor },
  { href: "/incidents", label: "Incidents", icon: AlertTriangle },
  { href: "/alerts", label: "Alert Channels", icon: Bell },
  { href: "/status-pages", label: "Status Pages", icon: Globe },
  { href: "/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("cronpulse_api_key");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onNavigate}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
            <Activity className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="font-bold text-[15px] tracking-tight text-white">PingCron</span>
            <span className="block text-[10px] tracking-widest uppercase" style={{ color: 'var(--primary)' }}>MONITORING</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <span className="block px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--sidebar-border)' }}>
          Menu
        </span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "text-white"
                  : "hover:text-white"
              )}
              style={
                isActive
                  ? { background: 'var(--sidebar-muted)', color: 'var(--sidebar-active)' }
                  : { color: 'var(--sidebar-foreground)' }
              }
            >
              <Icon className="w-[18px] h-[18px]" style={isActive ? { color: 'var(--sidebar-active)' } : undefined} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sidebar-active)' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] w-full transition-colors hover:text-white"
          style={{ color: 'var(--sidebar-foreground)' }}
        >
          <LogOut className="w-[18px] h-[18px]" />
          Log Out
        </button>
      </div>
    </>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: 'var(--sidebar)', borderBottom: '1px solid var(--sidebar-border)' }}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
            <Activity className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-white">PingCron</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--sidebar-foreground)' }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile slide-out drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 z-50 h-screen w-64 flex flex-col transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}
      >
        <SidebarContent onNavigate={() => setOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 h-screen flex-col flex-shrink-0" style={{ background: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}>
        <SidebarContent />
      </aside>
    </>
  );
}
