let bgShadow = document.querySelector(".backgroundShadow");
let openAddProduct = document.querySelector("#openAddProduct");
let addProduct = document.querySelector(".addProduct");
let submitForm = document.getElementById("submitForm");
let formData = document.getElementById("formData");

// function preventReloadPage(event) {
//   event.preventDefault();
//   console.log("K reload");
// }
// formData.addEventListener("submit", preventReloadPage);

bgShadow.style.display = "none";
addProduct.style.display = "none";
openAddProduct.addEventListener("click", () => {
  if (bgShadow.style.display == "none" && addProduct.style.display == "none") {
    bgShadow.style.display = "block";
    addProduct.style.display = "block";
  } else {
    bgShadow.style.display = "none";
    addProduct.style.display = "none";
  }
});

bgShadow.addEventListener("click", () => {
  if (bgShadow.style.display == "none" && addProduct.style.display == "none") {
    bgShadow.style.display = "block";
    addProduct.style.display = "block";
  } else {
    bgShadow.style.display = "none";
    addProduct.style.display = "none";
  }
});

// Handle prevent reload when post
// formData.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("Hello");
// });
