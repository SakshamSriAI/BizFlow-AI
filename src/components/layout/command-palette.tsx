"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Bot,
  Sparkles,
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
  BarChart3,
  TrendingUp,
  Settings,
  ShieldCheck,
  Puzzle,
  PlusCircle,
  X,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Quick Actions";
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  action?: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const commands: CommandItem[] = [
    {
      id: "nav-dash",
      title: "Go to Dashboard",
      category: "Navigation",
      icon: LayoutDashboard,
      href: "/app",
    },
    {
      id: "nav-ai",
      title: "Open AI Assistant",
      category: "Navigation",
      icon: Bot,
      href: "/ai-assistant",
    },
    {
      id: "nav-agents",
      title: "AI Agents & Autonomous Workflows",
      category: "Navigation",
      icon: Sparkles,
      href: "/ai-agents",
    },
    {
      id: "nav-leads",
      title: "View Leads CRM",
      category: "Navigation",
      icon: UserPlus,
      href: "/sales/leads",
    },
    {
      id: "nav-customers",
      title: "View Customers",
      category: "Navigation",
      icon: Users,
      href: "/sales/customers",
    },
    {
      id: "nav-pipeline",
      title: "Sales Pipeline",
      category: "Navigation",
      icon: Kanban,
      href: "/sales/pipeline",
    },
    {
      id: "nav-invoices",
      title: "Manage Invoices",
      category: "Navigation",
      icon: FileText,
      href: "/finance/invoices",
    },
    {
      id: "nav-quotations",
      title: "Quotations & Estimates",
      category: "Navigation",
      icon: FileCheck,
      href: "/finance/quotations",
    },
    {
      id: "nav-payments",
      title: "Payment Tracking",
      category: "Navigation",
      icon: Receipt,
      href: "/finance/payments",
    },
    {
      id: "nav-expenses",
      title: "View Expenses",
      category: "Navigation",
      icon: ArrowUpRight,
      href: "/finance/expenses",
    },
    {
      id: "nav-tasks",
      title: "Operational Tasks",
      category: "Navigation",
      icon: CheckSquare,
      href: "/operations/tasks",
    },
    {
      id: "nav-reminders",
      title: "System Reminders & Deadlines",
      category: "Navigation",
      icon: Bell,
      href: "/operations/reminders",
    },
    {
      id: "nav-reports",
      title: "Business Reports",
      category: "Navigation",
      icon: BarChart3,
      href: "/analytics/reports",
    },
    {
      id: "nav-sales-analytics",
      title: "Sales Analytics",
      category: "Navigation",
      icon: TrendingUp,
      href: "/analytics/sales",
    },
    {
      id: "nav-financial-analytics",
      title: "Financial Analytics",
      category: "Navigation",
      icon: CreditCard,
      href: "/analytics/financial",
    },
    {
      id: "nav-profile",
      title: "Business Profile Settings",
      category: "Navigation",
      icon: Settings,
      href: "/settings/profile",
    },
    {
      id: "nav-team",
      title: "Team & Permissions",
      category: "Navigation",
      icon: ShieldCheck,
      href: "/settings/team",
    },
    {
      id: "nav-integrations",
      title: "Integrations & API Services",
      category: "Navigation",
      icon: Puzzle,
      href: "/settings/integrations",
    },
    {
      id: "act-lead",
      title: "Add New Lead",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => router.push("/sales/leads"),
    },
    {
      id: "act-invoice",
      title: "Create New Invoice",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => router.push("/finance/invoices"),
    },
    {
      id: "act-expense",
      title: "Record New Expense",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => router.push("/finance/expenses"),
    },
    {
      id: "act-task",
      title: "Create Operational Task",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => router.push("/operations/tasks"),
    },
    {
      id: "act-reminder",
      title: "Add System Reminder",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => router.push("/operations/reminders"),
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CommandItem) => {
    onClose();
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="-mt-2 space-y-3">
        <div className="flex items-center gap-2 border-b border-[#E3E9EF] pb-3">
          <Search className="w-5 h-5 text-[#667482] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, navigate pages, trigger workflows..."
            className="w-full bg-transparent text-sm text-[#17212B] placeholder:text-[#667482]/60 outline-none font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#667482] hover:text-[#17212B] text-xs font-medium"
            >
              Clear
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#667482]">
              No matching commands or pages found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-[#17212B] hover:bg-[#EBF3FC] hover:text-[#2F80ED] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#667482] group-hover:text-[#2F80ED] transition-colors" />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-[#667482] uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#E3E9EF] text-[11px] text-[#667482]">
          <span>
            Use <kbd className="px-1.5 py-0.5 bg-[#F0F4F8] rounded text-[#17212B] font-mono border border-[#E3E9EF]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-[#F0F4F8] rounded text-[#17212B] font-mono border border-[#E3E9EF]">↓</kbd> to navigate
          </span>
          <span>
            Press <kbd className="px-1.5 py-0.5 bg-[#F0F4F8] rounded text-[#17212B] font-mono border border-[#E3E9EF]">ESC</kbd> to exit
          </span>
        </div>
      </div>
    </Modal>
  );
}
