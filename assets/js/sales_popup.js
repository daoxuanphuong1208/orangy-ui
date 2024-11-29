document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector(".sales-wrap");
  const overlay = document.querySelector(".orangy-overlay");
  const closeBtn = document.querySelector(".close-btn");
  const HIDE_POPUP_KEY = "hideSalesPopup";

  let userInteracted = false;

  // handle show popup
  function showPopup() {
    if (!localStorage.getItem(HIDE_POPUP_KEY)) {
      popup.style.display = "block";
      overlay.style.display = "block";
    }
  }

  // handle hide popup
  function hidePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
    localStorage.setItem(HIDE_POPUP_KEY, Date.now());
  }

  // check time visibility of popup
  function checkPopupVisibility() {
    const lastHideTime = localStorage.getItem(HIDE_POPUP_KEY);
    if (lastHideTime) {
      const elapsedTime = Date.now() - parseInt(lastHideTime, 10);
      if (elapsedTime >= 4 * 60 * 60 * 1000) {
        localStorage.removeItem(HIDE_POPUP_KEY);
      }
    }
  }

  // handle event of user when access page
  function runFunctionOnInteraction() {
    if (!userInteracted) {
      userInteracted = true;
      setTimeout(showPopup, 3000);
    }
  }

  // event listener
  document.addEventListener("click", runFunctionOnInteraction, {
    once: true,
  });
  document.addEventListener("mousemove", runFunctionOnInteraction, {
    once: true,
  });
  document.addEventListener("scroll", runFunctionOnInteraction, {
    once: true,
  });
  document.addEventListener("keydown", runFunctionOnInteraction, {
    once: true,
  });
  closeBtn.addEventListener("click", hidePopup, { once: true });

  overlay.addEventListener("click", hidePopup, { once: true });

  checkPopupVisibility();
});
