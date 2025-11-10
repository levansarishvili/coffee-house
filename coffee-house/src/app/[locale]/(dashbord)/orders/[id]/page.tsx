import OrderContent from "./OrderContent";
import { getTranslations } from "next-intl/server";

interface OrderDetailsPageProps {
  params: {
    locale: string;
    id: string;
  };
}
export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;
  const t = await getTranslations("OrderItemsPage");

  return (
    <main className="flex flex-col gap-10 justify-center items-center">
      <h1 className="text-4xl md:text-6xl text-center mt-5 font-semibold leading-[120%]">
        {t("header")}
      </h1>

      <OrderContent id={Number(id)} />
    </main>
  );
}
