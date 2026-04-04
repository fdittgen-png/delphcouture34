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
    // Trigger reflow so transitions fire
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

// Close on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ============================================ */
/* SCROLL REVEAL — with stagger support         */
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
/* GALLERY FILTER                               */
/* ============================================ */

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden-item');
        item.style.position = '';
      } else {
        item.classList.add('hidden-item');
        setTimeout(() => {
          if (item.classList.contains('hidden-item')) {
            item.style.position = 'absolute';
          }
        }, 500);
      }
    });
  });
});


/* ============================================ */
/* GALLERY CUSTOM CURSOR                        */
/* ============================================ */

const galleryCursor = document.getElementById('gallery-cursor');
if (galleryCursor && window.matchMedia('(pointer: fine)').matches) {
  const gallerySection = document.getElementById('realisations');
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
/* LIGHTBOX                                     */
/* ============================================ */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(container) {
  const img = container.querySelector('img');
  if (!img || !img.src) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lenis.stop();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lenis.start();
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    if (menuOpen) closeMenu();
  }
});


/* ============================================ */
/* CONTACT FORM                                 */
/* ============================================ */

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const service = form.querySelector('#service').value;
  const message = form.querySelector('#message').value;

  const subject = encodeURIComponent(`Demande de ${service || 'renseignement'} — ${name}`);
  const body = encodeURIComponent(
    `Bonjour Delphine,\n\n${message}\n\n---\nNom : ${name}\nEmail : ${email}\nService : ${service || 'Non précisé'}`
  );

  window.location.href = `mailto:roger.delphe1@orange.fr?subject=${subject}&body=${body}`;
}


/* ============================================ */
/* SMOOTH SCROLL via Lenis                      */
/* ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      // Match nav height: 96px desktop, 80px mobile
      const offset = window.innerWidth >= 1024 ? -96 : -80;
      lenis.scrollTo(target, { offset });
    }
  });
});


/* ============================================ */
/* PARALLAX IMAGES on scroll                    */
/* ============================================ */

const parallaxImages = document.querySelectorAll('.parallax-img');

if (parallaxImages.length && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const speed = 0.06;
      const yPos = (rect.top - window.innerHeight / 2) * speed;
      img.style.transform = `translateY(${yPos}px) scale(1.08)`;
    });
  }, { passive: true });
}
