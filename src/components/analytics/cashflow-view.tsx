"use client";

import React from "react";
import { AnalyticsSummary } from "@/types/analytics";
import { formatMoney } from "@/lib/money";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { DollarSign, TrendingUp, ShieldCheck, ArrowRight, ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface CashFlowViewProps {
  data: AnalyticsSummary;
}

export function CashFlowView({ data }: CashFlowViewProps) {
  const chartData = data.timeSeries.map((pt) => ({
    period: pt.period,
    inflow: pt.revenue,
    outflow: pt.expenses,
    net: pt.netProfit,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Cash Inflow (Period)
          </span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {formatMoney(data.totalRevenueCents, "INR")}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Client remittances & retainers
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Cash Outflow (Period)
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {formatMoney(data.totalExpensesCents, "INR")}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Operating disbursements
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Net Cash Surplus
          </span>
          <div className="text-2xl font-bold text-blue-600 font-mono">
            {formatMoney(data.netProfitCents, "INR")}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Positive net operating cash flow
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Operating Cash Runway
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {data.cashRunwayMonths} Months
          </div>
          <span className="text-xs text-blue-600 font-semibold mt-1 block">
            Comfortable capital cushion
          </span>
        </div>
      </div>

      {/* Chart: Inflow vs Outflow Multi-Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Monthly Cash Inflow vs Outflow
            </h3>
            <p className="text-xs text-slate-500">
              Comparative visualization of monthly liquidity movements and net operating cash generated
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Inflow
            </span>
            <span className="flex items-center gap-1.5 text-rose-500">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Outflow
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val: any, name: any) => [
                  `₹${Number(val).toLocaleString()}`,
                  name === "inflow" ? "Cash Inflow" : name === "outflow" ? "Cash Outflow" : "Net Surplus",
                ]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="inflow" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outflow" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow Timeline Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Cash Liquidity Audit Feed
          </span>
          <span className="text-xs text-slate-400">
            Reconciled with HDFC Corporate Account
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4 text-right">Cash Inflow</th>
                <th className="py-3 px-4 text-right">Cash Outflow</th>
                <th className="py-3 px-4 text-right">Net Change</th>
                <th className="py-3 px-4 text-right">Closing Reserve Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.timeSeries.map((pt) => (
                <tr key={pt.period} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{pt.period}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600 font-mono">
                    +₹{pt.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-rose-600 font-mono">
                    -₹{pt.expenses.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-blue-600 font-mono">
                    +₹{pt.netProfit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                    ₹{pt.cashBalance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
