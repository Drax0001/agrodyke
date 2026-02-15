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
    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
      <div className="text-lg font-semibold text-green-900">
        {t("checkout.success.title")}
      </div>
      <div className="mt-2 text-sm text-green-900">
        {t("checkout.success.message")}
      </div>
      <div className="mt-4 text-xs text-green-900">
        {t("checkout.success.reference")}: {orderId}
      </div>
      <div className="mt-2 text-xs text-green-900">
        {t("checkout.success.total")}: {total}
      </div>
      <button
        type="button"
        onClick={onReturn}
        className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white"
      >
        {t("checkout.success.return")}
      </button>
    </div>
  );
}
