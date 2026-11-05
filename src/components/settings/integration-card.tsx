"use client";

import React from "react";
import { MockIntegration } from "@/types/settings";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Send,
  MessageCircle,
  CreditCard,
  Calendar,
  BookOpen,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Power,
  Sliders,
} from "lucide-react";

interface IntegrationCardProps {
  integration: MockIntegration;
  onOpenConnectModal: (int: MockIntegration) => void;
  onDisconnect: (id: string) => void;
  onToggleSync: (id: string) => void;
}

export function IntegrationCard({
  integration,
  onOpenConnectModal,
  onDisconnect,
  onToggleSync,
}: IntegrationCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Mail":
        return <Mail className="w-5 h-5 text-blue-600" />;
      case "Send":
        return <Send className="w-5 h-5 text-indigo-600" />;
      case "MessageCircle":
        return <MessageCircle className="w-5 h-5 text-emerald-600" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 text-violet-600" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-amber-600" />;
      case "BookOpen":
      case "FileSpreadsheet":
      default:
        return <BookOpen className="w-5 h-5 text-blue-500" />;
    }
  };

  const isConnected = integration.status === "connected";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4">
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              {getIcon(integration.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  {integration.name}
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                {integration.category}
              </span>
            </div>
          </div>

          <div>
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                Not Connected
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
          {integration.description}
        </p>

        {/* Connection Details if active */}
        {isConnected && integration.connectedAccount && (
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-[11px] space-y-1">
            <div className="flex justify-between items-center text-slate-600">
              <span className="text-slate-400">Account:</span>
              <span className="font-semibold text-slate-800 font-mono truncate max-w-[170px]">
                {integration.connectedAccount}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-slate-400">Last Synced:</span>
              <span>{integration.lastSync || "Just now"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {isConnected ? (
          <>
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={integration.autoSync}
                onChange={() => onToggleSync(integration.id)}
                className="rounded text-blue-600"
              />
              <span className="text-[11px] font-medium">Auto-Sync</span>
            </label>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDisconnect(integration.id)}
                className="h-7 px-2.5 text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
              >
                Disconnect
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenConnectModal(integration)}
              className="h-7 px-3 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 w-full sm:w-auto"
            >
              Connect Integration
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
