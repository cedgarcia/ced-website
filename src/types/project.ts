import type { PortableTextBlock } from '@portabletext/types';

export type Project = {
  _id: string;
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  url: string;
  overview: PortableTextBlock;
  imageGallery: ProjectGalleryImage[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

export type ProjectGalleryImage = {
  url: string;
  alt: string;
};
