import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import schemas from './src/sanity/schemas';

const config = defineConfig({
  projectId: 'l471ihxj',
  dataset: 'production',
  title: 'Ced Portfolio-2025',
  apiVersion: '2025-07-18',
  basePath: '/studio',
  plugins: [visionTool(), structureTool()],
  schema: { types: schemas },
});

export default config;
