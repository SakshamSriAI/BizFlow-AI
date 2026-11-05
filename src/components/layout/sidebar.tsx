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
  badgeVariant?: "default" | "success" | "warning" | "danger" | "indigo";
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
        badgeVariant: "indigo",
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
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
        <Link href="/app" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0 tracking-tight">
            N
          </div>
          {!isCollapsed && (
            <div className="flex flex-col leading-none">
              <span className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                Nexora
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  v1.0
                </span>
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Business Platform</span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-6 h-6 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-slate-400 transition-transform duration-200",
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
                            ? "bg-indigo-50/80 text-indigo-700 font-semibold"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
                          isCollapsed && "justify-center px-2"
                        )}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-md bg-indigo-600" />
                        )}

                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            active
                              ? "text-indigo-600"
                              : "text-slate-400 group-hover:text-slate-600"
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
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <div className="rounded-xl border border-indigo-100 bg-linear-to-b from-indigo-50/50 to-white p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Business AI Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
              5 autonomous workflows active and monitoring metrics.
            </p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operational
              </span>
              <span className="text-slate-400 font-mono">v1.2</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-slate-100 flex justify-center">
          <div
            className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 cursor-pointer hover:bg-indigo-100"
            title="Business AI Engine: Operational"
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
          "hidden md:flex flex-col border-r border-slate-200/80 bg-white transition-[width] duration-200 ease-in-out shrink-0 z-30",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
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
