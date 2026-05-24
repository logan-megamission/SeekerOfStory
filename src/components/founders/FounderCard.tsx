import Link from "next/link";
import { JourneyPills } from "./JourneyPills";
import { FounderPhoto } from "./FounderPhoto";
import type { Founder } from "@/db/schema";

type Props = {
  founder: Pick<
    Founder,
    | "slug"
    | "storyNumber"
    | "name"
    | "businessName"
    | "photoUrl"
    | "transitionFrom"
    | "transitionTo"
    | "sector"
    | "dfwCity"
  > & { excerpt?: string; photoPosition?: string | null };
};

export function FounderCard({ founder }: Props) {
  return (
    <Link
      href={`/founders/${founder.slug}`}
      className="group block bg-cream overflow-hidden border-t-[3px] border-gold no-underline transition-transform duration-300 hover:-translate-y-1"
    >
      {founder.photoUrl ? (
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <FounderPhoto
            src={founder.photoUrl}
            alt={founder.name}
            photoPosition={founder.photoPosition}
            className="object-cover grayscale-[20%] transition-all duration-300 group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full h-[300px] bg-light-gray flex items-center justify-center">
          <span className="font-serif italic text-mid-gray text-[1.1rem]">
            Story Coming Soon
          </span>
        </div>
      )}

      <div className="p-8">
        {founder.storyNumber && (
          <span
            className="block text-[0.56rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Founding Story #{String(founder.storyNumber).padStart(3, "0")}
          </span>
        )}

        <h3
          className="font-serif text-[1.75rem] font-normal text-charcoal mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {founder.name}
        </h3>
        <p
          className="text-[0.75rem] font-medium text-teal mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {founder.businessName}
          {founder.dfwCity && ` · ${founder.dfwCity}, TX`}
        </p>

        <div className="mb-4">
          <JourneyPills from={founder.transitionFrom} to={founder.transitionTo} />
        </div>

        {founder.excerpt && (
          <p
            className="text-[0.8rem] leading-[1.8] text-mid-gray font-light mb-5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {founder.excerpt}
          </p>
        )}

        <span
          className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold-dark border-b border-gold-light pb-0.5 transition-colors duration-200 group-hover:text-gold group-hover:border-gold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          View Becoming Story →
        </span>
      </div>
    </Link>
  );
}
