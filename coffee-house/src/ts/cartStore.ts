import type { CartProduct } from '../types/cart';

let cartItems: CartProduct[] = [];

// Load cart from localStorage on init
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    cartItems = JSON.parse(savedCart);
  } catch (error) {
    console.error('Failed to parse saved cart:', error);
  }
}

// Get all items
export function getCart(): CartProduct[] {
  return cartItems;
}

// Get total number of items in the cart
export function getCartItemsLength(): number {
  if (!cartItems) return 0;
  return cartItems.length;
}

// Check if cart has items
export function hasCartItems(): boolean {
  return cartItems.length > 0;
}

// Add new item
export function addToCart(item: CartProduct): void {
  cartItems.push(item);
  saveCart();
}

// Remove an item
export function removeFromCart(id: string | undefined): void {
  cartItems = cartItems.filter((product) => product.id !== id);
  saveCart();
}

// Clear all items
export function clearCart(): void {
  cartItems = [];
  saveCart();
}

// Notify
export function notifyCartUpdate() {
  document.dispatchEvent(
    new CustomEvent('cart-updated', {
      detail: cartItems,
    })
  );
}

// --- Function: getFinalPrice ---
export function getFinalPrice(isAuthenticated: boolean): {
  totalPrice: number;
  discountedTotalPrice: number;
  finalPrice: number;
} {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  const discountedTotalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.discountedPrice ?? item.price),
    0
  );

  const finalPrice = isAuthenticated ? discountedTotalPrice : totalPrice;

  return {
    totalPrice: +totalPrice.toFixed(2),
    discountedTotalPrice: +discountedTotalPrice.toFixed(2),
    finalPrice: +finalPrice.toFixed(2),
  };
}

// --- helper ---
function saveCart(): void {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}
