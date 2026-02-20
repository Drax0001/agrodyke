import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("CamPay Webhook Received:", {
      event: payload.event_type, // e.g. "transaction.successful" or "transaction.failed"
      reference: payload.data?.reference,
      amount: payload.data?.amount,
      status: payload.data?.status
    });

    // TODO: When a database is connected:
    // 1. Verify the signature (if CamPay provides one)
    // 2. Look up the order by payload.data.external_reference
    // 3. Update the order status based on payload.event_type
    // 4. Send confirmation email/SMS if successful

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
