export type DashboardPeriod = "7d" | "30d" | "quarter" | "year";

export interface KPIData {
  label: string;
  value: number;
  formattedValue: string;
  changePercent: number;
  isPositive: boolean;
  comparedTo: string;
  subtext: string;
  currency: string;
}

export interface RevenueExpensePoint {
  period: string;
  revenue: number;
  expenses: number;
  netProfit: number;
}

export interface RevenueGrowthPoint {
  month: string;
  revenue: number;
  recurring: number;
  project: number;
}

export interface LeadConversionStage {
  stage: string;
  count: number;
  value: number;
  rate: number;
}

export interface RecentInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "draft";
}

export interface RecentTransaction {
  id: string;
  title: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  method: string;
  customerOrVendor: string;
}

export interface CustomerActivity {
  id: string;
  clientName: string;
  action: string;
  detail: string;
  timestamp: string;
  avatar: string;
  type: "contract" | "payment" | "lead" | "support";
}

export interface UpcomingFollowUp {
  id: string;
  contactName: string;
  company: string;
  task: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  assignedTo: string;
  completed: boolean;
}

export interface AIInsightItem {
  id: string;
  title: string;
  description: string;
  impact: string;
  urgency: "high" | "medium" | "low";
  category: "sales" | "finance" | "risk" | "growth";
  actionLabel: string;
  actionMessage: string;
}

export const mockDashboardData: Record<
  DashboardPeriod,
  {
    kpis: {
      totalRevenue: KPIData;
      totalExpenses: KPIData;
      outstandingPayments: KPIData;
      activeLeads: KPIData;
    };
    revenueVsExpenses: RevenueExpensePoint[];
    revenueGrowth: RevenueGrowthPoint[];
    conversionStages: LeadConversionStage[];
  }
