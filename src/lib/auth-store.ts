"use client";

import { Workspace, UserProfile } from "@/types";
import { mockWorkspaces, mockCurrentUser } from "@/data/mock-workspaces";

const STORAGE_KEY_USER = "nexora_auth_user";
const STORAGE_KEY_WORKSPACES = "nexora_workspaces";
const STORAGE_KEY_ACTIVE_WS = "nexora_active_workspace";

export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return mockCurrentUser;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return mockCurrentUser;
    return JSON.parse(raw);
  } catch {
    return mockCurrentUser;
  }
}

export function setStoredUser(user: UserProfile | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEY_USER);
  } else {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }
}

export function getStoredWorkspaces(): Workspace[] {
  if (typeof window === "undefined") return mockWorkspaces;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WORKSPACES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_WORKSPACES, JSON.stringify(mockWorkspaces));
      return mockWorkspaces;
    }
    return JSON.parse(raw);
  } catch {
    return mockWorkspaces;
  }
}

export function saveNewWorkspace(newWs: Workspace): Workspace[] {
  const current = getStoredWorkspaces();
  const updated = [newWs, ...current.filter((w) => w.id !== newWs.id)];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_WORKSPACES, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_ACTIVE_WS, JSON.stringify(newWs));
  }
  return updated;
}

export function getActiveWorkspace(): Workspace {
  if (typeof window === "undefined") return mockWorkspaces[0];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVE_WS);
    if (raw) return JSON.parse(raw);
    const all = getStoredWorkspaces();
    return all[0] || mockWorkspaces[0];
  } catch {
    return mockWorkspaces[0];
  }
}

export function setActiveWorkspace(ws: Workspace) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_ACTIVE_WS, JSON.stringify(ws));
}
