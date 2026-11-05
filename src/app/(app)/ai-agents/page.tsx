"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { AIAgent, WorkflowDefinition } from "@/types/agents";
import {
  getStoredAgents,
  getStoredWorkflows,
  toggleAgentEnabled,
} from "@/lib/agents-store";
import { AgentCard } from "@/components/agents/agent-card";
import { AgentConfigModal } from "@/components/agents/agent-config-modal";
import { AgentActivityDrawer } from "@/components/agents/agent-activity-drawer";
import { WorkflowSimulationCard } from "@/components/agents/workflow-simulation-card";
import { ApprovalModal } from "@/components/agents/approval-modal";
import {
  Bot,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Play,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  FileText,
} from "lucide-react";

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
  const [activeTab, setActiveTab] = useState<"agents" | "workflows" | "approvals" | "audit">("agents");

  // Modals state
  const [selectedAgentForConfig, setSelectedAgentForConfig] = useState<AIAgent | null>(null);
  const [selectedAgentForActivity, setSelectedAgentForActivity] = useState<AIAgent | null>(null);
  const [selectedWorkflowForApproval, setSelectedWorkflowForApproval] = useState<WorkflowDefinition | null>(null);

  const refreshData = () => {
    setAgents(getStoredAgents());
    setWorkflows(getStoredWorkflows());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("agents-updated", refreshData);
    window.addEventListener("workflows-updated", refreshData);
    return () => {
      window.removeEventListener("agents-updated", refreshData);
      window.removeEventListener("workflows-updated", refreshData);
    };
  }, []);

  const totalTasks = agents.reduce((acc, a) => acc + a.tasksCompletedCount, 0);
  const totalPending = agents.reduce((acc, a) => acc + a.pendingApprovalsCount, 0);
  const activeCount = agents.filter((a) => a.enabled && a.status !== "paused").length;

  const handleToggle = (id: string) => {
    toggleAgentEnabled(id);
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="AI Agent Management & Autonomous Workflows"
        description="Configure specialized business agents, manage permissions, and orchestrate automated cross-module workflows."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/ai-assistant">
              <Button variant="outline" size="sm" className="text-xs">
                <Bot className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                Copilot Chat
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab("workflows")}
              className="text-xs"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Simulate Workflows
            </Button>
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Agents */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Specialized Agents</span>
            <Bot className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {activeCount} / {agents.length} Online
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sales, Finance, Invoicing, Analyst & Ops
          </p>
        </div>

        {/* Total Autonomous Tasks */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Tasks Executed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {totalTasks} Executions
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 4 multi-step pipelines</p>
        </div>

        {/* Model Accuracy */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Average Accuracy</span>
            <TrendingUp className="w-4 h-4 text-[#20B8A5]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">99.4%</div>
          <p className="text-xs text-slate-500 mt-1">High-confidence decision adherence</p>
        </div>

        {/* Pending Approvals */}
        <div
          className={`bg-white border rounded-xl p-4 shadow-sm transition-all cursor-pointer ${
            totalPending > 0
              ? "border-rose-300 bg-rose-50/20 hover:border-rose-400"
              : "border-slate-200 hover:border-slate-300"
          }`}
          onClick={() => totalPending > 0 && setActiveTab("approvals")}
        >
          <div className="flex items-center justify-between text-xs font-semibold mb-2 text-rose-600">
            <span>Human Approvals</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 font-mono">
            {totalPending} Required
          </div>
          <p className="text-xs text-rose-500 mt-1 font-medium">
            {totalPending > 0 ? "Sign-off on overdue notice" : "Queue clear"}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "agents", label: "Agent Directory", count: agents.length },
            { id: "workflows", label: "Automated Workflows", count: workflows.length },
            { id: "approvals", label: "Pending Approvals", count: totalPending, variant: "rose" },
            { id: "audit", label: "Audit Activity Log" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 -mb-px ${
                  isActive
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      tab.variant === "rose" && tab.count > 0
                        ? "bg-rose-100 text-rose-700 animate-pulse"
                        : isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Autonomous Safety Guardrails Active</span>
        </div>
      </div>

      {/* TAB 1: AGENT DIRECTORY */}
      {activeTab === "agents" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onToggleEnabled={handleToggle}
                onOpenConfig={(a) => setSelectedAgentForConfig(a)}
                onOpenActivity={(a) => setSelectedAgentForActivity(a)}
                onResolveApproval={() => {
                  const wf2 = workflows.find((w) => w.workflowNumber === 2);
                  if (wf2) setSelectedWorkflowForApproval(wf2);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AUTOMATED WORKFLOWS */}
      {activeTab === "workflows" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900">
                Interactive Multi-Step Workflow Simulators
              </span>
              <p className="text-slate-500">
                Test and observe real-time automated handoffs between CRM, Financial Ledger, Invoicing, and Operational Reminders.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
              4/4 Workflows Ready
            </span>
          </div>

          <div className="space-y-4">
            {workflows.map((wf) => (
              <WorkflowSimulationCard
                key={wf.id}
                workflow={wf}
                onOpenApprovalModal={(w) => setSelectedWorkflowForApproval(w)}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PENDING APPROVALS */}
      {activeTab === "approvals" && (
        <div className="space-y-4 animate-fade-in">
          {totalPending === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                Human Sign-Off Queue is Clear
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No autonomous tasks are currently paused awaiting administrator approval.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("workflows")}
                className="text-xs"
              >
                Explore Automated Workflows
              </Button>
            </div>
          ) : (
            <div className="bg-white border border-rose-200 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                    Action Required • Invoicing Agent
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Overdue Invoice Escalation Notice: Apex Retail Brands
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Invoice #INV-2024-002 (₹2,95,000) reached 11 days past due date.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const wf2 = workflows.find((w) => w.workflowNumber === 2);
                    if (wf2) setSelectedWorkflowForApproval(wf2);
                  }}
                  className="text-xs bg-rose-600 hover:bg-rose-700"
                >
                  Review & Sign-Off
                </Button>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <span className="font-semibold text-slate-700">Prepared Action:</span>
                <p className="text-slate-600">
                  Transmit polite reminder email with invoice link and direct bank transfer instructions to <strong>ananya@apexretail.com</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SYSTEM AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Autonomous Activity Ledger
            </span>
            <span className="text-xs text-slate-400">
              Real-time audit stream
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {agents.flatMap((a) => a.activities.map((act) => ({ ...act, agentName: a.name }))).map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.agentName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-blue-600">{item.workflowName}</span>
                  </div>
                  <p className="text-slate-700">{item.description}</p>
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <span className="text-[11px] text-slate-400 block font-mono">{item.timestamp}</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      item.status === "pending_approval"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent Configuration Modal */}
      <AgentConfigModal
        isOpen={!!selectedAgentForConfig}
        onClose={() => setSelectedAgentForConfig(null)}
        agent={selectedAgentForConfig}
        onSaved={refreshData}
      />

      {/* Agent Activity Drawer */}
      <AgentActivityDrawer
        isOpen={!!selectedAgentForActivity}
        onClose={() => setSelectedAgentForActivity(null)}
        agent={selectedAgentForActivity}
      />

      {/* Human Approval Sign-Off Modal */}
      <ApprovalModal
        isOpen={!!selectedWorkflowForApproval}
        onClose={() => setSelectedWorkflowForApproval(null)}
        workflow={selectedWorkflowForApproval}
        onApproved={() => {
          refreshData();
        }}
      />
    </div>
  );
}
