// app/page.tsx
import Footer from "@/components/footerandnav/footer";
import Nav from "@/components/footerandnav/nav";
import AboutUsPage from "@/components/pages/about-us-page";
import Founder from "@/components/pages/founder";
import ContactUs from "@/components/pages/contact-us";
import HomePage from "@/components/pages/home-page";
import Packages from "@/components/pages/packages";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Countries from "@/components/pages/countries";
import OurStory from "@/components/pages/ourStory";
import ReviewsSection from "@/components/pages/review";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <div className="scroll-smooth">
      <Nav />
      <section id="home">
        <HomePage />
      </section>
      <section id="about">
        <AboutUsPage />
        <Founder />
        <OurStory />
      </section>
      <section id="packages">
        <Packages />
      </section>
      <section id="countries">
        <Countries />
        <ReviewsSection />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer />
    </div>
  );
}
