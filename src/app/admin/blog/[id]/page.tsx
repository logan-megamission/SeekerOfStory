import { notFound } from "next/navigation";
import { db } from "@/db";
import { founders, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BlogEditorForm } from "./BlogEditorForm";

type Props = { params: Promise<{ id: string }> };

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  if (!Number.isInteger(postId)) notFound();

  let post;
  let founderOptions: Array<{ id: number; name: string }> = [];

  try {
    [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    founderOptions = await db
      .select({ id: founders.id, name: founders.name })
      .from(founders)
      .orderBy(founders.name);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <a
          href="/admin/blog"
          className="text-[0.7rem] text-mid-gray hover:text-charcoal transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ← Blog
        </a>
        <span className="text-sos-border">/</span>
        <h1
          className="font-serif text-[1.75rem] font-light text-charcoal line-clamp-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {post.title}
        </h1>
      </div>

      <div className="bg-white border border-sos-border p-8">
        <BlogEditorForm post={post} founders={founderOptions} />
      </div>
    </div>
  );
}
