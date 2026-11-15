"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard, Trophy, BarChart3, Award, MessageSquare,
  Bell, Image, Settings, Users, FileText, ScrollText, Handshake,
  GraduationCap, ChevronLeft, ChevronRight, Menu, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Trophy,
  BarChart3,
  Award,
  MessageSquare,
  Bell,
  Image,
  Settings,
  Users,
  FileText,
  ScrollText,
  Handshake,
  School: GraduationCap,
};

interface SidebarProps {
  role: string;
}

export function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const getMenuItems = () => {
    switch (role) {
      case "SUPER_ADMIN":
        return [
          { label: "Overview", href: "/dashboard/admin", icon: "LayoutDashboard" },
          { label: "Users", href: "/athletes", icon: "Users" },
          { label: "Tournaments", href: "/tournaments", icon: "Trophy" },
          { label: "Schools", href: "/schools", icon: "School" },
          { label: "Sponsors", href: "/sponsors", icon: "Handshake" },
          { label: "Reports", href: "/reports", icon: "FileText" },
          { label: "Audit Logs", href: "/audit-logs", icon: "ScrollText" },
          { label: "Settings", href: "/settings", icon: "Settings" },
        ];
      case "SCHOOL_ADMIN":
        return [
          { label: "Dashboard", href: "/dashboard/school", icon: "LayoutDashboard" },
          { label: "Athletes", href: "/athletes", icon: "Users" },
          { label: "Tournaments", href: "/tournaments", icon: "Trophy" },
          { label: "Achievements", href: "/achievements", icon: "Award" },
          { label: "Settings", href: "/settings", icon: "Settings" },
        ];
      case "COACH":
        return [
          { label: "Dashboard", href: "/dashboard/coach", icon: "LayoutDashboard" },
          { label: "Athletes", href: "/athletes", icon: "Users" },
          { label: "Analytics", href: "/analytics", icon: "BarChart3" },
          { label: "Messages", href: "/messages", icon: "MessageSquare" },
          { label: "Settings", href: "/settings", icon: "Settings" },
        ];
      case "SPONSOR":
        return [
          { label: "Dashboard", href: "/dashboard/sponsor", icon: "LayoutDashboard" },
          { label: "Sponsorships", href: "/sponsor-marketplace", icon: "Handshake" },
          { label: "Athletes", href: "/athletes", icon: "Users" },
          { label: "Reports", href: "/reports", icon: "FileText" },
          { label: "Settings", href: "/settings", icon: "Settings" },
        ];
      default:
        return [
          { label: "Dashboard", href: "/dashboard/athlete", icon: "LayoutDashboard" },
          { label: "Tournaments", href: "/tournaments", icon: "Trophy" },
          { label: "Performance", href: "/analytics", icon: "BarChart3" },
          { label: "Certificates", href: "/certificates", icon: "Award" },
          { label: "Achievements", href: "/achievements", icon: "Award" },
          { label: "Messages", href: "/messages", icon: "MessageSquare" },
          { label: "Notifications", href: "/notifications", icon: "Bell" },
          { label: "Settings", href: "/settings", icon: "Settings" },
        ];
    }
  };

  const menuItems = getMenuItems();

  const sidebarContent = (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/10 bg-[#0A0A0A] text-white transition-all duration-300",
        collapsed ? "w-18" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/10">
        {!collapsed && (
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition-all group-hover:border-[#FF4D12]/60 group-hover:bg-[#FF4D12]/15">
              <Trophy className="h-4 w-4 text-[#FF4D12]" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              KHEL <span className="text-[#FF4D12]">सेतु</span>
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hidden md:flex text-neutral-400 hover:text-white hover:bg-white/5"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border",
                isActive
                  ? "bg-[#FF4D12]/15 border-[#FF4D12]/30 text-white shadow-[0_0_20px_-5px_rgba(255,77,18,0.3)]"
                  : "border-transparent text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/10"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-[#FF4D12]" : "text-neutral-400 group-hover:text-white")} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#FF4D12]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden h-10 w-10 bg-background border border-border shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 md:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        {sidebarContent}
      </div>
    </>
  );
}
