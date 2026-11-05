"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChatSession, ChatMessage, SuggestedAction } from "@/types/ai";
import {
  getStoredSessions,
  getStoredMessages,
  saveSessions,
  saveMessages,
  createNewSession,
  deleteSession,
  generateAssistantResponse,
} from "@/lib/ai-store";
import { suggestedPrompts } from "@/data/mock-ai-data";
import { ChatSidebar } from "@/components/ai/chat-sidebar";
import { ChatMessageItem } from "@/components/ai/chat-message-item";
import { SuggestedPromptsBar } from "@/components/ai/suggested-prompts-bar";
import { ActionConfirmationDialog } from "@/components/ai/action-confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  Trash2,
  Menu,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CreditCard,
  UserCheck,
  AlertCircle,
  ShieldCheck,
  Loader2,
  FileText,
} from "lucide-react";

export default function AIAssistantPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Action Confirmation
  const [pendingAction, setPendingAction] = useState<SuggestedAction | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const refreshData = () => {
    const loadedSessions = getStoredSessions();
    const loadedMessages = getStoredMessages();
    setSessions(loadedSessions);
    setMessagesMap(loadedMessages);

    if (!activeSessionId && loadedSessions.length > 0) {
      setActiveSessionId(loadedSessions[0].id);
    }
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("ai-sessions-updated", refreshData);
    window.addEventListener("ai-messages-updated", refreshData);
    return () => {
      window.removeEventListener("ai-sessions-updated", refreshData);
      window.removeEventListener("ai-messages-updated", refreshData);
    };
  }, []);

  const activeMessages = activeSessionId ? messagesMap[activeSessionId] || [] : [];
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages, isTyping]);

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
  };

  const handleNewSession = () => {
    const newSess = createNewSession("New Business Analysis");
    setActiveSessionId(newSess.id);
    refreshData();
  };

  const handleDeleteSession = (id: string) => {
    deleteSession(id);
    const remaining = sessions.filter((s) => s.id !== id);
    if (activeSessionId === id) {
      setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
    }
    refreshData();
  };

  const handleClearChat = () => {
    if (!activeSessionId) return;
    if (confirm("Clear all messages in this conversation?")) {
      const updatedMap = { ...messagesMap, [activeSessionId]: [] };
      saveMessages(updatedMap);
      setMessagesMap(updatedMap);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content || isTyping) return;

    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      const created = createNewSession(content.slice(0, 32));
      currentSessionId = created.id;
      setActiveSessionId(created.id);
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 1. Append User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: content,
      timestamp: timeStr,
    };

    const currentList = messagesMap[currentSessionId] || [];
    const updatedWithUser = [...currentList, userMsg];

    const newMap = { ...messagesMap, [currentSessionId]: updatedWithUser };
    saveMessages(newMap);
    setMessagesMap(newMap);
    setInputText("");
    setIsTyping(true);

    // Update session title snippet if it's the first message
    if (currentList.length === 0) {
      const updatedSessions = sessions.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            title: content.length > 38 ? `${content.slice(0, 38)}...` : content,
            snippet: `${content.slice(0, 48)}...`,
            messageCount: 2,
            updatedAt: new Date().toISOString(),
          };
        }
        return s;
      });
      saveSessions(updatedSessions);
      setSessions(updatedSessions);
    }

    // 2. Simulate AI Processing & Return Contextual Assistant Response
    setTimeout(() => {
      const aiResponseData = generateAssistantResponse(content);

      const aiMsg: ChatMessage = {
        ...aiResponseData,
        id: `assistant-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const finalMessages = [...updatedWithUser, aiMsg];
      const finalMap = { ...newMap, [currentSessionId!]: finalMessages };
      saveMessages(finalMap);
      setMessagesMap(finalMap);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-5.5rem)] -m-4 md:-m-6 overflow-hidden bg-slate-50 border border-slate-200 rounded-xl shadow-xs">
      {/* Sidebar (Conversations History) */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } transition-all duration-200 z-10`}
      >
        <ChatSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
        />
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full bg-white relative min-w-0">
        {/* Top Header */}
        <div className="h-14 border-b border-slate-200 px-4 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              title={sidebarOpen ? "Collapse History" : "Show History"}
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[240px] sm:max-w-md">
                  {activeSession?.title || "AI Business Assistant"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Autonomous Engine Active
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Context: CRM Leads • Financial Ledger • Receivables & Billing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className="h-8 text-xs text-slate-600 hover:text-rose-600"
              title="Clear messages in this conversation"
            >
              <Trash2 className="w-3.5 h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleNewSession}
              className="h-8 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">New Analysis</span>
            </Button>
          </div>
        </div>

        {/* Message Viewport */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
          {activeMessages.length === 0 ? (
            /* Empty State Hero */
            <div className="max-w-2xl mx-auto py-8 space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#101820] flex items-center justify-center text-[#20B8A5] mx-auto shadow-md border border-[#263746]">
                  <Bot className="w-7 h-7 text-[#20B8A5]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Welcome to Nexora AI Copilot
                </h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Your business intelligence partner. Ask questions about your cash flow, overdue receivables, sales pipeline, or operational workflows.
                </p>
              </div>

              {/* 4 Topic Starter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedPrompts.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSendMessage(item.prompt)}
                    className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                        {item.title}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      "{item.prompt}"
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Responses synthesize your local mock CRM and finance ledger datasets without transmitting confidential records to external APIs.
                </span>
              </div>
            </div>
          ) : (
            /* Active Message List */
            <>
              {activeMessages.map((msg) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  onTriggerAction={(action) => setPendingAction(action)}
                />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 my-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs flex items-center gap-1.5 text-xs text-slate-500">
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin mr-1" />
                    <span>Analyzing ledger & CRM telemetry...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 border-t border-slate-200 bg-white/95 shrink-0 space-y-2">
          {/* Suggested Prompts Row */}
          <SuggestedPromptsBar onSelectPrompt={(p) => handleSendMessage(p)} />

          {/* Text Input Box */}
          <div className="relative border border-slate-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all shadow-2xs">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask Nexora AI... (e.g. 'Show me overdue invoices' or 'How much did we spend this month?')"
              className="w-full px-4 pt-3 pb-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none rounded-xl"
            />

            <div className="absolute left-3 bottom-2.5 flex items-center gap-1.5 text-xs text-slate-400">
              <span className="hidden sm:inline font-medium text-[11px] text-slate-500">
                Connected Contexts:
              </span>
              <button
                type="button"
                onClick={() => setInputText("@Finance ")}
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                @Finance
              </button>
              <button
                type="button"
                onClick={() => setInputText("@CRM ")}
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                @CRM
              </button>
              <button
                type="button"
                onClick={() => setInputText("@Invoices ")}
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                @Invoices
              </button>
            </div>

            <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="h-8 px-3 text-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Nexora AI analyzes enterprise metrics using mock business telemetry • Press Enter to dispatch
          </p>
        </div>
      </div>

      {/* Autonomous Action Confirmation Modal */}
      <ActionConfirmationDialog
        isOpen={!!pendingAction}
        onClose={() => setPendingAction(null)}
        action={pendingAction}
        onActionExecuted={(action) => {
          // Add a system confirmation message in the current conversation!
          if (activeSessionId) {
            const currentList = messagesMap[activeSessionId] || [];
            const confirmMsg: ChatMessage = {
              id: `sys-${Date.now()}`,
              sender: "assistant",
              text: `✅ **Autonomous Action Completed**: "${action.label}" has been processed and logged in your operational audit trail.`,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            const updated = [...currentList, confirmMsg];
            const updatedMap = { ...messagesMap, [activeSessionId]: updated };
            saveMessages(updatedMap);
            setMessagesMap(updatedMap);
          }
        }}
      />
    </div>
  );
}
