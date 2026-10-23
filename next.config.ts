import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion/react",
      "@react-three/drei",
    ],
  },
};
export default config;
