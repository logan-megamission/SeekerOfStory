"use client";

import { useState } from "react";
import Link from "next/link";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { SectionLabel } from "@/components/shared/SectionLabel";

const CONTRIBUTION_TYPES = [
  { value: "volunteer", label: "Volunteer my time" },
  { value: "in_kind", label: "In-kind donation (equipment, services, space)" },
  { value: "partnership", label: "Partnership or sponsorship" },
  { value: "media", label: "Help spread the word" },
  { value: "other", label: "Something else" },
];

const input =
  "bg-cream border border-sos-border px-4 py-[0.9rem] text-[0.82rem] text-charcoal outline-none transition-colors focus:border-gold placeholder:text-[#C8C4BC] w-full";
const label =
  "block text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-gold mb-2";

export function CommunityContributeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contributionType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.contributionType) {
      setError("Please fill in your name, email, and how you'd like to contribute.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/fund/contribute", {
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
      <section className="bg-warm-white py-16 px-8">
        <div className="max-w-[680px] mx-auto bg-cream border-t-[3px] border-gold p-10 text-center">
          <span
            className="block text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Contribution Received
          </span>
          <h2
            className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light text-charcoal mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Thank you for <em className="italic text-gold">building the bridge</em>
          </h2>
          <p
            className="text-[0.85rem] font-light leading-[1.9] text-mid-gray"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            We&apos;ll review your offer and be in touch soon. Your contribution helps keep
            mentorship free for every seeker in DFW.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-warm-white py-16 px-8">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-10">
          <SectionLabel>Community Contributions</SectionLabel>
          <h2
            className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-charcoal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Give time, talent, or <em className="italic text-gold">resources</em>
          </h2>
          <p
            className="text-[0.82rem] font-light leading-[1.9] text-mid-gray max-w-[520px] mx-auto mt-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Not everyone can give financially — and that&apos;s okay. Tell us how you&apos;d like
            to help, and we&apos;ll connect with you.
          </p>
        </div>

        <div className="bg-cream border-t-[3px] border-gold p-10">
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
                How would you like to contribute? *
              </label>
              <select
                value={form.contributionType}
                onChange={(e) => setForm({ ...form, contributionType: e.target.value })}
                className={input}
                style={{ fontFamily: "var(--font-sans)" }}
                required
              >
                <option value="">Select one…</option>
                {CONTRIBUTION_TYPES.map(({ value, label: optLabel }) => (
                  <option key={value} value={value}>
                    {optLabel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>
                Tell us more{" "}
                <span className="text-[0.52rem] text-mid-gray normal-case tracking-normal font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Skills you can offer, resources you'd like to share, or how you'd like to partner…"
                rows={4}
                className={`${input} resize-y min-h-[120px]`}
                style={{ fontFamily: "var(--font-sans)" }}
              />
            </div>

            {error && (
              <p className="text-[0.72rem] text-red-500" style={{ fontFamily: "var(--font-sans)" }}>
                {error}
              </p>
            )}

            <BtnPrimary type="submit" disabled={loading} className="self-start">
              {loading ? "Submitting…" : "Offer to Contribute →"}
            </BtnPrimary>
          </form>
        </div>

        <p
          className="text-center text-[0.72rem] text-mid-gray mt-8 font-light"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Founders can also{" "}
          <Link href="/seek" className="text-gold-dark hover:text-gold transition-colors">
            share their story
          </Link>{" "}
          — the original Goodwill gift.
        </p>
      </div>
    </section>
  );
}
