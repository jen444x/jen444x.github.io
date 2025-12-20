/**
 * SCROLL REVEAL ANIMATION UTILITIES
 * Centralized animation logic for consistent behavior across all pages
 *
 * Philosophy: "Motion is choreography, not a dance party."
 * Animations should feel like "velvet curtains opening" - slow, smooth, purposeful.
 *
 * Timing Guidelines (Nielsen Norman Group research):
 * - 300-400ms: Grid items (snappy, multiple items)
 * - 400-600ms: Content sections (standard reveals)
 * - 500-700ms: CTAs (feels like a "moment")
 * - 600-900ms: Hero elements (dramatic, builds anticipation)
 *
 * Threshold Guidelines:
 * - 0.1 (10%): Standard content - triggers early enough
 * - 0.15-0.2 (15-20%): Grid items - user should SEE the animation happen
 *
 * RootMargin: POSITIVE values trigger BEFORE element enters viewport
 * This prevents pages from looking empty on scroll.
 */

/**
 * Creates an Intersection Observer for scroll-triggered animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element visible before triggering (0-1)
 * @param {string} options.rootMargin - Margin around viewport (positive = trigger earlier)
 * @param {string} options.animationClass - CSS class to add when element is visible
 * @returns {IntersectionObserver}
 */
export function createScrollObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px 100px 0px', // Default: animate 100px before entering viewport
    animationClass = 'animate-fade-in-up'
  } = options;

  const observerOptions = {
    threshold,
    rootMargin
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        // Unobserve after animation triggers (performance optimization)
        entry.target.observer?.unobserve(entry.target);
      }
    });
  }, observerOptions);
}

/**
 * Initializes scroll animations for elements with a specific selector
 * @param {string} selector - CSS selector for elements to animate
 * @param {Object} options - Same options as createScrollObserver
 */
export function initScrollAnimations(selector = '.scroll-reveal', options = {}) {
  const observer = createScrollObserver(options);
  const animationClass = options.animationClass || 'animate-fade-in-up';

  // Account for fixed header (h-20 = 80px mobile, h-24 = 96px desktop)
  const navHeight = window.innerWidth >= 768 ? 96 : 80;

  document.querySelectorAll(selector).forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Element must be in the actual visible area (below nav, above bottom)
    const isVisible = rect.top < window.innerHeight && rect.top > navHeight;

    if (isVisible) {
      // Already on screen - animate immediately
      el.classList.add(animationClass);
    } else {
      // Below the fold or behind nav - use scroll trigger
      el.observer = observer;
      observer.observe(el);
    }
  });

  return observer;
}

/**
 * PRESET CONFIGURATIONS
 * Based on AOS/GSAP approach: trigger when element is ON SCREEN
 *
 * Negative rootMargin = element must be X pixels INTO viewport before triggering
 * This ensures user SEES the animation happen (like AOS offset: 120)
 */

// Content sections (AboutUs, WhyChooseUs, section headings)
// Triggers when element is 50px into viewport
export const CONTENT_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',    // Must be 50px on screen
  animationClass: 'animate-fade-in-up' // 500ms
};

// Grid items (Services cards, category cards)
// Trigger earlier so cards are ready when user scrolls
export const GRID_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -35px 0px',    // Trigger sooner (35px on screen)
  animationClass: 'animate-fade-in-up-quick' // 400ms
};

// CTA sections - same trigger as content, longer animation for "moment" feel
export const CTA_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',    // Same as content
  animationClass: 'animate-fade-in-up-gentle' // 650ms
};

// Gallery/image items - trigger earlier so images are ready
export const IMAGE_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -35px 0px',    // Trigger sooner (35px on screen)
  animationClass: 'animate-fade-in-up-quick' // 400ms
};

// Featured strips and sections
export const SECTION_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',    // Must be 50px on screen
  animationClass: 'animate-fade-in-up' // 500ms
};

/**
 * COMPONENT-SPECIFIC ALIASES
 * Semantic names that map to the configs above
 */
export const CONTENT_CONFIG = CONTENT_SCROLL_CONFIG;   // Text sections
export const CARD_CONFIG = GRID_SCROLL_CONFIG;         // Grid items (cards)
export const CTA_CONFIG = CTA_SCROLL_CONFIG;           // Call-to-action sections
export const IMAGE_CONFIG = IMAGE_SCROLL_CONFIG;       // Gallery images
export const STRIP_CONFIG = SECTION_SCROLL_CONFIG;     // Featured strips/sections

// Legacy aliases (for backwards compatibility)
export const HOMEPAGE_SCROLL_CONFIG = CONTENT_SCROLL_CONFIG;
export const GALLERY_SCROLL_CONFIG = IMAGE_SCROLL_CONFIG;
export const DETAIL_SCROLL_CONFIG = CONTENT_SCROLL_CONFIG;
export const STAGGERED_SCROLL_CONFIG = GRID_SCROLL_CONFIG;
