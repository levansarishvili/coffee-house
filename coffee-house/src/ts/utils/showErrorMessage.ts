export const showErrorMessage = (
  message: string,
  container: HTMLElement | null
) => {
  const errorHtml = `
    <div class="error-message w-full gap-6 flex-row flex-wrap align-center justify-center txt-align-center">
      <img src="/assets/warning-circle.svg"/>
     <p>${message}</p>
    </div>
  `;
  container && (container.innerHTML = errorHtml);
};
