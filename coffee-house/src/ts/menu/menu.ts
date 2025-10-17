import { modal } from '../components/modal.js';
import { switchCategory } from '../components/switchCategory.js';
import { header } from '../components/header.js';

export const menu = () => {
  // Initialize Header
  header('menu');

  // Initialize Switch Category Tabs
  switchCategory();

  // Initialize Modal for Product Size and Additives Selection
  modal();
};
