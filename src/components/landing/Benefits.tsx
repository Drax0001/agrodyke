"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { ANIMATION } from "@/lib/animations";

export default function Benefits() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const benefits = t.raw("benefits.items") as { title: string; description: string }[];

  return (
    <section id="benefits" className="bg-white">
      <Container className="py-16">
        <SectionHeading title={t("benefits.title")} subtitle={t("benefits.subtitle")} />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: ANIMATION.stagger.normal } }
          }}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
                show: { opacity: 1, y: 0 }
              }}
              className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-sm font-semibold text-green-700">🌿</div>
              <h3 className="mt-3 text-lg font-semibold text-green-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
