import {
  Invoice,
  Quotation,
  PaymentRecord,
  InvoicingStats,
  PaymentMethod,
} from "@/types/invoicing";
import {
  initialInvoices,
  initialQuotations,
  initialPayments,
} from "@/data/mock-invoicing-data";
import { addMoney, subtractMoney } from "@/lib/money";
import { addIncomeRecord } from "@/lib/finance-store";

const INVOICE_STORAGE_KEY = "businessos_invoices_v1";
const QUOTATION_STORAGE_KEY = "businessos_quotations_v1";
const PAYMENT_STORAGE_KEY = "businessos_payments_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// ==========================================
// INVOICES
// ==========================================

export function getStoredInvoices(): Invoice[] {
  if (!isBrowser()) return initialInvoices;
  try {
    const raw = localStorage.getItem(INVOICE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(initialInvoices));
      return initialInvoices;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read invoices from localStorage:", e);
    return initialInvoices;
  }
}

export function saveInvoices(invoices: Invoice[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoices));
    window.dispatchEvent(new Event("invoices-updated"));
  } catch (e) {
    console.error("Failed to save invoices to localStorage:", e);
  }
}

export function getInvoiceById(id: string): Invoice | undefined {
  const invoices = getStoredInvoices();
  return invoices.find((inv) => inv.id === id || inv.invoiceNumber === id);
}

export function createInvoice(
  data: Omit<Invoice, "id" | "createdAt" | "updatedAt">
): Invoice {
  const invoices = getStoredInvoices();
  const id = `inv-${Date.now()}`;
  const now = new Date().toISOString();

  const newInvoice: Invoice = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newInvoice, ...invoices];
  saveInvoices(updated);
  return newInvoice;
}

export function updateInvoice(
  id: string,
  updates: Partial<Invoice>
): Invoice | null {
  const invoices = getStoredInvoices();
  const index = invoices.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const updated: Invoice = {
    ...invoices[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  invoices[index] = updated;
  saveInvoices(invoices);
  return updated;
}

export function deleteInvoice(id: string): boolean {
  const invoices = getStoredInvoices();
  const filtered = invoices.filter((i) => i.id !== id);
  if (filtered.length === invoices.length) return false;
  saveInvoices(filtered);
  return true;
}

export function markInvoiceSent(id: string): Invoice | null {
  const invoice = getInvoiceById(id);
  if (!invoice) return null;
  return updateInvoice(id, { status: "sent" });
}

export function markInvoiceCancelled(id: string): Invoice | null {
  const invoice = getInvoiceById(id);
  if (!invoice) return null;
  return updateInvoice(id, { status: "cancelled" });
}

// ==========================================
// PAYMENTS & WORKFLOW INTEGRATION
// ==========================================

export function getStoredPayments(): PaymentRecord[] {
  if (!isBrowser()) return initialPayments;
  try {
    const raw = localStorage.getItem(PAYMENT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(initialPayments));
      return initialPayments;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read payments from localStorage:", e);
    return initialPayments;
  }
}

export function savePayments(payments: PaymentRecord[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(payments));
    window.dispatchEvent(new Event("payments-updated"));
  } catch (e) {
    console.error("Failed to save payments to localStorage:", e);
  }
}

export function recordInvoicePayment(
  invoiceId: string,
  paymentData: {
    amountCents: number;
    paymentDate: string;
    paymentMethod: PaymentMethod;
    reference: string;
    notes?: string;
  }
): { payment: PaymentRecord; invoice: Invoice } | null {
  const invoice = getInvoiceById(invoiceId);
  if (!invoice) return null;

  // 1. Calculate integer money updates
  const newAmountPaid = addMoney(invoice.amountPaidCents, paymentData.amountCents);
  const newAmountDue = Math.max(0, subtractMoney(invoice.totalCents, newAmountPaid));
  const newStatus = newAmountDue === 0 ? "paid" : "partially_paid";

  // 2. Update the invoice
  const updatedInvoice = updateInvoice(invoice.id, {
    amountPaidCents: newAmountPaid,
    amountDueCents: newAmountDue,
    status: newStatus,
  });

  if (!updatedInvoice) return null;

  // 3. Create payment record
  const payments = getStoredPayments();
  const paymentNumber = `PAY-2024-${String(payments.length + 1).padStart(3, "0")}`;
  const newPayment: PaymentRecord = {
    id: `pay-${Date.now()}`,
    paymentNumber,
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    customerId: invoice.customerId,
    customerName: invoice.customerName,
    amountCents: paymentData.amountCents,
    paymentDate: paymentData.paymentDate,
    paymentMethod: paymentData.paymentMethod,
    reference: paymentData.reference,
    notes: paymentData.notes,
    status: "completed",
    createdAt: new Date().toISOString(),
  };

  savePayments([newPayment, ...payments]);

  // 4. WORKFLOW 4: Automatically register income in Finance Ledger!
  try {
    const financeMethodMap: Record<PaymentMethod, any> = {
      bank_transfer: "Bank Transfer (NEFT/RTGS)",
      card: "Credit / Debit Card",
      upi: "UPI / Instant Pay",
      stripe: "Stripe Online",
      cash: "Cash",
      cheque: "Cheque",
    };

    addIncomeRecord({
      incomeSource: `${invoice.customerName} (${invoice.invoiceNumber})`,
      amount: paymentData.amountCents / 100,
      date: paymentData.paymentDate,
      customer: invoice.customerName,
      relatedInvoice: invoice.invoiceNumber,
      paymentMethod: financeMethodMap[paymentData.paymentMethod] || "Bank Transfer (NEFT/RTGS)",
      notes: `Recorded against invoice ${invoice.invoiceNumber}. Ref: ${paymentData.reference}. ${paymentData.notes || ""}`,
    });
  } catch (e) {
    console.warn("Could not sync payment into finance income record:", e);
  }

  return { payment: newPayment, invoice: updatedInvoice };
}

// ==========================================
// QUOTATIONS
// ==========================================

export function getStoredQuotations(): Quotation[] {
  if (!isBrowser()) return initialQuotations;
  try {
    const raw = localStorage.getItem(QUOTATION_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUOTATION_STORAGE_KEY, JSON.stringify(initialQuotations));
      return initialQuotations;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read quotations from localStorage:", e);
    return initialQuotations;
  }
}

export function saveQuotations(quotations: Quotation[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(QUOTATION_STORAGE_KEY, JSON.stringify(quotations));
    window.dispatchEvent(new Event("quotations-updated"));
  } catch (e) {
    console.error("Failed to save quotations to localStorage:", e);
  }
}

export function getQuotationById(id: string): Quotation | undefined {
  const quotations = getStoredQuotations();
  return quotations.find((q) => q.id === id || q.quoteNumber === id);
}

export function createQuotation(
  data: Omit<Quotation, "id" | "createdAt" | "updatedAt">
): Quotation {
  const quotations = getStoredQuotations();
  const id = `quote-${Date.now()}`;
  const now = new Date().toISOString();

  const newQuote: Quotation = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };

  saveQuotations([newQuote, ...quotations]);
  return newQuote;
}

