import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// 2. Preloader Logic
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 600);
  }
});

// 3. Custom Drag Cursor Logic
const initCustomCursor = () => {
  let cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<span class="cursor-text">Drag</span>';
    document.body.appendChild(cursor);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const updateCursor = () => {
    // Lerp smooth movement
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  };
  updateCursor();

  // Hover states
  document.querySelectorAll('a, button, .btn, .deck-tab-btn').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  document.querySelectorAll('.deck-gallery, .expedition-img-wrap, .swiper').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-drag');
      cursor.classList.remove('is-hover');
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-drag'));
  });
};

// 4. Header Scroll State
const initHeaderScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('on-scroll');
    } else {
      header.classList.remove('on-scroll');
    }
  });
};

// 5. Deck Tabs Switcher Logic
const initDeckTabs = () => {
  const tabBtns = document.querySelectorAll('.deck-tab-btn');
  const panels = document.querySelectorAll('.deck-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.querySelector(`.deck-panel[data-panel="${target}"]`);
      if (activePanel) {
        activePanel.classList.add('active');

        // GSAP animate active panel
        gsap.fromTo(
          activePanel.querySelectorAll('.deck-gallery, .deck-info'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 }
        );
      }
    });
  });
};

// 6. Contact Inquiry Drawer Modal
const initInquiryDrawer = () => {
  let drawer = document.querySelector('.inquiry-drawer');
  
  // Create drawer if not present
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'inquiry-drawer';
    drawer.innerHTML = `
      <div class="inquiry-backdrop"></div>
      <div class="inquiry-panel">
        <button class="inquiry-close" aria-label="Close modal">&times;</button>
        <div class="section-tag">Charter Enquiries</div>
        <h2 class="inquiry-title">Begin Your Journey</h2>
        <p class="inquiry-subtitle">Speak directly with our expedition specialists to customize your bespoke voyage across Indonesia.</p>
        <form class="inquiry-form" onsubmit="event.preventDefault(); alert('Thank you for your enquiry! Our expedition team will contact you shortly.');">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" placeholder="e.g. Lord Alexander Harrington" required />
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" placeholder="alexander@domain.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Destination of Interest</label>
            <select class="form-select">
              <option value="raja-ampat">Raja Ampat & West Papua</option>
              <option value="komodo">Komodo Archipelago & Flores</option>
              <option value="spice-islands">Banda & Spice Islands</option>
              <option value="alor">Alor & Forgotten Islands</option>
              <option value="custom">Custom Whole Vessel Charter</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Number of Guests</label>
            <input type="number" class="form-input" placeholder="1 to 16 guests" min="1" max="16" required />
          </div>
          <div class="form-group">
            <label class="form-label">Message / Travel Dates</label>
            <textarea class="form-textarea" placeholder="Tell us about your ideal travel timeframe or special requests..."></textarea>
          </div>
          <button type="submit" class="btn" style="background-color: #c5a059; color: #001f38; border: none; font-weight: 700; width: 100%; margin-top: 1rem;">
            Submit Inquiry
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const openBtns = document.querySelectorAll('.header-btn, a[href="#contact"], .hero-btn, .btn-inquire');
  const closeBtn = drawer.querySelector('.inquiry-close');
  const backdrop = drawer.querySelector('.inquiry-backdrop');

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    drawer.classList.add('is-open');
    lenis.stop();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    lenis.start();
  };

  openBtns.forEach((b) => b.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
};

// 7. GSAP Parallax & Reveal Animations
const initGSAPAnimations = () => {
  // Hero Video parallax
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Section titles reveal
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
      },
    });
  });

  // Expedition cards stagger reveal
  gsap.from('.expedition-card', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.expeditions-grid',
      start: 'top 80%',
    },
  });
};

// Initialize Everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initDeckTabs();
  initInquiryDrawer();
  initGSAPAnimations();
});
