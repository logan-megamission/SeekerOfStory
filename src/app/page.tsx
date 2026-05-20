import { SearchEngine } from "@/components/shared/SearchEngine";

export default async function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-charcoal px-8 py-24 text-center relative overflow-hidden">
        <div className="absolute -top-[120px] -left-[120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(42,123,123,0.08)_0%,transparent_70%)] pointer-events-none" />

        <span
          className="block text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-6"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards", fontFamily: "var(--font-sans)" }}
        >
          SEEKEROFSTORY.COM – MEGA MISSION
        </span>

        <h1
          className="font-serif text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] text-white mb-2"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards", fontFamily: "var(--font-serif)" }}
        >
          Find the mentor who<br />
          <em className="italic text-gold">walked your path</em>
        </h1>

        <span
          className="text-[0.65rem] font-medium tracking-[0.22em] uppercase text-gold-dark border border-gold/30 px-6 py-2 inline-block mb-14"
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.8s forwards", fontFamily: "var(--font-sans)" }}
        >
          Matthew 7:7 — Seek and you shall find
        </span>

        <SearchEngine />
      </section>

    </>
  );
}
