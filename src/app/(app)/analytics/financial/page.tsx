"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { DateRangeOption } from "@/types/analytics";
import { getAnalyticsDataByRange } from "@/data/mock-analytics-data";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { RevenueReportView } from "@/components/analytics/revenue-report-view";
import { ExpenseReportView } from "@/components/analytics/expense-report-view";
import { CashFlowView } from "@/components/analytics/cashflow-view";
import { ExportModal } from "@/components/analytics/export-modal";
import { DollarSign, TrendingUp, CreditCard, Download, ArrowLeft } from "lucide-react";

export default function FinancialAnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>("30d");
  const [activeSubTab, setActiveSubTab] = useState<"cashflow" | "revenue" | "expenses">("cashflow");
  const [isExportOpen, setIsExportOpen] = useState(false);

  const analyticsData = getAnalyticsDataByRange(selectedRange);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial & Cash Flow Analytics"
        description="Monitor gross inflows, disbursements, burn rates, and operating liquidity cushions."
        actions={
          <div className="flex items-center gap-2.5">
            <Link href="/finance/overview">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Finance Overview
              </Button>
            </Link>

            <DateRangePicker
              selectedRange={selectedRange}
              onChangeRange={(r) => setSelectedRange(r)}
            />

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsExportOpen(true)}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Export
            </Button>
          </div>
        }
      />

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: "cashflow", label: "Cash Flow & Runway", icon: DollarSign },
          { id: "revenue", label: "Revenue & Margins", icon: TrendingUp },
          { id: "expenses", label: "Expense Allocation", icon: CreditCard },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-px ${
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

      <div className="animate-fade-in">
        {activeSubTab === "cashflow" && <CashFlowView data={analyticsData} />}
        {activeSubTab === "revenue" && <RevenueReportView data={analyticsData} />}
        {activeSubTab === "expenses" && <ExpenseReportView data={analyticsData} />}
      </div>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        analyticsData={analyticsData}
        activeReportTab={activeSubTab}
      />
    </div>
  );
}
