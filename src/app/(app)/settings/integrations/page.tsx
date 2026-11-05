"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { MockIntegration, IntegrationCategory } from "@/types/settings";
import {
  getStoredIntegrations,
  toggleIntegrationSync,
  disconnectMockIntegration,
} from "@/lib/settings-store";
import { IntegrationCard } from "@/components/settings/integration-card";
import { ConnectIntegrationModal } from "@/components/settings/connect-integration-modal";
import {
  Puzzle,
  Mail,
  MessageCircle,
  CreditCard,
  Calendar,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<MockIntegration[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedForConnect, setSelectedForConnect] = useState<MockIntegration | null>(null);

  const refreshData = () => {
    setIntegrations(getStoredIntegrations());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("integrations-updated", refreshData);
    return () => {
      window.removeEventListener("integrations-updated", refreshData);
    };
  }, []);

  const handleDisconnect = (id: string) => {
    if (confirm("Disconnect this integration? Automated synchronization will pause.")) {
      disconnectMockIntegration(id);
      refreshData();
    }
  };

  const handleToggleSync = (id: string) => {
    toggleIntegrationSync(id);
    refreshData();
  };

  const filteredIntegrations = integrations.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Connected Integrations & Services"
        description="Sync corporate communication channels, payment processors, calendars, and accounting software."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/settings/profile">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Profile
              </Button>
            </Link>
            <Link href="/settings/team">
              <Button variant="outline" size="sm" className="text-xs">
                Team
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI banner */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Puzzle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {connectedCount} of {integrations.length} Services Connected
            </h4>
            <p className="text-slate-500">
              Webhooks & scheduled background sync processes active
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Zero Sync Errors
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-1 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All Integrations", icon: Puzzle },
          { id: "email", label: "Email Providers", icon: Mail },
          { id: "whatsapp", label: "WhatsApp Business", icon: MessageCircle },
          { id: "payment", label: "Payment Gateways", icon: CreditCard },
          { id: "calendar", label: "Calendar Scheduling", icon: Calendar },
          { id: "accounting", label: "Accounting & ERP", icon: BookOpen },
        ].map((tab) => {
          const isActive = selectedCategory === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
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

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map((item) => (
          <IntegrationCard
            key={item.id}
            integration={item}
            onOpenConnectModal={(int) => setSelectedForConnect(int)}
            onDisconnect={handleDisconnect}
            onToggleSync={handleToggleSync}
          />
        ))}
      </div>

      {/* Connect Modal */}
      <ConnectIntegrationModal
        isOpen={!!selectedForConnect}
        onClose={() => setSelectedForConnect(null)}
        integration={selectedForConnect}
        onConnected={refreshData}
      />
    </div>
  );
}
