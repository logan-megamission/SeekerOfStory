// Renders a <script type="application/ld+json"> tag server-side.
// Each schema type gets its own typed helper below.

type JsonLdProps = { data: Record<string, unknown> };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Organization (site-wide) ────────────────────────────────────────────────
export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Seeker of Story",
        alternateName: "SOS",
        url: "https://seekerofstory.com",
        logo: "https://seekerofstory.com/og-logo.png",
        description:
          "Free mentorship platform connecting DFW career transitioners with local founders who've documented their entrepreneurial journey.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Fort Worth",
          addressRegion: "TX",
          addressCountry: "US",
        },
        telephone: "+18178608989",
        sameAs: [
          "https://open.spotify.com/show/033gnWzSSrzzX3j6xw4Q4u",
          "https://www.youtube.com/@SeekerofStory",
          "https://podcasts.apple.com/us/podcast/sos-susy-gordon-seeker-of-story/id1896645220",
        ],
        founder: {
          "@type": "Person",
          name: "Susy Gordon",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Mega Mission Media",
        },
      }}
    />
  );
}

// ─── Podcast / PodcastSeries ──────────────────────────────────────────────────
export function PodcastSeriesSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "PodcastSeries",
        name: "SoS — Susy Gordon — Seeker of Story",
        description:
          "Founders pull back the curtain — no filters, no gatekeeping, no $997 courses. Real entrepreneurial journeys from DFW founders.",
        url: "https://seekerofstory.com/listen",
        webFeed: "https://seekerofstory.com/feed.xml",
        author: {
          "@type": "Person",
          name: "Susy Gordon",
        },
        genre: "Entrepreneurship",
        inLanguage: "en-US",
        sameAs: [
          "https://open.spotify.com/show/033gnWzSSrzzX3j6xw4Q4u",
          "https://podcasts.apple.com/us/podcast/sos-susy-gordon-seeker-of-story/id1896645220",
          "https://www.youtube.com/@SeekerofStory",
        ],
      }}
    />
  );
}

// ─── Person (Founder profile) ─────────────────────────────────────────────────
type FounderSchemaProps = {
  name: string;
  businessName: string;
  slug: string;
  sector: string;
  dfwCity: string;
  websiteUrl?: string | null;
  whoTheyWere?: string | null;
  youtubeUrl?: string | null;
  spotifyEpisodeUrl?: string | null;
  applePodcastUrl?: string | null;
};

export function FounderSchema({
  name,
  businessName,
  slug,
  sector,
  dfwCity,
  websiteUrl,
  whoTheyWere,
  youtubeUrl,
  spotifyEpisodeUrl,
  applePodcastUrl,
}: FounderSchemaProps) {
  const sameAs = [
    websiteUrl,
    youtubeUrl,
    spotifyEpisodeUrl,
    applePodcastUrl,
  ].filter(Boolean) as string[];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        description: whoTheyWere ?? undefined,
        url: `https://seekerofstory.com/founders/${slug}`,
        worksFor: {
          "@type": "LocalBusiness",
          name: businessName,
          address: {
            "@type": "PostalAddress",
            addressLocality: dfwCity,
            addressRegion: "TX",
            addressCountry: "US",
          },
          knowsAbout: sector,
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      }}
    />
  );
}

// ─── PodcastEpisode (per founder page) ───────────────────────────────────────
type EpisodeSchemaProps = {
  founderName: string;
  founderSlug: string;
  businessName: string;
  youtubeUrl?: string | null;
  spotifyEpisodeUrl?: string | null;
  applePodcastUrl?: string | null;
  publishedAt?: Date | null;
};

export function PodcastEpisodeSchema({
  founderName,
  founderSlug,
  businessName,
  youtubeUrl,
  spotifyEpisodeUrl,
  applePodcastUrl,
  publishedAt,
}: EpisodeSchemaProps) {
  if (!spotifyEpisodeUrl && !applePodcastUrl && !youtubeUrl) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
        name: `${founderName} | ${businessName}`,
        url: `https://seekerofstory.com/founders/${founderSlug}`,
        partOfSeries: {
          "@type": "PodcastSeries",
          name: "SoS — Susy Gordon — Seeker of Story",
          url: "https://seekerofstory.com/listen",
        },
        ...(publishedAt ? { datePublished: publishedAt.toISOString().split("T")[0] } : {}),
        ...(youtubeUrl ? { video: { "@type": "VideoObject", url: youtubeUrl } } : {}),
        associatedMedia: [spotifyEpisodeUrl, applePodcastUrl].filter(Boolean).map((url) => ({
          "@type": "MediaObject",
          contentUrl: url,
        })),
      }}
    />
  );
}

// ─── BlogPosting ──────────────────────────────────────────────────────────────
type BlogPostSchemaProps = {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: Date | null;
  coverImageUrl?: string | null;
  authorName?: string | null;
  authorSlug?: string | null;
  sectorTags?: string[];
};

export function BlogPostingSchema({
  title,
  slug,
  excerpt,
  publishedAt,
  coverImageUrl,
  authorName,
  authorSlug,
  sectorTags,
}: BlogPostSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: excerpt ?? undefined,
        url: `https://seekerofstory.com/blog/${slug}`,
        ...(publishedAt ? { datePublished: publishedAt.toISOString().split("T")[0] } : {}),
        ...(coverImageUrl ? { image: coverImageUrl } : {}),
        publisher: {
          "@type": "Organization",
          name: "Seeker of Story",
          url: "https://seekerofstory.com",
        },
        ...(authorName
          ? {
              author: {
                "@type": "Person",
                name: authorName,
                url: authorSlug ? `https://seekerofstory.com/founders/${authorSlug}` : undefined,
              },
            }
          : {}),
        ...(sectorTags && sectorTags.length > 0 ? { keywords: sectorTags.join(", ") } : {}),
      }}
    />
  );
}

// ─── LocalBusiness (About page) ───────────────────────────────────────────────
export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Seeker of Story",
        description:
          "Free mentorship platform and DFW entrepreneur media company. Connecting career transitioners with local founders. No paywalls. Always free.",
        url: "https://seekerofstory.com",
        telephone: "+18178608989",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Fort Worth",
          addressRegion: "TX",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 32.7555,
          longitude: -97.3308,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Dallas-Fort Worth Metroplex",
        },
        priceRange: "Free",
        openingHours: "Mo-Fr 09:00-18:00",
        sameAs: [
          "https://open.spotify.com/show/033gnWzSSrzzX3j6xw4Q4u",
          "https://www.youtube.com/@SeekerofStory",
          "https://podcasts.apple.com/us/podcast/sos-susy-gordon-seeker-of-story/id1896645220",
        ],
      }}
    />
  );
}
