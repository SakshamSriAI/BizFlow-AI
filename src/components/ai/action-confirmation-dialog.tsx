"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { SuggestedAction } from "@/types/ai";
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2, Send } from "lucide-react";

interface ActionConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  action: SuggestedAction | null;
  onActionExecuted?: (action: SuggestedAction) => void;
}

export function ActionConfirmationDialog({
  isOpen,
  onClose,
  action,
  onActionExecuted,
}: ActionConfirmationDialogProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!action) return null;

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onActionExecuted?.(action);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Autonomous Workflow Approval"
      description="Review and authorize AI assistant action."
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Action Successfully Executed
          </h4>
          <p className="text-xs text-slate-500">
            {action.label} has been processed and logged in the operational audit log.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Proposed Action Details</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">{action.label}</p>
            {action.payload && (
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-600">
                {Object.entries(action.payload).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="capitalize text-slate-400">{k}:</span>
                    <span className="font-medium text-slate-800">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-blue-50/70 border border-blue-200 text-blue-800 p-3 rounded-xl text-xs space-y-1">
            <p className="font-semibold text-blue-900">Autonomous Safety Guardrail</p>
            <p className="text-blue-700 leading-relaxed text-[11px]">
              Nexora AI executes actions within designated permissions. You retain full audit control and manual override capabilities.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isExecuting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExecute}
              disabled={isExecuting}
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Confirm & Execute
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
