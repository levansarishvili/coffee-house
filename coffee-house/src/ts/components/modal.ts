'use strict';

import { fetchProductById } from '../utils/fetchProductById';
import { renderModal } from '../utils/renderModal';
import { showNotification } from '../utils/showNotification';
import { showSpinner } from '../utils/showSpinner';

const isAuthenticated = true;

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
      modalOverlay?.classList.remove('display-none');
      showSpinner(true, modalOverlay);

      const target = e.target as HTMLElement;
      const productItem = target.closest('.product-item') as HTMLElement | null;
      if (!productItem) return;

      curProductId = productItem?.dataset?.productId;

      try {
        const product = await fetchProductById(curProductId);
        console.log(product);
        showSpinner(false, modalOverlay);

        renderModal(product, modalContainer, isAuthenticated);

        showModal();

        const modalCloseBtn =
          document.querySelector<HTMLElement>('.modal-close-btn');
        const additiveButtons =
          document.querySelectorAll<HTMLElement>('.additive-btn');
        const sizeButtons = document.querySelectorAll<HTMLElement>('.size-btn');

        const totalPriceEl =
          document.querySelector<HTMLElement>('.total-price');
        const oldPriceEl =
          document.querySelector<HTMLElement>('.original-price');

        // Compute total price
        function computeTotal() {
          // find active size (if any)
          const activeSizeBtn = Array.from(sizeButtons).find((btn) =>
            btn.classList.contains('active-size-btn')
          );

          const pricePerSize = Number(
            isAuthenticated && activeSizeBtn?.dataset.discountPrice
              ? Number(activeSizeBtn?.dataset.discountPrice)
              : Number(activeSizeBtn?.dataset.price)
          );

          const oldPricePerSize = Number(activeSizeBtn?.dataset.price);

          // Sum all active additives
          const additivesSum = Array.from(additiveButtons).reduce(
            (sum, btn) => {
              return (
                sum +
                (btn.classList.contains('active-additive-btn')
                  ? Number(
                      isAuthenticated && btn.dataset.discountPrice
                        ? Number(btn.dataset.discountPrice)
                        : Number(btn.dataset.price)
                    )
                  : 0)
              );
            },
            0
          );

          // Sum all active additives prices for old price calculation
          const oldAdditivesSum = Array.from(additiveButtons).reduce(
            (sum, btn) => {
              return (
                sum +
                (btn.classList.contains('active-additive-btn')
                  ? Number(Number(btn.dataset.price))
                  : 0)
              );
            },
            0
          );

          // Determine if we should show discount price
          const showDiscountPrice: boolean = !!(
            isAuthenticated &&
            (activeSizeBtn?.dataset.discountPrice ||
              Array.from(additiveButtons).some(
                (btn) =>
                  btn.classList.contains('active-additive-btn') &&
                  btn.dataset.discountPrice
              ))
          );

          totalPrice = pricePerSize + additivesSum;

          totalPriceEl &&
            (totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`);

          if (showDiscountPrice) {
            oldPriceEl?.classList.remove('display-none');
            oldPriceEl &&
              (oldPriceEl.textContent = `$${(
                oldPricePerSize + oldAdditivesSum
              ).toFixed(2)}`);
          } else {
            oldPriceEl?.classList.add('display-none');
          }
        }

        // Select size
        sizeButtons.forEach((button) => {
          button.addEventListener('click', () => {
            sizeButtons.forEach((btn) =>
              btn.classList.remove('active-size-btn')
            );
            button.classList.add('active-size-btn');
            computeTotal();
          });
        });

        // Select additives
        additiveButtons.forEach((button) => {
          button.addEventListener('click', () => {
            button.classList.toggle('active-additive-btn');
            computeTotal();
          });
        });

        // Close modal when click outside or on close button
        modalCloseBtn?.addEventListener('click', closeModal);
        body?.addEventListener('click', (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('overlay')) {
            closeModal();
          }
        });
      } catch (error) {
        console.log(error);
        showSpinner(false, modalOverlay);
        modalOverlay?.classList.add('display-none');
        showNotification('Something went wrong. Please, try again');
      }
    });
  });

  // Show modal
  function showModal() {
    modalContainer?.classList.remove('display-none');
    modalOverlay?.classList.remove('display-none');
    body?.classList.add('disable-scroll');
  }

  // Close modal
  function closeModal() {
    modalContainer?.classList.add('display-none');
    modalOverlay?.classList.add('display-none');
    body?.classList.remove('disable-scroll');
    // resetModalSelections();
  }
};
