import {
  DateRangeOption,
  AnalyticsSummary,
  TimeSeriesPoint,
  CategorySpendPoint,
  LeadFunnelStage,
  CustomerPerformanceItem,
} from "@/types/analytics";

export const monthlyTimeSeries: TimeSeriesPoint[] = [
  { period: "May", revenue: 320000, expenses: 185000, netProfit: 135000, cashBalance: 1420000 },
  { period: "Jun", revenue: 345000, expenses: 190000, netProfit: 155000, cashBalance: 1575000 },
  { period: "Jul", revenue: 380000, expenses: 205000, netProfit: 175000, cashBalance: 1750000 },
  { period: "Aug", revenue: 395000, expenses: 198000, netProfit: 197000, cashBalance: 1947000 },
  { period: "Sep", revenue: 410000, expenses: 212000, netProfit: 198000, cashBalance: 2145000 },
  { period: "Oct", revenue: 485000, expenses: 215400, netProfit: 269600, cashBalance: 2414600 },
];

export const mockLeadFunnel: LeadFunnelStage[] = [
  {
    stage: "New Inbound Leads",
    count: 124,
    valueCents: 1250000000, // ₹1.25 Cr
    conversionRate: 100,
    dropoffRate: 0,
  },
  {
    stage: "Initial Contact",
    count: 88,
    valueCents: 920000000,
    conversionRate: 71,
    dropoffRate: 29,
  },
  {
    stage: "Discovery & Interest",
    count: 54,
    valueCents: 640000000,
    conversionRate: 61,
    dropoffRate: 39,
  },
  {
    stage: "Qualified Deal Scope",
    count: 32,
    valueCents: 410000000,
    conversionRate: 59,
    dropoffRate: 41,
  },
  {
    stage: "Closed Won Contracts",
    count: 18,
    valueCents: 245000000,
    conversionRate: 56,
    dropoffRate: 44,
  },
];

export const mockCategorySpend: CategorySpendPoint[] = [
  { category: "Team Payroll & Contractors", amountCents: 11000000, percentage: 51, color: "#3b82f6" },
  { category: "Cloud & Infrastructure", amountCents: 4250000, percentage: 20, color: "#10b981" },
  { category: "Marketing & Acquisition", amountCents: 3450000, percentage: 16, color: "#8b5cf6" },
  { category: "Software SaaS Tools", amountCents: 1640000, percentage: 8, color: "#f59e0b" },
  { category: "Office & Operations", amountCents: 1200000, percentage: 5, color: "#64748b" },
];

export const mockCustomerPerformance: CustomerPerformanceItem[] = [
  {
    id: "cust-1",
    name: "Nordic Clean Energy",
    contact: "Elena Rostova",
    ltvCents: 145000000, // ₹14,50,000
    mrrCents: 48000000,  // ₹4,80,000
    healthScore: 98,
    status: "Expanding",
    tenureMonths: 14,
  },
  {
    id: "cust-2",
    name: "Pinnacle Media Group",
    contact: "Vikram Malhotra",
    ltvCents: 128000000,
    mrrCents: 35000000,
    healthScore: 94,
    status: "Active",
    tenureMonths: 11,
  },
  {
    id: "cust-3",
    name: "Orbit Global Technologies",
    contact: "David Chen",
    ltvCents: 95000000,
    mrrCents: 22000000,
    healthScore: 91,
    status: "Expanding",
    tenureMonths: 8,
  },
  {
    id: "cust-4",
    name: "Zenith Software Labs",
    contact: "Marcus Vance",
    ltvCents: 62000000,
    mrrCents: 12000000,
    healthScore: 89,
    status: "Active",
    tenureMonths: 6,
  },
  {
    id: "cust-5",
    name: "Apex Retail Brands",
    contact: "Ananya Iyer",
    ltvCents: 54000000,
    mrrCents: 18000000,
    healthScore: 78,
    status: "At Risk", // Overdue invoice
    tenureMonths: 5,
  },
  {
    id: "cust-6",
    name: "Redwood Hospitality",
    contact: "Karan Johar",
    ltvCents: 42000000,
    mrrCents: 13500000,
    healthScore: 74,
    status: "At Risk",
    tenureMonths: 4,
  },
];

