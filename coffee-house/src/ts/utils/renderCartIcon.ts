export const renderCartIcon = (
  cartItemsQuantity: number = 0,
  isAuthenticated: boolean,
  finalPrice: number,
  totalPrice: number
) => {
  const navItemsWrapperEl = document.querySelector<HTMLElement>('.nav-items');
  const cartIconWrapperEl =
    document.querySelector<HTMLDivElement>('.cart-icon-wrapper');

  const cartIconHtmlDesktop = `
    <a
      href="cart.html"
      class="cart-icon hover-underline-animation flex-row gap-8 align-center justify-center"
    >
      <img src="/assets/shopping-bag.svg" alt="Shopping bag" />
      <span class="cart-items-quantity cart-items-quantity--desktop display-none">${cartItemsQuantity}</span>
      <div class="header-prices-wrapper flex-row">
        <span class="original-price--header ${
          isAuthenticated && totalPrice !== finalPrice ? '' : 'display-none'
        }">$${totalPrice.toFixed(2)}</span>
        <span class="total-price--header ${
          isAuthenticated && finalPrice > 0 ? '' : 'display-none'
        }">$${finalPrice.toFixed(2)}</span>
      </div>
    </a>`;
  const cartIconHtmlMobile = `
    <li class="nav-item--cart display-none">
      <a
        class="cart-nav display-none flex-row align-center gap-8 hover-underline-animation"
        href="cart.html"
        >Cart<img
          class="cart-icon--mobile"
          src="assets/shopping-bag.svg"
          alt="Shopping bag"
      />
        <span class="cart-items-quantity cart-items-quantity--mobile display-none">${cartItemsQuantity}</span>
        <div class="header-prices-wrapper header-prices-wrapper--mobile flex-row">
          <span class="original-price--header ${
            isAuthenticated && totalPrice !== finalPrice ? '' : 'display-none'
          }">$${totalPrice.toFixed(2)}</span>
          <span class="total-price--header ${
            isAuthenticated && finalPrice > 0 ? '' : 'display-none'
          }">$${finalPrice.toFixed(2)}</span>
        </div>
      </a>
    </li>`;

  // Clear previous icons to avoid duplicates
  cartIconWrapperEl && (cartIconWrapperEl.innerHTML = '');
  const existingCartItem = navItemsWrapperEl?.querySelector('.nav-item--cart');
  existingCartItem?.remove();

  // Show icon if logged in OR cart has items
  if (isAuthenticated || cartItemsQuantity > 0) {
    cartIconWrapperEl?.insertAdjacentHTML('beforeend', cartIconHtmlDesktop);
    navItemsWrapperEl?.insertAdjacentHTML('beforeend', cartIconHtmlMobile);
  }

  // Show cart items number if it is not 0
  const cartItemsQuantityDeskEl = document.querySelector<HTMLElement>(
    '.cart-items-quantity--desktop'
  );
  const cartItemsQuantityMobEl = document.querySelector<HTMLElement>(
    '.cart-items-quantity--mobile'
  );
  if (cartItemsQuantity > 0) {
    cartItemsQuantityDeskEl?.classList.remove('display-none');
    cartItemsQuantityDeskEl &&
      (cartItemsQuantityDeskEl.textContent = String(cartItemsQuantity));
  }
  if (cartItemsQuantity > 0) {
    cartItemsQuantityMobEl?.classList.remove('display-none');
    cartItemsQuantityMobEl &&
      (cartItemsQuantityMobEl.textContent = String(cartItemsQuantity));
  }
};
