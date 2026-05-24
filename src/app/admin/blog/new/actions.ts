"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { slugify } from "@/lib/slugify";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return;

  const slug = slugify(title);

  const [created] = await db
    .insert(posts)
    .values({ title, slug, status: "draft" })
    .returning({ id: posts.id });

  redirect(`/admin/blog/${created.id}`);
}
