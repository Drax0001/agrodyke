"use client";

import { useTranslations } from "next-intl";

interface OrderConfirmationProps {
  orderId: string;
  total: string;
  onReturn: () => void;
}

export default function OrderConfirmation({
  orderId,
  total,
  onReturn
}: OrderConfirmationProps) {
  const t = useTranslations();

  return (
    <div className="rounded-2xl border border-green-200 bg-emerald-50/50 p-8 shadow-sm text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-green-900">
        {t("checkout.success.title")}
      </h2>
      <p className="mt-2 text-green-800">
        {t("checkout.success.message")}
      </p>

      <div className="mt-8 flex flex-col gap-2 rounded-xl bg-white/60 p-4 border border-green-100">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{t("checkout.success.reference")}</span>
          <span className="font-mono font-medium text-slate-900 select-all">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm border-t border-green-100 pt-2 mt-2">
          <span className="text-slate-600">{t("checkout.success.total")}</span>
          <span className="font-bold text-green-700">{total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onReturn}
        className="mt-8 w-full rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {t("checkout.success.return")}
      </button>
    </div>
  );
}
