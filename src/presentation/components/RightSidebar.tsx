import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getSiteConfig } from "@/infrastructure/config/loadConfig";
import type { Article } from "@/domain/types";

const config = getSiteConfig();

interface RightSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  articles: Article[];
}

const RightSidebar = ({ searchQuery, onSearchChange, articles }: RightSidebarProps) => {
  const recentTitles = articles.map((a) => a.title);

  return (
    <motion.aside
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="hidden xl:block w-64 shrink-0"
    >
      <div className="relative mb-8">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-widest">
          Recentes
        </h3>
        <ul className="space-y-2">
          {recentTitles.map((title, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors truncate"
            >
              {title}
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-widest">
          Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {config.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.03 }}
              whileHover={{ scale: 1.05 }}
              className="px-2.5 py-1 bg-tag text-tag-foreground text-xs rounded-md cursor-pointer hover:text-foreground border border-transparent hover:border-border transition-all"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default RightSidebar;
