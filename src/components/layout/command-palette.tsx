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
  BarChart3,
  Settings,
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
      href: "/",
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
      id: "nav-reports",
      title: "Business Reports",
      category: "Navigation",
      icon: BarChart3,
      href: "/analytics/reports",
    },
    {
      id: "act-lead",
      title: "Add New Lead",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => alert("Lead creation dialog will open in Phase 3."),
    },
    {
      id: "act-invoice",
      title: "Create New Invoice",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => alert("Invoice creator will open in Phase 5."),
    },
    {
      id: "act-expense",
      title: "Record New Expense",
      category: "Quick Actions",
      icon: PlusCircle,
      action: () => alert("Expense recorder will open in Phase 4."),
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
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, navigate pages, trigger workflows..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands or pages found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          <span>
            Use <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">↑</kbd> <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">↓</kbd> to navigate
          </span>
          <span>
            Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">ESC</kbd> to exit
          </span>
        </div>
      </div>
    </Modal>
  );
}
