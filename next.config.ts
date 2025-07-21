import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        // Optionally, you can specify path and port
        // pathname: '/images/**',
        // port: ''
      },
    ],
    // Optional: if you want to use custom image loader
    // loader: 'custom',
    // loaderFile: './lib/sanityImageLoader.js',
  },
  // Other Next.js config options can go here
};

export default nextConfig;
