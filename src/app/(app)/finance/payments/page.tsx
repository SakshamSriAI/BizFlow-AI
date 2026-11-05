"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { PaymentRecord, PaymentMethod, Invoice } from "@/types/invoicing";
import {
  getStoredPayments,
  getStoredInvoices,
  calculateInvoicingStats,
} from "@/lib/invoicing-store";
import { formatMoney } from "@/lib/money";
import { RecordPaymentModal } from "@/components/invoices/record-payment-modal";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Building2,
  QrCode,
  FileText,
  DollarSign,
  TrendingUp,
  Receipt,
  Download,
  ArrowLeft,
} from "lucide-react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState(calculateInvoicingStats());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedInvoiceToPay, setSelectedInvoiceToPay] = useState<Invoice | null>(null);

  const [receiptPayment, setReceiptPayment] = useState<PaymentRecord | null>(null);

  const refreshData = () => {
    setPayments(getStoredPayments());
    setInvoices(getStoredInvoices());
    setStats(calculateInvoicingStats());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("payments-updated", refreshData);
    window.addEventListener("invoices-updated", refreshData);
    return () => {
      window.removeEventListener("payments-updated", refreshData);
      window.removeEventListener("invoices-updated", refreshData);
    };
  }, []);

  // Filter payments
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.paymentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedMethod !== "all" && p.paymentMethod !== selectedMethod) return false;
    return true;
  });

  const unpaidInvoices = invoices.filter(
    (inv) => inv.status !== "paid" && inv.status !== "cancelled"
  );

  const handleOpenRecordPayment = () => {
    if (unpaidInvoices.length > 0) {
      setSelectedInvoiceToPay(unpaidInvoices[0]);
      setIsRecordModalOpen(true);
    } else {
      alert("All current invoices have been settled in full!");
    }
  };

  const getMethodBadge = (method: PaymentMethod) => {
    switch (method) {
      case "bank_transfer":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
            <Building2 className="w-3 h-3 text-blue-600" /> Bank Transfer
          </span>
        );
      case "upi":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
            <QrCode className="w-3 h-3 text-emerald-600" /> UPI
          </span>
        );
      case "stripe":
      case "card":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-[#EBF3FC] text-[#2F80ED] border border-[#C4DEFA]">
            <CreditCard className="w-3 h-3 text-[#2F80ED]" /> Card / Gateway
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200 uppercase font-mono text-[10px]">
            {method}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment Tracking & Ledger"
        description="Comprehensive audit trail of customer settlements, payment references, and real-time reconciliation."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/finance/invoices">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Invoices
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenRecordPayment}
              className="text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Record Settlement
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Total Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatMoney(stats.totalCollectedCents, "INR")}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all registered remittances</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Total Receipts</span>
            <Receipt className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {payments.length} Settlements
          </div>
          <p className="text-xs text-slate-500 mt-1">100% verified settlement records</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Average Payment</span>
            <TrendingUp className="w-4 h-4 text-[#20B8A5]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatMoney(
              payments.length > 0 ? Math.round(stats.totalCollectedCents / payments.length) : 0,
              "INR"
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">Per transaction average value</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Active Channels</span>
            <CreditCard className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            4 Gateways
          </div>
          <p className="text-xs text-slate-500 mt-1">NEFT, UPI, Stripe, Corporate Card</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, customer, or invoice..."
              className="pl-8 text-xs h-9"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              options={[
                { value: "all", label: "All Payment Methods" },
                { value: "bank_transfer", label: "Bank Transfer" },
                { value: "upi", label: "UPI" },
                { value: "stripe", label: "Stripe" },
                { value: "card", label: "Card" },
                { value: "cash", label: "Cash" },
              ]}
            />
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Transaction UTR / Ref</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium text-slate-600">No payment records found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Recorded customer settlements will display here automatically.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setReceiptPayment(p)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                      {p.paymentNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{p.paymentDate}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {p.customerName}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <Link
                        href={`/finance/invoices/${p.invoiceId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-700 hover:text-blue-600 underline font-medium"
                      >
                        {p.invoiceNumber}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">{getMethodBadge(p.paymentMethod)}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {p.reference}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600 text-sm">
                      +{formatMoney(p.amountCents, "INR")}
                    </td>
                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReceiptPayment(p)}
                        className="h-7 px-2 text-[11px]"
                      >
                        <Receipt className="w-3 h-3 mr-1" />
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Receipt Dialog */}
      <Modal
        isOpen={!!receiptPayment}
        onClose={() => setReceiptPayment(null)}
        title="Payment Receipt"
        description={receiptPayment?.paymentNumber}
      >
        {receiptPayment && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {formatMoney(receiptPayment.amountCents, "INR")}
              </h3>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                Payment Settled & Reconciled
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Receipt Number:</span>
                <span className="font-mono font-medium text-slate-900">
                  {receiptPayment.paymentNumber}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Settlement Date:</span>
                <span className="font-medium text-slate-900">{receiptPayment.paymentDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Customer Organization:</span>
                <span className="font-semibold text-slate-900">
                  {receiptPayment.customerName}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Settled Invoice:</span>
                <span className="font-mono font-semibold text-blue-600">
                  {receiptPayment.invoiceNumber}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Payment Channel:</span>
                <span>{getMethodBadge(receiptPayment.paymentMethod)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Transaction Reference UTR:</span>
                <span className="font-mono text-slate-800">{receiptPayment.reference}</span>
              </div>
              {receiptPayment.notes && (
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Notes:</span>
                  <p className="bg-slate-50 p-2 rounded text-slate-600">
                    {receiptPayment.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1" /> Print Receipt
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setReceiptPayment(null)}
                className="text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Record Payment Modal */}
      <RecordPaymentModal
        isOpen={isRecordModalOpen}
        onClose={() => {
          setIsRecordModalOpen(false);
          setSelectedInvoiceToPay(null);
        }}
        invoice={selectedInvoiceToPay}
        onPaymentSuccess={() => {
          refreshData();
        }}
      />
    </div>
  );
}
