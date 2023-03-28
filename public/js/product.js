// Create a new Swiper instance
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
console.log(arrayColor);
let addToCartBtn = document.querySelector("#addToCart");
let productColor = "";
for (let i = 0; i < arrayColor.length; i++) {
  productColor += arrayColor[i].innerText;
}
let productImage = document.querySelector(".swiper-slide img").src;
let objectProduct = {
  productId: Number(productPage_container.getAttribute("id")),
  productName: productName.innerText,
  productPrice: productPrice.innerText,
  productColor: productColor,
  productImage: productImage,
};

let getCartProduct = JSON.parse(
  localStorage.getItem("ProductHasBeenAddedToCart")
);
if (getCartProduct == null) {
  localStorage.setItem("ProductHasBeenAddedToCart", JSON.stringify([]));
  window.location.reload();
  console.log(getCartProduct);
} else {
  addToCartBtn.addEventListener("click", () => {
    let setCartProduct = JSON.parse(
      localStorage.getItem("ProductHasBeenAddedToCart")
    );
    setCartProduct.push(objectProduct);
    localStorage.setItem(
      "ProductHasBeenAddedToCart",
      JSON.stringify(setCartProduct)
    );
    console.log("Hello");
    console.log(objectProduct);
  });
}
