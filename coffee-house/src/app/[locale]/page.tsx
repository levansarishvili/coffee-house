import { setRequestLocale } from "next-intl/server";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import MobileApp from "../components/home/MobileApp";
import Slider from "../components/home/Slider";

interface ProductProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: ProductProps) {
  return (
    <main className="flex flex-col">
      <Hero />
      <Slider />
      <About />
      <MobileApp />
    </main>
  );
}
