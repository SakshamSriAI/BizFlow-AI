export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskCategory = "Sales" | "Finance" | "Operations" | "Client" | "Team";

export interface OperationalTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignee: {
    name: string;
    avatar?: string;
    role: string;
  };
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  tags?: string[];
}

export type ReminderUrgency = "critical" | "high" | "normal";

export interface OperationalReminder {
  id: string;
  title: string;
  description: string;
  category: "Tax & Compliance" | "Client Billing" | "Contract Renewal" | "Operations" | "Team Review";
  urgency: ReminderUrgency;
  dueDate: string;
  isCompleted: boolean;
  snoozedUntil?: string;
  createdAt: string;
}
