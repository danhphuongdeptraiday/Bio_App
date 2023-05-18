// Send email payment
let paymentForm = document.getElementById("paymentForm");

const productHasBeenAddedToCart = JSON.parse(
  localStorage.getItem("ProductHasBeenAddedToCart")
);
let renderProduct = document.querySelector(".render-product");
let totalPrice = document.querySelectorAll(".payment-due-price");
let s = "";
let total = 0;
for (let j = 0; j < productHasBeenAddedToCart.length; j++) {
  if (productHasBeenAddedToCart[j].item.productId) {
    let t = `
            <tr class="product" data-product-id="1039716021" data-variant-id="1086347790">
            <td class="product-image">
                <div class="product-thumbnail">
                    <div class="product-thumbnail-wrapper">
                        <img class="product-thumbnail-image" alt="13 De Marzo ASTRONAUT TEDDY BEAR PAINTED TEE BLACK" src="${
                          productHasBeenAddedToCart[j].item.productImage
                        }">
                    </div>
                    <span class="product-thumbnail-quantity" aria-hidden="true">${
                      productHasBeenAddedToCart[j].productQuantity
                    }</span>
                </div>
            </td>
            <td class="product-description">
                <span class="product-description-name">
                ${productHasBeenAddedToCart[j].item.productName}
         
                ${
                  !productHasBeenAddedToCart[j].item.sizeOrder &&
                  !productHasBeenAddedToCart[j].item.colorOrder
                    ? ""
                    : `${
                        productHasBeenAddedToCart[j].item.sizeOrder &&
                        productHasBeenAddedToCart[j].item.colorOrder
                          ? `<span class="product-description-variant order-summary-small-text">  ${productHasBeenAddedToCart[j].item.sizeOrder}/${productHasBeenAddedToCart[j].item.colorOrder}</span>`
                          : `${
                              productHasBeenAddedToCart[j].item.sizeOrder
                                ? `<span class="product-description-variant order-summary-small-text">${productHasBeenAddedToCart[j].item.sizeOrder}</span>`
                                : `<span class="product-description-variant order-summary-small-text">${productHasBeenAddedToCart[j].item.colorOrder}</span>`
                            } `
                      }`
                }
                
                        

            </td>
            <td class="product-quantity visually-hidden">1</td>
            <td class="product-price">
                <span class="price">
                ${new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  parseInt(
                    productHasBeenAddedToCart[j].item.productPrice.replace(
                      /\./g,
                      ""
                    )
                  )
                )}
                </span>
            </td>
        </tr>
    `;
    // renderProduct.innerHTML = t;
    s += t;
    total +=
      parseInt(
        productHasBeenAddedToCart[j].item.productPrice.replace(/\./g, "")
      ) * productHasBeenAddedToCart[j].productQuantity;
  }
}

let formatTotal = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
}).format(total);
totalPrice[0].innerText = formatTotal;
totalPrice[1].innerText = formatTotal;
renderProduct.innerHTML = s;

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var fullNameInput = document.getElementById("userName");
  var emailInput = document.getElementById("userEmail");
  var phoneNumberInput = document.getElementById("userNumber");
  var addressInput = document.getElementById("userAddress");

  var fullName = fullNameInput.value;
  var email = emailInput.value;
  var phoneNumber = phoneNumberInput.value;
  var address = addressInput.value;

  // Create an object with the input values
  var formData = {
    userName: fullName,
    userEmail: email,
    userNumber: phoneNumber,
    userAddress: address,
    data_product: JSON.parse(localStorage.getItem("ProductHasBeenAddedToCart")),
    formatTotal: formatTotal,
  };

  fetch("/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        alert("Send successfully");
      } else {
        alert("Send Fail");
      }
    })
    .then((err) => console.error(err));
});
