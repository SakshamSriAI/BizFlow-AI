"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { AIAgent, AgentConfig, AgentPermission } from "@/types/agents";
import { updateAgentConfig, updateAgentPermissions } from "@/lib/agents-store";
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sliders,
  Bell,
  Save,
} from "lucide-react";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AIAgent | null;
  onSaved?: () => void;
}

export function AgentConfigModal({
  isOpen,
  onClose,
  agent,
  onSaved,
}: AgentConfigModalProps) {
  const [frequency, setFrequency] = useState<AgentConfig["executionFrequency"]>("realtime");
  const [threshold, setThreshold] = useState<number>(88);
  const [requireApproval, setRequireApproval] = useState<boolean>(false);
  const [emailNotify, setEmailNotify] = useState<boolean>(true);
  const [inAppNotify, setInAppNotify] = useState<boolean>(true);
  const [slackNotify, setSlackNotify] = useState<boolean>(false);

  const [permissions, setPermissions] = useState<AgentPermission[]>([]);

  useEffect(() => {
    if (agent) {
      setFrequency(agent.config.executionFrequency);
      setThreshold(agent.config.confidenceThreshold);
      setRequireApproval(agent.config.requireHumanApproval);
      setEmailNotify(agent.config.notifyChannels.email);
      setInAppNotify(agent.config.notifyChannels.inApp);
      setSlackNotify(agent.config.notifyChannels.slack);
      setPermissions([...agent.permissions]);
    }
  }, [agent, isOpen]);

  if (!agent) return null;

  const handlePermissionChange = (index: number, newAccess: AgentPermission["access"]) => {
    const updated = [...permissions];
    updated[index].access = newAccess;
    setPermissions(updated);
  };

  const handleSave = () => {
    updateAgentConfig(agent.id, {
      executionFrequency: frequency,
      confidenceThreshold: threshold,
      requireHumanApproval: requireApproval,
      notifyChannels: {
        email: emailNotify,
        inApp: inAppNotify,
        slack: slackNotify,
      },
    });

    updateAgentPermissions(agent.id, permissions);

    onSaved?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Configure ${agent.name}`}
      description={agent.role}
      maxWidth="lg"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto px-1">
        {/* Section 1: Execution & Confidence */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Operational Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Execution Cadence
              </label>
              <Select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                options={[
                  { value: "realtime", label: "Realtime (Event Driven)" },
                  { value: "hourly", label: "Hourly Batch" },
                  { value: "daily", label: "Daily Scheduled Run" },
                  { value: "weekly", label: "Weekly Summary" },
                ]}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Confidence Threshold
                </label>
                <span className="text-xs font-bold text-blue-600 font-mono">
                  {threshold}%
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Actions below {threshold}% confidence trigger manual review
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Human Approval Requirement */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Require Human Sign-Off Before Action
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                When enabled, actions will queue for administrator approval rather than executing autonomously.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setRequireApproval(!requireApproval)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                requireApproval ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  requireApproval ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 3: Permissions Matrix */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Module Access Permissions</span>
          </div>

          <div className="space-y-2">
            {permissions.map((p, idx) => (
              <div
                key={p.module}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900">{p.label}</span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Module ID: {p.module}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(["read", "write", "admin"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handlePermissionChange(idx, lvl)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase transition-all ${
                        p.access === lvl
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Notification Channels */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Notification Preferences</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotify}
                onChange={(e) => setEmailNotify(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Email Alerts</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inAppNotify}
                onChange={(e) => setInAppNotify(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>In-App Banner</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={slackNotify}
                onChange={(e) => setSlackNotify(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Slack Webhook</span>
            </label>
          </div>
        </div>

        {/* Section 5: Custom Guardrail Rules */}
        {agent.config.customRules && agent.config.customRules.length > 0 && (
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Active Guardrail Rules:
            </span>
            <ul className="space-y-1 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {agent.config.customRules.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Configuration
          </Button>
        </div>
      </div>
    </Modal>
  );
}
