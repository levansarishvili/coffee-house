// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: number;
  category: string;
  imageUrl?: string;
}

export interface ProductsResponse {
  data: Product[];
}

// Detailed Product Info
interface Sizes {
  s: {
    size: string;
    price: number;
    discountPrice?: number;
  };
  m: {
    size: string;
    price: number;
    discountPrice?: number;
  };
  l: {
    size: string;
    price: number;
    discountPrice?: number;
  };
  xl: {
    size: string;
    price: number;
    discountPrice?: number;
  };
  xxl: {
    size: string;
    price: number;
    discountPrice?: number;
  };
}
interface Additive {
  name: string;
  price: number;
  discountPrice?: number;
}

type additives = Additive[];

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: number;
  category: string;
  sizes: Sizes;
  additives: additives;
}

export interface ProductDetailsResponse {
  data: ProductDetails;
}
