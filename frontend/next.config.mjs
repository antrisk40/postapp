import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true, // fixes ESM module resolution issues
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve("./src");
    return config;
  },
};

export default nextConfig;
