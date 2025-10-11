"use strict";

import { products } from "../../data/products.js";

// ================ Product Category Tabs ================
const tabsWrapper = document.querySelector(".tabs-wrapper");
const tabItems = document.querySelectorAll(".tab-item");
const loadBtn = document.querySelector(".load-btn");

const productWrappers = {
  coffee: document.querySelector(".coffee-products"),
  tea: document.querySelector(".tea-products"),
  dessert: document.querySelector(".dessert-products"),
};

let curCategory = "coffee";
let curProducts;

// Render products by category
function renderProducts(category) {
  const curWrapper = productWrappers[category];
  curWrapper.innerHTML = "";

  curProducts = products.filter((product) => product.category === category);

  curProducts.forEach((product, index) => {
    const productHTML = `
      <div class="product-item ${category}-product-item flex-col cursor-pointer ${
      index > 3 ? "hidden-product" : ""
    }" 
        data-product-name="${product.name}">
        <div class="img-box">
          <img class="product-img w-full" src="./assets/${product.name
            .split(" ")
            .join("-")}.png" alt="${product.name} image" />
        </div>
        <div class="product-desc flex-col justify-between dark-txt pd-20">
          <p class="coffee-name heading-3-font weight-600 mb-12">${
            product.name
          }</p>
          <p class="product-desc-txt medium-font weight-400 mb-auto">
            ${product.description}
          </p>
          <p class="product-price heading-3-font weight-600">$${Number(
            product.price
          ).toFixed(2)}</p>
        </div>
      </div>
    `;

    curWrapper.insertAdjacentHTML("beforeend", productHTML);
  });
}

// Show products based on category
function showProducts(category = "coffee") {
  // Hide all wrappers
  Object.values(productWrappers).forEach((wrapper) => {
    wrapper.style.display = "none";
  });

  // Show selected wrapper
  const selectedWrapper = productWrappers[category];
  selectedWrapper.style.display = "flex";

  curCategory = category;
  renderProducts(category);
  showLoadButton();
}

// Set active tab
function setActiveTab(category) {
  tabItems.forEach((tab) => {
    if (tab.dataset.category === category) {
      tab.classList.add("active-tab");
    } else {
      tab.classList.remove("active-tab");
    }
  });
}

// Event listener for tab clicks
tabsWrapper.addEventListener("click", (event) => {
  const clickedTab = event.target.closest(".tab-item");
  const category = clickedTab?.dataset?.category;
  if (!clickedTab || !category || category === curCategory) return;

  showProducts(category);
  setActiveTab(category);
  showLoadButton();
  curCategory = category;
});

// Load More Products
function loadProducts() {
  const hiddenItems =
    productWrappers[curCategory].querySelectorAll(".hidden-product");
  hiddenItems.forEach((item) => item.classList.remove("hidden-product"));
}

function showLoadButton() {
  const isMobile = window.innerWidth <= 768;
  const hiddenProducts =
    productWrappers[curCategory].querySelectorAll(".hidden-product");
  const hasHiddenProducts = hiddenProducts.length > 0;

  loadBtn.style.display = isMobile && hasHiddenProducts ? "flex" : "none";
}

loadBtn.addEventListener("click", () => {
  loadProducts();
  loadBtn.style.display = "none";
});

window.addEventListener("resize", () => {
  showLoadButton();
});

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  showProducts();
  setActiveTab(curCategory);
  showLoadButton();
});
