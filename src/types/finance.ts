export type PaymentMethod =
  | "Bank Transfer (NEFT/RTGS)"
  | "Credit / Debit Card"
  | "UPI / Instant Pay"
  | "Stripe Online"
  | "PayPal"
  | "Wire Transfer"
  | "Cash / Cheque";

export interface IncomeRecord {
  id: string;
  incomeSource: string;
  amount: number;
  date: string;
  customer: string;
  relatedInvoice?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface ExpenseRecord {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: PaymentMethod;
  description: string;
  receiptAttachment?: string; // Data URL or file name preview
}

export interface ExpenseCategory {
  id: string;
  name: string;
  allocatedBudget: number;
  spentAmount: number;
  color: string;
  description: string;
}

export interface FinancialMetricSummary {
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  profitMarginPercent: number;
  activeRetainersIncome: number;
  oneTimeProjectsIncome: number;
}
