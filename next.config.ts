import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 👈 This wild-card allows images from ANY secure online URL to load smoothly!
      },
    ],
  },
};

export default nextConfig;