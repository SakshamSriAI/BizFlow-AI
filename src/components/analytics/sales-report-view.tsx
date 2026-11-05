"use client";

import React, { useState } from "react";
import { AnalyticsSummary, LeadFunnelStage } from "@/types/analytics";
import { formatMoney } from "@/lib/money";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Award,
  Users,
  Target,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SalesReportViewProps {
  data: AnalyticsSummary;
}

export function SalesReportView({ data }: SalesReportViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const funnelData = data.funnelStages.map((stage) => ({
    name: stage.stage,
    count: stage.count,
    value: stage.valueCents / 10000000, // In Crores / Millions
    conversion: stage.conversionRate,
  }));

  const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#10b981"];

  const filteredStages = data.funnelStages.filter((s) =>
    s.stage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Closed-Won Contracts
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {data.dealsWonCount} Deals
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            +33% vs prior period
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Pipeline Win Rate
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {data.winRatePercent}%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            From qualified stage
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Average Deal Size
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            ₹3,85,000
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            +12% expansion
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Sales Velocity
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            18.4 Days
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Demo to contract signature
          </span>
        </div>
      </div>

      {/* Chart: Deal Conversion Funnel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              5-Stage Lead Conversion Funnel
            </h3>
            <p className="text-xs text-slate-500">
              Progression from inbound lead inquiry to closed-won engagement
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 self-start sm:self-auto">
            Total Funnel: 124 Inquiries
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 11, fill: "#334155" }}
                width={120}
              />
              <Tooltip
                formatter={(val: any, name: any) => [
                  name === "count" ? `${val} Leads` : `₹${val} Cr`,
                  name === "count" ? "Lead Volume" : "Deal Value",
                ]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {funnelData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Funnel Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Stage-by-Stage Funnel Telemetry
          </span>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search funnel stage..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Funnel Stage</th>
                <th className="py-3 px-4 text-center">Lead Volume</th>
                <th className="py-3 px-4 text-right">Stage Deal Pipeline</th>
                <th className="py-3 px-4 text-center">Stage Conversion %</th>
                <th className="py-3 px-4 text-center">Dropoff %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No matching funnel stages found
                  </td>
                </tr>
              ) : (
                filteredStages.map((st, i) => (
                  <tr key={st.stage} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-600 mr-2 font-mono">
                        {i + 1}
                      </span>
                      {st.stage}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-800 font-mono">
                      {st.count}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                      {formatMoney(st.valueCents, "INR")}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {st.conversionRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-400">
                      {st.dropoffRate > 0 ? `${st.dropoffRate}%` : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
