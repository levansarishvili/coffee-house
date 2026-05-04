"use client";

import useOrderById from "@/app/hooks/useOrderById";
import Loading from "@/Loading";
import Image from "next/image";

interface OrderContentProps {
  id: number;
}

export default function OrderContent({ id }: OrderContentProps) {
  const { order, loading } = useOrderById(id);

  return (
    <section className="flex w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-6 w-full justify-center">
          {order.map((item) => (
            <div
              className="flex max-w-[600px] gap-3 md:gap-5 items-center w-full border border-[#c1b6ad] dark:border-[#665f55] rounded-2xl py-2 px-3 md:py-3 md:px-4"
              key={item.id}
            >
              <div className="overflow-hidden w-full max-w-20 max-h-20 md:max-w-24 md:max-h-24 rounded-[20px]">
                <Image
                  src={item.image_url}
                  alt={item.product_name}
                  width={200}
                  height={200}
                />
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-base md:text-xl">
                    {item.product_name}
                  </p>

                  <p className="font-medium text-sm md:text-base">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="font-medium text-sm md:text-base">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-center gap-2">
                  <p className="font-medium text-base md:text-lg">
                    <span className="text-green-600">
                      ${item.total_price.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-xs md:text-sm">
                    {new Date(item.created_at as string)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
