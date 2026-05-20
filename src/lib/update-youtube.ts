import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";

async function run() {
  await db.update(founders)
    .set({ youtubeUrl: "https://www.youtube.com/watch?v=iuRwc-qltDw" })
    .where(eq(founders.slug, "susy-gordon"));
  console.log("✓ Susy Gordon — YouTube updated");

  await db.update(founders)
    .set({ youtubeUrl: "https://www.youtube.com/watch?v=ZLsCSR3qOPs" })
    .where(eq(founders.slug, "carrie-carter"));
  console.log("✓ Carrie Carter — YouTube updated");

  await db.update(founders)
    .set({ youtubeUrl: "https://www.youtube.com/watch?v=aE1aTApYzDg" })
    .where(eq(founders.slug, "yoel-zehaie"));
  console.log("✓ Yoel Zehaie — YouTube updated");
}

run().catch(console.error);
