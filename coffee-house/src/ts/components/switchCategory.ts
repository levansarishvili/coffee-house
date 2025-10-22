import { fetchProducts } from '../utils/fetchProducts.js';
import { renderProductCards } from '../utils/renderProductCards.js';
import { showErrorMessage } from '../utils/showErrorMessage.js';
import { showSpinner } from '../utils/showSpinner.js';

const isAuthenticated = true;

export const switchCategory = async () => {
  // ================ Product Category Tabs ================
  const productsWrapper =
    document.querySelector<HTMLElement>('.products-wrapper');
  const productWrappers: Record<string, HTMLElement | null> = {
    coffee: document.querySelector<HTMLElement>('.coffee-products'),
    tea: document.querySelector<HTMLElement>('.tea-products'),
    dessert: document.querySelector<HTMLElement>('.dessert-products'),
  };

  const tabsWrapper = document.querySelector<HTMLElement>('.tabs-wrapper');
  const tabItems = document.querySelectorAll<HTMLElement>('.tab-item');
  const loadBtn = document.querySelector<HTMLElement>('.load-btn');

  let curCategory: string = 'coffee';

  showSpinner(true, productsWrapper);

  try {
    const products = await fetchProducts();
    showSpinner(false, productsWrapper);
    tabsWrapper?.classList.remove('display-none');

    renderProductCards(
      products,
      productWrappers[curCategory]!,
      curCategory,
      isAuthenticated
    );

    // Show products based on category
    function showProducts(category = 'coffee') {
      // Hide all wrappers
      Object.values(productWrappers).forEach((wrapper) => {
        wrapper && (wrapper.style.display = 'none');
      });

      // Show selected wrapper
      const selectedWrapper = productWrappers[category];
      selectedWrapper && (selectedWrapper.style.display = 'flex');

      curCategory = category;
      renderProductCards(
        products,
        productWrappers[curCategory]!,
        curCategory,
        isAuthenticated
      );

      showLoadButton();
    }

    // Set active tab
    function setActiveTab(category: string) {
      tabItems.forEach((tab) => {
        if (tab.dataset.category === category) {
          tab.classList.add('active-tab');
        } else {
          tab.classList.remove('active-tab');
        }
      });
    }

    // Event listener for tab clicks
    tabsWrapper?.addEventListener('click', (e: MouseEvent) => {
      const clickedTab = (e.target as HTMLElement).closest<HTMLElement>(
        '.tab-item'
      );
      const category = clickedTab?.dataset?.category;
      if (!clickedTab || !category || category === curCategory) return;

      showProducts(category);
      setActiveTab(category);
      showLoadButton();
      curCategory = category;
    });

    // Load More Products
    function loadProducts() {
      const wrapper = productWrappers[curCategory];
      if (!wrapper) return;
      const hiddenItems =
        wrapper.querySelectorAll<HTMLElement>('.hidden-product');
      hiddenItems.forEach((item) => item.classList.remove('hidden-product'));
    }

    function showLoadButton() {
      const wrapper = productWrappers[curCategory];
      if (!wrapper) return;
      const isMobile = window.innerWidth <= 768;
      const hiddenProducts =
        wrapper.querySelectorAll<HTMLElement>('.hidden-product');
      loadBtn &&
        (loadBtn.style.display =
          isMobile && hiddenProducts.length > 0 ? 'flex-row' : 'none');
    }

    loadBtn?.addEventListener('click', () => {
      loadProducts();
      loadBtn.style.display = 'none';
    });

    window.addEventListener('resize', () => {
      showLoadButton();
    });

    // Initial setup
    document.addEventListener('DOMContentLoaded', () => {
      showProducts();
      setActiveTab(curCategory);
      showLoadButton();
    });
  } catch (error) {
    console.error(error);
    showSpinner(false, productsWrapper);
    showErrorMessage(
      'Something went wrong. Please, refresh the page',
      productWrappers[curCategory]
    );
    tabsWrapper?.classList.add('display-none');
    loadBtn?.classList.add('display-none');
  }
};
