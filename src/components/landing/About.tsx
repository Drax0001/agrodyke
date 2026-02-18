"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ANIMATION } from "@/lib/animations";

export default function About() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = t.raw("about.story") as string[];
  const milestones = t.raw("about.milestones") as string[];

  return (
    <section id="about" className="bg-white">
      <Container className="py-16">
        <SectionHeading title={t("about.title")} subtitle={t("about.subtitle")} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut }}
          >
            <ImagePlaceholder className="aspect-[4/5]" label="Founder photo" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut, delay: 0.15 }}
            className="space-y-4 text-sm text-slate-700"
          >
            <div className="text-base font-semibold text-green-900">
              {t("about.founder")}
            </div>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-6 space-y-2 text-xs font-semibold text-green-700">
              {milestones.map((milestone) => (
                <div key={milestone} className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-500">✓</span>
                  {milestone}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
