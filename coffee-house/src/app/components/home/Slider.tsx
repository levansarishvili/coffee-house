"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

const sliderData = [
  {
    id: 1,
    sliderImage: "/assets/slider-1.png",
    name: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    id: 2,
    sliderImage: "/assets/slider-2.png",
    name: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    id: 3,
    sliderImage: "/assets/slider-3.png",
    name: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

export default function Slider() {
  const t = useTranslations("Slider");

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section
      className="flex items-center justify-center tracking-[2] flex-col gap-10 w-full pt-25"
      id="favorite"
    >
      <h2 className="text-[32px] md:text-6xl text-center font-semibold leading-[120%]">
        {t("headerPart-1")}{" "}
        <span className="text-accent italic">{t("headerPart-2")}</span>{" "}
        {t("headerPart-3")}
      </h2>

      <Carousel
        className="w-full"
        opts={{ loop: true, containScroll: "trimSnaps" }}
        plugins={[plugin.current]}
      >
        <CarouselContent
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          {sliderData.map((product) => (
            <CarouselItem
              key={product.id}
              className="w-full flex items-center justify-center"
            >
              <div className="flex flex-col max-w-[348px] md:max-w-[480px] items-center gap-5 rounded-2xl bg-background">
                <Image
                  src={product.sliderImage}
                  alt={product.name}
                  width={480}
                  height={480}
                  className="rounded-xl"
                />
                <p className="text-2xl text-center font-semibold tracking-normal">
                  {product.name}
                </p>
                <p className="text-center text-muted-foreground tracking-normal">
                  {product.description}
                </p>
                <span className="text-2xl font-semibold tracking-normal ">
                  {product.price}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
