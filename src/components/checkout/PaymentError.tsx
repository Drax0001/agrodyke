"use client";

import { useTranslations } from "next-intl";

interface PaymentErrorProps {
  onRetry: () => void;
  onWhatsApp: () => void;
}

export default function PaymentError({ onRetry, onWhatsApp }: PaymentErrorProps) {
  const t = useTranslations();

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>

      <h2 className="text-xl font-bold text-red-900">
        {t("checkout.error.title")}
      </h2>
      <p className="mt-2 text-sm text-red-700 max-w-xs mx-auto">
        {t("checkout.error.message")}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {t("checkout.error.retry")}
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          className="rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {t("checkout.error.whatsapp")}
        </button>
      </div>
    </div>
  );
}
