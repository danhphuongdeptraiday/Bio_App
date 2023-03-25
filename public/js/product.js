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
