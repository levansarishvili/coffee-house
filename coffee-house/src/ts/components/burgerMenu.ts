'use strict';

// ================= Burger menu =================
export const burgerMenu = () => {
  const body = document.querySelector<HTMLBodyElement>('body');
  const navBar = document.querySelector<HTMLElement>('.nav-bar');
  const burgerMenu = document.querySelector<HTMLElement>('.burger-menu');
  const burgerLines = document.querySelector<HTMLElement>('.burger-lines');

  let screenWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    const burgerMenuIsOpen = navBar?.classList.contains('burger-menu--open');

    if (screenWidth > 768 && burgerMenuIsOpen) {
      toggleBurgerMenu();
    }
  });

  function toggleBurgerMenu() {
    if (screenWidth > 768) return;
    navBar?.classList.toggle('burger-menu--open');
    burgerLines?.classList.toggle('burger-menu--open');
    body?.classList.toggle('disable-scroll');
  }

  burgerMenu?.addEventListener('click', () => {
    toggleBurgerMenu();
  });

  // Use event delegation to close burger menu when any nav item is clicked
  navBar?.addEventListener('click', (e: MouseEvent) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.tagName === 'A') {
      toggleBurgerMenu();
    }
  });
};
