import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/presentation/components/Sidebar";
import ArticleCard from "@/presentation/components/ArticleCard";
import ArticleView from "@/presentation/components/ArticleView";
import RightSidebar from "@/presentation/components/RightSidebar";
import { useArticles, useSelectedArticle } from "@/presentation/hooks/useArticles";
import { getSiteConfig } from "@/infrastructure/config/loadConfig";
import { Menu } from "lucide-react";

const config = getSiteConfig();

const Index = () => {
  const [activeSection, setActiveSection] = useState("HOME");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { articles, filteredArticles, searchQuery, setSearchQuery } = useArticles();
  const { selectedArticle, setSelectedArticle, clearArticle } = useSelectedArticle();

  return (
    <div className="min-h-screen bg-background flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar
        activeSection={activeSection}
        onNavigate={(s) => {
          setActiveSection(s);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 lg:ml-60 min-w-0">
        <div className="lg:hidden sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground p-1">
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <span className="text-sm font-medium text-foreground">{config.tagline}</span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex gap-10">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {selectedArticle ? (
                <ArticleView key="article" article={selectedArticle} onBack={clearArticle} />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Home</h2>
                  {filteredArticles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} onClick={setSelectedArticle} />
                  ))}
                  {filteredArticles.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-16">
                      Nenhum artigo encontrado.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <RightSidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} articles={articles} />
        </div>
      </main>
    </div>
  );
};

export default Index;
