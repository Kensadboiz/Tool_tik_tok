const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  localStorage.setItem("menuOpen", !menu.classList.contains("hidden"));
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("menuOpen");
  if (saved === "true") menu.classList.remove("hidden");
});
