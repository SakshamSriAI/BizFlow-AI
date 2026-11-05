"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MockIntegration } from "@/types/settings";
import { connectMockIntegration } from "@/lib/settings-store";
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2, Key } from "lucide-react";

interface ConnectIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: MockIntegration | null;
  onConnected?: () => void;
}

export function ConnectIntegrationModal({
  isOpen,
  onClose,
  integration,
  onConnected,
}: ConnectIntegrationModalProps) {
  const [accountName, setAccountName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!integration) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    setTimeout(() => {
      connectMockIntegration(
        integration.id,
        accountName || `${integration.name.toLowerCase().replace(/\s+/g, "-")}-primary`,
        { apiKey: apiKey || "mock_live_secret_key_9921401" }
      );
      setIsConnecting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAccountName("");
        setApiKey("");
        onConnected?.();
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Connect ${integration.name}`}
      description={integration.description}
      maxWidth="md"
    >
      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            {integration.name} Connected
          </h4>
          <p className="text-xs text-slate-500">
            Real-time synchronization has been enabled for this service.
          </p>
        </div>
      ) : (
        <form onSubmit={handleConnect} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Account / Organization Identifier
            </label>
            <Input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="e.g. accounts@yourcompany.com or Client ID"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              API Secret Key / Access Token
            </label>
            <div className="relative">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="••••••••••••••••••••••••"
                className="font-mono text-xs"
              />
              <Key className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Leave blank to use mock credential simulation
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800">Permissions Requested:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-500">
              <li>Read transactional records & customer metadata</li>
              <li>Post payment status updates to audit ledger</li>
              <li>Listen to realtime webhook settlement events</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isConnecting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Authorize & Connect <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
