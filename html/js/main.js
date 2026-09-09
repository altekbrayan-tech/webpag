// JS compartido de Clouddec: menú móvil, scroll-reveal, acordeón FAQ y
// envío de formularios a la API real (reemplaza el antiguo webhook de
// Google Apps Script). Sin build step: se referencia directo con <script>.

(function mobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    if (!icon) return;
    const isOpen = mobileMenu.classList.contains('active');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
  });
})();

(function faqAccordion() {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');
      item.parentElement.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
})();

/**
 * Carrusel de testimonios: una tarjeta visible a la vez, sin autoplay.
 * Navegación manual (botones prev/next, focusables por teclado por defecto)
 * más puntos indicadores; no requiere pausa porque no hay rotación automática.
 */
(function testimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;
  const slides = track.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  const dotsContainer = document.querySelector('.carousel-dots');
  if (!slides.length) return;

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;
  }

  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir al testimonio ${i + 1} de ${slides.length}`);
      dot.addEventListener('click', () => { index = i; update(); });
      dotsContainer.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { index = Math.min(slides.length - 1, index + 1); update(); });

  update();
})();

(function scrollReveal() {
  const targets = document.querySelectorAll('.card, .faq-item, .testimonial-card, .glass-panel');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/**
 * Envía un <form> como JSON a un endpoint de la API y alterna entre el
 * formulario y un panel de éxito/error. Sustituye el antiguo patrón de
 * fetch(scriptUrl, { mode: 'no-cors' }) que nunca reportaba fallos reales.
 */
function submitFormTo(endpoint, formId, submitBtnId, successId, errorId, defaultBtnLabel) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btn = document.getElementById(submitBtnId);
    const errorEl = document.getElementById(errorId);
    const successEl = document.getElementById(successId);

    btn.disabled = true;
    const originalLabel = btn.innerText;
    btn.innerText = 'Enviando...';
    if (errorEl) errorEl.style.display = 'none';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'No se pudo procesar la solicitud.');
      }

      form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = err.message || 'Hubo un error al enviar el formulario. Inténtalo más tarde.';
        errorEl.style.display = 'block';
      }
      btn.disabled = false;
      btn.innerText = defaultBtnLabel || originalLabel;
    }
  });
}

function resetForm(formId, submitBtnId, successId, defaultBtnLabel) {
  const form = document.getElementById(formId);
  const btn = document.getElementById(submitBtnId);
  const successEl = document.getElementById(successId);

  form.reset();
  form.style.display = 'block';
  if (successEl) successEl.style.display = 'none';
  btn.disabled = false;
  btn.innerText = defaultBtnLabel;
}
