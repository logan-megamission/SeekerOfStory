import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { seekers } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, email, currentSituation, desiredDirection } = await req.json();

    if (!name || !email || !desiredDirection) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(seekers).values({
      name,
      email,
      currentSituation: currentSituation || "",
      desiredDirection,
    });

    // Send emails via Resend if configured
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await Promise.all([
        // Confirmation to seeker
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "hello@seekerofstory.com",
          to: email,
          subject: "We received your story — Seeker of Story",
          html: `
            <p>Hi ${name},</p>
            <p>We received your submission. Susy will review your story and connect you with the founder whose journey most closely mirrors where you want to go.</p>
            <p>Check back soon — your mentor match is on the way.</p>
            <br/>
            <p><em>"Seek and you shall find." — Matthew 7:7</em></p>
            <p>— The Seeker of Story Team</p>
          `,
        }),
        // Alert to Susy
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "hello@seekerofstory.com",
          to: process.env.SUSY_EMAIL ?? "susy@megamissionmedia.com",
          subject: `New Seeker Submission: ${name}`,
          html: `
            <h2>New Seeker Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Current Situation:</strong> ${currentSituation || "Not provided"}</p>
            <p><strong>Desired Direction:</strong> ${desiredDirection}</p>
            <br/>
            <p><a href="${process.env.NEXT_PUBLIC_URL ?? "https://seekerofstory.com"}/admin/seekers">View in Admin →</a></p>
          `,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Seek submission error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
