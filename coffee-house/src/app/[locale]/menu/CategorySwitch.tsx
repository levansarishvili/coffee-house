"use client";

import { CATEGORIES } from "@/app/constants/constants";
import Image from "next/image";

interface CategoryProps {
  category: string;
  setCategory: (category: string) => void;
}

export default function CategorySwitch({
  setCategory,
  category,
}: CategoryProps) {
  const categories = Object.values(CATEGORIES);

  return (
    <div className="flex gap-2 md:gap-4">
      {categories.map((categoryItem) => (
        <button
          key={categoryItem}
          onClick={() => setCategory(categoryItem)}
          className={`${
            category === categoryItem
              ? "bg-[#665f55] border-[#665f55]"
              : "border-[#c1b6ad] dark:border-border-dark"
          } flex gap-2 justify-center items-center h-[46px] py-2 pr-4 pl-2 rounded-[100px] cursor-pointer border group hover:bg-[#665f55] hover:border-[#665f55] transition-all duration-300`}
        >
          <div
            className={`${
              category === categoryItem ? "bg-[#e1d4c9]" : "border-[#c1b6ad]"
            } flex justify-center items-center rounded-full w-[30px] h-[30px] bg-[#c1b6ad] group-hover:bg-[#e1d4c9]`}
          >
            <Image
              className=""
              src={`/assets/${
                categoryItem === CATEGORIES.TEA
                  ? "teapot"
                  : categoryItem === CATEGORIES.DESSERT
                  ? "cake"
                  : "cup"
              }.svg`}
              alt="Cup of coffee icon"
              width={16}
              height={24}
            />
          </div>
          <span
            className={`${
              category === categoryItem ? "text-[#e1d4c9]" : ""
            } font-semibold group-hover:text-[#e1d4c9]`}
          >
            {categoryItem}
          </span>
        </button>
      ))}
    </div>
  );
}
