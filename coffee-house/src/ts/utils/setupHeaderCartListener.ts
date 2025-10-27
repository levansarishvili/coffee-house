import type { CartProduct } from '../../types/cart';
import { isLoggedIn } from '../authStore';
import { getCartItemsLength, getFinalPrice } from '../cartStore';
import { renderCartIcon } from './renderCartIcon';

export function setupHeaderCartListener() {
  // Initial render
  let isAuthenticated = isLoggedIn();
  let cartItemsLength = getCartItemsLength();
  const { totalPrice, finalPrice } = getFinalPrice(isAuthenticated);
  renderCartIcon(cartItemsLength, isAuthenticated, finalPrice, totalPrice);

  // Listen for cart updates
  document.addEventListener('cart-updated', (e) => {
    const event = e as CustomEvent<CartProduct[]>;
    const cartItems = event.detail;
    cartItemsLength = cartItems.length;
    const { totalPrice, finalPrice } = getFinalPrice(isAuthenticated);
    renderCartIcon(cartItemsLength, isAuthenticated, finalPrice, totalPrice);
  });

  // Listen for auth updates
  document.addEventListener('auth-updated', () => {
    isAuthenticated = isLoggedIn();
    cartItemsLength = getCartItemsLength();
    const { totalPrice, finalPrice } = getFinalPrice(isAuthenticated);
    renderCartIcon(cartItemsLength, isAuthenticated, finalPrice, totalPrice);
  });
}
