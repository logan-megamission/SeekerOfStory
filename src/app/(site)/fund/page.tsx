import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { CommunityContributeForm } from "@/components/fund/CommunityContributeForm";
import { getDonationLinks, hasDonationLinks } from "@/lib/donation-links";

export const metadata = {
  title: "Fund the Mission",
  description:
    "Support Seeker of Story — keep free mentorship alive for DFW career transitioners. Donate or contribute your time, talent, and resources.",
  openGraph: {
    title: "Fund the Mission | Seeker of Story",
    description:
      "Help keep mentorship free. Financial gifts and community contributions power the bridge between founders and seekers.",
    url: "https://seekerofstory.com/fund",
  },
  alternates: { canonical: "https://seekerofstory.com/fund" },
};

const WHERE_IT_GOES = [
  {
    title: "Platform & Hosting",
    body: "Keeping seekerofstory.com live, searchable, and free — no paywalls, ever.",
  },
  {
    title: "Media Production",
    body: "Podcast episodes, founder interviews, video production, and story pages that become lasting blueprints.",
  },
  {
    title: "Outreach & Matching",
    body: "Connecting DFW seekers with founders who've walked their path — the work Susy and Mega Mission Media do every day.",
  },
];

const OTHER_WAYS = [
  {
    title: "Share Your Story",
    body: "Founders who've made the leap can donate their blueprint — not money, but story.",
    href: "/seek",
    cta: "Make an Impact →",
  },
  {
    title: "Spread the Word",
    body: "Share a founder story, episode, or the platform with someone in transition.",
    href: "/founders",
    cta: "Browse Stories →",
  },
  {
    title: "Listen & Subscribe",
    body: "Every stream and subscription helps the SoS Podcast reach more seekers.",
    href: "/listen",
    cta: "Listen Now →",
  },
];

export default function FundPage() {
  const donationLinks = getDonationLinks();
  const showDonationLinks = hasDonationLinks();

  return (
    <>
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>Fund the Mission</SectionLabel>
        <h1
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white max-w-[700px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Keep mentorship <em className="italic text-gold">free. Always.</em>
        </h1>
        <p
          className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Seeker of Story runs on The Goodwill Principle — seekers never pay. But building the
          bridge costs real resources. Your gift helps us reach more founders, publish more
          stories, and match more mentors across DFW.
        </p>
      </section>

      <section className="bg-warm-white py-20 px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Financial Support</SectionLabel>
            <h2
              className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-charcoal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Fund the <em className="italic text-gold">bridge</em>
            </h2>
            <p
              className="text-[0.82rem] font-light leading-[1.9] text-mid-gray max-w-[520px] mx-auto mt-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              One-time or recurring gifts go directly toward keeping the platform free and
              expanding founder stories across North Texas.
            </p>
          </div>

          {showDonationLinks ? (
            <div className="grid grid-cols-2 gap-px bg-sos-border max-md:grid-cols-1 mb-12">
              {donationLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream p-8 hover:bg-gold/5 transition-colors group no-underline"
                >
                  <h3
                    className="font-serif text-[1.3rem] font-normal text-charcoal mb-2 group-hover:text-gold-dark transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {link.label} →
                  </h3>
                  <p
                    className="text-[0.78rem] font-light leading-[1.85] text-mid-gray"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-cream border-t-[3px] border-gold p-10 text-center mb-12 max-w-[560px] mx-auto">
              <p
                className="text-[0.85rem] font-light leading-[1.9] text-mid-gray mb-6"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Online donation links are being set up. In the meantime, reach out directly to
                support the mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <BtnPrimary href="tel:8178608989">Call 817-860-8989</BtnPrimary>
                <BtnPrimary href="mailto:hello@seekerofstory.com">Email Us</BtnPrimary>
              </div>
            </div>
          )}

          <SectionLabel>Transparency</SectionLabel>
          <h3
            className="font-serif text-[1.6rem] font-light text-charcoal mb-8 text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Where your gift goes
          </h3>
          <div className="grid grid-cols-3 gap-px bg-sos-border max-md:grid-cols-1">
            {WHERE_IT_GOES.map((item) => (
              <div key={item.title} className="bg-cream p-8">
                <h4
                  className="font-serif text-[1.1rem] font-normal text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-[0.78rem] font-light leading-[1.85] text-mid-gray"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 px-8 border-y border-sos-border">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>More Ways to Help</SectionLabel>
            <h2
              className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-charcoal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Not just <em className="italic text-gold">money</em>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-px bg-sos-border max-md:grid-cols-1">
            {OTHER_WAYS.map((item) => (
              <div key={item.title} className="bg-warm-white p-8 flex flex-col">
                <h3
                  className="font-serif text-[1.2rem] font-normal text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[0.78rem] font-light leading-[1.85] text-mid-gray mb-6 flex-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark hover:text-gold transition-colors no-underline"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CommunityContributeForm />

      <section className="py-20 px-8 max-w-[720px] mx-auto text-center">
        <blockquote
          className="font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-light italic text-charcoal leading-[1.6] border-l-[3px] border-gold px-8 py-4 text-left"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          &ldquo;Seekers receive free. Founders give freely. Supporters like you keep the bridge
          standing.{" "}
          <em className="text-gold not-italic">That&apos;s The Goodwill Principle.</em>&rdquo;
        </blockquote>
      </section>
    </>
  );
}