> = {
  "30d": {
    kpis: {
      totalRevenue: {
        label: "Total Revenue",
        value: 485000,
        formattedValue: "₹4,85,000",
        changePercent: 18.4,
        isPositive: true,
        comparedTo: "vs. last month",
        subtext: "72% recurring retainers",
        currency: "INR",
      },
      totalExpenses: {
        label: "Total Expenses",
        value: 142200,
        formattedValue: "₹1,42,200",
        changePercent: 4.2,
        isPositive: false,
        comparedTo: "vs. last month",
        subtext: "29.3% expense-to-rev ratio",
        currency: "INR",
      },
      outstandingPayments: {
        label: "Outstanding Payments",
        value: 65000,
        formattedValue: "₹65,000",
        changePercent: -12.5,
        isPositive: true,
        comparedTo: "reduced by 12.5%",
        subtext: "2 overdue invoices",
        currency: "INR",
      },
      activeLeads: {
        label: "Active Leads & Pipeline",
        value: 18,
        formattedValue: "18 Leads",
        changePercent: 22.5,
        isPositive: true,
        comparedTo: "vs. last month",
        subtext: "₹12,40,000 potential value",
        currency: "INR",
      },
    },
    revenueVsExpenses: [
      { period: "Week 1", revenue: 95000, expenses: 32000, netProfit: 63000 },
      { period: "Week 2", revenue: 125000, expenses: 38000, netProfit: 87000 },
      { period: "Week 3", revenue: 110000, expenses: 34000, netProfit: 76000 },
      { period: "Week 4", revenue: 155000, expenses: 38200, netProfit: 116800 },
    ],
    revenueGrowth: [
      { month: "Nov", revenue: 310000, recurring: 220000, project: 90000 },
      { month: "Dec", revenue: 360000, recurring: 250000, project: 110000 },
      { month: "Jan", revenue: 390000, recurring: 280000, project: 110000 },
      { month: "Feb", revenue: 420000, recurring: 310000, project: 110000 },
      { month: "Mar", revenue: 450000, recurring: 330000, project: 120000 },
      { month: "Apr (Current)", revenue: 485000, recurring: 350000, project: 135000 },
    ],
    conversionStages: [
      { stage: "Inquiries", count: 120, value: 4500000, rate: 100 },
      { stage: "Contacted", count: 84, value: 3600000, rate: 70 },
      { stage: "Qualified", count: 48, value: 2400000, rate: 40 },
      { stage: "Proposals", count: 28, value: 1650000, rate: 23 },
      { stage: "Won Deals", count: 18, value: 1240000, rate: 15 },
    ],
  },
  "7d": {
    kpis: {
      totalRevenue: {
        label: "Total Revenue",
        value: 128500,
        formattedValue: "₹1,28,500",
        changePercent: 8.2,
        isPositive: true,
        comparedTo: "vs. previous 7 days",
        subtext: "3 invoices settled",
        currency: "INR",
      },
      totalExpenses: {
        label: "Total Expenses",
        value: 34500,
        formattedValue: "₹34,500",
        changePercent: -2.1,
        isPositive: true,
        comparedTo: "vs. previous 7 days",
        subtext: "Operating cost under control",
        currency: "INR",
      },
      outstandingPayments: {
        label: "Outstanding Payments",
        value: 65000,
        formattedValue: "₹65,000",
        changePercent: 0,
        isPositive: false,
        comparedTo: "unchanged this week",
        subtext: "Follow-up due today",
        currency: "INR",
      },
      activeLeads: {
        label: "Active Leads & Pipeline",
        value: 18,
        formattedValue: "18 Leads",
        changePercent: 5.8,
        isPositive: true,
        comparedTo: "vs. previous 7 days",
        subtext: "4 incoming consultations",
        currency: "INR",
      },
    },
    revenueVsExpenses: [
      { period: "Mon", revenue: 18000, expenses: 4500, netProfit: 13500 },
      { period: "Tue", revenue: 24000, expenses: 5200, netProfit: 18800 },
      { period: "Wed", revenue: 15000, expenses: 3800, netProfit: 11200 },
      { period: "Thu", revenue: 32000, expenses: 8400, netProfit: 23600 },
      { period: "Fri", revenue: 22000, expenses: 6100, netProfit: 15900 },
      { period: "Sat", revenue: 10500, expenses: 4000, netProfit: 6500 },
      { period: "Sun", revenue: 7000, expenses: 2500, netProfit: 4500 },
    ],
    revenueGrowth: [
      { month: "Day 1", revenue: 18000, recurring: 12000, project: 6000 },
      { month: "Day 2", revenue: 24000, recurring: 16000, project: 8000 },
      { month: "Day 3", revenue: 15000, recurring: 10000, project: 5000 },
      { month: "Day 4", revenue: 32000, recurring: 22000, project: 10000 },
      { month: "Day 5", revenue: 22000, recurring: 15000, project: 7000 },
      { month: "Day 6", revenue: 10500, recurring: 8000, project: 2500 },
    ],
    conversionStages: [
      { stage: "Inquiries", count: 32, value: 1100000, rate: 100 },
      { stage: "Contacted", count: 24, value: 850000, rate: 75 },
      { stage: "Qualified", count: 14, value: 600000, rate: 43 },
      { stage: "Proposals", count: 8, value: 420000, rate: 25 },
      { stage: "Won Deals", count: 4, value: 240000, rate: 12.5 },
    ],
  },
  quarter: {
    kpis: {
      totalRevenue: {
        label: "Total Revenue",
        value: 1395000,
        formattedValue: "₹13,95,000",
        changePercent: 24.1,
        isPositive: true,
        comparedTo: "vs. Q3 previous",
        subtext: "Record quarterly high",
        currency: "INR",
      },
      totalExpenses: {
        label: "Total Expenses",
        value: 412000,
        formattedValue: "₹4,12,000",
        changePercent: 6.8,
        isPositive: false,
        comparedTo: "vs. Q3 previous",
        subtext: "70.4% net margin",
        currency: "INR",
      },
      outstandingPayments: {
        label: "Outstanding Payments",
        value: 65000,
        formattedValue: "₹65,000",
        changePercent: -35.0,
        isPositive: true,
        comparedTo: "improved significantly",
        subtext: "Collections rate 95.3%",
        currency: "INR",
      },
      activeLeads: {
        label: "Active Leads & Pipeline",
        value: 18,
        formattedValue: "18 Leads",
        changePercent: 41.2,
        isPositive: true,
        comparedTo: "vs. previous quarter",
        subtext: "₹12,40,000 pipeline",
        currency: "INR",
      },
    },
    revenueVsExpenses: [
      { period: "Jan", revenue: 410000, expenses: 132000, netProfit: 278000 },
      { period: "Feb", revenue: 460000, expenses: 138000, netProfit: 322000 },
      { period: "Mar", revenue: 525000, expenses: 142000, netProfit: 383000 },
    ],
    revenueGrowth: [
      { month: "Oct", revenue: 320000, recurring: 240000, project: 80000 },
      { month: "Nov", revenue: 350000, recurring: 260000, project: 90000 },
      { month: "Dec", revenue: 380000, recurring: 280000, project: 100000 },
      { month: "Jan", revenue: 410000, recurring: 310000, project: 100000 },
      { month: "Feb", revenue: 460000, recurring: 340000, project: 120000 },
      { month: "Mar", revenue: 525000, recurring: 380000, project: 145000 },
    ],
    conversionStages: [
      { stage: "Inquiries", count: 340, value: 12500000, rate: 100 },
      { stage: "Contacted", count: 245, value: 9200000, rate: 72 },
      { stage: "Qualified", count: 140, value: 6100000, rate: 41 },
      { stage: "Proposals", count: 75, value: 3900000, rate: 22 },
      { stage: "Won Deals", count: 48, value: 2950000, rate: 14.1 },
    ],
  },
  year: {
    kpis: {
      totalRevenue: {
        label: "Total Revenue",
        value: 5120000,
        formattedValue: "₹51,20,000",
        changePercent: 32.8,
        isPositive: true,
        comparedTo: "vs. previous fiscal year",
        subtext: "Consistent 68% gross margin",
        currency: "INR",
      },
      totalExpenses: {
        label: "Total Expenses",
        value: 1580000,
        formattedValue: "₹15,80,000",
        changePercent: 11.2,
        isPositive: false,
        comparedTo: "vs. previous fiscal year",
        subtext: "Controlled payroll & SaaS costs",
        currency: "INR",
      },
      outstandingPayments: {
        label: "Outstanding Payments",
        value: 65000,
        formattedValue: "₹65,000",
        changePercent: -45.0,
        isPositive: true,
        comparedTo: "historic low overdue",
        subtext: "98.7% annual collection rate",
        currency: "INR",
      },
      activeLeads: {
        label: "Active Leads & Pipeline",
        value: 18,
        formattedValue: "18 Leads",
        changePercent: 55.0,
        isPositive: true,
        comparedTo: "vs. previous fiscal year",
        subtext: "Record deal volume",
        currency: "INR",
      },
    },
    revenueVsExpenses: [
      { period: "Q1", revenue: 1050000, expenses: 340000, netProfit: 710000 },
      { period: "Q2", revenue: 1220000, expenses: 380000, netProfit: 840000 },
      { period: "Q3", revenue: 1395000, expenses: 412000, netProfit: 983000 },
      { period: "Q4", revenue: 1455000, expenses: 448000, netProfit: 1007000 },
    ],
    revenueGrowth: [
      { month: "Q1", revenue: 1050000, recurring: 750000, project: 300000 },
      { month: "Q2", revenue: 1220000, recurring: 880000, project: 340000 },
      { month: "Q3", revenue: 1395000, recurring: 1020000, project: 375000 },
      { month: "Q4", revenue: 1455000, recurring: 1100000, project: 355000 },
    ],
    conversionStages: [
      { stage: "Inquiries", count: 1280, value: 48000000, rate: 100 },
      { stage: "Contacted", count: 920, value: 36000000, rate: 71.8 },
      { stage: "Qualified", count: 540, value: 24000000, rate: 42.1 },
      { stage: "Proposals", count: 280, value: 14500000, rate: 21.8 },
      { stage: "Won Deals", count: 172, value: 10200000, rate: 13.4 },
    ],
  },
};

