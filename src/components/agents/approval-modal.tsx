"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { WorkflowDefinition } from "@/types/agents";
import { approvePendingWorkflow } from "@/lib/agents-store";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  Mail,
  Building2,
} from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: WorkflowDefinition | null;
  onApproved?: () => void;
}

export function ApprovalModal({
  isOpen,
  onClose,
  workflow,
  onApproved,
}: ApprovalModalProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!workflow) return null;

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      approvePendingWorkflow(workflow.id);
      setIsApproving(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onApproved?.();
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Human-in-the-Loop Sign-Off"
      description="Review and authorize overdue invoice reminder dispatch."
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Action Approved & Dispatched
          </h4>
          <p className="text-xs text-slate-500">
            Payment reminder notification has been transmitted to Apex Retail Brands. Invoicing Agent status returned to Active.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Target Account Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Target Invoice Details
              </span>
              <span className="font-mono text-rose-600 font-bold">11 Days Overdue</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Invoice Number:</span>
              <span className="font-mono font-semibold text-slate-900">INV-2024-002</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Customer:</span>
              <span className="font-semibold text-slate-900">Apex Retail Brands</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Recipient Email:</span>
              <span className="font-medium text-blue-600">ananya@apexretail.com</span>
            </div>

            <div className="flex justify-between text-sm pt-1 border-t border-slate-200 font-bold">
              <span className="text-slate-800">Outstanding Balance:</span>
              <span className="text-slate-900">₹2,95,000</span>
            </div>
          </div>

          {/* Drafted Email Preview */}
          <div className="space-y-1 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Prepared Notification Draft:</span>
            </span>

            <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed space-y-2 text-[11px]">
              <p>
                <strong>Subject:</strong> Friendly Reminder: Outstanding Invoice #INV-2024-002
              </p>
              <p>Dear Ananya,</p>
              <p>
                We hope this note finds you well. This is a gentle reminder that invoice <strong>#INV-2024-002</strong> for <strong>₹2,95,000</strong> was due on October 25, 2024.
              </p>
              <p>
                Please find payment instructions attached or remit via UPI to <code>nexora@hdfcbank</code>. If payment is already in transit, please disregard this note.
              </p>
              <p>Best regards,<br />Nexora Finance Team</p>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 text-blue-800 p-3 rounded-xl text-xs space-y-1">
            <p className="font-semibold text-blue-900">Safety Policy Note</p>
            <p className="text-blue-700 leading-relaxed text-[11px]">
              Because Apex Retail Brands is an Enterprise account, your Invoicing Agent's configuration mandates explicit human sign-off before communicating payment demands.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isApproving}
            >
              Modify / Decline
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApprove}
              disabled={isApproving}
            >
              {isApproving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Dispatching...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Approve & Dispatch Notice
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
