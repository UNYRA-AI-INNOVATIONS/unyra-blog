import { motion } from "framer-motion";
import { Calendar, Folder, Clock, User } from "lucide-react";
import type { Article } from "@/domain/types";

interface ArticleCardProps {
  article: Article;
  index: number;
  onClick: (article: Article) => void;
}

const ArticleCard = ({ article, index, onClick }: ArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      onClick={() => onClick(article)}
      className="group cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:border-foreground/20 transition-colors duration-300"
    >
      {article.cover && (
        <div className="w-full h-40 sm:h-48 overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
          {article.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} strokeWidth={1.5} />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} strokeWidth={1.5} />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Folder size={12} strokeWidth={1.5} />
            {article.categories.join(", ")}
          </span>
          {article.authors.length > 0 && (
            <span className="flex items-center gap-1.5">
              <User size={12} strokeWidth={1.5} />
              {article.authors.join(", ")}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
