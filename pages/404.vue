<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <UIcon
          name="i-heroicons-magnifying-glass"
          class="w-24 h-24 mx-auto text-purple-500 dark:text-purple-400"
        />
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-bold text-gray-900 dark:text-white mb-4 opacity-80">
        404
      </h1>

      <!-- Error Title -->
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h2>

      <!-- Error Description -->
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
        Please check the URL or return to the homepage.
      </p>

      <!-- Search Suggestion -->
      <div class="mb-8">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Try searching for what you need:
        </p>
        <div class="flex flex-wrap gap-2 justify-center">
          <NuxtLink
            to="/"
            class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/projects"
            class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
          >
            Projects
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
          >
            Contact
          </NuxtLink>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
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

      <!-- Fun Element -->
      <div class="mt-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
          <UIcon name="i-heroicons-face-smile" class="w-4 h-4 text-yellow-500" />
          <span class="text-sm text-gray-600 dark:text-gray-400">
            Don't worry, even developers get lost sometimes!
          </span>
        </div>
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
  title: '404 Not Found | Aep Saefulloh',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'The requested page could not be found.' }
  ]
})
</script>