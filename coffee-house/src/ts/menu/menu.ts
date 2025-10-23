import { isLoggedIn } from '../authStore.js';
import { modal } from '../components/modal.js';
import { switchCategory } from '../components/switchCategory.js';
import { setupHeaderCartListener } from '../utils/setupHeaderCartListener.js';

export const menu = () => {
  const isAuthenticated = isLoggedIn();

  setupHeaderCartListener();
  // Initialize Switch Category Tabs
  switchCategory();

  // Initialize Modal for Product Size and Additives Selection
  modal();
};
