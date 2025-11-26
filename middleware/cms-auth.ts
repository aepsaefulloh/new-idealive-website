import { useAuthInit } from '@/composables/useAuthInit'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { initializeAuth } = useAuthInit()

  // Allow login and register pages without authentication
  if (to.path === '/xms/login' || to.path === '/xms/register') {
    return
  }

  // Protect all other CMS routes
  if (to.path.startsWith('/xms')) {
    // Initialize auth if not already done
    if (!authStore.user) {
      await initializeAuth()
    }

    if (!authStore.isAuthenticated) {
      return navigateTo('/xms/login')
    }
  }
})
