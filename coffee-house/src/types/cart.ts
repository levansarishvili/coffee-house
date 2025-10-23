export interface CartProduct {
  id: string;
  productId: number;
  name: string;
  selectedSize: string;
  selectedAdditives: string[];
  price: number;
  discountedPrice: number;
  discount: number;
}
