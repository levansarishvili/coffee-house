import type { ProductDetails } from '../../types/product.js';

export const renderModal = (
  product: ProductDetails,
  wrapper: HTMLElement | null,
  isAuthenticated: boolean = false
) => {
  wrapper && (wrapper.innerHTML = '');

  const productSizes = Object.entries(product.sizes);
  const hasDiscount = isAuthenticated && !!product.sizes.s.discountPrice;

  const sizeButtonsHtml = productSizes
    .map(
      (size, index) => `
      <div
        class="${
          index === 0 ? 'first-size-btn active-size-btn' : ''
        } size-btn flex-row align-center gap-8 medium-font dark-txt weight-600"
        data-price="${size[1].price}" ${
        size[1].discountPrice
          ? `data-discount-price="${size[1].discountPrice}"`
          : ''
      }
      >
        <div class="size-letter-box">
          <span class="size-letter flex-row align-center justify-center"
            >${size[0].toUpperCase()}</span
          >
        </div>
        <p id="size-1">${size[1].size}</p>

        <!-- Tooltip -->
        <div class="tooltip">
          <span class="tooltip-original-price display-none"></span>
          <span class='tooltip-price'></span>
        </div>
      </div>
  `
    )
    .join('');

  const additiveButtonsHtml = product.additives
    .map(
      (additive, index) => `
      <div
        class="additive-btn flex-row align-center gap-8 medium-font dark-txt weight-600"
        data-price="${additive.price}" ${
        additive.discountPrice
          ? `data-discount-price="${additive.discountPrice}"`
          : ''
      }
      >
        <div class="additive-number-box">
          <span
            class="additive-number flex-row align-center justify-center"
            >${index + 1}</span
          >
        </div>
        <p id="additive-1">${additive.name}</p>
        
        <!-- Tooltip -->
        <div class="tooltip">
          <span class="tooltip-additive-original-price display-none"></span>
          <span class='tooltip-additive-price'></span>
        </div>
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
        <div class='total-price-wrapper'>
          <span
            class="original-price heading-3-font weight-600 ${
              hasDiscount ? '' : 'display-none'
            }"
          >
            $${product.price}
          </span>
          <span
            class="total-price heading-3-font dark-txt weight-600"
          >
            $${hasDiscount ? product.sizes.s.discountPrice : product.price}
          </span>
        </div>
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
