"use client";

import * as React from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  ChevronDown,
  Check,
  Plus,
  LogOut,
  User,
  Settings,
  Sparkles,
  Command,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockWorkspaces, mockCurrentUser, mockNotifications } from "@/data/mock-workspaces";
import { Workspace } from "@/types";
import { cn } from "@/lib/utils";

export interface TopbarProps {
  onMobileToggle: () => void;
  onOpenSearch?: () => void;
  activeWorkspace: Workspace;
  onSelectWorkspace: (workspace: Workspace) => void;
}

export function Topbar({
  onMobileToggle,
  onOpenSearch,
  activeWorkspace,
  onSelectWorkspace,
}: TopbarProps) {
  const [workspaceOpen, setWorkspaceOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const workspaceRef = React.useRef<HTMLDivElement>(null);
  const notifRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setWorkspaceOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md">
      {/* Left: Mobile Toggle & Workspace Selector */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMobileToggle}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Workspace Selector Dropdown */}
        <div className="relative" ref={workspaceRef}>
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 px-2.5 py-1.5 text-left transition-colors"
          >
            <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
              {activeWorkspace.name.charAt(0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-none max-w-[120px] sm:max-w-[160px] truncate">
                {activeWorkspace.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                {activeWorkspace.plan} Plan
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {workspaceOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Workspaces ({mockWorkspaces.length})
              </div>
              <div className="space-y-0.5">
                {mockWorkspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      onSelectWorkspace(ws);
                      setWorkspaceOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors",
                      activeWorkspace.id === ws.id
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-semibold">
                        {ws.name.charAt(0)}
                      </div>
                      <div className="truncate text-left">
                        <div className="truncate">{ws.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {ws.industry}
                        </div>
                      </div>
                    </div>
                    {activeWorkspace.id === ws.id && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                <button
                  onClick={() => {
                    alert("Business Onboarding & Workspace Creation will be configured in Phase 1.");
                    setWorkspaceOpen(false);
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create new workspace</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Search leads, customers, invoices, tools...</span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-500 font-mono">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Navigation Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Quick Sparkle indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>AI Active</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <Badge variant="indigo" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-indigo-600 hover:underline font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-3 text-left transition-colors hover:bg-slate-50 cursor-pointer",
                        !notif.read && "bg-indigo-50/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium text-slate-800">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                        {notif.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-slate-100 text-center bg-slate-50/30">
                <span className="text-[11px] text-slate-400">
                  Real-time business notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          onClick={() => {
            alert("BusinessOS Documentation & Help Center is ready for deployment.");
          }}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          aria-label="Help and resources"
          title="Help & documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* User Profile Menu Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 transition-colors"
            aria-label="User profile options"
          >
            <Avatar
              name={mockCurrentUser.name}
              size="sm"
              status={mockCurrentUser.status}
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-semibold text-xs text-slate-900 truncate">
                  {mockCurrentUser.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {mockCurrentUser.email}
                </div>
                <Badge variant="indigo" size="sm" className="mt-1.5 text-[10px]">
                  {mockCurrentUser.role}
                </Badge>
              </div>

              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Profile settings will be configured in Phase 9.");
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Workspace settings will be configured in Phase 9.");
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Workspace Settings</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Mock authentication logout triggered. Phase 1 provides full auth flows.");
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
