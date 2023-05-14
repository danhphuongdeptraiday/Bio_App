let preventHrefProductsExpired =
  document.querySelectorAll("[status='false'] a");
console.log(preventHrefProductsExpired);
preventHrefProductsExpired.forEach((e) => {
  e.removeAttribute("href");
});
