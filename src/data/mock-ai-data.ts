import { SuggestedPrompt, ChatSession, ChatMessage } from "@/types/ai";

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "p-1",
    title: "Monthly Expenses",
    prompt: "How much did my business spend this month?",
    category: "finance",
    iconName: "CreditCard",
    description: "Analyze monthly outflow and category budget utilization",
  },
  {
    id: "p-2",
    title: "Overdue Invoices",
    prompt: "Show me overdue invoices.",
    category: "finance",
    iconName: "AlertCircle",
    description: "Review outstanding client receivables and dispatch reminders",
  },
  {
    id: "p-3",
    title: "Leads Follow-Up",
    prompt: "Which leads need follow-up?",
    category: "sales",
    iconName: "UserCheck",
    description: "Identify high-value leads with pending follow-up dates",
  },
  {
    id: "p-4",
    title: "Top Customers",
    prompt: "Who are my highest-value customers?",
    category: "sales",
    iconName: "Users",
    description: "Rank customer accounts by LTV, MRR, and engagement",
  },
  {
    id: "p-5",
    title: "Revenue Comparison",
    prompt: "Compare this month's revenue with last month.",
    category: "finance",
    iconName: "TrendingUp",
    description: "Assess month-over-month growth and retainer vs project split",
  },
  {
    id: "p-6",
    title: "Performance Summary",
    prompt: "Summarize my business performance.",
    category: "strategy",
    iconName: "Sparkles",
    description: "Generate a holistic executive overview of all business modules",
  },
];

export const initialSessions: ChatSession[] = [
  {
    id: "session-1",
    title: "Overdue Receivables & Collections",
    snippet: "Identified 2 overdue invoices totaling ₹3,60,000 for Apex Retail and Redwood...",
    category: "finance",
    messageCount: 4,
    createdAt: "2024-11-04T10:15:00Z",
    updatedAt: "2024-11-04T10:20:00Z",
  },
  {
    id: "session-2",
    title: "October Revenue & Runway Review",
    snippet: "Monthly revenue reached ₹4,85,000 (+18.3%). Runway stands at 14.2 months...",
    category: "finance",
    messageCount: 3,
    createdAt: "2024-11-03T14:00:00Z",
    updatedAt: "2024-11-03T14:10:00Z",
  },
  {
    id: "session-3",
    title: "Q4 High-Value Lead Pipeline",
    snippet: "3 enterprise leads requiring immediate follow-up: Orbit Global, BlueSky, Zenith...",
    category: "sales",
    messageCount: 4,
    createdAt: "2024-11-02T16:30:00Z",
    updatedAt: "2024-11-02T16:45:00Z",
  },
];

