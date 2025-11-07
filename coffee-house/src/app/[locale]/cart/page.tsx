import CartContent from "./CartContent";

export default function CartPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[32px] md:text-6xl text-center max-w-[860px] font-semibold leading-[120%]">
        Cart
      </h1>

      <CartContent />
    </main>
  );
}
