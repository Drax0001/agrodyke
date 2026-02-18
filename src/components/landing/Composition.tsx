"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { ANIMATION } from "@/lib/animations";

export default function Composition() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const rows = t.raw("composition.rows") as { label: string; value: string }[];
  const elements = t.raw("composition.elements") as { name: string; role: string }[];

  return (
    <section id="composition" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("composition.title")}
          subtitle={t("composition.subtitle")}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: ANIMATION.stagger.fast } }
            }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            {/* Improved table — divide-y instead of gap-px bg-slate-200 */}
            <div className="divide-y divide-slate-200 text-sm">
              {rows.map((row) => {
                const value = row.value.toLowerCase();
                const isSafe =
                  value.includes("not detected") || value.includes("non détecté");

                return (
                  <motion.div
                    key={row.label}
                    variants={{
                      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="grid grid-cols-2"
                  >
                    <div className="bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                      {row.label}
                    </div>
                    <div className={`px-4 py-3 text-right ${isSafe ? "text-green-700 font-semibold" : "text-slate-600"}`}>
                      {row.value}
                      {isSafe ? (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                          ✅ {t("composition.safe")}
                        </span>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
            <h3 className="text-lg font-semibold text-green-900">
              {t("composition.elementsTitle")}
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {elements.map((element) => (
                <div key={element.name} className="rounded-lg bg-white px-4 py-3 shadow-sm">
                  <div className="font-semibold text-green-800">{element.name}</div>
                  <div className="text-xs text-slate-600">{element.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
