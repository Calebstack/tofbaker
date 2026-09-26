const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('is-open');
  }
});

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
