import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { from, to } = await req.json();

    if (!to || to.trim().length === 0) {
      return NextResponse.json(
        { error: "desired direction is required" },
        { status: 400 }
      );
    }

    const publishedFounders = await db
      .select({
        id: founders.id,
        slug: founders.slug,
        name: founders.name,
        businessName: founders.businessName,
        sector: founders.sector,
        dfwCity: founders.dfwCity,
        transitionFrom: founders.transitionFrom,
        transitionTo: founders.transitionTo,
        storyNumber: founders.storyNumber,
      })
      .from(founders)
      .where(eq(founders.status, "published"));

    if (publishedFounders.length === 0) {
      return NextResponse.json({ matches: [] });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are the Seeker of Story mentor-matching AI for DFW entrepreneurs.
Match seekers to the most relevant founders in our database.
Return ONLY a valid JSON array with this format:
[{"id": <founder_id>, "slug": "<slug>", "why": "<1-2 warm encouraging sentences explaining the connection>"}]
Always return at least one result. Find the most meaningful connection even if not a perfect match.`,
      messages: [
        {
          role: "user",
          content: `Seeker background: "${from || "not specified"}"
Seeker goal: "${to}"

Available founders:
${JSON.stringify(publishedFounders, null, 2)}

Return a JSON array of matched founders ordered by relevance, with a warm "why" explanation for each.`,
        },
      ],
    });

    const text = message.content
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("")
      .replace(/```json|```/g, "")
      .trim();

    const matches = JSON.parse(text);

    // Enrich with excerpt from full founder data
    const enriched = await Promise.all(
      matches.map(async (match: { id: number; slug: string; why: string }) => {
        const founder = publishedFounders.find((f) => f.id === match.id);
        return { ...match, founder };
      })
    );

    return NextResponse.json({ matches: enriched });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
