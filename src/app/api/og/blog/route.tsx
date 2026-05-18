import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { posts, founders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";

  let title = "Seeker of Story Blog";
  let authorName = "";
  let authorBiz = "";
  let sectorTag = "";

  try {
    const [row] = await db
      .select({
        title: posts.title,
        sectorTags: posts.sectorTags,
        founderName: founders.name,
        founderBusiness: founders.businessName,
      })
      .from(posts)
      .leftJoin(founders, eq(posts.founderId, founders.id))
      .where(eq(posts.slug, slug))
      .limit(1);

    if (row) {
      title = row.title;
      authorName = row.founderName ?? "";
      authorBiz = row.founderBusiness ?? "";
      sectorTag = row.sectorTags?.[0] ?? "";
    }
  } catch {
    // DB not available
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#FAF7F2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          borderTop: "4px solid #C9A84C",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#C9A84C", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
            SEEKER OF STORY
          </span>
          {sectorTag && (
            <>
              <span style={{ color: "#DDD8CF" }}>·</span>
              <span style={{ color: "#6B6B6B", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
                {sectorTag}
              </span>
            </>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ color: "#2C2C2C", fontSize: "58px", fontWeight: "300", lineHeight: "1.1", fontFamily: "Georgia, serif", maxWidth: "900px" }}>
            {title}
          </div>
          {authorName && (
            <div style={{ color: "#6B6B6B", fontSize: "18px", fontFamily: "Arial, sans-serif" }}>
              By {authorName}{authorBiz ? ` · ${authorBiz}` : ""}
            </div>
          )}
        </div>

        <div style={{ color: "#8B6914", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
          seekerofstory.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
