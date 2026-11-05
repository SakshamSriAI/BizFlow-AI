export type MessageSender = "user" | "assistant" | "system";

export type AIWidgetType =
  | "spending_breakdown"
  | "leads_followup"
  | "overdue_invoices"
  | "top_customers"
  | "revenue_comparison"
  | "performance_summary"
  | "action_proposal";

export interface SuggestedAction {
  id: string;
  label: string;
  actionType:
    | "send_reminder"
    | "schedule_call"
    | "export_report"
    | "categorize_expense"
    | "open_route"
    | "approve_action";
  targetRoute?: string;
  payload?: any;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  widgetType?: AIWidgetType;
  widgetData?: any;
  suggestedActions?: SuggestedAction[];
  executionStatus?: "idle" | "executing" | "completed" | "cancelled";
  executedActionId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  snippet: string;
  category: "general" | "finance" | "sales" | "operations";
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  prompt: string;
  category: "finance" | "sales" | "operations" | "strategy";
  iconName: string;
  description?: string;
}
