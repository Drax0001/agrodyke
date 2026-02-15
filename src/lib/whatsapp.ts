const WHATSAPP_NUMBER = "237675405348";

interface WhatsAppOrderParams {
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  customerName: string;
  customerPhone: string;
  city: string;
  region: string;
  address: string;
  locale: "en" | "fr";
}

export function generateOrderWhatsAppURL(params: WhatsAppOrderParams): string {
  const { items, total, customerName, customerPhone, city, region, address, locale } =
    params;

  const itemLines = items
    .map((item) => `• ${item.name} × ${item.quantity} — ${item.price} XAF`)
    .join("\n");

  const message =
    locale === "fr"
      ? `Bonjour! Je souhaite commander de l'engrais AGRODYKE:\n\n${itemLines}\n\nTotal: ${total} XAF\n\nMes informations:\nNom: ${customerName}\nTéléphone: ${customerPhone}\nLivraison: ${city}, ${region}\nAdresse: ${address}\n\nJe souhaite discuter et organiser le paiement. Merci!`
      : `Hello! I would like to order AGRODYKE fertilizer:\n\n${itemLines}\n\nTotal: ${total} XAF\n\nMy Info:\nName: ${customerName}\nPhone: ${customerPhone}\nDelivery: ${city}, ${region}\nAddress: ${address}\n\nI would like to discuss and arrange payment. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateInquiryWhatsAppURL(locale: "en" | "fr"): string {
  const message =
    locale === "fr"
      ? "Bonjour! Je suis intéressé(e) par l'engrais organique AGRODYKE. J'aimerais en savoir plus."
      : "Hello! I'm interested in AGRODYKE organic fertilizer. I'd like to learn more.";

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
