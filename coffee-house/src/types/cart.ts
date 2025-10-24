export interface CartProduct {
  id: string;
  productId: number;
  name: string;
  selectedSize: string;
  selectedSizeValue: string;
  selectedAdditives: string[];
  price: number;
  discountedPrice: number;
  discount: number;
}

// For confirm order
export interface OrdersData {
  items: CartItem[];
  totalPrice: number;
}

interface CartItem {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
}

export interface OrderConfirmResponse {
  data: {
    message: string;
    orderId: string;
  };
}
