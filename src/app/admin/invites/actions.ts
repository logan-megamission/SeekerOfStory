"use server";

import { db } from "@/db";
import { founderInvites } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createFounderInvite(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();

  if (!name || !email) {
    throw new Error("Name and email are required.");
  }

  await db.insert(founderInvites).values({ name, email });
  revalidatePath("/admin/invites");
}