export const mockRecentInvoices: RecentInvoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-089",
    clientName: "Horizon Digital Media",
    clientEmail: "billing@horizondigital.com",
    amount: 75000,
    issueDate: "2026-11-01",
    dueDate: "2026-11-15",
    status: "paid",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-088",
    clientName: "Zenith Software Labs",
    clientEmail: "finance@zenithlabs.io",
    amount: 120000,
    issueDate: "2026-10-28",
    dueDate: "2026-11-11",
    status: "paid",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-087",
    clientName: "Apex Retail Brands",
    clientEmail: "accounts@apexretail.in",
    amount: 45000,
    issueDate: "2026-10-15",
    dueDate: "2026-10-29",
    status: "overdue",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-086",
    clientName: "BrightWave Consulting",
    clientEmail: "payments@brightwave.co",
    amount: 20000,
    issueDate: "2026-10-18",
    dueDate: "2026-11-02",
    status: "overdue",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-085",
    clientName: "Orbit Global Technologies",
    clientEmail: "ops@orbitglobal.com",
    amount: 95000,
    issueDate: "2026-11-02",
    dueDate: "2026-11-16",
    status: "pending",
  },
];

export const mockRecentTransactions: RecentTransaction[] = [
  {
    id: "tx-1",
    title: "Client Retainer Wire",
    category: "Client Services",
    type: "income",
    amount: 75000,
    date: "Today, 14:20",
    method: "Bank Transfer (NEFT)",
    customerOrVendor: "Horizon Digital Media",
  },
  {
    id: "tx-2",
    title: "AWS Cloud Infrastructure",
    category: "Hosting & DevOps",
    type: "expense",
    amount: 14500,
    date: "Yesterday",
    method: "Corporate Card",
    customerOrVendor: "Amazon Web Services",
  },
  {
    id: "tx-3",
    title: "Contract Milestone Payment",
    category: "Software Development",
    type: "income",
    amount: 120000,
    date: "Nov 3, 2026",
    method: "Stripe Online",
    customerOrVendor: "Zenith Software Labs",
  },
  {
    id: "tx-4",
    title: "Google Workspace & Suite",
    category: "Software Subscriptions",
    type: "expense",
    amount: 4800,
    date: "Nov 2, 2026",
    method: "Auto-Debit",
    customerOrVendor: "Google Cloud India",
  },
  {
    id: "tx-5",
    title: "Design Contractor Payout",
    category: "Subcontractors",
    type: "expense",
    amount: 28000,
    date: "Nov 1, 2026",
    method: "Direct Wire",
    customerOrVendor: "Studio Minimal (Rohan)",
  },
];

