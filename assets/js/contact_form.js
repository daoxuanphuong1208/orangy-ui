document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form__form");
  const popup = document.querySelector(".notification-wrap");
  const closeBtn = document.querySelector(".notification-popup .close-btn");

  const showPopup = (message) => {
    popup.querySelector("h1").innerHTML = message;
    popup.style.display = "block";
  };

  const hidePopup = () => {
    popup.style.display = "none";
  };

  const autofillData = () => {
    const savedData = JSON.parse(localStorage.getItem("contactFormData"));
    if (savedData) {
      document.querySelector("#contact-form-name").value = savedData.name || "";
      document.querySelector("#contact-form-email").value =
        savedData.email || "";
      document.querySelector("#contact-form-phone").value =
        savedData.phone || "";
      document.querySelector("#contact-form-address").value =
        savedData.address || "";
    }
  };

  closeBtn.addEventListener("click", hidePopup);
  autofillData();

  // handle validate field
  const validateField = (field, pattern, errorMessageId) => {
    const value = field.value.trim();
    const errorMessage = document.querySelector(`#${errorMessageId}`);
    const label = field.previousElementSibling;

    if (!value) {
      errorMessage.textContent = `${label.textContent} is required.`;
      label.style.color = "red";
      errorMessage.style.color = "red";
      field.style.borderColor = "red";
      return false;
    }

    if (pattern && !pattern.test(value)) {
      errorMessage.textContent = `The format of ${label.textContent} is invalid.`;
      label.style.color = "red";
      errorMessage.style.color = "red";
      field.style.borderColor = "red";
      return false;
    }

    errorMessage.textContent = "";
    label.style.color = "";
    errorMessage.style.color = "";
    field.style.borderColor = "";
    return true;
  };

  const handleBlur = (e) => {
    const field = e.target;
    const id = field.id;

    if (id === "contact-form-name") {
      validateField(field, null, "name-error");
    } else if (id === "contact-form-email") {
      validateField(field, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email-error");
    } else if (id === "contact-form-phone") {
      validateField(field, /^\d{10}$/, "phone-error");
    }
  };

  const handleInput = (e) => {
    const field = e.target;
    const id = field.id;

    if (id === "contact-form-name") {
      validateField(field, null, "name-error");
    } else if (id === "contact-form-email") {
      validateField(field, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email-error");
    } else if (id === "contact-form-phone") {
      validateField(field, /^\d{10}$/, "phone-error");
    }
  };

  // eventlistener
  document
    .querySelector("#contact-form-name")
    .addEventListener("blur", handleBlur);
  document
    .querySelector("#contact-form-email")
    .addEventListener("blur", handleBlur);
  document
    .querySelector("#contact-form-phone")
    .addEventListener("blur", handleBlur);

  document
    .querySelector("#contact-form-name")
    .addEventListener("input", handleInput);
  document
    .querySelector("#contact-form-email")
    .addEventListener("input", handleInput);
  document
    .querySelector("#contact-form-phone")
    .addEventListener("input", handleInput);

  // form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameField = document.querySelector("#contact-form-name");
    const emailField = document.querySelector("#contact-form-email");
    const phoneField = document.querySelector("#contact-form-phone");
    const addressField = document.querySelector("#contact-form-address");
    const messageField = document.querySelector("#contact-form-message");

    const isNameValid = validateField(nameField, null, "name-error");
    const isEmailValid = validateField(
      emailField,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "email-error"
    );
    const isPhoneValid = validateField(phoneField, /^\d{10}$/, "phone-error");

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      return;
    }

    const captcha = document.querySelector(".g-recaptcha");
    captcha.style.display = "block";

    const recaptchaResponse = grecaptcha.getResponse();
    const recaptchaErrorMessage = document.querySelector("#recaptcha-error");
    if (!recaptchaResponse) {
      recaptchaErrorMessage.textContent = "Please confirm the CAPTCHA.";
      recaptchaErrorMessage.style.color = "red";
      return;
    } else {
      recaptchaErrorMessage.textContent = "";
      captcha.style.display = "none";
    }

    const formData = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      phone: phoneField.value.trim(),
      address: addressField.value.trim(),
    };

    localStorage.setItem("contactFormData", JSON.stringify(formData));

    // fetch
    const body = JSON.stringify({
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      phone: phoneField.value.trim(),
      address: addressField.value.trim(),
      message: messageField.value.trim(),
      "g-recaptcha-response": recaptchaResponse,
    });

    fetch("https://testapi.demo.wgentech.com/notify.php", {
      method: "POST",
      body,
      keepalive: true,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        showPopup("Thank you! <br />Data has been sent successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        showPopup(
          "Oops! An error occurred. <br/>Please check your information and try again."
        );
      });
  });
});
