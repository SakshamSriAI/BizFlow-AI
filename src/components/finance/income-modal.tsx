"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { IncomeRecord, PaymentMethod } from "@/types/finance";
import { DollarSign, Calendar, Building2, FileText, CreditCard } from "lucide-react";
import { getStoredCustomers } from "@/lib/crm-store";

export interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (incomeData: any) => void;
  initialIncome?: IncomeRecord | null;
}

export function IncomeModal({
  isOpen,
  onClose,
  onSubmit,
  initialIncome,
}: IncomeModalProps) {
  const [incomeSource, setIncomeSource] = React.useState("Monthly Retainer");
  const [amount, setAmount] = React.useState(75000);
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [customer, setCustomer] = React.useState("Horizon Digital Media");
  const [relatedInvoice, setRelatedInvoice] = React.useState("INV-2026-090");
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(
    "Bank Transfer (NEFT/RTGS)"
  );
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [customerOptions, setCustomerOptions] = React.useState<{ value: string; label: string }[]>([]);

  React.useEffect(() => {
    const custs = getStoredCustomers();
    if (custs.length > 0) {
      setCustomerOptions(custs.map((c) => ({ value: c.company, label: c.company })));
    } else {
      setCustomerOptions([
        { value: "Horizon Digital Media", label: "Horizon Digital Media" },
        { value: "Zenith Software Labs", label: "Zenith Software Labs" },
      ]);
    }

    if (initialIncome) {
      setIncomeSource(initialIncome.incomeSource);
      setAmount(initialIncome.amount);
      setDate(initialIncome.date);
      setCustomer(initialIncome.customer);
      setRelatedInvoice(initialIncome.relatedInvoice || "");
      setPaymentMethod(initialIncome.paymentMethod);
      setNotes(initialIncome.notes || "");
    } else {
      setIncomeSource("Monthly Retainer");
      setAmount(75000);
      setDate(new Date().toISOString().split("T")[0]);
      setRelatedInvoice("INV-2026-090");
      setNotes("");
    }
    setErrors({});
  }, [initialIncome, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!incomeSource.trim()) newErrors.incomeSource = "Income source is required";
    if (amount <= 0) newErrors.amount = "Amount must be greater than zero";
    if (!customer.trim()) newErrors.customer = "Customer is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      incomeSource,
      amount: Number(amount),
      date,
      customer,
      relatedInvoice,
      paymentMethod,
      notes,
    });
    onClose();
  };

  const paymentMethods: { value: PaymentMethod; label: string }[] = [
    { value: "Bank Transfer (NEFT/RTGS)", label: "Bank Transfer (NEFT / RTGS / Wire)" },
    { value: "UPI / Instant Pay", label: "UPI / Instant Payment" },
    { value: "Credit / Debit Card", label: "Credit / Debit Card" },
    { value: "Stripe Online", label: "Stripe Online Payment" },
    { value: "PayPal", label: "PayPal" },
    { value: "Cash / Cheque", label: "Cash / Cheque" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialIncome ? "Edit Income Record" : "Record Income Entry"}
      description="Record incoming payment or milestone settlement to your ledger."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {initialIncome ? "Save Changes" : "Record Income"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Income Source / Stream *"
            value={incomeSource}
            onChange={(e) => setIncomeSource(e.target.value)}
            options={[
              { value: "Monthly Retainer", label: "Monthly Retainer Contract" },
              { value: "Project Milestone", label: "Project Milestone Settlement" },
              { value: "Advisory Consultation", label: "Advisory / Strategic Consultation" },
              { value: "Strategy Workshop", label: "Strategy Workshop" },
              { value: "Referral Commission", label: "Partner Referral Commission" },
              { value: "Other Services", label: "Other Business Services" },
            ]}
          />

          <Input
            label="Received Amount (₹) *"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            error={errors.amount}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {customerOptions.length > 0 ? (
            <Select
              label="Paying Customer / Entity *"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              options={customerOptions}
            />
          ) : (
            <Input
              label="Paying Customer / Entity *"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              error={errors.customer}
            />
          )}

          <Input
            label="Settlement Date *"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            leftIcon={<Calendar className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Related Invoice Number"
            placeholder="e.g. INV-2026-090"
            value={relatedInvoice}
            onChange={(e) => setRelatedInvoice(e.target.value)}
            leftIcon={<FileText className="w-4 h-4" />}
          />

          <Select
            label="Payment Method *"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            options={paymentMethods}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1.5">
            Transaction Notes & Bank Reference
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Bank UTR number, settlement notes, or client memo..."
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
          />
        </div>
      </form>
    </Modal>
  );
}
