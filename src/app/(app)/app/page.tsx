"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code2,
  Component,
  ArrowRight,
  Shield,
  Palette,
  Search,
  Filter,
} from "lucide-react";

export default function FoundationOverviewPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [sampleInputVal, setSampleInputVal] = React.useState("Apex Marketing Corp");
  const [currencyVal, setCurrencyVal] = React.useState("USD");
  const [searchTableQuery, setSearchTableQuery] = React.useState("");

  const sampleTableData = [
    {
      id: "MOD-001",
      name: "Dashboard & Metrics Engine",
      phase: "Phase 2",
      status: "Ready for Build",
      badgeVariant: "indigo" as const,
      leadTech: "Next.js + Recharts",
    },
    {
      id: "MOD-002",
      name: "Authentication & Onboarding",
      phase: "Phase 1",
      status: "Ready for Build",
      badgeVariant: "indigo" as const,
      leadTech: "Zod + React Hook Form",
    },
    {
      id: "MOD-003",
      name: "CRM & Lead Pipeline",
      phase: "Phase 3",
      status: "Queued",
      badgeVariant: "warning" as const,
      leadTech: "Kanban + Table Views",
    },
    {
      id: "MOD-004",
      name: "Financial Engine & Invoices",
      phase: "Phase 4 & 5",
      status: "Queued",
      badgeVariant: "secondary" as const,
      leadTech: "Ledger + Formatter",
    },
    {
      id: "MOD-005",
      name: "AI Autonomous Agents",
      phase: "Phase 6 & 7",
      status: "Queued",
      badgeVariant: "secondary" as const,
      leadTech: "Copilot Workflows",
    },
  ];

  const filteredData = sampleTableData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      item.phase.toLowerCase().includes(searchTableQuery.toLowerCase())
  );

  const handleTestLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Reusable Page Header Component Showcase */}
      <PageHeader
        title="Application Foundation & Design System"
        description="Phase 0 delivers the core architecture, responsive application shell, navigation system, and atomic UI component library for BusinessOS."
        breadcrumbs={[
          { label: "BusinessOS", href: "/" },
          { label: "Foundation", href: "/" },
          { label: "Phase 0 Shell" },
        ]}
        badge={
          <Badge variant="success" dot size="sm">
            Phase 0 Complete
          </Badge>
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="w-4 h-4 text-indigo-600" />}
              onClick={() => setIsModalOpen(true)}
            >
              Test Modal Component
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={btnLoading}
              onClick={handleTestLoading}
            >
              Simulate Async Action
            </Button>
          </>
        }
      />

      {/* Architecture Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Layers className="w-5 h-5" />
              </span>
              <Badge variant="indigo">Architecture</Badge>
            </div>
            <CardTitle className="mt-3">Modular App Shell</CardTitle>
            <CardDescription>
              Clean Next.js App Router structure with persistent collapsible sidebar, top navigation, and responsive drawers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Route Strategy</span>
                <span className="font-mono text-slate-500">(app) / (auth)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Responsive Breakpoints</span>
                <span>Mobile & Desktop</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Palette className="w-5 h-5" />
              </span>
              <Badge variant="success">Design Tokens</Badge>
            </div>
            <CardTitle className="mt-3">Linear / Stripe Aesthetics</CardTitle>
            <CardDescription>
              Neutral backgrounds, near-black typography, subtle 1px slate borders, soft elevations, and indigo accents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Theme</span>
                <span>Light Mode First</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Font System</span>
                <span>Inter / System Modern</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Shield className="w-5 h-5" />
              </span>
              <Badge variant="warning">Zero Tech Debt</Badge>
            </div>
            <CardTitle className="mt-3">Type-Safe & Scalable</CardTitle>
            <CardDescription>
              Strict TypeScript interfaces, mock workspaces, decoupled components, and standard component wrappers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">State Decoupling</span>
                <span>Ready for Backend</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Mock Data Store</span>
                <span>Independent schemas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Library Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buttons & Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Button & Badge System</CardTitle>
            <CardDescription>
              Accessible, fully-typed button variants and status badges with subtle dot indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Button Variants
              </span>
              <div className="flex flex-wrap gap-2.5">
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Status Badge Variants
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="indigo" dot>Indigo AI</Badge>
                <Badge variant="success" dot>Operational</Badge>
                <Badge variant="warning" dot>Attention</Badge>
                <Badge variant="danger" dot>Overdue</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Inputs Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements & Inputs</CardTitle>
            <CardDescription>
              Consistent input fields with inline labels, error indicators, icons, and helper descriptions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Business Entity Name"
              value={sampleInputVal}
              onChange={(e) => setSampleInputVal(e.target.value)}
              hint="Legal registered company or brand name."
            />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Operating Currency"
                value={currencyVal}
                onChange={(e) => setCurrencyVal(e.target.value)}
                options={[
                  { value: "USD", label: "USD ($) United States" },
                  { value: "EUR", label: "EUR (€) European Union" },
                  { value: "GBP", label: "GBP (£) Great Britain" },
                  { value: "INR", label: "INR (₹) India" },
                ]}
              />
              <Input
                label="Error State Demo"
                defaultValue="invalid_email"
                error="Please enter a valid business email."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Component Showcase */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle>Data Table Component</CardTitle>
              <CardDescription>
                High-density, responsive tabular presentation with search filtering and badges.
              </CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search modules..."
                value={searchTableQuery}
                onChange={(e) => setSearchTableQuery(e.target.value)}
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Module / Capability</TableHead>
                <TableHead>Scheduled Phase</TableHead>
                <TableHead>Technical Stack</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs font-semibold text-slate-500">
                    {row.id}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    {row.phase}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {row.leadTech}
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.badgeVariant} dot size="sm">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        alert(`Module: ${row.name} will be implemented in ${row.phase}.`)
                      }
                    >
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Next Phase Preparation Banner */}
      <div className="rounded-xl border border-indigo-200 bg-linear-to-r from-indigo-50/70 via-white to-indigo-50/30 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Phase 0 Complete — Project Foundation Ready
            </h3>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            The application shell, navigation sidebar, top navigation, search command palette (⌘K), responsive layouts, and UI component foundations are in place. We are ready to proceed with <strong>Phase 1: Authentication and Business Onboarding UI</strong> upon your approval.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => {
            alert(
              "Phase 0 is complete and waiting for your approval to start Phase 1 (Authentication & Onboarding)."
            );
          }}
        >
          Awaiting Approval
        </Button>
      </div>

      {/* Reusable Modal Component Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reusable Modal Component"
        description="BusinessOS modal dialog with backdrop blur, keyboard navigation, and customizable actions."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsModalOpen(false);
                alert("Modal action confirmed successfully.");
              }}
            >
              Confirm Action
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2">
          <p className="text-xs text-slate-600 leading-relaxed">
            This dialog follows the unified design tokens. It automatically traps focus, responds to the <code>ESC</code> key, locks body scrolling, and provides clean action footers.
          </p>
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Quick Test:</div>
            <div>• Press <kbd className="px-1 bg-white border rounded">ESC</kbd> to close.</div>
            <div>• Click anywhere outside on the backdrop to dismiss.</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
