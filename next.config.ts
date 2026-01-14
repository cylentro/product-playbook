import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Set turbopack root to silence warnings and ensure correct path resolution
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Since we need to access files outside the app directory, we add experimental features
  serverExternalPackages: ['gray-matter', 'remark', 'remark-html'],
};

export default nextConfig;
