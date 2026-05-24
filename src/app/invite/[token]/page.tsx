import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { founderInvites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BtnPrimary } from "@/components/shared/BtnPrimary";

type Props = { params: Promise<{ token: string }> };

export const metadata = {
  title: "Founding Story Invite",
  robots: { index: false, follow: false },
};

export default async function FounderInvitePage({ params }: Props) {
  const { token } = await params;

  let invite;
  try {
    [invite] = await db
      .select({
        name: founderInvites.name,
        status: founderInvites.status,
      })
      .from(founderInvites)
      .where(eq(founderInvites.token, token))
      .limit(1);
  } catch {
    notFound();
  }

  if (!invite) notFound();

  return (
    <>
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>Seeker of Story</SectionLabel>
        <h1
          className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white max-w-[640px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          You&apos;re invited, <em className="italic text-gold">{invite.name.split(" ")[0]}</em>
        </h1>
        <p
          className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[520px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Mega Mission Media invited you to document your founding story for the Becoming Database.
        </p>
      </section>

      <section className="bg-warm-white py-16 px-8">
        <div className="max-w-[560px] mx-auto text-center">
          {invite.status === "pending" && (
            <>
              <p
                className="text-[0.84rem] text-charcoal font-light leading-[1.9] mb-8"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Next step: schedule your intro call with Susy. She&apos;ll walk you through the
                Ride &amp; Share process and what to expect.
              </p>
              <BtnPrimary
                href="https://calendly.com/susy-megamissionmedia/30min"
                external
              >
                Schedule with Susy →
              </BtnPrimary>
            </>
          )}
          {invite.status === "submitted" && (
            <p
              className="text-[0.84rem] text-mid-gray font-light italic"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Thank you — your story submission is with the team.
            </p>
          )}
          {invite.status === "published" && (
            <p
              className="text-[0.84rem] text-mid-gray font-light mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Your founding story is live on Seeker of Story.
            </p>
          )}
          <Link
            href="/founders"
            className="inline-block mt-10 text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark hover:text-gold transition-colors no-underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Explore founding stories →
          </Link>
        </div>
      </section>
    </>
  );
}
