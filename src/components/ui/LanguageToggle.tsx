"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = (nextLocale: "fr" | "en") => {
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = nextLocale;
    }
    const nextPath = segments.join("/");
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${nextPath}${hash}`);
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-2 py-1 text-xs font-semibold text-green-900 backdrop-blur">
      <button
        type="button"
        onClick={() => toggleLocale("fr")}
        className={`rounded-full px-2 py-1 transition ${
          locale === "fr" ? "bg-green-700 text-white" : "text-green-900"
        }`}
      >
        🇫🇷 FR
      </button>
      <button
        type="button"
        onClick={() => toggleLocale("en")}
        className={`rounded-full px-2 py-1 transition ${
          locale === "en" ? "bg-green-700 text-white" : "text-green-900"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
