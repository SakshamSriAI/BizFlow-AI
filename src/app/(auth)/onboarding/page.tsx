"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Briefcase,
  Globe2,
  DollarSign,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Bot,
  Loader2,
  Shield,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { saveNewWorkspace, setActiveWorkspace } from "@/lib/auth-store";
import { Workspace } from "@/types";

export default function BusinessOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [deploymentPhase, setDeploymentPhase] = React.useState(0);

  // Form State
  const [businessName, setBusinessName] = React.useState("Apex Growth Agency");
  const [businessType, setBusinessType] = React.useState("LLC / Private Limited");
  const [industry, setIndustry] = React.useState("Marketing & Creative Agency");
  const [businessSize, setBusinessSize] = React.useState("2-10 Employees");
  const [country, setCountry] = React.useState("India");
  const [currency, setCurrency] = React.useState("INR");
  const [enableFollowUps, setEnableFollowUps] = React.useState(true);
  const [enableOverdueAlerts, setEnableOverdueAlerts] = React.useState(true);
  const [enableWeeklyDigest, setEnableWeeklyDigest] = React.useState(true);

  // Errors
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!businessName.trim()) {
        newErrors.businessName = "Business name is required";
      } else if (businessName.trim().length < 2) {
        newErrors.businessName = "Name must be at least 2 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleCompleteOnboarding = async () => {
    setIsDeploying(true);

    const phases = [
      "Configuring isolated workspace schema...",
      "Initializing multi-currency financial ledger...",
      "Calibrating autonomous AI Copilot...",
      "Finalizing workspace parameters...",
    ];

    for (let i = 0; i < phases.length; i++) {
      setDeploymentPhase(i);
      await new Promise((r) => setTimeout(r, 650));
    }

    // Create and save workspace
    const newWorkspace: Workspace = {
      id: "ws-" + Date.now(),
      name: businessName,
      slug: businessName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      role: "Owner",
      plan: "Growth",
      currency: currency,
      industry: industry,
    };

    saveNewWorkspace(newWorkspace);
    setActiveWorkspace(newWorkspace);

    // Navigate to workspaces or app
    setTimeout(() => {
      router.push("/workspaces");
    }, 400);
  };

  const stepsTotal = 4;

  const deploymentMessages = [
    "Configuring isolated workspace schema...",
    "Initializing multi-currency financial ledger...",
    "Calibrating autonomous AI Copilot...",
    "Workspace ready! Launching Nexora...",
  ];

  return (
    <Card className="border-slate-200/90 shadow-xl bg-white animate-fade-in max-w-xl mx-auto">
      {/* Step Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-t-xl overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${(step / stepsTotal) * 100}%` }}
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="indigo" size="sm">
            Step {step} of {stepsTotal}
          </Badge>
          <span className="text-[11px] text-slate-400 font-medium">
            Business Onboarding
          </span>
        </div>

        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          {step === 1 && "What is your business called?"}
          {step === 2 && "Industry & operational scale"}
          {step === 3 && "Country & primary currency"}
          {step === 4 && "AI Assistant & Autonomous Workflows"}
        </CardTitle>

        <CardDescription className="text-xs text-slate-500">
          {step === 1 && "Configure your legal or trading entity and business structure."}
          {step === 2 && "We customize metrics, pipeline stages, and invoice templates for your sector."}
          {step === 3 && "Set your default reporting currency and tax localization preferences."}
          {step === 4 && "Enable autonomous agents to monitor follow-ups and overdue payments."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {isDeploying ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Loader2 className="w-7 h-7 animate-spin" />
              </div>
              <Sparkles className="w-4 h-4 text-indigo-600 absolute -top-1 -right-1" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Deploying {businessName} Workspace
              </h4>
              <p className="text-xs text-indigo-600 font-medium animate-pulse font-mono">
                {deploymentMessages[deploymentPhase]}
              </p>
            </div>

            <div className="max-w-xs text-[11px] text-slate-400">
              Generating your clean, isolated database and configuring your AI engine runtime.
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1: BUSINESS NAME & TYPE */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Input
                    label="Registered Business / Brand Name"
                    placeholder="e.g. Acme Agency, Nova Labs"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    error={errors.businessName}
                    leftIcon={<Building2 className="w-4 h-4" />}
                  />
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>Workspace Slug:</span>
                    <span className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {businessName.toLowerCase().replace(/[^a-z0-9]/g, "-") || "your-business"}.nexora.io
                    </span>
                  </div>
                </div>

                <div>
                  <Select
                    label="Business Structure / Entity Type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    options={[
                      { value: "LLC / Private Limited", label: "LLC / Private Limited (Most Common)" },
                      { value: "Sole Proprietorship", label: "Sole Proprietorship / Independent" },
                      { value: "Corporation", label: "Corporation (C-Corp / S-Corp)" },
                      { value: "Partnership Firm", label: "Partnership Firm / LLP" },
                      { value: "Freelancer / Solo Consultant", label: "Solo Practitioner / Freelancer" },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: INDUSTRY & BUSINESS SIZE */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Select
                    label="Primary Industry / Sector"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    options={[
                      { value: "Marketing & Creative Agency", label: "Marketing, Advertising & Creative Agency" },
                      { value: "Software & SaaS", label: "Software, Technology & SaaS" },
                      { value: "Consulting & Professional Advisory", label: "Consulting & Professional Advisory" },
                      { value: "E-Commerce & Digital Products", label: "E-Commerce & Digital Products" },
                      { value: "Design & Media Production", label: "Design, Branding & Media Production" },
                      { value: "Health, Wellness & Clinics", label: "Health, Wellness & Clinics" },
                      { value: "Real Estate & Architecture", label: "Real Estate, Property & Architecture" },
                      { value: "Other Business Services", label: "Other Commercial Services" },
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-2">
                    Current Team Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "Solo (1 person)", desc: "Just me" },
                      { id: "2-10 Employees", desc: "Small boutique team" },
                      { id: "11-50 Employees", desc: "Growing company" },
                      { id: "51-200+ Enterprise", desc: "Expanding scale" },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setBusinessSize(sz.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          businessSize === sz.id
                            ? "border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 text-indigo-900"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="text-xs font-semibold">{sz.id}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{sz.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: COUNTRY & CURRENCY */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Select
                    label="Country of Registration"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (e.target.value === "India") setCurrency("INR");
                      if (e.target.value === "United States") setCurrency("USD");
                      if (e.target.value === "United Kingdom") setCurrency("GBP");
                      if (e.target.value === "European Union") setCurrency("EUR");
                    }}
                    options={[
                      { value: "India", label: "India (₹ INR)" },
                      { value: "United States", label: "United States ($ USD)" },
                      { value: "United Kingdom", label: "United Kingdom (£ GBP)" },
                      { value: "European Union", label: "European Union (€ EUR)" },
                      { value: "Canada", label: "Canada ($ CAD)" },
                      { value: "Australia", label: "Australia ($ AUD)" },
                      { value: "Singapore", label: "Singapore ($ SGD)" },
                      { value: "United Arab Emirates", label: "UAE (AED د.إ)" },
                    ]}
                  />

                  <Select
                    label="Reporting Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    options={[
                      { value: "INR", label: "INR (₹) Indian Rupee" },
                      { value: "USD", label: "USD ($) US Dollar" },
                      { value: "EUR", label: "EUR (€) Euro" },
                      { value: "GBP", label: "GBP (£) British Pound" },
                      { value: "CAD", label: "CAD ($) Canadian Dollar" },
                      { value: "AUD", label: "AUD ($) Australian Dollar" },
                      { value: "SGD", label: "SGD ($) Singapore Dollar" },
                      { value: "AED", label: "AED (د.إ) UAE Dirham" },
                    ]}
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Multi-Currency Ledger</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    You can invoice international clients in foreign currencies. Nexora converts entries to your base reporting currency ({currency}) automatically without floating-point errors.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: AI COPILOT & AUTONOMOUS WORKFLOWS */}
            {step === 4 && (
              <div className="space-y-3.5 animate-fade-in">
                <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nexora Autonomous Agents Initialization</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Enable the default background agents you want running in your new workspace.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {/* Agent 1 */}
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/60 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableFollowUps}
                      onChange={(e) => setEnableFollowUps(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Autonomous Lead Follow-up Agent
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Detects leads with no activity after 48h and drafts personalized follow-up reminders.
                      </div>
                    </div>
                  </label>

                  {/* Agent 2 */}
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/60 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableOverdueAlerts}
                      onChange={(e) => setEnableOverdueAlerts(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Overdue Receivables & Cash Protection Agent
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Monitors due dates and generates friendly WhatsApp & email nudges for client invoices.
                      </div>
                    </div>
                  </label>

                  {/* Agent 3 */}
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/60 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableWeeklyDigest}
                      onChange={(e) => setEnableWeeklyDigest(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Executive Weekly Performance Digest
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Delivers a concise Monday morning report comparing revenue, expenses, and won deals.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {!isDeploying && (
        <CardFooter className="flex items-center justify-between border-t border-slate-100 py-4 bg-slate-50/50 rounded-b-xl">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < stepsTotal ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleCompleteOnboarding}
              className="bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Launch My Workspace
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
