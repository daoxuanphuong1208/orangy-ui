document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector(
    ".footer__input input[type='email']"
  );
  const popup = document.querySelector(".notification-wrap");
  const submitButton = document.querySelector(".footer__input button");

  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec";

  const showPopup = (message) => {
    popup.querySelector("h1").innerHTML = message;
    popup.style.display = "block";
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = async (email) => {
    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });

      const result = await response.json();
      console.log(result);

      if (result.result === "success") {
        showPopup("Thank you! <br />Data has been sent successfully.");
      } else {
        showPopup(
          "Oops! An error occurred. <br/>Please check your information and try again."
        );
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      alert("Invalid email format. Please check and try again.");
      return;
    }

    sendEmail(email);
    emailInput.value = "";
  };

  submitButton.addEventListener("click", handleSubmit);
  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit(e);
  });
});
