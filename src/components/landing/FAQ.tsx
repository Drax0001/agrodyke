"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";

export default function FAQ() {
  const t = useTranslations();
  const items = t.raw("faq.items") as { id: string; question: string; answer: string }[];

  return (
    <section id="faq" className="bg-white">
      <Container className="py-16">
        <SectionHeading title={t("faq.title")} subtitle={t("faq.subtitle")} />
        <div className="mt-8">
          <Accordion
            items={items.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
