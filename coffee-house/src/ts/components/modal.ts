'use strict';

import { fetchProductById } from '../utils/fetchProductById';
import { renderModal } from '../utils/renderModal';

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
      const target = e.target as HTMLElement;
      const productItem = target.closest('.product-item') as HTMLElement | null;
      if (!productItem) return;

      curProductId = productItem?.dataset?.productId;

      try {
        const product = await fetchProductById(curProductId);
        console.log(product);

        renderModal(product, modalContainer);

        showModal();

        const modalCloseBtn =
          document.querySelector<HTMLElement>('.modal-close-btn');
        const additiveButtons =
          document.querySelectorAll<HTMLElement>('.additive-btn');
        const sizeButtons = document.querySelectorAll<HTMLElement>('.size-btn');

        const totalPriceEl =
          document.querySelector<HTMLElement>('.total-price');

        // Compute total price
        function computeTotal() {
          // find active size (if any)
          const activeSizeBtn = Array.from(sizeButtons).find((btn) =>
            btn.classList.contains('active-size-btn')
          );
          const pricePerSize = Number(
            isAuthenticated && activeSizeBtn?.dataset.discountPrice !== '0'
              ? activeSizeBtn?.dataset.discountPrice
              : activeSizeBtn?.dataset.price
          );
          console.log(pricePerSize);

          // sum all active additives
          const additivesSum = Array.from(additiveButtons).reduce(
            (sum, btn) => {
              return (
                sum +
                (btn.classList.contains('active-additive-btn')
                  ? Number(
                      isAuthenticated && btn.dataset.discountPrice !== '0'
                        ? btn.dataset.discountPrice
                        : btn.dataset.price
                    )
                  : 0)
              );
            },
            0
          );

          console.log(additivesSum);

          totalPrice = pricePerSize + additivesSum;
          totalPriceEl &&
            (totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`);
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

        // Reset size and additives when modal closed
        // function resetModalSelections() {
        //   sizeButtons.forEach((btn) => btn.classList.remove('active-size-btn'));
        //   firstSizeButton?.classList.add('active-size-btn');
        //   additiveButtons.forEach((btn) =>
        //     btn.classList.remove('active-additive-btn')
        //   );
        //   totalPrice = initialPrice;
        //   totalPriceEl &&
        //     (totalPriceEl.textContent = `$${Number(totalPrice).toFixed(2)} `);

        //   computeTotal();
        // }

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
