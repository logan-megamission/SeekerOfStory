import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata = {
  title: "Admin Setup",
  robots: { index: false, follow: false },
};

export default function AdminSetupPage() {
  return (
    <>
      <section className="bg-charcoal py-22 px-8 text-center">
        <SectionLabel light>Admin Panel</SectionLabel>
        <h1
          className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white max-w-[640px] mx-auto mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Admin access is <em className="italic text-gold">coming soon</em>
        </h1>
        <p
          className="text-white/55 text-[0.9rem] font-light leading-[1.9] max-w-[520px] mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          The public site is live. Admin sign-in will be enabled after the custom domain is
          connected and Clerk authentication is configured.
        </p>
      </section>

      <section className="bg-warm-white py-16 px-8">
        <div className="max-w-[640px] mx-auto">
          <SectionLabel>Setup order</SectionLabel>
          <ol
            className="mt-6 space-y-4 text-[0.82rem] font-light leading-[1.9] text-mid-gray list-decimal list-inside"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li>
              Connect <strong className="text-charcoal font-medium">seekerofstory.com</strong>{" "}
              in Vercel → Project Settings → Domains
            </li>
            <li>In Clerk, add the production domain under Configure → Domains</li>
            <li>
              Add{" "}
              <code className="text-[0.75rem] bg-cream px-1">
                NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
              </code>{" "}
              and <code className="text-[0.75rem] bg-cream px-1">CLERK_SECRET_KEY</code> to
              Vercel Production env
            </li>
            <li>
              Redeploy, then pull locally:{" "}
              <code className="text-[0.75rem] bg-cream px-1">vercel env pull .env.local</code>
            </li>
          </ol>

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
