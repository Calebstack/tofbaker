const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  siteNav.classList.toggle('is-open', isOpen);
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenuOpen(false);
  }
});

document.addEventListener('click', (event) => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const siteHeader = document.querySelector('.site-header');
const updateHeader = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.story-visual, .story-copy, .menu-group, .gallery-item, .closing-copy, .closing-photo').forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    revealObserver.observe(element);
  });
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const marqueeTrack = document.querySelector('.marquee-track');
const marqueeTemplate = marqueeTrack.querySelector('.marquee-group').cloneNode(true);

function fillMarquee() {
  const firstRun = document.createElement('div');
  firstRun.className = 'marquee-run';
  marqueeTrack.replaceChildren(firstRun);

  while (firstRun.scrollWidth <= window.innerWidth) {
    firstRun.appendChild(marqueeTemplate.cloneNode(true));
  }

  marqueeTrack.appendChild(firstRun.cloneNode(true));
  marqueeTrack.style.setProperty('--marquee-duration', `${Math.max(18, firstRun.scrollWidth / 42)}s`);
}

fillMarquee();

let marqueeResizeFrame;
window.addEventListener('resize', () => {
  cancelAnimationFrame(marqueeResizeFrame);
  marqueeResizeFrame = requestAnimationFrame(fillMarquee);
});
