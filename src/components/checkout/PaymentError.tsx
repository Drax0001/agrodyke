"use client";

import { useTranslations } from "next-intl";

interface PaymentErrorProps {
  onRetry: () => void;
  onWhatsApp: () => void;
}

export default function PaymentError({ onRetry, onWhatsApp }: PaymentErrorProps) {
  const t = useTranslations();

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
      <div className="text-lg font-semibold text-red-700">
        {t("checkout.error.title")}
      </div>
      <div className="mt-2 text-sm text-red-600">{t("checkout.error.message")}</div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white"
        >
          {t("checkout.error.retry")}
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          className="text-sm font-semibold text-red-600"
        >
          {t("checkout.error.whatsapp")}
        </button>
      </div>
    </div>
  );
}
