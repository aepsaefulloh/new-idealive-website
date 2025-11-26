<template>
  <div
    class="gif-container w-full h-full"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Show the static first frame when not hovered -->
    <img class="h-full w-full object-cover object-center" v-if="!hover" :src="staticSrc" alt="Static first frame" />
    <!-- Show the animated GIF on hover -->
    <img class="h-full w-full object-cover object-center" v-else :src="gifSrc" alt="Animated GIF" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  gifSrc: {
    type: String,
    required: true
  }
})

const hover = ref(false)
const staticSrc = ref('')

onMounted(() => {
  const img = new Image()
  img.crossOrigin = 'anonymous' // Ensure CORS is allowed for the GIF
  img.src = props.gifSrc

  // If the image fails to load, fallback to the original URL
  img.onerror = () => {
    staticSrc.value = props.gifSrc
  }

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      // Draw the first frame of the GIF onto the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height)
      // Convert the canvas to a static image data URL
      staticSrc.value = canvas.toDataURL()
    } catch (error) {
      // If an error occurs during processing, fallback to original URL
      staticSrc.value = props.gifSrc
    }
  }
})
</script>

<style scoped>
.gif-container img {
  display: block;
  transition: opacity 0.3s ease;
}
</style>
