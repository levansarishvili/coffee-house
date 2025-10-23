import type { CartProduct } from '../../types/cart';
import { isLoggedIn } from '../authStore';
import { getCart, removeFromCart } from '../cartStore';
import { logoutUser } from '../utils/logoutUser';
import { renderCartItems } from '../utils/renderCartItems';
import { setupHeaderCartListener } from '../utils/setupHeaderCartListener';

export const cart = async () => {
  let isAuthenticated = isLoggedIn();
  setupHeaderCartListener();
  const cartItems = getCart();

  renderCartItems(isAuthenticated, cartItems);

  deleteCartItem();

  logoutUser();

  // Listen for cart updates and re-render only here
  document.addEventListener('cart-updated', (e) => {
    const event = e as CustomEvent<CartProduct[]>;
    const updatedCartItems = event.detail;
    renderCartItems(isAuthenticated, updatedCartItems);
  });

  // Function to delete cart item by id
  function deleteCartItem() {
    const deleteCartItemButtonEls =
      document.querySelectorAll<HTMLButtonElement>('.cart-delete-button');

    deleteCartItemButtonEls.forEach((btn) => {
      btn.addEventListener('click', (e: MouseEvent) => {
        const button = (e.target as HTMLElement).closest(
          '.cart-delete-button'
        ) as HTMLElement | null;
        if (!button) return;
        const id = button.dataset.id;

        // Remove item from cart state
        removeFromCart(id);

        // Notify header and other listeners about cart update
        const updatedCartItems = getCart();
        document.dispatchEvent(
          new CustomEvent('cart-updated', { detail: updatedCartItems })
        );

        // Re-render the cart UI
        renderCartItems(isAuthenticated, updatedCartItems);

        // Re-attach delete listeners after re-render
        deleteCartItem();
      });
    });
  }

  // const loginButtonEl = document.querySelector<HTMLButtonElement>('.login-btn');
  // const registerButtonEl =
  //   document.querySelector<HTMLButtonElement>('.register-btn');
  // const confirmOrderButtonEl =
  //   document.querySelector<HTMLButtonElement>('.confirm-order-btn');
};
