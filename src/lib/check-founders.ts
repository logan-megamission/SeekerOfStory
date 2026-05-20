import { db } from "@/db";
import { founders } from "@/db/schema";

async function run() {
  const rows = await db
    .select({ id: founders.id, name: founders.name, slug: founders.slug, storyNumber: founders.storyNumber })
    .from(founders)
    .orderBy(founders.storyNumber);
  console.log(JSON.stringify(rows, null, 2));
}

run().catch(console.error);
