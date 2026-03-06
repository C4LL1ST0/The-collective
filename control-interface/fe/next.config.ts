import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // ...other config options...
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
