import { siteSettings, aboutPage } from '@/src/sanity/schemas/site-schema';
import { project } from '@/src/sanity/schemas/project-schema';
import {
  blog,
  blogCategory,
  blogAuthor,
} from '@/src/sanity/schemas/blog-schema';

const schemas = [
  siteSettings,
  aboutPage,
  project,
  blog,
  blogCategory,
  blogAuthor,
];

export default schemas;
