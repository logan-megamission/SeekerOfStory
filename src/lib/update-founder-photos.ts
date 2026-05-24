import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FOUNDER_PHOTOS } from "./founder-photos";

async function run() {
  for (const [slug, photoUrl] of Object.entries(FOUNDER_PHOTOS)) {
    await db.update(founders).set({ photoUrl }).where(eq(founders.slug, slug));
    console.log(`✓ ${slug} → ${photoUrl}`);
  }
}

run().catch(console.error);
