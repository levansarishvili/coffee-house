'use strict';

import { isLoggedIn } from '../authStore';
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

  let curProductId: string | undefined;
  let totalPrice = 0;

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
        console.log(product);
        showSpinner(false, modalOverlay);

        renderModal(product, modalContainer, isAuthenticated);
        setupModalInteractions();
        openModal();
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

  // Select size button
  function selectSizeButton() {
    const sizeContainer = document.querySelector<HTMLElement>(
      '.size-buttons-container'
    );
    // Select size button
    sizeContainer?.addEventListener('click', (e) => {
      console.log('Fired');
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

    const sizePrice = Number(activeSizeBtn.dataset.price ?? 0);
    const sizeDiscount = isAuthenticated
      ? Number(activeSizeBtn.dataset.discountPrice ?? sizePrice)
      : sizePrice;

    let totalAdditives = 0;
    let oldAdditives = 0;

    additiveButtons.forEach((btn) => {
      if (btn.classList.contains('active-additive-btn')) {
        const price = Number(btn.dataset.price ?? 0);
        const discount = isAuthenticated
          ? Number(btn.dataset.discountPrice ?? price)
          : price;
        totalAdditives += discount;
        oldAdditives += price;
      }
    });

    const total = sizeDiscount + totalAdditives;
    const oldTotal = sizePrice + oldAdditives;

    totalPriceEl && (totalPriceEl.textContent = `$${total.toFixed(2)}`);

    if (isAuthenticated && total !== oldTotal) {
      oldPriceEl?.classList.remove('display-none');
      oldPriceEl && (oldPriceEl.textContent = `$${oldTotal.toFixed(2)}`);
    } else {
      oldPriceEl?.classList.add('display-none');
    }

    // Update the global totalPrice if needed
    totalPrice = total;
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
