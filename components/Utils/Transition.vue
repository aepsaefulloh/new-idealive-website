<template>
  <Transition @enter="onEnter" @leave="onLeave" :css="false">
    <div v-if="isVisible" class="transition-overlay fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <img src="/images/logo-idealive-blue.svg" class="w-[20vw]" alt="Idealive Logo">
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const isVisible = ref(false)

const onEnter = (el, done) => {
  gsap.fromTo(el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
      onComplete: done
    }
  )
}

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    force3D: true,
    onComplete: done
  })
}

watch(() => router.currentRoute.value, () => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 1000)
}, { immediate: true })
</script>

<style scoped>
/* CSS transitions removed in favor of GSAP */
</style>
