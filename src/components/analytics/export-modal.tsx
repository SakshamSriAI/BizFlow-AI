"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AnalyticsSummary } from "@/types/analytics";
import { formatMoney } from "@/lib/money";
import {
  Download,
  FileSpreadsheet,
  Printer,
  FileCode,
  CheckCircle2,
  Check,
} from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyticsData: AnalyticsSummary;
  activeReportTab: string;
}

export function ExportModal({
  isOpen,
  onClose,
  analyticsData,
  activeReportTab,
}: ExportModalProps) {
  const [format, setFormat] = useState<"csv" | "print" | "json">("csv");
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    if (format === "print") {
      setIsExporting(false);
      onClose();
      window.print();
      return;
    }

    if (format === "json") {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(analyticsData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `nexora-analytics-report-${analyticsData.period}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setIsExporting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
      return;
    }

    // CSV format
    let csvRows: string[] = [];

    // Header & Meta
    csvRows.push("Nexora Business Management - Executive Analytics Report");
    csvRows.push(`Generated: ${new Date().toISOString()}`);
    csvRows.push(`Period: ${analyticsData.period}`);
    csvRows.push("");

    // Section 1: Executive KPI
    csvRows.push("--- KEY PERFORMANCE METRICS ---");
    csvRows.push("Metric,Current Value,Previous Value,Change %");
    csvRows.push(
      `Total Revenue,${analyticsData.totalRevenueCents / 100},${
        analyticsData.revenueComparison.previousValue
      },+${analyticsData.revenueComparison.changePercent}%`
    );
    csvRows.push(
      `Total Expenses,${analyticsData.totalExpensesCents / 100},${
        analyticsData.expensesComparison.previousValue
      },${analyticsData.expensesComparison.changePercent}%`
    );
    csvRows.push(`Net Margin %,${analyticsData.netMarginPercent}%,N/A,N/A`);
    csvRows.push(`Cash Runway (Months),${analyticsData.cashRunwayMonths},N/A,N/A`);
    csvRows.push("");

    // Section 2: Time Series
    csvRows.push("--- TIME SERIES TRAJECTORY ---");
    csvRows.push("Period,Revenue,Expenses,Net Profit,Cash Balance");
    analyticsData.timeSeries.forEach((pt) => {
      csvRows.push(
        `"${pt.period}",${pt.revenue},${pt.expenses},${pt.netProfit},${pt.cashBalance}`
      );
    });
    csvRows.push("");

    // Section 3: Categories
    csvRows.push("--- EXPENSE CATEGORIES ---");
    csvRows.push("Category,Amount,Percentage");
    analyticsData.categoryBreakdown.forEach((cat) => {
      csvRows.push(
        `"${cat.category}",${cat.amountCents / 100},${cat.percentage}%`
      );
    });
    csvRows.push("");

    // Section 4: Top Customers
    csvRows.push("--- TOP ENTERPRISE CUSTOMERS ---");
    csvRows.push("Account Name,Primary Contact,LTV,MRR,Status");
    analyticsData.topCustomers.forEach((c) => {
      csvRows.push(
        `"${c.name}","${c.contact}",${c.ltvCents / 100},${
          c.mrrCents / 100
        },"${c.status}"`
      );
    });

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
    const anchor = document.createElement("a");
    anchor.setAttribute("href", csvContent);
    anchor.setAttribute(
      "download",
      `nexora-business-report-${analyticsData.period}.csv`
    );
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setIsExporting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Analytics & Business Reports"
      description={`Export period: ${analyticsData.period.toUpperCase()} • All financial & CRM metrics`}
      maxWidth="md"
    >
      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Export Generated Successfully
          </h4>
          <p className="text-xs text-slate-500">
            Report has been compiled and downloaded to your local drive.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Choose Export Format:
          </span>

          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => setFormat("csv")}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all space-y-1.5 ${
                format === "csv"
                  ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <FileSpreadsheet className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="text-xs font-bold text-slate-900 block">CSV File</span>
              <p className="text-[10px] text-slate-500">Spreadsheet table</p>
            </div>

            <div
              onClick={() => setFormat("print")}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all space-y-1.5 ${
                format === "print"
                  ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <Printer className="w-6 h-6 text-blue-600 mx-auto" />
              <span className="text-xs font-bold text-slate-900 block">Print / PDF</span>
              <p className="text-[10px] text-slate-500">Executive layout</p>
            </div>

            <div
              onClick={() => setFormat("json")}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all space-y-1.5 ${
                format === "json"
                  ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <FileCode className="w-6 h-6 text-violet-600 mx-auto" />
              <span className="text-xs font-bold text-slate-900 block">JSON Raw</span>
              <p className="text-[10px] text-slate-500">API telemetry</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <span className="font-semibold text-slate-800 block">
              Included In This Export:
            </span>
            <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
              <li className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Revenue & Growth Rates
              </li>
              <li className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Expense Distributions
              </li>
              <li className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Sales Funnel Conversion
              </li>
              <li className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Customer Account LTVs
              </li>
              <li className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Monthly Cash Runways
              </li>
              <li className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Budget Utilization
              </li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleExport} disabled={isExporting}>
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download Report
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
