"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Tabs from "@/components/ui/Tabs";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function CropGuide() {
  const t = useTranslations();
  const crops = t.raw("cropGuide.crops") as {
    id: string;
    label: string;
    pre: string;
    post: string;
    spray: string;
  }[];

  const tabItems = crops.map((crop) => ({
    id: crop.id,
    label: crop.label,
    content: (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 text-sm text-slate-700">
          <div>
            <div className="text-xs font-semibold uppercase text-green-700">
              {t("cropGuide.prePlanting")}
            </div>
            <p className="mt-2">{crop.pre}</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-green-700">
              {t("cropGuide.postPlanting")}
            </div>
            <p className="mt-2">{crop.post}</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-green-700">
              {t("cropGuide.spraying")}
            </div>
            <p className="mt-2">{crop.spray}</p>
          </div>
        </div>
        <ImagePlaceholder className="aspect-[4/3]" label="Crop image" />
      </div>
    )
  }));

  const accordionItems = crops.map((crop) => ({
    id: crop.id,
    title: crop.label,
    content: (
      <div className="space-y-3 text-sm text-slate-700">
        <div>
          <div className="text-xs font-semibold uppercase text-green-700">
            {t("cropGuide.prePlanting")}
          </div>
          <p className="mt-1">{crop.pre}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase text-green-700">
            {t("cropGuide.postPlanting")}
          </div>
          <p className="mt-1">{crop.post}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase text-green-700">
            {t("cropGuide.spraying")}
          </div>
          <p className="mt-1">{crop.spray}</p>
        </div>
      </div>
    )
  }));

  return (
    <section id="crops" className="bg-green-50/60">
      <Container className="py-16">
        <SectionHeading title={t("cropGuide.title")} subtitle={t("cropGuide.subtitle")} />
        <div className="mt-8 hidden md:block">
          <Tabs items={tabItems} />
        </div>
        <div className="mt-8 md:hidden">
          <Accordion items={accordionItems} />
        </div>
      </Container>
    </section>
  );
}
