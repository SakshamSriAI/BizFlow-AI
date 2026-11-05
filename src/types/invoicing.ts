export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled";

export type QuotationStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired"
  | "converted";

export type PaymentMethod =
  | "bank_transfer"
  | "card"
  | "upi"
  | "cash"
  | "stripe"
  | "cheque";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceCents: number;
  amountCents: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  customerTaxId?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotalCents: number;
  discountPercent: number;
  discountCents: number;
  taxPercent: number;
  taxCents: number;
  totalCents: number;
  amountPaidCents: number;
  amountDueCents: number;
  status: InvoiceStatus;
  currency: string;
  notes?: string;
  terms?: string;
  paymentInstructions?: {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    routingCode?: string;
    upiId?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  expiryDate: string;
  items: InvoiceItem[];
  subtotalCents: number;
  discountPercent: number;
  discountCents: number;
  taxPercent: number;
  taxCents: number;
  totalCents: number;
  status: QuotationStatus;
  convertedInvoiceId?: string;
  notes?: string;
  terms?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  paymentNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amountCents: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  reference: string;
  notes?: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export interface InvoicingStats {
  totalInvoicedCents: number;
  totalCollectedCents: number;
  totalOutstandingCents: number;
  totalOverdueCents: number;
  invoiceCount: number;
  paidCount: number;
  overdueCount: number;
  draftCount: number;
  pendingCount: number;
}
