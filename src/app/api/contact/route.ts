import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`contact:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, phone, email, message, preferredLanguage } = parsed.data;
  console.log("Contact form submission", {
    name,
    phone,
    email,
    message,
    preferredLanguage
  });

  return NextResponse.json({ success: true });
}
