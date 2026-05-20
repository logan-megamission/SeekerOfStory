import { SectionLabel } from "@/components/shared/SectionLabel";
import { LocalBusinessSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About SOS",
  description:
    "Why Seeker of Story exists — The Goodwill Principle, Susy Gordon, and a mission to make mentorship free for every career transitioner in DFW.",
  openGraph: {
    title: "About Seeker of Story",
    description: "The Goodwill Principle: founders give their blueprint, seekers find their path. Free. Always. Fort Worth, TX.",
    url: "https://seekerofstory.com/about",
  },
  alternates: { canonical: "https://seekerofstory.com/about" },
};

const PILLARS = [
  {
    num: "01",
    title: "Founders Give",
    body: "Founders give because they're finally in a position to give freely. They share who they were, what they're building, why they're building it, and the lessons that shaped the journey.",
  },
  {
    num: "02",
    title: "SOS Becomes the Bridge",
    body: "It carries stories, blueprints, wisdom, and lived experience from people willing to share what they've learned so someone else doesn't have to walk alone.",
  },
  {
    num: "03",
    title: "The Seeker Finds Hope",
    body: "Anyone in transition can search the Becoming Database freely. No monthly subscriptions. No gatekeeping.",
  },
];

export default function AboutPage() {
  return (
    <>
      <LocalBusinessSchema />
      {/* Dark hero */}
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>Our Mission</SectionLabel>
        <h1
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Why <em className="italic text-gold">Seeker of Story</em> Exists
        </h1>
        <p
          className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          When you&apos;re in transition, unemployed, burned out, or standing at the{" "}
          <em className="italic text-gold/80">edge of a leap</em>, you can&apos;t afford high,
          overrated, astronomical monthly subscriptions. But somewhere out there is a founder
          who already walked <em className="italic text-gold/80">your exact path</em> and is
          ready to become your mentor.
        </p>
      </section>

      {/* Pillars */}
      <section className="bg-warm-white py-20 px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>The Model</SectionLabel>
            <h2
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Built on <em className="italic text-gold">The Goodwill Principle</em>
            </h2>
            <div className="w-[60px] h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-3 gap-px bg-sos-border max-md:grid-cols-1">
            {PILLARS.map((p) => (
              <div key={p.num} className="bg-cream p-10">
                <div
                  className="font-serif text-[3.5rem] font-light text-gold-light leading-none mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {p.num}
                </div>
                <h3
                  className="font-serif text-[1.4rem] font-normal text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-[0.8rem] leading-[1.85] text-mid-gray font-light"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-center text-[0.82rem] font-light leading-[1.9] text-mid-gray max-w-[680px] mx-auto mt-12 border-t border-sos-border pt-10"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            This isn&apos;t about accolades or revenue sharing. It&apos;s about a founder unknowingly
            becoming a voice of hope to someone.{" "}
            <em className="italic text-charcoal">
              There is life and death in the power of the tongue, and the founder who shares
              their story has already spoken life.
            </em>
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-8 max-w-[900px] mx-auto text-center">
        <SectionLabel>The Goodwill Model</SectionLabel>
        <h2
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          People give. <em className="italic text-gold">Others receive.</em>
          <br />The platform is the bridge.
        </h2>
        <blockquote
          className="font-serif text-[clamp(1.3rem,2.5vw,2rem)] font-light italic text-charcoal leading-[1.6] border-l-[3px] border-gold px-8 py-6 text-left mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          &ldquo;Think of Goodwill. People bring what they&apos;ve outgrown — their goods, their
          experience, their surplus — and the store makes it available to anyone who needs it.
          Seeker of Story works the same way. Founders bring what they&apos;ve lived. Seekers
          receive what they need.{" "}
          <em className="text-gold">Free. Always.</em>&rdquo;
        </blockquote>
        <p
          className="text-[0.82rem] font-light text-mid-gray leading-[1.9] max-w-[600px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          This isn&apos;t about accolades or revenue sharing. It&apos;s about a founder unknowingly
          becoming a voice of hope to someone. There is life and death in the power of the
          tongue, and the founder who shares their story has already spoken life.
        </p>
      </section>

    </>
  );
}
