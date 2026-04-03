<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0f0f,100:1a1a2e&height=200&section=header&text=FLUID%20MUSE&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=um%20blog.%20um%20template.%20seu.&descAlignY=58&descSize=18&descColor=888888" width="100%" />

<br/>

[![React](https://img.shields.io/badge/React_18-0f0f0f?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-0f0f0f?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-0f0f0f?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-0f0f0f?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com)
[![MIT](https://img.shields.io/badge/MIT-0f0f0f?style=for-the-badge&logoColor=white)](./LICENSE)

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=15&pause=1000&color=888888&center=true&vCenter=true&width=480&lines=markdown+%E2%86%92+blog+em+segundos;configurado+num+arquivo+s%C3%B3;mobile-first%2C+animado%2C+limpo;feito+pra+quem+quer+escrever+bem" alt="typing" />

</div>

---

## ├─ o que tem aqui

> um template de blog construído em cima de markdown puro — sem CMS, sem banco, sem complicação.

<br/>

| ✦ | funcionalidade | como funciona |
|:---:|:---|:---|
| `⬚` | **artigos em markdown** | frontmatter com title, date, tags, summary e cover |
| `◈` | **busca em tempo real** | filtra título e conteúdo sem reload |
| `▤` | **sidebar no desktop** | navegação lateral fixa, seções configuráveis |
| `▦` | **navbar inferior no mobile** | barra nativa, sem hamburguer |
| `◉` | **animações** | transições com Framer Motion |
| `◻` | **responsivo** | mobile-first, qualquer tela |
| `⟡` | **config central** | nome, nav, tags, autor — tudo num arquivo só |
| `⟐` | **tipografia** | `@tailwindcss/typography` pro conteúdo respirar |

---

## ├─ stack

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   react 18          interface                        │
│   vite              bundler mais rápido              │
│   typescript        sem adivinhação de tipos         │
│   tailwind css      sem arquivos css separados       │
│   shadcn/ui         componentes acessíveis           │
│   framer motion     animações com propósito          │
│   react router      roteamento                       │
│   vitest            testes unitários                 │
│   playwright        testes E2E                       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## ├─ começo rápido

```bash
# clonar
git clone https://github.com/seu-usuario/fluid-muse-blog.git
cd fluid-muse-blog

# instalar e rodar
pnpm install && pnpm dev
```

```
→ http://localhost:5173
```

---

## ├─ personalizando

**tudo começa aqui:**

```ts
// content/config.ts

export const siteConfig = {
  name:    "nome do blog",
  tagline: "o que é esse lugar",

  nav: [
    { label: "HOME",       icon: "Home"    },
    { label: "CATEGORIAS", icon: "Layers"  },
    { label: "TAGS",       icon: "Tag"     },
    { label: "ARQUIVO",    icon: "Archive" },
    { label: "SOBRE",      icon: "User"    },
  ],

  tags: ["math", "code", "etc"],
};
```

---

## ├─ criando um artigo

**via script:**

```bash
bash scripts/article.sh nome-do-artigo
```

**ou manualmente** em `content/articles/nome.md`:

```markdown
---
title:   "título que prende atenção"
date:    "2024-01-01"
tags:    ["tag1", "tag2"]
summary: "uma linha que faz a pessoa querer ler."
cover:   "/covers/nome.jpg"
---

escreva aqui.
```

---

## ├─ estrutura

```
fluid-muse-blog/
│
├── content/
│   ├── config.ts              ◄ começa aqui
│   └── articles/              ◄ seus arquivos .md
│
├── public/
│   └── covers/                ◄ imagens de capa
│
└── src/
    ├── domain/
    │   └── types/             ◄ Article, etc
    │
    ├── infrastructure/
    │   ├── config/            ◄ leitura do config
    │   └── content/           ◄ parse dos markdowns
    │
    └── presentation/
        ├── components/        ◄ ArticleCard, Sidebar, BottomNav…
        ├── hooks/             ◄ useArticles
        └── pages/             ◄ Index
```

---

## ├─ scripts

```
pnpm dev        →  servidor de desenvolvimento
pnpm build      →  build de produção
pnpm preview    →  visualizar o build
pnpm test       →  testes unitários (vitest)
pnpm lint       →  lint (eslint)
```

---

## ╰─ licença

**MIT** — usa, modifica, distribui. sem restrição.

<br/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:0f0f0f&height=100&section=footer" width="100%" />

</div>
