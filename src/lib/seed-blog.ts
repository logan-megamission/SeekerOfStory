import { db } from "@/db";
import { posts } from "@/db/schema";

const POST = {
  slug: "you-dont-need-another-subscription",
  title: "You Don't Need Another Subscription. You Need Someone Who's Already Been There.",
  excerpt:
    "Career transitioners spend hundreds on platforms that teach theories. What actually moves the needle is a real founder who walked your exact path — and is willing to talk.",
  sectorTags: ["Career Transition", "Mentorship", "DFW"],
  status: "published" as const,
  publishedAt: new Date("2026-05-19"),
  body: `You've done the LinkedIn Premium trial. You've watched the Masterclass. You've paid for the career coaching session that gave you a tidy framework and zero traction.

And you're still standing at the same edge. Still asking the same question: how do I actually make this leap?

Here's what most platforms won't tell you: frameworks don't move people. Stories do.

---

When someone has walked the exact path you're standing on — not a version of it, not a general analogy, but the actual path — something shifts. You stop theorizing and start seeing.

You see the vendor they used to build the website. The first client they landed and how. The moment they almost quit and why they didn't. The thing nobody warned them about.

That's not coaching. That's a blueprint.

---

Seeker of Story was built on a simple premise: somewhere in DFW, there is a founder who has already done the thing you're trying to do. They built the law firm. They launched the tour company. They left the corporate career after 25 years and built something entirely their own.

And most of them are willing to talk — not because they're being paid to, but because they remember what it felt like to need someone who had already been there.

The Goodwill Principle: people give what they've outgrown so someone else doesn't have to start from scratch.

---

You don't need another subscription.

You need a name, a story, and a conversation.

Search the Becoming Database at seekerofstory.com — and find the founder who already walked your path.

Matthew 7:7 — Seek and you shall find.`,
};

async function seed() {
  console.log("Seeding blog post...");
  await db.insert(posts).values(POST).onConflictDoNothing();
  console.log(`  ✓ "${POST.title}"`);
  console.log("Done.");
}

seed().catch(console.error);
