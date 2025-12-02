import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default defineNuxtPlugin((_nuxtApp) => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  }
})
