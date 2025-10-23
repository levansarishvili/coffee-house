import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/coffee-house/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        menu: 'menu.html',
        register: 'register.html',
        login: 'login.html',
        cart: 'cart.html',
      },
    },
  },
});
