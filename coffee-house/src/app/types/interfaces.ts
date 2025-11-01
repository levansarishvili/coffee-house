// Product
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  category: string;
  image_url: string;
  created_at: string;
}

// Error
export interface Error {
  code: string;
  details: string | null;
  hint: string;
  message: string;
}
