import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import schemas from './src/sanity/schemas';

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  title: process.env.NEXT_PUBLIC_SANITY_TITLE!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  basePath: process.env.NEXT_PUBLIC_SANITY_BASE_PATH!,
  plugins: [visionTool(), structureTool()],
  schema: { types: schemas },
});

export default config;
