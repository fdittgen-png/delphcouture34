/* ================================================================
   DELPH COUTURE 34 — interactions
   Nav state · mobile menu · scroll reveal · lightbox ·
   avant/après slider · contact form (mailto)
   ================================================================ */

/* ---------------------------------------------------------------
   NAVBAR — gains a backdrop once past the hero text
   --------------------------------------------------------------- */

const navbar = document.getElementById('navbar');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* Scrollspy — highlight the nav link of the section in view */
const navLinks = document.querySelectorAll('.nav-link');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-35% 0px -60% 0px' });

['realisations', 'couture', 'confection', 'methode', 'contact', 'accueil'].forEach(id => {
  const el = document.getElementById(id);
  if (el) spyObserver.observe(el);
});


/* ---------------------------------------------------------------
   MOBILE MENU
   --------------------------------------------------------------- */

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

function setMenu(open) {
  menuOpen = open;
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuToggle.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    mobileMenu.querySelector('a').focus();
  } else {
    menuToggle.focus();
  }
}

menuToggle.addEventListener('click', () => setMenu(!menuOpen));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

/* the menu only exists below lg (1024px) — close it if the viewport grows */
window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
  if (e.matches && menuOpen) setMenu(false);
});


/* ---------------------------------------------------------------
   SCROLL REVEAL
   --------------------------------------------------------------- */

const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));


/* ---------------------------------------------------------------
   LIGHTBOX
   --------------------------------------------------------------- */

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentIndex = -1;

function showImage(index) {
  const item = galleryItems[index];
  const img = item && item.querySelector('img');
  if (!img) return;
  currentIndex = index;
  lightboxImg.style.opacity = '0';
  lightboxImg.onload = () => { lightboxImg.style.opacity = '1'; };
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  const caption = item.querySelector('.gallery-caption');
  lightboxCaption.textContent = caption ? caption.childNodes[0].textContent.trim() : '';
  lightboxCounter.textContent = (index + 1) + ' / ' + galleryItems.length;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  currentIndex = -1;
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  if (currentIndex === -1) return;
  showImage((currentIndex + direction + galleryItems.length) % galleryItems.length);
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
document.getElementById('lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    if (menuOpen) setMenu(false);
  }
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});


/* ---------------------------------------------------------------
   QUICK CHANGE — costume switcher
   --------------------------------------------------------------- */

const qcCard = document.getElementById('qc-card');

if (qcCard) {
  const qcLayers = qcCard.querySelectorAll('.qc-layer');
  const qcBtns = document.querySelectorAll('.qc-btn');
  let qcIndex = 0;

  function setCostume(i) {
    qcIndex = i;
    qcLayers.forEach((layer, j) => layer.classList.toggle('qc-active', j === i));
    qcBtns.forEach((btn, j) => {
      btn.classList.toggle('active', j === i);
      btn.setAttribute('aria-pressed', String(j === i));
    });
  }

  qcCard.addEventListener('click', () => setCostume(1 - qcIndex));
  qcCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCostume(1 - qcIndex);
    }
  });
  qcBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setCostume(Number(btn.dataset.qc));
  }));
}


/* ---------------------------------------------------------------
   AVANT / APRÈS SLIDER
   --------------------------------------------------------------- */

const baSlider = document.getElementById('ba-slider');

if (baSlider) {
  const handle = baSlider.querySelector('.ba-handle');
  let dragging = false;

  /* nudge the handle once when the slider first becomes visible */
  const hintObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        baSlider.classList.add('hint');
        hintObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  hintObserver.observe(baSlider);

  function setPosition(clientX) {
    const rect = baSlider.getBoundingClientRect();
    const pct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    baSlider.style.setProperty('--ba', pct + '%');
    handle.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  baSlider.addEventListener('pointerdown', (e) => {
    dragging = true;
    baSlider.setPointerCapture(e.pointerId);
    setPosition(e.clientX);
  });
  baSlider.addEventListener('pointermove', (e) => {
    if (dragging) setPosition(e.clientX);
  });
  baSlider.addEventListener('pointerup', () => { dragging = false; });
  baSlider.addEventListener('pointercancel', () => { dragging = false; });

  handle.addEventListener('keydown', (e) => {
    const current = parseFloat(getComputedStyle(baSlider).getPropertyValue('--ba')) || 50;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = current + (e.key === 'ArrowLeft' ? -5 : 5);
      const pct = Math.min(96, Math.max(4, next));
      baSlider.style.setProperty('--ba', pct + '%');
      handle.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
  });
}


/* ---------------------------------------------------------------
   CONTACT FORM — opens the visitor's mail client
   --------------------------------------------------------------- */

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const service = contactForm.querySelector('#service').value;
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Merci de remplir votre nom, votre email et votre message.';
      return;
    }

    const subject = encodeURIComponent(`Demande — ${service || 'renseignement'} — ${name}`);
    const body = encodeURIComponent(
      `Bonjour Delphine,\n\n${message}\n\n---\nNom : ${name}\nEmail : ${email}\nProjet : ${service || 'Non précisé'}`
    );

    formStatus.textContent = 'Ouverture de votre messagerie… Si rien ne se passe, écrivez à roger.delphe1@orange.fr';
    window.location.href = `mailto:roger.delphe1@orange.fr?subject=${subject}&body=${body}`;
  });
}
