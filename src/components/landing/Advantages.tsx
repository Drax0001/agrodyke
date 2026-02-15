"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform
} from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

function CountUpStat({
  value,
  suffix,
  label
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (prefersReducedMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [motionValue, value, prefersReducedMotion]);

  return (
    <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm">
      <div className="text-3xl font-semibold text-green-800">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{label}</p>
    </div>
  );
}

export default function Advantages() {
  const t = useTranslations();
  const stats = t.raw("advantages.stats") as {
    value: number;
    suffix?: string;
    label: string;
  }[];

  return (
    <section id="advantages" className="bg-green-50/60">
      <Container className="py-16">
        <SectionHeading
          title={t("advantages.title")}
          subtitle={t("advantages.subtitle")}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <CountUpStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-dashed border-green-200 bg-white p-6 text-sm text-slate-600">
          {t("advantages.beforeAfterPlaceholder")}
        </div>
      </Container>
    </section>
  );
}
