"use client";

import { useTranslations } from "next-intl";

interface WhatsAppRedirectProps {
  onReturn: () => void;
}

export default function WhatsAppRedirect({ onReturn }: WhatsAppRedirectProps) {
  const t = useTranslations();

  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
      <div className="text-lg font-semibold text-green-900">
        {t("checkout.whatsapp.title")}
      </div>
      <div className="mt-2 text-sm text-green-900">{t("checkout.whatsapp.message")}</div>
      <button
        type="button"
        onClick={onReturn}
        className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white"
      >
        {t("checkout.whatsapp.return")}
      </button>
    </div>
  );
}
