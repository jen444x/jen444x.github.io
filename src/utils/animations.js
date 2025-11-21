/**
 * SCROLL REVEAL ANIMATION UTILITIES
 * Centralized animation logic for consistent behavior across all pages
 *
 * Best Practices (2025):
 * - Use POSITIVE rootMargin to trigger animations BEFORE element enters viewport
 * - Negative rootMargin makes content feel "late" and pages look empty
 * - Different contexts need different timing
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

  document.querySelectorAll(selector).forEach((el) => {
    // Store observer reference for cleanup
    el.observer = observer;
    observer.observe(el);
  });

  return observer;
}

/**
 * PRESET CONFIGURATIONS
 * Use these for different contexts across the site
 */

// Homepage sections (Services, About, etc.)
export const HOMEPAGE_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px 100px 0px', // Animations start 100px early
  animationClass: 'animate-fade-in-up'
};

// Gallery landing page - needs more buffer so cards appear sooner
export const GALLERY_SCROLL_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px 150px 0px', // Animations start 150px early (page looked empty before)
  animationClass: 'animate-fade-in-up'
};

// Category detail pages - can be tighter since content already visible
export const DETAIL_SCROLL_CONFIG = {
  threshold: 0.15,
  rootMargin: '0px 0px 80px 0px',
  animationClass: 'animate-fade-in-up'
};

// Staggered animations (like grid items)
export const STAGGERED_SCROLL_CONFIG = {
  threshold: 0.05, // Lower threshold for grid items
  rootMargin: '0px 0px 120px 0px',
  animationClass: 'animate-fade-in-up'
};
