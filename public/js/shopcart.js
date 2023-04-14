window.addEventListener("load", init);

function init() {
  let products = document.querySelector(".products");
  let getListProductFromLocalStorage = JSON.parse(
    localStorage.getItem("ProductHasBeenAddedToCart")
  );

  let t = "";
  let total = 0;
  for (let i = 0; i < getListProductFromLocalStorage.length; i++) {
    t += `
      <div class="product">
        <img
          src="${getListProductFromLocalStorage[i].item.productImage}"
        />
        <div class="product-info">
          <a class="linkReturnPage" href="${
            getListProductFromLocalStorage[i].item.linkSingleProductPage
          }">
            <h3 class="product-name">${getListProductFromLocalStorage[
              i
            ].item.productName.toUpperCase()}</h3>
          </a>
          <span class="product-price">${
            getListProductFromLocalStorage[i].item.productPrice
          }</span>
        
          <p class="colorDetail">
          <b>Color: </b>
          <span>
            ${getListProductFromLocalStorage[i].item.productColor}
          </span>
          </p> 
          <p class="pz product-quantity">
            <button onclick="minusQuantity(element)" id="minus">-</button> 
              <span>
              ${getListProductFromLocalStorage[i].productQuantity}
              </span>
            <button onclick="plusQuantity()" id="plus">+</button>
          </p>
          <div class="product-remove">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>    
        `;
    total +=
      parseInt(
        getListProductFromLocalStorage[i].item.productPrice.replace(/\./g, "")
      ) * getListProductFromLocalStorage[i].productQuantity;
  }

  products.innerHTML = t;

  let totalCartBill = document.querySelector(".cart-total p span:last-child");

  totalCartBill.innerText = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);

  // Handle remove product in cart page
  let btnRemove = document.querySelectorAll(".product-remove");
  let listProducts = document.getElementsByClassName("product");

  let arrayIndex = [];
  for (let i = 0; i < listProducts.length; i++) {
    arrayIndex.push(i);
    let newBtn = listProducts[i].querySelector(".product-remove");
    newBtn.addEventListener("click", () => {
      let t = btnRemove[i].parentElement.querySelector(".product-price");
      let q = t.innerText;
      total = total - Number(q.replace(/\./g, ""));
      totalCartBill.innerText = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(total);
      console.log("index vừa bấm là: " + i);
      for (let j = 0; j < getListProductFromLocalStorage.length; j++) {
        if (i == arrayIndex[j]) {
          resetTotalCart(arrayIndex);
          arrayIndex.splice(j, 1);
          getListProductFromLocalStorage.splice(j, 1);
          localStorage.setItem(
            "ProductHasBeenAddedToCart",
            JSON.stringify(getListProductFromLocalStorage)
          );
        }
      }

      newBtn.parentElement.parentElement.remove();
    });
  }

  // Reset total cart on header if product in cart page is removed
  function resetTotalCart(listCart) {
    let totalCartMenu = document.querySelector("#total-cart");
    console.log(listCart.length);
    if (listCart.length >= 0) {
      totalCartMenu.textContent = `(${listCart.length - 1})`;
    }
  }
}
function plusQuantity() {
  console.log(this);
  // console.log(element);
  // let t = element.previousElementSibling;
  // console.log(t);
}