export function updateQuotation(
  id: string,
  updates: Partial<Quotation>
): Quotation | null {
  const quotations = getStoredQuotations();
  const index = quotations.findIndex((q) => q.id === id);
  if (index === -1) return null;

  const updated: Quotation = {
    ...quotations[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  quotations[index] = updated;
  saveQuotations(quotations);
  return updated;
}

export function deleteQuotation(id: string): boolean {
  const quotations = getStoredQuotations();
  const filtered = quotations.filter((q) => q.id !== id);
  if (filtered.length === quotations.length) return false;
  saveQuotations(filtered);
  return true;
}

export function convertQuotationToInvoice(quotationId: string): Invoice | null {
  const quotation = getQuotationById(quotationId);
  if (!quotation) return null;

  const invoices = getStoredInvoices();
  const nextNum = String(invoices.length + 1).padStart(3, "0");
  const invoiceNumber = `INV-2024-${nextNum}`;

  const issueDate = new Date().toISOString().split("T")[0];
  const due = new Date();
  due.setDate(due.getDate() + 30);
  const dueDate = due.toISOString().split("T")[0];

  const newInvoice = createInvoice({
    invoiceNumber,
    customerId: quotation.customerId,
    customerName: quotation.customerName,
    customerEmail: quotation.customerEmail,
    customerAddress: "Billing address on file",
    issueDate,
    dueDate,
    items: quotation.items.map((it) => ({ ...it, id: `inv-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` })),
    subtotalCents: quotation.subtotalCents,
    discountPercent: quotation.discountPercent,
    discountCents: quotation.discountCents,
    taxPercent: quotation.taxPercent,
    taxCents: quotation.taxCents,
    totalCents: quotation.totalCents,
    amountPaidCents: 0,
    amountDueCents: quotation.totalCents,
    status: "draft",
    currency: "INR",
    notes: `Converted automatically from Quotation ${quotation.quoteNumber}. ${quotation.notes || ""}`,
    terms: quotation.terms || "Net 30 days from invoice issue date.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
  });

  // Mark quotation as converted
  updateQuotation(quotation.id, {
    status: "converted",
    convertedInvoiceId: newInvoice.id,
  });

  return newInvoice;
}

// ==========================================
// STATS CALCULATION
// ==========================================

export function calculateInvoicingStats(): InvoicingStats {
  const invoices = getStoredInvoices();

  let totalInvoicedCents = 0;
  let totalCollectedCents = 0;
  let totalOutstandingCents = 0;
  let totalOverdueCents = 0;

  let paidCount = 0;
  let overdueCount = 0;
  let draftCount = 0;
  let pendingCount = 0;

  const todayStr = new Date().toISOString().split("T")[0];

  for (const inv of invoices) {
    if (inv.status === "cancelled") continue;

    totalInvoicedCents += inv.totalCents;
    totalCollectedCents += inv.amountPaidCents;
    totalOutstandingCents += inv.amountDueCents;

    const isOverdue =
      inv.status === "overdue" ||
      (inv.status !== "paid" && inv.dueDate < todayStr);

    if (inv.status === "paid") {
      paidCount++;
    } else if (isOverdue) {
      overdueCount++;
      totalOverdueCents += inv.amountDueCents;
    } else if (inv.status === "draft") {
      draftCount++;
    } else {
      pendingCount++;
    }
  }

  return {
    totalInvoicedCents,
    totalCollectedCents,
    totalOutstandingCents,
    totalOverdueCents,
    invoiceCount: invoices.length,
    paidCount,
    overdueCount,
    draftCount,
    pendingCount,
  };
}
