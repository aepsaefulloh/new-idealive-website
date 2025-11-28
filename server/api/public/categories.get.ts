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

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  try {
    const query = getQuery(event)
    const type = query.type as string

    let queryBuilder = supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (type && ['project', 'article', 'general'].includes(type)) {
      queryBuilder = queryBuilder.eq('type', type)
    }

    const { data, error } = await queryBuilder

    if (error) {
      console.error('[Public Categories API] Error:', error)
      return {
        success: false,
        error: error.message || 'Failed to fetch categories'
      }
    }

    return {
      success: true,
      data: data || []
    }
  } catch (err: any) {
    console.error('[Public Categories API] Exception:', err)
    return {
      success: false,
      error: err?.message || 'Failed to load categories'
    }
  }
})