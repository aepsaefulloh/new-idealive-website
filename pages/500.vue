<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="w-24 h-24 mx-auto text-red-500 dark:text-red-400"
        />
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-bold text-gray-900 dark:text-white mb-4 opacity-80">
        500
      </h1>

      <!-- Error Title -->
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Internal Server Error
      </h2>

      <!-- Error Description -->
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        Something went wrong on our end. We're working to fix this issue.
        Please try again later or contact support if the problem persists.
      </p>

      <!-- Status Indicator -->
      <div class="mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium">System Status: Investigating</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <button
          @click="retryPage"
          class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5" />
          Try Again
        </button>

        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <UIcon name="i-heroicons-home" class="w-5 h-5" />
          Back to Homepage
        </NuxtLink>

        <div class="pt-4">
          <button
            @click="$router.go(-1)"
            class="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mt-12 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Need Help?
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          If this problem continues, please contact our support team.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          <UIcon name="i-heroicons-envelope" class="w-4 h-4" />
          Contact Support
        </NuxtLink>
      </div>

      <!-- Error ID for debugging -->
      <div class="mt-4 text-xs text-gray-400 dark:text-gray-500">
        Error ID: {{ errorId }}
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  layout: false, // Don't use any layout for error pages
  middleware: false
})

// Reactive data
const errorId = ref('')

// Generate unique error ID
onMounted(() => {
  errorId.value = 'ERR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
})

// Retry function
const retryPage = () => {
  window.location.reload()
}

// SEO meta
useHead({
  title: '500 Server Error | Aep Saefulloh',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'A server error occurred while processing your request.' }
  ]
})
</script>