/* ============================================================
   PORTFOLIO -- Juan de Dios Hernandez Kakauridze
   Main JS: Navbar, Scroll reveal, Mouse spotlight, Animations
   ============================================================ */
(function () {
  'use strict';

  // ---------- Navbar pill scroll state ----------
  const header = document.getElementById('siteHeader');
  const navbar = header?.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  // ---------- Active nav link ----------
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const y = window.scrollY + 120;
    sections.forEach((sec) => {
      const id = sec.getAttribute('id');
      const top = sec.offsetTop;
      const bot = top + sec.offsetHeight;
      const link = document.querySelector(`.navbar__links a[href="#${id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < bot);
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ---------- Mobile burger ----------
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  reveals.forEach(el => io.observe(el));

  // ---------- Mouse spotlight on glass cards ----------
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---------- Typing effect on hero role text ----------
  const roleText = document.querySelector('.hero__role-text');
  if (roleText) {
    const fullText = roleText.textContent.trim();
    roleText.textContent = '';

    const cursor = document.createElement('span');
    cursor.style.cssText = 'border-right:2px solid var(--violet);animation:blink 0.8s step-end infinite;margin-left:1px;';
    roleText.parentNode.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = '@keyframes blink{0%,100%{border-color:var(--violet)}50%{border-color:transparent}}';
    document.head.appendChild(style);

    let i = 0;
    const speed = 50;

    setTimeout(function type() {
      if (i <= fullText.length) {
        roleText.textContent = fullText.slice(0, i);
        i++;
        setTimeout(type, speed);
      }
    }, 800);
  }

  // ---------- Counter animation on hero stats ----------
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      statsObserver.unobserve(el);

      const raw = el.getAttribute('data-target');
      if (!raw) return;

      const endVal = parseInt(raw);
      const suffix = el.textContent.replace(/[\d]/g, '') || '+';
      let current = 0;
      const step = Math.max(1, Math.floor(endVal / 30));

      const interval = setInterval(() => {
        current = Math.min(current + step, endVal);
        el.textContent = current + suffix;
        if (current >= endVal) clearInterval(interval);
      }, 40);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.hero__stat-number[data-target]').forEach(el => statsObserver.observe(el));

  // ============================================================
  // PREMIUM ANIMATIONS (3D Tilt, Magnetic Buttons, CR7 Easter Egg)
  // ============================================================

  // 1. CR7 Easter Egg (Keylogger)
  let keysPressed = [];
  const secretCode = ['c', 'r', '7'];
  const cr7Container = document.getElementById('cr7-container');
  let cr7Timer;

  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    keysPressed.push(key);

    // Keep only the last 3 keys
    if (keysPressed.length > secretCode.length) {
      keysPressed.shift();
    }

    // Check if secret code is matched
    if (keysPressed.join('') === secretCode.join('')) {
      if (cr7Container) {
        cr7Container.classList.add('show');

        // Hide after 3.5 seconds
        clearTimeout(cr7Timer);
        cr7Timer = setTimeout(() => {
          cr7Container.classList.remove('show');
        }, 3500);
      }
      keysPressed = []; // Reset
    }
  });

  // 3. Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move button towards cursor (intensity factor 0.3)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Reset position smoothly
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

})();