export const mockCustomerActivities: CustomerActivity[] = [
  {
    id: "act-1",
    clientName: "Horizon Digital Media",
    action: "Approved Monthly Retainer Statement",
    detail: "Invoice #INV-2026-089 marked paid via auto-receipt.",
    timestamp: "2 hours ago",
    avatar: "HD",
    type: "payment",
  },
  {
    id: "act-2",
    clientName: "Zenith Software Labs",
    action: "Signed Master Service Agreement",
    detail: "6-month contract renewed at ₹1,20,000 / month.",
    timestamp: "5 hours ago",
    avatar: "ZS",
    type: "contract",
  },
  {
    id: "act-3",
    clientName: "Pinnacle Media Group",
    action: "Viewed Quotation 4 Times",
    detail: "Opened proposal 'Q-2026-042' (₹2,40,000) from Delhi, India.",
    timestamp: "Yesterday",
    avatar: "PM",
    type: "lead",
  },
  {
    id: "act-4",
    clientName: "BrightWave Consulting",
    action: "Requested Invoice Correction",
    detail: "Requested purchase order number addition on #INV-2026-086.",
    timestamp: "2 days ago",
    avatar: "BC",
    type: "support",
  },
];

export const mockUpcomingFollowUps: UpcomingFollowUp[] = [
  {
    id: "fol-1",
    contactName: "Vikram Malhotra",
    company: "Pinnacle Media Group",
    task: "Review Q4 Agency Retainer Proposal (₹2.4L)",
    dueDate: "Today, 16:00",
    priority: "high",
    assignedTo: "Saksham S.",
    completed: false,
  },
  {
    id: "fol-2",
    contactName: "Ananya Iyer",
    company: "Apex Retail Brands",
    task: "Follow up on overdue invoice #INV-2026-087 (₹45,000)",
    dueDate: "Tomorrow, 11:30",
    priority: "high",
    assignedTo: "Saksham S.",
    completed: false,
  },
  {
    id: "fol-3",
    contactName: "David Chen",
    company: "Orbit Global Technologies",
    task: "Product Demo & Contract Terms Finalization",
    dueDate: "Nov 8, 2026",
    priority: "medium",
    assignedTo: "Alex M.",
    completed: false,
  },
  {
    id: "fol-4",
    contactName: "Priya Sharma",
    company: "BlueSky Logistics",
    task: "Send onboarding questionnaire & kick-off doc",
    dueDate: "Nov 9, 2026",
    priority: "low",
    assignedTo: "Saksham S.",
    completed: true,
  },
];

