import { AuthEvent, CartEvent } from '../../types/enums';
import { logout } from '../authStore';
import { getCart } from '../cartStore';

export const logoutUser = () => {
  const logoutButtonEl =
    document.querySelector<HTMLButtonElement>('.logout-btn');

  logoutButtonEl?.addEventListener('click', () => {
    logout();

    // Notify all parts of the app that user logged out
    const updatedCartItems = getCart();
    document.dispatchEvent(
      new CustomEvent(CartEvent.Updated, { detail: updatedCartItems })
    );

    // Also notify authentication change
    document.dispatchEvent(new CustomEvent(AuthEvent.Updated));
  });
};
