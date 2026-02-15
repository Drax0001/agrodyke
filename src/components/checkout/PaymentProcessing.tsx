"use client";

import { useTranslations } from "next-intl";

interface PaymentProcessingProps {
  reference: string;
  secondsLeft: number;
  onCancel: () => void;
}

export default function PaymentProcessing({
  reference,
  secondsLeft,
  onCancel
}: PaymentProcessingProps) {
  const t = useTranslations();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-green-200 border-t-green-700" />
        <div>
          <div className="text-sm font-semibold text-slate-900">
            {t("checkout.processing.title")}
          </div>
          <div className="text-xs text-slate-600">{t("checkout.processing.subtitle")}</div>
        </div>
      </div>
      <div className="mt-4 text-xs text-slate-600">
        {t("checkout.processing.reference")}: {reference}
      </div>
      <div className="mt-2 text-xs text-slate-600">
        {t("checkout.processing.countdown")}: {secondsLeft}s
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mt-6 text-sm font-semibold text-slate-600"
      >
        {t("checkout.processing.cancel")}
      </button>
    </div>
  );
}
