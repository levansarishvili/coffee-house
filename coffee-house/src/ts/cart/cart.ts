import { isLoggedIn } from '../authStore';
import { renderCartIcon } from '../utils/renderCartIcon';

export const cart = async () => {
  const isAuthenticated = isLoggedIn();

  renderCartIcon(0, isAuthenticated);
};
