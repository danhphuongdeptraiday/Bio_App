let listLi = document.querySelectorAll(".menu-items li");
let logoutPopup = document.querySelector(".logoutPopup");
let changeLoginToLogout = document.querySelector(".menu-items li:last-child");
let aElement = document.querySelector(".menu-items li:last-child a");
let confirmBtn = document.querySelector(".confirm");
let cancelBtn = document.querySelector(".cancel");
let bgShadow = document.querySelector(".backgroundShadow");
let openAddProduct = document.querySelector("#openAddProduct");
let addProduct = document.querySelector(".addProduct");
let formData = document.getElementById("formData");
let hamburgerChecked = document.querySelector(
  '.navbar-container input[type="checkbox"]'
);

for (let i = 0; i < listLi.length; i++) {
  listLi[i].addEventListener("click", function () {
    console.log("Hello");
    if (hamburgerChecked.checked == true) {
      hamburgerChecked.checked = false;
    }
  });
}

// ///////////////////////////
let getStatusLogin = localStorage.getItem("status");
if (getStatusLogin != null && getStatusLogin == "true") {
  handleLogout();
  handleOpenAddProduct();
}

// Handle Open Logout popup
logoutPopup.style.visibility = "hidden";
function handleLogout() {
  aElement.style.backgroundColor = "yellow";
  aElement.innerText = "Logout";
  aElement.removeAttribute("href");
  changeLoginToLogout.addEventListener("click", () => {
    if (logoutPopup.style.visibility == "hidden") {
      logoutPopup.style.visibility = "visible";
      // addProduct.style.display = "none";
    } else {
      logoutPopup.style.visibility = "hidden";
    }
  });

  bgShadow.addEventListener("click", () => {
    if (
      bgShadow.style.display == "none" &&
      logoutPopup.style.visibility == "hidden"
    ) {
      bgShadow.style.display = "block";
      logoutPopup.style.visibility = "visible";
    } else {
      bgShadow.style.display = "none";
      logoutPopup.style.visibility = "hidden";
    }
  });

  confirmBtn.addEventListener("click", () => {
    localStorage.removeItem("status");
    window.location.reload();
  });

  cancelBtn.addEventListener("click", () => {
    if (logoutPopup.style.visibility == "hidden") {
      logoutPopup.style.visibility = "visible";
      bgShadow.style.display = "block";
    } else {
      logoutPopup.style.visibility = "hidden";
      bgShadow.style.display = "none";
      addProduct.style.display = "none";
    }
  });
}

// Handle Open add product popup

function handleOpenAddProduct() {
  bgShadow.style.display = "none";
  addProduct.style.display = "none";
  openAddProduct.addEventListener("click", () => {
    if (
      bgShadow.style.display == "none" &&
      addProduct.style.display == "none"
    ) {
      bgShadow.style.display = "block";
      addProduct.style.display = "block";
    } else {
      bgShadow.style.display = "none";
      addProduct.style.display = "none";
    }
  });

  bgShadow.addEventListener("click", () => {
    if (
      bgShadow.style.display == "none" &&
      addProduct.style.display == "none"
    ) {
      bgShadow.style.display = "block";
      addProduct.style.display = "block";
    } else {
      bgShadow.style.display = "none";
      addProduct.style.display = "none";
    }
  });
}

function setBackgroundShadow(x) {
  bgShadow.style.display = x;
}

var x = window.matchMedia("(max-width: 768px)");
function handleResponsive(x) {}