export const mockAIInsights: AIInsightItem[] = [
  {
    id: "ins-1",
    title: "Three high-value leads need immediate follow-up",
    description:
      "Pinnacle Media (₹2.4L), Orbit Global (₹1.8L), and Zenith Sub-brand have viewed proposals without replying in 48 hours.",
    impact: "₹4,80,000 Pipeline Value at Risk",
    urgency: "high",
    category: "sales",
    actionLabel: "Generate 1-Click Follow-ups",
    actionMessage:
      "Personalized follow-up drafts generated for all 3 leads with value summaries.",
  },
  {
    id: "ins-2",
    title: "Two customer invoices are overdue (₹65,000)",
    description:
      "Apex Retail (#INV-087, ₹45k) is 9 days late, and BrightWave (#INV-086, ₹20k) is 4 days late.",
    impact: "Impacting Month-End Cash Surplus",
    urgency: "high",
    category: "finance",
    actionLabel: "Send Automated Reminders",
    actionMessage:
      "Friendly payment reminder nudges dispatched via WhatsApp & Email.",
  },
  {
    id: "ins-3",
    title: "Expenses increased by 12% in software subscriptions",
    description:
      "Cloud hosting and design tools increased from ₹18,200 to ₹20,400 this month. 2 seat licenses appear inactive.",
    impact: "Estimated Annual Savings: ₹26,000",
    urgency: "medium",
    category: "risk",
    actionLabel: "Audit Inactive Seats",
    actionMessage:
      "Identified 2 unassigned user seats ready for cancellation.",
  },
  {
    id: "ins-4",
    title: "Revenue is accelerating +18.4% compared with last month",
    description:
      "Monthly recurring retainers reached ₹3,50,000, providing an 82% baseline coverage for operating overhead.",
    impact: "Cash Runway Extended by 3.4 Months",
    urgency: "low",
    category: "growth",
    actionLabel: "View Retainer Health",
    actionMessage:
      "Retainer stability report exported to analytics workspace.",
  },
];
