<!--
 * Dropdown Component
 *
 * A reusable dropdown component with smooth animations and accessibility features.
 *
 * Usage:
 *
 * <Dropdown>
 *   <template #trigger>
 *     <button>Click me</button>
 *   </template>
 *
 *   <template #content>
 *     <div class="py-1">
 *       <a href="#" class="block px-4 py-2">Menu Item 1</a>
 *       <a href="#" class="block px-4 py-2">Menu Item 2</a>
 *     </div>
 *   </template>
 * </Dropdown>
 *
 * Props:
 * - triggerClass: CSS classes for the trigger button (default: flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors)
 * - dropdownClass: CSS classes for the dropdown menu (default: absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50)
 * - closeOnClickOutside: Whether to close dropdown when clicking outside (default: true)
 *
 * Events:
 * - open: Emitted when dropdown opens
 * - close: Emitted when dropdown closes
 *
 * Exposed Methods:
 * - toggleDropdown(): Toggle dropdown open/close
 * - closeDropdown(): Close dropdown
 * - isOpen: Reactive ref indicating if dropdown is open
 -->
<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      @click="toggleDropdown"
      :class="triggerClass"
      ref="triggerRef"
    >
      <slot name="trigger">
        <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-2" />
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="dropdownClass"
        ref="dropdownMenuRef"
      >
        <slot name="content">
          <!-- Default content if no slot provided -->
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              Profile
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              Settings
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              Sign out
            </a>
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  triggerClass: {
    type: String,
    default: 'flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
  },
  dropdownClass: {
    type: String,
    default: 'absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50'
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['open', 'close'])

const isOpen = ref(false)
const dropdownRef = ref(null)
const triggerRef = ref(null)
const dropdownMenuRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

const closeDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false
    emit('close')
  }
}

const handleClickOutside = (event) => {
  if (props.closeOnClickOutside && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})

// Expose methods for parent components
defineExpose({
  toggleDropdown,
  closeDropdown,
  isOpen
})
</script>