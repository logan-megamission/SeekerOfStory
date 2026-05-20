import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FounderCard } from "@/components/founders/FounderCard";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata = {
  title: "Founding Stories | Seeker of Story",
  description:
    "DFW founders who documented their roadmap. Find the one who walked your path.",
};

const SECTORS = [
  "All",
  "Legal",
  "Hospitality",
  "Tech",
  "Real Estate",
  "Health",
  "Media",
  "Retail",
  "Finance",
  "Other",
];

export default async function FoundersPage() {
  let allFounders: Array<{
    id: number;
    slug: string;
    storyNumber: number | null;
    name: string;
    businessName: string;
    photoUrl: string | null;
    sector: "Legal" | "Hospitality" | "Tech" | "Real Estate" | "Health" | "Media" | "Retail" | "Finance" | "Other";
    dfwCity: "Fort Worth" | "Dallas" | "Arlington" | "Frisco" | "Plano" | "McKinney" | "Irving" | "Garland" | "Grand Prairie" | "Other";
    transitionFrom: string | null;
    transitionTo: string | null;
    whoTheyWere: string | null;
  }> = [];

  try {
    allFounders = await db
      .select({
        id: founders.id,
        slug: founders.slug,
        storyNumber: founders.storyNumber,
        name: founders.name,
        businessName: founders.businessName,
        photoUrl: founders.photoUrl,
        sector: founders.sector,
        dfwCity: founders.dfwCity,
        transitionFrom: founders.transitionFrom,
        transitionTo: founders.transitionTo,
        whoTheyWere: founders.whoTheyWere,
      })
      .from(founders)
      .where(eq(founders.status, "published"))
      .orderBy(founders.storyNumber);
  } catch {
    // DB not connected yet
  }

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>THIS MISSION IS NO LONGER PROOF OF CONCEPT</SectionLabel>
        <h1
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Meet the <em className="italic text-gold">Founding Stories</em>
        </h1>
        <p
          className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Living blueprints from people who chose to document the becoming, not just the outcome.
        </p>
      </section>

      {/* Sector filter chips — client-side filtering would go here */}
      <div className="bg-warm-white border-b border-sos-border px-8 py-4 flex gap-2 flex-wrap">
        {SECTORS.map((sector) => (
          <span
            key={sector}
            className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase px-3 py-1 border border-sos-border text-mid-gray cursor-pointer hover:border-gold hover:text-gold-dark transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {sector}
          </span>
        ))}
      </div>

      {/* Grid */}
      <section className="bg-warm-white py-12 px-8">
        <div className="max-w-[1100px] mx-auto">
          {allFounders.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 bg-sos-border max-md:grid-cols-1">
              {allFounders.map((founder) => (
                <FounderCard
                  key={founder.id}
                  founder={{
                    ...founder,
                    excerpt: founder.whoTheyWere ? founder.whoTheyWere.slice(0, 160) + "…" : undefined,
                  }}
                />
              ))}
              {/* Placeholder spots up to 10 */}
              {Array.from({ length: Math.max(0, 6 - allFounders.length) }).map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="bg-cream opacity-40"
                >
                  <div className="w-full h-[160px] bg-light-gray flex items-center justify-center">
                    <span
                      className="font-serif italic text-mid-gray text-[0.9rem]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Story Coming Soon
                    </span>
                  </div>
                  <div className="p-6 border-t-[3px] border-gold">
                    <span
                      className="block text-[0.56rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Founding Story #{String(allFounders.length + i + 1).padStart(3, "0")}
                    </span>
                    <h3
                      className="font-serif text-[1.4rem] font-normal text-mid-gray mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Your Name Here
                    </h3>
                    <p
                      className="text-[0.75rem] text-mid-gray font-light italic mb-4"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Your story belongs here.
                    </p>
                    <a
                      href="https://calendly.com/susy-megamissionmedia/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark border-b border-gold-light pb-0.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Claim This Spot →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-mid-gray py-20 font-serif italic text-lg">
              Founding stories coming soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
