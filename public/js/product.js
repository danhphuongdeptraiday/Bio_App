import Swiper from "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js";
var mySwiper = new Swiper(".swiper-container", {
  // Enable autoplay
  autoplay: true,

  // Enable loop
  loop: true,

  // Enable pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Enable navigation buttons
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let productPage_container = document.querySelector(".productPage_container");
let productId = productPage_container.getAttribute("id");
let productName = document.querySelector(".about_product > h1");
let productPrice = document.querySelector(".about_product .price b");
let arrayColor = document.querySelectorAll(".about_product .color span");
let arraySize = document.querySelectorAll(".about_product .size span");

let addSuccess = document.querySelector(".addSuccess");

let addToCartBtn = document.querySelector("#addToCart");
let productColor = "";
for (let i = 0; i < arrayColor.length; i++) {
  productColor += arrayColor[i].innerText;
}

productColor.replace("/", " | ");

let productSize = "";
for (let i = 0; i < arraySize.length; i++) {
  productSize += arraySize[i].innerText + " | ";
}
let productImage = document.querySelector(".swiper-slide img").src;
let objectProduct = {
  item: {
    productId: Number(productPage_container.getAttribute("id")),
    productName: productName.innerText,
    productPrice: productPrice.innerText,
    productColor: productColor,
    productSize: productSize,
    productImage: productImage,
    linkSingleProductPage: location.href,
  },
  productQuantity: 1,
};

let getCartProduct = JSON.parse(
  localStorage.getItem("ProductHasBeenAddedToCart")
);
if (getCartProduct == null) {
  localStorage.setItem("ProductHasBeenAddedToCart", JSON.stringify([]));
  window.location.reload();
} else {
  // Add event
  addToCartBtn.addEventListener("click", () => {
    let setCartProduct = JSON.parse(
      localStorage.getItem("ProductHasBeenAddedToCart")
    );
    // Check product existed in localStorage or not ?
    let checkContainProduct = true;
    for (let i = 0; i < setCartProduct.length; i++) {
      if (parseInt(setCartProduct[i].item.productId) === parseInt(productId)) {
        // Loop to find id
        checkContainProduct = false; // if id have been not existed in local => set checkContainProduct = true
      }
    }

    if (setCartProduct.length < 1) {
      setCartProduct.push(objectProduct);
      localStorage.setItem(
        "ProductHasBeenAddedToCart",
        JSON.stringify(setCartProduct)
      );
      addSuccess.style.visibility = "visible";
      setTimeout(activeAddSuccess, 2000);
    } else {
      if (checkContainProduct) {
        setCartProduct.push(objectProduct);
        localStorage.setItem(
          "ProductHasBeenAddedToCart",
          JSON.stringify(setCartProduct)
        );
        checkContainProduct = false;
        addSuccess.style.visibility = "visible";
        setTimeout(activeAddSuccess, 2000);
      }
    }

    let totalCartMenu = document.querySelector("#total-cart");
    let totalCartttt = JSON.parse(
      localStorage.getItem("ProductHasBeenAddedToCart")
    );
    totalCartMenu.innerText = `(${totalCartttt.length})`;
  });
}
let totalCartMenu = document.querySelector("#total-cart");
let totalCartttt = JSON.parse(
  localStorage.getItem("ProductHasBeenAddedToCart")
);
if (totalCartttt.length > 0) {
  totalCartMenu.textContent = `(${totalCartttt.length})`;
}

function activeAddSuccess() {
  addSuccess.style.visibility = "hidden";
}
