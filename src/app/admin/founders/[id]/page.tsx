import { notFound } from "next/navigation";
import { db } from "@/db";
import { founders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FounderEditorForm } from "./FounderEditorForm";

type Props = { params: Promise<{ id: string }> };

export default async function AdminFounderEditorPage({ params }: Props) {
  const { id } = await params;

  const [founder] = await db
    .select()
    .from(founders)
    .where(eq(founders.id, parseInt(id)))
    .limit(1);

  if (!founder) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <a href="/admin/founders" className="text-[0.7rem] text-mid-gray hover:text-charcoal transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}>
          ← Founders
        </a>
        <span className="text-sos-border">/</span>
        <h1 className="font-serif text-[1.75rem] font-light text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}>
          {founder.name}
        </h1>
        <span className={`ml-2 text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 ${
          founder.status === "published" ? "bg-green-100 text-green-800" :
          founder.status === "pending_review" ? "bg-blue-100 text-blue-800" :
          "bg-yellow-100 text-yellow-800"
        }`}>
          {founder.status.replace("_", " ")}
        </span>
      </div>

      <FounderEditorForm founder={founder} />
    </div>
  );
}
