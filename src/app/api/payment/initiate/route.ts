import { NextResponse } from "next/server";
import { z } from "zod";
import { initiatePayment } from "@/lib/campay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const schema = z.object({
  amount: z.number().positive(),
  phoneNumber: z.string().min(6),
  operator: z.enum(["MTN", "ORANGE", "WHATSAPP"]),
  orderId: z.string().min(3),
  items: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.number().positive(),
        price: z.number().positive()
      })
    )
    .min(1),
  customerName: z.string().min(2)
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`payment-initiate:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { amount, phoneNumber, orderId, items, customerName } = parsed.data;
  const itemSummary = items.map((item) => `${item.name} x${item.quantity}`).join(", ");

  try {
    const response = await initiatePayment({
      amount,
      from: phoneNumber,
      description: `AGRODYKE Order ${orderId} - ${customerName} - ${itemSummary}`,
      externalReference: orderId
    });

    return NextResponse.json({
      success: true,
      reference: response.reference,
      ussdCode: response.ussd_code,
      operator: response.operator
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Payment initiation failed" },
      { status: 500 }
    );
  }
}
