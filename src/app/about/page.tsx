import Image from "next/image";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata = {
  title: "About SOS | Seeker of Story",
  description:
    "Why Seeker of Story exists — The Goodwill Principle, Susy Gordon, and a mission to make mentorship free for every career transitioner in DFW.",
};

const PILLARS = [
  {
    num: "01",
    title: "The Founder Gives",
    body: "Founders who've made the leap donate their blueprint — not money, but story. Who they were. What they built. Why they built it. How they did it. And the real vendors, costs, and contacts that made it possible.",
  },
  {
    num: "02",
    title: "The Platform Holds",
    body: "Seeker of Story collects, curates, and organizes these blueprints into a searchable database. Every profile is built through a personal process — an intro call, a discovery session, and a Ride & Share interview. Founders just show up and share.",
  },
  {
    num: "03",
    title: "The Seeker Finds",
    body: "Anyone in transition can search the database freely. No subscription. No paywall. No gatekeeping. Type where you're going — we'll surface who's already been there. The mentor finds you.",
  },
];

export default function AboutPage() {
  return (
    <>
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
          Because when you&apos;re in transition — unemployed, burned out, or standing at the
          edge of a leap — you can&apos;t afford paywalls. But somewhere out there is a founder
          who walked your exact path and is ready to be your bridge.
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
          This is not about accolades. It&apos;s not about revenue sharing. It&apos;s about a
          founder becoming a motivational speaker to someone who just lost everything — and not
          even knowing it. There is life and death in the power of the tongue. The founder who
          shares their story has instantly spoken life.
        </p>
      </section>

      {/* Susy section */}
      <section className="bg-charcoal py-20 px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-20 items-center max-md:grid-cols-1 max-md:gap-12">
          <div className="relative">
            <Image
              src="https://images.squarespace-cdn.com/content/6717e9edf71cd7695982c081/8a2092e9-222d-46e6-9f7a-e7634cb350a5/ChatGPT+Image+Feb+4%2C+2026%2C+07_36_13+PM.png?content-type=image%2Fpng"
              alt="Susy Gordon"
              width={500}
              height={667}
              className="w-full aspect-[3/4] object-cover object-top"
            />
            <div className="absolute -top-3 -left-3 w-full h-full border border-gold/30 -z-10" />
          </div>

          <div>
            <SectionLabel>The Founder</SectionLabel>
            <h2
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Meet <em className="italic text-gold">Susy Gordon</em>
            </h2>
            <p
              className="text-[0.88rem] leading-[1.9] text-white/60 font-light mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Susy Gordon is a story collector. She exists to find people&apos;s stories and
              share them so others can find their path. The car is her studio. The road is her
              stage. Every passenger carries a blueprint someone else needs.
            </p>
            <p
              className="text-[0.88rem] leading-[1.9] text-white/60 font-light mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              What started in ministry — interviewing passengers, collecting stories, giving
              them freely — has evolved into a full media and production company. The mission
              hasn&apos;t changed. The model has.
            </p>
            <p
              className="text-[0.88rem] leading-[1.9] text-white/60 font-light mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Seeker of Story is the non-profit expression of that mission. Powered by Mega
              Mission Media. Fueled by Matthew 7:7.
            </p>
            <BtnPrimary
              href="https://calendly.com/susy-megamissionmedia/30min"
              external
            >
              Schedule a Call with Susy →
            </BtnPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
