import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export', // ❌ Disabled - incompatible with dynamic routes ([id], [token])
  // Note: For static export, we would need generateStaticParams() in all dynamic route pages
  images: {
    unoptimized: true, // Allows <Image> to work without optimization
  },
  trailingSlash: true, // Better for hosting compatibility
};

export default nextConfig;
