"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Invoice, InvoiceStatus } from "@/types/invoicing";
import {
  getStoredInvoices,
  calculateInvoicingStats,
  deleteInvoice,
  markInvoiceSent,
} from "@/lib/invoicing-store";
import { formatMoney } from "@/lib/money";
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";
import { InvoiceViewModal } from "@/components/invoices/invoice-view-modal";
import { InvoiceBuilder } from "@/components/invoices/invoice-builder";
import { RecordPaymentModal } from "@/components/invoices/record-payment-modal";
import {
  FileText,
  Plus,
  Search,
  Filter,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MoreVertical,
  Printer,
  Send,
  Eye,
  Trash2,
  Edit,
  FileCheck,
} from "lucide-react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState(calculateInvoicingStats());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");

  // Modals state
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [invoiceForPayment, setInvoiceForPayment] = useState<Invoice | null>(null);

  const refreshData = () => {
    const list = getStoredInvoices();
    setInvoices(list);
    setStats(calculateInvoicingStats());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("invoices-updated", refreshData);
    window.addEventListener("payments-updated", refreshData);
    return () => {
      window.removeEventListener("invoices-updated", refreshData);
      window.removeEventListener("payments-updated", refreshData);
    };
  }, []);

  // Filter & Search
  const todayStr = new Date().toISOString().split("T")[0];

  const filteredInvoices = invoices.filter((inv) => {
    // Search filter
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Tab filter
    if (activeTab === "all") return true;
    if (activeTab === "overdue") {
      return (
        inv.status === "overdue" ||
        (inv.status !== "paid" && inv.status !== "cancelled" && inv.dueDate < todayStr)
      );
    }
    if (activeTab === "unpaid") {
      return (
        inv.status === "sent" ||
        inv.status === "partially_paid" ||
        inv.status === "overdue"
      );
    }
    if (activeTab === "paid") return inv.status === "paid";
    if (activeTab === "draft") return inv.status === "draft";

    return true;
  });

  // Sort
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    }
    if (sortOption === "oldest") {
      return new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
    }
    if (sortOption === "amount-high") {
      return b.totalCents - a.totalCents;
    }
    if (sortOption === "due-soon") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const handleOpenView = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsViewModalOpen(true);
  };

  const handleOpenPayment = (inv: Invoice, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setInvoiceForPayment(inv);
    setIsPaymentModalOpen(true);
  };

  const handleEditDraft = (inv: Invoice, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setInvoiceToEdit(inv);
    setIsBuilderOpen(true);
  };

  const handleDelete = (inv: Invoice, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm(`Are you sure you want to delete invoice ${inv.invoiceNumber}?`)) {
      deleteInvoice(inv.id);
      refreshData();
    }
  };

  const handleSendReminder = (inv: Invoice, e?: React.MouseEvent) => {
    e?.stopPropagation();
    markInvoiceSent(inv.id);
    refreshData();
    alert(`Payment reminder notification sent to ${inv.customerEmail}.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Invoices & Receivables"
        description="Issue professional commercial invoices, monitor payment statuses, and collect receivables."
        actions={
          <div className="flex items-center gap-2.5">
            <Link href="/finance/quotations">
              <Button variant="outline" size="sm" className="text-xs">
                <FileCheck className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Quotations ({stats.pendingCount + 4})
              </Button>
            </Link>
            <Link href="/finance/payments">
              <Button variant="outline" size="sm" className="text-xs">
                <CreditCard className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Payments Register
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setInvoiceToEdit(null);
                setIsBuilderOpen(true);
              }}
              className="text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              New Invoice
            </Button>
          </div>
        }
      />

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invoiced */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Total Invoiced</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatMoney(stats.totalInvoicedCents, "INR")}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Across {stats.invoiceCount} generated billing records
          </p>
        </div>

        {/* Total Collected */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Collected Revenue</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {formatMoney(stats.totalCollectedCents, "INR")}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {stats.totalInvoicedCents > 0
              ? `${Math.round((stats.totalCollectedCents / stats.totalInvoicedCents) * 100)}% realization rate`
              : "0% realization rate"}
          </p>
        </div>

        {/* Outstanding Receivables */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Outstanding Balance</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatMoney(stats.totalOutstandingCents, "INR")}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Uncollected active client receivables
          </p>
        </div>

        {/* Overdue Amount */}
        <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-sm bg-rose-50/20 hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between text-xs text-rose-600 mb-2 font-semibold">
            <span>Overdue Amount</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600">
            {formatMoney(stats.totalOverdueCents, "INR")}
          </div>
          <p className="text-xs text-rose-500 mt-1 font-medium">
            {stats.overdueCount} {stats.overdueCount === 1 ? "invoice" : "invoices"} past due date
          </p>
        </div>
      </div>

      {/* Main Register Table & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Invoices", count: invoices.length },
              { id: "overdue", label: "Overdue", count: stats.overdueCount, variant: "rose" },
              { id: "unpaid", label: "Unpaid", count: invoices.filter((i) => i.status === "sent" || i.status === "partially_paid").length },
              { id: "paid", label: "Paid", count: stats.paidCount },
              { id: "draft", label: "Drafts", count: stats.draftCount },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? tab.variant === "rose"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive
                          ? "bg-white/20 text-white"
                          : tab.variant === "rose" && tab.count > 0
                          ? "bg-rose-100 text-rose-700 font-bold"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice or customer..."
                className="pl-8 text-xs h-9"
              />
            </div>
            <div className="w-40">
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                options={[
                  { value: "newest", label: "Newest First" },
                  { value: "oldest", label: "Oldest First" },
                  { value: "amount-high", label: "Highest Amount" },
                  { value: "due-soon", label: "Due Soonest" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Invoices List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium text-slate-600">No invoices found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try adjusting your filter or create a new invoice.
                    </p>
                  </td>
                </tr>
              ) : (
                sortedInvoices.map((inv) => {
                  const isOverdue =
                    inv.status === "overdue" ||
                    (inv.status !== "paid" &&
                      inv.status !== "cancelled" &&
                      inv.dueDate < todayStr);

                  return (
                    <tr
                      key={inv.id}
                      onClick={() => handleOpenView(inv)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Invoice # */}
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600 group-hover:underline">
                        {inv.invoiceNumber}
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {inv.customerName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {inv.customerEmail}
                        </div>
                      </td>

                      {/* Issue Date */}
                      <td className="py-3 px-4 text-slate-600">
                        {inv.issueDate}
                      </td>

                      {/* Due Date */}
                      <td className="py-3 px-4">
                        <span
                          className={`font-medium ${
                            isOverdue
                              ? "text-rose-600 font-semibold"
                              : "text-slate-600"
                          }`}
                        >
                          {inv.dueDate}
                        </span>
                        {isOverdue && (
                          <span className="block text-[10px] text-rose-500 font-semibold">
                            Past due
                          </span>
                        )}
                      </td>

                      {/* Total */}
                      <td className="py-3 px-4 text-right font-bold text-slate-900">
                        {formatMoney(inv.totalCents, inv.currency)}
                      </td>

                      {/* Balance Due */}
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`font-semibold ${
                            inv.amountDueCents > 0
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {formatMoney(inv.amountDueCents, inv.currency)}
                        </span>
                        {inv.amountPaidCents > 0 && inv.amountDueCents > 0 && (
                          <div className="w-16 ml-auto mt-1 bg-slate-200 h-1 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round(
                                    (inv.amountPaidCents / inv.totalCents) * 100
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <InvoiceStatusBadge
                          status={isOverdue ? "overdue" : inv.status}
                        />
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Record Payment Button */}
                          {inv.status !== "paid" && inv.status !== "cancelled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => handleOpenPayment(inv, e)}
                              className="h-7 px-2 text-[11px] text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                              title="Record Payment"
                            >
                              <CreditCard className="w-3 h-3 mr-1" />
                              Pay
                            </Button>
                          )}

                          {/* Send Reminder Button */}
                          {inv.status !== "paid" && inv.status !== "draft" && (
                            <button
                              onClick={(e) => handleSendReminder(inv, e)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100 transition-colors"
                              title="Send Reminder"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Edit if Draft */}
                          {inv.status === "draft" && (
                            <button
                              onClick={(e) => handleEditDraft(inv, e)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
                              title="Edit Draft"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* View */}
                          <button
                            onClick={() => handleOpenView(inv)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={(e) => handleDelete(inv, e)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors"
                            title="Delete Invoice"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Viewer Modal */}
      <InvoiceViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoice={selectedInvoice}
        onInvoiceUpdated={() => {
          refreshData();
          if (selectedInvoice) {
            const updated = getStoredInvoices().find((i) => i.id === selectedInvoice.id);
            setSelectedInvoice(updated || null);
          }
        }}
      />

      {/* Invoice Builder Modal (Create & Edit) */}
      <InvoiceBuilder
        isOpen={isBuilderOpen}
        onClose={() => {
          setIsBuilderOpen(false);
          setInvoiceToEdit(null);
        }}
        invoiceToEdit={invoiceToEdit}
        onInvoiceSaved={() => {
          refreshData();
        }}
      />

      {/* Record Payment Modal */}
      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setInvoiceForPayment(null);
        }}
        invoice={invoiceForPayment}
        onPaymentSuccess={() => {
          refreshData();
        }}
      />
    </div>
  );
}
