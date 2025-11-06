import { SizeOption } from "@/app/types/interfaces";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SizeSelectProps {
  isAuthenticated: boolean;
  product_sizes: SizeOption[];
  selectedSize: string;
  setSelectedSize: (selectedSize: string) => void;
}

export default function SizeSelect({
  isAuthenticated,
  product_sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <span className="">Size</span>
        <div className="flex gap-4 flex-wrap">
          {product_sizes.map((size) => (
            <Tooltip key={size.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSelectedSize(size.size_key)}
                  key={size.id}
                  className={`${
                    selectedSize === size.size_key
                      ? "bg-[#665f55] border-[#665f55]"
                      : "border-[#c1b6ad] dark:border-border-dark"
                  } flex gap-2 justify-center items-center h-[46px] py-2 pr-4 pl-2 rounded-[100px] cursor-pointer border group hover:bg-[#665f55] hover:border-[#665f55] transition-all duration-300`}
                >
                  <div
                    className={`${
                      selectedSize === size.size_key
                        ? "bg-[#e1d4c9]"
                        : "border-[#c1b6ad]"
                    } flex justify-center items-center rounded-full w-[30px] h-[30px] bg-[#c1b6ad] group-hover:bg-[#e1d4c9]`}
                  >
                    <span
                      className={`${
                        selectedSize === size.size_key ? "text-[#403f3d]" : ""
                      } font-semibold text-sm uppercase text-[#403f3d]`}
                    >
                      {size.size_key}
                    </span>
                  </div>
                  <span
                    className={`${
                      selectedSize === size.size_key ? "text-[#e1d4c9]" : ""
                    } font-semibold group-hover:text-[#e1d4c9]`}
                  >
                    {size.size_label}
                  </span>
                </button>
              </TooltipTrigger>

              <TooltipContent className="bg-[#665f55]">
                {isAuthenticated && size.discount_price ? (
                  <div className="flex gap-2">
                    <p className="text-[#e1d4c9] opacity-70 line-through">
                      ${size.price.toFixed(2)}
                    </p>
                    <p className="text-[#e1d4c9]">
                      ${size.discount_price.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#e1d4c9]">${size.price.toFixed(2)}</p>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
