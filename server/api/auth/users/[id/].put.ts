import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Check if Supabase credentials are configured
  if (!config.public.supabaseUrl || !config.private.supabaseServiceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase credentials not configured. Please check your environment variables.'
    })
  }

  // Validate input
  if (!body.id) {
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
    const updateData: any = {}

    if (body.password) {
      if (body.password.length < 8) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Password must be at least 8 characters long'
        })
      }
      updateData.password = body.password
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      body.id,
      updateData
    )

    if (error) {
      console.error('Supabase admin updateUserById error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to update user: ${error.message}`
      })
    }

    return {
      success: true,
      user: data.user
    }
  } catch (err) {
    console.error('API Error in user update:', err)
    const errorMessage = err instanceof Error ? err.message : 'Failed to update user'
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})