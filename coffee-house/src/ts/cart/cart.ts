import { isLoggedIn } from '../authStore';
import { renderCartIcon } from '../utils/renderCartIcon';

export const cart = async () => {
  const isAuthenticated = isLoggedIn();

  renderCartIcon(11, isAuthenticated);

  const loginButtonEl = document.querySelector<HTMLButtonElement>('.login-btn');
  const registerButtonEl =
    document.querySelector<HTMLButtonElement>('.register-btn');
  const confirmOrderButtonEl =
    document.querySelector<HTMLButtonElement>('.confirm-order-btn');
};
