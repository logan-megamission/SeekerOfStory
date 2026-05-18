import { db } from "@/db";
import { founders } from "@/db/schema";

const SEED_FOUNDERS = [
  {
    slug: "carrie-carter",
    storyNumber: 1,
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
    storyNumber: 2,
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
];

async function seed() {
  console.log("Seeding founders...");
  for (const founder of SEED_FOUNDERS) {
    await db
      .insert(founders)
      .values(founder)
      .onConflictDoNothing();
    console.log(`  ✓ ${founder.name}`);
  }
  console.log("Done.");
}

seed().catch(console.error);
