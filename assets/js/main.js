/**
 * Hayeshi Academy - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initHeader();
  initMobileMenu();
  initDisciplineCards();
  initSmoothScroll();
  initAgePathways();
});

/**
 * Header scroll behavior
 */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const close = document.getElementById('menu-close');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close menu when clicking on a link
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Discipline cards expand/collapse
 */
function initDisciplineCards() {
  const cards = document.querySelectorAll('.discipline-card');

  cards.forEach(card => {
    card.addEventListener('click', function() {
      // Close other cards
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('expanded');
        }
      });

      // Toggle current card
      this.classList.toggle('expanded');
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Age pathways filtering
 */
function initAgePathways() {
  const pathwayCards = document.querySelectorAll('.pathway-card');
  const disciplineCards = document.querySelectorAll('.discipline-card');

  pathwayCards.forEach(card => {
    card.addEventListener('click', function() {
      const age = this.dataset.age;
      const isActive = this.classList.contains('active');

      // Toggle active state - clicking same card deselects
      pathwayCards.forEach(c => c.classList.remove('active'));

      if (isActive) {
        // Deselect - reset all cards
        disciplineCards.forEach(disciplineCard => {
          disciplineCard.classList.remove('dimmed');
        });
      } else {
        this.classList.add('active');

        // Highlight matching disciplines, subtle dim for others
        disciplineCards.forEach(disciplineCard => {
          const ages = disciplineCard.dataset.ages?.split(',') || [];
          if (ages.includes(age)) {
            disciplineCard.classList.remove('dimmed');
          } else {
            disciplineCard.classList.add('dimmed');
          }
        });
      }

      // Scroll to disciplines section
      const disciplinesSection = document.getElementById('disciplinas');
      if (disciplinesSection) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 0;
        const targetPosition = disciplinesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Lazy load images
 */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}
