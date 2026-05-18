import { SearchEngine } from "@/components/shared/SearchEngine";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FounderCard } from "@/components/founders/FounderCard";

export default async function HomePage() {
  let publishedFounders: Array<{
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
  }> = [];

  try {
    publishedFounders = await db
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
      })
      .from(founders)
      .where(eq(founders.status, "published"))
      .limit(4);
  } catch {
    // DB not yet connected — show page without founders
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-charcoal px-8 py-24 text-center relative overflow-hidden">
        <div className="absolute -top-[120px] -left-[120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(42,123,123,0.08)_0%,transparent_70%)] pointer-events-none" />

        <span
          className="block text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-6"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards", fontFamily: "var(--font-sans)" }}
        >
          SeekerofStory.com — Fort Worth, TX
        </span>

        <h1
          className="font-serif text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] text-white mb-2"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards", fontFamily: "var(--font-serif)" }}
        >
          Find the mentor who<br />
          <em className="italic text-gold">walked your path</em>
        </h1>

        <p
          className="font-serif text-[clamp(1rem,2.5vw,1.5rem)] font-light italic text-white/55 mb-6"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.6s forwards", fontFamily: "var(--font-serif)" }}
        >
          Real founders. Real blueprints. Zero paywalls.
        </p>

        <span
          className="text-[0.65rem] font-medium tracking-[0.22em] uppercase text-gold-dark border border-gold/30 px-6 py-2 inline-block mb-14"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.8s forwards", fontFamily: "var(--font-sans)" }}
        >
          Matthew 7:7 — Seek and you shall find
        </span>

        <SearchEngine />
      </section>

      {/* ── Featured Founders ── */}
      {publishedFounders.length > 0 && (
        <section className="bg-warm-white py-20 px-8">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12">
              <span
                className="block text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Proof of Concept — Already in Flight
              </span>
              <h2
                className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Meet the <em className="italic text-gold">Founding Stories</em>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-0.5 bg-sos-border max-md:grid-cols-1">
              {publishedFounders.map((founder) => (
                <FounderCard key={founder.id} founder={founder} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Founder CTA ── */}
      <section className="bg-cream border-t border-sos-border py-20 px-8 text-center">
        <div className="max-w-[680px] mx-auto">
          <span
            className="block text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-gold mb-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Are You a Founder?
          </span>
          <h2
            className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.2] text-charcoal mb-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Are you in a position to<br />
            <em className="italic text-gold">speak life into a seeker?</em>
          </h2>
          <p
            className="text-[0.85rem] font-light leading-[1.9] text-mid-gray mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            You have a blueprint someone else desperately needs. The path you walked — the
            pivots, the vendors, the lessons, the leap — could be the exact story that changes
            everything for someone who just lost their job, burned out on their 9-to-5, or is
            standing at the edge of their own beginning.
            <br /><br />
            If you&apos;ve made it and you&apos;re willing to give back — not with money, but with your
            story — we want to hear from you. Show up and share. We handle everything else.
          </p>
          <span
            className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold-dark border border-gold-light px-5 py-2 inline-block mb-9"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Proverbs 18:21 — Life and death are in the power of the tongue
          </span>
          <br />
          <BtnPrimary
            href="https://calendly.com/susy-megamissionmedia/30min"
            external
            className="mt-2"
          >
            Schedule Your Initial Call →
          </BtnPrimary>
        </div>
      </section>
    </>
  );
}
