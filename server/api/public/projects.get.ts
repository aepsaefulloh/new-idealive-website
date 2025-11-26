import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const serviceKey = config.private.supabaseServiceRoleKey as string

  if (!supabaseUrl || !serviceKey) {
    return {
      success: false,
      error: 'Supabase service credentials missing'
    }
  }

  // Service role client (server-side only)
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  try {
    // Fetch only published projects for public view
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[Public Projects API] Error:', error)
      return {
        success: false,
        error: error.message || 'Failed to fetch projects'
      }
    }

    return {
      success: true,
      data: data || []
    }
  } catch (err: any) {
    console.error('[Public Projects API] Exception:', err)
    return {
      success: false,
      error: err?.message || 'Failed to load projects'
    }
  }
})
