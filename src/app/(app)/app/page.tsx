"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  ArrowUpRight,
  Download,
  Filter,
  CheckCircle2,
  Bot,
  FileText,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KPISummaryCards } from "@/components/dashboard/kpi-summary-cards";
import { RevenueExpenseChart } from "@/components/dashboard/revenue-expense-chart";
import { RevenueTrendChart } from "@/components/dashboard/revenue-trend-chart";
import { LeadConversionChart } from "@/components/dashboard/lead-conversion-chart";
import { RecentActivityTabs } from "@/components/dashboard/recent-activity-tabs";
import { AIInsightsCard } from "@/components/dashboard/ai-insights-card";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import {
  DashboardPeriod,
  mockDashboardData,
  mockRecentInvoices,
  mockRecentTransactions,
  mockCustomerActivities,
  mockUpcomingFollowUps,
} from "@/data/mock-dashboard-data";
import { getActiveWorkspace } from "@/lib/auth-store";
import { Workspace } from "@/types";

export default function MainDashboardPage() {
  const [period, setPeriod] = React.useState<DashboardPeriod>("30d");
  const [activeWs, setActiveWs] = React.useState<Workspace | null>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    setActiveWs(getActiveWorkspace());
  }, []);

  const periodData = mockDashboardData[period] || mockDashboardData["30d"];

  const getCurrencySymbol = (code?: string) => {
    switch (code) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "CAD":
      case "AUD":
      case "SGD":
        return "$";
      case "AED":
        return "د.إ";
      default:
        return "₹";
    }
  };

  const currencySymbol = getCurrencySymbol(activeWs?.currency);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header with Breadcrumbs, Live Period Selector, and Quick Actions */}
      <PageHeader
        title={`${activeWs?.name || "Apex Growth Agency"} Dashboard`}
        description={`Real-time executive performance summary, sales conversion velocity, and financial ledger for ${activeWs?.name || "your organization"}.`}
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Overview", href: "/app" },
          { label: "Executive Dashboard" },
        ]}
        badge={
          <Badge variant="success" dot size="sm">
            Live Workspace
          </Badge>
        }
        actions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <PeriodSelector
              selectedPeriod={period}
              onSelectPeriod={setPeriod}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              leftIcon={
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
              }
              title="Refresh metrics"
            >
              Refresh
            </Button>
          </div>
        }
      />

      {/* TOP SUMMARY CARDS */}
      <section aria-label="Key Performance Indicators">
        <KPISummaryCards
          revenue={periodData.kpis.totalRevenue}
          expenses={periodData.kpis.totalExpenses}
          outstanding={periodData.kpis.outstandingPayments}
          leads={periodData.kpis.activeLeads}
        />
      </section>

      {/* AI INSIGHTS PANEL */}
      <section aria-label="AI Business Insights">
        <AIInsightsCard />
      </section>

      {/* ANALYTICS SECTION: REVENUE VS EXPENSES & TRENDS */}
      <section aria-label="Financial and Sales Analytics" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue vs Expenses Chart (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <RevenueExpenseChart
              data={periodData.revenueVsExpenses}
              currencySymbol={currencySymbol}
            />
          </div>

          {/* Lead Conversion Funnel (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <LeadConversionChart
              stages={periodData.conversionStages}
              currencySymbol={currencySymbol}
            />
          </div>
        </div>

        {/* Full-width Revenue Growth Trajectory */}
        <div>
          <RevenueTrendChart
            data={periodData.revenueGrowth}
            currencySymbol={currencySymbol}
          />
        </div>
      </section>

      {/* ACTIVITY FEEDS: INVOICES, TRANSACTIONS, CLIENTS, FOLLOW-UPS */}
      <section aria-label="Activity Feeds and Operational Follow-ups">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Operational Ledger & Customer Activity
              </h3>
              <p className="text-xs text-slate-500">
                Track recent billing events, cash ledger movements, and pending follow-ups.
              </p>
            </div>
            <Link href="/workspaces">
              <Button variant="ghost" size="sm" className="text-xs">
                Switch Organization
              </Button>
            </Link>
          </div>

          <RecentActivityTabs
            invoices={mockRecentInvoices}
            transactions={mockRecentTransactions}
            activities={mockCustomerActivities}
            followUps={mockUpcomingFollowUps}
            currencySymbol={currencySymbol}
          />
        </div>
      </section>
    </div>
  );
}
