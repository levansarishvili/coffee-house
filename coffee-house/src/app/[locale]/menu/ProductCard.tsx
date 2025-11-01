import { Product } from "@/app/types/interfaces";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div>
      <p>{product.name}</p>
    </div>
  );
}
