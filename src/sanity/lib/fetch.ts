import { sanityClient } from '@/src/sanity/config/client';
import {
  blogBySlugQuery,
  blogQuery,
  blogsByCategoryQuery,
  blogWithCodeQuery,
  featuredProjectsQuery,
  latestBlogsQuery,
  projectBySlugQuery,
  projectsQuery,
} from '@/src/sanity/queries';
import type { Blog, Project } from '@/src/types';

// Project functions
export async function getProjects(): Promise<Project[]> {
  return await sanityClient.fetch(projectsQuery);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return await sanityClient.fetch(projectBySlugQuery, { slug });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return await sanityClient.fetch(featuredProjectsQuery);
}

// Blog functions
export async function getBlogs(): Promise<Blog[]> {
  return await sanityClient.fetch(blogQuery);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return await sanityClient.fetch(blogBySlugQuery, { slug });
}

export async function getBlogsByCategory(
  categorySlug: string
): Promise<Blog[]> {
  return await sanityClient.fetch(blogsByCategoryQuery, { categorySlug });
}

export async function getLatestBlogs(): Promise<Blog[]> {
  return await sanityClient.fetch(latestBlogsQuery);
}

export async function getBlogsWithCode(): Promise<Blog[]> {
  return await sanityClient.fetch(blogWithCodeQuery);
}
