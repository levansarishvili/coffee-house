import { modal } from "../components/modal.js";
import { switchCategory } from "../components/switchCategory.js";

export const menu = () => {
  // Initialize Switch Category Tabs
  switchCategory();

  // Initialize Modal for Product Size and Additives Selection
  modal();
};
