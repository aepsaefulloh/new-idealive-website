<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon/Animation -->
      <div class="mb-8">
        <div class="relative">
          <!-- Animated background circles -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-400 opacity-20 animate-ping"></div>
          <div class="absolute inset-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 opacity-30 animate-pulse"></div>
          <div class="relative bg-white dark:bg-gray-800 rounded-full p-8 shadow-xl">
            <UIcon
              :name="errorIcon"
              class="w-16 h-16 text-red-500 dark:text-red-400 mx-auto"
            />
          </div>
        </div>
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-bold text-gray-900 dark:text-white mb-4">
        {{ error.statusCode || '500' }}
      </h1>

      <!-- Error Title -->
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        {{ errorTitle }}
      </h2>

      <!-- Error Description -->
      <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        {{ errorDescription }}
      </p>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
          Back to Homepage
        </NuxtLink>

        <div class="flex justify-center space-x-4">
          <button
            @click="handleRefresh"
            class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
            Try Again
          </button>

          <button
            @click="handleGoBack"
            class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>

      <!-- Error Details (Development Only) -->
      <div v-if="isDev && error.message" class="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
        <h3 class="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
          Error Details (Development)
        </h3>
        <pre class="text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap">{{ error.message }}</pre>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-sm text-gray-500 dark:text-gray-400">
        <p>If this problem persists, please contact support.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get error object from Nuxt
const props = defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

// Computed properties for dynamic content
const errorTitle = computed(() => {
  const status = props.error.statusCode

  switch (status) {
    case 403:
      return 'Access Forbidden'
    case 404:
      return 'Page Not Found'
    case 500:
    default:
      return 'Something Went Wrong'
  }
})

const errorDescription = computed(() => {
  const status = props.error.statusCode

  switch (status) {
    case 403:
      return 'You don\'t have permission to access this resource. This area is restricted to authorized personnel only.'
    case 404:
      return 'The page you\'re looking for doesn\'t exist or has been moved. Please check the URL or return to the homepage.'
    case 500:
    default:
      return 'We\'re experiencing some technical difficulties. Our team has been notified and is working to fix this issue.'
  }
})

const errorIcon = computed(() => {
  const status = props.error.statusCode

  switch (status) {
    case 403:
      return 'i-heroicons-shield-exclamation'
    case 404:
      return 'i-heroicons-magnifying-glass'
    case 500:
    default:
      return 'i-heroicons-exclamation-triangle'
  }
})

// Check if in development mode
const isDev = computed(() => {
  return process.dev || import.meta.env.DEV
})

// Handle refresh
const handleRefresh = () => {
  window.location.reload()
}

// Handle go back
const handleGoBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

// Clear error on component mount (optional)
onMounted(() => {
  // You can add analytics tracking here
  if (props.error.statusCode) {
    console.error(`Error ${props.error.statusCode}:`, props.error.message)
  }
});
</script>

<style scoped>
/* Custom animations for error page */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Ensure proper dark mode support */
.dark {
  color-scheme: dark;
}
</style>