import { DELIVERY_FEES } from "./constants";

export type Locale = "fr" | "en";

const LOCALE_FORMATS: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US"
};

export function formatXaf(amount: number, locale: Locale) {
  const formatter = new Intl.NumberFormat(LOCALE_FORMATS[locale], {
    maximumFractionDigits: 0
  });
  return `${formatter.format(amount)} XAF`;
}

export function getLineTotal(priceXAF: number, quantity: number) {
  return priceXAF * quantity;
}

export function getCartSubtotal(
  items: { priceXAF: number; quantity: number }[]
) {
  return items.reduce((sum, item) => sum + item.priceXAF * item.quantity, 0);
}

export function getCartTotal(subtotal: number, deliveryFee: number) {
  return subtotal + deliveryFee;
}

export function getDeliveryFee(
  region: string | undefined,
  method: "delivery" | "pickup"
): number {
  if (method === "pickup") {
    return 0;
  }
  if (!region) {
    return 0;
  }
  return DELIVERY_FEES[region] ?? 0;
}
