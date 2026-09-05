import { NextResponse } from "next/server";
import { clientStale } from "@/lib/sanity/client";
import { getSiteSettings } from "@/lib/sanity/data";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 },
      );
    }

    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: "Sanity write token not configured." },
        { status: 500 },
      );
    }

    const doc = await clientStale.create({
      _type: "contactSubmission",
      name,
      email,
      phone,
      service,
      message,
      submittedAt: new Date().toISOString(),
    });

    const settings = await getSiteSettings();
    const adminEmail = settings?.adminEmail;

    if (adminEmail && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${name}" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: adminEmail,
          subject: `New Contact Form Submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service || "N/A"}\n\nMessage:\n${message}`,
        });
      } catch (err) {
        console.error("Failed to send email notification:", err);
      }
    } else {
      console.log("Email notification skipped: missing adminEmail or SMTP credentials.");
    }

    return NextResponse.json({ ok: true, id: doc._id }, { status: 201 });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}