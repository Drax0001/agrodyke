"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { formatXaf, getCartSubtotal, getLineTotal } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface OrderSummaryProps {
  deliveryFee: number;
}

export default function OrderSummary({ deliveryFee }: OrderSummaryProps) {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "en";
  const { items, updateQuantity, removeItem } = useCartStore();
  const [showPromo, setShowPromo] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const subtotal = getCartSubtotal(items);
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">{t("checkout.empty")}</p>
        <Link
          href={`/${locale}`}
          className="mt-4 inline-flex rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          {t("checkout.backToStore")}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="pointer-events-none absolute right-4 top-6 text-4xl font-bold text-green-600/5">
        AGRODYKE
      </div>
      <h2 className="text-lg font-semibold text-slate-900">
        {t("checkout.summaryTitle")}
      </h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border-b border-slate-100 pb-4 last:border-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {t(`${item.nameKey}.name`)}
                </div>
                <div className="text-xs text-slate-500">{item.weight}</div>
                <div className="text-xs text-slate-500">
                  {formatXaf(item.priceXAF, locale)}
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {formatXaf(getLineTotal(item.priceXAF, item.quantity), locale)}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[1.5rem] text-center text-xs font-semibold text-slate-700">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {itemToRemove === item.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{t("checkout.removeConfirm")}</span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-red-600 hover:underline"
                    onClick={() => {
                      removeItem(item.id);
                      setItemToRemove(null);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold text-slate-600 hover:underline"
                    onClick={() => setItemToRemove(null)}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-xs font-semibold text-red-500 hover:text-red-600"
                  onClick={() => setItemToRemove(item.id)}
                >
                  {t("checkout.remove")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm text-slate-700 border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between">
          <span>{t("checkout.subtotal")}</span>
          <span className="font-semibold text-slate-900">
            {formatXaf(subtotal, locale)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("checkout.delivery")}</span>
          <span className="font-semibold text-slate-900">
            {formatXaf(deliveryFee, locale)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
          <span>{t("checkout.total")}</span>
          <span className="text-green-700">{formatXaf(total, locale)}</span>
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-600">
        <button
          type="button"
          className="font-semibold text-green-700 hover:underline focus:outline-none"
          onClick={() => setShowPromo((prev) => !prev)}
        >
          {t("checkout.promo.toggle")}
        </button>
        {showPromo ? (
          <div className="mt-3">
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
              placeholder={t("checkout.promo.placeholder")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
