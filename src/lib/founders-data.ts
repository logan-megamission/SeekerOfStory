import { FOUNDER_PHOTOS } from "./founder-photos";
import type { BlueprintItem, Founder, NewFounder } from "@/db/schema";

/** Canonical founder records — used for DB seeding and static fallback when DATABASE_URL is unset. */
export const FOUNDERS_SEED: NewFounder[] = [
  {
    slug: "susy-gordon",
    storyNumber: 1,
    photoUrl: FOUNDER_PHOTOS["susy-gordon"],
    name: "Susy Gordon",
    businessName: "Mega Mission Media",
    sector: "Media",
    dfwCity: "Fort Worth",
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
    youtubeUrl: "https://www.youtube.com/watch?v=iuRwc-qltDw",
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: "https://megamissionmedia.com",
    status: "published",
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "carrie-carter",
    storyNumber: 2,
    photoUrl: FOUNDER_PHOTOS["carrie-carter"],
    name: "Carrie Carter",
    businessName: "Cowtown Tour Company · ACN Entrepreneur",
    sector: "Hospitality",
    dfwCity: "Fort Worth",
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
    youtubeUrl: "https://www.youtube.com/watch?v=ZLsCSR3qOPs",
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: "https://www.cowtowntourco.com/",
    status: "published",
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "yoel-zehaie",
    storyNumber: 3,
    photoUrl: FOUNDER_PHOTOS["yoel-zehaie"],
    name: "Yoel Zehaie",
    businessName: "Zehaie Law",
    sector: "Legal",
    dfwCity: "Arlington",
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
    youtubeUrl: "https://www.youtube.com/watch?v=aE1aTApYzDg",
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: "https://www.CallYoelNow.com",
    status: "published",
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "lena-killion",
    storyNumber: 4,
    photoUrl: FOUNDER_PHOTOS["lena-killion"],
    name: "Lena Killion",
    businessName: "Coming Soon",
    sector: "Other",
    dfwCity: "Fort Worth",
    industryTags: [],
    transitionFrom: null,
    transitionTo: null,
    whoTheyWere: null,
    whatTheyBuilt: null,
    whyTheyBuiltIt: null,
    blueprint: [] as BlueprintItem[],
    youtubeUrl: null,
    spotifyEpisodeUrl: null,
    applePodcastUrl: null,
    buzzsproutUrl: null,
    websiteUrl: null,
    status: "published",
    publishedAt: new Date("2026-05-12"),
  },
];

export function getStaticPublishedFounders(): Founder[] {
  return FOUNDERS_SEED.filter((f) => f.status === "published")
    .sort((a, b) => (a.storyNumber ?? 0) - (b.storyNumber ?? 0))
    .map((f, index) => ({
      id: -(index + 1),
      slug: f.slug,
      storyNumber: f.storyNumber ?? null,
      name: f.name,
      businessName: f.businessName,
      photoUrl: f.photoUrl ?? null,
      photoPosition: f.photoPosition ?? null,
      sector: f.sector ?? "Other",
      industryTags: f.industryTags ?? [],
      dfwCity: f.dfwCity ?? "Fort Worth",
      transitionFrom: f.transitionFrom ?? null,
      transitionTo: f.transitionTo ?? null,
      whoTheyWere: f.whoTheyWere ?? null,
      whatTheyBuilt: f.whatTheyBuilt ?? null,
      whyTheyBuiltIt: f.whyTheyBuiltIt ?? null,
      blueprint: (f.blueprint ?? []) as BlueprintItem[],
      youtubeUrl: f.youtubeUrl ?? null,
      spotifyEpisodeUrl: f.spotifyEpisodeUrl ?? null,
      applePodcastUrl: f.applePodcastUrl ?? null,
      buzzsproutUrl: f.buzzsproutUrl ?? null,
      contactEmail: f.contactEmail ?? null,
      websiteUrl: f.websiteUrl ?? null,
      linkedinUrl: f.linkedinUrl ?? null,
      status: "published",
      publishedAt: f.publishedAt ?? null,
      createdAt: f.publishedAt ?? new Date("2026-05-12"),
      updatedAt: f.publishedAt ?? new Date("2026-05-12"),
    }));
}

export function getStaticFounderBySlug(slug: string): Founder | undefined {
  return getStaticPublishedFounders().find((f) => f.slug === slug);
}
