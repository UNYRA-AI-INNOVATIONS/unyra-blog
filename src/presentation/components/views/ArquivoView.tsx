import { motion } from "framer-motion";
import type { Article } from "@/domain/types";

interface Props {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const PT_MONTHS: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
};

/** Parseia datas no formato "30 de mar de 2025" ou ISO "2025-03-30" */
function parseDate(dateStr: string): Date {
  // Tenta formato "DD de MMM de YYYY"
  const ptMatch = dateStr.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
  if (ptMatch) {
    const day = parseInt(ptMatch[1], 10);
    const month = PT_MONTHS[ptMatch[2].toLowerCase().slice(0, 3)] ?? 0;
    const year = parseInt(ptMatch[3], 10);
    return new Date(year, month, day);
  }
  // Fallback para ISO ou outros formatos
  return new Date(dateStr);
}

function formatDate(dateStr: string) {
  const d = parseDate(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("pt-BR", { month: "short" }).replace(".", "");
  return { day, month };
}

export default function ArquivoView({ articles, onArticleClick }: Props) {
  // Agrupa por ano, ordena do mais recente
  const byYear = articles.reduce<Record<number, Article[]>>((acc, article) => {
    const year = parseDate(article.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <motion.div
      key="arquivo"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="text-3xl font-light text-foreground mb-8">Arquivo</h1>

      <div className="space-y-10">
        {years.map((year) => (
          <div key={year}>
            {/* Ano com linha */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xl font-light text-foreground/70">{year}</span>
              <div className="flex-1 h-px bg-border" />
              <div className="w-2 h-2 rounded-full bg-border" />
            </div>

            {/* Posts do ano */}
            <div className="ml-2 space-y-0">
              {byYear[year]
                .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
                .map((article, i) => {
                  const { day, month } = formatDate(article.date);
                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-0 group"
                    >
                      {/* Data */}
                      <div className="flex items-center gap-1.5 w-20 shrink-0 py-3">
                        <span className="text-sm tabular-nums text-muted-foreground">{day}</span>
                        <span className="text-xs text-muted-foreground/60">{month}</span>
                      </div>

                      {/* Linha do timeline */}
                      <div className="relative flex items-center mr-5">
                        <div className="w-px h-full absolute left-1/2 -translate-x-1/2 bg-border" />
                        <div className="w-2 h-2 rounded-full border border-border bg-background group-hover:bg-foreground/30 transition-colors z-10" />
                      </div>

                      {/* Título */}
                      <button
                        onClick={() => onArticleClick(article)}
                        className="flex-1 py-3 text-sm text-foreground/60 hover:text-foreground transition-colors text-left leading-relaxed"
                      >
                        {article.title}
                      </button>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}

        {years.length === 0 && (
          <p className="text-muted-foreground text-sm py-8">Nenhum artigo no arquivo.</p>
        )}
      </div>
    </motion.div>
  );
}
