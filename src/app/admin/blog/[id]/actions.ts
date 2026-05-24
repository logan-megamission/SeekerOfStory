"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function savePost(data: {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string;
  sectorTags: string[];
  founderId: number | null;
  status: string;
}) {
  await db
    .update(posts)
    .set({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || null,
      body: data.body || null,
      coverImageUrl: data.coverImageUrl || null,
      sectorTags: data.sectorTags,
      founderId: data.founderId,
      status: data.status as "draft" | "published",
      publishedAt: data.status === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, data.id));

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${data.id}`);
}
