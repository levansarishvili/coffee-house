export const renderCartIcon = (
  cartItemsQuantity: number = 0,
  isAuthenticated: boolean
) => {
  const navItemsWrapperEl = document.querySelector<HTMLElement>('.nav-items');
  const cartIconWrapperEl =
    document.querySelector<HTMLDivElement>('.cart-icon-wrapper');

  const cartIconHtmlDesktop = `
    <a
      href="cart.html"
      class="cart-icon hover-underline-animation flex-row gap-8 align-center justify-center"
    >
      <img src="/assets/shopping-bag-desktop.svg" alt="Shopping bag" />
      <span class="cart-items-quantity display-none">${cartItemsQuantity}</span>
    </a>`;
  const cartIconHtmlMobile = `
    <li class="nav-item--cart">
      <a
        class="cart-nav display-none flex-row align-center gap-8 hover-underline-animation"
        href="cart.html"
        >Cart<img
          class=""
          src="assets/shopping-bag-mobile.svg"
          alt="Shopping bag"
      /></a>
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
  const cartItemsQuantityEl = document.querySelector<HTMLElement>(
    '.cart-items-quantity'
  );
  if (cartItemsQuantity > 0) {
    cartItemsQuantityEl?.classList.remove('display-none');
    cartItemsQuantityEl &&
      (cartItemsQuantityEl.textContent = String(cartItemsQuantity));
  }
};
