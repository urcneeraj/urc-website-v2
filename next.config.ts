import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** Lockfile in a parent folder (e.g. user home) makes Turbopack pick the wrong root; pin it to this app. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    optimizePackageImports: ["framer-motion", "recharts", "@phosphor-icons/react"],
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
