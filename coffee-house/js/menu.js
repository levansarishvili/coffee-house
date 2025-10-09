// ================ Product Category Tabs ================
const tabsWrapper = document.querySelector(".tabs-wrapper");
const tabItems = document.querySelectorAll(".tab-item");
const loadBtn = document.querySelector(".load-btn");

const productWrappers = {
  coffee: document.querySelector(".coffee-products"),
  tea: document.querySelector(".tea-products"),
  dessert: document.querySelector(".dessert-products"),
};

const allProducts = {
  coffee: document.querySelectorAll(".coffee-product-item"),
  tea: document.querySelectorAll(".tea-product-item"),
  dessert: document.querySelectorAll(".dessert-product-item"),
};

let curCategory = "coffee";
let curProducts = allProducts[curCategory];

// Show products based on category
function showProducts(category = "coffee") {
  Object.keys(productWrappers).forEach((cat) => {
    productWrappers[cat].classList.toggle("display-none", cat !== category);
  });
  curProducts = allProducts[category];
  curCategory = category;
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
  curCategory = category;
  showLoadButton();
});

// ================ Load More Products ================
function loadProducts() {
  curProducts.forEach((product) => {
    product.classList.remove("hidden-product");
  });
}

function showLoadButton() {
  const isMobile = window.innerWidth <= 768;
  const hasHiddenProducts = Array.from(curProducts).some((product) =>
    product.classList.contains("hidden-product")
  );

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
