import { useTranslations } from "next-intl";
import Image from "next/image";

export default function About() {
  const t = useTranslations("About");

  return (
    <section className="w-full flex flex-col gap-10" id="about">
      <h2 className="text-[32px] md:text-[56px] font-semibold leading-[120%]">
        {t("headerPart-1")}
        <span className="text-accent italic"> {t("headerPart-2")} </span>
        {t("headerPart-3")}
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
        <div className="flex justify-center items-center flex-col gap-10 w-full">
          <div className="rounded-[20px] overflow-hidden max-w-[660px] w-full h-auto md:h-[590px]">
            <Image
              className="w-full h-full object-cover scale-[1.06] hover:scale-[1] transition-all duration-500"
              src="/assets/about-1.jpg"
              width={660}
              height={590}
              alt="about image"
            />
          </div>
          <div
            className={`hidden lg:flex rounded-[20px] overflow-hidden max-w-[660px] w-full h-auto md:h-[430px]`}
          >
            <Image
              className="w-full h-full object-cover scale-[1.06] hover:scale-[1] transition-all duration-500"
              src="/assets/about-2.jpg"
              width={660}
              height={430}
              alt="about image"
            />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col gap-10 w-full">
          <div
            className={`hidden lg:flex rounded-[20px] overflow-hidden max-w-[660px] w-full h-auto md:h-[430px]`}
          >
            <Image
              className="w-full h-full object-cover scale-[1.06] hover:scale-[1] transition-all duration-500"
              src="/assets/about-3.jpg"
              width={660}
              height={430}
              alt="about image"
            />
          </div>
          <div className="rounded-[20px] overflow-hidden max-w-[660px] w-full h-auto md:h-[590px]">
            <Image
              className="w-full h-full object-cover scale-[1.06] hover:scale-[1] transition-all duration-500"
              src="/assets/about-4.jpg"
              width={660}
              height={590}
              alt="about image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
