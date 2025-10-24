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

// Get total discount amount
export function getTotalDiscount(): number {
  if (!cartItems || cartItems.length === 0) return 0;

  const totalDiscount = Number(
    cartItems.reduce((acc, item) => {
      return acc + (item.discount ?? 0);
    }, 0)
  );

  return totalDiscount;
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

// --- helper ---
function saveCart(): void {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}
