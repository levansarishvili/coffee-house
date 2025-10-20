'use strict';

import { fetchProductById } from '../utils/fetchProductById';
import { renderModal } from '../utils/renderModal';
import { showNotification } from '../utils/showNotification';
import { showSpinner } from '../utils/showSpinner';
import { updateTooltipPrice } from '../utils/updateTooltipPrice';

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
        const sizeContainer = document.querySelector<HTMLElement>(
          '.size-buttons-container'
        );
        const additiveContainer = document.querySelector<HTMLElement>(
          '.additive-buttons-container'
        );
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

        // Size buttons hover
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

        // Select additive button
        additiveContainer?.addEventListener('click', (e) => {
          const button = (e.target as HTMLElement).closest(
            '.additive-btn'
          ) as HTMLElement;
          if (!button) return;
          button.classList.toggle('active-additive-btn');
          computeTotal();
        });

        // Additive buttons hover
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

        // Close modal when click outside or on close button, also when press ESC
        modalCloseBtn?.addEventListener('click', closeModal);
        body?.addEventListener('click', (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('overlay')) {
            closeModal();
          }
        });
        document.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            closeModal();
          }
        });
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
