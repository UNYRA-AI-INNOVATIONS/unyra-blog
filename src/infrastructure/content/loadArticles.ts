import type { Article } from "@/domain/types";
import { markdownToArticle } from "./parseMarkdown";

// Vite glob import — loads all .md files from content/articles at build time
const articleFiles = import.meta.glob("/content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function loadArticles(): Article[] {
  return Object.entries(articleFiles).map(([path, raw]) => {
    const filename = path.split("/").pop() || "";
    return markdownToArticle(filename, raw);
  });
}
