"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadConversionStage } from "@/data/mock-dashboard-data";
import { Target, Users, CheckCircle2, ArrowRight } from "lucide-react";

export interface LeadConversionChartProps {
  stages: LeadConversionStage[];
  currencySymbol?: string;
}

export function LeadConversionChart({
  stages,
  currencySymbol = "₹",
}: LeadConversionChartProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Lead Conversion Funnel
            </h3>
            <Badge variant="indigo" size="sm">
              15.0% Win Rate
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage progression and conversion velocity across sales pipeline.
          </p>
        </div>
      </div>

      <div className="pt-4 space-y-3.5">
        {stages.map((st, idx) => {
          const isFinal = idx === stages.length - 1;

          return (
            <div key={st.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{st.stage}</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {currencySymbol}
                    {(st.value / 100000).toFixed(1)}L
                  </span>
                  <span className="font-bold text-slate-900 w-16 text-right">
                    {st.count} deals
                  </span>
                  <Badge
                    variant={isFinal ? "success" : "secondary"}
                    size="sm"
                    className="w-14 justify-center"
                  >
                    {st.rate}%
                  </Badge>
                </div>
              </div>

              {/* Funnel Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFinal
                      ? "bg-emerald-500"
                      : idx === 0
                      ? "bg-indigo-600"
                      : "bg-indigo-400"
                  }`}
                  style={{ width: `${Math.max(st.rate, 8)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
