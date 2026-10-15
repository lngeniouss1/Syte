const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.slider-dot')];
let currentSlide = 0;
let sliderTimer;

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
  const counter = document.querySelector('[data-slide-current]');
  if (counter) counter.textContent = String(currentSlide + 1).padStart(2, '0');
}

function restartSliderTimer() {
  window.clearInterval(sliderTimer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sliderTimer = window.setInterval(() => showSlide(currentSlide + 1), 6500);
  }
}

dots.forEach((dot) => dot.addEventListener('click', () => {
  showSlide(Number(dot.dataset.goTo));
  restartSliderTimer();
}));
document.querySelector('[data-previous]')?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  restartSliderTimer();
});
document.querySelector('[data-next]')?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  restartSliderTimer();
});
restartSliderTimer();

const authDialog = document.querySelector('.auth-dialog');
const authTitle = document.querySelector('#auth-title');
const nameField = document.querySelector('.register-name');
const passwordField = document.querySelector('[name="password"]');
const formFeedback = document.querySelector('.form-feedback');

document.querySelectorAll('[data-auth]').forEach((button) => button.addEventListener('click', () => {
  const isRegister = button.dataset.auth === 'register';
  authTitle.textContent = isRegister ? 'Регистрация' : 'Войти';
  nameField.hidden = !isRegister;
  passwordField.autocomplete = isRegister ? 'new-password' : 'current-password';
  formFeedback.textContent = '';
  authDialog.showModal();
}));

document.querySelector('.dialog-close')?.addEventListener('click', () => authDialog.close());
authDialog?.addEventListener('click', (event) => {
  if (event.target === authDialog) authDialog.close();
});
document.querySelector('.auth-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  formFeedback.textContent = 'Демонстрационная форма: подключите серверную авторизацию, чтобы продолжить.';
});

const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  document.querySelector('.main-nav').classList.toggle('is-open', !isOpen);
});