<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Auth Container -->
    <div class="relative w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">{{ subtitle }}</p>
      </div>

      <!-- Auth Form Container -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <slot />
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © 2025 Dashboard App. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const title = computed(() => {
  if (route.path === '/register') {
    return 'Create Account'
  } else if (route.path === '/login') {
    return 'Welcome Back'
  }
  return 'Authentication'
})

const subtitle = computed(() => {
  if (route.path === '/register') {
    return 'Sign up for your new account'
  } else if (route.path === '/login') {
    return 'Sign in to your account'
  }
  return 'Please authenticate'
})
</script>