import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FOUNDER_PHOTOS } from "./founder-photos";

const SEED_FOUNDERS = [
  {
    slug: "susy-gordon",
    storyNumber: 1,
    photoUrl: FOUNDER_PHOTOS["susy-gordon"],
    name: "Susy Gordon",
    businessName: "Mega Mission Media",
    sector: "Media" as const,
    dfwCity: "Fort Worth" as const,
    industryTags: ["Media", "Production", "Storytelling"],
    transitionFrom: "Story Collector",
    transitionTo: "Media Company Founder",
    whoTheyWere:
      "Susy Gordon is a story collector. She exists to find people's stories and share them so others can find their path. The car is her studio. The road is her stage. Every passenger carries a blueprint someone else needs.",
    whatTheyBuilt:
      "Mega Mission Media — a full media and production company powered by a mission to collect, document, and share the stories that change lives. What started in ministry evolved into a platform that gives founders a voice and seekers a blueprint.",
    whyTheyBuiltIt:
      "Because there is life and death in the power of the tongue. And the founder who shares their story has already spoken life into someone.",
    blueprint: [
      { category: "Website", value: "megamissionmedia.com", url: "https://megamissionmedia.com" },
      { category: "Platform", value: "Seeker of Story" },
      { category: "Mission", value: "Matthew 7:7 — Seek and you shall find" },
    ],
    youtubeUrl: null,
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: "https://megamissionmedia.com",
    status: "published" as const,
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "carrie-carter",
    storyNumber: 2,
    photoUrl: FOUNDER_PHOTOS["carrie-carter"],
    name: "Carrie Carter",
    businessName: "Cowtown Tour Company · ACN Entrepreneur",
    sector: "Hospitality" as const,
    dfwCity: "Fort Worth" as const,
    industryTags: ["Tourism", "Entrepreneurship", "ACN"],
    transitionFrom: "25 Years in Tech",
    transitionTo: "Tour Company Founder",
    whoTheyWere:
      "Carrie spent 25 years building a career in the technology industry. She was accomplished, established, and by every measure — successful. But something was calling her toward something more authentically her own.",
    whatTheyBuilt:
      "Cowtown Tour Company — Fort Worth's most vibrant guided tour experience. Bold flavors, real Fort Worth culture, guided group and private tours. She also expanded into ACN entrepreneurship, building a business on her own terms.",
    whyTheyBuiltIt:
      "Because Fort Worth's story deserves to be told — and she was the one to tell it. After decades of building someone else's vision, Carrie was ready to build her own. The rhinestones, the cowboy hat, the sparkle — that's not costume. That's identity.",
    blueprint: [
      { category: "Website", value: "cowtowntourco.com", url: "https://www.cowtowntourco.com/" },
      { category: "Contact", value: "682.233.3835" },
      { category: "Services", value: "Guided, Group & Private Tours" },
      { category: "Platform", value: "ACN Entrepreneurship" },
    ],
    youtubeUrl: null,
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: "https://www.cowtowntourco.com/",
    status: "published" as const,
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "yoel-zehaie",
    storyNumber: 3,
    photoUrl: FOUNDER_PHOTOS["yoel-zehaie"],
    name: "Yoel Zehaie",
    businessName: "Zehaie Law",
    sector: "Legal" as const,
    dfwCity: "Arlington" as const,
    industryTags: ["Law", "Criminal Defense", "Family Law"],
    transitionFrom: "Law School Graduate",
    transitionTo: "Law Firm Founder",
    whoTheyWere:
      "Yoel Zehaie completed law school with the knowledge and the credential — but the path from graduate to firm founder is one that nobody fully prepares you for. He had the degree. He needed the blueprint.",
    whatTheyBuilt:
      "Zehaie Law — a purpose-driven law practice built from the ground up. From the branding to the website to the jingle that anchors his identity, every asset was intentionally built to represent who he is and what he stands for.",
    whyTheyBuiltIt:
      "Because the law should be accessible. Because representation matters. Because building something of your own — with your name on the door — is worth every obstacle it takes to get there.",
    blueprint: [
      { category: "Website", value: "CallYoelNow.com", url: "https://www.CallYoelNow.com" },
      { category: "Sonic Brand", value: "Custom jingle by Mega Mission Media" },
      { category: "Ride & Share", value: "YouTube + Buzzsprout" },
      { category: "Practice Area", value: "Criminal Defense · Family Law · Civil Litigation" },
    ],
    youtubeUrl: null,
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: "https://www.CallYoelNow.com",
    status: "published" as const,
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "lena-killion",
    storyNumber: 4,
    photoUrl: FOUNDER_PHOTOS["lena-killion"],
    name: "Lena Killion",
    businessName: "Coming Soon",
    sector: "Other" as const,
    dfwCity: "Fort Worth" as const,
    industryTags: [],
    transitionFrom: null,
    transitionTo: null,
    whoTheyWere: null,
    whatTheyBuilt: null,
    whyTheyBuiltIt: null,
    blueprint: [],
    youtubeUrl: null,
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: null,
    status: "published" as const,
    publishedAt: new Date("2026-05-12"),
  },
];

async function seed() {
  console.log("Seeding founders...");
  for (const founder of SEED_FOUNDERS) {
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
