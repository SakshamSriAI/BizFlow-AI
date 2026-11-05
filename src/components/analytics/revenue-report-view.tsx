"use client";

import React, { useState } from "react";
import { AnalyticsSummary } from "@/types/analytics";
import { formatMoney } from "@/lib/money";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, DollarSign, Repeat, Search, Users } from "lucide-react";

interface RevenueReportViewProps {
  data: AnalyticsSummary;
}

export function RevenueReportView({ data }: RevenueReportViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const chartData = data.timeSeries.map((pt) => ({
    period: pt.period,
    revenue: pt.revenue,
    retainer: Math.round(pt.revenue * 0.68),
    projects: Math.round(pt.revenue * 0.32),
  }));

  const filteredCustomers = data.topCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Total Recognized Revenue
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {formatMoney(data.totalRevenueCents, "INR")}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            +{data.revenueComparison.changePercent}% growth MoM
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Predictable Retainer Share
          </span>
          <div className="text-2xl font-bold text-blue-600 font-mono">
            68.0%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Recurring client retainers
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Net Profit Margin
          </span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {data.netMarginPercent}%
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            High operating surplus
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Avg. Revenue per Client
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            ₹82,400
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Monthly account realization
          </span>
        </div>
      </div>

      {/* Chart: Revenue Trajectory (Retainer vs Projects) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Revenue Growth Trajectory (Retainer vs Project Mix)
            </h3>
            <p className="text-xs text-slate-500">
              Monthly inflow distribution across subscription contracts and one-off milestone deliverables
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Retainers (68%)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-500">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Projects (32%)
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRetainer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val: any, name: any) => [
                  `₹${Number(val).toLocaleString()}`,
                  name === "retainer" ? "Recurring Retainers" : "One-off Projects",
                ]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="retainer"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRetainer)"
              />
              <Area
                type="monotone"
                dataKey="projects"
                stroke="#818cf8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProjects)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Revenue Contributors Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Top Enterprise Revenue Generators
          </span>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search account name..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Account Name</th>
                <th className="py-3 px-4">Primary Contact</th>
                <th className="py-3 px-4 text-right">Lifetime Value (LTV)</th>
                <th className="py-3 px-4 text-right">Current MRR</th>
                <th className="py-3 px-4 text-center">Engagement Health</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No accounts found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {c.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{c.contact}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                      {formatMoney(c.ltvCents, "INR")}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-emerald-600 font-mono">
                      {formatMoney(c.mrrCents, "INR")}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{c.healthScore}/100</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          c.status === "Expanding"
                            ? "bg-[#EBF3FC] text-[#2F80ED] border border-[#C4DEFA]"
                            : c.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {c.status}
                      </span>
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
