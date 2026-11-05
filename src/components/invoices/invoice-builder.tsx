"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Invoice, InvoiceItem } from "@/types/invoicing";
import { getStoredCustomers } from "@/lib/crm-store";
import { toCents, formatMoney, multiplyMoney, subtractMoney, addMoney } from "@/lib/money";
import { createInvoice, updateInvoice, getStoredInvoices } from "@/lib/invoicing-store";
import { Plus, Trash2, Send, Save, Calculator, Sparkles } from "lucide-react";

interface InvoiceBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceToEdit?: Invoice | null;
  onInvoiceSaved?: (invoice: Invoice) => void;
}

interface ItemState {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number; // in normal currency units (e.g. 5000)
}

export function InvoiceBuilder({
  isOpen,
  onClose,
  invoiceToEdit,
  onInvoiceSaved,
}: InvoiceBuilderProps) {
  const [customers, setCustomers] = useState<{ id: string; name: string; email: string; company: string }[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [customerTaxId, setCustomerTaxId] = useState<string>("");

  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [currency, setCurrency] = useState<string>("INR");

  const [items, setItems] = useState<ItemState[]>([
    { id: "item-1", description: "Professional Consulting & Strategy", quantity: 1, unitPrice: 25000 },
  ]);

  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [notes, setNotes] = useState<string>("Thank you for doing business with Nexora.");
  const [terms, setTerms] = useState<string>("Net 30 days. Payments accepted via Bank Transfer or UPI.");

  useEffect(() => {
    if (isOpen) {
      // Load customers
      const loadedCustomers = getStoredCustomers();
      setCustomers(loadedCustomers);

      if (invoiceToEdit) {
        setInvoiceNumber(invoiceToEdit.invoiceNumber);
        setSelectedCustomerId(invoiceToEdit.customerId);
        setCustomerName(invoiceToEdit.customerName);
        setCustomerEmail(invoiceToEdit.customerEmail);
        setCustomerAddress(invoiceToEdit.customerAddress || "");
        setCustomerTaxId(invoiceToEdit.customerTaxId || "");
        setIssueDate(invoiceToEdit.issueDate);
        setDueDate(invoiceToEdit.dueDate);
        setCurrency(invoiceToEdit.currency);
        setDiscountPercent(invoiceToEdit.discountPercent);
        setTaxPercent(invoiceToEdit.taxPercent);
        setNotes(invoiceToEdit.notes || "");
        setTerms(invoiceToEdit.terms || "");
        setItems(
          invoiceToEdit.items.map((it) => ({
            id: it.id,
            description: it.description,
            quantity: it.quantity,
            unitPrice: it.unitPriceCents / 100,
          }))
        );
      } else {
        // Auto-generate invoice number
        const existing = getStoredInvoices();
        const nextNum = String(existing.length + 1).padStart(3, "0");
        setInvoiceNumber(`INV-2024-${nextNum}`);

        const today = new Date().toISOString().split("T")[0];
        setIssueDate(today);

        const due = new Date();
        due.setDate(due.getDate() + 30);
        setDueDate(due.toISOString().split("T")[0]);

        if (loadedCustomers.length > 0) {
          const first = loadedCustomers[0];
          setSelectedCustomerId(first.id);
          setCustomerName(first.company || first.name);
          setCustomerEmail(first.email);
        }
      }
    }
  }, [isOpen, invoiceToEdit]);

  const handleCustomerSelect = (custId: string) => {
    setSelectedCustomerId(custId);
    const found = customers.find((c) => c.id === custId);
    if (found) {
      setCustomerName(found.company || found.name);
      setCustomerEmail(found.email);
    }
  };

  // Line item manipulation
  const addItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: keyof ItemState, value: any) => {
    setItems(
      items.map((it) => {
        if (it.id !== id) return it;
        return { ...it, [field]: value };
      })
    );
  };

  // Precise calculations using integer cents
  let calculatedSubtotalCents = 0;
  const processedItems: InvoiceItem[] = items.map((it) => {
    const qty = Math.max(1, Number(it.quantity) || 1);
    const unitPriceCents = toCents(Number(it.unitPrice) || 0);
    const amountCents = multiplyMoney(unitPriceCents, qty);
    calculatedSubtotalCents += amountCents;
    return {
      id: it.id,
      description: it.description,
      quantity: qty,
      unitPriceCents,
      amountCents,
    };
  });

  const discountCents = Math.round(
    (calculatedSubtotalCents * (Math.max(0, discountPercent) || 0)) / 100
  );
  const afterDiscountCents = Math.max(0, calculatedSubtotalCents - discountCents);
  const taxCents = Math.round(
    (afterDiscountCents * (Math.max(0, taxPercent) || 0)) / 100
  );
  const grandTotalCents = afterDiscountCents + taxCents;

  const handleSave = (status: "draft" | "sent") => {
    if (!customerName || !customerEmail) {
      alert("Please provide customer name and email.");
      return;
    }

    if (items.some((it) => !it.description.trim())) {
      alert("Please ensure all items have a description.");
      return;
    }

    const payload = {
      invoiceNumber,
      customerId: selectedCustomerId || `cust-${Date.now()}`,
      customerName,
      customerEmail,
      customerAddress,
      customerTaxId,
      issueDate,
      dueDate,
      items: processedItems,
      subtotalCents: calculatedSubtotalCents,
      discountPercent,
      discountCents,
      taxPercent,
      taxCents,
      totalCents: grandTotalCents,
      amountPaidCents: invoiceToEdit ? invoiceToEdit.amountPaidCents : 0,
      amountDueCents: invoiceToEdit
        ? Math.max(0, grandTotalCents - invoiceToEdit.amountPaidCents)
        : grandTotalCents,
      status: invoiceToEdit ? (status === "sent" ? "sent" : invoiceToEdit.status) : status,
      currency,
      notes,
      terms,
      paymentInstructions: {
        bankName: "HDFC Bank Ltd.",
        accountName: "Nexora Technologies Pvt Ltd",
        accountNumber: "50200088921832",
        routingCode: "HDFC0000128",
        upiId: "nexora@hdfcbank",
      },
    };

    let resultInvoice: Invoice | null = null;
    if (invoiceToEdit) {
      resultInvoice = updateInvoice(invoiceToEdit.id, payload);
    } else {
      resultInvoice = createInvoice(payload);
    }

    if (resultInvoice) {
      onInvoiceSaved?.(resultInvoice);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={invoiceToEdit ? `Edit Invoice ${invoiceToEdit.invoiceNumber}` : "Create New Invoice"}
      description="Create and dispatch commercial-grade invoices with automated calculations."
      maxWidth="2xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto px-1">
        {/* Row 1: Invoice Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Invoice Number
            </label>
            <Input
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
              className="font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Currency
            </label>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              options={[
                { value: "INR", label: "INR (₹) - Indian Rupee" },
                { value: "USD", label: "USD ($) - US Dollar" },
                { value: "EUR", label: "EUR (€) - Euro" },
                { value: "GBP", label: "GBP (£) - British Pound" },
              ]}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issue Date
            </label>
            <Input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 2: Customer Details */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Customer Information
            </span>
            <span className="text-[11px] text-slate-500">
              Linked with CRM directory
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select from CRM
              </label>
              <Select
                value={selectedCustomerId}
                onChange={(e) => handleCustomerSelect(e.target.value)}
                options={[
                  { value: "", label: "-- Custom Customer --" },
                  ...customers.map((c) => ({
                    value: c.id,
                    label: `${c.company || c.name} (${c.email})`,
                  })),
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client / Company Name
              </label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Acme Corporation"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Email
              </label>
              <Input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="billing@acme.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Billing Address (Optional)
              </label>
              <Input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Office Address, City, Postal Code"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tax ID / GSTIN (Optional)
              </label>
              <Input
                value={customerTaxId}
                onChange={(e) => setCustomerTaxId(e.target.value)}
                placeholder="e.g. 29AAACN8923K1ZT"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Dynamic Line Items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Products & Services
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Line Item
            </Button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
            {/* Header */}
            <div className="bg-slate-100/80 px-3 py-2 text-xs font-semibold text-slate-600 grid grid-cols-12 gap-2">
              <span className="col-span-6">Item & Description</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Unit Rate</span>
              <span className="col-span-2 text-right">Amount</span>
            </div>

            {/* Rows */}
            {items.map((it, idx) => {
              const lineTotal =
                (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0);
              return (
                <div
                  key={it.id}
                  className="p-3 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50"
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono w-4">
                      {idx + 1}.
                    </span>
                    <Input
                      value={it.description}
                      onChange={(e) =>
                        updateItem(it.id, "description", e.target.value)
                      }
                      placeholder="Service description or item name"
                      className="text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) =>
                        updateItem(it.id, "quantity", e.target.value)
                      }
                      className="text-center text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      step="any"
                      min="0"
                      value={it.unitPrice}
                      onChange={(e) =>
                        updateItem(it.id, "unitPrice", e.target.value)
                      }
                      className="text-right text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <span className="text-sm font-semibold text-slate-800">
                      {formatMoney(toCents(lineTotal), currency)}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 4: Totals & Discounts & Taxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Discount (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tax / GST Rate (%)
                </label>
                <Select
                  value={taxPercent.toString()}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  options={[
                    { value: "0", label: "0% (Tax Exempt)" },
                    { value: "5", label: "5% Standard GST" },
                    { value: "12", label: "12% Standard GST" },
                    { value: "18", label: "18% Standard GST" },
                    { value: "28", label: "28% Luxury GST" },
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Thank you for your business!"
              />
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="space-y-2 text-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(calculatedSubtotalCents, currency)}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({discountPercent}%):</span>
                  <span className="font-semibold">
                    -{formatMoney(discountCents, currency)}
                  </span>
                </div>
              )}

              {taxPercent > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Tax ({taxPercent}%):</span>
                  <span className="font-semibold text-slate-900">
                    +{formatMoney(taxCents, currency)}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <span>Grand Total:</span>
                <span className="text-blue-600 text-lg">
                  {formatMoney(grandTotalCents, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Discard
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSave("draft")}
              className="text-slate-700"
            >
              <Save className="w-4 h-4 mr-1.5" /> Save as Draft
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleSave("sent")}
            >
              <Send className="w-4 h-4 mr-1.5" /> Save & Send to Client
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
