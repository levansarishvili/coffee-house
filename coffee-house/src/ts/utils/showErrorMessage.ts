export const showErrorMessage = (
  message: string,
  container: HTMLElement | null
) => {
  const errorHtml = `
    <div class="error-message w-full flex items-center justify-center dark-txt medium-font weight-500 txt-align-center">
      ${message}
    </div>
  `;
  container && (container.innerHTML = errorHtml);
};
