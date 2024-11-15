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
        padding: { left: "15px" },
      },

      1024: {
        perPage: 2.5,
      },
      768: {
        type: "loop",
        perPage: 1.5,
      },
    },
  }).mount();

  document
    .querySelectorAll(".product-grid-tabs__top-list-item")
    .forEach((tab) => {
      tab.addEventListener("click", function () {
        document
          .querySelectorAll(".product-grid-tabs__top-list-item")
          .forEach((item) => {
            item.classList.remove("active");
          });
        document
          .querySelectorAll(".product-grid-tabs__bottom-list")
          .forEach((content) => {
            content.classList.remove("active");
          });

        this.classList.add("active");
        const tabContent = document.querySelector(
          `.product-grid-tabs__bottom-list.${this.dataset.tab}`
        );
        if (tabContent) {
          tabContent.classList.add("active");
        }
      });
    });
});
