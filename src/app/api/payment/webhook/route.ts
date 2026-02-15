import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("CamPay webhook received", payload);
  return NextResponse.json({ received: true });
}
