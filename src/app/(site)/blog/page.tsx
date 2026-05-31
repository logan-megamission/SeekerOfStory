import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { posts, founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata = {
  title: "Blog | Seeker of Story",
  description: "Insights and stories from DFW founders — real lessons from people who made the leap.",
};

export default async function BlogPage() {
  let allPosts: Array<{
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    publishedAt: Date | null;
    sectorTags: string[];
    founderName: string | null;
    founderSlug: string | null;
    founderBusiness: string | null;
  }> = [];

  try {
    const rows = await db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        excerpt: posts.excerpt,
        coverImageUrl: posts.coverImageUrl,
        publishedAt: posts.publishedAt,
        sectorTags: posts.sectorTags,
        founderName: founders.name,
        founderSlug: founders.slug,
        founderBusiness: founders.businessName,
      })
      .from(posts)
      .leftJoin(founders, eq(posts.founderId, founders.id))
      .where(eq(posts.status, "published"));

    allPosts = rows;
  } catch {
    // DB not connected yet
  }

  return (
    <>
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>From the Field</SectionLabel>
        <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}>
          Stories from <em className="italic text-gold">DFW Founders</em>
        </h1>
        <p className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}>
          Real lessons from founders who made the leap. No fluff. No gatekeeping.
        </p>
      </section>

      <section className="bg-charcoal border-t border-white/10 py-14 px-8">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-gold/70 mb-10"
            style={{ fontFamily: "var(--font-sans)" }}>
            Why This Work Matters — U.S. Labor Statistics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              { stat: "6.6M", label: "Americans actively unemployed", source: "BLS, 2024" },
              { stat: "5.5 mo", label: "Average job search duration", source: "BLS, 2024" },
              { stat: "85%", label: "Jobs filled through networking", source: "LinkedIn, 2022" },
              { stat: "70%", label: "Job listings never publicly posted", source: "HBR, 2023" },
            ].map(({ stat, label, source }) => (
              <div key={stat} className="bg-charcoal px-8 py-10 text-center">
                <div className="font-serif text-[clamp(2.2rem,4vw,3rem)] font-light text-gold leading-none mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}>
                  {stat}
                </div>
                <p className="text-[0.72rem] font-light text-white/70 leading-[1.7] mb-2"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  {label}
                </p>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-white/30 font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  {source}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-[0.72rem] font-light text-white/40 mt-8 max-w-[600px] mx-auto leading-[1.8]"
            style={{ fontFamily: "var(--font-sans)" }}>
            Behind every statistic is a person standing at the edge of a leap. These founders wrote
            their stories so that person wouldn&apos;t have to walk alone.
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-16 px-8">
        <div className="max-w-[1100px] mx-auto">
          {allPosts.length > 0 ? (
            <div className={`grid gap-0.5 bg-sos-border max-md:grid-cols-1 ${allPosts.length === 1 ? "grid-cols-1" : allPosts.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {allPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-cream no-underline hover:-translate-y-1 transition-transform duration-300"
                >
                  {post.coverImageUrl ? (
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-[200px] bg-light-gray" />
                  )}
                  <div className="p-6 border-t-[3px] border-gold">
                    {post.sectorTags.length > 0 && (
                      <span className="block text-[0.56rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2"
                        style={{ fontFamily: "var(--font-sans)" }}>
                        {post.sectorTags[0]}
                      </span>
                    )}
                    <h2 className="font-serif text-[1.4rem] font-normal text-charcoal mb-3 group-hover:text-gold-dark transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[0.78rem] text-mid-gray font-light leading-[1.8] mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}>
                        {post.excerpt}
                      </p>
                    )}
                    {post.founderName && (
                      <p className="text-[0.65rem] font-medium text-teal"
                        style={{ fontFamily: "var(--font-sans)" }}>
                        By {post.founderName} · {post.founderBusiness}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-mid-gray py-20 font-serif italic text-lg">
              Blog posts coming soon — check back after our next founding story drops.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
