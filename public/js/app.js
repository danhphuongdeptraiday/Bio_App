let bgShadow = document.querySelector(".backgroundShadow");
let openAddProduct = document.querySelector("#openAddProduct");
let addProduct = document.querySelector(".addProduct");

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
