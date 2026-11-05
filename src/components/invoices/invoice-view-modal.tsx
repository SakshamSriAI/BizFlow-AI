"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoicing";
import { formatMoney } from "@/lib/money";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { RecordPaymentModal } from "./record-payment-modal";
import { markInvoiceCancelled, markInvoiceSent } from "@/lib/invoicing-store";
import {
  Printer,
  CreditCard,
  Send,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Ban,
} from "lucide-react";

interface InvoiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onInvoiceUpdated?: () => void;
}

export function InvoiceViewModal({
  isOpen,
  onClose,
  invoice,
  onInvoiceUpdated,
}: InvoiceViewModalProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendReminder = () => {
    markInvoiceSent(invoice.id);
    setSendSuccess(true);
    onInvoiceUpdated?.();
    setTimeout(() => setSendSuccess(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/finance/invoices/${invoice.id}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCancel = () => {
    if (confirm(`Are you sure you want to cancel invoice ${invoice.invoiceNumber}?`)) {
      markInvoiceCancelled(invoice.id);
      onInvoiceUpdated?.();
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Invoice ${invoice.invoiceNumber}`}
        description={`Status: ${invoice.status.toUpperCase()}`}
        maxWidth="2xl"
      >
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <InvoiceStatusBadge status={invoice.status} />
              {sendSuccess && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sent to {invoice.customerEmail}!
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="text-xs"
              >
                <Copy className="w-3.5 h-3.5 mr-1" />
                {copiedLink ? "Copied Link" : "Copy Link"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="text-xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1" />
                Print / Save PDF
              </Button>

              {invoice.status !== "paid" && invoice.status !== "cancelled" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendReminder}
                    className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    {invoice.status === "draft" ? "Send to Client" : "Send Reminder"}
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-xs"
                  >
                    <CreditCard className="w-3.5 h-3.5 mr-1" />
                    Record Payment
                  </Button>
                </>
              )}

              {invoice.status !== "cancelled" && invoice.status !== "paid" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                >
                  <Ban className="w-3.5 h-3.5 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div
            id="printable-invoice"
            className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8 shadow-sm"
          >
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm tracking-wider">
                    N
                  </div>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    Nexora Technologies
                  </span>
                </div>
                <p className="text-xs text-slate-500">Business Management & AI Workspace</p>
                <p className="text-xs text-slate-500 mt-1">Level 4, Tech Park Boulevard</p>
                <p className="text-xs text-slate-500">Bengaluru, KA 560103, India</p>
                <p className="text-xs text-slate-500">GSTIN: 29AAACN8923K1ZT</p>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 block">
                  TAX INVOICE
                </span>
                <p className="text-sm font-semibold text-blue-600">
                  {invoice.invoiceNumber}
                </p>
                <div className="text-xs text-slate-500 pt-1 space-y-0.5">
                  <p>
                    <span className="text-slate-400">Issue Date:</span>{" "}
                    <span className="font-medium text-slate-700">{invoice.issueDate}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Due Date:</span>{" "}
                    <span className="font-medium text-slate-700">{invoice.dueDate}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Payment Status:</span>{" "}
                    <span className="font-semibold uppercase text-slate-800">
                      {invoice.status.replace("_", " ")}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Billed To / Client Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Billed To
                </span>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {invoice.customerName}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{invoice.customerEmail}</p>
                {invoice.customerAddress && (
                  <p className="text-xs text-slate-500 mt-1 whitespace-pre-line">
                    {invoice.customerAddress}
                  </p>
                )}
                {invoice.customerTaxId && (
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Tax / GST: {invoice.customerTaxId}
                  </p>
                )}
              </div>

              <div className="sm:text-right flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Balance Due
                  </span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {formatMoney(invoice.amountDueCents, invoice.currency)}
                  </div>
                </div>

                {invoice.amountPaidCents > 0 && (
                  <div className="text-xs text-emerald-700 font-medium bg-emerald-50 py-1 px-2.5 rounded border border-emerald-200 inline-block sm:self-end">
                    Payment of {formatMoney(invoice.amountPaidCents, invoice.currency)} recorded
                  </div>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-2">#</th>
                    <th className="py-3 px-2">Description</th>
                    <th className="py-3 px-2 text-center">Qty</th>
                    <th className="py-3 px-2 text-right">Unit Rate</th>
                    <th className="py-3 px-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map((item, idx) => (
                    <tr key={item.id} className="text-slate-800">
                      <td className="py-3.5 px-2 text-xs text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-2 font-medium text-slate-900">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-2 text-center text-slate-600">
                        {item.quantity}
                      </td>
                      <td className="py-3.5 px-2 text-right text-slate-600">
                        {formatMoney(item.unitPriceCents, invoice.currency)}
                      </td>
                      <td className="py-3.5 px-2 text-right font-semibold text-slate-900">
                        {formatMoney(item.amountCents, invoice.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals & Notes Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
              <div className="space-y-4">
                {/* Payment Instructions */}
                {invoice.paymentInstructions && (
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5">
                    <p className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                      Bank Remittance Details
                    </p>
                    <p className="text-slate-600">
                      Bank: <span className="font-medium text-slate-900">{invoice.paymentInstructions.bankName}</span>
                    </p>
                    <p className="text-slate-600">
                      Account: <span className="font-medium text-slate-900">{invoice.paymentInstructions.accountNumber}</span>
                    </p>
                    <p className="text-slate-600">
                      IFSC / Swift: <span className="font-medium text-slate-900">{invoice.paymentInstructions.routingCode}</span>
                    </p>
                    {invoice.paymentInstructions.upiId && (
                      <p className="text-slate-600">
                        UPI VPA: <span className="font-medium text-blue-600">{invoice.paymentInstructions.upiId}</span>
                      </p>
                    )}
                  </div>
                )}

                {invoice.notes && (
                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                      Notes
                    </span>
                    <p className="text-xs text-slate-500 whitespace-pre-line bg-slate-50 p-2.5 rounded border border-slate-100">
                      {invoice.notes}
                    </p>
                  </div>
                )}

                {invoice.terms && (
                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                      Terms & Conditions
                    </span>
                    <p className="text-xs text-slate-500 whitespace-pre-line">
                      {invoice.terms}
                    </p>
                  </div>
                )}
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    {formatMoney(invoice.subtotalCents, invoice.currency)}
                  </span>
                </div>

                {invoice.discountCents > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({invoice.discountPercent}%):</span>
                    <span className="font-medium">
                      -{formatMoney(invoice.discountCents, invoice.currency)}
                    </span>
                  </div>
                )}

                {invoice.taxCents > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Tax / GST ({invoice.taxPercent}%):</span>
                    <span className="font-medium">
                      +{formatMoney(invoice.taxCents, invoice.currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span>{formatMoney(invoice.totalCents, invoice.currency)}</span>
                </div>

                <div className="flex justify-between text-sm text-emerald-600 pt-1">
                  <span>Amount Paid:</span>
                  <span className="font-medium">
                    {formatMoney(invoice.amountPaidCents, invoice.currency)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200 bg-slate-50 p-2.5 rounded-lg">
                  <span className="text-slate-700">Balance Due:</span>
                  <span className="text-blue-600">
                    {formatMoney(invoice.amountDueCents, invoice.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
              <p>Generated by Nexora BusinessOS • Digital Invoice</p>
              <div className="text-right">
                <div className="w-32 border-b border-slate-300 pb-1 mb-1 font-signature italic text-slate-600">
                  Authorized Signatory
                </div>
                <p className="text-[10px]">Nexora Technologies Pvt Ltd</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Linked Payment Recording Modal */}
      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoice={invoice}
        onPaymentSuccess={() => {
          onInvoiceUpdated?.();
        }}
      />
    </>
  );
}
