import Link from "next/link";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata = {
  title: "Listen | Seeker of Story Podcast",
  description:
    "SoS Podcast — founder stories with no filters, no gatekeeping. Listen on Spotify, YouTube, and Apple Podcasts.",
};

const SHOW_LINKS = {
  spotify: "https://open.spotify.com/show/033gnWzSSrzzX3j6xw4Q4u",
  youtube: "https://www.youtube.com/@SeekerofStory",
  apple: "https://podcasts.apple.com/us/podcast/sos-susy-gordon-seeker-of-story/id1896645220",
};

export default async function ListenPage() {
  let episodes: Array<{
    slug: string;
    storyNumber: number | null;
    name: string;
    businessName: string;
    transitionFrom: string | null;
    transitionTo: string | null;
    spotifyEpisodeUrl: string | null;
    applePodcastUrl: string | null;
    youtubeUrl: string | null;
  }> = [];

  try {
    episodes = await db
      .select({
        slug: founders.slug,
        storyNumber: founders.storyNumber,
        name: founders.name,
        businessName: founders.businessName,
        transitionFrom: founders.transitionFrom,
        transitionTo: founders.transitionTo,
        spotifyEpisodeUrl: founders.spotifyEpisodeUrl,
        applePodcastUrl: founders.applePodcastUrl,
        youtubeUrl: founders.youtubeUrl,
      })
      .from(founders)
      .where(eq(founders.status, "published"));
  } catch {
    // DB not connected yet
  }

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>SoS Podcast</SectionLabel>
        <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}>
          Founders pull back the curtain.<br />
          <em className="italic text-gold">No filters. No gatekeeping.</em>
        </h1>
        <p className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto mb-10"
          style={{ fontFamily: "var(--font-sans)" }}>
          Hosted by Susy Gordon. New episodes on Spotify, YouTube, and Apple Podcasts.
        </p>

        {/* Platform badges */}
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { href: SHOW_LINKS.spotify, label: "Listen on Spotify" },
            { href: SHOW_LINKS.youtube, label: "Watch on YouTube" },
            { href: SHOW_LINKS.apple, label: "Listen on Apple Podcasts" },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold border border-gold/40 px-5 py-2 hover:bg-gold hover:text-white transition-all duration-200"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {label} →
            </Link>
          ))}
        </div>
      </section>

      {/* Spotify show embed */}
      <section className="bg-warm-white py-12 px-8">
        <div className="max-w-[820px] mx-auto">
          <SectionLabel>The Show</SectionLabel>
          <iframe
            style={{ borderRadius: 0 }}
            src="https://open.spotify.com/embed/show/033gnWzSSrzzX3j6xw4Q4u?utm_source=generator"
            width="100%"
            height="232"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0 mb-12"
          />

          {/* Episode list */}
          {episodes.length > 0 && (
            <>
              <SectionLabel>All Episodes</SectionLabel>
              <div className="flex flex-col gap-0.5 bg-sos-border">
                {episodes.map((ep) => (
                  <div key={ep.slug} className="bg-cream p-6 flex items-center justify-between gap-6 max-md:flex-col max-md:items-start">
                    <div>
                      {ep.storyNumber && (
                        <span className="block text-[0.56rem] font-semibold tracking-[0.2em] uppercase text-gold mb-1"
                          style={{ fontFamily: "var(--font-sans)" }}>
                          Episode #{String(ep.storyNumber).padStart(3, "0")}
                        </span>
                      )}
                      <Link href={`/founders/${ep.slug}`}
                        className="font-serif text-[1.4rem] font-normal text-charcoal hover:text-gold transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}>
                        {ep.name}
                      </Link>
                      <p className="text-[0.72rem] text-teal font-medium mt-0.5"
                        style={{ fontFamily: "var(--font-sans)" }}>
                        {ep.businessName}
                      </p>
                      {ep.transitionFrom && ep.transitionTo && (
                        <p className="text-[0.68rem] text-mid-gray mt-1"
                          style={{ fontFamily: "var(--font-sans)" }}>
                          {ep.transitionFrom} → {ep.transitionTo}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                      {ep.spotifyEpisodeUrl && (
                        <Link href={ep.spotifyEpisodeUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-mid-gray border border-sos-border px-3 py-1.5 hover:border-gold hover:text-gold-dark transition-colors whitespace-nowrap"
                          style={{ fontFamily: "var(--font-sans)" }}>
                          Spotify
                        </Link>
                      )}
                      {ep.applePodcastUrl && (
                        <Link href={ep.applePodcastUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-mid-gray border border-sos-border px-3 py-1.5 hover:border-gold hover:text-gold-dark transition-colors whitespace-nowrap"
                          style={{ fontFamily: "var(--font-sans)" }}>
                          Apple
                        </Link>
                      )}
                      {ep.youtubeUrl && (
                        <Link href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-mid-gray border border-sos-border px-3 py-1.5 hover:border-gold hover:text-gold-dark transition-colors whitespace-nowrap"
                          style={{ fontFamily: "var(--font-sans)" }}>
                          YouTube
                        </Link>
                      )}
                      <Link href={`/founders/${ep.slug}`}
                        className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-gold-dark border border-gold-light px-3 py-1.5 hover:border-gold hover:text-gold transition-colors whitespace-nowrap"
                        style={{ fontFamily: "var(--font-sans)" }}>
                        Full Story →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
