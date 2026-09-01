import { NextResponse } from "next/server";
import { clientStale } from "@/lib/sanity/client";

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

    return NextResponse.json({ ok: true, id: doc._id }, { status: 201 });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}