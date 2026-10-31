import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/safety",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/help",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/support",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
