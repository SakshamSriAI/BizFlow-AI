"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Invoice, PaymentMethod } from "@/types/invoicing";
import { formatMoney, toCents } from "@/lib/money";
import { recordInvoicePayment } from "@/lib/invoicing-store";
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onPaymentSuccess?: () => void;
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  invoice,
  onPaymentSuccess,
}: RecordPaymentModalProps) {
  if (!invoice) return null;

  const dueAmount = invoice.amountDueCents / 100;
  const [amountStr, setAmountStr] = useState<string>(dueAmount.toString());
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank_transfer");
  const [reference, setReference] = useState<string>(
    `UTR-${Math.floor(100000000 + Math.random() * 900000000)}`
  );
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePayFull = () => {
    setAmountStr((invoice.amountDueCents / 100).toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amountStr);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid positive payment amount.");
      return;
    }

    const amountInCents = toCents(numAmount);
    if (amountInCents > invoice.amountDueCents) {
      alert("Payment amount cannot exceed the remaining balance due.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = recordInvoicePayment(invoice.id, {
        amountCents: amountInCents,
        paymentDate,
        paymentMethod,
        reference,
        notes,
      });

      setIsSubmitting(false);
      if (result) {
        setSuccessMessage(
          `Payment of ${formatMoney(amountInCents, invoice.currency)} recorded successfully! Financial ledger updated.`
        );
        setTimeout(() => {
          setSuccessMessage(null);
          onPaymentSuccess?.();
          onClose();
        }, 1200);
      }
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Record Payment for ${invoice.invoiceNumber}`}
      description={`Customer: ${invoice.customerName}`}
    >
      {successMessage ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-base font-semibold text-slate-900">{successMessage}</p>
          <p className="text-xs text-slate-500">
            Invoice status and income ledger synchronized automatically.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Summary Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Invoice Total:</span>
              <span className="font-medium text-slate-900">
                {formatMoney(invoice.totalCents, invoice.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Already Paid:</span>
              <span className="font-medium text-emerald-600">
                {formatMoney(invoice.amountPaidCents, invoice.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-700">Remaining Due:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">
                  {formatMoney(invoice.amountDueCents, invoice.currency)}
                </span>
                {parseFloat(amountStr) !== dueAmount && (
                  <button
                    type="button"
                    onClick={handlePayFull}
                    className="text-xs text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Pay in Full
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Amount ({invoice.currency})
            </label>
            <div className="relative">
              <Input
                type="number"
                step="any"
                min="0.01"
                max={dueAmount}
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                required
                className="pl-8 text-base font-medium"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 font-medium text-sm">
                {invoice.currency === "INR" ? "₹" : "$"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Date
              </label>
              <Input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Method
              </label>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                options={[
                  { value: "bank_transfer", label: "Bank Transfer (NEFT/RTGS/IMPS)" },
                  { value: "upi", label: "UPI / QR Code" },
                  { value: "stripe", label: "Stripe / Card Gateway" },
                  { value: "card", label: "Corporate Credit Card" },
                  { value: "cheque", label: "Bank Cheque" },
                  { value: "cash", label: "Cash Receipt" },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reference / Transaction ID
            </label>
            <Input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. UTR-98231024 or Cheque #"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Internal Notes (Optional)
            </label>
            <Input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Received via corporate HDFC account"
            />
          </div>

          <div className="bg-emerald-50 text-emerald-800 text-xs p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              This will automatically log an inflow transaction in your Financial Ledger and sync with receivables.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                "Recording..."
              ) : (
                <>
                  Confirm Payment <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
