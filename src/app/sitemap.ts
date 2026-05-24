import type { MetadataRoute } from "next";
import { db } from "@/db";
import { founders, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

const BASE = "https://seekerofstory.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/founders`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/listen`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/seek`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/fund`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
  ];

  let founderRoutes: MetadataRoute.Sitemap = [];
  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const publishedFounders = await db
      .select({ slug: founders.slug, updatedAt: founders.updatedAt })
      .from(founders)
      .where(eq(founders.status, "published"));

    founderRoutes = publishedFounders.map((f) => ({
      url: `${BASE}/founders/${f.slug}`,
      lastModified: f.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

    const publishedPosts = await db
      .select({ slug: posts.slug, updatedAt: posts.updatedAt })
      .from(posts)
      .where(eq(posts.status, "published"));

    postRoutes = publishedPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
  } catch {
    // DB not connected at build time
  }

  return [...staticRoutes, ...founderRoutes, ...postRoutes];
}
