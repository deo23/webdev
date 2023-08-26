// script.js

const emailInput = document.getElementById("email");

emailInput.addEventListener("input", function () {
  if (!emailInput.value.includes("@")) {
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }
});
