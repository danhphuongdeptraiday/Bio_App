let products = document.querySelector(".products");

let getListProductFromLocalStorage = JSON.parse(
  localStorage.getItem("ProductHasBeenAddedToCart")
);

let t = "";
for (let i = 0; i < getListProductFromLocalStorage.length; i++) {
  console.log(getListProductFromLocalStorage[i]);
  t += `
        <div class="product">
        <img
          src="${getListProductFromLocalStorage[i].item.productImage}"
        />
        <div class="product-info">
          <h3 class="product-name">${getListProductFromLocalStorage[i].item.productName}</h3>
          <h4 class="product-price">${getListProductFromLocalStorage[i].item.productPrice}</h4>
          <p class="pz roduct-quantity">
            Số lượng: ${getListProductFromLocalStorage[i].productQuantity}
          </p>
          <p class="product-remove">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </p>
        </div>
      </div>    
        `;
}

products.innerHTML = t;
