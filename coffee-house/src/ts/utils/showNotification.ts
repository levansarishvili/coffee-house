export const showNotification = (message: string) => {
  const notification = document.querySelector<HTMLElement>('.notification');
  if (!notification) return;

  notification.textContent = message;
  notification.classList.remove('display-none');
  notification.classList.add('show-notification');

  setTimeout(() => {
    notification.classList.remove('show-notification');
    notification.classList.add('display-none');
  }, 3000);
};
