import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
