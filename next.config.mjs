/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
    remotePatterns: [
      {
        hostname: "daisyui.com",
        protocol: "https",
      },
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
