"use client";

import React from "react";
import { suggestedPrompts } from "@/data/mock-ai-data";
import {
  CreditCard,
  AlertCircle,
  UserCheck,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface SuggestedPromptsBarProps {
  onSelectPrompt: (promptText: string) => void;
}

export function SuggestedPromptsBar({
  onSelectPrompt,
}: SuggestedPromptsBarProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "CreditCard":
        return <CreditCard className="w-3.5 h-3.5 text-blue-600" />;
      case "AlertCircle":
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600" />;
      case "UserCheck":
        return <UserCheck className="w-3.5 h-3.5 text-[#20B8A5]" />;
      case "Users":
        return <Users className="w-3.5 h-3.5 text-[#2F80ED]" />;
      case "TrendingUp":
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  return (
    <div className="py-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 pb-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Suggested:
        </span>
        {suggestedPrompts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPrompt(p.prompt)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all shadow-2xs whitespace-nowrap shrink-0 group"
          >
            {getIcon(p.iconName)}
            <span>{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
