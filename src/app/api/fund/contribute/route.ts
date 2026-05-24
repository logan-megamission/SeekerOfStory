import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { communityContributions } from "@/db/schema";

const VALID_TYPES = [
  "volunteer",
  "in_kind",
  "partnership",
  "media",
  "other",
] as const;

export async function POST(req: NextRequest) {
  try {
    const { name, email, contributionType, message } = await req.json();

    if (!name || !email || !contributionType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!VALID_TYPES.includes(contributionType)) {
      return NextResponse.json({ error: "Invalid contribution type" }, { status: 400 });
    }

    await db.insert(communityContributions).values({
      name,
      email,
      contributionType,
      message: message || null,
    });

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const typeLabel: Record<string, string> = {
        volunteer: "Volunteer time",
        in_kind: "In-kind donation",
        partnership: "Partnership / sponsorship",
        media: "Media / promotion",
        other: "Other",
      };

      await Promise.all([
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "hello@seekerofstory.com",
          to: email,
          subject: "Thank you for supporting Seeker of Story",
          html: `
            <p>Hi ${name},</p>
            <p>We received your community contribution offer. Susy and the team will review it and be in touch soon.</p>
            <p>Every gift — time, talent, or resources — helps keep mentorship free for seekers across DFW.</p>
            <br/>
            <p><em>"Seek and you shall find." — Matthew 7:7</em></p>
            <p>— The Seeker of Story Team</p>
          `,
        }),
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "hello@seekerofstory.com",
          to: process.env.SUSY_EMAIL ?? "susy@megamissionmedia.com",
          subject: `New Community Contribution: ${name}`,
          html: `
            <h2>New Community Contribution</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${typeLabel[contributionType] ?? contributionType}</p>
            <p><strong>Message:</strong> ${message || "Not provided"}</p>
          `,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Community contribution error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
