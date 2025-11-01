import { Product } from "@/app/types/interfaces";
import Image from "next/image";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="flex flex-col justify-between w-full max-w-[310px] rounded-[40px] border border-border dark:border-border-dark overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-500">
      <div className="max-w-[310px] max-h-[310px] rounded-[40px] overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          width={310}
          height={310}
          className="w-full h-full scale-[1.1] group-hover:scale-100 transition-all duration-500"
        />
      </div>

      <div className="p-5 flex flex-col justify-between gap-4 h-[196px]">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-[125%]">
            {product.name}
          </p>
          <p className="font-normal text-base leading-[150%]">
            {product.description}
          </p>
        </div>
        <span className="font-semibold text-2xl leading-[125%]">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
