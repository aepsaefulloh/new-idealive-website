/**
 * Auth Initialization Composable
 * Handles session checking and auth store initialization
 * Call this in pages/layouts that need authentication
 */
export const useAuthInit = () => {
  const authStore = useAuthStore()

  const getSupabase = () => {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$supabase
  }

  const initializeAuth = async () => {
    try {
      // Get Supabase client
      const supabase = getSupabase()

      // Check if Supabase is available
      if (!supabase) {
        console.warn('Auth Init: Supabase client not available')
        return { success: false, error: 'Supabase not available' }
      }

      // Check if user already has a session
      if (!authStore.user) {
        const result = await authStore.checkSession()

        if (result.success && authStore.user) {
          const userEmail = (authStore.user as any)?.email || 'unknown'
          return { success: true, user: authStore.user }
        } else {
          return { success: false, error: 'No active session' }
        }
      } else {
        const userEmail = (authStore.user as any)?.email || 'unknown'
        return { success: true, user: authStore.user }
      }
    } catch (err) {
      console.error('Auth Init: Error during initialization:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  return {
    initializeAuth
  }
}