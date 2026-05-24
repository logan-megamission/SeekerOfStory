import Link from "next/link";
import { db } from "@/db";
import { posts, founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { revalidatePath } from "next/cache";

async function togglePublish(id: number, currentStatus: string) {
  "use server";
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const [row] = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  await db
    .update(posts)
    .set({
      status: newStatus,
      publishedAt: newStatus === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (row?.slug) revalidatePath(`/blog/${row.slug}`);
}

export default async function AdminBlogPage() {
  let allPosts: Array<{
    id: number;
    slug: string;
    title: string;
    status: string;
    publishedAt: Date | null;
    updatedAt: Date;
    founderName: string | null;
  }> = [];

  try {
    allPosts = await db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        status: posts.status,
        publishedAt: posts.publishedAt,
        updatedAt: posts.updatedAt,
        founderName: founders.name,
      })
      .from(posts)
      .leftJoin(founders, eq(posts.founderId, founders.id))
      .orderBy(desc(posts.updatedAt));
  } catch {
    // DB not connected
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
    };
    return map[status] ?? "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="font-serif text-[2rem] font-light text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Blog
        </h1>
        <BtnPrimary href="/admin/blog/new">+ New Post</BtnPrimary>
      </div>

      <div className="bg-white border border-sos-border overflow-x-auto">
        <table className="w-full text-[0.78rem]" style={{ fontFamily: "var(--font-sans)" }}>
          <thead>
            <tr className="border-b border-sos-border bg-cream">
              {["Title", "Founder", "Status", "Updated", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-mid-gray"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPosts.map((p) => (
              <tr
                key={p.id}
                className="border-b border-sos-border hover:bg-cream/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-charcoal max-w-[280px]">
                  <span className="line-clamp-2">{p.title}</span>
                </td>
                <td className="px-4 py-3 text-mid-gray">{p.founderName ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm ${statusBadge(p.status)}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-mid-gray text-[0.7rem]">
                  {new Date(p.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3 flex-wrap">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="text-gold-dark hover:text-gold transition-colors font-medium"
                    >
                      Edit
                    </Link>
                    {p.status === "published" && (
                      <Link
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        className="text-mid-gray hover:text-charcoal transition-colors"
                      >
                        View
                      </Link>
                    )}
                    <form
                      action={async () => {
                        "use server";
                        await togglePublish(p.id, p.status);
                      }}
                    >
                      <button
                        type="submit"
                        className={`font-medium transition-colors ${p.status === "published" ? "text-red-500 hover:text-red-700" : "text-green-600 hover:text-green-800"}`}
                      >
                        {p.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allPosts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-mid-gray italic">
                  No blog posts yet. Create your first post.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
