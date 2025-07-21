import { groq } from 'next-sanity';

export const blogQuery = groq`*[_type == "blog"]{
  _id,
  "slug": slug.current,
  title,
  "image": image.asset->url,
  readTime,
  author->{
    name,
    description,
    "image": image.asset->url
  },
  content,
  category->{
    title,
    "slug": slug.current
  },
  "relatedPosts": relatedPosts[]->{
    _id,
    "slug": slug.current,
    title,
    "image": image.asset->url,
    readTime,
    author->{
      name,
      description,
      "image": image.asset->url
    },
    category->{
      title,
      "slug": slug.current
    },
    metaTitle,
    metaDescription,
    metaKeywords
  },
  metaTitle,
  metaDescription,
  metaKeywords
}`;

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  "image": image.asset->url,
  readTime,
  author->{
    name,
    description,
    "image": image.asset->url
  },
  content,
  category->{
    title,
    "slug": slug.current
  },
  "relatedPosts": relatedPosts[]->{
    _id,
    "slug": slug.current,
    title,
    "image": image.asset->url,
    readTime,
    author->{
      name,
      "image": image.asset->url
    },
    category->{
      title,
      "slug": slug.current
    }
  },
  metaTitle,
  metaDescription,
  metaKeywords
}`;

export const blogsByCategoryQuery = groq`*[_type == "blog" && category->slug.current == $categorySlug]{
  _id,
  "slug": slug.current,
  title,
  "image": image.asset->url,
  readTime,
  author->{
    name,
    "image": image.asset->url
  },
  category->{
    title,
    "slug": slug.current
  },
  metaTitle,
  metaDescription
} | order(_createdAt desc)`;

export const latestBlogsQuery = groq`*[_type == "blog"] | order(_createdAt desc)[0..5]{
  _id,
  "slug": slug.current,
  title,
  "image": image.asset->url,
  readTime,
  author->{
    name,
    "image": image.asset->url
  },
  category->{
    title,
    "slug": slug.current
  }
}`;

export const blogWithCodeQuery = groq`*[_type == "blog"]{
  _id,
  "slug": slug.current,
  title,
  "image": image.asset->url,
  readTime,
  enableTableOfContents,
  author->{
    name,
    description,
    "image": image.asset->url
  },
  content[]{
    ...,
    _type == "codeBlock" => {
      _type,
      code,
      language,
      filename,
      highlightLines
    }
  },
  category->{
    title,
    "slug": slug.current
  },
  "relatedPosts": relatedPosts[]->{
    _id,
    "slug": slug.current,
    title,
    "image": image.asset->url,
    readTime,
    author->{
      name,
      "image": image.asset->url
    },
    category->{
      title,
      "slug": slug.current
    }
  },
  metaTitle,
  metaDescription,
  metaKeywords
}`;