export function getAnalyticsDataByRange(range: DateRangeOption): AnalyticsSummary {
  switch (range) {
    case "7d":
      return {
        period: "7d",
        totalRevenueCents: 12850000, // ₹1,28,500
        revenueComparison: {
          label: "Gross Inflow",
          currentValue: 128500,
          previousValue: 118000,
          formattedCurrent: "₹1,28,500",
          formattedPrevious: "₹1,18,000",
          changePercent: 8.9,
          isPositive: true,
          subtext: "vs previous 7 days",
        },
        totalExpensesCents: 4820000, // ₹48,200
        expensesComparison: {
          label: "Total Outflow",
          currentValue: 48200,
          previousValue: 51000,
          formattedCurrent: "₹48,200",
          formattedPrevious: "₹51,000",
          changePercent: -5.5,
          isPositive: true, // Lower expenses is positive
          subtext: "reduced by 5.5%",
        },
        netProfitCents: 8030000,
        netMarginPercent: 62.5,
        cashRunwayMonths: 15.2,
        dealsWonCount: 3,
        winRatePercent: 42.8,
        timeSeries: [
          { period: "Mon", revenue: 18000, expenses: 6500, netProfit: 11500, cashBalance: 2360000 },
          { period: "Tue", revenue: 24500, expenses: 8200, netProfit: 16300, cashBalance: 2376300 },
          { period: "Wed", revenue: 15000, expenses: 5400, netProfit: 9600, cashBalance: 2385900 },
          { period: "Thu", revenue: 32000, expenses: 9800, netProfit: 22200, cashBalance: 2408100 },
          { period: "Fri", revenue: 22000, expenses: 11200, netProfit: 10800, cashBalance: 2418900 },
          { period: "Sat", revenue: 9000, expenses: 4100, netProfit: 4900, cashBalance: 2423800 },
          { period: "Sun", revenue: 8000, expenses: 3000, netProfit: 5000, cashBalance: 2428800 },
        ],
        categoryBreakdown: mockCategorySpend,
        funnelStages: mockLeadFunnel,
        topCustomers: mockCustomerPerformance,
      };

    case "quarter":
      return {
        period: "quarter",
        totalRevenueCents: 128500000, // ₹12,85,000
        revenueComparison: {
          label: "Quarterly Revenue",
          currentValue: 1285000,
          previousValue: 1045000,
          formattedCurrent: "₹12,85,000",
          formattedPrevious: "₹10,45,000",
          changePercent: 23.0,
          isPositive: true,
          subtext: "vs Q3 baseline",
        },
        totalExpensesCents: 62540000, // ₹6,25,400
        expensesComparison: {
          label: "Quarterly Expenses",
          currentValue: 625400,
          previousValue: 590000,
          formattedCurrent: "₹6,25,400",
          formattedPrevious: "₹5,90,000",
          changePercent: 6.0,
          isPositive: false,
          subtext: "scaled with team expansion",
        },
        netProfitCents: 65960000,
        netMarginPercent: 51.3,
        cashRunwayMonths: 14.8,
        dealsWonCount: 22,
        winRatePercent: 38.5,
        timeSeries: [
          { period: "Week 1", revenue: 98000, expenses: 48000, netProfit: 50000, cashBalance: 2150000 },
          { period: "Week 4", revenue: 112000, expenses: 52000, netProfit: 60000, cashBalance: 2210000 },
          { period: "Week 8", revenue: 124000, expenses: 54000, netProfit: 70000, cashBalance: 2280000 },
          { period: "Week 12", revenue: 145000, expenses: 58000, netProfit: 87000, cashBalance: 2367000 },
        ],
        categoryBreakdown: mockCategorySpend,
        funnelStages: mockLeadFunnel,
        topCustomers: mockCustomerPerformance,
      };

    case "year":
      return {
        period: "year",
        totalRevenueCents: 445000000, // ₹44,50,000
        revenueComparison: {
          label: "Annual Run-Rate",
          currentValue: 4450000,
          previousValue: 3200000,
          formattedCurrent: "₹44,50,000",
          formattedPrevious: "₹32,000,00",
          changePercent: 39.1,
          isPositive: true,
          subtext: "vs previous fiscal year",
        },
        totalExpensesCents: 215400000,
        expensesComparison: {
          label: "Annual Disbursements",
          currentValue: 2154000,
          previousValue: 1840000,
          formattedCurrent: "₹21,54,000",
          formattedPrevious: "₹18,40,000",
          changePercent: 17.1,
          isPositive: false,
          subtext: "infrastructure & headcount",
        },
        netProfitCents: 229600000,
        netMarginPercent: 51.6,
        cashRunwayMonths: 16.5,
        dealsWonCount: 68,
        winRatePercent: 36.4,
        timeSeries: [
          { period: "Q1", revenue: 920000, expenses: 480000, netProfit: 440000, cashBalance: 1650000 },
          { period: "Q2", revenue: 1045000, expenses: 510000, netProfit: 535000, cashBalance: 1980000 },
          { period: "Q3", revenue: 1195000, expenses: 540000, netProfit: 655000, cashBalance: 2150000 },
          { period: "Q4", revenue: 1290000, expenses: 624000, netProfit: 666000, cashBalance: 2414600 },
        ],
        categoryBreakdown: mockCategorySpend,
        funnelStages: mockLeadFunnel,
        topCustomers: mockCustomerPerformance,
      };

    case "30d":
    default:
      return {
        period: "30d",
        totalRevenueCents: 48500000, // ₹4,85,000
        revenueComparison: {
          label: "Monthly Revenue",
          currentValue: 485000,
          previousValue: 410000,
          formattedCurrent: "₹4,85,000",
          formattedPrevious: "₹4,10,000",
          changePercent: 18.3,
          isPositive: true,
          subtext: "up 18.3% vs last month",
        },
        totalExpensesCents: 21540000, // ₹2,15,400
        expensesComparison: {
          label: "Monthly Expenses",
          currentValue: 215400,
          previousValue: 224800,
          formattedCurrent: "₹2,15,400",
          formattedPrevious: "₹2,24,800",
          changePercent: -4.2,
          isPositive: true, // Lower expense is good
          subtext: "reduced by 4.2% MoM",
        },
        netProfitCents: 26960000,
        netMarginPercent: 55.6,
        cashRunwayMonths: 14.8,
        dealsWonCount: 8,
        winRatePercent: 35.2,
        timeSeries: monthlyTimeSeries,
        categoryBreakdown: mockCategorySpend,
        funnelStages: mockLeadFunnel,
        topCustomers: mockCustomerPerformance,
      };
  }
}
