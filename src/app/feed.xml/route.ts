import { NextResponse } from "next/server";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const BASE = "https://seekerofstory.com";
  let episodes: Array<{
    slug: string;
    name: string;
    businessName: string;
    whoTheyWere: string | null;
    whatTheyBuilt: string | null;
    spotifyEpisodeUrl: string | null;
    applePodcastUrl: string | null;
    youtubeUrl: string | null;
    publishedAt: Date | null;
    storyNumber: number | null;
  }> = [];

  try {
    episodes = await db
      .select({
        slug: founders.slug,
        name: founders.name,
        businessName: founders.businessName,
        whoTheyWere: founders.whoTheyWere,
        whatTheyBuilt: founders.whatTheyBuilt,
        spotifyEpisodeUrl: founders.spotifyEpisodeUrl,
        applePodcastUrl: founders.applePodcastUrl,
        youtubeUrl: founders.youtubeUrl,
        publishedAt: founders.publishedAt,
        storyNumber: founders.storyNumber,
      })
      .from(founders)
      .where(eq(founders.status, "published"));
  } catch {
    // DB not connected
  }

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const items = episodes
    .map((ep) => {
      const title = `${ep.name} | ${ep.businessName}`;
      const description = [ep.whoTheyWere, ep.whatTheyBuilt].filter(Boolean).join(" ").slice(0, 500);
      const pubDate = ep.publishedAt ? new Date(ep.publishedAt).toUTCString() : new Date().toUTCString();
      const link = `${BASE}/founders/${ep.slug}`;

      return `
    <item>
      <title>${escape(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${ep.spotifyEpisodeUrl ? `<podcast:alternateEnclosure type="audio/mpeg" length="0"><podcast:source uri="${escape(ep.spotifyEpisodeUrl)}" /></podcast:alternateEnclosure>` : ""}
      ${ep.youtubeUrl ? `<media:content url="${escape(ep.youtubeUrl)}" medium="video" />` : ""}
      <itunes:title>${escape(title)}</itunes:title>
      <itunes:summary>${escape(description)}</itunes:summary>
      <itunes:episode>${ep.storyNumber ?? ""}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:podcast="https://podcastindex.org/namespace/1.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SoS — Susy Gordon — Seeker of Story</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Founders pull back the curtain — no filters, no gatekeeping, no $997 courses. Free mentorship for DFW career transitioners. Fort Worth, TX.</description>
    <language>en-us</language>
    <copyright>© 2026 Seeker of Story / Mega Mission Media</copyright>
    <managingEditor>hello@seekerofstory.com (Susy Gordon)</managingEditor>
    <itunes:author>Susy Gordon</itunes:author>
    <itunes:owner>
      <itunes:name>Susy Gordon</itunes:name>
      <itunes:email>hello@seekerofstory.com</itunes:email>
    </itunes:owner>
    <itunes:category text="Business">
      <itunes:category text="Entrepreneurship" />
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
