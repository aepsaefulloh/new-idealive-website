<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <UIcon
          name="i-heroicons-shield-exclamation"
          class="w-24 h-24 mx-auto text-red-500 dark:text-red-400"
        />
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-bold text-gray-900 dark:text-white mb-4 opacity-80">
        403
      </h1>

      <!-- Error Title -->
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Access Forbidden
      </h2>

      <!-- Error Description -->
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        You don't have permission to access this resource.
        This area is restricted to authorized personnel only.
      </p>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
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

      <!-- Additional Info -->
      <div class="mt-12 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          If you believe this is an error, please contact the administrator.
        </p>
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

// SEO meta
useHead({
  title: '403 Forbidden | Aep Saefulloh',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Access to this resource is forbidden.' }
  ]
})
</script>