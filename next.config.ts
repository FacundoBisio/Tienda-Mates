import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
