"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TeamRole } from "@/types/settings";
import { inviteTeamMember } from "@/lib/settings-store";
import { UserPlus, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberInvited?: () => void;
}

export function InviteMemberModal({
  isOpen,
  onClose,
  onMemberInvited,
}: InviteMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("sales_rep");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      inviteTeamMember(name, email, role);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        setRole("sales_rep");
        onMemberInvited?.();
        onClose();
      }, 1000);
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Team Member"
      description="Grant secure role-based access to your Nexora workspace."
      maxWidth="md"
    >
      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Invitation Dispatched
          </h4>
          <p className="text-xs text-slate-500">
            An onboarding link with {role.replace("_", " ")} permissions has been sent to {email}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Meera Sen"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Corporate Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@yourcompany.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role & Access Level
            </label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as TeamRole)}
              options={[
                { value: "admin", label: "System Administrator (Full Management)" },
                { value: "finance_manager", label: "Finance & Accounting Lead (Ledger & Invoices)" },
                { value: "sales_rep", label: "Sales & Account Executive (CRM & Quotations)" },
                { value: "viewer", label: "Read-Only Auditor (Observer Access)" },
              ]}
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Invited users inherit role policies defined in your Team Permissions Matrix.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Send Invitation
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
