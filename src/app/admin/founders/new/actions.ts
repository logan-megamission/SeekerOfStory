"use server";

import { db } from "@/db";
import { founders } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createFounder(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const businessName = (formData.get("businessName") as string)?.trim();

  if (!name || !businessName) return;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const [created] = await db
    .insert(founders)
    .values({ name, businessName, slug, status: "draft" })
    .returning({ id: founders.id });

  redirect(`/admin/founders/${created.id}`);
}
