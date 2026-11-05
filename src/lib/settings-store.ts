import {
  BusinessProfile,
  TeamMember,
  RolePermissionMatrix,
  MockIntegration,
  NotificationSettings,
  AppearanceSettings,
  TeamRole,
} from "@/types/settings";
import {
  initialBusinessProfile,
  initialTeamMembers,
  initialRolePermissions,
  initialIntegrations,
  initialNotifications,
  initialAppearance,
} from "@/data/mock-settings-data";

const PROFILE_KEY = "businessos_profile_v1";
const TEAM_KEY = "businessos_team_v1";
const ROLES_KEY = "businessos_roles_v1";
const INTEGRATIONS_KEY = "businessos_integrations_v1";
const NOTIFICATIONS_KEY = "businessos_notifications_v1";
const APPEARANCE_KEY = "businessos_appearance_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// 1. Business Profile
export function getStoredBusinessProfile(): BusinessProfile {
  if (!isBrowser()) return initialBusinessProfile;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(initialBusinessProfile));
      return initialBusinessProfile;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read profile from localStorage:", e);
    return initialBusinessProfile;
  }
}

export function saveBusinessProfile(profile: BusinessProfile): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("business-profile-updated"));
  } catch (e) {
    console.error("Failed to save profile to localStorage:", e);
  }
}

// 2. Team Members
export function getStoredTeamMembers(): TeamMember[] {
  if (!isBrowser()) return initialTeamMembers;
  try {
    const raw = localStorage.getItem(TEAM_KEY);
    if (!raw) {
      localStorage.setItem(TEAM_KEY, JSON.stringify(initialTeamMembers));
      return initialTeamMembers;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read team from localStorage:", e);
    return initialTeamMembers;
  }
}

export function saveTeamMembers(team: TeamMember[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(TEAM_KEY, JSON.stringify(team));
    window.dispatchEvent(new Event("team-updated"));
  } catch (e) {
    console.error("Failed to save team to localStorage:", e);
  }
}

export function inviteTeamMember(name: string, email: string, role: TeamRole): TeamMember {
  const team = getStoredTeamMembers();
  const newMember: TeamMember = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role,
    status: "invited",
    invitedDate: new Date().toISOString().split("T")[0],
    lastActive: "Pending invitation",
  };

  const updated = [...team, newMember];
  saveTeamMembers(updated);
  return newMember;
}

export function updateMemberRole(id: string, role: TeamRole): void {
  const team = getStoredTeamMembers();
  const updated = team.map((m) => (m.id === id ? { ...m, role } : m));
  saveTeamMembers(updated);
}

export function removeTeamMember(id: string): void {
  const team = getStoredTeamMembers();
  const updated = team.filter((m) => m.id !== id);
  saveTeamMembers(updated);
}

// 3. Role Permissions
export function getStoredRolePermissions(): RolePermissionMatrix[] {
  if (!isBrowser()) return initialRolePermissions;
  try {
    const raw = localStorage.getItem(ROLES_KEY);
    if (!raw) {
      localStorage.setItem(ROLES_KEY, JSON.stringify(initialRolePermissions));
      return initialRolePermissions;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read roles from localStorage:", e);
    return initialRolePermissions;
  }
}

export function saveRolePermissions(matrix: RolePermissionMatrix[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(ROLES_KEY, JSON.stringify(matrix));
    window.dispatchEvent(new Event("roles-updated"));
  } catch (e) {
    console.error("Failed to save roles to localStorage:", e);
  }
}

// 4. Integrations
export function getStoredIntegrations(): MockIntegration[] {
  if (!isBrowser()) return initialIntegrations;
  try {
    const raw = localStorage.getItem(INTEGRATIONS_KEY);
    if (!raw) {
      localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(initialIntegrations));
      return initialIntegrations;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read integrations from localStorage:", e);
    return initialIntegrations;
  }
}

export function saveIntegrations(integrations: MockIntegration[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(integrations));
    window.dispatchEvent(new Event("integrations-updated"));
  } catch (e) {
    console.error("Failed to save integrations to localStorage:", e);
  }
}

export function connectMockIntegration(
  id: string,
  connectedAccount: string,
  credentials?: { apiKey?: string; webhookUrl?: string; senderId?: string }
): void {
  const list = getStoredIntegrations();
  const updated = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: "connected" as const,
        connectedAccount,
        lastSync: "Just now",
        autoSync: true,
        credentials: credentials || item.credentials,
      };
    }
    return item;
  });
  saveIntegrations(updated);
}

export function disconnectMockIntegration(id: string): void {
  const list = getStoredIntegrations();
  const updated = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: "not_connected" as const,
        connectedAccount: undefined,
        autoSync: false,
      };
    }
    return item;
  });
  saveIntegrations(updated);
}

export function toggleIntegrationSync(id: string): void {
  const list = getStoredIntegrations();
  const updated = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        autoSync: !item.autoSync,
        lastSync: !item.autoSync ? item.lastSync : "Just now",
      };
    }
    return item;
  });
  saveIntegrations(updated);
}

// 5. Notifications
export function getStoredNotifications(): NotificationSettings {
  if (!isBrowser()) return initialNotifications;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(initialNotifications));
      return initialNotifications;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read notifications from localStorage:", e);
    return initialNotifications;
  }
}

export function saveNotifications(settings: NotificationSettings): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("notifications-updated"));
  } catch (e) {
    console.error("Failed to save notifications to localStorage:", e);
  }
}

// 6. Appearance
export function getStoredAppearance(): AppearanceSettings {
  if (!isBrowser()) return initialAppearance;
  try {
    const raw = localStorage.getItem(APPEARANCE_KEY);
    if (!raw) {
      localStorage.setItem(APPEARANCE_KEY, JSON.stringify(initialAppearance));
      return initialAppearance;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read appearance from localStorage:", e);
    return initialAppearance;
  }
}

export function saveAppearance(settings: AppearanceSettings): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(APPEARANCE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("appearance-updated"));
  } catch (e) {
    console.error("Failed to save appearance to localStorage:", e);
  }
}
