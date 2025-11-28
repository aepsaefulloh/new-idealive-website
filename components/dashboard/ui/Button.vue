<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      block ? 'w-full' : '',
      rounded ? 'rounded-full' : 'rounded-xl'
    ]"
    v-bind="$attrs"
  >
    <UIcon
      v-if="loading"
      name="i-heroicons-arrow-path"
      class="animate-spin mr-2"
      :class="iconSizeClasses[size]"
    />
    <UIcon
      v-else-if="icon"
      :name="icon"
      :class="[
        hasContent ? 'mr-2' : '',
        iconSizeClasses[size]
      ]"
    />
    <slot />
  </component>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary',
      'secondary',
      'outline',
      'ghost',
      'danger',
      'success',
      'warning'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  block: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  to: {
    type: [String, Object],
    default: null
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()
const hasContent = computed(() => !!slots.default)

const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-base'
}

const iconSizeClasses = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6'
}

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 focus:ring-blue-500 border border-transparent',
  secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-200 dark:focus:ring-gray-700',
  outline: 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500',
  ghost: 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:ring-gray-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30 focus:ring-red-500 border border-transparent',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30 focus:ring-green-500 border border-transparent',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/30 focus:ring-yellow-500 border border-transparent'
}
</script>
