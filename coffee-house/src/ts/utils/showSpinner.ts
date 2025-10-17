export const showSpinner = (show: boolean) => {
  const spinner = document.querySelector<HTMLElement>('.spinner');
  if (!spinner) return;
  if (show) {
    spinner.classList.remove('display-none');
  } else {
    spinner.classList.add('display-none');
  }
};
