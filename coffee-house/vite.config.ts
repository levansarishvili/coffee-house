import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
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
