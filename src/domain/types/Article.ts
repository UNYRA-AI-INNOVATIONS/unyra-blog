export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  categories: string[];
  readTime: string;
  cover?: string;
  authors: string[];
}
