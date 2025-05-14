const nav = document.querySelector("nav");
const menu = document.getElementById("menu");
const ecoSvg = document.getElementById("eco-svg");
const eco2Svg = document.getElementById("eco2-svg");
const recycleSvg = document.getElementById("recycle-svg");
const heroContent = document.getElementsByClassName("hero-content-text");
const mmCloseBtn = document.getElementById("close-mobile-menu-btn");
const mmBtn = document.getElementById("menu-btn");

mmCloseBtn.onclick = () => {
  document.getElementById("mobile-menu").classList.toggle("active", false);
};

mmBtn.onclick = () => {
  document.getElementById("mobile-menu").classList.toggle("active", true);
};

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  ecoSvg.style.top = `${window.innerHeight * 0.2 + value * 0.4}px`;
  eco2Svg.style.top = `${window.innerHeight * 0.4 + value * 0.5}px`;
  recycleSvg.style.top = `${window.innerHeight * 0.5 + value * 0.7}px`;
  for (let i = 0; i < 2; i++) {
    heroContent[i].style.top = `${value * 0.3}px`;
  }
});
