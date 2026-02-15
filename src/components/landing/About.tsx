"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function About() {
  const t = useTranslations();
  const paragraphs = t.raw("about.story") as string[];
  const milestones = t.raw("about.milestones") as string[];

  return (
    <section id="about" className="bg-white">
      <Container className="py-16">
        <SectionHeading title={t("about.title")} subtitle={t("about.subtitle")} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <ImagePlaceholder className="aspect-[4/5]" label="Founder photo" />
          <div className="space-y-4 text-sm text-slate-700">
            <div className="text-base font-semibold text-green-900">
              {t("about.founder")}
            </div>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-6 space-y-2 text-xs font-semibold text-green-700">
              {milestones.map((milestone) => (
                <div key={milestone}>• {milestone}</div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
