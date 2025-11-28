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
    const category = query.category as string
    const featured = query.featured === 'true'
    const limit = parseInt(query.limit as string) || 10
    const offset = parseInt(query.offset as string) || 0

    let queryBuilder = supabase
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
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      queryBuilder = queryBuilder.eq('categories.slug', category)
    }

    if (featured) {
      queryBuilder = queryBuilder.eq('featured', true)
    }

    const { data, error } = await queryBuilder

    if (error) {
      console.error('[Public Articles API] Error:', error)
      return {
        success: false,
        error: error.message || 'Failed to fetch articles'
      }
    }

    return {
      success: true,
      data: data || [],
      meta: {
        limit,
        offset,
        hasMore: data && data.length === limit
      }
    }
  } catch (err: any) {
    console.error('[Public Articles API] Exception:', err)
    return {
      success: false,
      error: err?.message || 'Failed to load articles'
    }
  }
})