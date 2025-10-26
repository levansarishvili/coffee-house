export const showErrorMessage = (
  message: string,
  container: HTMLElement | null
) => {
  const errorHtml = `
    <div class="error-message w-full gap-6 flex-row flex-wrap dark-txt align-center justify-center medium-font weight-500 txt-align-center">
      <img src="/assets/warning-circle.svg"/>
     <p>${message}</p>
    </div>
  `;
  container && (container.innerHTML = errorHtml);
};
