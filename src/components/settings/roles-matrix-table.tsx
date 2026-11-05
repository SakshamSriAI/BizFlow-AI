"use client";

import React from "react";
import { RolePermissionMatrix } from "@/types/settings";
import { Shield, ShieldCheck, Lock, Eye, Edit3, Check } from "lucide-react";

interface RolesMatrixTableProps {
  roles: RolePermissionMatrix[];
}

export function RolesMatrixTable({ roles }: RolesMatrixTableProps) {
  const getAccessBadge = (access: string) => {
    switch (access) {
      case "admin":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
            Admin
          </span>
        );
      case "edit":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
            Edit
          </span>
        );
      case "approve":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 uppercase">
            Approve
          </span>
        );
      case "view":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 uppercase">
            View
          </span>
        );
      case "none":
      default:
        return (
          <span className="text-[10px] text-slate-300 font-mono">—</span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Role-Based Access Control (RBAC) Permissions Matrix
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Granular functional access policies mapped to workspace roles
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Role Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-center">CRM & Leads</th>
              <th className="py-3 px-4 text-center">Finance & Ledger</th>
              <th className="py-3 px-4 text-center">Invoicing & Billing</th>
              <th className="py-3 px-4 text-center">AI Agents</th>
              <th className="py-3 px-4 text-center">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roles.map((r) => (
              <tr key={r.role} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                  {r.roleTitle}
                </td>
                <td className="py-3.5 px-4 text-slate-600 max-w-xs text-[11px] leading-relaxed">
                  {r.description}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getAccessBadge(r.crmAccess)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getAccessBadge(r.financeAccess)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getAccessBadge(r.invoicingAccess)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getAccessBadge(r.aiAgentsAccess)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getAccessBadge(r.settingsAccess)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
