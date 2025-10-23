export interface CartProduct {
  id: number;
  name: string;
  selectedSize: string;
  selectedAdditives: string[];
  price: number;
  discountedPrice: number;
  discount: number;
}
