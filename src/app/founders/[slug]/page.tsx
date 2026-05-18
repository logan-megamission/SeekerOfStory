import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { VideoEmbed } from "@/components/shared/VideoEmbed";
import { BlueprintGrid } from "@/components/founders/BlueprintGrid";
import { JourneyPills } from "@/components/founders/JourneyPills";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [founder] = await db
      .select({ name: founders.name, businessName: founders.businessName, whoTheyWere: founders.whoTheyWere })
      .from(founders)
      .where(eq(founders.slug, slug))
      .limit(1);
    if (!founder) return {};
    return {
      title: `${founder.name} — ${founder.businessName} | Seeker of Story`,
      description: founder.whoTheyWere?.slice(0, 160) ?? undefined,
    };
  } catch {
    return {};
  }
}

export default async function FounderPage({ params }: Props) {
  const { slug } = await params;

  let founder;
  try {
    [founder] = await db
      .select()
      .from(founders)
      .where(eq(founders.slug, slug))
      .limit(1);
  } catch {
    notFound();
  }

  if (!founder || founder.status !== "published") notFound();

  const SPOTIFY_SHOW = "https://open.spotify.com/show/033gnWzSSrzzX3j6xw4Q4u";
  const APPLE_PODCASTS = "https://podcasts.apple.com/us/podcast/sos-susy-gordon-seeker-of-story/id1896645220";

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal">
        <div className="max-w-[820px] mx-auto">
          <div className="grid grid-cols-[200px_1fr] max-md:grid-cols-1">
            {founder.photoUrl ? (
              <div className="relative w-[200px] h-[270px] max-md:w-full max-md:h-[220px]">
                <Image
                  src={founder.photoUrl}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div className="w-[200px] h-[270px] bg-charcoal/50 max-md:hidden" />
            )}

            <div className="p-10 flex flex-col justify-center">
              {founder.storyNumber && (
                <span
                  className="block text-[0.56rem] font-semibold tracking-[0.25em] uppercase text-gold mb-3"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Founding Story #{String(founder.storyNumber).padStart(3, "0")}
                </span>
              )}
              <h1
                className="font-serif text-[2.2rem] font-light text-white mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {founder.name}
              </h1>
              <p
                className="text-[0.8rem] text-gold-light font-medium mb-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {founder.businessName}
              </p>
              <JourneyPills from={founder.transitionFrom} to={founder.transitionTo} />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-warm-white py-0">
        <div className="max-w-[820px] mx-auto px-10 py-10">

          {/* Video */}
          {founder.youtubeUrl && <VideoEmbed url={founder.youtubeUrl} />}

          {/* Podcast links */}
          {(founder.spotifyEpisodeUrl || founder.applePodcastUrl) && (
            <div className="flex gap-4 mb-8 flex-wrap">
              {founder.spotifyEpisodeUrl && (
                <Link
                  href={founder.spotifyEpisodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-mid-gray border border-sos-border px-4 py-2 hover:border-gold hover:text-gold-dark transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Listen on Spotify →
                </Link>
              )}
              {founder.applePodcastUrl && (
                <Link
                  href={founder.applePodcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-mid-gray border border-sos-border px-4 py-2 hover:border-gold hover:text-gold-dark transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Listen on Apple Podcasts →
                </Link>
              )}
            </div>
          )}

          {/* Story sections */}
          {[
            { label: "Who They Were", content: founder.whoTheyWere },
            { label: "What They Built", content: founder.whatTheyBuilt },
            { label: "Why They Built It", content: founder.whyTheyBuiltIt },
          ].map(({ label, content }) =>
            content ? (
              <div key={label} className="mb-8">
                <div
                  className="flex items-center gap-3 text-[0.58rem] font-bold tracking-[0.25em] uppercase text-gold mb-3"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {label}
                  <span className="flex-1 h-px bg-sos-border" />
                </div>
                <p
                  className="text-[0.84rem] leading-[1.9] text-charcoal font-light"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {content}
                </p>
              </div>
            ) : null
          )}

          {/* Blueprint */}
          {founder.blueprint && (founder.blueprint as unknown[]).length > 0 && (
            <div className="mb-8">
              <div
                className="flex items-center gap-3 text-[0.58rem] font-bold tracking-[0.25em] uppercase text-gold mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                How They Did It — The Blueprint
                <span className="flex-1 h-px bg-sos-border" />
              </div>
              <BlueprintGrid items={founder.blueprint as import("@/db/schema").BlueprintItem[]} />
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-10 pt-8 border-t border-sos-border text-center">
            <p
              className="text-[0.82rem] text-mid-gray font-light mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Ready to connect with a mentor who&apos;s walked your path?
            </p>
            <BtnPrimary
              href="https://calendly.com/susy-megamissionmedia/30min"
              external
            >
              Schedule a Call with Susy →
            </BtnPrimary>
          </div>
        </div>
      </section>

      {/* Podcast show links at bottom */}
      <section className="bg-cream border-t border-sos-border py-10 px-8 text-center">
        <p
          className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-gold mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Follow the Show
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href={SPOTIFY_SHOW} target="_blank" rel="noopener noreferrer"
            className="text-[0.62rem] tracking-[0.1em] uppercase text-mid-gray hover:text-gold transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}>
            Spotify
          </Link>
          <span className="text-sos-border">·</span>
          <Link href="https://www.youtube.com/@SeekerofStory" target="_blank" rel="noopener noreferrer"
            className="text-[0.62rem] tracking-[0.1em] uppercase text-mid-gray hover:text-gold transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}>
            YouTube
          </Link>
          <span className="text-sos-border">·</span>
          <Link href={APPLE_PODCASTS} target="_blank" rel="noopener noreferrer"
            className="text-[0.62rem] tracking-[0.1em] uppercase text-mid-gray hover:text-gold transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}>
            Apple Podcasts
          </Link>
        </div>
      </section>
    </>
  );
}
