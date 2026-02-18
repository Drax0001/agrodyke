"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { PRODUCTS } from "@/lib/constants";
import { formatXaf } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ANIMATION } from "@/lib/animations";

export default function Pricing() {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "en";
  const prefersReducedMotion = useReducedMotion();
  const { items, addItem, updateQuantity, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <section id="pricing" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: ANIMATION.stagger.normal }
            }
          }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {PRODUCTS.map((product) => {
            const item = items.find((cartItem) => cartItem.id === product.id);
            const quantity = item?.quantity ?? 0;

            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`flex flex-col rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${product.isPopular
                    ? "border-green-500 ring-2 ring-green-500/20"
                    : "border-slate-200 hover:border-green-200"
                  }`}
              >
                {/* Popular badge — outside the card flow to avoid overlap */}
                {product.isPopular ? (
                  <div className="flex justify-center pt-3">
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                      {t("pricing.bestValue")}
                    </span>
                  </div>
                ) : (
                  <div className="pt-3" />
                )}

                <div className="flex flex-1 flex-col p-6">
                  {/* Product image */}
                  <ImagePlaceholder className="aspect-[4/3] w-full" label="Product image" />

                  {/* Name */}
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {t(`${product.translationKey}.name`)}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-sm text-slate-600">
                    {t(`${product.translationKey}.description`)}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-900">
                      {formatXaf(product.priceXAF, locale)}
                    </span>
                    <span className="text-sm text-slate-500">{product.weight}</span>
                  </div>

                  {/* Spacer pushes CTA to bottom */}
                  <div className="flex-1" />

                  {/* Add to cart / quantity control */}
                  <div className="mt-6">
                    {quantity === 0 ? (
                      <button
                        type="button"
                        className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${product.isPopular
                            ? "bg-green-600 hover:bg-green-500"
                            : "bg-green-700 hover:bg-green-600"
                          }`}
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
                          className="flex h-7 w-7 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-semibold text-slate-900">
                          {t("pricing.quantity")}: {quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-5 md:flex-row md:items-center">
          <div className="text-sm text-slate-600">
            {itemCount > 0 ? (
              <span>
                <span className="font-semibold text-green-700">{itemCount}</span>{" "}
                {t("pricing.itemsInCart")}
              </span>
            ) : (
              <span className="text-slate-400">{t("pricing.itemsInCart")}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={t("pricing.whatsappLink")}
              className="rounded-full border border-green-700 px-5 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              target="_blank"
              rel="noreferrer"
            >
              {t("pricing.whatsappCTA")}
            </a>
            <Link
              href={`/${locale}/checkout`}
              className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              {t("pricing.proceed")}
              {itemCount > 0 ? (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/25 text-xs">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
