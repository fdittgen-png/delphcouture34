/* ============================================ */
/* LENIS SMOOTH SCROLL                          */
/* ============================================ */

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


/* ============================================ */
/* NAVBAR SCROLL BEHAVIOR                       */
/* ============================================ */

const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('accueil');

function updateNavbar() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom - 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();


/* ============================================ */
/* MOBILE MENU — Full-screen dark overlay       */
/* ============================================ */

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.remove('pointer-events-none');
    mobileMenu.classList.add('mobile-menu-open');
    void mobileMenu.offsetHeight;
    mobileMenu.style.opacity = '1';
    menuToggle.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    lenis.stop();
  } else {
    closeMenu();
  }
});

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('mobile-menu-open');
  mobileMenu.style.opacity = '0';
  menuToggle.classList.remove('menu-open');
  document.body.style.overflow = '';
  lenis.start();
  setTimeout(() => {
    if (!menuOpen) mobileMenu.classList.add('pointer-events-none');
  }, 500);
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ============================================ */
/* SCROLL REVEAL                                */
/* ============================================ */

const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ============================================ */
/* GALLERY — Click delegation, keyboard, lightbox */
/* ============================================ */

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentLightboxIndex = -1;

function openLightbox(index) {
  const item = galleryItems[index];
  if (!item) return;
  const img = item.querySelector('img');
  if (!img || !img.src) return;

  currentLightboxIndex = index;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lenis.stop();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  currentLightboxIndex = -1;
  document.body.style.overflow = '';
  lenis.start();
}

function navigateLightbox(direction) {
  if (currentLightboxIndex === -1) return;
  const count = galleryItems.length;
  currentLightboxIndex = (currentLightboxIndex + direction + count) % count;
  const img = galleryItems[currentLightboxIndex].querySelector('img');
  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
}

// Attach click + keyboard handlers to each gallery item
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });
});

// Lightbox controls
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
const lightboxClose = document.getElementById('lightbox-close');
if (lightboxClose) lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });

// Keyboard nav
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    if (menuOpen) closeMenu();
  }
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});


/* ============================================ */
/* GALLERY CUSTOM CURSOR                        */
/* ============================================ */

const galleryCursor = document.getElementById('gallery-cursor');
if (galleryCursor && window.matchMedia('(pointer: fine)').matches) {
  let cursorActive = false;
  document.addEventListener('mousemove', (e) => {
    if (cursorActive) {
      galleryCursor.style.left = e.clientX - 36 + 'px';
      galleryCursor.style.top = e.clientY - 36 + 'px';
    }
  });
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursorActive = true;
      galleryCursor.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      cursorActive = false;
      galleryCursor.classList.remove('active');
    });
  });
}


/* ============================================ */
/* CONTACT FORM — with feedback                 */
/* ============================================ */

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
      if (formStatus) {
        formStatus.textContent = 'Merci de remplir tous les champs obligatoires.';
        formStatus.className = 'mt-4 text-sm text-gold';
      }
      return;
    }

    const subject = encodeURIComponent(`Demande de ${service || 'renseignement'} — ${name}`);
    const body = encodeURIComponent(
      `Bonjour Delphine,\n\n${message}\n\n---\nNom : ${name}\nEmail : ${email}\nService : ${service || 'Non précisé'}`
    );

    if (formStatus) {
      formStatus.textContent = 'Ouverture de votre messagerie… Si rien ne se passe, écrivez directement à roger.delphe1@orange.fr';
      formStatus.className = 'mt-4 text-sm text-gold-light';
    }

    window.location.href = `mailto:roger.delphe1@orange.fr?subject=${subject}&body=${body}`;
  });
}


/* ============================================ */
/* SMOOTH SCROLL via Lenis                      */
/* ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = window.innerWidth >= 1024 ? -96 : -80;
      lenis.scrollTo(target, { offset });
    }
  });
});


/* ============================================ */
/* PARALLAX IMAGES — throttled via rAF          */
/* ============================================ */

const parallaxImages = document.querySelectorAll('.parallax-img');

if (parallaxImages.length && window.matchMedia('(pointer: fine)').matches) {
  let ticking = false;

  function updateParallax() {
    const vh = window.innerHeight;
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      // Only apply if in viewport (±300px buffer)
      if (rect.bottom < -300 || rect.top > vh + 300) return;
      const yPos = (rect.top - vh / 2) * 0.06;
      img.style.transform = `translateY(${yPos}px) scale(1.08)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}
