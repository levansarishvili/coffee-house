import type { ProductDetails } from '../../types/product.js';

export const renderModal = (
  product: ProductDetails,
  wrapper: HTMLElement | null
) => {
  wrapper && (wrapper.innerHTML = '');

  const productSizes = Object.entries(product.sizes);

  const sizeButtonsHtml = productSizes
    .map(
      (size, index) => `
      <div
        class="${
          index === 0 ? 'first-size-btn active-size-btn' : ''
        } size-btn flex-row align-center gap-8 medium-font dark-txt weight-600"
        data-price="${size[1].price}" data-discount-price="${
        size[1].discountPrice ?? 0
      }"
      >
        <div class="size-letter-box">
          <span class="size-letter flex-row align-center justify-center"
            >${size[0].toUpperCase()}</span
          >
        </div>
        <p id="size-1">${size[1].size}</p>
      </div>
  `
    )
    .join('');

  const additiveButtonsHtml = product.additives
    .map(
      (additive, index) => `
      <div
        class="additive-btn flex-row align-center gap-8 medium-font dark-txt weight-600"
        data-price="${additive.price}" data-discount-price="${
        additive.discountPrice ?? 0
      }"
      >
        <div class="additive-number-box">
          <span
            class="additive-number flex-row align-center justify-center"
            >${index + 1}</span
          >
        </div>
        <p id="additive-1">${additive.name}</p>
      </div>
  `
    )
    .join('');

  const modalHtml = `
    <div class="modal-img-box">
      <img
        class="modal-img"
        src="./assets/${product.id}.png"
        alt="coffee image"
        id="modal-img"
      />
    </div>
    <div class="modal-product-info flex-col gap-20">
      <div class="modal-product-desc flex-col gap-12">
        <p
          class="modal-product-name heading-3-font weight-600 dark-txt"
        >
          ${product.name}
        </p>
        <p
          class="modal-product-desc-txt weight-400 dark-txt medium-font"
        >
          ${product.description}
        </p>
      </div>
      <div class="modal-product-size flex-col gap-8">
        <p class="dark-txt medium-font weight-400">Size</p>
        <div class="size-buttons-container flex-row gap-8">
          ${sizeButtonsHtml}
        </div>
      </div>

      <div class="modal-product-additives flex-col gap-8">
        <p class="dark-txt medium-font weight-400">Additives</p>
        <div class="additive-buttons-container flex-row gap-8">
          ${additiveButtonsHtml}
        </div>
      </div>

      <div
        class="total-price-container flex-row gap-20 align-center justify-between"
      >
        <p class="heading-3-font dark-txt weight-600">Total:</p>
        <p
          class="total-price heading-3-font dark-txt weight-600"
          id="total-price"
        >
          $${product.price}
        </p>
      </div>
      <button
        class="modal-add-to-cart-btn w-full dark-txt weight-600 medium-font"
      >
        Add to Cart
      </button>
      <button
        class="modal-close-btn dark-txt weight-600 medium-font"
      >
        <img class='modal-close-icon' src='./assets/button-close.svg' alt='Close icon'/>
      </button>
    </div>`;

  if (wrapper) {
    wrapper.innerHTML = modalHtml;
  }
};
