import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { founderLeads } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, email, bestTime, websiteLinkedin } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(founderLeads).values({
      name,
      email,
      bestTime: bestTime || null,
      websiteLinkedin: websiteLinkedin || null,
    });

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await Promise.all([
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "hello@seekerofstory.com",
          to: email,
          subject: "Thank you for giving back — Seeker of Story",
          html: `
            <p>Hi ${name},</p>
            <p>We received your story. We'll review your submission and be in touch soon.</p>
            <p>Your blueprint has the power to become someone else's bridge.</p>
            <br/>
            <p><em>"Seek and you shall find." — Matthew 7:7</em></p>
            <p>— The Seeker of Story Team</p>
          `,
        }),
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "hello@seekerofstory.com",
          to: process.env.SUSY_EMAIL ?? "susy@megamissionmedia.com",
          subject: `New Founder Lead: ${name}`,
          html: `
            <h2>New Founder Give-Back Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Best Time:</strong> ${bestTime || "Not provided"}</p>
            <p><strong>Website / LinkedIn:</strong> ${websiteLinkedin || "Not provided"}</p>
          `,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Give-back submission error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
