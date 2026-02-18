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
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">

          {/* Left: contact info */}
          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                {t("contact.phonesLabel")}
              </div>
              <div className="mt-1 flex flex-col gap-1">
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
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("whatsapp.float")}
              </a>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                {t("contact.emailsLabel")}
              </div>
              <div className="mt-1 flex flex-col gap-1">
                {(t.raw("contact.emailItems") as string[]).map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="break-all hover:text-green-700"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                {t("contact.websiteLabel")}
              </div>
              <a
                href={`https://${t("contact.website")}`}
                className="mt-1 block hover:text-green-700"
                target="_blank"
                rel="noreferrer"
              >
                {t("contact.website")}
              </a>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                {t("contact.addressLabel")}
              </div>
              <div className="mt-1">{t("contact.address")}</div>
            </div>

            {/* Map placeholder — constrained height, not full-width blob */}
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <ImagePlaceholder className="aspect-video w-full" label="Map" />
            </div>
          </div>

          {/* Right: contact form */}
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                placeholder={t("contact.form.name")}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                placeholder={t("contact.form.phone")}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30 md:col-span-2"
                placeholder={t("contact.form.email")}
              />
              <textarea
                className="h-28 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30 md:col-span-2"
                placeholder={t("contact.form.message")}
              />
            </div>
            <div className="mt-4 text-xs font-semibold text-slate-700">
              {t("contact.form.languageLabel")}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input type="radio" name="language" defaultChecked className="accent-green-700" />
                {t("contact.form.languageFR")}
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="language" className="accent-green-700" />
                {t("contact.form.languageEN")}
              </label>
            </div>
            <button
              type="button"
              className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
