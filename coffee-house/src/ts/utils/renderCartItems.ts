import type { CartProduct } from '../../types/cart';
import { getUser } from '../authStore';

export const renderCartItems = (
  isAuthenticated: boolean,
  cartItems: CartProduct[]
) => {
  const user = getUser();

  const city = user?.user.city;
  const street = user?.user.street;
  const houseNumber = user?.user.houseNumber;
  const paymentMethod = user?.user.paymentMethod;
  const capitalizedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : '';
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
  const hasDiscount = totalPrice > totalDiscountedPrice;

  const cartItemsHtml = cartItems
    .map((item) => {
      const hasDiscount = item.price > item.discountedPrice;

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
              isAuthenticated && hasDiscount
                ? 'cart-item-original-price'
                : 'cart-item-total-price'
            } dark-txt">$${item.price.toFixed(2)}</p>
            <p class="cart-item-total-price dark-txt ${
              isAuthenticated && hasDiscount ? '' : 'display-none'
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
      <div class="flex-row gap-20">
        <span class="${
          isAuthenticated && hasDiscount ? 'cart-total-original-price' : ''
        }">$${totalPrice.toFixed(2)}</span>
        <span class="${
          isAuthenticated && hasDiscount ? '' : 'display-none'
        }">$${totalDiscountedPrice.toFixed(2)}</span> 
      </div>
    </div>
    <div class="w-full flex-row justify-between ${
      isAuthenticated ? '' : 'display-none'
    }">
      <span>Address:</span>
      <span>${capitalizedCity}, ${street}, ${houseNumber}</span>
    </div>
    <div class="w-full flex-row justify-between ${
      isAuthenticated ? '' : 'display-none'
    }">
      <span>Pay by:</span>
      <span>${paymentMethod}</span>
    </div>`;

  cartItemsWrapperEl && (cartItemsWrapperEl.innerHTML = cartItemsHtml);
  cartTotalsWrapper && (cartTotalsWrapper.innerHTML = cartTotalsHtml);
};
