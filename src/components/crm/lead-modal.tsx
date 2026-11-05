"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Lead, LeadStatus, LeadSource } from "@/types/crm";
import { User, Building2, Mail, Phone, Calendar, DollarSign } from "lucide-react";

export interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: any) => void;
  initialLead?: Lead | null;
  defaultStatus?: LeadStatus;
}

export function LeadModal({
  isOpen,
  onClose,
  onSubmit,
  initialLead,
  defaultStatus = "New",
}: LeadModalProps) {
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [leadSource, setLeadSource] = React.useState<LeadSource>("Website Form");
  const [status, setStatus] = React.useState<LeadStatus>(defaultStatus);
  const [potentialDealValue, setPotentialDealValue] = React.useState(150000);
  const [assignedEmployee, setAssignedEmployee] = React.useState("Saksham Srivastava");
  const [followUpDate, setFollowUpDate] = React.useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]
  );
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (initialLead) {
      setName(initialLead.name);
      setCompany(initialLead.company);
      setEmail(initialLead.email);
      setPhone(initialLead.phone);
      setLeadSource(initialLead.leadSource);
      setStatus(initialLead.status);
      setPotentialDealValue(initialLead.potentialDealValue);
      setAssignedEmployee(initialLead.assignedEmployee);
      setFollowUpDate(initialLead.followUpDate);
      setNotes(initialLead.notes || "");
    } else {
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setLeadSource("Website Form");
      setStatus(defaultStatus);
      setPotentialDealValue(150000);
      setAssignedEmployee("Saksham Srivastava");
      setFollowUpDate(
        new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]
      );
      setNotes("");
    }
    setErrors({});
  }, [initialLead, isOpen, defaultStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Contact name is required";
    if (!company.trim()) newErrors.company = "Company name is required";
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Valid business email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (potentialDealValue <= 0)
      newErrors.potentialDealValue = "Deal value must be greater than zero";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name,
      company,
      email,
      phone,
      leadSource,
      status,
      potentialDealValue: Number(potentialDealValue),
      assignedEmployee,
      followUpDate,
      notes,
    });
    onClose();
  };

  const leadSources: { value: LeadSource; label: string }[] = [
    { value: "Website Form", label: "Website Contact Form" },
    { value: "LinkedIn Referral", label: "LinkedIn & Referral" },
    { value: "Cold Outreach", label: "Cold Email / Outbound" },
    { value: "Inbound Call", label: "Inbound Call / Consultation" },
    { value: "Partner Network", label: "Partner Network" },
    { value: "Twitter / X", label: "Twitter / X Community" },
    { value: "Event / Conference", label: "Event / Conference" },
  ];

  const statuses: { value: LeadStatus; label: string }[] = [
    { value: "New", label: "New Lead" },
    { value: "Contacted", label: "Contacted" },
    { value: "Interested", label: "Interested" },
    { value: "Qualified", label: "Qualified Deal" },
    { value: "Converted", label: "Converted Client" },
    { value: "Lost", label: "Lost Opportunity" },
  ];

  const employees = [
    { value: "Saksham Srivastava", label: "Saksham Srivastava (Owner)" },
    { value: "Alex Morgan", label: "Alex Morgan (Sales Director)" },
    { value: "Rohan Verma", label: "Rohan Verma (Account Exec)" },
    { value: "Priya Sharma", label: "Priya Sharma (BD Manager)" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialLead ? "Edit Lead Profile" : "Add New Sales Lead"}
      description="Enter the contact, deal parameters, and follow-up timeline."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {initialLead ? "Save Changes" : "Create Lead"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Contact Full Name *"
            placeholder="e.g. Vikram Malhotra"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            leftIcon={<User className="w-4 h-4" />}
          />
          <Input
            label="Company / Brand Name *"
            placeholder="e.g. Pinnacle Media Group"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            error={errors.company}
            leftIcon={<Building2 className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Work Email *"
            type="email"
            placeholder="vikram@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Phone Number *"
            placeholder="+91 98200 00000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Pipeline Stage"
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            options={statuses}
          />

          <Select
            label="Lead Acquisition Source"
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value as LeadSource)}
            options={leadSources}
          />

          <Input
            label="Potential Deal Value (₹)"
            type="number"
            value={potentialDealValue}
            onChange={(e) => setPotentialDealValue(Number(e.target.value))}
            error={errors.potentialDealValue}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Assigned Account Owner"
            value={assignedEmployee}
            onChange={(e) => setAssignedEmployee(e.target.value)}
            options={employees}
          />

          <Input
            label="Follow-up Due Date"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            leftIcon={<Calendar className="w-4 h-4" />}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1.5">
            Initial Discovery Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Key client pain points, requirements, or meeting summary..."
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
          />
        </div>
      </form>
    </Modal>
  );
}
