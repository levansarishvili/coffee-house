import OrderContent from "./OrderContent";

interface OrderDetailsPageProps {
  params: {
    locale: string;
    id: string;
  };
}
export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { locale, id } = await params;

  return (
    <main className="flex flex-col gap-10 justify-center items-center">
      <h1 className="text-4xl md:text-6xl text-center mt-5 font-semibold leading-[120%]">
        Order Items
      </h1>

      <OrderContent id={Number(id)} />
    </main>
  );
}
