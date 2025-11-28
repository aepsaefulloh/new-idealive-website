<template>
  <Transition name="fade">
    <div v-if="isVisible" class="transition-overlay fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <img src="/images/logo-idealive-blue.svg" class="w-[20vw]" alt="Idealive Logo">
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isVisible = ref(false)

watch(() => router.currentRoute.value, () => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 1000) 
}, { immediate: true })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
