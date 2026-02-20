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

  // Pulse animation for the instruction
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center relative">
        <svg className="h-full w-full animate-spin text-slate-200" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          />
        </svg>
        <svg className="absolute inset-0 h-full w-full animate-spin text-green-600" viewBox="0 0 100 100" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray="200"
            strokeDashoffset="100"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xl font-bold text-slate-700">
          {secondsLeft}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-slate-900 animate-pulse">
          {t("checkout.processing.subtitle")}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          {t("checkout.processing.title")}
        </p>
      </div>

      <div className="mt-6 inline-block rounded-lg bg-slate-50 px-4 py-2 text-xs font-mono text-slate-600">
        Ref: {reference}
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          {t("checkout.processing.cancel")}
        </button>
      </div>
    </div>
  );
}
