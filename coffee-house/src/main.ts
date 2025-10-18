import { burgerMenu } from './ts/components/burgerMenu.js';
import { home } from './ts/home/home.js';
import { menu } from './ts/menu/menu.js';

// Detect current page
const currentPage = document.body.dataset.page;

// Initialize the correct page script
if (currentPage === 'home') home();
if (currentPage === 'menu') menu();

// Initialize Burger Menu
burgerMenu();
