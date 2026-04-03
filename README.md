# Portal Principal

Um blog/portal minimalista em preto e branco, construido com React + Vite + Tailwind. Projetado para ser facilmente personalizavel via fork.

## Estrutura (Clean Architecture)

```
content/                    # Conteudo (editavel)
  articles/                 # Artigos em Markdown (frontmatter YAML)
  config.ts                 # Configuracao do portal (nome, tags, nav)

public/
  covers/                   # Imagens de capa dos artigos

scripts/
  article.sh                # Script de gerenciamento de artigos

src/
  domain/                   # Camada de dominio
    types/                  # Interfaces e tipos (Article, etc.)

  infrastructure/           # Camada de infraestrutura
    content/                # Carregamento e parsing de Markdown
    config/                 # Carregamento da configuracao

  presentation/             # Camada de apresentacao
    components/             # Componentes visuais (Sidebar, ArticleCard, etc.)
    hooks/                  # Hooks customizados (useArticles)
    pages/                  # Paginas (Index)

  components/ui/            # Componentes base (shadcn/ui)
```

## Como Personalizar (Fork)

1. **Fork** este repositorio
2. Edite `content/config.ts` — mude nome, tagline, tags e navegacao
3. Adicione seus artigos em `content/articles/` como arquivos `.md`
4. Coloque imagens de capa em `public/covers/`
5. Personalize cores em `src/index.css` (variaveis CSS)
6. Deploy com `npm run build`

## Formato dos Artigos

Crie um arquivo `.md` em `content/articles/` com o formato:

```markdown
---
title: "Titulo do Artigo"
excerpt: "Resumo breve."
date: "01 de jan de 2025"
categories:
  - Categoria
readTime: "5 min"
cover: "/covers/minha-imagem.jpg"
authors:
  - Nome do Autor
  - Outro Autor
---

Conteudo em Markdown aqui...
```

### Campos do Frontmatter

| Campo        | Tipo       | Obrigatorio | Descricao                                      |
|--------------|------------|-------------|-------------------------------------------------|
| `title`      | string     | Sim         | Titulo do artigo                                |
| `excerpt`    | string     | Sim         | Resumo breve exibido no card                    |
| `date`       | string     | Sim         | Data de publicacao                              |
| `categories` | string[]   | Sim         | Lista de categorias/tags                        |
| `readTime`   | string     | Sim         | Tempo estimado de leitura                       |
| `cover`      | string     | Nao         | Caminho da imagem de capa (ex: `/covers/x.jpg`) |
| `authors`    | string[]   | Nao         | Lista de autores do artigo                      |

### Imagens de Capa

Coloque as imagens na pasta `public/covers/`. Formatos recomendados: `.jpg`, `.png`, `.webp`.

No frontmatter, referencie como `/covers/nome-da-imagem.jpg`.

## Gerenciando Artigos

### Via Script

```bash
# Criar novo artigo
./scripts/article.sh new meu-artigo

# Listar artigos
./scripts/article.sh list

# Deletar artigo
./scripts/article.sh delete meu-artigo
```

## Desenvolvimento

```bash
npm install
npm run dev
```

## Tecnologias

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v3
- Framer Motion
- Lucide Icons
