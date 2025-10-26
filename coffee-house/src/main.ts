import { burgerMenu } from './ts/components/burgerMenu.js';
import { home } from './ts/home/home.js';
import { menu } from './ts/menu/menu.js';
import { register } from './ts/registration/registration.js';
import { login } from './ts/login/login.js';
import { cart } from './ts/cart/cart.js';

// Detect current page
const currentPage = document.body.dataset.page;

// Initialize the correct page script
if (currentPage === 'home') home();
if (currentPage === 'menu') menu();
if (currentPage === 'register') register();
if (currentPage === 'login') login();
if (currentPage === 'cart') cart();

// Initialize Burger Menu
burgerMenu();
