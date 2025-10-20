import type { Product } from '../../types/product';

export const renderProductCards = (
  products: Product[],
  wrapper: HTMLElement,
  category: string,
  isAuthenticated: boolean = false
) => {
  const curProducts = products.filter(
    (product) => product.category === category
  );

  wrapper.innerHTML = '';

  curProducts.forEach((product, index) => {
    const showDiscountPrice = isAuthenticated && !!product.discountPrice;
    const productHTML = `
      <div class="product-item ${category}-product-item flex-col cursor-pointer ${
      index > 3 ? 'hidden-product' : ''
    }" 
        data-product-id="${product.id}">
        <div class="img-box">
          <img class="product-img w-full h-full" src="./assets/${
            product.id
          }.png" alt="${product.name} image" />
        </div>
        <div class="product-desc flex-col justify-between dark-txt pd-20">
          <p class="coffee-name heading-3-font weight-600 mb-12">${
            product.name
          }</p>
          <p class="product-desc-txt medium-font weight-400 mb-auto">
            ${product.description}
          </p>
          <div class='product-price-wrapper'>
            <p
              class="product-price-original heading-3-font weight-600 ${
                showDiscountPrice ? '' : 'display-none'
              }"
            >
              $${product.price}
            </p>
            <p
              class="product-price heading-3-font dark-txt weight-600"
            >
              $${showDiscountPrice ? product.discountPrice : product.price}
            </p>
          </div>
        </div>
      </div>
    `;

    wrapper?.insertAdjacentHTML('beforeend', productHTML);
  });
};
