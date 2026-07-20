import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth Scroll Animation Utilities
 * 
 * Provides optimized scroll-triggered animations for immersive UX.
 * All animations use GPU-accelerated properties (transform, opacity).
 */

/**
 * Create a parallax effect for an element
 */
export const createParallax = (element, options = {}) => {
  const {
    yPercent = 25,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options

  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  })
}

/**
 * Create a fade-in on scroll effect
 */
export const createFadeIn = (element, options = {}) => {
  const {
    y = 50,
    opacity = 0,
    duration = 1,
    ease = 'power3.out',
    delay = 0,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    element,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Create staggered reveal for multiple elements
 */
export const createStaggerReveal = (elements, options = {}) => {
  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    stagger = 0.12,
    ease = 'power3.out',
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    elements,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Create horizontal slide effect
 */
export const createSlideIn = (element, options = {}) => {
  const {
    x = 100,
    opacity = 0,
    duration = 1,
    ease = 'power3.out',
    start = 'top 80%',
  } = options

  return gsap.fromTo(
    element,
    { x, opacity },
    {
      x: 0,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Create scale reveal effect
 */
export const createScaleReveal = (element, options = {}) => {
  const {
    scale = 0.8,
    opacity = 0,
    duration = 0.8,
    ease = 'power2.out',
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    element,
    { scale, opacity },
    {
      scale: 1,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Create pin effect (sticky element while scrolling)
 */
export const createPin = (element, options = => {}) => {
  const {
    start = 'top top',
    end = '+=100%',
    scrub = true,
  } = options

  return ScrollTrigger.create({
    trigger: element,
    start,
    end,
    pin: true,
    scrub,
  })
}

/**
 * Create progress indicator based on scroll
 */
export const createScrollProgress = (element, options = {}) => {
  const {
    start = 'top top',
    end = 'bottom bottom',
  } = options

  return gsap.fromTo(
    element,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: 0.5,
      },
    }
  )
}

/**
 * 60fps Animation Check Utility
 * 
 * Use this to verify animations are using GPU-accelerated properties
 */
export const validateAnimationProperties = (animation) => {
  const animatedProperties = Object.keys(animation.vars || {}).filter(
    (key) => !['trigger', 'start', 'end', 'toggleActions', 'scrub', 'pin'].includes(key)
  )

  const gpuProperties = ['x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'rotation', 'rotationX', 'rotationY', 'opacity', 'skewX', 'skewY']
  const nonGpuProperties = animatedProperties.filter(
    (prop) => !gpuProperties.includes(prop) && !prop.startsWith('border') && !prop.startsWith('margin') && !prop.startsWith('padding')
  )

  if (nonGpuProperties.length > 0) {
    console.warn(
      `[SmoothScroll] Non-GPU properties detected: ${nonGpuProperties.join(', ')}. Consider using transform instead.`
    )
  }

  return nonGpuProperties.length === 0
}

export default {
  createParallax,
  createFadeIn,
  createStaggerReveal,
  createSlideIn,
  createScaleReveal,
  createPin,
  createScrollProgress,
  validateAnimationProperties,
}
