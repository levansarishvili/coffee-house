export const showSuccessMessage = (
  message: string,
  container: HTMLElement | null
) => {
  const messageHtml = `
    <div class="success-message w-full flex-row gap-6 dark-txt align-center justify-center medium-font weight-500 txt-align-center">
      <img src="/assets/check-circle.svg"/>
      <p>${message}</p>
    </div>
  `;
  container && (container.innerHTML = messageHtml);
};
