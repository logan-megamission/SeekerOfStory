import { db } from "@/db";
import { founders, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

async function run() {
  // ── Update Lena's founder record ─────────────────────────────────────────
  await db.update(founders)
    .set({
      storyNumber: 4,
      businessName: "MLK Pre Arrangements",
      sector: "Health",
      dfwCity: "Fort Worth",
      industryTags: [
        "Funeral Pre-Planning",
        "End-of-Life Services",
        "Veterans Benefits",
        "Notary Services",
        "Pre-Need Insurance",
        "Independent Broker",
      ],
      transitionFrom: "Aerospace / Corporate Sales",
      transitionTo: "Funeral Pre-Planning Entrepreneur",
      whoTheyWere: `M. Lena Killion has lived what she calls a really big life. A theater major by education, her career crossed multiple industries before landing where she was always meant to be. She began in construction — rare territory for a woman, and especially rare for a Black woman — and thrived there. She then moved into aerospace, working in purchasing at Bell Helicopter, managing supplier relationships and procurement across 30+ years in corporate America.

She was also a stay-at-home mother for 11 years. A competitive bodybuilder who won second place in her first competition at 35, then came back a year later with a custom-made costume and a full afro — and won first place in two categories. She has been featured in Glamour Magazine. She has been ballroom dancing. She has never done anything halfway.

COVID changed how she looked at life. The death of her grandmother — who left no burden on her family because she had pre-planned everything — planted a seed. Then a headhunter called about a position at one of DFW's largest funeral homes. Lena said no. The headhunter called back two months later. Lena heard it as a sign from her grandmother and took the job. She never looked back.`,
      whatTheyBuilt: `MLK Pre Arrangements is a funeral pre-planning and pre-need specialist company based in Fort Worth, Texas. Lena serves as an independent broker — not tied to any single funeral home or corporate entity. She works with approximately 40 funeral home locations across Texas and multiple states, matching families with the right provider for their budget, wishes, and values before death occurs.

She eliminates the worst-case scenario: a family sitting in a funeral home at their lowest, being handed a $15,000 invoice with no options and no advocate. Lena gives families the conversation before the crisis — so when the moment comes, the plan is already in place.

Services include consultations for pre-planning, veterans benefits specialist services, funeral service packages, marker design and placement, spaces for cremation and burial, pet cremation and burial, and notary services — all at no extra charge. She is a licensed pre-need agent in Texas, Illinois, California, Florida, and Pennsylvania, and a commissioned notary who can complete the full document process on the spot.`,
      whyTheyBuiltIt: `Her grandmother's passing was the defining moment. Her grandmother had pre-planned everything — life insurance, a pre-need arrangement, all decisions made in advance. No arguments at the funeral home. No financial burden left on the family. No one caught off guard. Lena watched that unfold and said: this is how we should all live.

Then she took a job inside a large corporate funeral home. She watched families come in at their absolute lowest — and be turned away because they could not afford the services. She could not refer them elsewhere without losing her job. She quit without a plan. She called it irresponsible. It was the beginning of everything.

She is building this so her sons never have to sit in that room without a plan. So families are protected before they ever need to be. So no one leaves a GoFundMe as their legacy.`,
      blueprint: [
        { category: "Website", value: "mlkprearrangements.com", url: "https://mlkprearrangements.com" },
        { category: "Email", value: "lena@mlkprearrangements.com", url: "mailto:lena@mlkprearrangements.com" },
        { category: "Phone", value: "682-552-6501 (cell / text)" },
        { category: "Office", value: "682-428-3134 x101" },
        { category: "Address", value: "1617 Park Place Ave, Suite 110-MLK, Fort Worth, TX 76110" },
        { category: "Licensed In", value: "TX, IL, CA, FL, PA — Pre-Need Agent + Notary" },
        { category: "Works With", value: "~40 independent funeral homes across TX and multiple states" },
        { category: "Upcoming Event", value: "Speed Networking — May 27th at Brooklyn's, Fort Worth" },
        { category: "Ride & Share", value: "YouTube + Buzzsprout" },
      ],
      youtubeUrl: "https://www.youtube.com/watch?v=WXf0HB7Sxd0",
      spotifyEpisodeUrl: "https://open.spotify.com/episode/4DlANKsZcvjwEsSc5Qy313",
      applePodcastUrl:
        "https://podcasts.apple.com/us/podcast/lena-killion-mlk-pre-arrangements-she-took-the-power/id1896645220?i=1000768686251",
      websiteUrl: "https://mlkprearrangements.com",
      contactEmail: "lena@mlkprearrangements.com",
      status: "published",
      publishedAt: new Date("2026-05-20"),
      updatedAt: new Date(),
    })
    .where(eq(founders.slug, "lena-killion"));
  console.log("✓ Lena Killion founder record updated");

  // ── Get Lena's founder ID ─────────────────────────────────────────────────
  const [lena] = await db
    .select({ id: founders.id })
    .from(founders)
    .where(eq(founders.slug, "lena-killion"));

  // ── Create blog post ──────────────────────────────────────────────────────
  await db.insert(posts).values({
    slug: "lena-killion-becoming",
    title: "From Bell Helicopter to the Funeral Home — How Lena Killion Became the Advocate Families Need Before They Need One",
    excerpt: "She was an aerospace buyer, a competitive bodybuilder, a stay-at-home mom, and a theater major. Then her grandmother died — and left nothing behind but a perfect plan. That changed everything.",
    founderId: lena.id,
    sectorTags: ["Funeral Pre-Planning", "Faith-Led Transition", "Fort Worth", "Female Founder", "Corporate Pivot"],
    status: "published",
    publishedAt: new Date("2026-05-20"),
    body: `There is a version of Lena Killion's life that looks like a résumé that can't make up its mind.

Theater major. Construction worker. Aerospace buyer at Bell Helicopter. Stay-at-home mother for eleven years. Competitive bodybuilder — second place her first time, first place in two categories the second time, with a custom costume and a full afro. Featured in Glamour Magazine. Ballroom dancer. Thirty-plus years in sales across industries that had nothing to do with each other.

But Lena doesn't see a scattered career. She sees a blueprint being assembled — one experience at a time — for the thing she was always going to build.

---

**The Grandmother**

COVID made people think about death. For Lena, it made her think about what death should look like.

Her grandmother died during that period. And her grandmother's death was different from most. There were no arguments at the funeral home. No financial crisis dropped on the family in the middle of grief. No one caught off guard by a $15,000 invoice they hadn't seen coming. Her grandmother had pre-planned everything — the life insurance, the pre-need arrangement, every decision made in advance. She had given her family the greatest possible gift: she left them nothing to figure out.

Lena watched that unfold and filed it away.

Then a headhunter called about a position at one of DFW's largest funeral homes. Lena said no. The headhunter called back two months later. Lena heard it differently the second time — like a message from her grandmother — and said yes.

She never looked back.

---

**What She Saw Inside**

Working inside a large corporate funeral home gave Lena the education she needed — and the wound that made her leave.

She learned the industry from the inside out. How it operates. How pricing works. How the relationships between funeral homes and suppliers move. She was good at it, the way she has always been good at anything she committed to.

But she also watched families come in at their absolute lowest and leave without help.

Families who couldn't afford the services were asked to go. No referrals. No guidance. No advocate to point them somewhere else — she would have lost her job. She sat across from people in the worst moments of their lives and had her hands tied.

She quit without a backup plan. She called it irresponsible. It was the most important thing she ever did.

---

**What She Built Instead**

MLK Pre Arrangements is not a funeral home. That's the first thing Lena will tell you.

She is an independent pre-need specialist — a broker who works with approximately 40 funeral home locations across Texas and multiple states, matching families with the right provider for their budget, their wishes, and their values. Before death occurs. Before the crisis. Before anyone is sitting in a room making decisions they're not equipped to make.

She gives families transparency, time, and a plan. Pre-need arrangements with no interest, no down payment, and payment terms of three, five, or ten years. If a client dies mid-payment, the balance is waived. Pricing locks in at today's rates no matter when death occurs.

She is also a licensed pre-need agent in five states, a commissioned notary, and someone who will sit with your family and complete every document — medical power of attorney, statutory durable power of attorney, HIPAA authorization — at no charge.

Her cousin's family was quoted $15,000 for a headstone. Lena built a spreadsheet of vendor options and got them the exact stone they wanted for $6,700. Delivered in three weeks.

"When people know better," she says, "they do better."

---

**The Morning the Phone Started Ringing**

She recorded a radio segment in October. She didn't think much of it.

Then it aired unexpectedly. At 5:40 in the morning, her phone started ringing. Back to back to back. She thought they were death calls — the industry term for a family reaching out after a loss. They weren't. They were people who had heard her on the radio and wanted to talk. It rang for two full days.

That was validation. That was the moment she knew she had built something real.

---

**What She Would Tell You**

Lena is not shy about what she believes. Her faith is not a performance — it's a foundation. She describes it as a tether. No matter how far out life takes her, there is always something to come back to. She doesn't preach it. She lives it.

For those who don't share her belief, she says simply: find something. Find a higher power, whatever that means to you. Find yoga. Find something and hold on to it so tightly that nothing can break what you feel. That is what allows you to move through life.

On entrepreneurship, she is equally direct. Networking is not only for people who already own businesses. It is for anyone trying to figure out what is next. You can walk into a room, say you are between things, describe your experience, and find your next door — or your next idea — right there.

On putting yourself into the work: there is not another Lena Killion. There is not another MLK Pre Arrangements. When you attach your full self to your work — your energy, your story, your uniqueness — it cannot be replicated.

On what success looks like: sitting across from a family and being able to say — you've got your ducks in a row. That is her whole definition. Families protected. Decisions made. Burdens lifted before they become burdens.

---

**Her Blueprint**

Lena's path is not one most people would plan. But if you watch it closely, every piece was preparation — the purchasing skills from aerospace, the 30 years of sales, the theater training that taught her how to read a room and command it, the bodybuilding that trained her to compete and come back harder the second time, the motherhood that made her think about what she was building and for whom.

She walked away from corporate America without a plan. She built something no one else has built quite this way. And she has a speed networking event on May 27th at Brooklyn's in Fort Worth that is open to anyone trying to figure out their next step.

If you're a veteran, a family protecting the people you love, a business looking for a group pre-planning package, or a church community looking for someone to speak the truth about what planning ahead actually means — Lena Killion is the call you make before you need to make one.

**mlkprearrangements.com · 682-552-6501**`,
  }).onConflictDoNothing();
  console.log("✓ Lena Killion blog post created");
}

run().catch(console.error);
