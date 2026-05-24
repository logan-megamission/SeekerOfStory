import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FOUNDERS_SEED } from "./founders-data";

async function seed() {
  console.log("Seeding founders...");
  for (const founder of FOUNDERS_SEED) {
    const existing = await db
      .select({ id: founders.id })
      .from(founders)
      .where(eq(founders.slug, founder.slug));

    if (existing.length > 0) {
      await db
        .update(founders)
        .set({
          storyNumber: founder.storyNumber,
          photoUrl: founder.photoUrl ?? null,
          youtubeUrl: founder.youtubeUrl ?? null,
        })
        .where(eq(founders.slug, founder.slug));
      console.log(`  ↻ ${founder.name} (updated)`);
    } else {
      await db.insert(founders).values(founder);
      console.log(`  ✓ ${founder.name}`);
    }
  }
  console.log("Done.");
}

seed().catch(console.error);
