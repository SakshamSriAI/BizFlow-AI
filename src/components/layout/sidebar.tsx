"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  UserPlus,
  Users,
  Kanban,
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  FileCheck,
  Receipt,
  CreditCard,
  CheckSquare,
  Bell,
  Zap,
  BarChart3,
  TrendingUp,
  PieChart,
  Building2,
  ShieldCheck,
  Puzzle,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItemDef {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: "default" | "success" | "warning" | "danger" | "indigo" | "teal" | "accent";
}

interface NavSectionDef {
  title: string;
  items: NavItemDef[];
}

const navSections: NavSectionDef[] = [
  {
    title: "OVERVIEW",
    items: [
      { title: "Dashboard", href: "/app", icon: LayoutDashboard },
      {
        title: "AI Assistant",
        href: "/ai-assistant",
        icon: Bot,
        badge: "AI",
        badgeVariant: "accent",
      },
      {
        title: "AI Agents",
        href: "/ai-agents",
        icon: Sparkles,
        badge: "5",
        badgeVariant: "teal",
      },
    ],
  },
  {
    title: "SALES",
    items: [
      { title: "Leads", href: "/sales/leads", icon: UserPlus, badge: "12" },
      { title: "Customers", href: "/sales/customers", icon: Users },
      { title: "Sales Pipeline", href: "/sales/pipeline", icon: Kanban },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { title: "Overview", href: "/finance/overview", icon: BarChart3 },
      { title: "Invoices", href: "/finance/invoices", icon: FileText, badge: "2", badgeVariant: "warning" },
      { title: "Quotations", href: "/finance/quotations", icon: FileCheck },
      { title: "Payments", href: "/finance/payments", icon: Receipt },
      { title: "Income", href: "/finance/income", icon: ArrowDownLeft },
      { title: "Expenses", href: "/finance/expenses", icon: ArrowUpRight },
      { title: "Categories", href: "/finance/categories", icon: PieChart },
      { title: "Transactions", href: "/finance/transactions", icon: CreditCard },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { title: "Tasks", href: "/operations/tasks", icon: CheckSquare, badge: "5" },
      { title: "Reminders", href: "/operations/reminders", icon: Bell },
      { title: "Automations", href: "/operations/automations", icon: Zap },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { title: "Business Reports", href: "/analytics/reports", icon: BarChart3 },
      { title: "Sales Analytics", href: "/analytics/sales", icon: TrendingUp },
      { title: "Financial Analytics", href: "/analytics/financial", icon: PieChart },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { title: "Business Profile", href: "/settings/profile", icon: Building2 },
      { title: "Team & Permissions", href: "/settings/team", icon: ShieldCheck },
      { title: "Integrations", href: "/settings/integrations", icon: Puzzle },
      { title: "Preferences", href: "/settings/preferences", icon: Bell },
    ],
  },
];

export function Sidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isItemActive = (href: string) => {
    if (href === "/app") {
      return pathname === "/app" || pathname === "/app/";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#E3E9EF] shrink-0">
        <Link href="/app" className="flex items-center gap-2.5 overflow-hidden group">
          <div className="w-8 h-8 rounded-lg bg-[#101820] flex items-center justify-center text-[#F7F9FB] font-bold text-sm shadow-xs shrink-0 tracking-tight group-hover:bg-[#17232D] transition-colors">
            N
          </div>
          {!isCollapsed && (
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[#17212B] text-sm tracking-tight flex items-center gap-1.5">
                Nexora
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#EBF3FC] text-[#2F80ED] border border-[#C4DEFA]">
                  PRO
                </span>
              </span>
              <span className="text-[11px] text-[#667482] mt-0.5 font-medium">Business OS</span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-6 h-6 rounded-md text-[#667482] hover:text-[#17212B] hover:bg-[#F0F4F8] transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navSections.map((section) => {
          const isSectionCollapsed = !!collapsedSections[section.title];

          return (
            <div key={section.title} className="space-y-1">
              {!isCollapsed && (
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#667482] hover:text-[#17212B] transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-[#667482] transition-transform duration-200",
                      isSectionCollapsed && "-rotate-90"
                    )}
                  />
                </button>
              )}

              {(!isSectionCollapsed || isCollapsed) && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = isItemActive(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onMobileClose}
                        title={isCollapsed ? item.title : undefined}
                        className={cn(
                          "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-150",
                          active
                            ? "bg-[#EBF3FC] text-[#2F80ED] font-semibold"
                            : "text-[#667482] hover:bg-[#F0F4F8] hover:text-[#17212B]",
                          isCollapsed && "justify-center px-2"
                        )}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-md bg-[#2F80ED]" />
                        )}

                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            active
                              ? "text-[#2F80ED]"
                              : "text-[#667482] group-hover:text-[#17212B]"
                          )}
                        />

                        {!isCollapsed && (
                          <span className="truncate flex-1">{item.title}</span>
                        )}

                        {!isCollapsed && item.badge && (
                          <Badge
                            variant={item.badgeVariant || "default"}
                            size="sm"
                            className="ml-auto text-[10px] py-0 px-1.5 h-4.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Copilot Status Banner at bottom */}
      {!isCollapsed ? (
        <div className="p-3 border-t border-[#E3E9EF] bg-[#F7F9FB] shrink-0">
          <div className="rounded-xl border border-[#263746] bg-[#101820] text-[#F7F9FB] p-3 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-[#17232D] text-[#20B8A5] flex items-center justify-center">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="text-xs font-bold text-[#F7F9FB]">
                Nexora AI Engine
              </span>
            </div>
            <p className="text-[11px] text-[#A0B0C0] leading-relaxed mb-2">
              Autonomous workflows active and monitoring metrics.
            </p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-[#20B8A5] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#20B8A5] animate-pulse" />
                Operational
              </span>
              <span className="text-[#667482] font-mono text-[10px]">v2.0</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-[#E3E9EF] flex justify-center">
          <div
            className="w-8 h-8 rounded-lg bg-[#101820] text-[#20B8A5] flex items-center justify-center cursor-pointer hover:bg-[#17232D]"
            title="Nexora AI Engine: Operational"
          >
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-[#E3E9EF] bg-white transition-[width] duration-200 ease-in-out shrink-0 z-30",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#101820]/50 backdrop-blur-xs md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-200 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}
