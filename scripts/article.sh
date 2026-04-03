#!/usr/bin/env bash
# ============================================
#  Article Management Script
#  Usage:
#    ./scripts/article.sh new <slug>    — Create a new article
#    ./scripts/article.sh list          — List all articles
#    ./scripts/article.sh delete <slug> — Delete an article
# ============================================

set -euo pipefail

CONTENT_DIR="content/articles"

case "${1:-}" in
  new)
    SLUG="${2:?Usage: $0 new <slug>}"
    FILE="$CONTENT_DIR/$SLUG.md"
    if [ -f "$FILE" ]; then
      echo "Article '$SLUG' already exists."
      exit 1
    fi
    cat > "$FILE" <<EOF
---
title: "Titulo do Artigo"
excerpt: "Resumo breve do artigo."
date: "$(date +'%d de %b de %Y')"
categories:
  - Geral
readTime: "5 min"
cover: "/covers/$SLUG.jpg"
authors:
  - Seu Nome
---

Escreva seu conteudo aqui em Markdown.

## Secao

Texto da secao...
EOF
    echo "Created: $FILE"
    echo "Don't forget to add your cover image at: public/covers/$SLUG.jpg"
    echo "Edit the file and it will appear automatically in the portal."
    ;;

  list)
    echo "Articles in $CONTENT_DIR:"
    echo "---"
    for f in "$CONTENT_DIR"/*.md; do
      [ -f "$f" ] || continue
      SLUG=$(basename "$f" .md)
      TITLE=$(grep '^title:' "$f" | head -1 | sed 's/^title: *["]*//;s/["]*$//')
      echo "  $SLUG — $TITLE"
    done
    ;;

  delete)
    SLUG="${2:?Usage: $0 delete <slug>}"
    FILE="$CONTENT_DIR/$SLUG.md"
    if [ ! -f "$FILE" ]; then
      echo "Article '$SLUG' not found."
      exit 1
    fi
    rm "$FILE"
    echo "Deleted: $FILE"
    ;;

  *)
    echo "Usage:"
    echo "  $0 new <slug>     — Create a new article template"
    echo "  $0 list           — List all articles"
    echo "  $0 delete <slug>  — Delete an article"
    ;;
esac
