"use client";

import { useTranslations } from "next-intl";

export default function WhatsAppFloat() {
  const t = useTranslations();

  return (
    <a
      href={t("whatsapp.inquiryLink")}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-xs font-semibold text-white shadow-lg"
      target="_blank"
      rel="noreferrer"
    >
      💬 {t("whatsapp.float")}
    </a>
  );
}
