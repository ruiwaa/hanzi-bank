import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pzhccdkehahljjhrwblv.supabase.co",
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
