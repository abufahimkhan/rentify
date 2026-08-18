import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"], // allow external product images
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
