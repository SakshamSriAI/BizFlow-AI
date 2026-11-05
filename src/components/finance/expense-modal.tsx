"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ExpenseRecord, PaymentMethod } from "@/types/finance";
import {
  UploadCloud,
  FileCheck,
  X,
  Calendar,
  CreditCard,
  Tag,
  Paperclip,
} from "lucide-react";
import { getStoredCategories } from "@/lib/finance-store";

export interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expenseData: any) => void;
  initialExpense?: ExpenseRecord | null;
}

export function ExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  initialExpense,
}: ExpenseModalProps) {
  const [expenseName, setExpenseName] = React.useState("");
  const [amount, setAmount] = React.useState(12000);
  const [category, setCategory] = React.useState("Cloud Hosting & DevOps");
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(
    "Credit / Debit Card"
  );
  const [description, setDescription] = React.useState("");
  const [receiptFileName, setReceiptFileName] = React.useState<string | null>(null);
  const [receiptPreview, setReceiptPreview] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const cats = getStoredCategories();
    setCategories(cats.map((c) => ({ value: c.name, label: c.name })));

    if (initialExpense) {
      setExpenseName(initialExpense.expenseName);
      setAmount(initialExpense.amount);
      setCategory(initialExpense.category);
      setDate(initialExpense.date);
      setPaymentMethod(initialExpense.paymentMethod);
      setDescription(initialExpense.description);
      setReceiptFileName(initialExpense.receiptAttachment || null);
      setReceiptPreview(null);
    } else {
      setExpenseName("");
      setAmount(12000);
      setCategory("Cloud Hosting & DevOps");
      setDate(new Date().toISOString().split("T")[0]);
      setPaymentMethod("Credit / Debit Card");
      setDescription("");
      setReceiptFileName(null);
      setReceiptPreview(null);
    }
    setErrors({});
  }, [initialExpense, isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFileName(file.name);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setReceiptPreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setReceiptPreview(null);
      }
    }
  };

  const handleRemoveReceipt = () => {
    setReceiptFileName(null);
    setReceiptPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!expenseName.trim()) newErrors.expenseName = "Expense name is required";
    if (amount <= 0) newErrors.amount = "Amount must be greater than zero";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      expenseName,
      amount: Number(amount),
      category,
      date,
      paymentMethod,
      description,
      receiptAttachment: receiptFileName || undefined,
    });
    onClose();
  };

  const paymentMethods: { value: PaymentMethod; label: string }[] = [
    { value: "Credit / Debit Card", label: "Corporate Credit / Debit Card" },
    { value: "Bank Transfer (NEFT/RTGS)", label: "Bank Transfer (NEFT / RTGS)" },
    { value: "UPI / Instant Pay", label: "UPI Corporate QR" },
    { value: "Stripe Online", label: "Online Auto-Debit / Stripe" },
    { value: "Cash / Cheque", label: "Cash Voucher / Cheque" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialExpense ? "Edit Expense Entry" : "Record Business Expense"}
      description="Record an operational outflow with category tag and receipt attachment."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {initialExpense ? "Save Changes" : "Record Expense"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Expense Name / Vendor *"
            placeholder="e.g. AWS Cloud Infrastructure, Google Workspace"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            error={errors.expenseName}
          />

          <Input
            label="Amount (₹) *"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            error={errors.amount}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Expense Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories}
          />

          <Input
            label="Expense Date *"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            leftIcon={<Calendar className="w-4 h-4" />}
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
            Business Purpose & Description *
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this expense for? (e.g. Cloud server scaling for client load, team seats...)"
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
          />
          {errors.description && (
            <p className="text-xs text-rose-500 font-medium mt-1">
              {errors.description}
            </p>
          )}
        </div>

        {/* Receipt Attachment UI */}
        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1.5">
            Receipt / Invoice Attachment (Local Preview)
          </label>

          {receiptFileName ? (
            <div className="p-3 rounded-xl border border-indigo-100 bg-indigo-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-lg bg-white border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-xs font-semibold text-slate-900 block truncate">
                    {receiptFileName}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Attached successfully
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveReceipt}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Remove receipt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/30"
            >
              <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-slate-700">
                Click to attach receipt or tax invoice
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                PNG, JPG, or PDF up to 10MB (Local mock preview)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {/* Image preview thumbnail if uploaded image */}
          {receiptPreview && (
            <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={receiptPreview}
                alt="Receipt preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}
