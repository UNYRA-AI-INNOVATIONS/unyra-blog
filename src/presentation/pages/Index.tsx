import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/presentation/components/Sidebar";
import BottomNav from "@/presentation/components/BottomNav";
import ArticleCard from "@/presentation/components/ArticleCard";
import ArticleView from "@/presentation/components/ArticleView";
import RightSidebar from "@/presentation/components/RightSidebar";
import { useArticles, useSelectedArticle } from "@/presentation/hooks/useArticles";
import { Search } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("HOME");
  const { articles, filteredArticles, searchQuery, setSearchQuery } = useArticles();
  const { selectedArticle, setSelectedArticle, clearArticle } = useSelectedArticle();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeSection={activeSection}
        onNavigate={(s) => setActiveSection(s)}
        isOpen={false}
        onClose={() => {}}
      />

      <main className="flex-1 lg:ml-60 min-w-0 pb-16 lg:pb-0">
        {/* Mobile header with search */}
        <div className="lg:hidden sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
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
                  <h2 className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                    {activeSection.charAt(0) + activeSection.slice(1).toLowerCase()}
                  </h2>
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

      <BottomNav activeSection={activeSection} onNavigate={(s) => setActiveSection(s)} />
    </div>
  );
};

export default Index;
