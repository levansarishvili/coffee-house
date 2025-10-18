export const showSpinner = (show: boolean, wrapper: HTMLElement | null) => {
  const spinnerHtml = `
    <span class="spinner"></span>
  `;

  if (show) {
    // Ensure the parent can position absolutely placed children
    if (wrapper) {
      wrapper.style.position = 'relative';
      wrapper.insertAdjacentHTML('beforeend', spinnerHtml);
    }
  } else {
    wrapper?.querySelector('.spinner')?.remove();
  }
};
