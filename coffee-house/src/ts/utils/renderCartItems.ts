import type { CartProduct } from '../../types/cart';

export const renderCartItems = (
  isAuthenticated: boolean,
  cartItems: CartProduct[]
) => {
  const cartItemsWrapperEl = document.querySelector<HTMLDivElement>(
    '.cart-items-wrapper'
  );
  const cartTotalsWrapper = document.querySelector<HTMLElement>(
    '.cart-totals-wrapper'
  );

  cartItemsWrapperEl && (cartItemsWrapperEl.innerHTML = '');
  cartTotalsWrapper && (cartTotalsWrapper.innerHTML = '');

  const totalPrice = cartItems.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
  const totalDiscountedPrice = cartItems.reduce((acc, item) => {
    return (acc += item.discountedPrice);
  }, 0);
  console.log(totalPrice, totalDiscountedPrice);

  const cartItemsHtml = cartItems
    .map((item) => {
      const additivesContent = item.selectedAdditives
        .map((additive) => `<span class="item-additive">${additive}</span>`)
        .join(', ');

      const cartItemContent = `
        <div class="cart-item flex-row gap-20 align-center w-full">
          <div class="flex-row gap-20 align-center justify-center">
            <button class="cart-delete-button" data-id="${item.id}">
              <img src="/assets/trash.svg" alt="Trash icon" />
            </button>
            <div class="cart-item-img-box">
              <img
                class="cart-item-img"
                src="/assets/${item.productId}.png"
                alt="Product image"
              />
            </div>
          </div>

          <div
            class="cart-text-content flex-row gap-20 align-center justify-between w-full"
          >
            <div class="flex-col gap-6 align-start justify-center w-full">
              <h3 class="cart-item-name dark-txt heading-3-font">
                ${item.name}
              </h3>
              <p class="cart-item-extra dark-tsx">
                <span class="item-size">${item.selectedSize},</span>
                ${additivesContent}
              </p>
            </div>

            <p class="${
              isAuthenticated && item.discountedPrice > 0
                ? 'cart-item-original-price'
                : 'cart-item-total-price'
            } dark-txt">$${item.price.toFixed(2)}</p>
            <p class="cart-item-total-price dark-txt ${
              isAuthenticated && item.discountedPrice > 0 ? '' : 'display-none'
            }">$${item.discountedPrice.toFixed(2)}</p>
          </div>
        </div>
  `;

      return cartItemContent;
    })
    .join('');

  const cartTotalsHtml = `
    <div class="w-full flex-row justify-between">
      <span>Total:</span>
      <span class="${isAuthenticated ? '' : 'display-none'}">$14.00</span>
    </div>
    <div class="w-full flex-row justify-between ${
      isAuthenticated ? '' : 'display-none'
    }">
      <span>Address:</span>
      <span>City, Street, 7</span>
    </div>
    <div class="w-full flex-row justify-between ${
      isAuthenticated ? '' : 'display-none'
    }">
      <span>Pay by:</span>
      <span>Card</span>
    </div>`;

  cartItemsWrapperEl && (cartItemsWrapperEl.innerHTML = cartItemsHtml);
};
