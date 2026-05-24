import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Founder } from "@/db/schema";
import { getStaticFounderBySlug, getStaticPublishedFounders } from "./founders-data";

export type FounderListItem = Pick<
  Founder,
  | "id"
  | "slug"
  | "storyNumber"
  | "name"
  | "businessName"
  | "photoUrl"
  | "sector"
  | "dfwCity"
  | "transitionFrom"
  | "transitionTo"
  | "whoTheyWere"
>;

/** DB when available; otherwise static seed (e.g. Netlify without DATABASE_URL). */
export async function getPublishedFoundersForList(): Promise<FounderListItem[]> {
  try {
    const rows = await db
      .select({
        id: founders.id,
        slug: founders.slug,
        storyNumber: founders.storyNumber,
        name: founders.name,
        businessName: founders.businessName,
        photoUrl: founders.photoUrl,
        sector: founders.sector,
        dfwCity: founders.dfwCity,
        transitionFrom: founders.transitionFrom,
        transitionTo: founders.transitionTo,
        whoTheyWere: founders.whoTheyWere,
      })
      .from(founders)
      .where(eq(founders.status, "published"))
      .orderBy(founders.storyNumber);

    if (rows.length > 0) return rows;
  } catch {
    // DATABASE_URL missing or unreachable
  }

  return getStaticPublishedFounders().map(
    ({ id, slug, storyNumber, name, businessName, photoUrl, sector, dfwCity, transitionFrom, transitionTo, whoTheyWere }) => ({
      id,
      slug,
      storyNumber,
      name,
      businessName,
      photoUrl,
      sector,
      dfwCity,
      transitionFrom,
      transitionTo,
      whoTheyWere,
    })
  );
}

export async function getPublishedFounderBySlug(slug: string): Promise<Founder | null> {
  try {
    const [row] = await db
      .select()
      .from(founders)
      .where(eq(founders.slug, slug))
      .limit(1);

    if (row?.status === "published") return row;
  } catch {
    // fall through to static
  }

  return getStaticFounderBySlug(slug) ?? null;
}
