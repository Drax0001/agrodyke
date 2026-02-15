"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Container from "@/components/shared/Container";
import { ANIMATION } from "@/lib/animations";

export default function Hero() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-green-900 text-white"
    >
      <div className="absolute inset-0">
        <ImagePlaceholder
          className="h-full w-full rounded-none bg-green-900/80 text-green-100"
          label="Hero image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-center py-24">
        <div className="max-w-2xl space-y-6">
          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut }}
            className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
          >
            🌿 {t("hero.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.duration.slower, ease: ANIMATION.easing.easeOut, delay: 0.2 }}
            className="text-4xl font-semibold leading-tight md:text-6xl"
          >
            {t("hero.headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut, delay: 0.6 }}
            className="text-lg text-green-50/90 md:text-xl"
          >
            {t("hero.subheadline")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.spring, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#pricing"
              className="rounded-full bg-green-100 px-6 py-3 text-sm font-semibold text-green-900 shadow-lg"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a
              href="#product"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
        <div className="h-10 w-6 rounded-full border border-white/60 p-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
}
