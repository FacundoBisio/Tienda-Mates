import type { NextConfig } from 'next';
import path from 'path';
import os from 'os';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config, { dev }) => {
    if (dev) {
      // Move webpack cache outside OneDrive to avoid EPERM rename errors
      config.cache = {
        type: 'filesystem',
        cacheDirectory: path.join(os.tmpdir(), 'tienda-mates-webpack-cache'),
      };
    }
    return config;
  },
};

export default nextConfig;
