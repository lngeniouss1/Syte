const slides = [...document.querySelectorAll('.slide')];
let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle('is-current', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
}

document.querySelector('[data-previous]')?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});
document.querySelector('[data-next]')?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});