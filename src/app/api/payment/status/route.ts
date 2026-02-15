import { NextResponse } from "next/server";
import { checkPaymentStatus } from "@/lib/campay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(`payment-status:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const response = await checkPaymentStatus(reference);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Status check failed" },
      { status: 500 }
    );
  }
}
