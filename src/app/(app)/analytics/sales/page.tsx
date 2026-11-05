"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { DateRangeOption } from "@/types/analytics";
import { getAnalyticsDataByRange } from "@/data/mock-analytics-data";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { SalesReportView } from "@/components/analytics/sales-report-view";
import { ExportModal } from "@/components/analytics/export-modal";
import { TrendingUp, Download, ArrowLeft, Kanban } from "lucide-react";

export default function SalesAnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>("30d");
  const [isExportOpen, setIsExportOpen] = useState(false);

  const analyticsData = getAnalyticsDataByRange(selectedRange);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales & Deal Performance Analytics"
        description="Comprehensive evaluation of pipeline velocity, conversion funnels, and closed revenue."
        actions={
          <div className="flex items-center gap-2.5">
            <Link href="/sales/pipeline">
              <Button variant="outline" size="sm" className="text-xs">
                <Kanban className="w-3.5 h-3.5 mr-1 text-slate-500" />
                Pipeline Board
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

      <SalesReportView data={analyticsData} />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        analyticsData={analyticsData}
        activeReportTab="sales"
      />
    </div>
  );
}
