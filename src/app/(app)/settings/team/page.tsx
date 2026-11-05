"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { TeamMember, TeamRole } from "@/types/settings";
import {
  getStoredTeamMembers,
  getStoredRolePermissions,
  updateMemberRole,
  removeTeamMember,
} from "@/lib/settings-store";
import { InviteMemberModal } from "@/components/settings/invite-member-modal";
import { RolesMatrixTable } from "@/components/settings/roles-matrix-table";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Mail,
} from "lucide-react";

export default function TeamSettingsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [roles, setRoles] = useState(getStoredRolePermissions());
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const refreshData = () => {
    setTeam(getStoredTeamMembers());
    setRoles(getStoredRolePermissions());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("team-updated", refreshData);
    window.addEventListener("roles-updated", refreshData);
    return () => {
      window.removeEventListener("team-updated", refreshData);
      window.removeEventListener("roles-updated", refreshData);
    };
  }, []);

  const handleRoleChange = (id: string, newRole: TeamRole) => {
    updateMemberRole(id, newRole);
    refreshData();
  };

  const handleRemove = (member: TeamMember) => {
    if (member.role === "owner") {
      alert("Workspace owner cannot be removed.");
      return;
    }
    if (confirm(`Remove ${member.name} (${member.email}) from workspace?`)) {
      removeTeamMember(member.id);
      refreshData();
    }
  };

  const getRoleBadge = (role: TeamRole) => {
    switch (role) {
      case "owner":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
            Owner
          </span>
        );
      case "admin":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 uppercase">
            Admin
          </span>
        );
      case "finance_manager":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
            Finance Lead
          </span>
        );
      case "sales_rep":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF3FC] text-[#2F80ED] border border-[#C4DEFA] uppercase">
            Sales Exec
          </span>
        );
      case "viewer":
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 uppercase">
            Auditor
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Team Members & Access Permissions"
        description="Invite collaborators, assign organizational roles, and audit access boundaries."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/settings/profile">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Profile
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsInviteModalOpen(true)}
              className="text-xs"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Invite Member
            </Button>
          </div>
        }
      />

      {/* Team Members List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Workspace Members ({team.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Active and invited team collaborators
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {team.filter((m) => m.status === "active").length} Active Accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {member.email}
                  </td>

                  <td className="py-3.5 px-4">
                    {member.role === "owner" ? (
                      getRoleBadge(member.role)
                    ) : (
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value as TeamRole)}
                        className="text-xs py-1 px-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="admin">System Administrator</option>
                        <option value="finance_manager">Finance Lead</option>
                        <option value="sales_rep">Sales Representative</option>
                        <option value="viewer">Read-Only Auditor</option>
                      </select>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {member.status === "active" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> Invited
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {member.lastActive}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {member.role !== "owner" && (
                      <button
                        onClick={() => handleRemove(member)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RBAC Matrix */}
      <RolesMatrixTable roles={roles} />

      {/* Invite Member Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onMemberInvited={refreshData}
      />
    </div>
  );
}
