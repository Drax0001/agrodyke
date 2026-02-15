"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ANIMATION } from "@/lib/animations";

export default function ProductOverview() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const highlights = t.raw("productOverview.highlights") as string[];

  return (
    <section id="product" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("productOverview.title")}
          subtitle={t("productOverview.subtitle")}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut }}
          >
            <ImagePlaceholder className="aspect-[4/3]" label="Product shot" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut }}
            className="space-y-4 text-base text-slate-700"
          >
            <p>{t("productOverview.paragraph1")}</p>
            <p>{t("productOverview.paragraph2")}</p>
            <p>{t("productOverview.paragraph3")}</p>
            <ul className="grid gap-2 text-sm font-semibold text-green-900 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  ✅ {item}
                </li>
              ))}
            </ul>
            <a href="#composition" className="text-sm font-semibold text-green-700">
              {t("productOverview.cta")}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
