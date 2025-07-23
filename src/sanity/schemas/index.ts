import {
  blog,
  blogAuthor,
  blogCategory,
} from '@/src/sanity/schemas/blog-schema';
import { project } from '@/src/sanity/schemas/project-schema';

const schemas = [project, blog, blogCategory, blogAuthor];

export default schemas;
