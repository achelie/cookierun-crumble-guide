import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  // Next 16's export-mode dev server throws for unknown guide parameters.
  // Use normal routing in development; production remains a static export.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
