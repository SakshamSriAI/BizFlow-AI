"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BusinessProfile } from "@/types/settings";
import {
  getStoredBusinessProfile,
  saveBusinessProfile,
} from "@/lib/settings-store";
import {
  Building2,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  Sliders,
} from "lucide-react";

export default function BusinessProfilePage() {
  const [profile, setProfile] = useState<BusinessProfile>(getStoredBusinessProfile());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setProfile(getStoredBusinessProfile());
  }, []);

  const handleChange = (field: keyof BusinessProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveBusinessProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Business Profile & Workspace Settings"
        description="Manage legal entity credentials, operational defaults, and billing coordinates."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/settings/team">
              <Button variant="outline" size="sm" className="text-xs">
                Team & Permissions
              </Button>
            </Link>
            <Link href="/settings/integrations">
              <Button variant="outline" size="sm" className="text-xs">
                Integrations
              </Button>
            </Link>
          </div>
        }
      />

      {isSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">
            Business profile settings saved and synchronized across all modules.
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Entity Particulars */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Legal Entity & Company Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Company Name
              </label>
              <Input
                value={profile.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Legal Entity Name
              </label>
              <Input
                value={profile.legalEntityName}
                onChange={(e) => handleChange("legalEntityName", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Industry Vertical
              </label>
              <Input
                value={profile.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Headcount
              </label>
              <Select
                value={profile.companySize}
                onChange={(e) => handleChange("companySize", e.target.value)}
                options={[
                  { value: "1-10 employees", label: "1-10 employees (Startup / Boutique)" },
                  { value: "11-50 employees", label: "11-50 employees (Growing Agency)" },
                  { value: "51-200 employees", label: "51-200 employees (Scale-up)" },
                  { value: "201+ employees", label: "201+ employees (Enterprise)" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tax Identification Number / GSTIN
              </label>
              <Input
                value={profile.taxId}
                onChange={(e) => handleChange("taxId", e.target.value)}
                className="font-mono text-xs"
                placeholder="e.g. 29AAACN8923K1ZT"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Corporate Website
              </label>
              <Input
                value={profile.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Billing Coordinates */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Mail className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Billing Contacts & Registered Address
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Billing Email
              </label>
              <Input
                type="email"
                value={profile.billingEmail}
                onChange={(e) => handleChange("billingEmail", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Phone Number
              </label>
              <Input
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Address Line 1
              </label>
              <Input
                value={profile.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City
              </label>
              <Input
                value={profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State / Province
              </label>
              <Input
                value={profile.state}
                onChange={(e) => handleChange("state", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Postal / PIN Code
              </label>
              <Input
                value={profile.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Country
              </label>
              <Input
                value={profile.country}
                onChange={(e) => handleChange("country", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Operational Localization */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-[#2F80ED]" />
            <h3 className="text-sm font-bold text-slate-900">
              Operational Defaults & Formatting
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Base Currency
              </label>
              <Select
                value={profile.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                options={[
                  { value: "INR", label: "INR (₹) - Indian Rupee" },
                  { value: "USD", label: "USD ($) - US Dollar" },
                  { value: "EUR", label: "EUR (€) - Euro" },
                  { value: "GBP", label: "GBP (£) - British Pound" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date Display Format
              </label>
              <Select
                value={profile.dateFormat}
                onChange={(e) => handleChange("dateFormat", e.target.value)}
                options={[
                  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (e.g. 25/10/2024)" },
                  { value: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO standard)" },
                  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (US standard)" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fiscal Year Start
              </label>
              <Select
                value={profile.fiscalYearStart}
                onChange={(e) => handleChange("fiscalYearStart", e.target.value)}
                options={[
                  { value: "April", label: "April (India & UK standard)" },
                  { value: "January", label: "January (Calendar year)" },
                  { value: "July", label: "July (Australian standard)" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Number Notation
              </label>
              <Select
                value={profile.numberFormat}
                onChange={(e) => handleChange("numberFormat", e.target.value)}
                options={[
                  { value: "indian", label: "Lakhs & Crores (₹1,00,000)" },
                  { value: "international", label: "Thousands & Millions (100,000)" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="sm">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Profile Settings
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Workspace Danger Zone</span>
          </div>
          <p className="text-xs text-rose-800">
            Modifying the workspace slug will break external invoice share links. Deleting the workspace permanently purges local telemetry.
          </p>
          <div className="pt-1 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => alert("Workspace slug lock enabled. Contact owner to change.")}
              className="text-xs border-rose-300 text-rose-700 hover:bg-rose-100"
            >
              Lock Workspace
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
