import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata = {
  title: "Admin Setup",
  robots: { index: false, follow: false },
};

const clerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

export default function AdminSetupPage() {
  if (clerkConfigured) {
    return (
      <>
        <section className="bg-charcoal py-22 px-8 text-center">
          <SectionLabel light>Admin Panel</SectionLabel>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white max-w-[640px] mx-auto mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Sign in to <em className="italic text-gold">admin</em>
          </h1>
          <p
            className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[520px] mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Clerk is configured. Use your team account to access the dashboard.
          </p>
        </section>
        <section className="bg-warm-white py-16 px-8 text-center">
          <Link
            href="/sign-in"
            className="inline-block text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark border-b border-gold-light pb-0.5 hover:text-gold transition-colors no-underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Go to sign in →
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>Admin Panel</SectionLabel>
        <h1
          className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white max-w-[640px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Admin access is <em className="italic text-gold">not configured</em>
        </h1>
        <p
          className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[520px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Add Clerk keys to Netlify environment variables, then redeploy.
        </p>
      </section>

      <section className="bg-warm-white py-16 px-8">
        <div className="max-w-[640px] mx-auto">
          <SectionLabel>Setup checklist</SectionLabel>
          <ol
            className="mt-6 space-y-4 text-[0.82rem] font-light leading-[1.9] text-mid-gray list-decimal list-inside"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li>
              <a
                href="https://dashboard.clerk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark hover:text-gold"
              >
                Clerk Dashboard
              </a>
              {" → Configure → Domains: add "}
              <strong className="text-charcoal font-medium">seekerofstory.com</strong>
              {", "}
              <strong className="text-charcoal font-medium">www.seekerofstory.com</strong>
              {", and your "}
              <code className="text-[0.75rem] bg-cream px-1">*.netlify.app</code> URL
            </li>
            <li>
              Clerk → Users → invite your admin accounts (disable public sign-up under
              Restrictions if you only want invited users)
            </li>
            <li>
              Netlify → Environment variables:{" "}
              <code className="text-[0.75rem] bg-cream px-1">
                NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
              </code>
              , <code className="text-[0.75rem] bg-cream px-1">CLERK_SECRET_KEY</code>, plus
              sign-in URLs below
            </li>
            <li>Trigger a new deploy on Netlify</li>
          </ol>

          <p
            className="mt-8 text-[0.75rem] text-mid-gray font-light"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Optional env vars (recommended):
          </p>
          <pre className="mt-2 p-4 bg-cream border border-sos-border text-[0.7rem] overflow-x-auto">
{`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin`}
          </pre>

          <Link
            href="/"
            className="inline-block mt-10 text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark hover:text-gold transition-colors no-underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            ← Back to site
          </Link>
        </div>
      </section>
    </>
  );
}
