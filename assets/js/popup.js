document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector(".sales-wrap");
  const overlay = document.querySelector(".orangy-overlay");
  const closeBtn = document.querySelector(".close-btn");
  const HIDE_POPUP_KEY = "hidePopup";

  let mouseOrTouchDetected = false;

  function showPopup() {
    if (!localStorage.getItem(HIDE_POPUP_KEY)) {
      popup.style.display = "block";
      overlay.style.display = "block";
    }
  }

  function hidePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
    localStorage.setItem(HIDE_POPUP_KEY, Date.now());
  }

  function checkPopupVisibility() {
    const lastHideTime = localStorage.getItem(HIDE_POPUP_KEY);
    if (lastHideTime) {
      const elapsedTime = Date.now() - parseInt(lastHideTime, 10);
      if (elapsedTime >= 4 * 60 * 60 * 1000) {
        localStorage.removeItem(HIDE_POPUP_KEY);
      }
    }
  }

  function detectMouseOrTouch() {
    if (!mouseOrTouchDetected) {
      mouseOrTouchDetected = true;
      setTimeout(showPopup, 3000);
    }
  }

  document.addEventListener("mousemove", detectMouseOrTouch, { once: true });
  document.addEventListener("touchstart", detectMouseOrTouch, { once: true });

  closeBtn.addEventListener("click", hidePopup);
  overlay.addEventListener("click", hidePopup);

  checkPopupVisibility();
});
