import { burgerMenu } from './components/burgerMenu.js';
import { home } from './home/home.js';
import { menu } from './menu/menu.js';
import { header } from './components/header.js';
import { footer } from './components/footer.js';

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
