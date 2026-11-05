"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationSettings, AppearanceSettings } from "@/types/settings";
import {
  getStoredNotifications,
  saveNotifications,
  getStoredAppearance,
  saveAppearance,
} from "@/lib/settings-store";
import {
  Bell,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  Save,
  Sliders,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function PreferencesPage() {
  const [notifications, setNotifications] = useState<NotificationSettings>(
    getStoredNotifications()
  );
  const [appearance, setAppearance] = useState<AppearanceSettings>(
    getStoredAppearance()
  );
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setNotifications(getStoredNotifications());
    setAppearance(getStoredAppearance());
  }, []);

  const handleToggleNotify = (field: keyof NotificationSettings) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveNotifications(notifications);
    saveAppearance(appearance);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Preferences & Notifications"
        description="Configure dispatch channels, alert thresholds, and workspace appearance."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/settings/profile">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Profile
              </Button>
            </Link>
          </div>
        }
      />

      {isSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">
            Preferences and notification triggers updated successfully.
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Notifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Automated Notification Triggers
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "emailInvoicesOverdue",
                title: "Overdue Receivables Notice",
                desc: "Send high-priority email alert when an invoice exceeds its due date by 3 days.",
                checked: notifications.emailInvoicesOverdue,
              },
              {
                id: "emailAgentApprovals",
                title: "Autonomous Agent Action Approvals",
                desc: "Notify administrators immediately when an AI agent pauses a workflow awaiting human sign-off.",
                checked: notifications.emailAgentApprovals,
              },
              {
                id: "emailWeeklyDigest",
                title: "Weekly Executive Performance Digest",
                desc: "Send consolidated Monday briefing of gross revenue, burn rate, and closed deals.",
                checked: notifications.emailWeeklyDigest,
              },
              {
                id: "inAppBudgetAlerts",
                title: "Department Budget Cap Alerts",
                desc: "Display banner warning when any expense category reaches 85% of allocated budget.",
                checked: notifications.inAppBudgetAlerts,
              },
              {
                id: "whatsappOverdueAlerts",
                title: "WhatsApp Payment Reminders",
                desc: "Transmit polite payment reminders via WhatsApp Business API for authorized contacts.",
                checked: notifications.whatsappOverdueAlerts,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70 gap-4"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleNotify(item.id as keyof NotificationSettings)}
                  className={`w-10 h-5 rounded-full transition-colors relative shrink-0 focus:outline-none ${
                    item.checked ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      item.checked ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Slack Webhook Input */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Slack Channel Webhook Relay
              </span>
              <button
                type="button"
                onClick={() => handleToggleNotify("slackWebhookActive")}
                className={`w-10 h-5 rounded-full transition-colors relative shrink-0 focus:outline-none ${
                  notifications.slackWebhookActive ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    notifications.slackWebhookActive ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            {notifications.slackWebhookActive && (
              <Input
                value={notifications.slackWebhookUrl || ""}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    slackWebhookUrl: e.target.value,
                  }))
                }
                placeholder="https://hooks.slack.com/services/..."
                className="font-mono text-xs"
              />
            )}
          </div>
        </div>

        {/* Section 2: Appearance & Theme */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sun className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Workspace Appearance & Interface Density
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Interface Color Scheme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "Light Mode (Default)", icon: Sun },
                  { id: "dark", label: "Dark Mode (Preview)", icon: Moon },
                  { id: "system", label: "System Sync", icon: Monitor },
                ].map((t) => (
                  <div
                    key={t.id}
                    onClick={() =>
                      setAppearance((prev) => ({ ...prev, theme: t.id as any }))
                    }
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all space-y-1 ${
                      appearance.theme === t.id
                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <t.icon className="w-5 h-5 mx-auto text-slate-700" />
                    <span className="text-xs font-bold text-slate-900 block">
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Brand Accent Color
              </label>
              <div className="flex items-center gap-3">
                {[
                  { id: "blue", color: "#2563eb", name: "Nexora Blue" },
                  { id: "indigo", color: "#4f46e5", name: "Indigo Tech" },
                  { id: "emerald", color: "#059669", name: "Emerald Growth" },
                  { id: "violet", color: "#7c3aed", name: "Royal Violet" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setAppearance((prev) => ({
                        ...prev,
                        accentColor: c.id as any,
                      }))
                    }
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      appearance.accentColor === c.id
                        ? "border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="sm">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
