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
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  if (body.password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 8 characters long'
    })
  }

  // Create Supabase client with service role key for admin operations
  const supabase = createClient(
    config.public.supabaseUrl,
    config.private.supabaseServiceRoleKey
  )

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true // Auto-confirm email for admin-created accounts
    })

    if (error) {
      console.error('Supabase admin createUser error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create user: ${error.message}`
      })
    }

    return {
      success: true,
      user: data.user
    }
  } catch (err) {
    console.error('API Error in user creation:', err)
    const errorMessage = err instanceof Error ? err.message : 'Failed to create user'
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})