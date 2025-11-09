import Hero from "../components/home/Hero";
import About from "../components/home/About";
import MobileApp from "../components/home/MobileApp";
import Slider from "../components/home/Slider";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Slider />
      <About />
      <MobileApp />
    </main>
  );
}
