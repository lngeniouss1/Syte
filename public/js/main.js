const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.slider-dot')];
let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle('is-current', active);
    slide.setAttribute('aria-hidden', String(!active));
    dots[slideIndex]?.classList.toggle('is-current', active);
    dots[slideIndex]?.setAttribute('aria-pressed', String(active));
  });
}

dots.forEach((dot) => dot.addEventListener('click', () => {
  showSlide(Number(dot.dataset.goTo));
}));
document.querySelector('[data-previous]')?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});
document.querySelector('[data-next]')?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});