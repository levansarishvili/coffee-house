"use client";

import useProducts from "@/app/hooks/useProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/Loading";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useRef } from "react";
import ErrorMessaege from "../ErrorMessaege";

export default function Slider() {
  const t = useTranslations("Slider");
  const { products, loading, error } = useProducts("coffee");

  // Get 3 random products after data loads
  const randomProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Shuffle array and take first 3
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [products]);

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

      {error && !loading && <ErrorMessaege message={error} />}

      {loading ? (
        <Loading />
      ) : (
        <Carousel
          className="w-full"
          opts={{ loop: true, containScroll: "trimSnaps" }}
          plugins={[plugin.current]}
        >
          <CarouselContent
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            {randomProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="w-full flex items-center justify-center"
              >
                <div
                  className="flex flex-col max-w-[300px] sm:max-w-[348px] md:max-w-[400px] lg:max-w-[460px] items-center gap-5 rounded-[40px] 
                overflow-hidden bg-background"
                >
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={480}
                    height={480}
                    className="rounded-[40px]"
                  />
                  <p className="text-2xl text-center font-semibold tracking-normal">
                    {product.name}
                  </p>
                  <p className="text-center text-muted-foreground tracking-normal">
                    {product.description}
                  </p>
                  <span className="text-2xl font-semibold tracking-normal ">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      )}
    </section>
  );
}
