import { motion } from "framer-motion";
import type { Article } from "@/domain/types";

interface Props {
  articles: Article[];
  onTagClick?: (tag: string) => void;
}

export default function TagsView({ articles, onTagClick }: Props) {
  // Conta quantas vezes cada tag/categoria aparece
  const tagCount = articles.reduce<Record<string, number>>((acc, article) => {
    article.categories.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(tagCount).sort(([a], [b]) => a.localeCompare(b));

  return (
    <motion.div
      key="tags"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="text-3xl font-light text-foreground mb-8">Tags</h1>

      <div className="flex flex-wrap gap-2.5">
        {sorted.map(([tag, count], i) => (
          <motion.button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.18 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card hover:border-foreground/30 hover:bg-accent/30 transition-colors text-sm text-foreground/70 hover:text-foreground"
          >
            <span>{tag}</span>
            <span className="text-xs text-muted-foreground">{count}</span>
          </motion.button>
        ))}

        {sorted.length === 0 && (
          <p className="text-muted-foreground text-sm py-8">Nenhuma tag encontrada.</p>
        )}
      </div>
    </motion.div>
  );
}
