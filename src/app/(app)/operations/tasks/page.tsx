"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Trash2,
  Tag,
  ArrowUpDown,
} from "lucide-react";
import {
  useOperationsTasks,
  updateTaskStatus,
  deleteTask,
} from "@/lib/operations-store";
import { TaskStatus, TaskPriority, TaskCategory } from "@/types/operations";
import { NewTaskModal } from "@/components/operations/new-task-modal";

export default function OperationsTasksPage() {
  const { tasks, mounted, refresh } = useOperationsTasks();
  const [activeTab, setActiveTab] = React.useState<"all" | TaskStatus | "urgent">("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Operational Tasks"
          breadcrumbs={[{ label: "Operations" }, { label: "Tasks" }]}
        />
        <div className="p-8 text-center text-xs text-slate-400">Loading tasks...</div>
      </div>
    );
  }

  // Counts
  const totalCount = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const urgentCount = tasks.filter((t) => t.priority === "urgent" || t.priority === "high").length;

  // Filtered
  const filteredTasks = tasks.filter((t) => {
    // Tab filter
    if (activeTab === "urgent") {
      if (t.priority !== "urgent" && t.priority !== "high") return false;
    } else if (activeTab !== "all") {
      if (t.status !== activeTab) return false;
    }

    // Category filter
    if (categoryFilter !== "all" && t.category !== categoryFilter) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      const matchAssignee = t.assignee.name.toLowerCase().includes(q);
      const matchTags = t.tags?.some((tag) => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchAssignee && !matchTags) return false;
    }

    return true;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="danger">Urgent</Badge>;
      case "high":
        return <Badge variant="warning">High</Badge>;
      case "medium":
        return <Badge variant="indigo">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
    }
  };

  const isOverdue = (dueDate: string, status: TaskStatus) => {
    if (status === "completed") return false;
    return new Date(dueDate) < new Date(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Tasks"
        description="Track daily operational workflows, assign business tasks, and resolve action items across your organization."
        breadcrumbs={[{ label: "Operations" }, { label: "Tasks" }]}
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            New Task
          </Button>
        }
      />

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Action Items</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Active business deliverables</p>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">In Progress</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{inProgressCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Currently being executed</p>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Completed</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Successfully closed</p>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Urgent / High Priority</p>
              <h3 className="text-2xl font-bold text-rose-600 mt-1">{urgentCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Requires immediate attention</p>
        </Card>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <Card className="p-4 bg-white border-slate-200">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: `All (${totalCount})` },
              { id: "in_progress", label: `In Progress (${inProgressCount})` },
              { id: "todo", label: `To Do (${tasks.filter((t) => t.status === "todo").length})` },
              { id: "completed", label: `Completed (${completedCount})` },
              { id: "urgent", label: `Urgent (${urgentCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Client">Client</option>
              <option value="Team">Team</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <Card className="divide-y divide-slate-100 bg-white border-slate-200 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-800">No tasks found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no tasks matching your selected filters or search query. Create a new task to get started.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setActiveTab("all");
                setCategoryFilter("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);
            const isDone = task.status === "completed";

            return (
              <div
                key={task.id}
                className={`p-4 flex items-start gap-3.5 transition-colors hover:bg-slate-50/60 ${
                  isDone ? "bg-slate-50/30" : ""
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() =>
                    updateTaskStatus(task.id, isDone ? "todo" : "completed")
                  }
                  className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                    isDone
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 hover:border-indigo-500 bg-white"
                  }`}
                  aria-label="Toggle task status"
                >
                  {isDone && <CheckCircle2 className="w-4 h-4" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        isDone ? "line-through text-slate-400" : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </span>
                    {getPriorityBadge(task.priority)}
                    <Badge variant="secondary">{task.category}</Badge>
                  </div>

                  {task.description && (
                    <p
                      className={`text-xs ${
                        isDone ? "text-slate-400 line-through" : "text-slate-600"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}

                  {/* Metadata line */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-700">
                        {task.assignee.name.charAt(0)}
                      </div>
                      <span>
                        {task.assignee.name}{" "}
                        <span className="text-slate-400">({task.assignee.role})</span>
                      </span>
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        overdue
                          ? "text-rose-600 font-semibold"
                          : "text-slate-500"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due {task.dueDate}</span>
                      {overdue && <span className="text-[10px] uppercase font-bold">(Overdue)</span>}
                    </span>

                    {task.tags && task.tags.length > 0 && (
                      <div className="hidden sm:flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                    className="text-[11px] px-2 py-1 rounded border border-slate-200 bg-white text-slate-700 focus:outline-none"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this task?")) {
                        deleteTask(task.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </Card>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={refresh}
      />
    </div>
  );
}
