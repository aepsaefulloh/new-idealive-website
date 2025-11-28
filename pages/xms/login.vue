<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <img src="/images/logo-idealive-blue.svg" class="md:w-[150px] w-[90px] mx-auto mb-3" alt="">
        <h1 class="md:text-3xl font-bold text-gray-900 mb-2">CMS Admin Login</h1>
        <p class="text-gray-600">Manage your content</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Success Message -->
        <Transition name="fade">
          <div
            v-if="authStore.successMessage"
            class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          >
            {{ authStore.successMessage }}
          </div>
        </Transition>

        <!-- Error Message -->
        <Transition name="fade">
          <div
            v-if="authStore.error"
            class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {{ authStore.error }}
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :loading="authStore.isLoading"
            :disabled="authStore.isLoading"
            block
            variant="primary"
            class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 border-none"
          >
            Login
          </Button>
        </form>
      </div>

      <!-- Footer Note -->
      <div class="mt-8 text-center text-gray-500 text-xs">
        <p>This is a private admin area. Unauthorized access is prohibited.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import Button from '@/components/dashboard/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()



const email = ref('')
const password = ref('')

/**
 * Handle login form submission
 */
const handleLogin = async () => {
  if (!email.value || !password.value) {
    authStore.error = 'Please fill in all fields'
    return
  }

  console.log('[Login Page] Starting login process...')
  const result = await authStore.login(email.value, password.value)

  console.log('[Login Page] Login result:', result)
  console.log('[Login Page] Auth store user:', authStore.user)
  console.log('[Login Page] Is authenticated:', authStore.isAuthenticated)

  // If login successful, redirect to CMS dashboard
  if (result.success && authStore.user) {
    console.log('[Login Page] Login successful, redirecting to /xms')
    
    // Set a flag to indicate we're in the middle of login redirect
    if (process.client) {
      sessionStorage.setItem('just_logged_in', 'true')
    }
    
    // Wait a bit for cookies to be set properly
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Use navigateTo with replace to avoid adding to history
    await navigateTo('/xms', { replace: true })
  } else {
    console.warn('[Login Page] Login failed or no user:', result.error)
  }
}

/**
 * Check if already logged in, redirect to CMS
 */
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/xms')
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
