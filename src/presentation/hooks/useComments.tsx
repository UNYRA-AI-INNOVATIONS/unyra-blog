import { useState, useEffect } from "react";

export interface Comment {
  id: string;
  articleId: string;
  name: string;
  text: string;
  createdAt: string;
}

const STORAGE_KEY = "fluid-muse-comments";

function loadAll(): Record<string, Comment[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, Comment[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useComments(articleId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const all = loadAll();
    setComments(all[articleId] ?? []);
  }, [articleId]);

  function addComment(name: string, text: string) {
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      articleId,
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    const all = loadAll();
    const updated = [newComment, ...(all[articleId] ?? [])];
    all[articleId] = updated;
    saveAll(all);
    setComments(updated);
  }

  function deleteComment(id: string) {
    const all = loadAll();
    const updated = (all[articleId] ?? []).filter((c) => c.id !== id);
    all[articleId] = updated;
    saveAll(all);
    setComments(updated);
  }

  return { comments, addComment, deleteComment };
}
