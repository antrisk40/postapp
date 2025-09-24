import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const srcPath = path.resolve("./src");
    console.log("Alias @ points to:", srcPath);  // 🔹 logs resolved path during build
    config.resolve.alias["@"] = srcPath;
    return config;
  },
};

export default nextConfig;
