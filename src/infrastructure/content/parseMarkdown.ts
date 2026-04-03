import type { Article } from "@/domain/types";

interface FrontMatter {
  title: string;
  excerpt: string;
  date: string;
  categories: string[];
  readTime: string;
  cover: string;
  authors: string[];
}

function parseFrontMatter(raw: string): { meta: FrontMatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      meta: { title: "", excerpt: "", date: "", categories: [], readTime: "", cover: "", authors: [] },
      content: raw,
    };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();

  const meta: Record<string, unknown> = {};
  let currentKey = "";
  let inArray = false;
  const arrayValues: string[] = [];

  for (const line of yamlBlock.split("\n")) {
    const trimmed = line.trim();

    if (inArray && trimmed.startsWith("- ")) {
      arrayValues.push(trimmed.slice(2).replace(/^["']|["']$/g, ""));
      continue;
    }

    if (inArray) {
      meta[currentKey] = [...arrayValues];
      arrayValues.length = 0;
      inArray = false;
    }

    const kvMatch = trimmed.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const value = kvMatch[2].replace(/^["']|["']$/g, "");
      if (value === "") {
        inArray = true;
      } else {
        meta[currentKey] = value;
      }
    }
  }

  if (inArray) {
    meta[currentKey] = [...arrayValues];
  }

  return {
    meta: {
      title: (meta.title as string) || "",
      excerpt: (meta.excerpt as string) || "",
      date: (meta.date as string) || "",
      categories: (meta.categories as string[]) || [],
      readTime: (meta.readTime as string) || "",
      cover: (meta.cover as string) || "",
      authors: (meta.authors as string[]) || [],
    },
    content,
  };
}

export function markdownToArticle(filename: string, raw: string): Article {
  const id = filename.replace(/\.md$/, "");
  const { meta, content } = parseFrontMatter(raw);

  return {
    id,
    title: meta.title,
    excerpt: meta.excerpt,
    content,
    date: meta.date,
    categories: meta.categories,
    readTime: meta.readTime,
    cover: meta.cover || undefined,
    authors: meta.authors,
  };
}
