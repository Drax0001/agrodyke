"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { ANIMATION } from "@/lib/animations";

export default function HowItWorks() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const steps = t.raw("howItWorks.steps") as {
    title: string;
    description: string;
  }[];

  return (
    <section id="how-to-use" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("howItWorks.title")}
          subtitle={t("howItWorks.subtitle")}
        />
        <div className="mt-10 space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.easing.easeOut }}
              className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {/* Step number badge */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-sm text-green-900">
          {t("howItWorks.disclaimer")}
        </div>
      </Container>
    </section>
  );
}
