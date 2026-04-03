import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FolderOpen, Folder } from "lucide-react";
import type { Article } from "@/domain/types";

interface Props {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export default function CategoriasView({ articles, onArticleClick }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  // Agrupa: categoria principal → subcategorias → artigos
  const grouped = articles.reduce<Record<string, Record<string, Article[]>>>((acc, article) => {
    const [main = "Sem categoria", sub = "Geral"] = article.categories;
    if (!acc[main]) acc[main] = {};
    if (!acc[main][sub]) acc[main][sub] = [];
    acc[main][sub].push(article);
    return acc;
  }, {});

  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <motion.div
      key="categorias"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="text-3xl font-light text-foreground mb-8">Categorias</h1>

      <div className="space-y-3">
        {Object.entries(grouped).map(([main, subs]) => {
          const isOpen = open[main] ?? true;
          const totalPosts = Object.values(subs).reduce((s, a) => s + a.length, 0);
          const totalSubs = Object.keys(subs).length;

          return (
            <div key={main} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(main)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-card hover:bg-accent/30 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FolderOpen size={15} className="text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-foreground/80">{main}</span>
                  <span className="text-xs text-muted-foreground">
                    {totalSubs} {totalSubs === 1 ? "categoria" : "categorias"} , {totalPosts} {totalPosts === 1 ? "post" : "posts"}
                  </span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} className="text-muted-foreground" strokeWidth={1.5} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {Object.entries(subs).map(([sub, arts]) => (
                      <div key={sub} className="border-t border-border/50">
                        <button
                          onClick={() => onArticleClick(arts[0])}
                          className="w-full flex items-center gap-2.5 px-8 py-3 hover:bg-accent/20 transition-colors text-left"
                        >
                          <Folder size={13} className="text-muted-foreground" strokeWidth={1.5} />
                          <span className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                            {sub}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            {arts.length} {arts.length === 1 ? "post" : "posts"}
                          </span>
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
