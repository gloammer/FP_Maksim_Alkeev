const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhone =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

// Init variables
const form = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  message: document.getElementById("message"),

  submitButton: document.getElementById("submitButton"),
};

let isFirstNameTouched = false;
let isLastNameTouched = false;
let isEmailTouched = false;
let isPhoneTouched = false;
let isMessageTouched = false;

const contactForm = document.getElementById("contactForm");

// Add event listeners
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fieldsWithErrors = validateForm();

  if (fieldsWithErrors.length === 0) {
    const isFormSubmitted = getCookie("formSubmitted");

    if (isFormSubmitted) {
      const userName = getCookie("userName");

      openModal(`${userName}, your application is being processed!`);
    } else {
      const fullName = `${form.firstName.value} ${form.lastName.value}`;

      openModal(`${fullName}, thank you for your appeal!`);

      setCookie("formSubmitted", "true");
      setCookie("userName", fullName);
    }
  } else {
    openModal(
      `Fields: ${fieldsWithErrors.join(",")} contains errors, please check it`
    );
  }
});

for (const key in form) {
  if (form.hasOwnProperty(key)) {
    form[key].addEventListener("input", function () {
      saveFormData();

      form[key].classList.remove("invalid");
      form[key].nextElementSibling.innerText = "";

      updateControlsTouched(key);

      validateForm();
    });
  }
}

window.addEventListener("load", function () {
  loadFormData();

  validateForm();
});

// Functions
function validateForm() {
  const fieldsWithErrors = [];

  if (!form.firstName.value && isFirstNameTouched) {
    fieldsWithErrors.push("first name");
    form.firstName.classList.add("invalid");
    form.firstName.nextElementSibling.innerText =
      "Please enter a valid first name";
  }

  if (!form.lastName.value && isLastNameTouched) {
    fieldsWithErrors.push("last name");
    form.lastName.classList.add("invalid");
    form.lastName.nextElementSibling.innerText =
      "Please enter a valid last name";
  }

  if (!form.email.value.match(regexEmail) && isEmailTouched) {
    fieldsWithErrors.push("email");
    form.email.classList.add("invalid");
    form.email.nextElementSibling.innerText = "Please enter a valid email";
  }

  if (!form.phone.value.match(regexPhone) && isPhoneTouched) {
    fieldsWithErrors.push("phone");
    form.phone.classList.add("invalid");
    form.phone.nextElementSibling.innerText = "Please enter a valid phone";
  }

  if (!form.message.value && isMessageTouched) {
    fieldsWithErrors.push("message");
    form.message.classList.add("invalid");
    form.message.nextElementSibling.innerText = "Please enter a valid message";
  }

  form.submitButton.disabled =
    !form.firstName.value ||
    !form.lastName.value ||
    !form.email.value.match(regexEmail) ||
    !form.phone.value.match(regexPhone) ||
    !form.message.value;

  return fieldsWithErrors;
}

function loadFormData() {
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        form[key].value = storedValue;

        updateControlsTouched(key);
      }
    }
  }
}

function updateControlsTouched(key) {
  if (key === "firstName") {
    isFirstNameTouched = true;
  }

  if (key === "lastName") {
    isLastNameTouched = true;
  }

  if (key === "email") {
    isEmailTouched = true;
  }

  if (key === "phone") {
    isPhoneTouched = true;
  }

  if (key === "message") {
    isMessageTouched = true;
  }
}

function saveFormData() {
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      localStorage.setItem(key, form[key].value);
    }
  }
}

function setCookie(name, value, days = 1) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

function openModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.innerText = message;
  modal.style.display = "flex";

  modal.onclick = function () {
    modal.style.display = "none";
  };
}

