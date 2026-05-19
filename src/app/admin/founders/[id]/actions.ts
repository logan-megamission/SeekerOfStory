"use server";

import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { BlueprintItem } from "@/db/schema";

export async function saveFounder(data: {
  id: number;
  name: string;
  businessName: string;
  storyNumber: number | null;
  sector: string;
  dfwCity: string;
  transitionFrom: string;
  transitionTo: string;
  whoTheyWere: string;
  whatTheyBuilt: string;
  whyTheyBuiltIt: string;
  youtubeUrl: string;
  spotifyEpisodeUrl: string;
  applePodcastUrl: string;
  buzzsproutUrl: string;
  websiteUrl: string;
  linkedinUrl: string;
  contactEmail: string;
  photoUrl: string;
  blueprint: BlueprintItem[];
  status: string;
}) {
  await db
    .update(founders)
    .set({
      name:              data.name,
      businessName:      data.businessName,
      storyNumber:       data.storyNumber,
      sector:            data.sector as typeof founders.$inferInsert.sector,
      dfwCity:           data.dfwCity as typeof founders.$inferInsert.dfwCity,
      transitionFrom:    data.transitionFrom || null,
      transitionTo:      data.transitionTo || null,
      whoTheyWere:       data.whoTheyWere || null,
      whatTheyBuilt:     data.whatTheyBuilt || null,
      whyTheyBuiltIt:    data.whyTheyBuiltIt || null,
      youtubeUrl:        data.youtubeUrl || null,
      spotifyEpisodeUrl: data.spotifyEpisodeUrl || null,
      applePodcastUrl:   data.applePodcastUrl || null,
      buzzsproutUrl:     data.buzzsproutUrl || null,
      websiteUrl:        data.websiteUrl || null,
      linkedinUrl:       data.linkedinUrl || null,
      contactEmail:      data.contactEmail || null,
      photoUrl:          data.photoUrl || null,
      blueprint:         data.blueprint,
      status:            data.status as typeof founders.$inferInsert.status,
      publishedAt:       data.status === "published" ? new Date() : null,
      updatedAt:         new Date(),
    })
    .where(eq(founders.id, data.id));

  revalidatePath(`/founders/${data.id}`);
  revalidatePath("/founders");
  revalidatePath("/admin/founders");
  revalidatePath("/");
}

export async function uploadPhoto(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  const founderId = formData.get("founderId") as string;

  if (!file) throw new Error("No file provided");

  const { put } = await import("@vercel/blob");

  const ext = file.name.split(".").pop() ?? "jpg";
  const blob = await put(`founders/${founderId}-${Date.now()}.${ext}`, file, {
    access: "public",
  });

  return blob.url;
}
