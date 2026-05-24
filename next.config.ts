import type { NextConfig } from "next";

const repoBasePath = process.env.NODE_ENV === "production" ? "/my" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
