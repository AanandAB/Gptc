/* =============================================
   GPTC KANNUR — Main JavaScript
   Lenis Smooth Scroll + Animations + Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Initialize Lucide Icons ─────────────────────
  lucide.createIcons();

  // ─── Lenis Smooth Scrolling ──────────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Handle anchor links with Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.5,
        });

        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  });

  // ─── Navbar Scroll Effect ────────────────────────
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  lenis.on('scroll', ({ scroll }) => {
    // Sticky navbar background
    if (scroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scroll > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNavLink(scroll);
  });

  // Back to top click
  backToTop.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 2 });
  });

  // ─── Active Navigation Link ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  function updateActiveNavLink(scrollY) {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  }

  // ─── Mobile Navigation ──────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Mobile dropdown toggles
  const dropdowns = document.querySelectorAll('.navbar__dropdown');

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.navbar__link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // ─── Scroll Reveal Animations ───────────────────
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;

        setTimeout(() => {
          el.classList.add('in-view');
        }, delay);

        animationObserver.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

  // ─── Counter Animation ──────────────────────────
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  // ─── Hero Particles ─────────────────────────────
  const particlesContainer = document.getElementById('hero-particles');

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const x = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 5;

    particle.style.left = `${x}%`;
    particle.style.bottom = '-10px';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    // Random color
    const colors = ['var(--accent)', 'var(--cyan)', 'rgba(255,255,255,0.4)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particlesContainer.appendChild(particle);

    // Clean up after animation
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }

  // Create initial particles
  for (let i = 0; i < 30; i++) {
    createParticle();
  }

  // Keep creating particles
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      createParticle();
    }
  }, 500);

  // ─── Parallax Effect on Hero ────────────────────
  const heroContent = document.querySelector('.hero__content');

  lenis.on('scroll', ({ scroll }) => {
    if (scroll < window.innerHeight) {
      const parallaxAmount = scroll * 0.3;
      heroContent.style.transform = `translateY(${parallaxAmount}px)`;
      heroContent.style.opacity = 1 - (scroll / window.innerHeight) * 0.6;
    }
  });

  // ─── Ticker Pause on Hover ──────────────────────
  const tickerContent = document.querySelector('.ticker__content');

  if (tickerContent) {
    tickerContent.addEventListener('mouseenter', () => {
      tickerContent.style.animationPlayState = 'paused';
    });

    tickerContent.addEventListener('mouseleave', () => {
      tickerContent.style.animationPlayState = 'running';
    });
  }

  // ─── Smooth Card Tilt Effect ────────────────────
  const tiltCards = document.querySelectorAll('.dept-card, .vision__card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * -3;
      const rotateY = (x - centerX) / centerX * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ─── Magnetic Button Effect ─────────────────────
  const magneticBtns = document.querySelectorAll('.btn--primary');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ─── Glow Cursor Effect on Hero ──────────────────
  const hero = document.querySelector('.hero');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
  });

  // ─── Image Lazy Loading Simulation ──────────────
  const placeholders = document.querySelectorAll('.about__image-placeholder, .event-card__image-placeholder');

  placeholders.forEach(placeholder => {
    // Add a subtle shimmer animation
    placeholder.style.position = 'relative';
    placeholder.style.overflow = 'hidden';

    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
      animation: shimmer 2s infinite;
    `;
    placeholder.appendChild(shimmer);
  });

  // Add shimmer keyframes
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `;
  document.head.appendChild(styleSheet);

  console.log('🎓 GPTC Kannur Website — Loaded Successfully');
  console.log('🌊 Lenis Smooth Scrolling — Active');

});
