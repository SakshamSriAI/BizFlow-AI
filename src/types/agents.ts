export type AgentStatus = "active" | "paused" | "idle" | "action_required";

export type AgentModule = "crm" | "finance" | "invoicing" | "analytics" | "operations";

export interface AgentPermission {
  module: AgentModule;
  label: string;
  access: "read" | "write" | "admin";
}

export interface AgentActivity {
  id: string;
  timestamp: string;
  description: string;
  workflowName: string;
  status: "success" | "pending_approval" | "skipped" | "failed";
  details?: Record<string, any>;
}

export interface AgentConfig {
  executionFrequency: "realtime" | "hourly" | "daily" | "weekly";
  confidenceThreshold: number; // 50 to 99 percent
  requireHumanApproval: boolean;
  notifyChannels: {
    email: boolean;
    inApp: boolean;
    slack: boolean;
  };
  customRules?: string[];
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  iconName: string;
  color: string;
  status: AgentStatus;
  enabled: boolean;
  tasksCompletedCount: number;
  pendingApprovalsCount: number;
  accuracyRate: number;
  config: AgentConfig;
  permissions: AgentPermission[];
  activities: AgentActivity[];
  lastActive: string;
}

export interface WorkflowStep {
  stepNumber: number;
  name: string;
  description: string;
  targetModule: string;
  status: "waiting" | "in_progress" | "completed";
}

export interface WorkflowDefinition {
  id: string;
  workflowNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  agentId: string;
  agentName: string;
  trigger: string;
  steps: WorkflowStep[];
  currentStep: number;
  isRunning: boolean;
  lastRun: string;
  simulatedLogs: string[];
}
