export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: number;
  category: string;
}

export interface ProductsResponse {
  data: Product[];
}
