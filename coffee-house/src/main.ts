import { burgerMenu } from './ts/components/burgerMenu.js';
import { home } from './ts/home/home.js';
import { menu } from './ts/menu/menu.js';
import { header } from './ts/components/header.js';
import { footer } from './ts/components/footer.js';

// Detect current page
const currentPage = document.body.dataset.page;

// Initialize Header once
header(currentPage);

// Initialize the correct page script
if (currentPage === 'home') home();
if (currentPage === 'menu') menu();

// Initialize Footer once
footer();

// Initialize Burger Menu
burgerMenu();
