"use client";

import * as React from "react";
import {
  Users,
  Search,
  Plus,
  Building2,
  DollarSign,
  TrendingUp,
  Mail,
  Phone,
  CheckCircle2,
  Edit,
  Trash2,
  ArrowRight,
  FileText,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { CustomerModal } from "@/components/crm/customer-modal";
import { CustomerProfileDrawer } from "@/components/crm/customer-profile-drawer";
import {
  getStoredCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/lib/crm-store";
import { Customer } from "@/types/crm";

export default function CustomersDirectoryPage() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Modals & Drawers
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCustomer, setEditingCustomer] = React.useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCustomers(getStoredCustomers());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrUpdate = (customerData: any) => {
    if (editingCustomer) {
      const updated = updateCustomer(editingCustomer.id, customerData);
      setCustomers(updated);
      showToast(`Customer "${customerData.company}" updated.`);
      if (selectedCustomer?.id === editingCustomer.id) {
        setSelectedCustomer({ ...selectedCustomer, ...customerData });
      }
    } else {
      const created = addCustomer(customerData);
      setCustomers(getStoredCustomers());
      showToast(`Customer "${created.company}" added to directory.`);
    }
    setEditingCustomer(null);
  };

  const handleDelete = (id: string) => {
    const updated = deleteCustomer(id);
    setCustomers(updated);
    showToast("Customer record deleted.");
  };

  const handleOpenDetails = (c: Customer) => {
    setSelectedCustomer(c);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (c: Customer) => {
    setEditingCustomer(c);
    setIsModalOpen(true);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primaryContactRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLTV = customers.reduce((sum, c) => sum + (c.lifetimeValue || 0), 0);
  const totalMonthlyRetainers = customers.reduce(
    (sum, c) => sum + (c.monthlyRetainer || 0),
    0
  );
  const activeCount = customers.filter((c) => c.status === "Active").length;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Customer Directory & Accounts"
        description="Comprehensive 360° overview of active client accounts, retainer terms, and cumulative billing."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Sales", href: "/sales/leads" },
          { label: "Customers" },
        ]}
        badge={
          <Badge variant="success" dot size="sm">
            {customers.length} Client Accounts
          </Badge>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingCustomer(null);
              setIsModalOpen(true);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add New Customer
          </Button>
        }
      />

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Cumulative LTV
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{(totalLTV / 100000).toFixed(1)}L
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
            ₹{totalLTV.toLocaleString()} invoiced to date
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Monthly Retainer MRR
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
            ₹{(totalMonthlyRetainers / 100000).toFixed(1)}L
          </div>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
            ₹{totalMonthlyRetainers.toLocaleString()} recurring baseline
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Active Accounts
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">
            {activeCount} of {customers.length}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">
            Ongoing service retainers
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Average Account LTV
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{customers.length ? Math.round(totalLTV / customers.length).toLocaleString() : 0}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">
            Per client relationship
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Filter by company, contact person, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="w-full sm:w-44 self-end sm:self-auto">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Account Statuses" },
                { value: "Active", label: "Active Retainers" },
                { value: "Paused", label: "Paused Accounts" },
                { value: "Completed", label: "Completed Engagements" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client & Company</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Monthly Retainer</TableHead>
              <TableHead>Lifetime Value</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-slate-400">
                  No customers found matching the search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer hover:bg-slate-50/70"
                  onClick={() => handleOpenDetails(c)}
                >
                  <TableCell>
                    <div className="font-bold text-slate-900 text-xs hover:text-indigo-600 transition-colors">
                      {c.company}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Joined {c.joinedDate}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs font-semibold text-slate-800">
                      {c.primaryContactRole}
                    </div>
                    <div className="text-[11px] text-slate-400">{c.email}</div>
                  </TableCell>

                  <TableCell className="text-xs text-slate-600">
                    {c.industry}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        c.status === "Active"
                          ? "success"
                          : c.status === "Paused"
                          ? "warning"
                          : "secondary"
                      }
                      dot
                      size="sm"
                    >
                      {c.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-mono font-bold text-indigo-600 text-xs">
                    {c.monthlyRetainer > 0 ? `₹${c.monthlyRetainer.toLocaleString()}` : "Project Basis"}
                  </TableCell>

                  <TableCell className="font-mono font-bold text-slate-900 text-xs">
                    ₹{c.lifetimeValue.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">{c.activeProjectsCount}</span> active
                  </TableCell>

                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(c)}
                        title="Edit Customer"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetails(c)}
                        className="text-indigo-600 font-medium"
                      >
                        Profile
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add / Edit Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialCustomer={editingCustomer}
      />

      {/* Customer 360 Profile Drawer */}
      <CustomerProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        customer={selectedCustomer}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
