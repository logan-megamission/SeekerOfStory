"use client";

import { useState } from "react";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { SectionLabel } from "@/components/shared/SectionLabel";

export default function SeekPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bestTime: "",
    websiteLinkedin: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const input =
    "bg-cream border border-sos-border px-4 py-[0.9rem] text-[0.82rem] text-charcoal outline-none transition-colors focus:border-gold placeholder:text-[#C8C4BC] w-full";
  const label =
    "block text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-gold mb-2";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/give-back", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="bg-cream min-h-[60vh] flex items-center justify-center px-8 py-20 text-center">
        <div className="max-w-[560px]">
          <span className="block text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4"
            style={{ fontFamily: "var(--font-sans)" }}>
            We Received Your Story
          </span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-6"
            style={{ fontFamily: "var(--font-serif)" }}>
            Thank you for <em className="italic text-gold">giving back</em>
          </h1>
          <p className="text-[0.85rem] font-light leading-[1.9] text-mid-gray mb-8"
            style={{ fontFamily: "var(--font-sans)" }}>
            We&apos;ll review your submission and be in touch soon. Your story has the power
            to become someone else&apos;s blueprint.
          </p>
          <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold-dark border border-gold-light px-5 py-2 inline-block"
            style={{ fontFamily: "var(--font-sans)" }}>
            Matthew 7:7 — Seek and you shall find
          </span>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>MAKE AN IMPACT</SectionLabel>
        <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}>
          Ready to make a <em className="italic text-gold">mega impact?</em>
        </h1>
        <p className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}>
          You built something worth sharing. Your story, blueprint, lessons learned, and lived
          experience could become the bridge that helps someone else keep going.
        </p>
      </section>

      <section className="bg-warm-white py-16 px-8">
        <div className="max-w-[680px] mx-auto bg-cream border-t-[3px] border-gold p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div>
                <label className={label} style={{ fontFamily: "var(--font-sans)" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="First & Last Name"
                  className={input}
                  style={{ fontFamily: "var(--font-sans)" }}
                  required
                />
              </div>
              <div>
                <label className={label} style={{ fontFamily: "var(--font-sans)" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className={input}
                  style={{ fontFamily: "var(--font-sans)" }}
                  required
                />
              </div>
            </div>

            <div>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>
                Best date and time to reach you{" "}
                <span className="text-[0.52rem] text-mid-gray normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={form.bestTime}
                onChange={(e) => setForm({ ...form, bestTime: e.target.value })}
                placeholder="e.g. Weekdays after 3pm CT"
                className={input}
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <div>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>
                Website / LinkedIn{" "}
                <span className="text-[0.52rem] text-mid-gray normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={form.websiteLinkedin}
                onChange={(e) => setForm({ ...form, websiteLinkedin: e.target.value })}
                placeholder="https://"
                className={input}
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            {error && (
              <p className="text-[0.72rem] text-red-500" style={{ fontFamily: "var(--font-sans)" }}>
                {error}
              </p>
            )}

            <BtnPrimary type="submit" disabled={loading} className="self-start">
              {loading ? "Submitting…" : "I Want to Give Back →"}
            </BtnPrimary>
          </form>
        </div>

        <p className="text-center text-[0.72rem] text-mid-gray mt-8 font-light"
          style={{ fontFamily: "var(--font-sans)" }}>
          No memberships. No gatekeeping. Just shared stories, lived experience, and people helping people.
        </p>
      </section>
    </>
  );
}
