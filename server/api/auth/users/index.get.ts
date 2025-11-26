import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Check if Supabase credentials are configured
  if (!config.public.supabaseUrl || !config.private.supabaseServiceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase credentials not configured. Please check your environment variables.'
    })
  }

  // Create Supabase client with service role key for admin operations
  const supabase = createClient(
    config.public.supabaseUrl,
    config.private.supabaseServiceRoleKey
  )

  try {
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error('Supabase admin listUsers error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch users: ${error.message}`
      })
    }

    return {
      success: true,
      users: data.users || []
    }
  } catch (err) {
    console.error('API Error in users list:', err)
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users'
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})