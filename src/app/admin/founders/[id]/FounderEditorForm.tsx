"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { saveFounder, uploadPhoto } from "./actions";
import { FounderPhoto } from "@/components/founders/FounderPhoto";
import type { Founder, BlueprintItem } from "@/db/schema";

const SECTORS = ["Legal","Hospitality","Tech","Real Estate","Health","Media","Retail","Finance","Other"];
const CITIES  = ["Fort Worth","Dallas","Arlington","Frisco","Plano","McKinney","Irving","Garland","Grand Prairie","Other"];
const STATUSES = ["draft","pending_review","published"];

const field = "flex flex-col gap-1.5";
const label = "text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray";
const input = "bg-white border border-sos-border px-3 py-2.5 text-[0.82rem] text-charcoal outline-none focus:border-gold transition-colors w-full";
const textarea = `${input} resize-none`;

type Props = { founder: Founder };

export function FounderEditorForm({ founder }: Props) {
  const [form, setForm] = useState({
    name:           founder.name,
    businessName:   founder.businessName,
    storyNumber:    founder.storyNumber?.toString() ?? "",
    sector:         founder.sector,
    dfwCity:        founder.dfwCity,
    transitionFrom: founder.transitionFrom ?? "",
    transitionTo:   founder.transitionTo ?? "",
    whoTheyWere:    founder.whoTheyWere ?? "",
    whatTheyBuilt:  founder.whatTheyBuilt ?? "",
    whyTheyBuiltIt: founder.whyTheyBuiltIt ?? "",
    youtubeUrl:     founder.youtubeUrl ?? "",
    spotifyEpisodeUrl: founder.spotifyEpisodeUrl ?? "",
    applePodcastUrl:   founder.applePodcastUrl ?? "",
    buzzsproutUrl:     founder.buzzsproutUrl ?? "",
    websiteUrl:     founder.websiteUrl ?? "",
    linkedinUrl:    founder.linkedinUrl ?? "",
    contactEmail:   founder.contactEmail ?? "",
    status:         founder.status,
  });

  const [blueprint, setBlueprint] = useState<BlueprintItem[]>(
    (founder.blueprint as BlueprintItem[]) ?? []
  );
  const [photoUrl, setPhotoUrl] = useState(founder.photoUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, startSaving] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Blueprint helpers
  const addBlueprint = () => setBlueprint((b) => [...b, { category: "", value: "", url: "" }]);
  const removeBlueprint = (i: number) => setBlueprint((b) => b.filter((_, idx) => idx !== i));
  const setBlueprint_ = (i: number, key: keyof BlueprintItem, val: string) =>
    setBlueprint((b) => b.map((item, idx) => idx === i ? { ...item, [key]: val } : item));

  // Photo upload
  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("founderId", founder.id.toString());
      const url = await uploadPhoto(fd);
      setPhotoUrl(url);
    } catch {
      setError("Photo upload failed.");
    } finally {
      setUploading(false);
    }
  }

  // Save
  function handleSave() {
    setError("");
    setSaved(false);
    startSaving(async () => {
      try {
        await saveFounder({
          id: founder.id,
          ...form,
          storyNumber: form.storyNumber ? parseInt(form.storyNumber) : null,
          photoUrl,
          blueprint,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch {
        setError("Save failed. Please try again.");
      }
    });
  }

  // YouTube embed preview ID
  const ytId = form.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];

  return (
    <div className="flex flex-col gap-8">

      {/* ── Row 1: Photo + Basic Info ── */}
      <div className="grid grid-cols-[200px_1fr] gap-6 max-md:grid-cols-1">

        {/* Photo */}
        <div className="bg-white border border-sos-border p-4 flex flex-col gap-3">
          <span className={label} style={{ fontFamily: "var(--font-sans)" }}>Photo</span>
          <div className="relative w-full aspect-[3/4] bg-light-gray overflow-hidden">
            {photoUrl ? (
              <FounderPhoto
                src={photoUrl}
                alt={form.name}
                photoPosition={founder.photoPosition ?? undefined}
                sizes="120px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[0.7rem] text-mid-gray italic">No photo</span>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <span className="text-[0.7rem] text-gold">Uploading…</span>
              </div>
            )}
          </div>
          <label className="cursor-pointer text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-center text-gold-dark border border-gold-light px-3 py-2 hover:bg-gold hover:text-white transition-all duration-200"
            style={{ fontFamily: "var(--font-sans)" }}>
            {uploading ? "Uploading…" : "Upload Photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
          </label>
          {photoUrl && (
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
              className={`${input} text-[0.68rem]`} placeholder="or paste image URL"
              style={{ fontFamily: "var(--font-sans)" }} />
          )}
        </div>

        {/* Basic fields */}
        <div className="bg-white border border-sos-border p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Full Name *</label>
              <input className={input} value={form.name} onChange={set("name")} style={{ fontFamily: "var(--font-sans)" }} />
            </div>
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Business Name *</label>
              <input className={input} value={form.businessName} onChange={set("businessName")} style={{ fontFamily: "var(--font-sans)" }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Story #</label>
              <input type="number" className={input} value={form.storyNumber} onChange={set("storyNumber")}
                placeholder="e.g. 1" style={{ fontFamily: "var(--font-sans)" }} />
            </div>
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Sector</label>
              <select className={input} value={form.sector} onChange={set("sector")} style={{ fontFamily: "var(--font-sans)" }}>
                {SECTORS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>DFW City</label>
              <select className={input} value={form.dfwCity} onChange={set("dfwCity")} style={{ fontFamily: "var(--font-sans)" }}>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Transition From</label>
              <input className={input} value={form.transitionFrom} onChange={set("transitionFrom")}
                placeholder="e.g. 25 Years in Tech" style={{ fontFamily: "var(--font-sans)" }} />
            </div>
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Transition To</label>
              <input className={input} value={form.transitionTo} onChange={set("transitionTo")}
                placeholder="e.g. Tour Company Founder" style={{ fontFamily: "var(--font-sans)" }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Website</label>
              <input className={input} value={form.websiteUrl} onChange={set("websiteUrl")}
                placeholder="https://" style={{ fontFamily: "var(--font-sans)" }} />
            </div>
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>LinkedIn</label>
              <input className={input} value={form.linkedinUrl} onChange={set("linkedinUrl")}
                placeholder="https://linkedin.com/in/..." style={{ fontFamily: "var(--font-sans)" }} />
            </div>
            <div className={field}>
              <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Contact Email</label>
              <input type="email" className={input} value={form.contactEmail} onChange={set("contactEmail")}
                placeholder="founder@example.com" style={{ fontFamily: "var(--font-sans)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Story Sections ── */}
      <div className="bg-white border border-sos-border p-6 flex flex-col gap-5">
        <h2 className="font-serif text-[1.1rem] font-light text-charcoal border-b border-sos-border pb-3"
          style={{ fontFamily: "var(--font-serif)" }}>
          Becoming Story
        </h2>
        {[
          { key: "whoTheyWere",    label: "Who They Were" },
          { key: "whatTheyBuilt",  label: "What They Built" },
          { key: "whyTheyBuiltIt", label: "Why They Built It" },
        ].map(({ key, label: lbl }) => (
          <div key={key} className={field}>
            <label className={label} style={{ fontFamily: "var(--font-sans)" }}>{lbl}</label>
            <textarea rows={4} className={textarea}
              value={form[key as keyof typeof form] as string}
              onChange={set(key)}
              style={{ fontFamily: "var(--font-sans)" }} />
          </div>
        ))}
      </div>

      {/* ── Blueprint ── */}
      <div className="bg-white border border-sos-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-[1.1rem] font-light text-charcoal"
            style={{ fontFamily: "var(--font-serif)" }}>
            Blueprint
          </h2>
          <button onClick={addBlueprint}
            className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-gold-dark border border-gold-light px-3 py-1.5 hover:bg-gold hover:text-white transition-all duration-200"
            style={{ fontFamily: "var(--font-sans)" }}>
            + Add Item
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {blueprint.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_2fr_auto] gap-3 items-start">
              <input className={input} value={item.category} onChange={(e) => setBlueprint_(i, "category", e.target.value)}
                placeholder="Category (e.g. Website)" style={{ fontFamily: "var(--font-sans)" }} />
              <input className={input} value={item.value} onChange={(e) => setBlueprint_(i, "value", e.target.value)}
                placeholder="Value (e.g. cowtowntourco.com)" style={{ fontFamily: "var(--font-sans)" }} />
              <input className={input} value={item.url ?? ""} onChange={(e) => setBlueprint_(i, "url", e.target.value)}
                placeholder="URL (optional)" style={{ fontFamily: "var(--font-sans)" }} />
              <button onClick={() => removeBlueprint(i)}
                className="text-red-400 hover:text-red-600 text-[1rem] px-2 py-2.5 transition-colors">
                ×
              </button>
            </div>
          ))}
          {blueprint.length === 0 && (
            <p className="text-[0.75rem] text-mid-gray italic" style={{ fontFamily: "var(--font-sans)" }}>
              No blueprint items yet. Click + Add Item to start.
            </p>
          )}
        </div>
      </div>

      {/* ── Media ── */}
      <div className="bg-white border border-sos-border p-6 flex flex-col gap-5">
        <h2 className="font-serif text-[1.1rem] font-light text-charcoal border-b border-sos-border pb-3"
          style={{ fontFamily: "var(--font-serif)" }}>
          Media &amp; Podcast
        </h2>

        <div className={field}>
          <label className={label} style={{ fontFamily: "var(--font-sans)" }}>YouTube URL (Ride &amp; Share video)</label>
          <input className={input} value={form.youtubeUrl} onChange={set("youtubeUrl")}
            placeholder="https://youtube.com/watch?v=..." style={{ fontFamily: "var(--font-sans)" }} />
        </div>

        {/* Live YouTube embed preview */}
        {ytId && (
          <div className="aspect-video">
            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${ytId}`}
              title="YouTube preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className={field}>
            <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Spotify Episode URL</label>
            <input className={input} value={form.spotifyEpisodeUrl} onChange={set("spotifyEpisodeUrl")}
              placeholder="https://open.spotify.com/episode/..." style={{ fontFamily: "var(--font-sans)" }} />
          </div>
          <div className={field}>
            <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Apple Podcasts URL</label>
            <input className={input} value={form.applePodcastUrl} onChange={set("applePodcastUrl")}
              placeholder="https://podcasts.apple.com/..." style={{ fontFamily: "var(--font-sans)" }} />
          </div>
          <div className={field}>
            <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Buzzsprout URL</label>
            <input className={input} value={form.buzzsproutUrl} onChange={set("buzzsproutUrl")}
              placeholder="https://buzzsprout.com/..." style={{ fontFamily: "var(--font-sans)" }} />
          </div>
        </div>
      </div>

      {/* ── Status + Save ── */}
      <div className="bg-white border border-sos-border p-6 flex items-center justify-between gap-4">
        <div className={field}>
          <label className={label} style={{ fontFamily: "var(--font-sans)" }}>Status</label>
          <select className={`${input} w-48`} value={form.status} onChange={set("status")}
            style={{ fontFamily: "var(--font-sans)" }}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          {error && <p className="text-[0.72rem] text-red-500" style={{ fontFamily: "var(--font-sans)" }}>{error}</p>}
          {saved && <p className="text-[0.72rem] text-green-600 font-medium" style={{ fontFamily: "var(--font-sans)" }}>✓ Saved</p>}
          <a href={`/founders/${founder.slug}`} target="_blank"
            className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-mid-gray border border-sos-border px-4 py-2.5 hover:border-gold hover:text-gold-dark transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}>
            Preview →
          </a>
          <button onClick={handleSave} disabled={saving}
            className="bg-gold text-white px-6 py-2.5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase hover:bg-gold-dark disabled:bg-light-gray disabled:text-mid-gray transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
