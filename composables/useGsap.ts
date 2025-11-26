import { gsap } from 'gsap'

export const useGsap = () => {
  const animateTextReveal = (element: HTMLElement | string, delay = 0) => {
    const chars = element instanceof HTMLElement
      ? element.querySelectorAll('.char')
      : document.querySelectorAll(`${element} .char`)

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const animateFadeInUp = (elements: HTMLElement | string, delay = 0) => {
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const animateScale = (element: HTMLElement | string, delay = 0) => {
    gsap.fromTo(
      element,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'back.out(1.7)',
      }
    )
  }

  const animateStagger = (elements: HTMLElement[] | string, delay = 0) => {
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay,
        ease: 'power3.out',
      }
    )
  }

  return {
    gsap,
    animateTextReveal,
    animateFadeInUp,
    animateScale,
    animateStagger,
  }
}
