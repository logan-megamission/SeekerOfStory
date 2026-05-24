import { createPost } from "./actions";

export default function NewBlogPostPage() {
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
          className="font-serif text-[1.75rem] font-light text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          New Post
        </h1>
      </div>

      <div className="bg-white border border-sos-border p-8 max-w-[560px]">
        <p
          className="text-[0.78rem] text-mid-gray mb-6 font-light"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Start with a title — you can add the body, excerpt, and founder link on the next screen.
        </p>

        <form action={createPost} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Title *
            </label>
            <input
              name="title"
              required
              placeholder="Post headline"
              className="bg-white border border-sos-border px-3 py-2.5 text-[0.82rem] text-charcoal outline-none focus:border-gold transition-colors w-full"
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>

          <button
            type="submit"
            className="bg-gold text-white px-6 py-2.5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors self-start mt-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Create &amp; Continue →
          </button>
        </form>
      </div>
    </div>
  );
}
