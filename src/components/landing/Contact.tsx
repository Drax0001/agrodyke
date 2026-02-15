"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function Contact() {
  const t = useTranslations();

  return (
    <section id="contact" className="bg-green-50/60">
      <Container className="py-16">
        <SectionHeading
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <div className="text-xs font-semibold uppercase text-green-700">
                {t("contact.phonesLabel")}
              </div>
              <div className="flex flex-col gap-1">
                {(t.raw("contact.phoneItems") as string[]).map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="hover:text-green-700"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <a
                href={t("whatsapp.inquiryLink")}
                className="mt-2 inline-flex text-xs font-semibold text-green-700"
                target="_blank"
                rel="noreferrer"
              >
                {t("whatsapp.float")}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-green-700">
                {t("contact.emailsLabel")}
              </div>
              <div className="flex flex-col gap-1">
                {(t.raw("contact.emailItems") as string[]).map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="hover:text-green-700"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-green-700">
                {t("contact.websiteLabel")}
              </div>
              <a
                href={`https://${t("contact.website")}`}
                className="hover:text-green-700"
                target="_blank"
                rel="noreferrer"
              >
                {t("contact.website")}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-green-700">
                {t("contact.addressLabel")}
              </div>
              <div>{t("contact.address")}</div>
            </div>

            <ImagePlaceholder className="aspect-3/2" label="Map placeholder" />
          </div>

          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder={t("contact.form.name")}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder={t("contact.form.phone")}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
                placeholder={t("contact.form.email")}
              />
              <textarea
                className="h-28 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
                placeholder={t("contact.form.message")}
              />
            </div>
            <div className="mt-4 text-xs font-semibold text-slate-700">
              {t("contact.form.languageLabel")}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input type="radio" name="language" defaultChecked />
                {t("contact.form.languageFR")}
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="language" />
                {t("contact.form.languageEN")}
              </label>
            </div>
            <button
              type="button"
              className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
