export const renderStreetOptions = (
  streetSelectOptionsEl: HTMLSelectElement | null,
  streets: string[]
) => {
  // Clear existing options
  streetSelectOptionsEl && (streetSelectOptionsEl.innerHTML = '');
  const streetOptionsHtml = streets
    .map(
      (street) =>
        `<option value="${street}" class="select-option">${street}</option>`
    )
    .join('');
  streetSelectOptionsEl &&
    (streetSelectOptionsEl.innerHTML = streetOptionsHtml);
};
