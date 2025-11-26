import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseAnonKey as string

  let supabase: any = null

  if (!supabaseUrl || !supabaseKey) {
    console.error('[Supabase Plugin] ERROR: Credentials missing. Supabase will NOT work.')
    console.error('[Supabase Plugin] - NUXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'OK' : 'MISSING')
    console.error('[Supabase Plugin] - NUXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'OK' : 'MISSING')
    console.error('[Supabase Plugin] Please check your .env file')
  } else {
    try {
      const customStorage = {
        getItem: (key: string) => {
          if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key)
          }
          return null
        },
        setItem: (key: string, value: string) => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, value)
          }
        },
        removeItem: (key: string) => {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key)
          }
        }
      }

      supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
          storage: customStorage,
          storageKey: 'sb-auth-token'
        }
      })
    } catch (err) {
      console.error('[Supabase Plugin] Error creating Supabase client:', err)
    }
  }

  return {
    provide: {
      supabase
    }
  }
})


