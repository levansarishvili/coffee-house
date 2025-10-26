import type { CartProduct } from '../../types/cart';
import { isLoggedIn } from '../authStore';
import { getCartItemsLength } from '../cartStore';
import { renderCartIcon } from './renderCartIcon';

export function setupHeaderCartListener() {
  // Initial render
  let isAuthenticated = isLoggedIn();
  let cartItemsLength = getCartItemsLength();
  renderCartIcon(cartItemsLength, isAuthenticated);

  // Listen for cart updates
  document.addEventListener('cart-updated', (e) => {
    const event = e as CustomEvent<CartProduct[]>;
    const cartItems = event.detail;
    cartItemsLength = cartItems.length;
    renderCartIcon(cartItemsLength, isAuthenticated);
  });

  // Listen for auth updates
  document.addEventListener('auth-updated', () => {
    isAuthenticated = isLoggedIn();
    cartItemsLength = getCartItemsLength();
    renderCartIcon(cartItemsLength, isAuthenticated);
  });
}
