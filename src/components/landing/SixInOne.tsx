"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import { ANIMATION } from "@/lib/animations";

const ICONS = ["🌱", "🛡️", "🧬", "🔬", "🌾", "♻️"];

export default function SixInOne() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();

  const items = [
    t("sixInOne.soilFertilizer"),
    t("sixInOne.cropProtection"),
    t("sixInOne.microbeActivator"),
    t("sixInOne.soilSterilizer"),
    t("sixInOne.yieldBooster"),
    t("sixInOne.chemicalNeutralizer")
  ];

  return (
    <section className="bg-green-800 text-white">
      <Container className="py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: ANIMATION.stagger.normal }
            }
          }}
          className="grid grid-cols-2 gap-4 text-sm font-semibold md:grid-cols-3 lg:grid-cols-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={item}
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 transition hover:scale-[1.03]"
            >
              <span>{ICONS[index]}</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
