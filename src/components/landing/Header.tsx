"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useCartStore } from "@/store/cart";

const SECTION_IDS = [
  "home",
  "product",
  "benefits",
  "how-to-use",
  "crops",
  "composition",
  "advantages",
  "testimonials",
  "pricing",
  "about",
  "contact",
  "faq"
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const navItems = useMemo(
    () => [
      { id: "home", label: t("nav.home") },
      { id: "product", label: t("nav.product") },
      { id: "benefits", label: t("nav.benefits") },
      { id: "how-to-use", label: t("nav.howToUse") },
      { id: "about", label: t("nav.about") },
      { id: "contact", label: t("nav.contact") },
      { id: "faq", label: t("nav.faq") }
    ],
    [t]
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur transition-all ${
        isScrolled ? "bg-white/90 shadow-sm" : "bg-white/40"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between px-6 transition-all ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        <Logo size={36} />
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative transition ${
                activeSection === item.id ? "text-green-700" : "hover:text-green-700"
              }`}
            >
              {item.label}
              {activeSection === item.id ? (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-green-700" />
              ) : null}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Link
            href={`/${locale}/checkout`}
            className="relative inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
          >
            {t("nav.buyNow")}
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/20 text-xs text-white">
              {itemCount}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: "easeOut"
              }}
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo size={28} />
                <button
                  type="button"
                  className="rounded-full border border-slate-200 p-2 text-slate-600"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-4 text-sm font-semibold text-slate-700">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-700"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <Link
                href={`/${locale}/checkout`}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white"
              >
                {t("nav.buyNow")}
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
