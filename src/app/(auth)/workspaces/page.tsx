"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Plus,
  ArrowRight,
  Search,
  Check,
  Shield,
  Sparkles,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getStoredWorkspaces, setActiveWorkspace, getStoredUser } from "@/lib/auth-store";
import { Workspace } from "@/types";

export default function WorkspaceSelectionPage() {
  const router = useRouter();
  const [workspaces, setWorkspaces] = React.useState<Workspace[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [launchingId, setLaunchingId] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    setWorkspaces(getStoredWorkspaces());
    const u = getStoredUser();
    if (u) setUser(u);
  }, []);

  const filteredWorkspaces = workspaces.filter(
    (ws) =>
      ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectWorkspace = (ws: Workspace) => {
    setLaunchingId(ws.id);
    setActiveWorkspace(ws);
    setTimeout(() => {
      router.push("/app");
    }, 600);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <Badge variant="indigo" size="sm" dot className="mb-1">
          Workspace Selector
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Select Your Business Workspace
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Logged in as <strong className="text-slate-800">{user?.name || "Saksham Srivastava"}</strong> ({user?.email || "saksham@businessos.dev"}). Choose an organization to continue.
        </p>
      </div>

      <Card className="border-slate-200/90 shadow-xl bg-white overflow-hidden">
        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Filter organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <Link href="/onboarding" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs"
              leftIcon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
            >
              Create New Business
            </Button>
          </Link>
        </div>

        {/* Workspaces List */}
        <CardContent className="p-4 sm:p-5 space-y-3">
          {filteredWorkspaces.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="text-sm font-semibold text-slate-800">No workspaces match &quot;{searchQuery}&quot;</div>
              <p className="text-xs text-slate-400">
                You can create a new organization using the onboarding wizard.
              </p>
              <Link href="/onboarding">
                <Button variant="primary" size="sm" className="mt-2">
                  Create Workspace
                </Button>
              </Link>
            </div>
          ) : (
            filteredWorkspaces.map((ws) => {
              const isLaunching = launchingId === ws.id;

              return (
                <div
                  key={ws.id}
                  onClick={() => !isLaunching && handleSelectWorkspace(ws)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isLaunching
                      ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600"
                      : "border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs hover:bg-slate-50/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
                      {ws.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{ws.name}</h3>
                        <Badge
                          variant={ws.plan === "Enterprise" ? "indigo" : "secondary"}
                          size="sm"
                        >
                          {ws.plan}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{ws.industry}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-600 font-medium">
                          {ws.currency}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">{ws.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button
                      variant={isLaunching ? "primary" : "secondary"}
                      size="sm"
                      isLoading={isLaunching}
                      className="text-xs shrink-0"
                      rightIcon={!isLaunching && <ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {isLaunching ? "Loading Workspace..." : "Launch App"}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>

        <CardFooter className="justify-between border-t border-slate-100 py-3.5 px-5 bg-slate-50/50 text-xs text-slate-500">
          <span>{filteredWorkspaces.length} workspaces available</span>
          <Link href="/login" className="text-indigo-600 hover:underline font-medium">
            Sign in as different user
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
