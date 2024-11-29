document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.querySelector(".cookie-bar");
  const acceptBtn = document.querySelector(".cookie-bar__action-accepted");
  const ignoreBtn = document.querySelector(".cookie-bar__action-ignored");
  const COOKIE_BAR_KEY = "cookieBarAccepted";

  // handle save cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  // handle get cookie
  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith(nameEQ)) {
        return cookies[i].substring(nameEQ.length);
      }
    }
    return null;
  }

  // check visibility cookie
  const cookieAccepted = getCookie(COOKIE_BAR_KEY);
  if (!cookieAccepted) {
    cookieBar.classList.add("active");
  }

  acceptBtn.onclick = function () {
    setCookie(COOKIE_BAR_KEY, "true", 180);
    cookieBar.classList.remove("active");
  };

  ignoreBtn.onclick = function () {
    cookieBar.classList.remove("active");
  };
});
