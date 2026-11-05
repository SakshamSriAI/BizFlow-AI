"use client";

import * as React from "react";
import {
  Sparkles,
  Bot,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  TrendingUp,
  FileText,
  DollarSign,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { AIInsightItem, mockAIInsights } from "@/data/mock-dashboard-data";
import { cn } from "@/lib/utils";

export interface AIInsightsCardProps {
  onOpenCopilot?: () => void;
}

export function AIInsightsCard({ onOpenCopilot }: AIInsightsCardProps) {
  const [insights, setInsights] = React.useState<AIInsightItem[]>(mockAIInsights);
  const [activeModalAction, setActiveModalAction] = React.useState<{
    title: string;
    message: string;
  } | null>(null);

  const dismissInsight = (id: string) => {
    setInsights((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAction = (item: AIInsightItem) => {
    setActiveModalAction({
      title: item.actionLabel,
      message: item.actionMessage,
    });
  };

  const resetInsights = () => {
    setInsights(mockAIInsights);
  };

  return (
    <Card className="border-indigo-100 bg-linear-to-b from-indigo-50/40 via-white to-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-indigo-100/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Nexora AI Business Insights
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-500">
              Autonomous pattern detection across pipeline and ledger.
            </p>
          </div>
        </div>

        {insights.length < mockAIInsights.length ? (
          <button
            onClick={resetInsights}
            className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restore ({mockAIInsights.length - insights.length})</span>
          </button>
        ) : (
          <Badge variant="indigo" size="sm">
            {insights.length} Actionable
          </Badge>
        )}
      </div>

      {/* Insights List */}
      <div className="pt-3 space-y-3">
        {insights.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <div className="text-xs font-semibold text-slate-800">
              All insights addressed
            </div>
            <p className="text-[11px] text-slate-400">
              Your business operations and follow-up pipelines are in ideal health.
            </p>
            <Button variant="outline" size="sm" onClick={resetInsights}>
              Reload Insights
            </Button>
          </div>
        ) : (
          insights.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-200 transition-all shadow-2xs group relative"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {item.title}
                    </span>
                    <Badge
                      variant={
                        item.urgency === "high"
                          ? "danger"
                          : item.urgency === "medium"
                          ? "warning"
                          : "success"
                      }
                      size="sm"
                      className="text-[10px] py-0"
                    >
                      {item.urgency.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => dismissInsight(item.id)}
                  className="text-slate-300 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded"
                  title="Dismiss insight"
                  aria-label="Dismiss insight"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action Bar */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md self-start">
                  {item.impact}
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAction(item)}
                  className="text-xs self-start sm:self-auto h-7 px-3"
                  rightIcon={<ArrowRight className="w-3 h-3" />}
                >
                  {item.actionLabel}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Confirmation Modal */}
      <Modal
        isOpen={!!activeModalAction}
        onClose={() => setActiveModalAction(null)}
        title={activeModalAction?.title}
        description="Autonomous action execution confirmation."
        footer={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveModalAction(null)}
          >
            Done
          </Button>
        }
      >
        <div className="py-2 space-y-3">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{activeModalAction?.message}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            In future backend phases (Phase 7 & 8), this action automatically updates your CRM stage or financial ledger and notifies assigned team members.
          </p>
        </div>
      </Modal>
    </Card>
  );
}
