"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Customer } from "@/types/crm";
import { Building2, Mail, Phone, DollarSign } from "lucide-react";

export interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerData: any) => void;
  initialCustomer?: Customer | null;
}

export function CustomerModal({
  isOpen,
  onClose,
  onSubmit,
  initialCustomer,
}: CustomerModalProps) {
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [industry, setIndustry] = React.useState("Marketing & Creative Agency");
  const [status, setStatus] = React.useState<"Active" | "Paused" | "Completed">("Active");
  const [lifetimeValue, setLifetimeValue] = React.useState(250000);
  const [monthlyRetainer, setMonthlyRetainer] = React.useState(50000);
  const [primaryContactRole, setPrimaryContactRole] = React.useState("Managing Director");
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (initialCustomer) {
      setName(initialCustomer.name);
      setCompany(initialCustomer.company);
      setEmail(initialCustomer.email);
      setPhone(initialCustomer.phone);
      setIndustry(initialCustomer.industry);
      setStatus(initialCustomer.status);
      setLifetimeValue(initialCustomer.lifetimeValue);
      setMonthlyRetainer(initialCustomer.monthlyRetainer);
      setPrimaryContactRole(initialCustomer.primaryContactRole);
      setNotes(initialCustomer.notes || "");
    } else {
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setIndustry("Marketing & Creative Agency");
      setStatus("Active");
      setLifetimeValue(250000);
      setMonthlyRetainer(50000);
      setPrimaryContactRole("Managing Director");
      setNotes("");
    }
    setErrors({});
  }, [initialCustomer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!company.trim()) newErrors.company = "Client company name is required";
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Valid billing email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: company,
      company,
      email,
      phone,
      industry,
      status,
      lifetimeValue: Number(lifetimeValue),
      monthlyRetainer: Number(monthlyRetainer),
      activeProjectsCount: 1,
      invoicesCount: 1,
      primaryContactRole,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialCustomer ? "Edit Customer Record" : "Add New Customer"}
      description="Register an active business client in your account directory."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {initialCustomer ? "Save Changes" : "Save Customer"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Client Company Name *"
            placeholder="e.g. Acme Media Corp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            error={errors.company}
            leftIcon={<Building2 className="w-4 h-4" />}
          />
          <Input
            label="Primary Contact Person & Title"
            placeholder="e.g. Priya Sen (VP Marketing)"
            value={primaryContactRole}
            onChange={(e) => setPrimaryContactRole(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Billing Email *"
            type="email"
            placeholder="billing@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Phone Number *"
            placeholder="+91 98200 11223"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Account Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            options={[
              { value: "Active", label: "Active Retainer" },
              { value: "Paused", label: "Paused" },
              { value: "Completed", label: "Completed / Inactive" },
            ]}
          />

          <Input
            label="Monthly Retainer (₹)"
            type="number"
            value={monthlyRetainer}
            onChange={(e) => setMonthlyRetainer(Number(e.target.value))}
          />

          <Input
            label="Total Lifetime Value (₹)"
            type="number"
            value={lifetimeValue}
            onChange={(e) => setLifetimeValue(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1.5">
            Client Account Notes & Terms
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Billing cycle, special terms, contract renewals..."
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
          />
        </div>
      </form>
    </Modal>
  );
}
