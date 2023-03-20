// $(document).ready(function () {
//   $("#formData").submit(function (e) {
//     e.preventDefault(); // prevent default form submit behavior
//     const formData = $(this).serialize(); // serialize form data
//     $.ajax({
//       url: "/home",
//       type: "POST",
//       data: formData,
//       success: function (response) {
//         $(`#${formData.productCategory}`).html(response);
//       },
//     });
//   });
// });

let bgShadow = document.querySelector(".backgroundShadow");
let openAddProduct = document.querySelector("#openAddProduct");
let addProduct = document.querySelector(".addProduct");
let formData = document.getElementById("formData");
let formLogin = document.querySelector(".adminForm form");

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

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  const form = {
    username: username,
    password: password,
  };
  console.log(form);
  fetch("/home", {
    method: "POST",
    body: form,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then((err) => console.log(err));
});

formData.addEventListener("submit", function () {
  const form = new FormData(formData);
  form.typeOfMethod = "form for products";
  fetch("/home", {
    method: "POST",
    body: form,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then((err) => console.log(err));
});
