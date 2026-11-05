"use client";

import * as React from "react";
import Link from "next/link";
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

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        workspaceRef.current &&
        !workspaceRef.current.contains(event.target as Node)
      ) {
        setWorkspaceOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="h-14 border-b border-[#E3E9EF] bg-white/95 backdrop-blur-md px-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: Mobile hamburger & Workspace Switcher */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMobileToggle}
          className="md:hidden rounded-lg p-1.5 text-[#667482] hover:bg-[#F0F4F8] hover:text-[#17212B] transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Workspace Selector Dropdown */}
        <div className="relative" ref={workspaceRef}>
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex items-center gap-2 rounded-lg border border-[#E3E9EF] bg-[#F7F9FB] hover:bg-[#F0F4F8] px-2.5 py-1.5 text-left transition-colors"
          >
            <div className="w-5 h-5 rounded bg-[#101820] text-[#F7F9FB] flex items-center justify-center text-[10px] font-bold">
              {activeWorkspace.name.charAt(0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-[#17212B] leading-none max-w-[120px] sm:max-w-[160px] truncate">
                {activeWorkspace.name}
              </span>
              <span className="text-[10px] text-[#667482] font-medium leading-none mt-0.5">
                {activeWorkspace.plan} Plan
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#667482] ml-1" />
          </button>

          {workspaceOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border border-[#E3E9EF] bg-white p-1.5 shadow-xl z-50">
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#667482]">
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
                        ? "bg-[#EBF3FC] text-[#2F80ED] font-semibold"
                        : "text-[#17212B] hover:bg-[#F7F9FB]"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded bg-[#F0F4F8] border border-[#E3E9EF] text-[#17212B] flex items-center justify-center text-xs font-semibold">
                        {ws.name.charAt(0)}
                      </div>
                      <div className="truncate text-left">
                        <div className="truncate font-medium">{ws.name}</div>
                        <div className="text-[10px] text-[#667482] font-normal">
                          {ws.industry}
                        </div>
                      </div>
                    </div>
                    {activeWorkspace.id === ws.id && (
                      <Check className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-[#E3E9EF] space-y-0.5">
                <Link
                  href="/onboarding"
                  onClick={() => setWorkspaceOpen(false)}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#2F80ED] hover:bg-[#EBF3FC] font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create new workspace</span>
                </Link>
                <Link
                  href="/workspaces"
                  onClick={() => setWorkspaceOpen(false)}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#667482] hover:bg-[#F7F9FB] font-medium transition-colors"
                >
                  <Command className="w-3.5 h-3.5 text-[#667482]" />
                  <span>Manage all workspaces</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between rounded-lg border border-[#E3E9EF] bg-[#F7F9FB] px-3 py-1.5 text-xs text-[#667482] hover:border-[#CBD5E1] hover:bg-white transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#667482] shrink-0" />
            <span>Search leads, customers, invoices, tools...</span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] bg-white border border-[#E3E9EF] rounded px-1.5 py-0.5 text-[#17212B] font-mono">
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
          className="sm:hidden rounded-lg p-2 text-[#667482] hover:bg-[#F0F4F8]"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Quick Sparkle indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF3FC] border border-[#C4DEFA] text-[#2F80ED] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#20B8A5] animate-pulse" />
          <span>AI Active</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-lg p-2 text-[#667482] hover:bg-[#F0F4F8] hover:text-[#17212B] transition-colors"
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
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#E3E9EF] bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-[#E3E9EF] bg-[#F7F9FB]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#17212B]">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <Badge variant="accent" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-[#2F80ED] hover:underline font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#E3E9EF]">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#667482]">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-3 text-left transition-colors hover:bg-[#F7F9FB] cursor-pointer",
                        !notif.read && "bg-[#EBF3FC]/40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#17212B]">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-[#667482] shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#667482] mt-1 leading-normal">
                        {notif.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-[#E3E9EF] text-center bg-[#F7F9FB]">
                <span className="text-[11px] text-[#667482]">
                  Real-time business notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          onClick={() => {
            alert("Nexora Knowledge Base & Support Center is active.");
          }}
          className="rounded-lg p-2 text-[#667482] hover:bg-[#F0F4F8] hover:text-[#17212B] transition-colors"
          aria-label="Help and resources"
          title="Help & documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-[#E3E9EF] mx-1" />

        {/* User Profile Menu Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-[#F0F4F8] transition-colors"
            aria-label="User profile options"
          >
            <Avatar
              name={mockCurrentUser.name}
              size="sm"
              status={mockCurrentUser.status}
            />
            <ChevronDown className="w-3.5 h-3.5 text-[#667482] hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#E3E9EF] bg-white p-1.5 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-[#E3E9EF]">
                <div className="font-bold text-xs text-[#17212B] truncate">
                  {mockCurrentUser.name}
                </div>
                <div className="text-[11px] text-[#667482] truncate">
                  {mockCurrentUser.email}
                </div>
                <Badge variant="accent" size="sm" className="mt-1.5 text-[10px]">
                  {mockCurrentUser.role}
                </Badge>
              </div>

              <div className="py-1 space-y-0.5">
                <Link
                  href="/settings/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#17212B] hover:bg-[#F7F9FB] transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#667482]" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings/team"
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#17212B] hover:bg-[#F7F9FB] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[#667482]" />
                  <span>Workspace Settings</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-[#E3E9EF]">
                <Link
                  href="/login"
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
