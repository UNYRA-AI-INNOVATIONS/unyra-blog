import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Folder, User } from "lucide-react";
import type { Article } from "@/domain/types";
import CommentsSection from "@/presentation/components/CommentsSection";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView = ({ article, onBack }: ArticleViewProps) => {
  const paragraphs = article.content.split("\n").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Voltar
      </motion.button>

      {article.cover && (
        <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} strokeWidth={1.5} />
          {article.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} strokeWidth={1.5} />
          {article.readTime}
        </span>
        <span className="flex items-center gap-1.5">
          <Folder size={14} strokeWidth={1.5} />
          {article.categories.join(", ")}
        </span>
        {article.authors.length > 0 && (
          <span className="flex items-center gap-1.5">
            <User size={14} strokeWidth={1.5} />
            {article.authors.join(", ")}
          </span>
        )}
      </div>

      <div className="border-t border-border pt-8 space-y-4">
        {paragraphs.length === 0 ? (
          <p className="text-muted-foreground italic">Conteudo em breve.</p>
        ) : (
          paragraphs.map((p, i) => {
            if (p.startsWith("### "))
              return <h3 key={i} className="text-lg font-semibold text-foreground mt-8 mb-2">{p.replace("### ", "")}</h3>;
            if (p.startsWith("## "))
              return <h2 key={i} className="text-xl font-semibold text-foreground mt-10 mb-3">{p.replace("## ", "")}</h2>;
            if (p.startsWith("# ")) return null;
            if (p.startsWith("- "))
              return <li key={i} className="text-secondary-foreground leading-relaxed ml-4 list-disc">{p.replace("- ", "")}</li>;
            return <p key={i} className="text-secondary-foreground leading-relaxed">{p}</p>;
          })
        )}
      </div>

      <CommentsSection articleId={article.id} />
    </motion.div>
  );
};

export default ArticleView;
