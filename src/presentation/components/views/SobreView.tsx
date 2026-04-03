import { motion } from "framer-motion";
import { getSiteConfig } from "@/infrastructure/config/loadConfig";

const config = getSiteConfig();

export default function SobreView() {
  return (
    <motion.div
      key="sobre"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-2xl"
    >
      <h1 className="text-3xl font-light text-foreground mb-8">Sobre</h1>

      <div className="prose prose-invert max-w-none space-y-4 text-foreground/70 leading-relaxed text-sm">
        <p>
        Muito mais que uma plataforma, a <strong className="text-foreground">{config.name}</strong> é um ecossistema de crescimento. Este blog é o nosso espaço dedicado a compartilhar conhecimento aplicado sobre inteligência artificial, tecnologia e o futuro do social commerce.
        </p>
        <p>
        Navegue por artigos que desmistificam machine learning, arquitetura de software, estratégias de validação de mercado e inovação. Traduzimos conceitos complexos em conteúdo acessível e prático.
        </p>
        <p>
        Feito com excelência para quem constrói, inova e busca aprender de verdade.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Para entrar em contato ou colaborar, acesse nossas redes sociais nas redes abaixo.
        </p>
      </div>
    </motion.div>
  );
}
