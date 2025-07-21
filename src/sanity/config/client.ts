import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: 'l471ihxj',
  dataset: 'production',
  apiVersion: '2025-07-18',
  // useCdn: process.env.NODE_ENV === 'production',
});
