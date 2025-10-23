import type { CartProduct } from '../../types/cart.js';
import { isLoggedIn } from '../authStore.js';
import { getCartItemsLength, getTotalDiscount } from '../cartStore.js';
import { modal } from '../components/modal.js';
import { switchCategory } from '../components/switchCategory.js';
import { renderCartIcon } from '../utils/renderCartIcon.js';

export const menu = () => {
  const isAuthenticated = isLoggedIn();
  let cartItemsLength = getCartItemsLength();
  let totalDiscount = getTotalDiscount();

  renderCartIcon(cartItemsLength, isAuthenticated, totalDiscount);

  // Re-render when cart updates
  document.addEventListener('cart-updated', (e) => {
    const event = e as CustomEvent<CartProduct[]>;
    const cartItems = event.detail;
    cartItemsLength = cartItems.length;
    totalDiscount = getTotalDiscount();
    renderCartIcon(cartItemsLength, isAuthenticated, totalDiscount);
  });

  // Initialize Switch Category Tabs
  switchCategory();

  // Initialize Modal for Product Size and Additives Selection
  modal();
};
