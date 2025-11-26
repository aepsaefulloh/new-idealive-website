import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  // Check if Supabase credentials are configured
  if (!config.public.supabaseUrl || !config.private.supabaseServiceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase credentials not configured. Please check your environment variables.'
    })
  }

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  // Create Supabase client with service role key for admin operations
  const supabase = createClient(
    config.public.supabaseUrl,
    config.private.supabaseServiceRoleKey
  )

  try {
    const { error } = await supabase.auth.admin.deleteUser(id)

    if (error) {
      console.error('Supabase admin deleteUser error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to delete user: ${error.message}`
      })
    }

    return {
      success: true,
      message: 'User deleted successfully'
    }
  } catch (err) {
    console.error('API Error in user deletion:', err)
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete user'
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})