"use client";

import React from "react";
import { ChatSession } from "@/types/ai";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Plus,
  Trash2,
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  Search,
} from "lucide-react";

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (cat: ChatSession["category"]) => {
    switch (cat) {
      case "finance":
        return <CreditCard className="w-3.5 h-3.5 text-blue-500" />;
      case "sales":
        return <Users className="w-3.5 h-3.5 text-[#20B8A5]" />;
      case "operations":
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col h-full shrink-0">
      {/* Top action */}
      <div className="p-3.5 border-b border-slate-200 space-y-2.5">
        <Button
          variant="primary"
          size="sm"
          onClick={onNewSession}
          className="w-full text-xs justify-center"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          New Conversation
        </Button>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Recent Conversations
        </span>

        {filteredSessions.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No conversations match
          </div>
        ) : (
          filteredSessions.map((s) => {
            const isActive = s.id === activeSessionId;
            return (
              <div
                key={s.id}
                onClick={() => onSelectSession(s.id)}
                className={`group relative flex items-start justify-between p-2.5 rounded-xl cursor-pointer text-left transition-all ${
                  isActive
                    ? "bg-white text-slate-900 border border-slate-200/80 shadow-xs"
                    : "text-slate-600 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 pr-6">
                  <div className="mt-0.5 shrink-0">{getCategoryIcon(s.category)}</div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold truncate ${
                        isActive ? "text-slate-900 font-bold" : "text-slate-700"
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {s.snippet}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(s.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-300 hover:text-rose-600 absolute right-2 top-2.5"
                  title="Delete Session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200 bg-white/50 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-700">All Modules Synced</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">v2.4 Pro</span>
      </div>
    </div>
  );
}
