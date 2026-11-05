"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Quotation, QuotationStatus } from "@/types/invoicing";
import {
  getStoredQuotations,
  convertQuotationToInvoice,
  deleteQuotation,
} from "@/lib/invoicing-store";
import { formatMoney } from "@/lib/money";
import { QuotationStatusBadge } from "@/components/invoices/invoice-status-badge";
import { QuotationModal } from "@/components/invoices/quotation-modal";
import {
  FileCheck,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ArrowLeft,
  Edit,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function QuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotationToEdit, setQuotationToEdit] = useState<Quotation | null>(null);

  const [conversionSuccessMessage, setConversionSuccessMessage] = useState<string | null>(null);

  const refreshData = () => {
    setQuotations(getStoredQuotations());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("quotations-updated", refreshData);
    return () => {
      window.removeEventListener("quotations-updated", refreshData);
    };
  }, []);

  // Filter
  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "all") return true;
    return q.status === activeTab;
  });

  // Calculate metrics
  let totalQuotedCents = 0;
  let acceptedCents = 0;
  let convertedCount = 0;
  let activeCount = 0;

  for (const q of quotations) {
    totalQuotedCents += q.totalCents;
    if (q.status === "accepted" || q.status === "converted") {
      acceptedCents += q.totalCents;
    }
    if (q.status === "converted") {
      convertedCount++;
    }
    if (q.status === "sent" || q.status === "accepted") {
      activeCount++;
    }
  }

  const conversionRate =
    quotations.length > 0
      ? Math.round(((convertedCount + quotations.filter((q) => q.status === "accepted").length) / quotations.length) * 100)
      : 0;

  const handleConvert = (quote: Quotation) => {
    if (
      confirm(
        `Convert proposal ${quote.quoteNumber} into an active draft Invoice? All line items and client info will be transferred.`
      )
    ) {
      const newInvoice = convertQuotationToInvoice(quote.id);
      if (newInvoice) {
        refreshData();
        setConversionSuccessMessage(
          `Quotation converted to ${newInvoice.invoiceNumber}! Redirecting to Invoices...`
        );
        setTimeout(() => {
          setConversionSuccessMessage(null);
          router.push(`/finance/invoices`);
        }, 1500);
      }
    }
  };

  const handleDelete = (quote: Quotation) => {
    if (confirm(`Delete quotation ${quote.quoteNumber}?`)) {
      deleteQuotation(quote.id);
      refreshData();
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotations & Cost Estimates"
        description="Craft scope proposals and convert approved estimates into active billing invoices with a single click."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/finance/invoices">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Invoices
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setQuotationToEdit(null);
                setIsModalOpen(true);
              }}
              className="text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              New Quotation
            </Button>
          </div>
        }
      />

      {conversionSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-fade-in shadow-sm">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{conversionSuccessMessage}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Total Value Quoted</span>
            <FileCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatMoney(totalQuotedCents, "INR")}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all proposals prepared</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Accepted Pipeline</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {formatMoney(acceptedCents, "INR")}
          </div>
          <p className="text-xs text-slate-500 mt-1">Approved client deliverables</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {conversionRate}%
          </div>
          <p className="text-xs text-slate-500 mt-1">Proposals converted to invoices</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Awaiting Decision</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {activeCount} Active
          </div>
          <p className="text-xs text-slate-500 mt-1">Open client evaluations</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Estimates" },
              { id: "accepted", label: "Accepted" },
              { id: "sent", label: "Sent" },
              { id: "converted", label: "Converted" },
              { id: "draft", label: "Drafts" },
              { id: "expired", label: "Expired" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search estimate or customer..."
              className="pl-8 text-xs h-9"
            />
          </div>
        </div>

        {/* Quotations List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Quote #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Valid Until</th>
                <th className="py-3 px-4">Deliverables</th>
                <th className="py-3 px-4 text-right">Total Value</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium text-slate-600">No quotations found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Create a new quotation to get started.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                      {q.quoteNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{q.customerName}</div>
                      <div className="text-[11px] text-slate-400">{q.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{q.issueDate}</td>
                    <td className="py-3.5 px-4 text-slate-600">{q.expiryDate}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-[200px] truncate">
                      {q.items.map((it) => it.description).join(", ")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      {formatMoney(q.totalCents, "INR")}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <QuotationStatusBadge status={q.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click Convert to Invoice Button! */}
                        {q.status !== "converted" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleConvert(q)}
                            className="h-7 px-2.5 text-[11px] bg-blue-600 hover:bg-blue-700"
                            title="Convert to Invoice"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Convert to Invoice
                          </Button>
                        )}

                        {q.status === "converted" && q.convertedInvoiceId && (
                          <Link href={`/finance/invoices`}>
                            <span className="text-[11px] text-violet-700 font-semibold hover:underline flex items-center gap-0.5">
                              View Invoice <ArrowRight className="w-3 h-3" />
                            </span>
                          </Link>
                        )}

                        {q.status === "draft" && (
                          <button
                            onClick={() => {
                              setQuotationToEdit(q);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                            title="Edit Quotation"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(q)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                          title="Delete Quotation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quotation Modal */}
      <QuotationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setQuotationToEdit(null);
        }}
        quotationToEdit={quotationToEdit}
        onSaved={() => {
          refreshData();
        }}
      />
    </div>
  );
}
