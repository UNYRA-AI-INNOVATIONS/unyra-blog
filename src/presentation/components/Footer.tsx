import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            key="scroll-top"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="fixed bottom-20 right-5 lg:bottom-8 lg:right-8 z-50 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors shadow-md"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronUp size={16} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="mt-32 border-t border-border">
      <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-1 text-sm text-muted-foreground">
        <span>
          &copy; {year}{" "}
          <strong className="text-foreground font-semibold">Unyra</strong>.{" "}
          Alguns direitos reservados.
        </span>
        <span>
          Feito com{" "}
          <strong className="text-foreground font-semibold">Fluid Muse</strong>{" "}
          blog template.
        </span>
      </div>
    </footer>
    </>
  );
};

export default Footer;
