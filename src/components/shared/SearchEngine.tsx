"use client";

import { useState } from "react";
import { BtnPrimary } from "./BtnPrimary";
import { JourneyPills } from "@/components/founders/JourneyPills";
import Link from "next/link";

type FounderMatch = {
  id: number;
  slug: string;
  why: string;
  founder: {
    name: string;
    businessName: string;
    sector: string;
    dfwCity: string;
    transitionFrom: string | null;
    transitionTo: string | null;
    storyNumber: number | null;
  };
};

export function SearchEngine() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<FounderMatch[] | null>(null);
  const [error, setError] = useState("");

  async function runSearch() {
    if (!to.trim()) {
      setError("Please tell us what you want to become.");
      return;
    }
    setError("");
    setLoading(true);
    setMatches(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: from.trim(), to: to.trim() }),
      });
      const data = await res.json();
      setMatches(data.matches ?? []);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Search box */}
      <div
        className="max-w-[720px] mx-auto bg-warm-white p-10 border-t-[3px] border-gold relative z-10"
        style={{ opacity: 0, animation: "fadeUp 0.8s ease 1s forwards" }}
      >
        <h2
          className="font-serif text-[1.5rem] font-normal text-charcoal mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          SEARCH THE BECOMING DATABASE
        </h2>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end max-md:grid-cols-1">
          <div className="flex flex-col gap-2 text-left">
            <label
              className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-gold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              I used to be… <span className="text-[0.52rem] text-mid-gray normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="e.g. Teacher, Nurse, IT Consultant"
              className="bg-cream border border-sos-border px-4 py-[0.9rem] text-[0.82rem] text-charcoal outline-none transition-colors focus:border-gold placeholder:text-[#C8C4BC]"
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>

          <div
            className="font-serif text-base italic text-mid-gray text-center pb-[0.9rem] whitespace-nowrap max-md:hidden"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            →
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label
              className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-gold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              I want to become…
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="e.g. Attorney, Tour Guide, Podcaster"
              className="bg-cream border border-sos-border px-4 py-[0.9rem] text-[0.82rem] text-charcoal outline-none transition-colors focus:border-gold placeholder:text-[#C8C4BC]"
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>
        </div>

        {error && (
          <p className="text-[0.72rem] text-red-500 mt-2" style={{ fontFamily: "var(--font-sans)" }}>
            {error}
          </p>
        )}

        <button
          onClick={runSearch}
          disabled={loading}
          className="mt-6 w-full bg-gold text-white py-[1.1rem] text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors hover:bg-gold-dark disabled:bg-light-gray disabled:text-mid-gray disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {loading ? "Finding your mentors…" : "Search the Becoming Database →"}
        </button>
      </div>

      {/* Loading dots */}
      {loading && (
        <div className="bg-charcoal text-center py-12">
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block w-2 h-2 rounded-full bg-gold animate-bounce-dot"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p
            className="mt-4 text-[0.72rem] tracking-[0.15em] uppercase text-white/40"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Finding your mentors…
          </p>
        </div>
      )}

      {/* Results */}
      {matches && matches.length > 0 && (
        <div className="bg-charcoal py-12 px-8">
          <div className="max-w-[1100px] mx-auto">
            <span
              className="block text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-gold mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {matches.length} Mentor{matches.length !== 1 ? "s" : ""} Found
            </span>
            <h2
              className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light text-white mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Mentors who made the leap{from ? ` from ${from}` : ""}{" "}
              → <em className="italic text-gold">{to}</em>
            </h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-warm-white border-t-[3px] border-gold p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
                  onClick={() => (window.location.href = `/founders/${match.slug}`)}
                >
                  {match.founder.storyNumber && (
                    <span
                      className="block text-[0.56rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Founding Story #{String(match.founder.storyNumber).padStart(3, "0")}
                    </span>
                  )}
                  <div
                    className="font-serif text-[1.6rem] font-normal text-charcoal mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {match.founder.name}
                  </div>
                  <div
                    className="text-[0.75rem] font-medium text-teal mb-4"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {match.founder.businessName}
                  </div>
                  <div className="mb-4">
                    <JourneyPills
                      from={match.founder.transitionFrom}
                      to={match.founder.transitionTo}
                    />
                  </div>
                  <p
                    className="text-[0.72rem] font-light leading-[1.7] text-mid-gray mb-4 italic border-l-2 border-gold-light pl-3"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    ✦ {match.why}
                  </p>
                  <Link
                    href={`/founders/${match.slug}`}
                    className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark border-b border-gold-light pb-0.5 hover:text-gold hover:border-gold transition-colors"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    View Their Blueprint →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {matches && matches.length === 0 && (
        <div className="bg-charcoal py-12 text-center">
          <p className="text-white/50 font-serif italic text-lg" style={{ fontFamily: "var(--font-serif)" }}>
            No founders yet for that path — but more are coming.
          </p>
          <div className="mt-4">
            <BtnPrimary href="https://calendly.com/susy-megamissionmedia/30min" external>
              Talk to Susy →
            </BtnPrimary>
          </div>
        </div>
      )}
    </>
  );
}
