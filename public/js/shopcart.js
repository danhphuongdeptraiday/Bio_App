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
      <div class="product" id=${
        getListProductFromLocalStorage[i].item.productId
      }>
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
          <span class="product-price">${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            parseInt(
              getListProductFromLocalStorage[i].item.productPrice.replace(
                /\./g,
                ""
              )
            ) * getListProductFromLocalStorage[i].productQuantity
          )}</span>
        
          <p class="colorDetail">
          <b>Color: </b>
          <span>
            ${getListProductFromLocalStorage[i].item.productColor}
          </span>
          </p>
          <p class="sizeDetail">
            <b>Kích cỡ: </b>
            <span>
                ${getListProductFromLocalStorage[i].item}
            </span>
          </p> 
          <p class="pz product-quantity">
            <button class="minus">-</button> 
              <span>${getListProductFromLocalStorage[i].productQuantity}</span>
            <button class="plus">+</button>
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
      let t =
        btnRemove[i].parentElement.querySelector(".product-price").innerText;
      total = total - Number(t.replace(/\./g, ""));
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
      setTotalPriceCart(totalCartBill);
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

  let getMinusBtn = document.getElementsByClassName("minus");
  let getPlusBtn = document.getElementsByClassName("plus");

  // Handle Minus
  for (let i = 0; i < getMinusBtn.length; i++) {
    getMinusBtn[i].addEventListener("click", function () {
      let t = parseInt(getPlusBtn[i].previousElementSibling.innerText);
      if (t > 1) {
        let quantityCount = t - 1;
        getPlusBtn[i].previousElementSibling.innerText = quantityCount;
        let productId =
          getPlusBtn[i].parentElement.parentElement.parentElement.getAttribute(
            "id"
          );
        let productPrice =
          getMinusBtn[i].parentElement.parentElement.querySelector(
            ".product-price"
          );
        // Call Function
        setNewQuantityInCart(parseInt(productId), i, "minus", productPrice);
      }
    });
  }

  // Hand Plus
  for (let i = 0; i < getPlusBtn.length; i++) {
    getPlusBtn[i].addEventListener("click", function () {
      let quantityCount =
        parseInt(getPlusBtn[i].previousElementSibling.innerText) + 1;
      getPlusBtn[i].previousElementSibling.innerText = quantityCount;
      let productId =
        getPlusBtn[i].parentElement.parentElement.parentElement.getAttribute(
          "id"
        );
      let productPrice =
        getPlusBtn[i].parentElement.parentElement.querySelector(
          ".product-price"
        );
      // Call Function
      setNewQuantityInCart(parseInt(productId), i, "plus", productPrice);
    });
  }

  // Set new quantity if click +/- button
  function setNewQuantityInCart(productId, index, typeCount, productPrice) {
    let setCartProduct = JSON.parse(
      localStorage.getItem("ProductHasBeenAddedToCart")
    );
    if (
      setCartProduct[index].item.productId == productId &&
      typeCount === "plus"
    ) {
      setCartProduct[index].productQuantity += 1;
      productPrice.innerText = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(
        parseInt(setCartProduct[index].item.productPrice.replace(/\./g, "")) *
          setCartProduct[index].productQuantity
      );
      localStorage.setItem(
        "ProductHasBeenAddedToCart",
        JSON.stringify(setCartProduct)
      );
      setTotalPriceCart(totalCartBill);
    } else if (
      setCartProduct[index].item.productId == productId &&
      typeCount === "minus"
    ) {
      setCartProduct[index].productQuantity -= 1;
      localStorage.setItem(
        "ProductHasBeenAddedToCart",
        JSON.stringify(setCartProduct)
      );
      productPrice.innerText = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(
        parseInt(setCartProduct[index].item.productPrice.replace(/\./g, "")) *
          setCartProduct[index].productQuantity
      );
      setTotalPriceCart(totalCartBill);
    }
  }

  // setTotalCart if user click +/- btn
  function setTotalPriceCart(totalCartBill) {
    let getCartProduct = JSON.parse(
      localStorage.getItem("ProductHasBeenAddedToCart")
    );
    let tempTotal = 0;
    for (let i = 0; i < getCartProduct.length; i++) {
      tempTotal +=
        parseInt(getCartProduct[i].item.productPrice.replace(/\./g, "")) *
        getCartProduct[i].productQuantity;
    }
    totalCartBill.innerText = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(tempTotal);
  }
}
