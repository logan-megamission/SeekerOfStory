import { createFounder } from "./actions";

export default function NewFounderPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <a href="/admin/founders"
          className="text-[0.7rem] text-mid-gray hover:text-charcoal transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}>
          ← Founders
        </a>
        <span className="text-sos-border">/</span>
        <h1 className="font-serif text-[1.75rem] font-light text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}>
          New Founder
        </h1>
      </div>

      <div className="bg-white border border-sos-border p-8 max-w-[560px]">
        <p className="text-[0.78rem] text-mid-gray mb-6 font-light"
          style={{ fontFamily: "var(--font-sans)" }}>
          Start with the basics — fill in the full story, media, and blueprint on the next screen.
        </p>

        <form action={createFounder} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray"
              style={{ fontFamily: "var(--font-sans)" }}>
              Full Name *
            </label>
            <input name="name" required placeholder="e.g. Carrie Carter"
              className="bg-white border border-sos-border px-3 py-2.5 text-[0.82rem] text-charcoal outline-none focus:border-gold transition-colors w-full"
              style={{ fontFamily: "var(--font-sans)" }} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray"
              style={{ fontFamily: "var(--font-sans)" }}>
              Business Name *
            </label>
            <input name="businessName" required placeholder="e.g. Cowtown Tour Company"
              className="bg-white border border-sos-border px-3 py-2.5 text-[0.82rem] text-charcoal outline-none focus:border-gold transition-colors w-full"
              style={{ fontFamily: "var(--font-sans)" }} />
          </div>

          <button type="submit"
            className="bg-gold text-white px-6 py-2.5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors self-start mt-2"
            style={{ fontFamily: "var(--font-sans)" }}>
            Create &amp; Continue →
          </button>
        </form>
      </div>
    </div>
  );
}
