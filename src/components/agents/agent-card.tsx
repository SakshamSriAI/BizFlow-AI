"use client";

import React from "react";
import { AIAgent } from "@/types/agents";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  CreditCard,
  FileText,
  TrendingUp,
  Zap,
  Settings,
  History,
  CheckCircle2,
  AlertCircle,
  Pause,
  Play,
  ShieldCheck,
  Bot,
} from "lucide-react";

interface AgentCardProps {
  agent: AIAgent;
  onToggleEnabled: (id: string) => void;
  onOpenConfig: (agent: AIAgent) => void;
  onOpenActivity: (agent: AIAgent) => void;
  onResolveApproval?: (agent: AIAgent) => void;
}

export function AgentCard({
  agent,
  onToggleEnabled,
  onOpenConfig,
  onOpenActivity,
  onResolveApproval,
}: AgentCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "UserPlus":
        return <UserPlus className="w-5 h-5 text-[#2F80ED]" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-rose-600" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "Zap":
      default:
        return <Zap className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusBadge = () => {
    if (!agent.enabled) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          <Pause className="w-3 h-3 text-slate-400" /> Disabled
        </span>
      );
    }

    switch (agent.status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case "action_required":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Approval Required
          </span>
        );
      case "idle":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Standing By
          </span>
        );
      case "paused":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <Pause className="w-3 h-3 text-slate-400" /> Paused
          </span>
        );
    }
  };

  return (
    <div
      className={`bg-white border rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between ${
        agent.status === "action_required"
          ? "border-rose-300 ring-1 ring-rose-200"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="space-y-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
              {getIcon(agent.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  {agent.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500">{agent.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
          {agent.description}
        </p>

        {/* Pending Approval Alert Callout */}
        {agent.pendingApprovalsCount > 0 && (
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-800">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold">
                1 task awaiting your human sign-off
              </span>
            </div>
            <button
              onClick={() => onResolveApproval?.(agent)}
              className="text-xs font-bold text-rose-700 underline hover:text-rose-900"
            >
              Review
            </button>
          </div>
        )}

        {/* Performance Metrics Row */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Completed
            </span>
            <span className="text-xs font-bold text-slate-900 font-mono">
              {agent.tasksCompletedCount} tasks
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Confidence
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">
              {agent.accuracyRate}%
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Cadence
            </span>
            <span className="text-xs font-bold text-slate-700 capitalize font-mono">
              {agent.config.executionFrequency}
            </span>
          </div>
        </div>

        {/* Permissions Badges */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Module Permissions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {agent.permissions.map((p, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
              >
                {p.label}: <strong className="uppercase text-[9px]">{p.access}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Enable / Disable Toggle */}
          <button
            onClick={() => onToggleEnabled(agent.id)}
            className={`h-7 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              agent.enabled
                ? "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            }`}
          >
            {agent.enabled ? (
              <>
                <Pause className="w-3 h-3 text-slate-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-blue-600" />
                <span>Enable</span>
              </>
            )}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenActivity(agent)}
            className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
            title="View Activity History"
          >
            <History className="w-3 h-3 mr-1" />
            Log
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenConfig(agent)}
          className="h-7 px-2.5 text-xs text-slate-700 hover:text-blue-600"
        >
          <Settings className="w-3 h-3 mr-1" />
          Configure
        </Button>
      </div>
    </div>
  );
}
