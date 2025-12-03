<template>
  <div 
    ref="cursor" 
    class="fixed top-0 left-0 w-6 h-6 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-opacity duration-300"
    :class="{ 'opacity-0': isHidden }"
  >
    <div ref="cursorDot" class="w-1 h-1 bg-white rounded-full"></div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
const cursor = ref(null)
const cursorDot = ref(null)
const isHidden = ref(true)

onMounted(() => {
  // Initial position off-screen
  gsap.set(cursor.value, { xPercent: -50, yPercent: -50 })

  const moveCursor = (e) => {
    isHidden.value = false
    
    // Main cursor follows with lag
    gsap.to(cursor.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: 'power3.out'
    })
    
    // Dot follows instantly
    gsap.to(cursorDot.value, {
      x: 0, // Relative to parent
      y: 0,
      duration: 0
    })
  }

  const handleHoverStart = () => {
    gsap.to(cursor.value, { 
      scale: 2.5, 
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'transparent',
      duration: 0.3 
    })
  }

  const handleHoverEnd = () => {
    gsap.to(cursor.value, { 
      scale: 1, 
      backgroundColor: 'transparent',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      duration: 0.3 
    })
  }

  window.addEventListener('mousemove', moveCursor)
  
  // Add listeners to interactive elements
  const addListeners = () => {
    const hoverables = document.querySelectorAll('a, button, input, textarea, .hoverable')
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })
  }

  // Run initially and observe DOM changes
  addListeners()
  
  const observer = new MutationObserver(addListeners)
  observer.observe(document.body, { childList: true, subtree: true })

  onUnmounted(() => {
    window.removeEventListener('mousemove', moveCursor)
    observer.disconnect()
  })
})
</script>
