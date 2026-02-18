"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { ANIMATION } from "@/lib/animations";

export default function Testimonials() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const items = t.raw("testimonials.items") as { title: string; description: string }[];

  return (
    <section id="testimonials" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: ANIMATION.stagger.normal } }
          }}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Star rating */}
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Large decorative quote mark */}
              <div className="mt-3 text-4xl font-serif leading-none text-green-200 select-none">"</div>

              {/* Quote text */}
              <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
                  {item.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{t("testimonials.verifiedFarmer")}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-6 text-xs text-slate-500">
          {t("testimonials.carouselNote")}
        </div>
      </Container>
    </section>
  );
}
