import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar, { SIDEBAR_WIDTH } from "@/presentation/components/Sidebar";
import BottomNav from "@/presentation/components/BottomNav";
import ArticleCard from "@/presentation/components/ArticleCard";
import ArticleView from "@/presentation/components/ArticleView";
import RightSidebar from "@/presentation/components/RightSidebar";
import { useArticles, useSelectedArticle } from "@/presentation/hooks/useArticles";
import { Search, Menu } from "lucide-react";
import Footer from "@/presentation/components/Footer";
import CategoriasView from "@/presentation/components/views/CategoriasView";
import TagsView from "@/presentation/components/views/TagsView";
import ArquivoView from "@/presentation/components/views/ArquivoView";
import SobreView from "@/presentation/components/views/SobreView";

const MOBILE_BREAKPOINT = 1024;

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");
  const { articles, filteredArticles, searchQuery, setSearchQuery } = useArticles();
  const { selectedArticle, setSelectedArticle, clearArticle } = useSelectedArticle();

  // Detecta breakpoint e abre/fecha sidebar conforme necessário
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      // Abre no desktop por padrão, fecha no mobile
      setSidebarOpen(!mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      <Sidebar
        activeSection={activeSection}
        onNavigate={(section) => {
          clearArticle();
          setActiveSection(section);
          if (isMobile) setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        isMobile={isMobile}
      />

      {/*
        Desktop: main empurra para a direita junto com a sidebar.
        Mobile: sidebar é overlay (fixed), main não se move.
      */}
      <motion.main
        className="flex-1 min-w-0 pb-16 lg:pb-0 flex flex-col min-h-screen"
        animate={{ marginLeft: !isMobile && sidebarOpen ? SIDEBAR_WIDTH : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.8 }}
      >
        {/* Top bar — botão menu sempre visível; busca só no mobile */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <motion.button
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Abrir menu"
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors ${
              !isMobile && sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <Menu size={16} strokeWidth={1.8} />
          </motion.button>

          {/* Busca: apenas mobile (some quando RightSidebar aparece) */}
          <div className="relative flex-1 max-w-sm sm:hidden">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-8 pr-4 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 flex gap-10 flex-1">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {selectedArticle ? (
                <ArticleView key="article" article={selectedArticle} onBack={clearArticle} />
              ) : activeSection === "CATEGORIAS" ? (
                <CategoriasView
                  key="categorias"
                  articles={articles}
                  onArticleClick={setSelectedArticle}
                />
              ) : activeSection === "TAGS" ? (
                <TagsView key="tags" articles={articles} />
              ) : activeSection === "ARQUIVO" ? (
                <ArquivoView
                  key="arquivo"
                  articles={articles}
                  onArticleClick={setSelectedArticle}
                />
              ) : activeSection === "SOBRE" ? (
                <SobreView key="sobre" />
              ) : (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                    Home
                  </h2>
                  {filteredArticles.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      index={i}
                      onClick={setSelectedArticle}
                    />
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

          <RightSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            articles={articles}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </motion.main>

      <BottomNav
        activeSection={activeSection}
        onNavigate={(section) => {
          clearArticle();
          setActiveSection(section);
        }}
      />
    </div>
  );
};

export default Index;
