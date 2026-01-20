const button = document.getElementById("loveButton");
const message = document.getElementById("secretMessage");

button.addEventListener("click", function () {
  message.classList.toggle("hidden");
  button.textContent = "I Love You ❤️";
});
