import { useMemo, useState } from "react";
import { loadArticles } from "@/infrastructure/content/loadArticles";
import type { Article } from "@/domain/types";

export function useArticles() {
  const articles = useMemo(() => loadArticles(), []);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [articles, searchQuery]);

  return { articles, filteredArticles, searchQuery, setSearchQuery };
}

export function useSelectedArticle() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  return { selectedArticle, setSelectedArticle, clearArticle: () => setSelectedArticle(null) };
}
