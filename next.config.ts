import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
