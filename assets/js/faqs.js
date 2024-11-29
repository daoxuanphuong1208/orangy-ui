document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faqs__list-item");

  // Active first item when load page
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active");
    const firstContent = faqItems[0].querySelector(".faqs__list-item-content");
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }
    const firstIcon = faqItems[0].querySelector("img");
    if (firstIcon) {
      firstIcon.src = "./assets/images/faqs/svg/minus.svg";
    }
  }

  // Handle click item
  faqItems.forEach((item) => {
    const header = item.querySelector(".faqs__list-item-header");
    const content = item.querySelector(".faqs__list-item-content");
    const icon = item.querySelector("img");

    if (header) {
      header.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherContent = otherItem.querySelector(
              ".faqs__list-item-content"
            );
            const otherIcon = otherItem.querySelector("img");
            if (otherContent) otherContent.style.maxHeight = 0;
            if (otherIcon) otherIcon.src = "./assets/images/faqs/svg/add.svg";
          }
        });

        item.classList.toggle("active");
        const isActive = item.classList.contains("active");

        if (content) {
          content.style.maxHeight = isActive ? content.scrollHeight + "px" : 0;
        }

        if (icon) {
          icon.src = isActive
            ? "./assets/images/faqs/svg/minus.svg"
            : "./assets/images/faqs/svg/add.svg";
        }
      });
    }
  });
});
