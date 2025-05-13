import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer && isProd) {
      config.externals = {
        ...config.externals,
        swiper: "Swiper",
      };
    }
    return config;
  },
};

export default nextConfig;
