export const header = (page: string | undefined) => {
  // ================= Header =================
  const headerEl = document.querySelector<HTMLElement>('.main-header');
  if (!headerEl) return;

  const isHomePage = page === 'home';
  const isMenuPage = page === 'menu';

  const headerHtml = `
    <div class="logo">
      <a href="${isHomePage ? '#' : 'index.html'}"
        ><img src="./assets/logo.svg" alt="coffee house logo"
      /></a>
    </div>
    <nav class="nav-bar" id="nav-bar">
      <ul
        class="nav-items flex-row justify-center align-center gap-40"
        id="nav-items"
      >
        <li>
          <a
            class="hover-underline-animation dark-txt medium-font weight-600"
            href="${isHomePage ? '#slider' : 'index.html#slider'}"
            >Favorite coffee</a
          >
        </li>
        <li>
          <a
            class="hover-underline-animation dark-txt medium-font weight-600"
            href="${isHomePage ? '#about' : 'index.html#about'}"
            >About</a
          >
        </li>
        <li>
          <a
            class="hover-underline-animation dark-txt medium-font weight-600"
            href="${isHomePage ? '#mobile-app' : 'index.html#mobile-app'}"
            >Mobile app</a
          >
        </li>
        <li>
          <a
            class="hover-underline-animation dark-txt medium-font weight-600"
            href="${isHomePage ? 'index.html#footer' : '#footer'}"
            >Contact us</a
          >
        </li>
        <li>
          <a
            class="coffee-nav ${
              isMenuPage ? 'cursor-default' : ''
            } display-none flex-row align-center gap-8 hover-underline-animation${
    isMenuPage ? '-menu' : ''
  }"
            href="menu.html"
            >Menu<img
              class="coffee-icon"
              src="assets/coffee-cup.svg"
              alt="coffee cup icon"
          /></a>
        </li>
      </ul>
    </nav>
    <a
      class="${
        isMenuPage ? 'disabled-link cursor-default' : ''
      } coffee flex-row align-center gap-8 hover-underline-animation${
    isMenuPage ? '-menu' : ''
  }"
      href="menu.html"
      >Menu<img
        class="coffee-icon"
        src="assets/coffee-cup.svg"
        alt="coffee cup icon"
    /></a>

    <a
      class="burger-menu display-none flex-row justify-center align-center cursor-pointer"
      href="#"
    >
      <!-- Burger menu Line -->
      <div class="burger-lines flex-col gap-8" id="burger-line">
        <span class="top-line"></span>
        <span class="bottom-line"></span>
      </div>
    </a>
  `;

  // Insert header HTML
  headerEl.innerHTML = headerHtml;
};
