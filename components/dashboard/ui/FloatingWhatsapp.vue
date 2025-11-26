<template>
  <div ref="whatsappRef" class="fixed bottom-6 right-6 z-50">
    <a
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition"
      aria-label="Chat via WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M20.52 3.48A11.89 11.89 0 0012 0C5.38 0 .01 5.37.01 12a11.91 11.91 0 001.64 6L0 24l6.27-1.64A11.91 11.91 0 0012 24c6.62 0 12-5.38 12-12a11.89 11.89 0 00-3.48-8.52zM12 22a9.92 9.92 0 01-5.06-1.37l-.36-.21-3.72.97.99-3.63-.24-.38A9.93 9.93 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.07-7.74c-.28-.14-1.67-.82-1.93-.91s-.45-.14-.64.14-.73.91-.89 1.1-.33.21-.61.07a8.11 8.11 0 01-2.39-1.47 9.04 9.04 0 01-1.66-2.06c-.17-.28 0-.43.13-.57.13-.14.28-.33.42-.49s.19-.28.28-.47a.52.52 0 00-.02-.49c-.06-.14-.64-1.55-.88-2.13-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.49.07-.75.35s-.98.96-.98 2.34 1 .96 1.14 2.04c.14 1.07.96 2.07 1.1 2.22s2.08 3.18 5.07 4.37a10.71 10.71 0 001.06.39c.45.14.87.13 1.2.08.37-.05 1.14-.46 1.3-.91.16-.46.16-.85.12-.91s-.23-.17-.5-.31z"
        />
      </svg>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const phone = '6281219594423'
const message = 'Halo, saya ingin bertanya tentang layanan Anda.'
const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const whatsappRef = ref(null)

onMounted(() => {
  gsap.from(whatsappRef.value, {
    delay: 1.5,
    duration: 0.8,
    opacity: 0,
    scale: 0.5,
    ease: 'back.out(1.7)'
  })
})
</script>
