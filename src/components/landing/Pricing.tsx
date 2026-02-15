"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { PRODUCTS } from "@/lib/constants";
import { formatXaf } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function Pricing() {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "en";
  const { items, addItem, updateQuantity, getItemCount } = useCartStore();

  return (
    <section id="pricing" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((product) => {
            const item = items.find((cartItem) => cartItem.id === product.id);
            const quantity = item?.quantity ?? 0;

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-green-200 hover:shadow-md"
              >
                <div>
                  <ImagePlaceholder className="mb-4 aspect-[4/3]" label="Product image" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {t(`${product.translationKey}.name`)}
                    </h3>
                    {product.isPopular ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        {t("pricing.bestValue")}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {t(`${product.translationKey}.description`)}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-green-900">
                      {formatXaf(product.priceXAF, locale)}
                    </span>
                    <span className="text-sm text-slate-500">{product.weight}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      className="w-full rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          nameKey: product.translationKey,
                          weight: product.weight,
                          priceXAF: product.priceXAF
                        })
                      }
                    >
                      {t("pricing.addToOrder")}
                    </button>
                  ) : (
                    <div className="flex w-full items-center justify-between rounded-full border border-slate-200 px-3 py-2 text-sm">
                      <button
                        type="button"
                        className="rounded-full px-2 py-1 text-green-700 hover:bg-green-50"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-semibold text-slate-900">
                        {t("pricing.quantity")}: {quantity}
                      </span>
                      <button
                        type="button"
                        className="rounded-full px-2 py-1 text-green-700 hover:bg-green-50"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm text-slate-600">
            {getItemCount()} {t("pricing.itemsInCart")}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/checkout`}
              className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              {t("pricing.proceed")}
            </Link>
            <a
              href={t("pricing.whatsappLink")}
              className="rounded-full border border-green-700 px-6 py-3 text-sm font-semibold text-green-700"
              target="_blank"
              rel="noreferrer"
            >
              {t("pricing.whatsappCTA")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
