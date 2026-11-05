"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AIAgent } from "@/types/agents";
import { History, CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react";

interface AgentActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AIAgent | null;
}

export function AgentActivityDrawer({
  isOpen,
  onClose,
  agent,
}: AgentActivityDrawerProps) {
  if (!agent) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${agent.name} • Execution Audit Log`}
      description={`Recent activity timeline • Total completed tasks: ${agent.tasksCompletedCount}`}
      maxWidth="lg"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
        {agent.activities.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No logged tasks recorded for this agent yet.
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {agent.activities.map((act) => {
              const isPending = act.status === "pending_approval";
              return (
                <div key={act.id} className="relative group text-xs">
                  <div
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      isPending ? "bg-rose-500 animate-ping" : "bg-emerald-500"
                    }`}
                  />
                  <div
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      isPending ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  />

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">
                        {act.workflowName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {act.timestamp}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      {act.description}
                    </p>

                    {act.details && (
                      <div className="bg-white p-2 rounded border border-slate-200/80 text-[11px] font-mono text-slate-600 space-y-0.5">
                        {Object.entries(act.details).map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <span className="text-slate-400">{k}:</span>
                            <span className="font-semibold text-slate-800">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span
                        className={`font-semibold uppercase tracking-wider ${
                          isPending ? "text-rose-600 font-bold" : "text-emerald-600"
                        }`}
                      >
                        {act.status.replace("_", " ")}
                      </span>
                      <span className="text-slate-400 font-mono">ID: {act.id}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-200">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Close Log
          </Button>
        </div>
      </div>
    </Modal>
  );
}
