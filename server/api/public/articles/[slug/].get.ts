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
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
      return {
        success: false,
        error: 'Article slug is required'
      }
    }

    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          type
        )
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('[Public Article Detail API] Error:', error)
      if (error.code === 'PGRST116') {
        return {
          success: false,
          error: 'Article not found'
        }
      }
      return {
        success: false,
        error: error.message || 'Failed to fetch article'
      }
    }

    // Increment view count
    if (data && data.id) {
      await supabase.rpc('increment_article_views', { article_id: data.id })
    }

    return {
      success: true,
      data: data
    }
  } catch (err: any) {
    console.error('[Public Article Detail API] Exception:', err)
    return {
      success: false,
      error: err?.message || 'Failed to load article'
    }
  }
})