export const initialSessionMessages: Record<string, ChatMessage[]> = {
  "session-1": [
    {
      id: "msg-1-1",
      sender: "user",
      text: "Show me overdue invoices.",
      timestamp: "10:15 AM",
    },
    {
      id: "msg-1-2",
      sender: "assistant",
      text: "I analyzed your current accounts receivable ledger. You currently have **2 overdue client invoices** totaling **₹4,54,300**. Both accounts have passed their agreed payment terms.",
      timestamp: "10:15 AM",
      widgetType: "overdue_invoices",
      widgetData: {
        totalOverdueCents: 45430000,
        invoices: [
          {
            id: "inv-002",
            invoiceNumber: "INV-2024-002",
            customerName: "Apex Retail Brands",
            customerEmail: "ananya@apexretail.com",
            amountDueCents: 29500000,
            dueDate: "2024-10-25",
            daysOverdue: 11,
          },
          {
            id: "inv-006",
            invoiceNumber: "INV-2024-006",
            customerName: "Redwood Hospitality",
            customerEmail: "karan@redwoodhotels.in",
            amountDueCents: 15930000,
            dueDate: "2024-10-15",
            daysOverdue: 21,
          },
        ],
      },
      suggestedActions: [
        {
          id: "act-1",
          label: "Dispatch Email Reminder to Apex Retail",
          actionType: "send_reminder",
          payload: {
            customer: "Apex Retail Brands",
            email: "ananya@apexretail.com",
            invoiceNumber: "INV-2024-002",
            amount: "₹2,95,000",
          },
        },
        {
          id: "act-2",
          label: "Dispatch Notice to Redwood Hospitality",
          actionType: "send_reminder",
          payload: {
            customer: "Redwood Hospitality",
            email: "karan@redwoodhotels.in",
            invoiceNumber: "INV-2024-006",
            amount: "₹1,59,300",
          },
        },
        {
          id: "act-3",
          label: "Open Invoicing Ledger",
          actionType: "open_route",
          targetRoute: "/finance/invoices",
        },
      ],
    },
    {
      id: "msg-1-3",
      sender: "user",
      text: "What is our historical payment reliability for Apex Retail Brands?",
      timestamp: "10:18 AM",
    },
    {
      id: "msg-1-4",
      sender: "assistant",
      text: "Apex Retail Brands has completed **3 previous billing cycles** with an average payment turnaround of **28 days** (within their Net 30 agreement). This is their first overdue invoice, likely due to an internal Q3 fiscal audit. I recommend sending a friendly polite reminder rather than an escalation notice.",
      timestamp: "10:19 AM",
    },
  ],

  "session-2": [
    {
      id: "msg-2-1",
      sender: "user",
      text: "Compare this month's revenue with last month.",
      timestamp: "02:00 PM",
    },
    {
      id: "msg-2-2",
      sender: "assistant",
      text: "Here is your month-over-month revenue analysis for October vs September 2024. Your business demonstrated **+18.3% top-line growth**, driven primarily by expanded retainer commitments.",
      timestamp: "02:00 PM",
      widgetType: "revenue_comparison",
      widgetData: {
        currentMonth: "October 2024",
        previousMonth: "September 2024",
        currentRevenueCents: 48500000,
        previousRevenueCents: 41000000,
        percentageGrowth: 18.3,
        retainerSharePercent: 68,
        projectSharePercent: 32,
        netMarginPercent: 44.5,
      },
      suggestedActions: [
        {
          id: "act-rev-1",
          label: "View Revenue Breakdown in Finance",
          actionType: "open_route",
          targetRoute: "/finance/overview",
        },
        {
          id: "act-rev-2",
          label: "Export Monthly Financial Report",
          actionType: "export_report",
          payload: { reportType: "Revenue Comparison Q4" },
        },
      ],
    },
  ],

  "session-3": [
    {
      id: "msg-3-1",
      sender: "user",
      text: "Which leads need follow-up?",
      timestamp: "04:30 PM",
    },
    {
      id: "msg-3-2",
      sender: "assistant",
      text: "Scanning your CRM pipeline... You have **3 high-priority leads** whose scheduled follow-up dates have arrived. Together, these represent **₹22,50,000** in potential pipeline deal value.",
      timestamp: "04:30 PM",
      widgetType: "leads_followup",
      widgetData: {
        totalPipelineCents: 225000000,
        leads: [
          {
            id: "lead-1",
            contactName: "David Chen",
            company: "Orbit Global Technologies",
            potentialValueCents: 85000000,
            stage: "Qualified",
            dueDate: "Today",
            notes: "Requested enterprise multi-tenant cloud spec and security questionnaire.",
          },
          {
            id: "lead-2",
            contactName: "Priya Sharma",
            company: "BlueSky Logistics",
            potentialValueCents: 65000000,
            stage: "Interested",
            dueDate: "Tomorrow",
            notes: "Demo completed; follow up on commercial proposal #EST-2024-001.",
          },
          {
            id: "lead-3",
            contactName: "Marcus Vance",
            company: "Zenith Software Labs",
            potentialValueCents: 75000000,
            stage: "Contacted",
            dueDate: "Today",
            notes: "Requested pricing breakdown for mobile token SDK integration.",
          },
        ],
      },
      suggestedActions: [
        {
          id: "act-lead-1",
          label: "Schedule Call with David Chen (Orbit Global)",
          actionType: "schedule_call",
          payload: { contact: "David Chen", company: "Orbit Global Technologies" },
        },
        {
          id: "act-lead-2",
          label: "Open Sales Pipeline Kanban",
          actionType: "open_route",
          targetRoute: "/sales/pipeline",
        },
      ],
    },
  ],
};
