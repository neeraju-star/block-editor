import type { Data } from "@puckeditor/core";

export type DraftType = "email" | "webpage";

export type Draft = {
  id: string;
  name: string;
  type: DraftType;
  data: Data;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "block-editor-drafts";

function loadAll(): Draft[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Draft[];
  } catch {
    return [];
  }
}

function saveAll(drafts: Draft[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function listDrafts(): Draft[] {
  return loadAll().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getDraft(id: string): Draft | undefined {
  return loadAll().find((d) => d.id === id);
}

export function createDraft(
  name: string,
  type: DraftType,
  data: Data
): Draft {
  const now = new Date().toISOString();
  const draft: Draft = {
    id: crypto.randomUUID(),
    name,
    type,
    data,
    createdAt: now,
    updatedAt: now,
  };
  const drafts = loadAll();
  drafts.push(draft);
  saveAll(drafts);
  return draft;
}

export function updateDraft(id: string, data: Data): Draft | undefined {
  const drafts = loadAll();
  const index = drafts.findIndex((d) => d.id === id);
  if (index === -1) return undefined;
  drafts[index].data = data;
  drafts[index].updatedAt = new Date().toISOString();
  saveAll(drafts);
  return drafts[index];
}

export function renameDraft(id: string, name: string): Draft | undefined {
  const drafts = loadAll();
  const index = drafts.findIndex((d) => d.id === id);
  if (index === -1) return undefined;
  drafts[index].name = name;
  drafts[index].updatedAt = new Date().toISOString();
  saveAll(drafts);
  return drafts[index];
}

export function duplicateDraft(id: string): Draft | undefined {
  const drafts = loadAll();
  const original = drafts.find((d) => d.id === id);
  if (!original) return undefined;
  const now = new Date().toISOString();
  const copy: Draft = {
    id: crypto.randomUUID(),
    name: `${original.name} (Copy)`,
    type: original.type,
    data: JSON.parse(JSON.stringify(original.data)),
    createdAt: now,
    updatedAt: now,
  };
  drafts.push(copy);
  saveAll(drafts);
  return copy;
}

export function deleteDraft(id: string): boolean {
  const drafts = loadAll();
  const filtered = drafts.filter((d) => d.id !== id);
  if (filtered.length === drafts.length) return false;
  saveAll(filtered);
  return true;
}

export function getDraftCount(): number {
  return loadAll().length;
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}
