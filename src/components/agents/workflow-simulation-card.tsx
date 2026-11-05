"use client";

import React, { useState } from "react";
import { WorkflowDefinition, WorkflowStep } from "@/types/agents";
import { Button } from "@/components/ui/button";
import {
  Play,
  CheckCircle2,
  Clock,
  Loader2,
  Terminal,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface WorkflowSimulationCardProps {
  workflow: WorkflowDefinition;
  onOpenApprovalModal?: (workflow: WorkflowDefinition) => void;
}

export function WorkflowSimulationCard({
  workflow,
  onOpenApprovalModal,
}: WorkflowSimulationCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(
    workflow.workflowNumber === 2 ? 3 : 0
  );
  const [logs, setLogs] = useState<string[]>(workflow.simulatedLogs);
  const [showLogs, setShowLogs] = useState(false);
  const [isCompleted, setIsCompleted] = useState(workflow.workflowNumber !== 2);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentStepIndex(0);
    setShowLogs(true);

    const now = new Date();
    const ts = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    const newLogs = [`[${ts()}] Simulation initialized: ${workflow.title}`];
    setLogs(newLogs);

    // Step 1
    setTimeout(() => {
      setCurrentStepIndex(1);
      setLogs((prev) => [
        ...prev,
        `[${ts()}] Step 1 executing: ${workflow.steps[0].name} (${workflow.steps[0].targetModule})`,
      ]);

      // Step 2
      setTimeout(() => {
        setCurrentStepIndex(2);
        setLogs((prev) => [
          ...prev,
          `[${ts()}] Step 2 executing: ${workflow.steps[1].name} (${workflow.steps[1].targetModule})`,
        ]);

        // Step 3
        setTimeout(() => {
          if (workflow.steps.length === 3) {
            setCurrentStepIndex(3);
            setLogs((prev) => [
              ...prev,
              `[${ts()}] Step 3 completed: ${workflow.steps[2].name} (${workflow.steps[2].targetModule})`,
              `[${ts()}] Workflow execution succeeded with audit status: SUCCESS.`,
            ]);
            setIsRunning(false);
            setIsCompleted(true);
          } else if (workflow.steps.length === 4) {
            // Workflow 2 with 4 steps
            setCurrentStepIndex(3);
            setLogs((prev) => [
              ...prev,
              `[${ts()}] Step 3 completed: ${workflow.steps[2].name}`,
              `[${ts()}] Step 4 PAUSED: Human approval required before dispatching client reminder.`,
            ]);
            setIsRunning(false);
            setIsCompleted(false);
          }
        }, 800);
      }, 800);
    }, 700);
  };

  const isPendingApproval = workflow.workflowNumber === 2 && !isCompleted;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              Workflow {workflow.workflowNumber}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Assigned: <strong>{workflow.agentName}</strong>
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mt-1">
            {workflow.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isPendingApproval ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenApprovalModal?.(workflow)}
              className="text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border-rose-200 animate-pulse font-semibold"
            >
              <AlertCircle className="w-3.5 h-3.5 mr-1 text-rose-600" />
              Sign-Off Required
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={runSimulation}
              disabled={isRunning}
              className="text-xs h-8"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  Run Simulation
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Description & Trigger */}
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs space-y-1">
        <p className="text-slate-700">{workflow.description}</p>
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          <span className="font-semibold text-slate-700">Trigger:</span>{" "}
          {workflow.trigger}
        </p>
      </div>

      {/* Visual Multi-Step Stepper */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Automated Pipeline Steps:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {workflow.steps.map((st, idx) => {
            const stepNum = idx + 1;
            let stepState: "completed" | "in_progress" | "waiting" = "waiting";

            if (isRunning) {
              if (currentStepIndex > idx) stepState = "completed";
              else if (currentStepIndex === idx) stepState = "in_progress";
              else stepState = "waiting";
            } else if (isCompleted) {
              stepState = "completed";
            } else if (workflow.workflowNumber === 2 && idx < 3) {
              stepState = "completed";
            } else if (workflow.workflowNumber === 2 && idx === 3) {
              stepState = "in_progress"; // Awaiting approval
            }

            return (
              <div
                key={st.stepNumber}
                className={`p-3 rounded-lg border text-xs transition-all flex flex-col justify-between ${
                  stepState === "completed"
                    ? "bg-emerald-50/50 border-emerald-200"
                    : stepState === "in_progress"
                    ? "bg-blue-50/60 border-blue-300 ring-1 ring-blue-200"
                    : "bg-slate-50/60 border-slate-200 opacity-60"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">
                      Step {st.stepNumber}
                    </span>
                    {stepState === "completed" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    {stepState === "in_progress" && (
                      <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    )}
                    {stepState === "waiting" && (
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </div>
                  <p className="font-bold text-slate-900">{st.name}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {st.description}
                  </p>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-400 font-mono">
                  Target: {st.targetModule}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collapsible Execution Logs */}
      <div className="pt-2">
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Execution Telemetry Console ({logs.length} log lines)</span>
          {showLogs ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showLogs && (
          <div className="mt-2 bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] space-y-1 max-h-40 overflow-y-auto">
            {logs.map((log, i) => (
              <p
                key={i}
                className={
                  log.includes("PAUSED") || log.includes("approval")
                    ? "text-amber-400 font-bold"
                    : log.includes("SUCCESS") || log.includes("completed")
                    ? "text-emerald-400"
                    : "text-slate-300"
                }
              >
                {log}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
