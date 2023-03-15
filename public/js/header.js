let listLi = document.querySelectorAll(".menu-items li");
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
