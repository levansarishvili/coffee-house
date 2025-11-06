import { Additive } from "@/app/types/interfaces";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdditiveSelectProps {
  isAuthenticated: boolean;
  product_additives: Additive[];
  selectedAdditives: number[];
  setSelectedAdditives: (selectedAdditives: number[]) => void;
}

export default function AdditiveSelect({
  isAuthenticated,
  product_additives,
  selectedAdditives,
  setSelectedAdditives,
}: AdditiveSelectProps) {
  function handleAddAdditive(newAdditive: number) {
    if (selectedAdditives.includes(newAdditive)) {
      setSelectedAdditives(
        selectedAdditives.filter((additive) => additive !== newAdditive)
      );
    } else {
      setSelectedAdditives([...selectedAdditives, newAdditive]);
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <span className="">Additives</span>

        <div className="flex gap-4 flex-wrap">
          {product_additives.map((additive, index) => (
            <Tooltip key={additive.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleAddAdditive(additive.id)}
                  className={`${
                    selectedAdditives.includes(additive.id)
                      ? "bg-[#665f55] border-[#665f55]"
                      : "border-[#c1b6ad] dark:border-border-dark"
                  } flex gap-2 justify-center items-center h-[46px] py-2 pr-4 pl-2 rounded-[100px] cursor-pointer border group hover:bg-[#665f55] hover:border-[#665f55] transition-all duration-300`}
                >
                  <div
                    className={`${
                      selectedAdditives.includes(additive.id)
                        ? "bg-[#e1d4c9]"
                        : "border-[#c1b6ad]"
                    } flex justify-center items-center rounded-full w-[30px] h-[30px] bg-[#c1b6ad] group-hover:bg-[#e1d4c9]`}
                  >
                    <span
                      className={`${
                        selectedAdditives.includes(additive.id)
                          ? "text-[#403f3d]"
                          : ""
                      } font-semibold text-sm uppercase text-[#403f3d]`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <span
                    className={`${
                      selectedAdditives.includes(additive.id)
                        ? "text-[#e1d4c9]"
                        : ""
                    } font-semibold group-hover:text-[#e1d4c9]`}
                  >
                    {additive.name}
                  </span>
                </button>
              </TooltipTrigger>

              <TooltipContent className="bg-[#665f55]">
                {isAuthenticated && additive.discount_price ? (
                  <div className="flex gap-2">
                    <p className="text-[#e1d4c9] opacity-70 line-through">
                      ${additive.price.toFixed(2)}
                    </p>
                    <p className="text-[#e1d4c9]">
                      ${additive.discount_price.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#e1d4c9]">${additive.price.toFixed(2)}</p>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
