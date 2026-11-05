import { ChatSession, ChatMessage, AIWidgetType } from "@/types/ai";
import {
  initialSessions,
  initialSessionMessages,
  suggestedPrompts,
} from "@/data/mock-ai-data";

const SESSIONS_STORAGE_KEY = "businessos_ai_sessions_v1";
const MESSAGES_STORAGE_KEY = "businessos_ai_messages_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getStoredSessions(): ChatSession[] {
  if (!isBrowser()) return initialSessions;
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(initialSessions));
      return initialSessions;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read AI sessions from localStorage:", e);
    return initialSessions;
  }
}

export function saveSessions(sessions: ChatSession[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    window.dispatchEvent(new Event("ai-sessions-updated"));
  } catch (e) {
    console.error("Failed to save AI sessions to localStorage:", e);
  }
}

export function getStoredMessages(): Record<string, ChatMessage[]> {
  if (!isBrowser()) return initialSessionMessages;
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(initialSessionMessages));
      return initialSessionMessages;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read AI messages from localStorage:", e);
    return initialSessionMessages;
  }
}

export function saveMessages(messages: Record<string, ChatMessage[]>): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    window.dispatchEvent(new Event("ai-messages-updated"));
  } catch (e) {
    console.error("Failed to save AI messages to localStorage:", e);
  }
}

export function createNewSession(title?: string): ChatSession {
  const sessions = getStoredSessions();
  const id = `session-${Date.now()}`;
  const now = new Date().toISOString();

  const newSession: ChatSession = {
    id,
    title: title || "New Conversation",
    snippet: "Started fresh analysis session...",
    category: "general",
    messageCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newSession, ...sessions];
  saveSessions(updated);

  const messagesMap = getStoredMessages();
  messagesMap[id] = [];
  saveMessages(messagesMap);

  return newSession;
}

export function deleteSession(sessionId: string): void {
  const sessions = getStoredSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  saveSessions(filtered);

  const messagesMap = getStoredMessages();
  delete messagesMap[sessionId];
  saveMessages(messagesMap);
}

// ==========================================
// INTELLIGENT SIMULATED COPILOT RESPONDER
// ==========================================

