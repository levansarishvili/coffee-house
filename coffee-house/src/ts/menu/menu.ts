import { isLoggedIn } from '../authStore.js';
import { modal } from '../components/modal.js';
import { switchCategory } from '../components/switchCategory.js';
import { renderCartIcon } from '../utils/renderCartIcon.js';

export const menu = () => {
  const isAuthenticated = isLoggedIn();

  renderCartIcon(11, isAuthenticated);

  // Initialize Switch Category Tabs
  switchCategory();

  // Initialize Modal for Product Size and Additives Selection
  modal();
};
