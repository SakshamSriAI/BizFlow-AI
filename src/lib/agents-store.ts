import { AIAgent, WorkflowDefinition, AgentConfig, AgentPermission } from "@/types/agents";
import { initialAgents, initialWorkflows } from "@/data/mock-agents-data";

const AGENTS_STORAGE_KEY = "businessos_agents_v1";
const WORKFLOWS_STORAGE_KEY = "businessos_workflows_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getStoredAgents(): AIAgent[] {
  if (!isBrowser()) return initialAgents;
  try {
    const raw = localStorage.getItem(AGENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(initialAgents));
      return initialAgents;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read agents from localStorage:", e);
    return initialAgents;
  }
}

export function saveAgents(agents: AIAgent[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents));
    window.dispatchEvent(new Event("agents-updated"));
  } catch (e) {
    console.error("Failed to save agents to localStorage:", e);
  }
}

export function getAgentById(id: string): AIAgent | undefined {
  const agents = getStoredAgents();
  return agents.find((a) => a.id === id);
}

export function toggleAgentEnabled(id: string): AIAgent | null {
  const agents = getStoredAgents();
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const agent = agents[index];
  const newEnabled = !agent.enabled;
  const newStatus = newEnabled ? "active" : "paused";

  const updated: AIAgent = {
    ...agent,
    enabled: newEnabled,
    status: newStatus,
    lastActive: "Just now",
  };

  agents[index] = updated;
  saveAgents(agents);
  return updated;
}

export function updateAgentConfig(
  id: string,
  configUpdates: Partial<AgentConfig>
): AIAgent | null {
  const agents = getStoredAgents();
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updated: AIAgent = {
    ...agents[index],
    config: {
      ...agents[index].config,
      ...configUpdates,
    },
    lastActive: "Config updated",
  };

  agents[index] = updated;
  saveAgents(agents);
  return updated;
}

export function updateAgentPermissions(
  id: string,
  permissions: AgentPermission[]
): AIAgent | null {
  const agents = getStoredAgents();
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updated: AIAgent = {
    ...agents[index],
    permissions,
    lastActive: "Permissions updated",
  };

  agents[index] = updated;
  saveAgents(agents);
  return updated;
}

// ==========================================
// WORKFLOWS MANAGEMENT & SIMULATION
// ==========================================

export function getStoredWorkflows(): WorkflowDefinition[] {
  if (!isBrowser()) return initialWorkflows;
  try {
    const raw = localStorage.getItem(WORKFLOWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WORKFLOWS_STORAGE_KEY, JSON.stringify(initialWorkflows));
      return initialWorkflows;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read workflows from localStorage:", e);
    return initialWorkflows;
  }
}

export function saveWorkflows(workflows: WorkflowDefinition[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(WORKFLOWS_STORAGE_KEY, JSON.stringify(workflows));
    window.dispatchEvent(new Event("workflows-updated"));
  } catch (e) {
    console.error("Failed to save workflows to localStorage:", e);
  }
}

export function approvePendingWorkflow(workflowId: string): void {
  const workflows = getStoredWorkflows();
  const wfIndex = workflows.findIndex((w) => w.id === workflowId);
  if (wfIndex === -1) return;

  const wf = workflows[wfIndex];
  const updatedSteps = wf.steps.map((st) => ({
    ...st,
    status: "completed" as const,
  }));

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const updated: WorkflowDefinition = {
    ...wf,
    steps: updatedSteps,
    lastRun: "Just now",
    simulatedLogs: [
      ...wf.simulatedLogs,
      `[${timeStr}] Human approval granted by Administrator.`,
      `[${timeStr}] Polite payment reminder dispatched to ananya@apexretail.com via SendGrid.`,
      `[${timeStr}] Workflow 2 execution finalized with audit status: SUCCESS.`,
    ],
  };

  workflows[wfIndex] = updated;
  saveWorkflows(workflows);

  // Clear pending approval count on Invoicing Agent
  const agents = getStoredAgents();
  const invAgentIndex = agents.findIndex((a) => a.id === "invoicing-agent");
  if (invAgentIndex !== -1) {
    agents[invAgentIndex] = {
      ...agents[invAgentIndex],
      status: "active",
      pendingApprovalsCount: 0,
      tasksCompletedCount: agents[invAgentIndex].tasksCompletedCount + 1,
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: "Just now",
          description: "Approved & dispatched overdue reminder to Apex Retail Brands (₹2,95,000)",
          workflowName: "Overdue Invoicing Escalation",
          status: "success",
        },
        ...agents[invAgentIndex].activities,
      ],
    };
    saveAgents(agents);
  }
}
