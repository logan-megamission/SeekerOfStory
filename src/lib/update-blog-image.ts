import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

async function run() {
  await db
    .update(posts)
    .set({ coverImageUrl: "/blog-post-1.png" })
    .where(eq(posts.slug, "you-dont-need-another-subscription"));
  console.log("✓ Cover image updated");
}

run().catch(console.error);
