import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Trash2 } from "lucide-react";
import { useComments } from "@/presentation/hooks/useComments";

interface CommentsSectionProps {
  articleId: string;
}

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `${mins} min atras`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atras`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d atras`;
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const CommentsSection = ({ articleId }: CommentsSectionProps) => {
  const { comments, addComment, deleteComment } = useComments(articleId);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor, informe seu nome.");
      return;
    }
    if (!text.trim() || text.trim().length < 3) {
      setError("Comentario muito curto.");
      return;
    }
    setError("");
    addComment(name, text);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground mb-8">
        <MessageSquare size={16} strokeWidth={1.5} />
        Comentarios
        {comments.length > 0 && (
          <span className="text-xs text-muted-foreground font-normal">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-10">
        <div className="relative">
          <User
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
          />
        </div>

        <textarea
          placeholder="Deixe um comentario..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={1000}
          className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
        />

        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400"
              >
                {error}
              </motion.p>
            )}
            {submitted && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-green-400"
              >
                Comentario publicado.
              </motion.p>
            )}
            {!error && !submitted && <span />}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            <Send size={12} strokeWidth={2} />
            Publicar
          </motion.button>
        </div>
      </form>

      {/* Lista */}
      <div className="space-y-5">
        <AnimatePresence initial={false}>
          {comments.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground text-center py-8"
            >
              Nenhum comentario ainda. Seja o primeiro!
            </motion.p>
          ) : (
            comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="group flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-card border border-border flex-shrink-0 flex items-center justify-center text-xs font-semibold text-muted-foreground uppercase select-none">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {c.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(c.createdAt)}
                      </span>
                      <motion.button
                        onClick={() => deleteComment(c.id)}
                        aria-label="Remover comentario"
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-all"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={12} strokeWidth={1.5} />
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-foreground leading-relaxed break-words">
                    {c.text}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CommentsSection;
