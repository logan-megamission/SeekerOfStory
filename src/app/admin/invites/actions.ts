"use server";

import { db } from "@/db";
import { founderInvites } from "@/db/schema";
import { and, eq } from "drizzle-orm";
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

export async function cancelFounderInvite(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid invite.");
  }

  await db
    .update(founderInvites)
    .set({ status: "cancelled" })
    .where(and(eq(founderInvites.id, id), eq(founderInvites.status, "pending")));

  revalidatePath("/admin/invites");
}
