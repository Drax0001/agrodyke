"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/shared/Container";
import Image from "next/image";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { id: "home", label: t("nav.home") },
    { id: "product", label: t("nav.product") },
    { id: "benefits", label: t("nav.benefits") },
    { id: "how-to-use", label: t("nav.howToUse") },
    { id: "pricing", label: t("pricing.title") },
    { id: "contact", label: t("nav.contact") }
  ];

  return (
    <footer className="bg-green-900 text-green-100">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/agrodyke_logo.png"
                alt="AGRODYKE logo"
                width={32}
                height={32}
              />
              <span className="text-lg font-semibold text-green-50">AGRODYKE</span>
            </div>
            <p className="mt-4 text-sm text-green-100/80">
              {t("footer.tagline")}
            </p>
            <div className="mt-4 text-xs text-green-100/70">
              {t("footer.legal")}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-green-200">
              {t("footer.quickLinks")}
            </div>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {links.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-green-200">
              {t("footer.contact")}
            </div>
            <div className="mt-4 space-y-2 text-sm text-green-100/80">
              <div>{t("contact.phones")}</div>
              <div>{t("contact.emails")}</div>
              <div>{t("contact.address")}</div>
            </div>
            <div className="mt-4">
              <LanguageToggle />
            </div>
            <Link
              href={`/${locale}/checkout`}
              className="mt-4 inline-flex rounded-full bg-green-700 px-4 py-2 text-xs font-semibold text-white"
            >
              {t("nav.buyNow")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
