<!-- components/global/Modal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')">
    <button
      class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-bold z-20 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
      @click="$emit('close')">
      ✕
    </button>
    <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full relative max-h-[95vh] overflow-y-auto">


      <div v-if="$slots.header">
        <slot name="header" />
      </div>

      <div>
        <slot>
          <h2 v-if="title" class="text-xl font-semibold mb-2">{{ title }}</h2>
          <div v-if="content" class="text-gray-600" v-html="content"></div>
        </slot>
      </div>

      <div v-if="$slots.footer" class="p-6 pt-0 border-t border-gray-100">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  content: String
})

defineEmits(['close'])
</script>
