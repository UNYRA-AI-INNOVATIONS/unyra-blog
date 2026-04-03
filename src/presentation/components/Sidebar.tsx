import { motion } from "framer-motion";
import { Home, Layers, Tag, Archive, User, X, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getSiteConfig } from "@/infrastructure/config/loadConfig";

const iconMap: Record<string, LucideIcon> = { Home, Layers, Tag, Archive, User };

const config = getSiteConfig();

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ activeSection, onNavigate, isOpen, onClose }: SidebarProps) => {
  return (
    <motion.aside
      initial={false}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-screen w-60 bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 text-sidebar-foreground hover:text-foreground transition-colors"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      <div className="p-6 flex flex-col items-center border-b border-sidebar-border">
        <motion.div
          className="w-20 h-20 rounded-full mb-4 ring-1 ring-border bg-muted flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <UserRound size={36} strokeWidth={1.2} className="text-muted-foreground" />
        </motion.div>
        <h1 className="text-base font-semibold text-sidebar-accent-foreground">
          {config.name}
        </h1>
        <p className="text-xs text-sidebar-foreground mt-0.5">{config.tagline}</p>
      </div>

      <nav className="flex-1 p-4 space-y-0.5">
        {config.nav.map((item) => {
          const Icon = iconMap[item.icon] || Home;
          const isActive = activeSection === item.label;
          return (
            <motion.button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Icon size={16} strokeWidth={1.5} />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-0.5 h-6 bg-foreground rounded-r"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
