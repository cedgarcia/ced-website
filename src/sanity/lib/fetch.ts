import { sanityClient } from '../config/client';
import { projectsQuery, projectBySlugQuery } from '../queries/projects-query';
import { blogQuery, blogBySlugQuery } from '../queries/blogs-query';
import type { Project } from '@/src/types/project';
import type { Blog } from '@/src/types/blog';

// Project functions
export async function getProjects(): Promise<Project[]> {
  return await sanityClient.fetch(projectsQuery);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return await sanityClient.fetch(projectBySlugQuery, { slug });
}

// Blog functions
export async function getBlogs(): Promise<Blog[]> {
  return await sanityClient.fetch(blogQuery);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return await sanityClient.fetch(blogBySlugQuery, { slug });
}
