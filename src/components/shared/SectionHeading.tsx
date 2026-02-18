"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ANIMATION } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left"
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: ANIMATION.duration.normal, ease: ANIMATION.easing.easeOut }}
      className={`flex flex-col gap-2 ${alignment}`}
    >
      <h2 className="text-3xl font-semibold text-green-900">{title}</h2>
      {subtitle ? (
        <p className="max-w-3xl text-base text-slate-700">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
