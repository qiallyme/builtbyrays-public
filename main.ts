const y = document.getElementById("y");
if (y) y.textContent = String(new Date().getFullYear());

const btn = document.getElementById("hamburger");
const menu = document.getElementById("menu");
btn?.addEventListener("click", () => {
  const open = menu?.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
});