export function generateAssistantResponse(
  userQuery: string
): Omit<ChatMessage, "id" | "timestamp"> {
  const lower = userQuery.toLowerCase().trim();

  // 1. Overdue Invoices
  if (lower.includes("overdue") || lower.includes("unpaid invoice")) {
    return {
      sender: "assistant",
      text: "Scanning your accounts receivable register... You currently have **2 overdue client invoices** totaling **₹4,54,300**. Both accounts have exceeded their agreed payment terms.",
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
          id: `act-remind-${Date.now()}-1`,
          label: "Dispatch Email Reminder to Apex Retail (₹2,95,000)",
          actionType: "send_reminder",
          payload: {
            customer: "Apex Retail Brands",
            email: "ananya@apexretail.com",
            invoiceNumber: "INV-2024-002",
            amount: "₹2,95,000",
          },
        },
        {
          id: `act-remind-${Date.now()}-2`,
          label: "Dispatch Overdue Notice to Redwood Hospitality (₹1,59,300)",
          actionType: "send_reminder",
          payload: {
            customer: "Redwood Hospitality",
            email: "karan@redwoodhotels.in",
            invoiceNumber: "INV-2024-006",
            amount: "₹1,59,300",
          },
        },
        {
          id: `act-route-${Date.now()}-3`,
          label: "Open Invoices Ledger",
          actionType: "open_route",
          targetRoute: "/finance/invoices",
        },
      ],
    };
  }

  // 2. Spending / Expenses
  if (
    lower.includes("spend") ||
    lower.includes("expense") ||
    lower.includes("cost") ||
    lower.includes("burn")
  ) {
    return {
      sender: "assistant",
      text: "Here is your business expenditure breakdown for the current period. Total recorded outflow is **₹2,15,400**, reflecting **91.2% budget adherence** against your allocated ceiling of ₹2,36,000.",
      widgetType: "spending_breakdown",
      widgetData: {
        totalSpentCents: 21540000,
        budgetLimitCents: 23600000,
        utilizationPercent: 91.2,
        categories: [
          { name: "Team Payroll & Contractors", spentCents: 11000000, budgetCents: 12000000, percent: 91.6 },
          { name: "Cloud & Infrastructure", spentCents: 4250000, budgetCents: 4500000, percent: 94.4 },
          { name: "Sales & Performance Marketing", spentCents: 3450000, budgetCents: 4000000, percent: 86.2 },
          { name: "Software Subscriptions (SaaS)", spentCents: 1640000, budgetCents: 1800000, percent: 91.1 },
          { name: "Office Operations & Misc", spentCents: 1200000, budgetCents: 1300000, percent: 92.3 },
        ],
      },
      suggestedActions: [
        {
          id: `act-exp-${Date.now()}-1`,
          label: "View Detailed Expense Categories",
          actionType: "open_route",
          targetRoute: "/finance/categories",
        },
        {
          id: `act-exp-${Date.now()}-2`,
          label: "Export Monthly Expense Audit (CSV)",
          actionType: "export_report",
          payload: { reportType: "Expense Ledger Audit" },
        },
      ],
    };
  }

  // 3. Leads & Follow-ups
  if (
    lower.includes("lead") ||
    lower.includes("follow up") ||
    lower.includes("follow-up") ||
    lower.includes("pipeline")
  ) {
    return {
      sender: "assistant",
      text: "Cross-referencing your CRM pipeline... You have **3 high-value deals** requiring immediate engagement today. Together they represent **₹22,50,000** in active pipeline potential.",
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
            dueDate: "Due Today",
            notes: "Needs confirmation on cloud architecture SLA and SOC2 compliance checklist.",
          },
          {
            id: "lead-2",
            contactName: "Priya Sharma",
            company: "BlueSky Logistics",
            potentialValueCents: 65000000,
            stage: "Interested",
            dueDate: "Due Tomorrow",
            notes: "Demo completed; follow up on commercial proposal #EST-2024-001.",
          },
          {
            id: "lead-3",
            contactName: "Marcus Vance",
            company: "Zenith Software Labs",
            potentialValueCents: 75000000,
            stage: "Contacted",
            dueDate: "Due Today",
            notes: "Reviewing design system tokens and mobile engineering sprint timelines.",
          },
        ],
      },
      suggestedActions: [
        {
          id: `act-lead-${Date.now()}-1`,
          label: "Schedule Call with David Chen (Orbit Global)",
          actionType: "schedule_call",
          payload: { contact: "David Chen", company: "Orbit Global Technologies" },
        },
        {
          id: `act-lead-${Date.now()}-2`,
          label: "Open Sales Pipeline Kanban",
          actionType: "open_route",
          targetRoute: "/sales/pipeline",
        },
      ],
    };
  }

  // 4. Highest Value Customers
  if (
    lower.includes("customer") ||
    lower.includes("highest-value") ||
    lower.includes("top client") ||
    lower.includes("ltv")
  ) {
    return {
      sender: "assistant",
      text: "Here are your top enterprise customer accounts ranked by Lifetime Value (LTV) and Monthly Recurring Revenue (MRR). Your top 4 accounts contribute **74% of total recurring subscription cash flow**.",
      widgetType: "top_customers",
      widgetData: {
        customers: [
          {
            name: "Nordic Clean Energy",
            contact: "Elena Rostova",
            ltvCents: 145000000,
            mrrCents: 48000000,
            healthScore: 98,
            tier: "Enterprise Tier",
          },
          {
            name: "Pinnacle Media Group",
            contact: "Vikram Malhotra",
            ltvCents: 128000000,
            mrrCents: 35000000,
            healthScore: 94,
            tier: "Enterprise Tier",
          },
          {
            name: "Orbit Global Technologies",
            contact: "David Chen",
            ltvCents: 95000000,
            mrrCents: 22000000,
            healthScore: 91,
            tier: "Growth Tier",
          },
          {
            name: "Zenith Software Labs",
            contact: "Marcus Vance",
            ltvCents: 62000000,
            mrrCents: 12000000,
            healthScore: 89,
            tier: "Standard Tier",
          },
        ],
      },
      suggestedActions: [
        {
          id: `act-cust-${Date.now()}-1`,
          label: "View Customer Accounts Directory",
          actionType: "open_route",
          targetRoute: "/sales/customers",
        },
        {
          id: `act-cust-${Date.now()}-2`,
          label: "Prepare Q4 Account Retention Review",
          actionType: "export_report",
          payload: { reportType: "Customer Account LTV & Health Audit" },
        },
      ],
    };
  }

  // 5. Revenue Comparison
  if (
    lower.includes("compare") ||
    lower.includes("last month") ||
    lower.includes("revenue") ||
    lower.includes("growth")
  ) {
    return {
      sender: "assistant",
      text: "Your business generated **₹4,85,000 this month**, marking an **18.3% increase** compared with last month's collection of ₹4,10,000. Retainer stability continues to strengthen predictable cash flow.",
      widgetType: "revenue_comparison",
      widgetData: {
        currentMonth: "Current Month",
        previousMonth: "Previous Month",
        currentRevenueCents: 48500000,
        previousRevenueCents: 41000000,
        percentageGrowth: 18.3,
        retainerSharePercent: 68,
        projectSharePercent: 32,
        netMarginPercent: 55.6,
      },
      suggestedActions: [
        {
          id: `act-rev-${Date.now()}-1`,
          label: "Inspect Cash Flow in Finance Overview",
          actionType: "open_route",
          targetRoute: "/finance/overview",
        },
        {
          id: `act-rev-${Date.now()}-2`,
          label: "Export Inflow Comparison Report",
          actionType: "export_report",
          payload: { reportType: "Month-over-Month Revenue Growth" },
        },
      ],
    };
  }

  // 6. Summary / Executive Performance
  if (
    lower.includes("summarize") ||
    lower.includes("summary") ||
    lower.includes("performance") ||
    lower.includes("business overview") ||
    lower.includes("how is my business")
  ) {
    return {
      sender: "assistant",
      text: "Here is your executive performance briefing across all business verticals. Your operating metrics remain robust, with healthy net profit margins and strong cash runway.",
      widgetType: "performance_summary",
      widgetData: {
        monthlyRevenueCents: 48500000,
        revenueGrowthPercent: 18.3,
        monthlyExpensesCents: 21540000,
        netProfitMarginPercent: 55.6,
        cashRunwayMonths: 14.8,
        activeClientsCount: 16,
        activeDealsValueCents: 34500000,
        overdueCount: 2,
      },
      suggestedActions: [
        {
          id: `act-sum-${Date.now()}-1`,
          label: "View Executive Cockpit Dashboard",
          actionType: "open_route",
          targetRoute: "/app",
        },
        {
          id: `act-sum-${Date.now()}-2`,
          label: "Resolve 2 Overdue Invoices",
          actionType: "open_route",
          targetRoute: "/finance/invoices",
        },
      ],
    };
  }

  // Default Fallback: Freeform query intelligent synthesis
  return {
    sender: "assistant",
    text: `I synthesized your request: "${userQuery}". Based on your connected Nexora workspace records, your business is operating at **₹4,85,000 monthly inflow** with **₹2,15,400 in disbursements**, resulting in a net surplus of **₹2,69,600**. Your active CRM pipeline holds **18 potential leads**, and receivables show **2 overdue invoices** awaiting settlement.`,
    widgetType: "action_proposal",
    widgetData: {
      topic: userQuery,
      status: "Operational Synthesis Ready",
      recommendation: "Focus on closing the 3 qualified enterprise deals in your CRM and resolving overdue invoice #INV-2024-002 with Apex Retail Brands.",
    },
    suggestedActions: [
      {
        id: `act-custom-${Date.now()}-1`,
        label: "Check Overdue Receivables",
        actionType: "open_route",
        targetRoute: "/finance/invoices",
      },
      {
        id: `act-custom-${Date.now()}-2`,
        label: "Review Sales Pipeline",
        actionType: "open_route",
        targetRoute: "/sales/pipeline",
      },
    ],
  };
}
