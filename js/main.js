document.addEventListener("DOMContentLoaded", function () {
  new Splide("#header-slider", {
    perPage: 2,
    autoplay: false,
    arrows: false,
    pagination: false,
    breakpoints: {
      768: {
        type: "loop",
        perPage: 1,
        arrows: true,
        interval: 3000,
        autoplay: true,
      },
    },
  }).mount();

  new Splide("#product-slider", {
    perPage: 4,
    autoplay: false,
    arrows: false,
    pagination: false,
    breakpoints: {
      1440: {
        perPage: 3,
      },
      768: {
        type: "loop",
        perPage: 1.5,
        arrows: true,
        interval: 3000,
        autoplay: true,
      },
    },
  }).mount();
});
