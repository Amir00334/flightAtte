const toggleBtn = document.getElementById('navToggle');
const toggleIcon = document.getElementById('toggleIcon');
const navbar = document.getElementById('navbar');

function setMenu(open) {
  if (!navbar || !toggleBtn || !toggleIcon) return;
  navbar.classList.toggle('is-open', open);
  toggleBtn.setAttribute('aria-expanded', String(open));
  toggleBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  toggleIcon.classList.toggle('ri-menu-line', !open);
  toggleIcon.classList.toggle('ri-close-line', open);
}

if (toggleBtn && navbar) {
  toggleBtn.addEventListener('click', () => setMenu(!navbar.classList.contains('is-open')));
  navbar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (event.target instanceof Node && !navbar.contains(event.target) && !toggleBtn.contains(event.target)) setMenu(false);
  });
  window.matchMedia('(max-width: 860px)').addEventListener('change', () => setMenu(false));
}

const cards = Array.from(document.querySelectorAll('.journey__card'));
function closeCards(except) {
  cards.forEach(card => { if (card !== except) card.classList.remove('is-open'); });
}
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!window.matchMedia('(hover: none)').matches) return;
    const open = !card.classList.contains('is-open');
    closeCards(card);
    card.classList.toggle('is-open', open);
  });
});
document.addEventListener('click', event => {
  if (event.target instanceof Element && !event.target.closest('.journey__card')) closeCards();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setMenu(false);
    closeCards();
    if (document.activeElement instanceof HTMLElement && document.activeElement.matches('.journey__card')) document.activeElement.blur();
  }
});

// Swiper owns dragging; animate its outer container, never its moving slides.
if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
  new Swiper('.swiper', {
    slidesPerView: 1, spaceBetween: 20, grabCursor: true,
    breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    a11y: { enabled: true }, keyboard: { enabled: true, onlyInViewport: true }
  });
}
