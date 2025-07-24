import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.10minuteschool.com',
      },
    ],
  },
};

export default nextConfig;
