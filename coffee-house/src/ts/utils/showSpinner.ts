export const showSpinner = (show: boolean, wrapper: HTMLElement | null) => {
  if (!wrapper) return;

  const spinnerHtml = `
    <div class="spinner-container">
      <span class="spinner"></span>
    </div>
  `;

  if (show) {
    // Check if spinner already exists to avoid duplicates
    const existingSpinner = wrapper.querySelector('.spinner-container');
    if (!existingSpinner) {
      wrapper.insertAdjacentHTML('beforeend', spinnerHtml);
    }
  } else {
    wrapper.querySelector('.spinner-container')?.remove();
  }
};
