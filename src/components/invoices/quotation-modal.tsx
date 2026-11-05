"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Quotation, InvoiceItem } from "@/types/invoicing";
import { getStoredCustomers } from "@/lib/crm-store";
import { toCents, formatMoney, multiplyMoney } from "@/lib/money";
import { createQuotation, updateQuotation, getStoredQuotations } from "@/lib/invoicing-store";
import { Plus, Trash2, Send, Save, FileCheck } from "lucide-react";

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotationToEdit?: Quotation | null;
  onSaved?: (quote: Quotation) => void;
}

interface ItemState {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function QuotationModal({
  isOpen,
  onClose,
  quotationToEdit,
  onSaved,
}: QuotationModalProps) {
  const [customers, setCustomers] = useState<{ id: string; name: string; email: string; company: string }[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

  const [quoteNumber, setQuoteNumber] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");

  const [items, setItems] = useState<ItemState[]>([
    { id: "q-1", description: "Strategic Technology Implementation Proposal", quantity: 1, unitPrice: 40000 },
  ]);

  const [discountPercent, setDiscountPercent] = useState<number>(5);
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [notes, setNotes] = useState<string>("Proposal is valid for 30 calendar days from issue.");
  const [terms, setTerms] = useState<string>("50% milestone advance upon acceptance, remaining 50% on final delivery.");

  useEffect(() => {
    if (isOpen) {
      const loaded = getStoredCustomers();
      setCustomers(loaded);

      if (quotationToEdit) {
        setQuoteNumber(quotationToEdit.quoteNumber);
        setSelectedCustomerId(quotationToEdit.customerId);
        setCustomerName(quotationToEdit.customerName);
        setCustomerEmail(quotationToEdit.customerEmail);
        setIssueDate(quotationToEdit.issueDate);
        setExpiryDate(quotationToEdit.expiryDate);
        setDiscountPercent(quotationToEdit.discountPercent);
        setTaxPercent(quotationToEdit.taxPercent);
        setNotes(quotationToEdit.notes || "");
        setTerms(quotationToEdit.terms || "");
        setItems(
          quotationToEdit.items.map((it) => ({
            id: it.id,
            description: it.description,
            quantity: it.quantity,
            unitPrice: it.unitPriceCents / 100,
          }))
        );
      } else {
        const existing = getStoredQuotations();
        const nextNum = String(existing.length + 1).padStart(3, "0");
        setQuoteNumber(`EST-2024-${nextNum}`);

        const today = new Date().toISOString().split("T")[0];
        setIssueDate(today);

        const exp = new Date();
        exp.setDate(exp.getDate() + 30);
        setExpiryDate(exp.toISOString().split("T")[0]);

        if (loaded.length > 0) {
          const first = loaded[0];
          setSelectedCustomerId(first.id);
          setCustomerName(first.company || first.name);
          setCustomerEmail(first.email);
        }
      }
    }
  }, [isOpen, quotationToEdit]);

  const handleCustomerSelect = (custId: string) => {
    setSelectedCustomerId(custId);
    const found = customers.find((c) => c.id === custId);
    if (found) {
      setCustomerName(found.company || found.name);
      setCustomerEmail(found.email);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: `q-item-${Date.now()}`,
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

    const payload = {
      quoteNumber,
      customerId: selectedCustomerId || `cust-${Date.now()}`,
      customerName,
      customerEmail,
      issueDate,
      expiryDate,
      items: processedItems,
      subtotalCents: calculatedSubtotalCents,
      discountPercent,
      discountCents,
      taxPercent,
      taxCents,
      totalCents: grandTotalCents,
      status: quotationToEdit ? quotationToEdit.status : status,
      notes,
      terms,
    };

    let result: Quotation | null = null;
    if (quotationToEdit) {
      result = updateQuotation(quotationToEdit.id, payload);
    } else {
      result = createQuotation(payload);
    }

    if (result) {
      onSaved?.(result);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={quotationToEdit ? `Edit Quotation ${quotationToEdit.quoteNumber}` : "Create Quotation / Estimate"}
      description="Prepare commercial estimates that can be converted into invoices with a single click."
      maxWidth="2xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto px-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Quotation #
            </label>
            <Input
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
              required
              className="font-mono"
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
              Valid Until (Expiry)
            </label>
            <Input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Customer Select */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Customer
            </label>
            <Select
              value={selectedCustomerId}
              onChange={(e) => handleCustomerSelect(e.target.value)}
              options={[
                { value: "", label: "-- Custom Customer --" },
                ...customers.map((c) => ({
                  value: c.id,
                  label: `${c.company || c.name}`,
                })),
              ]}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Client / Organization
            </label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Acme Corp"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Email
            </label>
            <Input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="contact@acme.com"
              required
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Proposed Scope & Deliverables
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Deliverable
            </Button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
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
                      placeholder="Scope item or deliverable"
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
                      {formatMoney(toCents(lineTotal), "INR")}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
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

        {/* Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
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
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tax (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Validity & Payment Terms
              </label>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={2}
                className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-2">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(calculatedSubtotalCents, "INR")}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-{formatMoney(discountCents, "INR")}</span>
                </div>
              )}
              {taxPercent > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Tax ({taxPercent}%):</span>
                  <span>+{formatMoney(taxCents, "INR")}</span>
                </div>
              )}
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center text-base font-bold text-slate-900 shadow-sm">
              <span>Estimated Total:</span>
              <span className="text-blue-600 text-lg">
                {formatMoney(grandTotalCents, "INR")}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSave("draft")}
            >
              <Save className="w-4 h-4 mr-1.5" /> Save Draft
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleSave("sent")}
            >
              <Send className="w-4 h-4 mr-1.5" /> Send Quotation
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
