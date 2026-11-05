export type DateRangeOption = "7d" | "30d" | "quarter" | "year" | "all";

export type ReportType =
  | "overview"
  | "sales"
  | "revenue"
  | "expenses"
  | "funnel"
  | "customers"
  | "cashflow";

export interface MetricComparison {
  label: string;
  currentValue: number;
  previousValue: number;
  formattedCurrent: string;
  formattedPrevious: string;
  changePercent: number;
  isPositive: boolean;
  subtext: string;
}

export interface TimeSeriesPoint {
  period: string;
  revenue: number;
  expenses: number;
  netProfit: number;
  cashBalance: number;
}

export interface LeadFunnelStage {
  stage: string;
  count: number;
  valueCents: number;
  conversionRate: number; // percentage from previous stage
  dropoffRate: number;
}

export interface CategorySpendPoint {
  category: string;
  amountCents: number;
  percentage: number;
  color: string;
}

export interface CustomerPerformanceItem {
  id: string;
  name: string;
  contact: string;
  ltvCents: number;
  mrrCents: number;
  healthScore: number;
  status: "Active" | "Expanding" | "At Risk";
  tenureMonths: number;
}

export interface AnalyticsSummary {
  period: DateRangeOption;
  totalRevenueCents: number;
  revenueComparison: MetricComparison;
  totalExpensesCents: number;
  expensesComparison: MetricComparison;
  netProfitCents: number;
  netMarginPercent: number;
  cashRunwayMonths: number;
  dealsWonCount: number;
  winRatePercent: number;
  timeSeries: TimeSeriesPoint[];
  categoryBreakdown: CategorySpendPoint[];
  funnelStages: LeadFunnelStage[];
  topCustomers: CustomerPerformanceItem[];
}
