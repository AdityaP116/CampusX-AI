import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://campusx-ai.onrender.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/messages",
          "/profile",
          "/create",
          "/api/",
          "/register/complete",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

