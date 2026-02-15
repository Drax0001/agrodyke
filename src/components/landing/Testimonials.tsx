"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function Testimonials() {
  const t = useTranslations();
  const items = t.raw("testimonials.items") as { title: string; description: string }[];

  return (
    <section id="testimonials" className="bg-white">
      <Container className="py-16">
        <SectionHeading
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <ImagePlaceholder className="aspect-[4/3]" label="Field photo" />
              <h3 className="mt-4 text-sm font-semibold text-green-900">{item.title}</h3>
              <p className="mt-2 text-xs text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xs text-slate-500">
          {t("testimonials.carouselNote")}
        </div>
      </Container>
    </section>
  );
}
