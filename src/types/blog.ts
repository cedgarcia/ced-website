import type { PortableTextBlock } from '@portabletext/types';

export type Blog = {
  _id: string;
  slug: string;
  title: string;
  image: string;
  readTime: number;
  author: BlogAuthor;
  content: PortableTextBlock[] | null;
  category: BlogCategory;
  relatedPosts: Blog[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  publishedDate?: string;
  enableTableOfContents?: boolean;
};

export type BlogCategory = {
  title: string;
  slug: string;
};

export type BlogAuthor = {
  name: string;
  description: string;
  image: string;
};
