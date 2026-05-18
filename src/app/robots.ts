import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/onboard/", "/api/"],
      },
    ],
    sitemap: "https://seekerofstory.com/sitemap.xml",
  };
}
