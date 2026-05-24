"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { savePost } from "./actions";
import type { Post } from "@/db/schema";

const label = "text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray";
const input =
  "bg-white border border-sos-border px-3 py-2.5 text-[0.82rem] text-charcoal outline-none focus:border-gold transition-colors w-full";
const textarea = `${input} resize-y min-h-[120px]`;

type FounderOption = { id: number; name: string };

type Props = { post: Post; founders: FounderOption[] };

export function BlogEditorForm({ post, founders }: Props) {
  const [form, setForm] = useState({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    body: post.body ?? "",
    coverImageUrl: post.coverImageUrl ?? "",
    sectorTags: (post.sectorTags ?? []).join(", "),
    founderId: post.founderId?.toString() ?? "",
    status: post.status,
  });
  const [saving, startSaving] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSave() {
    setError("");
    setSaved(false);
    startSaving(async () => {
      try {
        await savePost({
          id: post.id,
          slug: form.slug.trim(),
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          body: form.body.trim(),
          coverImageUrl: form.coverImageUrl.trim(),
          sectorTags: form.sectorTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          founderId: form.founderId ? parseInt(form.founderId, 10) : null,
          status: form.status,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch {
        setError("Save failed. Please try again.");
      }
    });
  }

  return (
    <div className="max-w-[820px] flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className={label}>Title *</label>
          <input className={input} value={form.title} onChange={set("title")} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label}>URL slug *</label>
          <input className={input} value={form.slug} onChange={set("slug")} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label}>Status</label>
          <select className={input} value={form.status} onChange={set("status")}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className={label}>Excerpt</label>
          <textarea className={textarea} rows={3} value={form.excerpt} onChange={set("excerpt")} />
        </div>
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className={label}>Body (markdown-style paragraphs)</label>
          <textarea className={`${textarea} min-h-[320px] font-mono text-[0.78rem]`} value={form.body} onChange={set("body")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label}>Cover image URL</label>
          <input className={input} value={form.coverImageUrl} onChange={set("coverImageUrl")} placeholder="/blog-post-1.png" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={label}>Sector tags (comma-separated)</label>
          <input className={input} value={form.sectorTags} onChange={set("sectorTags")} placeholder="Career Transition, DFW" />
        </div>
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className={label}>Related founder</label>
          <select className={input} value={form.founderId} onChange={set("founderId")}>
            <option value="">— None —</option>
            {founders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap pt-2 border-t border-sos-border">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-charcoal text-white px-6 py-2.5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {saving ? "Saving…" : "Save post"}
        </button>
        {saved && (
          <span className="text-[0.72rem] text-green-700" style={{ fontFamily: "var(--font-sans)" }}>
            Saved
          </span>
        )}
        {error && (
          <span className="text-[0.72rem] text-red-600" style={{ fontFamily: "var(--font-sans)" }}>
            {error}
          </span>
        )}
        {form.status === "published" && (
          <Link
            href={`/blog/${form.slug}`}
            target="_blank"
            className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-gold-dark hover:text-gold transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            View live →
          </Link>
        )}
      </div>
    </div>
  );
}
