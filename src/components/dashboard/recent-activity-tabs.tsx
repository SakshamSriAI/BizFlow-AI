"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Search,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  RecentInvoice,
  RecentTransaction,
  CustomerActivity,
  UpcomingFollowUp,
} from "@/data/mock-dashboard-data";
import { cn } from "@/lib/utils";

export interface RecentActivityTabsProps {
  invoices: RecentInvoice[];
  transactions: RecentTransaction[];
  activities: CustomerActivity[];
  followUps: UpcomingFollowUp[];
  currencySymbol?: string;
}

export function RecentActivityTabs({
  invoices,
  transactions,
  activities,
  followUps: initialFollowUps,
  currencySymbol = "₹",
}: RecentActivityTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"invoices" | "transactions" | "activity" | "followups">("invoices");
  const [followUpsList, setFollowUpsList] = React.useState(initialFollowUps);
  const [selectedInvoice, setSelectedInvoice] = React.useState<RecentInvoice | null>(null);

  const toggleFollowUp = (id: string) => {
    setFollowUpsList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, completed: !f.completed } : f))
    );
  };

  const tabs = [
    { id: "invoices", label: "Recent Invoices", count: invoices.length, icon: FileText },
    { id: "transactions", label: "Transactions", count: transactions.length, icon: CreditCard },
    { id: "activity", label: "Customer Activity", count: activities.length, icon: Users },
    { id: "followups", label: "Upcoming Follow-ups", count: followUpsList.filter((f) => !f.completed).length, icon: Clock },
  ];

  return (
    <Card className="overflow-hidden">
      {/* Tabs Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 px-5 pt-4 pb-0 gap-3 bg-white">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-3 text-xs font-medium border-b-2 transition-all whitespace-nowrap",
                  isActive
                    ? "border-indigo-600 text-indigo-700 font-semibold"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-indigo-600" : "text-slate-400")} />
                <span>{tab.label}</span>
                <Badge
                  variant={isActive ? "indigo" : "secondary"}
                  size="sm"
                  className="text-[10px] py-0 px-1.5 h-4"
                >
                  {tab.count}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-0">
        {/* TAB 1: RECENT INVOICES */}
        {activeTab === "invoices" && (
          <div className="animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs font-semibold text-indigo-600">
                      {inv.invoiceNumber}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{inv.clientName}</div>
                      <div className="text-[11px] text-slate-400">{inv.clientEmail}</div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {inv.issueDate}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {inv.dueDate}
                    </TableCell>
                    <TableCell className="font-bold text-slate-900 font-mono">
                      {currencySymbol}
                      {inv.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inv.status === "paid"
                            ? "success"
                            : inv.status === "overdue"
                            ? "danger"
                            : "warning"
                        }
                        dot
                        size="sm"
                        className="capitalize"
                      >
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/finance/invoices`}>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          Inspect
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* TAB 2: RECENT TRANSACTIONS */}
        {activeTab === "transactions" && (
          <div className="animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Party / Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                            tx.type === "income"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-600"
                          )}
                        >
                          {tx.type === "income" ? (
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <span className="font-semibold text-slate-900 text-xs">
                          {tx.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-xs">
                      {tx.customerOrVendor}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" size="sm">
                        {tx.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-400">
                      {tx.date}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 font-medium">
                      {tx.method}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-mono font-bold text-sm",
                        tx.type === "income" ? "text-emerald-600" : "text-slate-900"
                      )}
                    >
                      {tx.type === "income" ? "+" : "-"}
                      {currencySymbol}
                      {tx.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* TAB 3: CUSTOMER ACTIVITY FEED */}
        {activeTab === "activity" && (
          <div className="p-5 space-y-4 animate-fade-in divide-y divide-slate-100">
            {activities.map((act) => (
              <div key={act.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {act.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        {act.clientName}
                      </span>
                      <span className="text-[11px] text-slate-400">•</span>
                      <span className="text-xs text-slate-600 font-medium">
                        {act.action}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {act.detail}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                  {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: UPCOMING FOLLOW-UPS */}
        {activeTab === "followups" && (
          <div className="p-4 space-y-2.5 animate-fade-in">
            {followUpsList.map((fol) => (
              <div
                key={fol.id}
                className={cn(
                  "p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3",
                  fol.completed
                    ? "bg-slate-50/70 border-slate-200 opacity-60"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                )}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFollowUp(fol.id)}
                    className={cn(
                      "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                      fol.completed
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 hover:border-indigo-600"
                    )}
                    aria-label={fol.completed ? "Mark pending" : "Mark completed"}
                  >
                    {fol.completed && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <div
                      className={cn(
                        "text-xs font-bold text-slate-900",
                        fol.completed && "line-through text-slate-400"
                      )}
                    >
                      {fol.task}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{fol.contactName} ({fol.company})</span>
                      <span>•</span>
                      <span>Owner: {fol.assignedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={
                      fol.priority === "high"
                        ? "danger"
                        : fol.priority === "medium"
                        ? "warning"
                        : "secondary"
                    }
                    size="sm"
                  >
                    {fol.priority}
                  </Badge>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {fol.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
