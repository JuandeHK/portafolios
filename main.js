/* ============================================================
   PORTFOLIO — Juan de Dios Hernández Kakauridze
   Main JavaScript: Theme, Scroll, Navigation, Visual Effects
   ============================================================ */

(function () {
  'use strict';



  // ---------- Mobile Menu ----------
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }

  // ---------- Active Nav Link on Scroll ----------
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.navbar__links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ---------- Scroll Reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // ---------- Mouse-Tracking Spotlight on Cards ----------
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

  // ---------- Typing Effect on Hero Subtitle ----------
  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--accent-1)';
    subtitle.style.animation = 'none';
    let i = 0;
    const typeSpeed = 45;

    function typeChar() {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, typeSpeed);
      } else {
        // Blink cursor then remove it
        let blinks = 0;
        const blinkInterval = setInterval(() => {
          subtitle.style.borderRightColor =
            subtitle.style.borderRightColor === 'transparent' ?
              'var(--accent-1)' : 'transparent';

        }, 400);
      }
    }

    // Start typing when hero becomes visible
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(typeChar, 600);
          heroObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    heroObserver.observe(subtitle.closest('.hero'));
  }

  // ---------- Navbar Hide/Show on Scroll ----------
  let lastScroll = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

})();
