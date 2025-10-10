"use strict";

import { products } from "../../data/products.js";

// ================ Product Size and Additives Selection ================
const productWrappers = {
  coffee: document.querySelector(".coffee-products"),
  tea: document.querySelector(".tea-products"),
  dessert: document.querySelector(".dessert-products"),
};

const body = document.querySelector("body");
const modalContainer = document.querySelector(".modal-container");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalOverlay = document.querySelector(".overlay");
const additiveButtons = document.querySelectorAll(".additive-btn");
const sizeButtons = document.querySelectorAll(".size-btn");
const firstSizeButton = document.querySelector(".first-size-btn");
const selectedProductName = document.querySelector(".modal-product-name");
const selectedProductDesc = document.querySelector(".modal-product-desc-txt");
const selectedProductImage = document.querySelector(".modal-img");
const totalPriceEl = document.querySelector(".total-price");

let curProduct;
let totalPrice = 0;
let initialPrice = 0;

// Show modal
function showModal() {
  modalContainer.classList.remove("display-none");
  modalOverlay.classList.remove("display-none");
  body.classList.add("disable-scroll");
}

// Close modal
function closeModal() {
  modalContainer.classList.add("display-none");
  modalOverlay.classList.add("display-none");
  body.classList.remove("disable-scroll");
  resetModalSelections();
}

// Update modal content
Object.values(productWrappers).forEach((wrapper) =>
  wrapper.addEventListener("click", (event) => {
    const productItem = event.target.closest(".product-item");
    if (!productItem) return;
    const productName = productItem?.dataset?.productName;

    curProduct = products.filter((product) => product.name === productName);

    selectedProductName.textContent = curProduct[0].name;
    selectedProductDesc.textContent = curProduct[0].description;
    initialPrice = Number(curProduct[0].price);
    totalPrice = initialPrice;
    totalPriceEl.textContent = `$${Number(initialPrice).toFixed(2)}`;
    selectedProductImage.src = `./assets/${curProduct[0].name}.png`;
    selectedProductImage.alt = `${curProduct[0].name} image`;

    showModal();
  })
);

// Compute total price
function computeTotal() {
  const base = Number(initialPrice) || 0;

  // find active size (if any)
  const activeSizeBtn = Array.from(sizeButtons).find((btn) =>
    btn.classList.contains("active-size-btn")
  );
  const size = Number(activeSizeBtn?.dataset?.sizeValue || 0);

  // sum all active additives
  const additivesSum = Array.from(additiveButtons).reduce((sum, btn) => {
    return (
      sum +
      (btn.classList.contains("active-additive-btn")
        ? Number(btn.dataset.additivePrice || 0)
        : 0)
    );
  }, 0);

  totalPrice = base + size + additivesSum;
  totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
}

// Select size
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sizeButtons.forEach((btn) => btn.classList.remove("active-size-btn"));
    button.classList.add("active-size-btn");
    computeTotal();
  });
});

// Select additives
additiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active-additive-btn");
    computeTotal();
  });
});

// Reset size and additives when modal closed
function resetModalSelections() {
  sizeButtons.forEach((btn) => btn.classList.remove("active-size-btn"));
  firstSizeButton.classList.add("active-size-btn");
  additiveButtons.forEach((btn) => btn.classList.remove("active-additive-btn"));
  totalPrice = initialPrice;
  totalPriceEl.textContent = `$${Number(totalPrice).toFixed(2)}`;
  computeTotal();
}

// Close modal when click outside or on close button
modalCloseBtn.addEventListener("click", closeModal);
body.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    closeModal();
  }
});
