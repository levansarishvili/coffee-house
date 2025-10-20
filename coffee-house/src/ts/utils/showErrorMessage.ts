export const showErrorMessage = (
  message: string,
  container: HTMLElement | null
) => {
  const errorHtml = `
    <div class="error-message w-full flex-row items-center justify-center dark-txt medium-font weight-500 txt-align-center">
      <img class='warning-icon' src='./assets/warning-circle.svg' alt='Warning icon'/>
      <p>${message}</p>
    </div>
  `;
  container && (container.innerHTML = errorHtml);
};
