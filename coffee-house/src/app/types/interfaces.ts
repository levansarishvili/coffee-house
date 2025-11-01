// Base Product Interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  category: string;
  image_url: string;
  rating: number;
  created_at: string;
}

// Size Option Interface
export interface SizeOption {
  id: number;
  product_id: number;
  size_key: string;
  size_label: string;
  price: number;
  discount_price: number | null;
  created_at: string;
}

// Additive Interface
export interface Additive {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
}

// Product Sizes Interface
export interface ProductSizes {
  s?: SizeOption;
  m?: SizeOption;
  l?: SizeOption;
  xl?: SizeOption;
  xxl?: SizeOption;
}

// Extended Product Details Interface
export interface ProductDetails extends Product {
  product_sizes: SizeOption[];
  product_additives: Additive[];
}
