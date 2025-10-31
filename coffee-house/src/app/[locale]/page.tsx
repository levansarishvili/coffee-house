import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Footer from "../components/footer/Footer";
import MobileApp from "../components/home/MobileApp";
import Slider from "../components/home/Slider";

export default function HomePage({ params }) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <main className="flex flex-col gap-[100px]">
        <Hero />
        <Slider />
        <About />
        <MobileApp />
      </main>

      <Footer />
    </>
  );
}
