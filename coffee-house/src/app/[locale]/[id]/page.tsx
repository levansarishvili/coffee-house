import ProductDetails from "./ProductDetails";

interface ProductPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, id } = await params;

  return (
    <main className="flex flex-col gap-10 justify-center items-center">
      <h1 className="text-4xl md:text-6xl text-center mt-5 max-w-[800px] font-semibold leading-[120%]">
        Discover the story behind
        <span className="text-accent italic"> every sip</span>
      </h1>

      <ProductDetails id={id} locale={locale} />
    </main>
  );
}
