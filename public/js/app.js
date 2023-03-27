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
// let bgShadow = document.querySelector(".backgroundShadow");

// bgShadow.style.display = "none";
// addProduct.style.display = "none";
// openAddProduct.addEventListener("click", () => {
//   if (bgShadow.style.display == "none" && addProduct.style.display == "none") {
//     bgShadow.style.display = "block";
//     addProduct.style.display = "block";
//   } else {
//     bgShadow.style.display = "none";
//     addProduct.style.display = "none";
//   }
// });

// bgShadow.addEventListener("click", () => {
//   if (bgShadow.style.display == "none" && addProduct.style.display == "none") {
//     bgShadow.style.display = "block";
//     addProduct.style.display = "block";
//   } else {
//     bgShadow.style.display = "none";
//     addProduct.style.display = "none";
//   }
// });

// formData.addEventListener("submit", function () {
//   const form = new FormData(formData);
//   fetch("/home", {
//     method: "POST",
//     body: form,
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .then((err) => console.log(err));
// });
