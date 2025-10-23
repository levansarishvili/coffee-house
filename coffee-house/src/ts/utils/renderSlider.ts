import type { Product } from '../../types/product.js';

export const renderSlider = (
  products: Product[],
  sliderWrapper: HTMLElement | null
) => {
  if (!sliderWrapper) return;

  products.forEach((product) => {
    const slideHtml = `
      <div
        class="slider-content flex-col justify-between align-center gap-20"
      >
        <div class="slider-img-wrapper">
          <img
            class="slider-img"
            src="assets/${product.id}.png"
            alt="slider image"
          />
        </div>        
        <div class="slider-desc flex-col align-center gap-12">
          <p
            class="slider-desc-name dark-txt heading-3-font weight-600"
          >
            ${product.name}
          </p>
          <p
            class="slider-desc-txt dark-txt medium-font weight-400 txt-align-center"
          >
            ${product.description}
          </p>
          <p
            class="slider-desc-price dark-txt heading-3-font weight-600"
          >
            ${product.price}$
          </p>
        </div>
      </div>
    `;
    sliderWrapper.insertAdjacentHTML('beforeend', slideHtml);
  });
};
