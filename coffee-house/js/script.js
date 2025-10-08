// ================= Burger menu =================
const body = document.querySelector("body");
const navBar = document.querySelector(".nav-bar");
const burgerMenu = document.querySelector(".burger-menu");
const burgerLines = document.querySelector(".burger-lines");

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth;
  const burgerMenuIsOpen = navBar.classList.contains("burger-menu--open");

  if (screenWidth > 768 && burgerMenuIsOpen) {
    toggleBurgerMenu();
  }
});

function toggleBurgerMenu() {
  navBar.classList.toggle("burger-menu--open");
  burgerLines.classList.toggle("burger-menu--open");
  body.classList.toggle("disable-scroll");
}

burgerMenu.addEventListener("click", () => {
  toggleBurgerMenu();
});

// Use event delegation to close burger menu when any nav item is clicked
navBar.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    toggleBurgerMenu();
  }
});
