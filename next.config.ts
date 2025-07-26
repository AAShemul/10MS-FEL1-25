import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.10minuteschool.com',
      },
      {
        hostname: 'dummyimage.com',
      },
    ],
  },
};

export default nextConfig;
