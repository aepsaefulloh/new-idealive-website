/**
 * Initialize Auth Store
 * This plugin checks session on app load ONLY for CMS pages
 * Public pages don't need authentication
 */
import { useAuthStore } from '~/stores/modules/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  // SKIP auth check for public pages - only check on CMS routes
  const route = useRoute()
  const isCmsRoute = route.path.startsWith('/xms')
  
  if (!isCmsRoute) {
    return
  }

  try {
    // Get auth store
    const authStore = useAuthStore()

    // Check if Supabase is available
    if (!nuxtApp.$supabase) {
      console.warn('App Plugin: Supabase client not available, skipping session check')
      return
    }

    // Initialize Supabase if not already done
    if (!authStore.user) {
      try {
        // Wait for Supabase to be ready
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Check if user already has a session
        await authStore.checkSession()
        
        if (authStore.user) {
        } else {
        }
      } catch (err) {
        console.error('App Plugin: Error checking session:', err)
        // Don't throw, allow app to continue even if session check fails
      }
    }
  } catch (err) {
    console.error('App Plugin: Fatal error during initialization:', err)
    // Don't throw, allow app to continue
  }
})
