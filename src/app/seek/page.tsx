"use client";

import { useState } from "react";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { SectionLabel } from "@/components/shared/SectionLabel";

export default function SeekPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentSituation: "",
    desiredDirection: "",
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
    if (!form.name || !form.email || !form.desiredDirection) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/seek", {
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
            Your Story Has Been Received
          </span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-6"
            style={{ fontFamily: "var(--font-serif)" }}>
            We&apos;re finding your <em className="italic text-gold">mentor match</em>
          </h1>
          <p className="text-[0.85rem] font-light leading-[1.9] text-mid-gray mb-8"
            style={{ fontFamily: "var(--font-sans)" }}>
            Susy will review your submission and connect you with the founder whose path most
            closely mirrors yours. Check your email — we&apos;ll be in touch soon.
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
        <SectionLabel light>Free. No Paywalls. No Gatekeeping.</SectionLabel>
        <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}>
          Tell us your story.<br />
          <em className="italic text-gold">We&apos;ll find your mentor.</em>
        </h1>
        <p className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}>
          Fill out the form below. Susy will personally review your submission and connect you
          with the founder whose journey most closely mirrors where you want to go.
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
                Where are you right now?{" "}
                <span className="text-[0.52rem] text-mid-gray normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <textarea
                value={form.currentSituation}
                onChange={(e) => setForm({ ...form, currentSituation: e.target.value })}
                placeholder="e.g. I've been in corporate tech for 12 years and recently got laid off..."
                rows={3}
                className={`${input} resize-none`}
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            <div>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>
                Where do you want to go? *
              </label>
              <textarea
                value={form.desiredDirection}
                onChange={(e) => setForm({ ...form, desiredDirection: e.target.value })}
                placeholder="e.g. I want to launch my own law practice / tour company / media brand in DFW..."
                rows={3}
                className={`${input} resize-none`}
                style={{ fontFamily: "var(--font-sans)" }}
                required
              />
            </div>

            {error && (
              <p className="text-[0.72rem] text-red-500" style={{ fontFamily: "var(--font-sans)" }}>
                {error}
              </p>
            )}

            <BtnPrimary type="submit" disabled={loading} className="self-start">
              {loading ? "Submitting…" : "Find My Mentor →"}
            </BtnPrimary>
          </form>
        </div>

        <p className="text-center text-[0.72rem] text-mid-gray mt-8 font-light"
          style={{ fontFamily: "var(--font-sans)" }}>
          Your information is never sold or shared. This platform is free. Always.
        </p>
      </section>
    </>
  );
}
