'use strict';

import { AuthEvent, CartEvent } from '../../types/enums';

// ================= Burger menu =================
export const burgerMenu = () => {
  const body = document.querySelector<HTMLBodyElement>('body');
  const navBar = document.querySelector<HTMLElement>('.nav-bar');
  const burgerMenu = document.querySelector<HTMLElement>('.burger-menu');
  const burgerLines = document.querySelector<HTMLElement>('.burger-lines');
  const coffeeNavItemEl =
    document.querySelector<HTMLElement>('.coffee-nav-item');

  let screenWidth = window.innerWidth;

  function updateNavItemsVisibility() {
    const cartIconNavItemEl =
      document.querySelector<HTMLElement>('.nav-item--cart');
    if (screenWidth > 864) {
      coffeeNavItemEl?.classList.add('display-none');
      cartIconNavItemEl?.classList.add('display-none');
    } else {
      coffeeNavItemEl?.classList.remove('display-none');
      cartIconNavItemEl?.classList.remove('display-none');
    }
  }

  updateNavItemsVisibility();

  window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    const burgerMenuIsOpen = navBar?.classList.contains('burger-menu--open');

    if (screenWidth > 864 && burgerMenuIsOpen) {
      toggleBurgerMenu();
    }
    updateNavItemsVisibility();
  });

  function toggleBurgerMenu() {
    if (screenWidth > 864) return;
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

  document.addEventListener(CartEvent.Updated, updateNavItemsVisibility);
  document.addEventListener(AuthEvent.Updated, updateNavItemsVisibility);
};
