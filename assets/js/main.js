document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
  new Splide("#header-slider", {
    type: "slide",
    perPage: 2,
    autoplay: false,
    arrows: false,
    pagination: false,
    breakpoints: {
      768: {
        perPage: 1,
        arrows: true,
        interval: 3000,
        autoplay: true,
      },
    },
  }).mount();

  new Splide("#product-slider", {
    type: "slide",
    perPage: 4,
    autoplay: false,
    arrows: false,
    pagination: false,
    breakpoints: {
      1440: {
        perPage: 3,
      },

      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
  }).mount();
});
