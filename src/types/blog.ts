import type { PortableTextBlock } from '@portabletext/types';

export type Blog = {
  _id: string;
  slug: string;
  title: string;
  image: string;
  readTime: number;
  author: BlogAuthor;
  content: PortableTextBlock;
  category: BlogCategory;
  relatedPosts: Blog[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
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
