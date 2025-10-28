import type { CartProduct } from '../../types/cart';
import { CartEvent } from '../../types/enums';
import { isLoggedIn } from '../authStore';
import {
  clearCart,
  getCart,
  notifyCartUpdate,
  removeFromCart,
} from '../cartStore';
import { confirmOrder } from '../utils/confirmOrder';
import { renderCartItems } from '../utils/renderCartItems';
import { setupHeaderCartListener } from '../utils/setupHeaderCartListener';
import { showNotification } from '../utils/showNotification';
import { showSpinner } from '../utils/showSpinner';
import { showSuccessMessage } from '../utils/showSuccessMessage';

export const cart = async () => {
  let isAuthenticated = isLoggedIn();
  setupHeaderCartListener();
  let cartItems = getCart();

  const cartMessageWrapperEl = document.querySelector<HTMLDivElement>(
    '.cart-message-wrapper'
  );
  const cartSpinnerWrapperEl = document.querySelector<HTMLDivElement>(
    '.cart-spinner-wrapper'
  );

  renderCartItems(isAuthenticated, cartItems);
  setupCartListeners();

  document.addEventListener(CartEvent.Updated, (e) => {
    const event = e as CustomEvent<CartProduct[]>;
    cartItems = event.detail;
    isAuthenticated = isLoggedIn();
    renderCartItems(isAuthenticated, cartItems);
    setupCartListeners();
  });

  function setupCartListeners() {
    deleteCartItem();
    setupConfirmOrderButton();
  }

  function setupConfirmOrderButton() {
    const orderSubmitButtonEl =
      document.querySelector<HTMLButtonElement>('.confirm-order-btn');

    if (!orderSubmitButtonEl) return;

    orderSubmitButtonEl.addEventListener('click', async () => {
      const ordersArr = getCart().map((item) => ({
        productId: item.productId,
        size: item.selectedSize,
        additives: item.selectedAdditives,
        quantity: 1,
      }));

      const ordersData = {
        items: ordersArr,
        totalPrice: ordersArr.reduce((acc, item) => {
          const product = cartItems.find((p) => p.productId === item.productId);
          return acc + (product?.discountedPrice || 0);
        }, 0),
      };

      try {
        showSpinner(true, cartSpinnerWrapperEl);
        orderSubmitButtonEl.classList.add('disabled-btn');
        await confirmOrder(ordersData);
        showSpinner(false, cartSpinnerWrapperEl);
        showSuccessMessage(
          'Thank you for your order! Our manager will contact you shortly.',
          cartMessageWrapperEl
        );
        clearCart();
        notifyCartUpdate();
      } catch (err) {
        showSpinner(false, cartSpinnerWrapperEl);
        showNotification('Something went wrong. Please, try again.');
        console.error('Order confirmation failed:', err);
      } finally {
        orderSubmitButtonEl.classList.remove('disabled-btn');
        showSpinner(false, cartSpinnerWrapperEl);
      }
    });
  }

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

        // Re-render and reattach listeners
        renderCartItems(isAuthenticated, updatedCartItems);
        setupCartListeners();
      });
    });
  }
};
