import { getTranslations } from "next-intl/server";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SixInOne from "@/components/landing/SixInOne";
import ProductOverview from "@/components/landing/ProductOverview";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import CropGuide from "@/components/landing/CropGuide";
import Composition from "@/components/landing/Composition";
import Advantages from "@/components/landing/Advantages";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

export default async function LocaleHomePage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-green-900"
      >
        {t("common.skipToContent")}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SixInOne />
        <ProductOverview />
        <Benefits />
        <HowItWorks />
        <CropGuide />
        <Composition />
        <Advantages />
        <Testimonials />
        <Pricing />
        <About />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
