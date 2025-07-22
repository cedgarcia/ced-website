import { groq } from 'next-sanity';

export const projectsQuery = groq`*[_type == "project"]{
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "imageCaption": image.caption,
  shortDescription,
  url,
  overview,
  "imageGallery": imageGallery[]{
    "url": asset->url,
    alt,
    caption
  },
  metaTitle,
  metaDescription,
  metaKeywords
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "imageCaption": image.caption,
  shortDescription,
  url,
  overview,
  "imageGallery": imageGallery[]{
    "url": asset->url,
    alt,
    caption
  },
  metaTitle,
  metaDescription,
  metaKeywords
}`;

export const featuredProjectsQuery = groq`*[_type == "project"] | order(_createdAt desc)[0..5]{
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "imageCaption": image.caption,
  shortDescription,
  url
}`;
