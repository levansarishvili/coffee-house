'use strict';

import type { ProductDetails } from '../../types/product';
import { isLoggedIn } from '../authStore';
import { addToCart, notifyCartUpdate } from '../cartStore';
import { fetchProductById } from '../utils/fetchProductById';
import { renderModal } from '../utils/renderModal';
import { showNotification } from '../utils/showNotification';
import { showSpinner } from '../utils/showSpinner';
import { updateTooltipPrice } from '../utils/updateTooltipPrice';

const isAuthenticated = isLoggedIn();

// ================ Product Size and Additives Selection ================
export const modal = async () => {
  const body = document.querySelector<HTMLBodyElement>('body');
  const productWrappers = {
    coffee: document.querySelector('.coffee-products'),
    tea: document.querySelector('.tea-products'),
    dessert: document.querySelector('.dessert-products'),
  };

  const modalContainer =
    document.querySelector<HTMLElement>('.modal-container');
  const modalOverlay = document.querySelector<HTMLElement>('.overlay');

  // Component states
  let curProductId: string | undefined;
  let curProduct: ProductDetails;
  let totalPrice = 0;
  let discountedTotalPrice = 0;
  let totalDiscount = 0;
  let selectedSize = 's';
  let selectedSizeValue = '';
  let selectedAdditives: string[] = [];

  // Update modal content
  Object.values(productWrappers).forEach((wrapper) => {
    if (!(wrapper instanceof HTMLElement)) return;
    wrapper.addEventListener('click', async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const productItem = target.closest('.product-item') as HTMLElement | null;
      if (!productItem) return;

      curProductId = productItem?.dataset?.productId;

      try {
        modalOverlay?.classList.remove('display-none');
        showSpinner(true, modalOverlay);

        const product = await fetchProductById(curProductId);
        curProduct = product;
        showSpinner(false, modalOverlay);

        renderModal(product, modalContainer, isAuthenticated);
        setupModalInteractions();
        openModal();

        // Set default states
        setStatesToDefault(product);

        handleAddToCartClick();
      } catch (error) {
        console.log(error);
        showSpinner(false, modalOverlay);
        modalOverlay?.classList.add('display-none');
        showNotification('Something went wrong. Please, try again');
      } finally {
        showSpinner(false, modalOverlay);
      }
    });
  });

  // Update states width default values when modal is open
  function setStatesToDefault(product: ProductDetails) {
    selectedSizeValue = product.sizes.s.size;
    totalPrice = Number(product.price);
    discountedTotalPrice = Number(product.sizes.s.discountPrice) || totalPrice;
    totalDiscount = discountedTotalPrice
      ? +(totalPrice - discountedTotalPrice).toFixed(2)
      : 0;
  }

  // Select size button
  function selectSizeButton() {
    const sizeContainer = document.querySelector<HTMLElement>(
      '.size-buttons-container'
    );
    // Select size button
    sizeContainer?.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest(
        '.size-btn'
      ) as HTMLElement;
      if (!button) return;

      const allButtons = sizeContainer.querySelectorAll('.size-btn');
      allButtons.forEach((btn) => btn.classList.remove('active-size-btn'));
      button.classList.add('active-size-btn');
      computeTotal();
    });
  }

  // Hover on size buttons
  function hoverSizeButtons() {
    const sizeContainer = document.querySelector<HTMLElement>(
      '.size-buttons-container'
    );
    sizeContainer?.addEventListener(
      'mouseenter',
      (e) => {
        const button = (e.target as HTMLElement).closest(
          '.size-btn'
        ) as HTMLElement;
        if (!button) return;
        updateTooltipPrice(button, isAuthenticated, 'size');
      },
      true
    );
  }

  // Select additive button
  function selectAdditiveButton() {
    const additiveContainer = document.querySelector<HTMLElement>(
      '.additive-buttons-container'
    );

    additiveContainer?.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest(
        '.additive-btn'
      ) as HTMLElement;
      if (!button) return;
      button.classList.toggle('active-additive-btn');
      computeTotal();
    });
  }

  // Hover on additive buttons
  function hoverAdditiveButtons() {
    const additiveContainer = document.querySelector<HTMLElement>(
      '.additive-buttons-container'
    );

    additiveContainer?.addEventListener(
      'mouseenter',
      (e) => {
        const button = (e.target as HTMLElement).closest(
          '.additive-btn'
        ) as HTMLElement;
        if (!button) return;
        updateTooltipPrice(button, isAuthenticated, 'additive');
      },
      true
    );
  }

  function computeTotal() {
    const totalPriceEl = document.querySelector<HTMLElement>('.total-price');
    const oldPriceEl = document.querySelector<HTMLElement>('.original-price');
    const sizeButtons = document.querySelectorAll<HTMLElement>('.size-btn');
    const additiveButtons =
      document.querySelectorAll<HTMLElement>('.additive-btn');

    // Find active size
    const activeSizeBtn = Array.from(sizeButtons).find((btn) =>
      btn.classList.contains('active-size-btn')
    );

    if (!activeSizeBtn) return;

    activeSizeBtn.dataset.size && (selectedSize = activeSizeBtn.dataset.size);
    activeSizeBtn.dataset.sizeValue &&
      (selectedSizeValue = activeSizeBtn.dataset.sizeValue);

    const sizePrice = Number(activeSizeBtn.dataset.price ?? 0);

    const sizeDiscount = isAuthenticated
      ? Number(activeSizeBtn.dataset.discountPrice ?? sizePrice)
      : sizePrice;

    let totalAdditives = 0;
    let oldAdditives = 0;

    additiveButtons.forEach((btn) => {
      const additive = btn.dataset.additive;
      const price = Number(btn.dataset.price ?? 0);
      const discount = isAuthenticated
        ? Number(btn.dataset.discountPrice ?? price)
        : price;
      if (btn.classList.contains('active-additive-btn')) {
        if (additive && !selectedAdditives.includes(additive)) {
          selectedAdditives.push(additive);
        }

        totalAdditives += discount;
        oldAdditives += price;
      } else {
        if (additive && selectedAdditives.includes(additive)) {
          selectedAdditives = selectedAdditives.filter((a) => a !== additive);
        }
      }
    });

    discountedTotalPrice = sizeDiscount + totalAdditives;
    totalPrice = sizePrice + oldAdditives;
    totalDiscount = discountedTotalPrice
      ? +(totalPrice - discountedTotalPrice).toFixed(2)
      : totalPrice;

    totalPriceEl &&
      (totalPriceEl.textContent = `$${discountedTotalPrice.toFixed(2)}`);

    if (isAuthenticated && discountedTotalPrice !== totalPrice) {
      oldPriceEl?.classList.remove('display-none');
      oldPriceEl && (oldPriceEl.textContent = `$${totalPrice.toFixed(2)}`);
    } else {
      oldPriceEl?.classList.add('display-none');
    }
  }

  // Handle add to cart click
  function handleAddToCartClick() {
    const addToCartButtonEl = document.querySelector<HTMLButtonElement>(
      '.modal-add-to-cart-btn'
    );

    addToCartButtonEl?.addEventListener('click', () => {
      const cartItemId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const cartItemData = {
        id: cartItemId,
        productId: curProduct.id,
        name: curProduct.name,
        selectedSize,
        selectedSizeValue,
        selectedAdditives: selectedAdditives,
        price: totalPrice,
        discountedPrice: discountedTotalPrice,
        discount: totalDiscount,
      };

      addToCart(cartItemData);
      console.log(cartItemData);
      notifyCartUpdate();
      closeModal();
    });
  }

  // Setup modal interactions
  function setupModalInteractions() {
    selectSizeButton();
    hoverSizeButtons();
    selectAdditiveButton();
    hoverAdditiveButtons();
  }

  // Show modal
  function openModal() {
    modalContainer?.classList.remove('display-none');
    modalOverlay?.classList.remove('display-none');
    body?.classList.add('disable-scroll');
    registerModalCloseEvents();
  }

  // Close modal
  function closeModal() {
    modalContainer?.classList.add('display-none');
    modalOverlay?.classList.add('display-none');
    body?.classList.remove('disable-scroll');
    unregisterModalCloseEvents();
    resetStates();
  }

  // Reset component states on modal close
  function resetStates() {
    selectedSizeValue = '';
    selectedAdditives = [];
    totalPrice = 0;
    discountedTotalPrice = 0;
  }

  // Register all close events (once per modal open)
  function registerModalCloseEvents() {
    const modalCloseBtn =
      document.querySelector<HTMLElement>('.modal-close-btn');

    modalCloseBtn?.addEventListener('click', closeModal);
    body?.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscPress);
  }

  // Clean up listeners after modal closes
  function unregisterModalCloseEvents() {
    const modalCloseBtn =
      document.querySelector<HTMLElement>('.modal-close-btn');

    modalCloseBtn?.removeEventListener('click', closeModal);
    body?.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscPress);
  }

  // Handlers
  function handleOverlayClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      closeModal();
    }
  }

  function handleEscPress(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
};
