import { motion } from "framer-motion";
import { Home, Layers, Tag, Archive, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getSiteConfig } from "@/infrastructure/config/loadConfig";

const iconMap: Record<string, LucideIcon> = { Home, Layers, Tag, Archive, User };

const config = getSiteConfig();

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const BottomNav = ({ activeSection, onNavigate }: BottomNavProps) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-sidebar border-t border-sidebar-border">
      <div className="flex items-center justify-around h-16 px-2">
        {config.nav.map((item) => {
          const Icon = iconMap[item.icon] || Home;
          const isActive = activeSection === item.label;
          return (
            <motion.button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full px-1"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className={`flex items-center justify-center w-9 h-7 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 leading-none ${
                  isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                }`}
              >
                {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeBottomNav"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-foreground rounded-b"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
