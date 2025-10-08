// app/page.tsx
import Footer from "@/components/footerandnav/footer";
import Nav from "@/components/footerandnav/nav";
import AboutUsPage from "@/components/pages/about-us-page";
import ContactUs from "@/components/pages/contact-us";
import HomePage from "@/components/pages/home-page";
import Packages from "@/components/pages/packages";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Countries from "@/components/pages/countries";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  setRequestLocale(locale);
  const t = useTranslations("HomePage");

  return (
    <div className="scroll-smooth">
      <Nav />
      <section id="home">
        <HomePage />
      </section>
      <section id="about">
        <AboutUsPage />
      </section>
      <section id="packages">
        <Packages />
      </section>
      <section id="countries">
        <Countries />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer />
    </div>
  );
}
