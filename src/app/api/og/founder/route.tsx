import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";

  let name = "Seeker of Story";
  let business = "";
  let from = "";
  let to = "";
  let sector = "";
  let city = "Fort Worth, TX";

  try {
    const [f] = await db
      .select({
        name: founders.name,
        businessName: founders.businessName,
        transitionFrom: founders.transitionFrom,
        transitionTo: founders.transitionTo,
        sector: founders.sector,
        dfwCity: founders.dfwCity,
      })
      .from(founders)
      .where(eq(founders.slug, slug))
      .limit(1);

    if (f) {
      name = f.name;
      business = f.businessName;
      from = f.transitionFrom ?? "";
      to = f.transitionTo ?? "";
      sector = f.sector;
      city = `${f.dfwCity}, TX`;
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
          background: "#2C2C2C",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
            SEEKER OF STORY
          </span>
          <span style={{ color: "#6B6B6B", fontSize: "13px" }}>·</span>
          <span style={{ color: "#6B6B6B", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
            {city}
          </span>
        </div>

        {/* Middle: name + business */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ color: "#C9A84C", fontSize: "13px", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
            Founding Story
          </div>
          <div style={{ color: "white", fontSize: "72px", fontWeight: "300", lineHeight: "1.05" }}>
            {name}
          </div>
          {business && (
            <div style={{ color: "#2A7B7B", fontSize: "22px", fontFamily: "Arial, sans-serif", fontWeight: "500" }}>
              {business}
            </div>
          )}
          {from && to && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
              <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "6px 16px", fontSize: "16px", fontFamily: "Arial, sans-serif" }}>
                {from}
              </span>
              <span style={{ color: "#C9A84C", fontSize: "20px" }}>→</span>
              <span style={{ background: "#C9A84C", color: "white", padding: "6px 16px", fontSize: "16px", fontFamily: "Arial, sans-serif" }}>
                {to}
              </span>
            </div>
          )}
        </div>

        {/* Bottom: tagline + sector */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
            Real founders. Real blueprints. Zero paywalls.
          </span>
          {sector && (
            <span style={{ color: "#C9A84C", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,168,76,0.3)", padding: "6px 14px", fontFamily: "Arial, sans-serif" }}>
              {sector}
            </span>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
