"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { DateRangeOption, ReportType } from "@/types/analytics";
import { getAnalyticsDataByRange } from "@/data/mock-analytics-data";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { ExportModal } from "@/components/analytics/export-modal";
import { SalesReportView } from "@/components/analytics/sales-report-view";
import { RevenueReportView } from "@/components/analytics/revenue-report-view";
import { ExpenseReportView } from "@/components/analytics/expense-report-view";
import { CashFlowView } from "@/components/analytics/cashflow-view";
import {
  BarChart3,
  Download,
  TrendingUp,
  DollarSign,
  CreditCard,
  Users,
  Repeat,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function BusinessReportsPage() {
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>("30d");
  const [activeReportTab, setActiveReportTab] = useState<ReportType>("revenue");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const analyticsData = getAnalyticsDataByRange(selectedRange);

  return (
    <div className="space-y-6">
      {/* Header with Export & Date Range Controls */}
      <PageHeader
        title="Business Reports & Analytics"
        description="Cross-functional telemetry tracking sales pipeline, revenue realization, department expenditures, and cash runway."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <DateRangePicker
              selectedRange={selectedRange}
              onChangeRange={(r) => setSelectedRange(r)}
            />

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsExportModalOpen(true)}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Report Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {[
            { id: "revenue", label: "Revenue Trajectory", icon: TrendingUp },
            { id: "sales", label: "Sales & Conversion Funnel", icon: BarChart3 },
            { id: "expenses", label: "Expense Allocation", icon: CreditCard },
            { id: "cashflow", label: "Cash Flow Overview", icon: DollarSign },
          ].map((tab) => {
            const isActive = activeReportTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveReportTab(tab.id as ReportType)}
                className={`px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 -mb-px ${
                  isActive
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 hidden sm:block">
          Reporting period: <strong className="text-slate-700 capitalize">{selectedRange}</strong>
        </span>
      </div>

      {/* Tab Panels */}
      <div className="animate-fade-in">
        {activeReportTab === "revenue" && (
          <RevenueReportView data={analyticsData} />
        )}

        {activeReportTab === "sales" && (
          <SalesReportView data={analyticsData} />
        )}

        {activeReportTab === "expenses" && (
          <ExpenseReportView data={analyticsData} />
        )}

        {activeReportTab === "cashflow" && (
          <CashFlowView data={analyticsData} />
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        analyticsData={analyticsData}
        activeReportTab={activeReportTab}
      />
    </div>
  );
}
