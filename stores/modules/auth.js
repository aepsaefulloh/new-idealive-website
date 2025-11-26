import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    error: '',
    successMessage: '',
  }),

  getters: {
    isAuthenticated: (state) => state.user !== null,
  },

  actions: {
    getSupabase() {
      const nuxtApp = useNuxtApp()
      return nuxtApp.$supabase
    },

    async register(email, password) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + '/xms'
          }
        })

        if (authError) {
          this.error = authError.message || 'Failed to register'
          return { success: false, error: this.error }
        }

        if (data?.user?.id) {
          try {
            await $fetch('/api/auth/confirm-email', {
              method: 'POST',
              body: { userId: data.user.id, email: data.user.email }
            })
          } catch (err) {
            console.warn('Email confirmation skipped:', err.message)
          }

          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: data.user.id,
              email: data.user.email,
              full_name: email.split('@')[0],
              role: 'admin',
              created_at: new Date(),
            }])

          if (insertError) {
            console.warn('Could not save user to users table:', insertError)
          }
        }

        this.user = data.user
        this.successMessage = 'Account created! You can now login.'
        return { success: true, user: data.user }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async login(email, password) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (authError) {
          console.error('[Auth Store] Login error:', authError.message)
          this.error = authError.message || 'Invalid credentials'
          return { success: false, error: this.error }
        }

        if (!data?.user) {
          console.error('[Auth Store] No user returned from login')
          this.error = 'Login failed - no user data'
          return { success: false, error: this.error }
        }

        this.user = data.user

        if (data?.session) {
          const authToken = useCookie('auth_token', { maxAge: 60*60*24*7, sameSite: 'lax', encode: String, decode: String })
          const authRefresh = useCookie('auth_refresh', { maxAge: 60*60*24*7, sameSite: 'lax', encode: String, decode: String })
          const authUser = useCookie('auth_user', { maxAge: 60*60*24*7, sameSite: 'lax', encode: JSON.stringify, decode: JSON.parse })
          
          authToken.value = data.session.access_token
          authRefresh.value = data.session.refresh_token
          authUser.value = data.user
        } else {
          console.warn('[Auth Store] No session returned, but user exists - saving user to cookie anyway')
          const authUser = useCookie('auth_user', { maxAge: 60*60*24*7, sameSite: 'lax', encode: JSON.stringify, decode: JSON.parse })
          authUser.value = data.user
        }

        this.successMessage = 'Login successful!'
        return { success: true, user: data.user }
      } catch (err) {
        console.error('[Auth Store] Login exception:', err)
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { error: authError } = await supabase.auth.signOut()

        if (authError) {
          this.error = authError.message || 'Failed to logout'
          return { success: false, error: this.error }
        }

        const authToken = useCookie('auth_token', { encode: String, decode: String })
        const authRefresh = useCookie('auth_refresh', { encode: String, decode: String })
        const authUser = useCookie('auth_user', { encode: JSON.stringify, decode: JSON.parse })
        
        authToken.value = null
        authRefresh.value = null
        authUser.value = null

        this.user = null
        this.successMessage = 'Logged out successfully'
        return { success: true }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async checkSession() {
      try {
        const authToken = useCookie('auth_token', { encode: String, decode: String })
        const authUser = useCookie('auth_user', { encode: JSON.stringify, decode: JSON.parse })
        const authRefresh = useCookie('auth_refresh', { encode: String, decode: String })

        if (authToken.value && authUser.value) {
          try {
            this.user = authUser.value
            
            // Restore session to Supabase client (client-side only)
            if (process.client) {
              const supabase = this.getSupabase()
              if (supabase?.auth && authRefresh.value) {
                try {
                  await supabase.auth.setSession({
                    access_token: authToken.value,
                    refresh_token: authRefresh.value
                  })
                } catch (err) {
                  console.warn('[Auth Store] Failed to restore session to Supabase:', err.message)
                }
              }
            }
            
            return { success: true, user: this.user }
          } catch (parseErr) {
            console.error('[Auth Store] Failed to parse user cookie:', parseErr.message, 'Value:', authUser.value)
            const authToken = useCookie('auth_token', { encode: String, decode: String })
            const authRefresh = useCookie('auth_refresh', { encode: String, decode: String })
            const authUser = useCookie('auth_user', { encode: JSON.stringify, decode: JSON.parse })
            authToken.value = null
            authRefresh.value = null
            authUser.value = null
          }
        }

        this.user = null
        return { success: false, user: null }
      } catch (err) {
        console.error('[Auth Store] checkSession exception:', err.message)
        this.user = null
        return { success: false, error: err.message }
      }
    },

    clearError() {
      this.error = ''
    },

    clearSuccessMessage() {
      this.successMessage = ''
    },
  }
})
