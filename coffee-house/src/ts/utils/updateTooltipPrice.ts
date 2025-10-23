export const updateTooltipPrice = (
  button: HTMLElement,
  isAuthenticated: boolean,
  type: 'size' | 'additive'
) => {
  const price =
    isAuthenticated && button.dataset.discountPrice
      ? Number(button.dataset.discountPrice)
      : Number(button.dataset.price);

  const tooltipPriceEl = button.querySelector<HTMLElement>(
    type === 'size' ? '.tooltip-price' : '.tooltip-additive-price'
  );

  const tooltipOriginalPriceEl = button.querySelector<HTMLElement>(
    type === 'size'
      ? '.tooltip-original-price'
      : '.tooltip-additive-original-price'
  );

  if (tooltipPriceEl) tooltipPriceEl.textContent = `$${price.toFixed(2)}`;

  if (isAuthenticated && button.dataset.discountPrice) {
    tooltipOriginalPriceEl &&
      (tooltipOriginalPriceEl.textContent = `$${Number(
        button.dataset.price
      ).toFixed(2)}`);
    tooltipOriginalPriceEl?.classList.remove('display-none');
  } else {
    tooltipOriginalPriceEl?.classList.add('display-none');
  }
};
