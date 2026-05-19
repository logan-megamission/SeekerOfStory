import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";

type FounderRow = {
  id: number;
  slug: string;
  name: string;
  businessName: string;
  sector: string;
  dfwCity: string;
  transitionFrom: string | null;
  transitionTo: string | null;
  industryTags: string[];
  whoTheyWere: string | null;
  storyNumber: number | null;
};

function scoreMatch(founder: FounderRow, from: string, to: string): number {
  const toWords = to.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const fromWords = from.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  const searchable = [
    founder.transitionFrom ?? "",
    founder.transitionTo ?? "",
    founder.sector,
    founder.businessName,
    founder.dfwCity,
    ...(founder.industryTags ?? []),
    founder.whoTheyWere ?? "",
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  for (const word of toWords) if (searchable.includes(word)) score += 3;
  for (const word of fromWords) if (searchable.includes(word)) score += 1;
  return score;
}

function buildWhy(founder: FounderRow): string {
  if (founder.transitionFrom && founder.transitionTo) {
    return `${founder.name} made the leap from ${founder.transitionFrom} to ${founder.transitionTo} — their blueprint maps directly to where you want to go.`;
  }
  return `${founder.name} built ${founder.businessName} from the ground up in the ${founder.sector} sector and has documented every step of the journey.`;
}

export async function POST(req: NextRequest) {
  try {
    const { from, to } = await req.json();

    if (!to?.trim()) {
      return NextResponse.json({ error: "desired direction is required" }, { status: 400 });
    }

    const publishedFounders: FounderRow[] = await db
      .select({
        id: founders.id,
        slug: founders.slug,
        name: founders.name,
        businessName: founders.businessName,
        sector: founders.sector,
        dfwCity: founders.dfwCity,
        transitionFrom: founders.transitionFrom,
        transitionTo: founders.transitionTo,
        industryTags: founders.industryTags,
        whoTheyWere: founders.whoTheyWere,
        storyNumber: founders.storyNumber,
      })
      .from(founders)
      .where(eq(founders.status, "published"));

    if (publishedFounders.length === 0) {
      return NextResponse.json({ matches: [] });
    }

    const matches = publishedFounders
      .map((founder) => ({
        id: founder.id,
        slug: founder.slug,
        why: buildWhy(founder),
        founder,
        score: scoreMatch(founder, from ?? "", to),
      }))
      .sort((a, b) => b.score - a.score)
      .map(({ score: _score, ...rest }) => rest);

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
