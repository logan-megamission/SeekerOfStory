import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { posts, founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BlogPostingSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [row] = await db
      .select({ title: posts.title, excerpt: posts.excerpt, coverImageUrl: posts.coverImageUrl, publishedAt: posts.publishedAt })
      .from(posts).where(eq(posts.slug, slug)).limit(1);
    if (!row) return {};
    return {
      title: row.title,
      description: row.excerpt ?? undefined,
      openGraph: {
        title: row.title,
        description: row.excerpt ?? undefined,
        url: `https://seekerofstory.com/blog/${slug}`,
        type: "article",
        images: row.coverImageUrl ? [{ url: row.coverImageUrl, width: 1200, height: 630 }] : [],
        ...(row.publishedAt ? { publishedTime: row.publishedAt.toISOString() } : {}),
      },
      twitter: { card: "summary_large_image", title: row.title, description: row.excerpt ?? undefined },
      alternates: { canonical: `https://seekerofstory.com/blog/${slug}` },
    };
  } catch { return {}; }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post: {
    id: number;
    title: string;
    excerpt: string | null;
    body: string | null;
    coverImageUrl: string | null;
    publishedAt: Date | null;
    sectorTags: string[];
    founderName: string | null;
    founderSlug: string | null;
    founderBusiness: string | null;
  } | undefined;

  try {
    const [row] = await db
      .select({
        id: posts.id,
        title: posts.title,
        excerpt: posts.excerpt,
        body: posts.body,
        coverImageUrl: posts.coverImageUrl,
        publishedAt: posts.publishedAt,
        sectorTags: posts.sectorTags,
        founderName: founders.name,
        founderSlug: founders.slug,
        founderBusiness: founders.businessName,
      })
      .from(posts)
      .leftJoin(founders, eq(posts.founderId, founders.id))
      .where(eq(posts.slug, slug))
      .limit(1);

    post = row;
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <>
      <BlogPostingSchema
        title={post.title}
        slug={slug}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt}
        coverImageUrl={post.coverImageUrl}
        authorName={post.founderName}
        authorSlug={post.founderSlug}
        sectorTags={post.sectorTags}
      />

      {post.coverImageUrl && (
        <div className="relative w-full h-[400px]">
          <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <article className="max-w-[720px] mx-auto px-8 py-16">
        {post.sectorTags.length > 0 && (
          <span className="block text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4"
            style={{ fontFamily: "var(--font-sans)" }}>
            {post.sectorTags.join(" · ")}
          </span>
        )}

        <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-6"
          style={{ fontFamily: "var(--font-serif)" }}>
          {post.title}
        </h1>

        {post.founderName && post.founderSlug && (
          <p className="text-[0.72rem] font-medium text-mid-gray mb-10 pb-8 border-b border-sos-border"
            style={{ fontFamily: "var(--font-sans)" }}>
            By{" "}
            <Link href={`/founders/${post.founderSlug}`} className="text-teal hover:text-gold-dark transition-colors">
              {post.founderName}
            </Link>
            {post.founderBusiness && ` · ${post.founderBusiness}`}
            {post.publishedAt && ` · ${new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
          </p>
        )}

        {post.body && (
          <div
            className="text-[0.88rem] leading-[1.9] text-charcoal font-light space-y-4 whitespace-pre-wrap"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {post.body}
          </div>
        )}

        {/* CTA back to founder */}
        {post.founderSlug && (
          <div className="mt-16 pt-8 border-t border-sos-border text-center">
            <p className="text-[0.72rem] text-mid-gray mb-4" style={{ fontFamily: "var(--font-sans)" }}>
              Want to learn more about this founder&apos;s journey?
            </p>
            <Link
              href={`/founders/${post.founderSlug}`}
              className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gold-dark border border-gold-light px-6 py-3 inline-block hover:bg-gold hover:text-white transition-all duration-200"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Read Their Full Story →
            </Link>
          </div>
        )}
      </article>
    </>
  );
}
